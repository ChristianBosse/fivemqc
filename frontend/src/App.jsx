import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import MainPage from "./pages/MainPage";

import "./App.css";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

function App() {
    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <Header />
                <MainPage />
                <Footer />
            </ThemeProvider>
        </>
    );
}

export default App;
