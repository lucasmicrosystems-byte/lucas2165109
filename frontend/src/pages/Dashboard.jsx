import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Droplet, 
  Sprout, 
  TrendingUp, 
  Activity, 
  MapPin, 
  AlertTriangle,
  LogIn
} from 'lucide-react';
import { useLanguage } from '../hooks/LanguageContext';
import { dashboardService, taskService } from '../services/api';
import DashboardCard from '../components/DashboardCard';
import FarmTaskWidget from '../components/FarmTaskWidget';
import WeatherCard from '../components/WeatherCard';

export default function Dashboard({ currentUser }) {
  const { t } = useLanguage();
  const [data, setData] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [taskLoading, setTaskLoading] = useState(false);
  const [error, setError] = useState('');

  // Fallback default user if none is active (e.g. Ramesh Gowda ID 1)
  const activeUserId = currentUser?.id || 1;

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await dashboardService.getSummary(activeUserId);
      setData(res.data);
      setTasks(res.data.tasks || []);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Could not connect to the AgriVerse API. Please verify the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [activeUserId]);

  const handleAddTask = async (taskName, dueDate) => {
    try {
      setTaskLoading(true);
      const res = await taskService.createTask(activeUserId, taskName, dueDate);
      setTasks((prev) => [...prev, res.data]);
      // Update counters in dashboard summary
      setData((prev) => ({
        ...prev,
        tasks_pending_count: prev.tasks_pending_count + 1
      }));
    } catch (err) {
      console.error(err);
      alert('Error creating task. Please try again.');
    } finally {
      setTaskLoading(false);
    }
  };

  const handleToggleTask = async (taskId, currentStatus) => {
    try {
      const res = await taskService.updateTask(taskId, { completed_status: !currentStatus });
      setTasks((prev) => 
        prev.map((t) => (t.id === taskId ? res.data : t))
      );
      // Adjust counter
      setData((prev) => ({
        ...prev,
        tasks_pending_count: prev.tasks_pending_count + (currentStatus ? 1 : -1)
      }));
    } catch (err) {
      console.error(err);
      alert('Error updating task.');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const taskToDelete = tasks.find(t => t.id === taskId);
      await taskService.deleteTask(taskId);
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
      
      if (taskToDelete && !taskToDelete.completed_status) {
        setData((prev) => ({
          ...prev,
          tasks_pending_count: Math.max(0, prev.tasks_pending_count - 1)
        }));
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting task.');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-semibold text-primary/70">{t('loading')}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 space-y-8">
      {/* Header and User location details */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-primary">{t('dash_title')}</h1>
          <p className="text-sm text-primary-light font-semibold flex items-center gap-1.5 mt-1">
            <MapPin size={16} />
            <span>Farm Location: {currentUser ? currentUser.location : "Bangalore (Default Profile)"}</span>
          </p>
        </div>
        {!currentUser && (
          <div className="flex items-center gap-2 p-3 bg-accent/10 border border-accent/20 rounded-2xl text-xs font-semibold text-primary">
            <AlertTriangle size={16} className="text-accent-dark shrink-0" />
            <span>Viewing as Demo. Log in to change your farm details.</span>
            <Link to="/login" className="flex items-center gap-1 text-primary-light hover:underline ml-1">
              <LogIn size={12} /> Log In
            </Link>
          </div>
        )}
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-2xl text-xs font-bold flex items-center gap-3">
          <AlertTriangle size={18} />
          <span>{error}</span>
          <button onClick={fetchDashboardData} className="px-3 py-1 bg-red-100 hover:bg-red-200 rounded-lg ml-auto">
            Retry
          </button>
        </div>
      )}

      {/* Analytics Summary Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard 
          title="Crop Varieties Grown"
          value={data?.crops_count || 10}
          description="Ragi, Maize, Tomatoes, Sunflower, Coffee & Chilli varieties tracked."
          icon={Sprout}
          colorClass="bg-green-100 text-green-700"
        />
        <DashboardCard 
          title="Marketplace Listings"
          value={data?.marketplace_count || 10}
          description="Seeds, tools, fertilizers available for transaction."
          icon={TrendingUp}
          colorClass="bg-amber-100 text-amber-700"
        />
        <DashboardCard 
          title="Soil Quality Logs"
          value="6.5 pH"
          description={t('dash_soil_desc')}
          icon={Activity}
          colorClass="bg-purple-100 text-purple-700"
        />
        <DashboardCard 
          title="Irrigation Health"
          value="Optimal"
          description={t('dash_irrigation_desc')}
          icon={Droplet}
          colorClass="bg-blue-100 text-blue-700"
        />
      </div>

      {/* Main Row: Tasks list + Weather updates */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Tasks Manager */}
        <div className="lg:col-span-2">
          <FarmTaskWidget 
            tasks={tasks}
            onAddTask={handleAddTask}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
            loading={taskLoading}
          />
        </div>

        {/* Right Column: Weather Summary + Crop Advice */}
        <div className="space-y-6">
          <WeatherCard weather={data?.weather} />

          {/* Crop Suitability Prediction Widget */}
          <div className="p-6 bg-background border border-primary/10 rounded-3xl shadow-sm transition-theme">
            <h3 className="font-bold text-lg text-primary">{t('dash_prediction')}</h3>
            <p className="text-xs text-primary/70 mt-3 leading-relaxed">
              {t('dash_prediction_desc')}
            </p>
            <div className="mt-5 space-y-3">
              <div>
                <div className="flex justify-between text-xs font-bold text-primary mb-1">
                  <span>Ragi Suitability</span>
                  <span>94%</span>
                </div>
                <div className="w-full bg-background-soft h-2 rounded-full overflow-hidden">
                  <div className="bg-primary-light h-full rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold text-primary mb-1">
                  <span>Tomato Suitability</span>
                  <span>88%</span>
                </div>
                <div className="w-full bg-background-soft h-2 rounded-full overflow-hidden">
                  <div className="bg-primary-light h-full rounded-full" style={{ width: '88%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold text-primary mb-1">
                  <span>Maize Suitability</span>
                  <span>72%</span>
                </div>
                <div className="w-full bg-background-soft h-2 rounded-full overflow-hidden">
                  <div className="bg-primary-light h-full rounded-full" style={{ width: '72%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
