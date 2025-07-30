import { useLazyQuery } from "@apollo/client"
import { Box, IconButton, TextField } from "@mui/material"
import { GET_AREAS } from "../GraphQL/AreaSearchQuery"
import { useRef } from "react"
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { useNavigate } from "react-router-dom";
import { useTrip } from "../Context/TripContext";

const AreaSearch:React.FC = () => {
    const navigate = useNavigate();
    const searchArea = useRef<HTMLInputElement>(null);
    const startDate = useRef<Date | null>(null);
    const endDate = useRef<Date | null>(null);
    // const [selectedArea, setSelectedArea] = useState<any>(null);
    const { trip } = useTrip();
    const [getAreas, { loading, error, data }] = useLazyQuery(GET_AREAS);

    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault();
        const value = searchArea.current?.value.trim();
        if (!trip || !value) return;
        getAreas({ variables: { area: value }}).then((res) => {
            const areas = res.data?.areas || [];
            if (areas.length) {
                const [areaWithMostChildren] = [...areas].sort(
                    (a, b) => b.children.length - a.children.length
        );

            trip.current.selectedArea = areaWithMostChildren;
            trip.current.startDate = startDate.current;
            trip.current.endDate = endDate.current;
            // setSelectedArea(areaWithMostChildren);
            navigate("/trip-planner");
            }
        });
    }

    // useEffect(() => {
    //     if (!data?.areas?.length)
    //         return; 
    //     const [areaWithMostChildren] = [...data.areas].sort(
    //         (a, b) => b.children.length - a.children.length
    //     );
    //     setSelectedArea(areaWithMostChildren);
    //     console.log(selectedArea);
    // }, [data, selectedArea]);

    return (
            <Box 
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                    flexWrap: "wrap",
                }}
                >
                <TextField
                    id="search-area"
                    className="text"
                    inputRef={searchArea}
                    label="Where to?"
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                        label="Start Date"
                        onChange={(newDate) => {
                            startDate.current = newDate?.toDate() ?? null
                        }}
                    />
                    <DesktopDatePicker
                        label="End Date"
                        onChange={(newDate) => {
                            endDate.current = newDate?.toDate() ?? null
                        }}
                    />
                </LocalizationProvider>
                <IconButton type="submit" aria-label="search">
                    Start Planning
                </IconButton>
            </Box>
    )
}

export default AreaSearch;