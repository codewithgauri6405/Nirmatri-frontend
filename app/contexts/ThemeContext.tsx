"use client";

import {
  createContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  ReactNode,
} from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  effectiveTheme: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "system";
    const savedTheme = localStorage.getItem("nirmatri-theme");
    if (savedTheme === "light" || savedTheme === "dark" || savedTheme === "system") {
      return savedTheme;
    }
    return "system";
  });
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    return mediaQuery.matches ? "dark" : "light";
  });
  const mounted = useRef(false);

  // ✅ Initialize mounted state on client
  useLayoutEffect(() => {
    mounted.current = true;
  }, []);

  // ✅ Compute effective theme
  const effectiveTheme: "light" | "dark" =
    theme === "system" ? systemTheme : theme;

  // ✅ Apply theme + save
  useEffect(() => {
    if (!mounted.current) return;

    const root = document.documentElement;

    root.classList.remove("light", "dark");
    root.classList.add(effectiveTheme);

    localStorage.setItem("nirmatri-theme", theme);
  }, [theme, effectiveTheme]);

  // ✅ Listen to system theme change
  useEffect(() => {
    if (!mounted.current) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      const newSystemTheme = mediaQuery.matches ? "dark" : "light";
      setSystemTheme(newSystemTheme);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, effectiveTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}


