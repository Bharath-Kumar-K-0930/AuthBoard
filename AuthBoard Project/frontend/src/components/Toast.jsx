import React, { useEffect } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaTimes } from 'react-icons/fa';

const Toast = ({ toast, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(toast.id);
        }, 5000); // Auto close after 5 seconds

        return () => clearTimeout(timer);
    }, [toast.id, onClose]);

    const bgColors = {
        success: 'bg-galactic-card border-galactic-blue shadow-[0_0_15px_rgba(56,189,248,0.3)]',
        error: 'bg-galactic-card border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.3)]',
        info: 'bg-galactic-card border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
    };

    const icons = {
        success: <FaCheckCircle className="text-green-400 text-xl" />,
        error: <FaExclamationCircle className="text-red-400 text-xl" />,
        info: <FaExclamationCircle className="text-purple-400 text-xl" />
    };

    return (
        <div className={`flex items-center gap-3 p-4 rounded-xl border ${bgColors[toast.type] || bgColors.info} backdrop-blur-xl text-white min-w-[300px] animate-slide-in-right relative overflow-hidden group transition-all duration-300 hover:scale-[1.02]`}>
            <div className="shrink-0">{icons[toast.type] || icons.info}</div>
            <div className="flex-1 text-sm font-medium">{toast.message}</div>
            <button
                onClick={() => onClose(toast.id)}
                className="text-gray-400 hover:text-white transition-colors"
            >
                <FaTimes />
            </button>

            {/* Progress Bar Animation */}
            <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent w-full animate-progress" />
        </div>
    );
};

export default Toast;
