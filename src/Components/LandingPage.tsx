import { Box, Button } from "@mui/material"
import Navbar from "./Navbar";
import AreaSearch from "./AreaSearch";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    const handleStartPlanning = () => {
        navigate('/start-planning')
    }
    return (
        <Box>
            <Button
                onClick={handleStartPlanning}>
                Start Planning
            </Button>
        </Box>
    )
}

export default LandingPage;