import { useAtom } from "jotai";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useAtom();

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <button onClick={toggleTheme}>
      {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    </button>
  );
};

export default ThemeToggle;
