import React, { useState } from 'react';
import { Upload, HelpCircle, ShieldAlert, Sparkles, CheckCircle2, RefreshCw } from 'lucide-react';
import { useLanguage } from '../hooks/LanguageContext';
import { scannerService } from '../services/api';

export default function Scanner() {
  const { t } = useLanguage();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [diagnostics, setDiagnostics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileAndPreview(file);
  };

  const setFileAndPreview = (file) => {
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setDiagnostics(null);
    setError('');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setFileAndPreview(file);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    try {
      setLoading(true);
      setError('');
      const res = await scannerService.uploadLeaf(selectedFile);
      setDiagnostics(res.data);
    } catch (err) {
      console.error(err);
      setError('Diagnosis failed. Please verify the backend API is active.');
    } finally {
      setLoading(false);
    }
  };

  // Simulate diagnostic directly with a simulated filename for test templates
  const runSimulatedDiagnosis = async (dummyFilename) => {
    try {
      setLoading(true);
      setError('');
      // Create a dummy file object to send to the server
      const dummyContent = new Blob(['dummy leaf content'], { type: 'image/jpeg' });
      const dummyFile = new File([dummyContent], dummyFilename, { type: 'image/jpeg' });
      
      setPreviewUrl('https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=300&q=80');
      setSelectedFile(dummyFile);
      
      const res = await scannerService.uploadLeaf(dummyFile);
      setDiagnostics(res.data);
    } catch (err) {
      console.error(err);
      setError('Diagnosis simulation failed. Check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-8">
      {/* Title */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-primary flex items-center justify-center gap-2">
          <Sparkles className="text-accent" />
          <span>{t('scanner_title')}</span>
        </h1>
        <p className="text-sm text-primary-light font-semibold max-w-xl mx-auto">
          {t('scanner_subtitle')}
        </p>
      </div>

      {/* Main Scanner Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Upload Column */}
        <div className="space-y-6">
          <form 
            onSubmit={handleUpload}
            className="p-6 bg-background border border-primary/10 rounded-3xl shadow-sm flex flex-col items-center justify-center text-center"
          >
            {/* File Dropzone */}
            <div 
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="w-full h-52 border-2 border-dashed border-primary/20 hover:border-primary-light rounded-2xl flex flex-col items-center justify-center cursor-pointer p-4 bg-background-soft/20 group transition-theme"
              onClick={() => document.getElementById('leaf-file-input').click()}
            >
              <input 
                id="leaf-file-input"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              
              {previewUrl ? (
                <img 
                  src={previewUrl} 
                  alt="Leaf preview" 
                  className="w-full h-full object-contain rounded-xl"
                />
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <div className="p-4 bg-primary/5 group-hover:bg-primary/15 text-primary rounded-2xl transition-theme">
                    <Upload size={28} />
                  </div>
                  <span className="text-xs font-bold text-primary">{t('scanner_drop')}</span>
                  <span className="text-[10px] text-primary/45">PNG, JPG, JPEG up to 10MB</span>
                </div>
              )}
            </div>

            <div className="w-full mt-4 flex gap-3">
              {selectedFile && (
                <button 
                  type="button"
                  onClick={() => {
                    setSelectedFile(null);
                    setPreviewUrl('');
                    setDiagnostics(null);
                  }}
                  className="px-4 py-2.5 bg-background-soft border border-primary/15 hover:bg-background-soft-dark text-primary font-bold text-xs rounded-xl transition-theme"
                >
                  Clear
                </button>
              )}
              <button 
                type="submit"
                disabled={!selectedFile || loading}
                className={`flex-1 py-2.5 font-bold text-xs rounded-xl shadow-md transition-theme flex items-center justify-center gap-1.5 ${
                  selectedFile && !loading
                    ? 'bg-primary hover:bg-primary-light text-white'
                    : 'bg-primary/20 text-primary/40 cursor-not-allowed'
                }`}
              >
                {loading && <RefreshCw size={14} className="animate-spin" />}
                <span>{t('scanner_btn')}</span>
              </button>
            </div>
          </form>

          {/* Test Simulation Templates */}
          <div className="p-5 bg-background border border-primary/10 rounded-3xl">
            <h4 className="font-bold text-xs text-primary-light uppercase tracking-wider mb-3">Simulation Templates (Test AI Diagnostics)</h4>
            <p className="text-[10px] text-primary/60 mb-4 leading-normal">
              Don't have a real plant leaf photo? Click one of these presets to trigger an AI diagnostics lookup:
            </p>
            <div className="grid grid-cols-2 gap-2.5 text-[11px] font-bold">
              <button 
                onClick={() => runSimulatedDiagnosis('tomato_blight_spot.jpg')}
                className="p-2 bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 rounded-xl transition-theme text-left"
              >
                🍅 Tomato Leaf (Blight)
              </button>
              <button 
                onClick={() => runSimulatedDiagnosis('rice_blast_fungus.jpg')}
                className="p-2 bg-yellow-50 text-yellow-700 border border-yellow-200 hover:bg-yellow-100 rounded-xl transition-theme text-left"
              >
                🌾 Rice Leaf (Blast)
              </button>
              <button 
                onClick={() => runSimulatedDiagnosis('coffee_rust_leaf.jpg')}
                className="p-2 bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100 rounded-xl transition-theme text-left"
              >
                ☕ Coffee Leaf (Rust)
              </button>
              <button 
                onClick={() => runSimulatedDiagnosis('healthy_crop_foliage.jpg')}
                className="p-2 bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 rounded-xl transition-theme text-left"
              >
                🌱 Healthy Leaf
              </button>
            </div>
          </div>
        </div>

        {/* Results Column */}
        <div>
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-xs font-bold">
              {error}
            </div>
          )}

          {loading ? (
            <div className="p-8 bg-background border border-primary/10 rounded-3xl flex flex-col items-center justify-center text-center py-20 gap-3">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs font-bold text-primary/70">Analyzing leaf cell structures...</p>
            </div>
          ) : diagnostics ? (
            <div className="p-6 bg-background border border-primary/10 rounded-3xl shadow-md space-y-6">
              <div className="border-b border-primary/10 pb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg text-primary">{t('scanner_result')}</h3>
                  <span className="text-[10px] text-primary/45">File: {diagnostics.filename}</span>
                </div>
                <div className="px-3.5 py-1.5 bg-primary-light/10 border border-primary-light/20 text-primary-light text-xs font-black rounded-full flex items-center gap-1">
                  <CheckCircle2 size={13} />
                  <span>Verified</span>
                </div>
              </div>

              {/* Disease name & Confidence */}
              <div>
                <span className="text-[10px] font-bold text-primary-light uppercase tracking-wider block">Identified Condition</span>
                <strong className="text-xl font-extrabold text-primary block mt-0.5">{diagnostics.disease}</strong>
                
                <div className="mt-3">
                  <div className="flex justify-between text-xs font-bold text-primary mb-1">
                    <span>{t('scanner_confidence')}</span>
                    <span>{Math.round(diagnostics.confidence * 100)}%</span>
                  </div>
                  <div className="w-full bg-background-soft h-2 rounded-full overflow-hidden">
                    <div className="bg-primary-light h-full rounded-full" style={{ width: `${diagnostics.confidence * 100}%` }}></div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="text-xs text-primary/85 leading-relaxed bg-background-soft/30 p-4 rounded-2xl border border-primary/5">
                {diagnostics.description}
              </div>

              {/* Treatments */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4.5 bg-green-50/50 border border-green-200 text-green-800 rounded-2xl space-y-1.5 dark:bg-green-950/10">
                  <span className="text-[10px] font-bold text-green-700 uppercase tracking-wider block">{t('scanner_organic')}</span>
                  <p className="text-xs font-medium leading-relaxed">{diagnostics.organic_treatment}</p>
                </div>

                <div className="p-4.5 bg-amber-50/50 border border-amber-200 text-amber-800 rounded-2xl space-y-1.5 dark:bg-amber-950/10">
                  <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">{t('scanner_remedy')}</span>
                  <p className="text-xs font-medium leading-relaxed">{diagnostics.remedy}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 border border-dashed border-primary/15 rounded-3xl text-center text-primary/45 font-bold flex flex-col items-center gap-3 justify-center py-28">
              <HelpCircle size={32} />
              <span>Diagnostic report will appear here after upload.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
