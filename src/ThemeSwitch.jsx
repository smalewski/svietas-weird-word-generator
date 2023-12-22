import { useEffect, useState } from 'react';

function handleThemeToggle() {

    // if set via local storage previously
    if (localStorage.getItem('dark-theme')) {
        if (localStorage.getItem('dark-theme') === 'light') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('dark-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('dark-theme', 'light');
        }

    // if NOT set via local storage previously
    } else {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('dark-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('dark-theme', 'dark');
        }
    }
}

function ThemeSwitch() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
    handleThemeToggle();
  };

  useEffect(() => {
// Change the icons inside the button based on previous settings
if (localStorage.getItem('dark-theme') === 'true' || (!('dark-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    setIsDarkTheme(true);
} else {
    setIsDarkTheme(false);
}
}, [])


    


  return (
    <div className="theme-switch">
        <label className="relative inline-flex items-center cursor-pointer">
  <input type="checkbox"
          checked={isDarkTheme}
          onChange={toggleTheme}
          className="sr-only peer theme-switch-checkbox"
   value="" />
  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
</label>
    </div>
  );
}

export default ThemeSwitch;