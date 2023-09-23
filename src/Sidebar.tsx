import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { useContext } from "react";
import MapContext from "./MapContext";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Typography } from "@mui/material";

const Row: React.FC<{ name: string, value: React.ReactNode }> = ({ name, value }) => (value || value === 0) ? (
    <TableRow>
        <TableCell component="th" scope="row">{name}</TableCell>
        <TableCell align="right">{value}</TableCell>
    </TableRow>
) : (<></>);

const noDecimalFormat = new Intl.NumberFormat("de", { maximumFractionDigits: 0 });
const noDecimals = (n: number | string) => noDecimalFormat.format(+n);

const Sidebar: React.FC = () => {

    const { selectedBuilding } = useContext(MapContext);

    return (
        <Paper sx={{ boxShadow: 2, zIndex: 1, width: 400, padding: 2 }}>
            <Typography variant="h5">Gebäudeinfos</Typography>
            {selectedBuilding ? (
                <TableContainer component={Box} marginTop={2}>
                    <Table size="small">
                        <TableBody>
                            <Row name="Gebäudetyp" value={selectedBuilding.properties.GEBAEUDETY} />
                            <Row name="Gemeinde" value={selectedBuilding.properties.Gemeindena} />
                            <Row name="Kreis" value={selectedBuilding.properties.Kreisname} />
                            <Row name="Wäremebedarf" value={noDecimals(selectedBuilding.properties.WB_HU) + " kW/h"} />
                            <Row name="Wäremebedarf pro m2" value={noDecimals(selectedBuilding.properties.WLD_ID) + " kW/h"} />
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Typography variant="body2" marginTop={1}>Auf der Karte auswählen</Typography>
            )}
        </Paper>
    );
};

export default Sidebar;