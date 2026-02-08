import React from 'react';

import Icon from '../../../components/AppIcon';

const AIAdvisorCard = ({ advisor, onStartSession, isActive }) => {
  return (
    <div className={`glass-surface rounded-xl p-6 transition-all duration-300 ${
      isActive ? 'ring-2 ring-secondary elevation-3' : 'elevation-2 hover:elevation-3'
    }`}>
      <div className="flex items-start gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-accent p-0.5">
            <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
              <Icon name={advisor?.icon} size={32} color="var(--color-secondary)" />
            </div>
          </div>
          {advisor?.status === 'active' && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full border-2 border-card" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-1">{advisor?.name}</h3>
              <p className="text-sm text-muted-foreground">{advisor?.specialty}</p>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              advisor?.status === 'active' ?'bg-success/20 text-success' :'bg-muted/20 text-muted-foreground'
            }`}>
              {advisor?.status === 'active' ? 'Available' : 'Offline'}
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {advisor?.description}
          </p>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Icon name="TrendingUp" size={16} color="var(--color-success)" />
              <span className="text-sm font-medium text-foreground">{advisor?.accuracy}%</span>
              <span className="text-xs text-muted-foreground">Accuracy</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="MessageSquare" size={16} color="var(--color-accent)" />
              <span className="text-sm font-medium text-foreground">{advisor?.sessions}</span>
              <span className="text-xs text-muted-foreground">Sessions</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {advisor?.expertise?.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 rounded text-xs font-medium bg-secondary/10 text-secondary"
              >
                {skill}
              </span>
            ))}
          </div>

          <button
            onClick={() => onStartSession(advisor)}
            disabled={advisor?.status !== 'active'}
            className={`w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
              advisor?.status === 'active' ?'bg-secondary text-secondary-foreground hover:bg-secondary/90 interactive-scale' :'bg-muted/20 text-muted-foreground cursor-not-allowed'
            }`}
          >
            {isActive ? 'Session Active' : 'Start Advisory Session'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAdvisorCard;
