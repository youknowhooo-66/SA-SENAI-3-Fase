import { useState, useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import SideMenu from "../../components/SideMenu/SideMenu";
import { IconMenu, IconSun, IconMoon, IconUser, IconLogOut } from "../../components/Icons";

const Header = ({ toggleMenu }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isProfileOpen, setProfileOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-20 flex items-center justify-between
            bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-gray-200
            dark:border-gray-800 p-4 shadow-sm transition-all duration-200"
    >
      {/* Botão de menu (mobile) */}
      <button
        onClick={toggleMenu}
        className="text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 md:hidden"
      >
        <IconMenu size={24} />
      </button>

      {/* Título */}
      <div className="hidden md:block font-bold text-xl text-gray-800 dark:text-white">
        Painel do Sistema
      </div>

      {/* Ações do cabeçalho */}
      <div className="flex items-center gap-4">
        {/* Botão de tema */}
        <button
          onClick={toggleTheme}
          className="text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400
                        transition-all duration-300 transform hover:rotate-12"
        >
          {theme === "light" ? <IconMoon size={22} /> : <IconSun size={22} />}
        </button>

        {/* Perfil do usuário */}
        {user && (
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-cyan-500 transition"
            >
              <span className="hidden sm:inline font-medium">
                Olá, {user.name || user.email}
              </span>
              <div className="w-8 h-8 rounded-full bg-cyan-600 text-white flex items-center justify-center font-bold">
                {user.name ? user.name.charAt(0).toUpperCase() : "?"}
              </div>
            </button>

            {isProfileOpen && (
              <div
                className="absolute right-0 mt-3 w-52 bg-white dark:bg-gray-800 rounded-xl
                                shadow-lg ring-1 ring-black/5 dark:ring-white/10 overflow-hidden animate-fade-in z-30"
              >
                <div className="px-4 py-3 text-sm border-b border-gray-100 dark:border-gray-700">
                  <p className="font-semibold text-gray-800 dark:text-gray-100">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user.email}
                  </p>
                </div>

                <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700
                                        dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <IconUser size={16} /> Perfil
                </button>

                <button
                  onClick={logout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500
                                        hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <IconLogOut size={16} /> Sair
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

const DashboardLayout = () => {
  const [isMenuCollapsed, setMenuCollapsed] = useState(
    window.innerWidth < 768
  );
  const { theme } = useContext(ThemeContext);

  const toggleMenu = () => setMenuCollapsed(!isMenuCollapsed);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setMenuCollapsed(true);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="min-h-screen bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-950 dark:to-gray-900
        text-gray-800 dark:text-gray-200 transition-colors duration-300"
    >
      <SideMenu isCollapsed={isMenuCollapsed} toggleMenu={toggleMenu} />
      <div
        className={`transition-all duration-300 ease-in-out ${
          isMenuCollapsed ? "md:ml-20" : "md:ml-64"
        }`}
      >
        <Header toggleMenu={toggleMenu} />
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
