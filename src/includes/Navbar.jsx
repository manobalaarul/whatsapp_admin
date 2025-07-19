import { useEffect, useState } from "react";
import { MdDarkMode, MdLightMode, MdMenu } from "react-icons/md";

const Navbar = ({ toggleSidebar }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    setMounted(true);
    
    // Check system preference first, then localStorage
    const getInitialTheme = () => {
      if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
          return savedTheme === "dark";
        }
        // Fallback to system preference
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      return false;
    };

    const initialDarkMode = getInitialTheme();
    setDarkMode(initialDarkMode);
    
    // Apply theme immediately
    const root = document.documentElement;
    if (initialDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, []);

  // Apply theme changes
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    
    if (darkMode) {
      root.classList.add("dark");
      try {
        localStorage.setItem("theme", "dark");
      } catch (error) {
        console.warn("Failed to save theme to localStorage:", error);
      }
    } else {
      root.classList.remove("dark");
      try {
        localStorage.setItem("theme", "light");
      } catch (error) {
        console.warn("Failed to save theme to localStorage:", error);
      }
    }
    
    // Force a repaint to ensure styles apply
    root.style.colorScheme = darkMode ? 'dark' : 'light';
  }, [darkMode, mounted]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <div className="h-16 flex items-center justify-between px-6 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <MdMenu size={20}/>
        </button>
        <h1 className="ml-4 font-bold text-lg text-gray-900 dark:text-white">Dashboard</h1>
      </div>
      <button 
        onClick={toggleDarkMode}
        className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        {darkMode ? <MdLightMode size={20}/> : <MdDarkMode size={20}/>}
      </button>
    </div>
  );
};

export default Navbar;