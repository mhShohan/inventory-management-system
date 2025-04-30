'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

const ThemeSwitch = () => {
  const { setTheme, theme } = useTheme();
  const [isDark, setIsDark] = useState(theme === 'dark');

  useEffect(() => {
    const newTheme = isDark ? 'dark' : 'light';
    setTheme(newTheme);
  }, [isDark, setTheme]);

  return (
    <div className='flex items-center justify-center cursor-pointer'>
      <button
        onClick={() => setIsDark((p) => !p)}
        className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          isDark ? 'bg-gray-400' : 'bg-gray-700'
        }`}
      >
        <div
          className={`
            flex h-6 w-6 transform items-center justify-center rounded-full bg-white transition-transform
            ${isDark ? 'translate-x-9' : 'translate-x-1'}
          `}
        >
          {/* Icons */}
          {isDark ? <Moon size={14} /> : <Sun size={14} />}
        </div>
      </button>
    </div>
  );
};

export default ThemeSwitch;
