import React from 'react';
import { IconCalendar, IconClock, IconUsers, IconBarChart } from '../../components/Icons';
import DashboardChart from '../../components/DashboardChart/DashboardChart';
import StatCard from '../../components/Card/StatCard';

const Dashboard = () => {
  return (
    <div className="animate-fade-in">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
            Visão Geral
        </h1>

        {/* Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <StatCard 
                icon={<IconCalendar size={24} className="text-cyan-600 dark:text-cyan-400" />}
                title="Agendamentos Hoje"
                value="24"
                change="+5"
                changeType="positive"
            />
            <StatCard 
                icon={<IconClock size={24} className="text-cyan-600 dark:text-cyan-400" />}
                title="Vagas Disponíveis"
                value="12"
                change="-2"
                changeType="negative"
            />
            <StatCard 
                icon={<IconUsers size={24} className="text-cyan-600 dark:text-cyan-400" />}
                title="Novos Pacientes"
                value="8"
                change="+10%"
                changeType="positive"
            />
        </div>

        {/* Chart Section */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <IconBarChart size={22} />
                Vagas Preenchidas na Semana
            </h2>
            <div className="h-80">
                <DashboardChart />
            </div>
        </div>
    </div>
  )
}

export default Dashboard;