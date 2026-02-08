import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickActionButton = ({ icon, label, onClick, color = 'var(--color-secondary)' }) => {
  return (
    <button
      onClick={onClick}
      className="glass-surface rounded-lg p-4 hover:elevation-3 transition-all duration-200 interactive-scale w-full"
    >
      <div className="flex flex-col items-center gap-2">
        <div 
          className="w-12 h-12 rounded-lg flex items-center justify-center"
          style={{ background: `${color}20` }}
        >
          <Icon name={icon} size={24} color={color} />
        </div>
        <span className="text-sm font-medium text-foreground text-center">{label}</span>
      </div>
    </button>
  );
};

export default QuickActionButton;
