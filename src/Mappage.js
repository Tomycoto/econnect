import './Mappage.css';
import { useState } from 'react';
import TopBar from './Topbar';
import NavBar from './NavBar';
import styled from 'styled-components';
import "leaflet/dist/leaflet.css"
import { Map, MapContainer, TileLayer, Marker, Popup, useMapEvents  } from 'react-leaflet'

const MappageContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
`;

const position = [40.730, -73.935];

function LocationMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
        click() {
        map.locate()
        },
        locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
        },
    })

    return position === null ? null : (
        <Marker position={position}>
        <Popup>You are here</Popup>
        </Marker>
    )
}

function Mappage() {
  return (
    <MappageContainer>
      <TopBar/>
      <NavBar activeItem={'Nearby Events'}/>
      <div>
        <MapContainer center={position} zoom={13}>
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
        </MapContainer>
        </div>
    </MappageContainer>
  );
}

export default Mappage;
