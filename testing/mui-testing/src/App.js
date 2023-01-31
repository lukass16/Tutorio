import { createTheme } from "@mui/material/styles";

import { themeSettings } from "./theme.js";
import { ThemeProvider } from "@mui/material";

// import Topbar from "./components/Topbar";
// import ResponsiveAppBar from "./components/ResponsiveAppBar.js";
import NavBar from "./components/NavBar.js";
import Calendar from "./components/Calendar"

const theme = createTheme({ themeSettings });

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <main>
        <Calendar />
      </main>
      <div className="app"> This contains the SPAs</div>
    </ThemeProvider>
  );
};

export default App;
