import Paper from "@mui/material/Paper";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const MapSliders: React.FC = () => {

    return (
        <Paper sx={{ position: "absolute", bottom: 16, right: 16, padding: 2, zIndex: 1, width: 300 }}>
            <Stack gap={1}>
                <Stack direction="row" gap={2}>
                    <Typography noWrap flexShrink={0}>Slider 1</Typography>
                    <Slider defaultValue={50} step={10} marks min={0} max={100} />
                </Stack>
                <Stack direction="row" gap={2}>
                    <Typography noWrap flexShrink={0}>Slider 2</Typography>
                    <Slider defaultValue={50} step={10} marks min={0} max={100} />
                </Stack>
            </Stack>
        </Paper>
    );
};

export default MapSliders;