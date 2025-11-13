import React from 'react';

const Input = ({ icon, type = 'text', placeholder, value, onChange, required = false }) => {
    return (
        <div className="relative">
            {icon && (
                <div className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400">
                    {icon}
                </div>
            )}
            <input 
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                className={`w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition ${icon ? 'pl-10' : 'pl-4'}`}
            />
        </div>
    );
};

export default Input;
