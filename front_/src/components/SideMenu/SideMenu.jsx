import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
    IconDashboard, 
    IconCalendarCheck, 
    IconUsers, 
    IconLogOut,
    IconClose,
    IconTicket
} from "../Icons";

// Componente para cada item do menu
const MenuItem = ({ to, icon, children, isCollapsed }) => (
    <li>
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center p-3 my-1 rounded-lg transition-colors duration-200 ${
                isActive
                    ? 'bg-cyan-600 text-white shadow-lg'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                }`
            }
        >
            {icon}
            <span className={`overflow-hidden transition-all duration-200 ${isCollapsed ? 'w-0 ml-0' : 'w-full ml-3'}`}>
                {children}
            </span>
        </NavLink>
    </li>
);

const SideMenu = ({ isCollapsed, toggleMenu }) => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <>
            {/* Overlay for mobile */}
            <div 
                className={`fixed inset-0 bg-black/60 z-30 md:hidden ${isCollapsed ? 'hidden' : 'block'}`}
                onClick={toggleMenu}
            ></div>

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 text-gray-800 dark:text-white flex flex-col transition-all duration-300 ease-in-out z-40 ${
                    isCollapsed ? '-translate-x-full md:translate-x-0 md:w-20' : 'translate-x-0 w-64'
                }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
                    <div className={`flex items-center gap-2 overflow-hidden transition-all duration-200 ${isCollapsed ? 'md:w-0' : 'w-full'}`}>
                        <IconTicket size={28} className="text-cyan-600" />
                        <h1 className="font-bold text-xl whitespace-nowrap">
                            SA-SENAI
                        </h1>
                    </div>
                    <button
                        onClick={toggleMenu}
                        className="text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 focus:outline-none md:hidden"
                    >
                        <IconClose size={24} />
                    </button>
                </div>

                {/* Menu */}
                <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
                    <ul>
                        <MenuItem to="/dashboard" icon={<IconDashboard size={20} />} isCollapsed={isCollapsed}>
                            Dashboard
                        </MenuItem>
                        <MenuItem to="/appointments" icon={<IconCalendarCheck size={20} />} isCollapsed={isCollapsed}>
                            Agendamentos
                        </MenuItem>
                        <MenuItem to="/admin/appointments/create" icon={<IconCalendarCheck size={20} />} isCollapsed={isCollapsed}>
                            Criar Agendamento
                        </MenuItem>
                        <MenuItem to="/patients" icon={<IconUsers size={20} />} isCollapsed={isCollapsed}>
                            Pacientes
                        </MenuItem>
                    </ul>
                </nav>

                {/* Footer */}
                <div className="p-2 border-t border-gray-200 dark:border-gray-800">
                    <button
                        className="flex items-center p-3 my-1 w-full rounded-lg transition-colors duration-200 text-red-500 dark:text-red-500/90 hover:bg-red-500 hover:text-white dark:hover:bg-red-500"
                        onClick={handleLogout}
                    >
                        <IconLogOut size={20} />
                        <span className={`overflow-hidden transition-all duration-200 ${isCollapsed ? 'w-0 ml-0' : 'w-full ml-3'}`}>
                            Sair
                        </span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default SideMenu;