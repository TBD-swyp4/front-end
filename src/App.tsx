import { ThemeProvider } from 'styled-components';

import { lightTheme } from './styles/Theme';
import GlobalStyles from './styles/GlobalStyles';
import GlobalFonts from './styles/GlobalFonts';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <GlobalFonts />
      <Outlet />
    </ThemeProvider>
  );
};

export default App;
