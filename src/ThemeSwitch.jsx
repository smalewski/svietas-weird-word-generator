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
    <div className="">
        <label className="">
  <input type="checkbox"
          checked={isDarkTheme}
          onChange={toggleTheme}
          className=""
   value="" />
  <div className=""></div>
</label>
    </div>
  );
}

export default ThemeSwitch;