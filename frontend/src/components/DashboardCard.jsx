import React from 'react';

export default function DashboardCard({ title, value, description, icon: Icon, colorClass = "bg-primary/5 text-primary" }) {
  return (
    <div className="p-6 bg-background border border-primary/10 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-primary-light uppercase tracking-wider block">{title}</span>
          <span className="text-2xl font-extrabold text-primary block mt-1.5">{value}</span>
        </div>
        <div className={`p-3.5 rounded-2xl ${colorClass}`}>
          <Icon size={24} />
        </div>
      </div>
      {description && (
        <p className="text-xs font-medium text-primary/70 mt-4 leading-relaxed bg-background-soft/50 p-2.5 rounded-xl border border-primary/5">
          {description}
        </p>
      )}
    </div>
  );
}
