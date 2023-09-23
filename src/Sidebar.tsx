import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";

const Sidebar: React.FC = () => {

    return (
        <Paper sx={{ boxShadow: 2, zIndex: 1, width: 300, padding: 2 }}>
            <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
                <TextField placeholder="address" sx={{ flexGrow: 1 }} />
                <IconButton>
                    <SearchIcon />
                </IconButton>
            </Box>
        </Paper>
    );
};

export default Sidebar;