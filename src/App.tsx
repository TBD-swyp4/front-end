import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';

import GlobalFonts from './styles/GlobalFonts';
import GlobalStyles from './styles/GlobalStyles';

import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './styles/Theme';

import { useThemeStore } from '@stores/themeStore';

const App = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const [isStandalone, setIsStandalone] = useState<boolean>(false);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isIOSStandalone = (window.navigator as any)?.standalone;
    const isPWAStandalone = window.matchMedia('(display-mode: standalone)').matches;

    if (isIOSStandalone || isPWAStandalone) {
      setIsStandalone(true);
    } else {
      setIsStandalone(false);
    }
  }, []);
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyles isStandalone={isStandalone} />
      <GlobalFonts />
      <Outlet />
    </ThemeProvider>
  );
};

export default App;
