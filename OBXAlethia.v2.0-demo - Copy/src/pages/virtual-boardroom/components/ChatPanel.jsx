import React, { useState, useRef, useEffect } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const ChatPanel = ({ messages, onSendMessage, participants }) => {
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (newMessage?.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date) => {
    return new Date(date)?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="glass-surface rounded-xl h-full flex flex-col elevation-2">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="MessageSquare" size={24} color="var(--color-secondary)" />
            <h2 className="text-xl font-semibold text-foreground">Discussion</h2>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-muted/20 transition-colors" title="Search">
              <Icon name="Search" size={20} color="var(--color-muted-foreground)" />
            </button>
            <button className="p-2 rounded-lg hover:bg-muted/20 transition-colors" title="Settings">
              <Icon name="Settings" size={20} color="var(--color-muted-foreground)" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages?.map((message) => (
          <div key={message?.id} className={`flex gap-3 ${message?.isCurrentUser ? 'flex-row-reverse' : ''}`}>
            {!message?.isCurrentUser && (
              <Image
                src={message?.avatar}
                alt={message?.avatarAlt}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
            )}
            
            <div className={`flex-1 max-w-[70%] ${message?.isCurrentUser ? 'flex flex-col items-end' : ''}`}>
              {!message?.isCurrentUser && (
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-foreground">{message?.sender}</span>
                  <span className="text-xs text-muted-foreground">{formatTime(message?.timestamp)}</span>
                </div>
              )}
              
              <div className={`rounded-lg p-4 ${
                message?.isCurrentUser
                  ? 'bg-secondary text-secondary-foreground'
                  : 'glass-surface-light'
              }`}>
                <p className="text-sm whitespace-pre-wrap">{message?.content}</p>
                
                {message?.attachment && (
                  <div className="mt-3 p-3 rounded-lg bg-background/50 flex items-center gap-3">
                    <Icon name="FileText" size={20} color="var(--color-accent)" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {message?.attachment?.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{message?.attachment?.size}</p>
                    </div>
                    <button className="p-1.5 rounded hover:bg-muted/20 transition-colors">
                      <Icon name="Download" size={16} color="var(--color-muted-foreground)" />
                    </button>
                  </div>
                )}
              </div>
              
              {message?.isCurrentUser && (
                <span className="text-xs text-muted-foreground mt-1">{formatTime(message?.timestamp)}</span>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-6 border-t border-border">
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e?.target?.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              rows={3}
              className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary resize-none"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <button
              className="p-3 rounded-lg hover:bg-muted/20 transition-colors"
              title="Attach File"
            >
              <Icon name="Paperclip" size={20} color="var(--color-muted-foreground)" />
            </button>
            <button
              onClick={handleSend}
              disabled={!newMessage?.trim()}
              className="p-3 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all interactive-scale"
              title="Send Message"
            >
              <Icon name="Send" size={20} />
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
          <Icon name="Lock" size={14} />
          <span>End-to-end encrypted</span>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
