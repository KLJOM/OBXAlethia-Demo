import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AuditPreparation = ({ auditItems }) => {
  const getCompletionColor = (percentage) => {
    if (percentage === 100) return 'text-success';
    if (percentage >= 70) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="glass-surface rounded-lg p-6 elevation-2">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1">Audit Preparation</h2>
          <p className="text-sm text-muted-foreground">Next audit scheduled: January 15, 2026</p>
        </div>
        <Button variant="default" size="sm" iconName="Calendar" iconPosition="left">
          Schedule Audit
        </Button>
      </div>
      <div className="space-y-4">
        {auditItems?.map((item) => (
          <div key={item?.id} className="p-4 glass-surface-light rounded-lg">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-foreground mb-1">{item?.title}</h3>
                <p className="text-xs text-muted-foreground">{item?.description}</p>
              </div>
              <span className={`text-sm font-bold ${getCompletionColor(item?.completion)}`}>
                {item?.completion}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 mb-3">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  item?.completion === 100 ? 'bg-success' : item?.completion >= 70 ? 'bg-warning' : 'bg-error'
                }`}
                style={{ width: `${item?.completion}%` }}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Icon name="FileCheck" size={12} />
                  {item?.documentsReady}/{item?.totalDocuments} docs
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="Users" size={12} />
                  {item?.assignedTo}
                </span>
              </div>
              <button className="text-xs font-medium text-secondary hover:text-secondary/80 transition-colors">
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuditPreparation;