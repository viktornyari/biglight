import { createContext } from 'preact';
import { useContext, useState } from 'preact/hooks';
import type { Theme } from './theme';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'brandA',
  setTheme: () => {},
});

export function ThemeProvider({ 
  children, 
  defaultTheme = 'brandA' 
}: { 
  children: preact.ComponentChildren;
  defaultTheme?: Theme;
}) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div data-theme={theme}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
