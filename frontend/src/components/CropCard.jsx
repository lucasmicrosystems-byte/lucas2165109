import React from 'react';
import { Calendar, Droplet, ShieldAlert } from 'lucide-react';

export default function CropCard({ crop }) {
  return (
    <div className="flex flex-col bg-background border border-primary/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {crop.image_url && (
        <div className="relative h-44 overflow-hidden">
          <img 
            src={crop.image_url} 
            alt={crop.crop_name} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
          <span className="absolute top-3 right-3 px-3 py-1 text-xs font-bold text-white bg-primary/80 backdrop-blur-md rounded-full shadow-sm">
            {crop.season}
          </span>
        </div>
      )}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-lg text-primary">{crop.crop_name}</h3>
          {crop.description && (
            <p className="text-xs text-primary/70 mt-1.5 leading-relaxed">
              {crop.description}
            </p>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-primary/5 space-y-2 text-xs">
          <div className="flex items-center gap-2 text-primary/80">
            <Droplet size={14} className="text-primary-light shrink-0" />
            <span className="font-semibold">Fertilizer:</span>
            <span className="truncate">{crop.fertilizer}</span>
          </div>
          <div className="flex items-center gap-2 text-accent-dark">
            <ShieldAlert size={14} className="shrink-0" />
            <span className="font-semibold text-primary/80">Key Threat:</span>
            <span className="font-semibold">{crop.disease}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
