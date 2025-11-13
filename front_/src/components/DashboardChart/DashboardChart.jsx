import React, { useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ThemeContext } from '../../contexts/ThemeContext';

const data = [
  { name: 'Seg', preenchidas: 4 },
  { name: 'Ter', preenchidas: 3 },
  { name: 'Qua', preenchidas: 5 },
  { name: 'Qui', preenchidas: 4 },
  { name: 'Sex', preenchidas: 6 },
  { name: 'Sáb', preenchidas: 2 },
  { name: 'Dom', preenchidas: 1 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <p className="font-bold text-gray-800 dark:text-white">{`${label}`}</p>
        <p className="text-sm text-cyan-600 dark:text-cyan-400">{`Vagas: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const DashboardChart = () => {
  const { theme } = useContext(ThemeContext);
  const tickColor = theme === 'dark' ? '#9ca3af' : '#6b7280'; // gray-400 or gray-500

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 20,
          left: -10,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
        <XAxis dataKey="name" tick={{ fill: tickColor }} tickLine={{ stroke: tickColor }} />
        <YAxis tick={{ fill: tickColor }} tickLine={{ stroke: tickColor }} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(100, 116, 139, 0.1)' }} />
        <Legend iconType="circle" />
        <Bar dataKey="preenchidas" name="Vagas Preenchidas" fill="#0891b2" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DashboardChart;
