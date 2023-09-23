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

const Row: React.FC<{ name: string, value: React.ReactNode }> = ({ name, value }) => (Number.isFinite(value) || typeof value === "string") ? (
    <TableRow>
        <TableCell component="th" scope="row">{name}</TableCell>
        <TableCell align="right">{value}</TableCell>
    </TableRow>
) : (<></>);

const noDecimalFormat = new Intl.NumberFormat("de", { maximumFractionDigits: 0 });
const noDecimals = (n: number | string) => noDecimalFormat.format(+n);

const decimalsFormat = new Intl.NumberFormat("de", { minimumFractionDigits: 2 });
const decimals = (n: number | string) => decimalsFormat.format(+n);

const potentialText = {
    "": ""
};

/*

    id: string, // unique id
    block_energy_usage_label: number, // 1-5
    block_touching_a_heat_line: boolean,
    spez_wb_hu: number, // Wärmbedarf pro m2
    total_wb_HU_mwh_per_ha: number,
    waermepreis_beim_kunden_pro_kwh: number,
    wb_hu: number

*/

const Sidebar: React.FC = () => {

    const { selectedBuilding } = useContext(MapContext);

    console.log("selectedBuilding", selectedBuilding);

    return (
        <Paper sx={{ boxShadow: 2, zIndex: 1, width: 400, padding: 2 }}>
            <Typography variant="h5">Gebäudeinfos</Typography>
            {selectedBuilding ? (
                <TableContainer component={Box} marginTop={2}>
                    <Table size="small">
                        <TableBody>
                            <Row name="Wärmenetz-Potenzial" value={selectedBuilding.block_energy_usage_label} />
                            <Row name="Wärmenetz heute verfügbar?" value={selectedBuilding.block_touching_a_heat_line ? "ja" : "nein"} />
                            <Row name="Spezifischer Wärmebedarf des Gebäudes (kWh/m2*a)" value={noDecimals(selectedBuilding.spez_wb_hu)} />
                            <Row name="Absoluter Wärmebedarf des Gebäudes (kWh/a)" value={noDecimals(selectedBuilding.wb_hu)} />
                            <Row name="Spezifischer Wärmebedarf des Wohnblocks (MWh/ha*a)" value={noDecimals(selectedBuilding.total_wb_HU_mwh_per_ha)} />
                            <Row name="Voraussichtlicher Fernwärmepreis" value={decimals(selectedBuilding.waermepreis_beim_kunden_pro_kwh) + " €"} />
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