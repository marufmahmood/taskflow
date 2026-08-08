import { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <>
      <AppRoutes />

      <Toaster
        position="top-right"
        reverseOrder={false}
      />

      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed bottom-5 right-5 z-50 w-12 h-12 rounded-full bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-lg hover:scale-105 transition"
        title={darkMode ? "Light Mode" : "Dark Mode"}
      >
        {darkMode ? "☀️" : "🌙"}
      </button>
    </>
  );
}

export default App;