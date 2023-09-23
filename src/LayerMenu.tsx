import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useContext } from "react";
import MapContext from "./MapContext";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const LayerMenuContainer = styled(Box)({
    backgroundColor: "rgba(0, 0, 0, 0.15)"
});


const LayerMenu: React.FC = () => {

    const { showAreas, setShowAreas } = useContext(MapContext);

    return (
        <LayerMenuContainer position="absolute" zIndex={1} top={15} left={15} display="flex" justifyContent="left" gap="16px" padding={1}>
            {showAreas ? (
                <Button
                    variant="contained"
                    startIcon={<VisibilityIcon />}
                    onClick={() => setShowAreas(false)}
                >
                    Baublöcke
                </Button>
            ) : (
                <Button
                    variant="contained"
                    startIcon={<VisibilityOffIcon />}
                    onClick={() => setShowAreas(true)}
                >
                    Baublöcke
                </Button>
            )}
        </LayerMenuContainer>
    );
};

export default LayerMenu;