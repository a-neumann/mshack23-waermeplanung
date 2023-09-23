import { MapContextProvider } from "./MapContext";
import Map from "./Map";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Sidebar from "./Sidebar";
import LayerMenu from "./LayerMenu";
import MapSliders from "./MapSliders";

const theme = createTheme({
    components: {
        MuiCssBaseline: {
            styleOverrides: `
html, body, #app {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
}
            `
        }
    }
});

const App: React.FC = () => {

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <MapContextProvider>
                <Box display="flex" flexDirection="row" justifyContent="stretch" height="100%">
                    <Sidebar />
                    <Box position="relative" flexGrow={1} alignSelf="stretch" justifySelf="stretch">
                        <LayerMenu />
                        <MapSliders />
                        <Map />
                    </Box>
                </Box>
            </MapContextProvider>
        </ThemeProvider>
    );
};

export default App;