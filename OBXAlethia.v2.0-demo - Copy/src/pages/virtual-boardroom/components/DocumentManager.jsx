import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const DocumentManager = ({ documents, onUpload, onSign, onShare }) => {
  const [selectedDoc, setSelectedDoc] = useState(null);

  const getStatusColor = (status) => {
    const colors = {
      'Signed': 'bg-success/20 text-success',
      'Pending': 'bg-warning/20 text-warning',
      'Draft': 'bg-muted/20 text-muted-foreground',
      'Expired': 'bg-error/20 text-error'
    };
    return colors?.[status] || 'bg-muted/20 text-muted-foreground';
  };

  const getFileIcon = (type) => {
    const icons = {
      'pdf': 'FileText',
      'doc': 'FileText',
      'xlsx': 'Sheet',
      'contract': 'FileSignature'
    };
    return icons?.[type] || 'File';
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="glass-surface rounded-xl p-6 elevation-2">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Icon name="FolderOpen" size={24} color="var(--color-secondary)" />
          <h2 className="text-xl font-semibold text-foreground">Documents</h2>
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-secondary/20 text-secondary">
            {documents?.length}
          </span>
        </div>
        <button
          onClick={onUpload}
          className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-all interactive-scale text-sm font-medium flex items-center gap-2"
        >
          <Icon name="Upload" size={16} />
          <span>Upload</span>
        </button>
      </div>
      <div className="space-y-3">
        {documents?.map((doc) => (
          <div
            key={doc?.id}
            className={`glass-surface-light rounded-lg p-4 cursor-pointer transition-all duration-200 ${
              selectedDoc?.id === doc?.id
                ? 'ring-2 ring-secondary elevation-2' :'hover:elevation-2'
            }`}
            onClick={() => setSelectedDoc(doc)}
          >
            <div className="flex items-start gap-3">
              <div className="p-3 rounded-lg bg-secondary/10">
                <Icon name={getFileIcon(doc?.type)} size={24} color="var(--color-secondary)" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-foreground truncate mb-1">
                      {doc?.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">{doc?.size} • {formatDate(doc?.uploadDate)}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${getStatusColor(doc?.status)}`}>
                    {doc?.status}
                  </span>
                </div>

                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <Icon name="User" size={14} color="var(--color-muted-foreground)" />
                    <span className="text-xs text-muted-foreground">{doc?.uploadedBy}</span>
                  </div>
                  {doc?.signatures && (
                    <div className="flex items-center gap-2">
                      <Icon name="FileSignature" size={14} color="var(--color-accent)" />
                      <span className="text-xs text-muted-foreground">
                        {doc?.signatures?.signed}/{doc?.signatures?.required} signed
                      </span>
                    </div>
                  )}
                </div>

                {doc?.requiresSignature && doc?.status === 'Pending' && (
                  <div className="flex items-center gap-2 mb-3 p-2 rounded bg-warning/10">
                    <Icon name="AlertCircle" size={14} color="var(--color-warning)" />
                    <span className="text-xs text-warning font-medium">Your signature required</span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e?.stopPropagation();
                      window.open(doc?.url, '_blank');
                    }}
                    className="flex-1 py-2 px-3 rounded-lg border border-border hover:bg-muted/20 transition-colors text-xs font-medium text-foreground flex items-center justify-center gap-2"
                  >
                    <Icon name="Eye" size={14} />
                    <span>View</span>
                  </button>
                  {doc?.requiresSignature && doc?.status === 'Pending' && (
                    <button
                      onClick={(e) => {
                        e?.stopPropagation();
                        onSign(doc);
                      }}
                      className="flex-1 py-2 px-3 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-all text-xs font-medium flex items-center justify-center gap-2"
                    >
                      <Icon name="PenTool" size={14} />
                      <span>Sign</span>
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e?.stopPropagation();
                      onShare(doc);
                    }}
                    className="p-2 rounded-lg border border-border hover:bg-muted/20 transition-colors"
                    title="Share"
                  >
                    <Icon name="Share2" size={14} color="var(--color-muted-foreground)" />
                  </button>
                  <button
                    onClick={(e) => {
                      e?.stopPropagation();
                      const link = document.createElement('a');
                      link.href = doc?.url;
                      link.download = doc?.name;
                      link?.click();
                    }}
                    className="p-2 rounded-lg border border-border hover:bg-muted/20 transition-colors"
                    title="Download"
                  >
                    <Icon name="Download" size={14} color="var(--color-muted-foreground)" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 rounded-lg bg-success/10 border border-success/20">
        <div className="flex items-start gap-3">
          <Icon name="Shield" size={20} color="var(--color-success)" className="flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-1">Blockchain Verified</h4>
            <p className="text-sm text-muted-foreground">
              All documents are stored with blockchain-based audit trails and digital signatures for maximum security and compliance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentManager;
