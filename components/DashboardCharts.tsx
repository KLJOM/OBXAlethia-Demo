import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

const data = [
  { name: 'Q1', capital: 4.2, contracts: 24 },
  { name: 'Q2', capital: 8.5, contracts: 45 },
  { name: 'Q3', capital: 15.3, contracts: 89 },
  { name: 'Q4', capital: 22.1, contracts: 130 },
  { name: 'Q1 (Proj)', capital: 35.0, contracts: 210 },
];

const sectorData = [
  { name: 'Mining', value: 400 },
  { name: 'DeFi', value: 300 },
  { name: 'Real Est', value: 300 },
  { name: 'Art', value: 200 },
];

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#06b6d4'];

export const CapitalDeploymentChart: React.FC = () => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorCapital" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="name" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
          />
          <Area type="monotone" dataKey="capital" stroke="#6366f1" fillOpacity={1} fill="url(#colorCapital)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const SectorAllocationChart: React.FC = () => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={sectorData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="name" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip 
             contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
             cursor={{fill: '#1e293b'}}
          />
          <Bar dataKey="value" fill="#8884d8">
            {sectorData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
