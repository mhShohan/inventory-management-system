import { useState } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeSwitch = () => {
  // State to track whether the theme is dark
  const [isDark, setIsDark] = useState(false);

  // Function to toggle theme
  const toggleTheme = () => {
    const newTheme = !isDark ? 'dark' : 'light';
    setIsDark(!isDark);
  };

  return (
    <div className='flex items-center justify-center'>
      <button
        onClick={toggleTheme}
        className='relative inline-flex h-8 w-16 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
        style={{
          backgroundColor: isDark ? '#3b82f6' : '#e5e7eb',
        }}
      >
        <span className='sr-only'>Toggle theme</span>

        {/* Toggle circle */}
        <span
          className={`
            flex h-6 w-6 transform items-center justify-center rounded-full bg-white transition-transform
            ${isDark ? 'translate-x-9' : 'translate-x-1'}
          `}
        >
          {/* Icons */}
          {isDark ? (
            <Moon size={14} className='text-blue-700' />
          ) : (
            <Sun size={14} className='text-yellow-500' />
          )}
        </span>
      </button>
    </div>
  );
};

export default ThemeSwitch;
