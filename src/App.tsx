import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';

import { lightTheme } from './styles/Theme';
import GlobalStyles from './styles/GlobalStyles';
import GlobalFonts from './styles/GlobalFonts';

const App = () => {
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
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles isStandalone={isStandalone} />
      <GlobalFonts />
      <Outlet />
    </ThemeProvider>
  );
};

export default App;
