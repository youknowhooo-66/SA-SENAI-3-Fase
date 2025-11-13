import React from 'react';

const Button = ({ type = 'button', onClick, children, className = '', fullWidth = false }) => {
    const baseClasses = "font-bold p-3 rounded-lg focus:ring-4 focus:outline-none transition-all duration-300 transform";
    
    const widthClass = fullWidth ? 'w-full' : '';

    // The default className will be for the primary button style
    const defaultStyle = "bg-cyan-600 text-white hover:bg-cyan-700 focus:ring-cyan-500/50 hover:scale-105";

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${baseClasses} ${widthClass} ${className || defaultStyle}`}
        >
            {children}
        </button>
    );
};

export default Button;
