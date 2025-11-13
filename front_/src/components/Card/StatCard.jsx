import React from 'react';

const StatCard = ({ icon, title, value, change, changeType }) => {
    const isPositive = changeType === 'positive';
    const changeColor = isPositive ? 'text-green-500' : 'text-red-500';

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex items-start gap-4">
            <div className="bg-cyan-100 dark:bg-cyan-900/50 p-3 rounded-lg">
                {icon}
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
                {change && (
                    <p className={`text-xs mt-1 ${changeColor}`}>
                        {change} vs. semana passada
                    </p>
                )}
            </div>
        </div>
    );
};

export default StatCard;
