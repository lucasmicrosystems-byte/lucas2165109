import React, { useState } from 'react';
import { CheckSquare, Square, Trash, Calendar, Plus, Loader } from 'lucide-react';
import { useLanguage } from '../hooks/LanguageContext';

export default function FarmTaskWidget({ tasks, onAddTask, onToggleTask, onDeleteTask, loading }) {
  const { t } = useLanguage();
  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskName.trim()) return;
    onAddTask(taskName, dueDate);
    setTaskName('');
  };

  const isOverdue = (dateStr, isCompleted) => {
    if (isCompleted) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dateStr);
    due.setHours(0, 0, 0, 0);
    return due < today;
  };

  return (
    <div className="p-6 bg-background border border-primary/10 rounded-3xl shadow-sm transition-theme flex flex-col h-full">
      <div className="flex items-center justify-between pb-4 border-b border-primary/15">
        <div>
          <h3 className="font-bold text-lg text-primary">{t('dash_tasks')}</h3>
          <span className="text-xs text-primary-light font-semibold">
            {tasks.filter(t => !t.completed_status).length} pending chores
          </span>
        </div>
      </div>

      {/* Task input form */}
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
        <div className="flex gap-2">
          <input 
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder={t('task_placeholder')}
            className="flex-1 px-4 py-2 text-sm bg-background-soft border border-primary/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-primary"
            required
          />
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex-1 flex items-center bg-background-soft border border-primary/10 px-3 py-1.5 rounded-xl text-primary">
            <Calendar size={15} className="mr-2 text-primary-light" />
            <input 
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="bg-transparent border-none text-xs focus:ring-0 focus:outline-none cursor-pointer w-full text-primary"
              required
            />
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="px-4 py-2.5 bg-primary hover:bg-primary-light text-white font-semibold text-xs rounded-xl shadow-md transition-theme flex items-center gap-1.5 shrink-0"
          >
            {loading ? <Loader size={14} className="animate-spin" /> : <Plus size={14} />}
            <span>{t('btn_add_task')}</span>
          </button>
        </div>
      </form>

      {/* Tasks List */}
      <div className="mt-6 flex-1 overflow-y-auto max-h-[300px] space-y-2.5 pr-1">
        {tasks.length === 0 ? (
          <div className="text-center py-8 text-primary/40 text-sm font-semibold">
            {t('no_tasks')}
          </div>
        ) : (
          tasks.map((task) => {
            const completed = task.completed_status;
            const overdue = isOverdue(task.due_date, completed);
            return (
              <div 
                key={task.id}
                className={`flex items-center justify-between p-3 rounded-2xl border transition-theme ${
                  completed 
                    ? 'bg-background-soft/40 border-primary/5 opacity-60' 
                    : overdue 
                      ? 'bg-red-50/50 border-red-200 dark:bg-red-950/10'
                      : 'bg-background border-primary/10'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <button 
                    onClick={() => onToggleTask(task.id, completed)}
                    className="text-primary hover:text-primary-light shrink-0"
                  >
                    {completed ? <CheckSquare size={19} className="text-primary-light" /> : <Square size={19} />}
                  </button>
                  <div className="min-w-0 flex-1">
                    <span className={`text-sm font-bold text-primary block truncate ${completed ? 'line-through' : ''}`}>
                      {task.task_name}
                    </span>
                    <span className={`text-[10px] font-semibold flex items-center gap-1.5 mt-0.5 ${
                      completed 
                        ? 'text-primary/40' 
                        : overdue 
                          ? 'text-red-500' 
                          : 'text-primary-light'
                    }`}>
                      <Calendar size={11} />
                      {task.due_date} {overdue && "(Overdue)"}
                    </span>
                  </div>
                </div>

                <button 
                  onClick={() => onDeleteTask(task.id)}
                  className="p-1.5 text-red-500/70 hover:text-red-500 hover:bg-red-50 rounded-lg transition-theme ml-2"
                  title="Delete Task"
                >
                  <Trash size={14} />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
