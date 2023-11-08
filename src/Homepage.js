import './Homepage.css';
import { useState } from 'react';
import TopBar from './Topbar';
import NavBar from './NavBar';
import styled from 'styled-components';
import "leaflet/dist/leaflet.css"
import { Map, MapContainer, TileLayer, Marker, Popup  } from 'react-leaflet'

const HomeContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
`;
const position = [36.372, 127.363];
function Home() {
  return (
    <HomeContainer>
      <TopBar/>
      <NavBar activeItem={'Home'}/>
      <div>
        <MapContainer center={position} zoom={13}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
        </div>
    </HomeContainer>
  );
}

export default Home;
