import { Box } from "@mui/material";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { useTrip } from "../../Context/TripContext";
import { Icon } from "leaflet";

export const ClimbingAreaMap:React.FC = () => {
    const { trip } = useTrip();
    const carabinerIcon = new Icon({
        iconUrl: "/assets/carabinericon.png",
        iconSize: [35, 30],
        iconAnchor: [22, 94],
        popupAnchor: [0, -38]
    })

    const crags: any[] = trip?.current?.selectedArea?.children?.map((area: { metadata: any; }) => area.metadata)

    console.log(crags);

    if (!crags) {
        return (
        <Box>Map not available</Box>
    )
    }
    return (
        <Box
        >
            <MapContainer 
                center={[crags[0]?.lat, crags[0]?.lng]} 
                zoom={13} 
                scrollWheelZoom 
                style={{ height: '100vh', width: '100wh' }}
            >
                <TileLayer attribution='&copy; <a href="href="https://www.openstreetmap.org/copyright">Open Street Map</a> contributors' url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}></TileLayer>
                {crags?.map((crag, index) => (
                    <Marker 
                        position={[crag?.lat, crag?.lng]}
                        icon={carabinerIcon}
                    >
                    </Marker>
                ))}
                    {/* <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup> */}
            </MapContainer>
        </Box>
    )
}