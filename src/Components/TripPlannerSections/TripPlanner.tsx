import { Box, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material"
import { useContext, useState } from "react";
import Explore from "./Explore";
import Notes from "./Notes";
import Crags from "./CragsPage";
import Itinerary from "./Itinerary";
import Budget from "./Budget";
import { useTrip } from "../../Context/TripContext";


const TripPlanner:React.FC = () => {
    const [activeSection, setActiveSection] = useState("Explore");
    const { trip } = useTrip();

    const renderActiveSection = () => {
        switch (activeSection) {
            case "Explore":
                return <Explore></Explore>
            case "Notes":
                return <Notes></Notes>
            case "Crags":
                return <Crags></Crags>
            case "Itinerary":
                return <Itinerary></Itinerary>
            case "Budget":
                return <Budget></Budget>
        }
    }
    return (
        <Box sx={{display: "flex", height: "100vh"}}>
            <Box
                sx={{
                    width: "200px",
                    borderRight: "1px solid #ddd",
                    p: 2,
                    backgroundColor: "#f5f5f5",
                }}
            >
                <Typography variant="h6">
                    Trip Planner
                </Typography>
                <List>
                    {["Explore", "Notes", "Crags", "Itinerary", "Budget"].map((section) => (
                        <ListItem disablePadding key={section}>
                             <ListItemButton onClick={() => setActiveSection(section)}>
                                <ListItemText primary={section}/>
                             </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>

            <Box sx={{ flex: 1, p: 3 }}>
                <Typography variant="h4">
                    Trip to {trip.current?.selectedArea?.area_name || "[Selected Area]"}
                </Typography>
                {renderActiveSection()}
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