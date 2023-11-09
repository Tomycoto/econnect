import './Mappage.css';
import { useState } from 'react';
import TopBar from './Topbar';
import NavBar from './NavBar';
import styled from 'styled-components';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents  } from 'react-leaflet';
import { Icon } from 'leaflet';
import icon from './img/loc_pin.png';

const MappageContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
`;

const LayoutContainer = styled.div`
  display: grid;
  grid-template-columns: 15% auto;
  height: 100vh;
`;

const position = [36.372, 127.363];

const defaultIcon = new Icon({
  iconUrl: icon,
  iconRetinaUrl: icon,
  iconAnchor: [8, 20],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [16, 20],
});

function Mappage() {
  const [markerPositions, setMarkerPositions] = useState([]);

  const Markers = () => {
    useMapEvents({
      click: (e) => {
        setMarkerPositions([...markerPositions, e.latlng]);
      },
    });
    return markerPositions.map((position, idx) => (
      <Marker key={idx} position={position} icon={defaultIcon}>
        <Popup>You clicked here</Popup>
      </Marker>
    ));
  };

  return (
    <MappageContainer>
      <TopBar/>
      <LayoutContainer>
        <NavBar activeItem={'Nearby Events'}/>
        <div style={{ display: 'flex' }}>
          <MapContainer style={{ width: '70%', cursor: 'default'}} center={position} zoom={13}>
            <TileLayer
              attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Markers />
          </MapContainer>
          <div style={{ width: '30%', overflowY: 'auto' }}>
            {markerPositions.map((pos, idx) => (
              <p key={idx}>{`Marker ${idx + 1}: ${pos.lat}, ${pos.lng}`}</p>
            ))}
          </div>
        </div>
      </LayoutContainer>
    </MappageContainer>
  );
}



export default Mappage;
