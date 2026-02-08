import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const ParticipantsList = ({ participants, onRemoveParticipant }) => {
  const getRoleColor = (role) => {
    const colors = {
      'Executive': 'text-secondary',
      'Legal Counsel': 'text-warning',
      'Compliance Officer': 'text-success',
      'Financial Advisor': 'text-accent',
      'External Advisor': 'text-muted-foreground'
    };
    return colors?.[role] || 'text-muted-foreground';
  };

  const getRoleBadgeColor = (role) => {
    const colors = {
      'Executive': 'bg-secondary/20 text-secondary',
      'Legal Counsel': 'bg-warning/20 text-warning',
      'Compliance Officer': 'bg-success/20 text-success',
      'Financial Advisor': 'bg-accent/20 text-accent',
      'External Advisor': 'bg-muted/20 text-muted-foreground'
    };
    return colors?.[role] || 'bg-muted/20 text-muted-foreground';
  };

  return (
    <div className="glass-surface rounded-xl p-6 elevation-2">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Icon name="Users" size={24} color="var(--color-secondary)" />
          <h2 className="text-xl font-semibold text-foreground">Participants</h2>
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-secondary/20 text-secondary">
            {participants?.length}
          </span>
        </div>
        <button className="p-2 rounded-lg hover:bg-muted/20 transition-colors">
          <Icon name="UserPlus" size={20} color="var(--color-muted-foreground)" />
        </button>
      </div>
      <div className="space-y-3">
        {participants?.map((participant) => (
          <div
            key={participant?.id}
            className="glass-surface-light rounded-lg p-4 hover:bg-muted/10 transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <Image
                  src={participant?.avatar}
                  alt={participant?.avatarAlt}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card ${
                  participant?.status === 'online' ? 'bg-success' : 'bg-muted'
                }`} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-foreground truncate">
                    {participant?.name}
                  </h3>
                  {participant?.isHost && (
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-accent/20 text-accent">
                      Host
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-medium ${getRoleColor(participant?.role)}`}>
                    {participant?.role}
                  </span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{participant?.company}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {participant?.permissions?.canEdit && (
                  <div className="p-1.5 rounded bg-success/10" title="Edit Access">
                    <Icon name="Edit" size={14} color="var(--color-success)" />
                  </div>
                )}
                {participant?.permissions?.canShare && (
                  <div className="p-1.5 rounded bg-accent/10" title="Share Access">
                    <Icon name="Share2" size={14} color="var(--color-accent)" />
                  </div>
                )}
                {!participant?.isHost && (
                  <button
                    onClick={() => onRemoveParticipant(participant?.id)}
                    className="p-1.5 rounded hover:bg-error/10 transition-colors"
                    title="Remove Participant"
                  >
                    <Icon name="X" size={14} color="var(--color-error)" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 py-2.5 px-4 rounded-lg font-medium text-sm bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors flex items-center justify-center gap-2">
        <Icon name="UserPlus" size={18} />
        <span>Invite Participants</span>
      </button>
    </div>
  );
};

export default ParticipantsList;
