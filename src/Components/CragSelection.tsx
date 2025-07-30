import { Box, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import { ClimbCard } from "./ClimbCard";
import { useTrip } from "../Context/TripContext";

type Area = {
    area_name: string,
    children: Array<any>
}

const CragSelection:React.FC = () => {
    const { trip } = useTrip();
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [selectedCrag, setSelectedCrag] = useState<any | null>(null);

    const handleSelect = (index:number) => {
        setSelectedIndex(index);
        setSelectedCrag(trip.current.selectedArea.children[index]);
        console.log(selectedCrag);
    }

    if (!trip.current.selectedArea) {
        return (
            <Box>No area selected</Box>
        )
    }
    return (
        <Box sx={{
            display: "flex",
            height: "100vh"
        }}>
            <Box
                sx={{
                    width: 300,
                    borderRight: "1px solid #ccc",
                    overflowY: "auto",
                    padding: 1,
                }}
            >
                <Box
                    sx={{
                        fontWeight: "bold",
                        mb: 2
                    }}
                >
                    {trip.current.selectedArea.area_name}
                </Box>
                <List>
                    {trip.current.selectedArea.children.map((area:any, index:number) => (
                        <ListItem key={index} disablePadding>
                            <ListItemButton
                                selected={index === selectedIndex}
                                onClick={() => handleSelect(index)}
                            >
                                <ListItemText primary={area.area_name}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>

            <Box sx={{ flexGrow: 1, p: 2 }}>
                {selectedIndex !== null ? (
                    <Box>
                        <h2>{trip.current.selectedArea.children[selectedIndex].area_name}</h2>
                        <Box 
                            display="grid"
                            gridTemplateColumns="repeat(3, 1fr)"
                            gap={2}
                        >
                            {trip.current.selectedArea.children[selectedIndex].climbs.map((climb: any, index: number) => (
                                    <ClimbCard area={selectedCrag.area_name} climb={climb}></ClimbCard>
                            ))}
                        </Box>
                    </Box>
                ) :
                <Box>Select an Area from the list.</Box>}
            </Box>
        </Box>
    )
}

export default CragSelection;