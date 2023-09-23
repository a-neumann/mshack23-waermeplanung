import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const LayerMenuContainer = styled(Box)({
    backgroundColor: "rgba(0, 0, 0, 0.15)"
});


const LayerMenu: React.FC = () => {

    return (
        <LayerMenuContainer position="absolute" zIndex={1} top={15} left={15} display="flex" justifyContent="left" gap="16px" padding={1}>
            <Button variant="contained">Layer Toggle 1</Button>
            <Button variant="contained">Layer Toggle 2</Button>
        </LayerMenuContainer>
    );
};

export default LayerMenu;