import { Box, List, ListItem, ListItemButton, ListItemText, Typography, useTheme } from "@mui/material"
import { useState } from "react";
import Notes from "./Notes";
import Itinerary from "./Itinerary";
import Budget from "./Budget";
import { useTrip } from "../../Context/TripContext";
import ClimbDescription from "../ClimbDescription";
import CragSelection from "../CragSelection";
import { Palette } from "@mui/icons-material";


const TripPlanner:React.FC = () => {
    const [activeSection, setActiveSection] = useState("Crags");
    const { trip } = useTrip();
    const [selectedClimb, setSelectedClimb] = useState<any | null>(null);
    const [parentCrag, setParentCrag] = useState<any | null>(null);
    const theme = useTheme();

    const renderMainContent = () => {

        if (selectedClimb && parentCrag) {
            return (
                <ClimbDescription
                    selectedClimb={selectedClimb}
                    parentCrag={parentCrag}
                    setSelectedClimb={setSelectedClimb}
                />
            );
        }
        switch (activeSection) {
            case "Crags":
                return <CragSelection onClimbSelect={(climb:any, crag:any) => {
                    setSelectedClimb(climb);
                    setParentCrag(crag);
                }}/>
            case "Notes":
                return <Notes></Notes>
            case "Itinerary":
                return <Itinerary></Itinerary>
            case "Budget":
                return <Budget></Budget>
        }
    }
    return (
        <Box 
            sx={{
            display: "flex", 
            height: "100vh",
            overflow: "hidden",
            }}
        >
            <Box
                sx={{
                width: "200px",
                borderRight: "1px solid #ddd",
                p: 2,
                backgroundColor: theme.palette.secondary.dark,
                color: theme.palette.primary.light,
                }}
            >
                <Typography variant="h6">
                    Trip Planner
                </Typography>
                <List>
                    {["Crags", "Notes", "Itinerary", "Budget"].map((section) => (
                        <ListItem disablePadding key={section}>
                             <ListItemButton 
                                onClick={() => {setActiveSection(section); setSelectedClimb(null); setParentCrag(null)}}
                                sx={{
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.dark,
                                    borderRadius: 2,
                                    }   
                                }}
                             >
                                <ListItemText primary={section}/>
                             </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>

            <Box 
                sx={{ 
                flex: 1, 
                p: 3,
                overflowY: "auto",
            }}
            >
                <Typography variant="h4">
                    Trip to {trip.current?.selectedArea?.area_name || "[Selected Area]"}
                </Typography>
                {renderMainContent()}
            </Box>

            <Box
                sx={{
                    width: "30%",
                    borderLeft: "1px solix #ddd",
                    p: 2,
                    backgroundColor: "#fafafa",
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Map View
                </Typography>
                <Box sx={{ height: "100%", backgroundColor: "#eaeaea" }}>
                    {/* <MapComponent area={selectedArea}/>*/}
                </Box>
            </Box>
        </Box>
    )
}

export default TripPlanner;