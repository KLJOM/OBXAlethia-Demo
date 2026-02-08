import React from 'react';

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const ComplianceAnalytics = ({ trendData, riskData }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="glass-surface rounded-lg p-6 elevation-2">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Compliance Trends</h2>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 rounded-lg text-xs font-medium bg-muted/50 text-muted-foreground hover:bg-muted transition-colors">
              7D
            </button>
            <button className="px-3 py-1 rounded-lg text-xs font-medium bg-secondary/20 text-secondary">
              30D
            </button>
            <button className="px-3 py-1 rounded-lg text-xs font-medium bg-muted/50 text-muted-foreground hover:bg-muted transition-colors">
              90D
            </button>
          </div>
        </div>
        <div className="h-64" aria-label="Compliance Trends Line Chart">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
              <XAxis dataKey="date" stroke="var(--color-muted-foreground)" style={{ fontSize: '12px' }} />
              <YAxis stroke="var(--color-muted-foreground)" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(30, 41, 59, 0.95)',
                  border: '1px solid rgba(51, 65, 85, 0.3)',
                  borderRadius: '8px',
                  color: 'var(--color-foreground)'
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="compliance" stroke="var(--color-success)" strokeWidth={2} dot={{ fill: 'var(--color-success)' }} />
              <Line type="monotone" dataKey="issues" stroke="var(--color-error)" strokeWidth={2} dot={{ fill: 'var(--color-error)' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass-surface rounded-lg p-6 elevation-2">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Risk Distribution</h2>
          <button className="text-sm text-secondary hover:text-secondary/80 transition-colors">
            View Details
          </button>
        </div>
        <div className="h-64" aria-label="Risk Distribution Bar Chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={riskData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
              <XAxis dataKey="category" stroke="var(--color-muted-foreground)" style={{ fontSize: '12px' }} />
              <YAxis stroke="var(--color-muted-foreground)" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(30, 41, 59, 0.95)',
                  border: '1px solid rgba(51, 65, 85, 0.3)',
                  borderRadius: '8px',
                  color: 'var(--color-foreground)'
                }}
              />
              <Legend />
              <Bar dataKey="low" fill="var(--color-success)" radius={[8, 8, 0, 0]} />
              <Bar dataKey="medium" fill="var(--color-warning)" radius={[8, 8, 0, 0]} />
              <Bar dataKey="high" fill="var(--color-error)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ComplianceAnalytics;
