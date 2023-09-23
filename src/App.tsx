import { MapContextProvider } from "./MapContext";
import Map from "./Map";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Sidebar from "./Sidebar";
import LayerMenu from "./LayerMenu";
import MapSliders from "./MapSliders";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { colors, responsiveFontSizes } from "@mui/material";

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
html, body, #app {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
}`,
    },
  },
});

const HomeIconButton = styled(IconButton)({
  position: "absolute",
  top: 16,
  right: 16,
  zIndex: 3,
});

const HeaderImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  opacity: 0.7,
});

const Typography = styled("h1")({
  position: "absolute",
  top: 370,
  right: 35,
  zIndex: 2,
  fontSize: "90",
  color: "#353d4f",
});

const TypographySlogan = styled("h3")({
  position: "absolute",
  top: 530,
  right: 35,
  zIndex: 2,
  fontSize: "30",
  color: "#353d4f",

});

const TypographyText = styled("p")({
  fontSize: "22px",
    position: "absolute",
  top: 590,
  right: 35,
  zIndex: 2,
  color: "#353d4f",
});



const App: React.FC = () => {
  const [showHomepage, setShowHomepage] = useState(true);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MapContextProvider>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="stretch"
          height="100%"
        >
          <Sidebar />
          <Box
            position="relative"
            flexGrow={1}
            alignSelf="stretch"
            justifySelf="stretch"
          >
            <LayerMenu />
            <MapSliders />
            <Map />
          </Box>
        </Box>
        <HomeIconButton onClick={() => setShowHomepage(!showHomepage)}>
          {showHomepage ? <MapOutlinedIcon /> : <HomeOutlinedIcon />}
        </HomeIconButton>
        {showHomepage && (
          <Paper
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              zIndex: 2,
              backgroundColor: "white",
            }}
          >
            <HeaderImage src="assets/header.png" />
            <Container>
              <Typography variant="h1">Münster Heat Map</Typography>
              <TypographySlogan variant="h3">
                Heating that works
              </TypographySlogan>
              <TypographyText variant="p">
                Wir informieren Münsteraner*innen und zeigen mit Hilfe von KI
                und OpenData <br></br>ihre persöhnliche zukünftige Wärmeversorgung sowie
                mögliche Alternativen.
              </TypographyText>
            </Container>
          </Paper>
        )}
      </MapContextProvider>
    </ThemeProvider>
  );
};

export default App;
