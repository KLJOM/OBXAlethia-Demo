import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SessionControls = ({ isSessionActive, onStartSession, onEndSession, sessionDuration }) => {
  const [duration, setDuration] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  useEffect(() => {
    let interval;
    if (isSessionActive) {
      interval = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setDuration(0);
    }
    return () => clearInterval(interval);
  }, [isSessionActive]);

  const formatDuration = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs?.toString()?.padStart(2, '0')}:${mins?.toString()?.padStart(2, '0')}:${secs?.toString()?.padStart(2, '0')}`;
  };

  return (
    <div className="glass-surface rounded-xl p-6 elevation-2">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Icon name="Video" size={24} color="var(--color-secondary)" />
          <h2 className="text-xl font-semibold text-foreground">Session Controls</h2>
        </div>
        {isSessionActive && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-error/20">
            <div className="w-2 h-2 rounded-full bg-error animate-pulse" />
            <span className="text-sm font-medium text-error">Live</span>
          </div>
        )}
      </div>

      {isSessionActive && (
        <div className="mb-6 p-4 rounded-lg bg-secondary/10 border border-secondary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Session Duration</p>
              <p className="text-2xl font-bold text-foreground">{formatDuration(duration)}</p>
            </div>
            {isRecording && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-error/20">
                <div className="w-3 h-3 rounded-full bg-error animate-pulse" />
                <span className="text-sm font-medium text-error">Recording</span>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          onClick={() => setIsMuted(!isMuted)}
          disabled={!isSessionActive}
          className={`p-4 rounded-lg transition-all ${
            isSessionActive
              ? isMuted
                ? 'bg-error/20 text-error hover:bg-error/30' :'glass-surface-light hover:bg-muted/20' :'glass-surface-light opacity-50 cursor-not-allowed'
          }`}
        >
          <Icon name={isMuted ? 'MicOff' : 'Mic'} size={24} className="mx-auto mb-2" />
          <p className="text-sm font-medium">{isMuted ? 'Unmute' : 'Mute'}</p>
        </button>

        <button
          onClick={() => setIsVideoOff(!isVideoOff)}
          disabled={!isSessionActive}
          className={`p-4 rounded-lg transition-all ${
            isSessionActive
              ? isVideoOff
                ? 'bg-error/20 text-error hover:bg-error/30' :'glass-surface-light hover:bg-muted/20' :'glass-surface-light opacity-50 cursor-not-allowed'
          }`}
        >
          <Icon name={isVideoOff ? 'VideoOff' : 'Video'} size={24} className="mx-auto mb-2" />
          <p className="text-sm font-medium">{isVideoOff ? 'Start Video' : 'Stop Video'}</p>
        </button>

        <button
          onClick={() => setIsScreenSharing(!isScreenSharing)}
          disabled={!isSessionActive}
          className={`p-4 rounded-lg transition-all ${
            isSessionActive
              ? isScreenSharing
                ? 'bg-secondary/20 text-secondary hover:bg-secondary/30' :'glass-surface-light hover:bg-muted/20' :'glass-surface-light opacity-50 cursor-not-allowed'
          }`}
        >
          <Icon name="Monitor" size={24} className="mx-auto mb-2" />
          <p className="text-sm font-medium">{isScreenSharing ? 'Stop Sharing' : 'Share Screen'}</p>
        </button>

        <button
          onClick={() => setIsRecording(!isRecording)}
          disabled={!isSessionActive}
          className={`p-4 rounded-lg transition-all ${
            isSessionActive
              ? isRecording
                ? 'bg-error/20 text-error hover:bg-error/30' :'glass-surface-light hover:bg-muted/20' :'glass-surface-light opacity-50 cursor-not-allowed'
          }`}
        >
          <Icon name={isRecording ? 'StopCircle' : 'Circle'} size={24} className="mx-auto mb-2" />
          <p className="text-sm font-medium">{isRecording ? 'Stop Recording' : 'Record'}</p>
        </button>
      </div>

      <div className="space-y-3">
        {!isSessionActive ? (
          <button
            onClick={onStartSession}
            className="w-full py-3 px-4 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold transition-all interactive-scale flex items-center justify-center gap-2"
          >
            <Icon name="Play" size={20} />
            <span>Start Advisory Session</span>
          </button>
        ) : (
          <button
            onClick={onEndSession}
            className="w-full py-3 px-4 rounded-lg bg-error text-error-foreground hover:bg-error/90 font-semibold transition-all interactive-scale flex items-center justify-center gap-2"
          >
            <Icon name="PhoneOff" size={20} />
            <span>End Session</span>
          </button>
        )}

        <button
          disabled={!isSessionActive}
          className={`w-full py-3 px-4 rounded-lg border border-border font-medium transition-all flex items-center justify-center gap-2 ${
            isSessionActive
              ? 'hover:bg-muted/20 text-foreground'
              : 'opacity-50 cursor-not-allowed text-muted-foreground'
          }`}
        >
          <Icon name="Users" size={20} />
          <span>Invite Participants</span>
        </button>
      </div>

      <div className="mt-6 p-4 rounded-lg bg-accent/10 border border-accent/20">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={18} color="var(--color-accent)" className="flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs text-muted-foreground">
              All sessions are automatically transcribed and archived for compliance. Recordings are encrypted and stored with blockchain verification.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionControls;