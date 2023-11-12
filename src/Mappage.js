import './Mappage.css';
import { useState, useEffect } from 'react';
import TopBar from './Topbar';
import NavBar from './NavBar';
import styled from 'styled-components';
import 'leaflet/dist/leaflet.css';
import {Button} from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents  } from 'react-leaflet';
import { Icon } from 'leaflet';
import icon from './img/loc_pin.png';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { db } from './firebase';

const MappageContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
`;

const LayoutContainer = styled.div`
  display: flex;
  grid-template-columns: 15% auto;
  height: 100vh; 
`;

const MarkerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
`;

const MarkerContent = styled.div`
  display: flex;
  flex-direction: column;
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

function writeEventData(title, text, position) {
  var db_ref = db.ref("events");
  db_ref.push().set({
    title: title,
    text: text,
    position: position
  })
  .then(() => {
    console.log("Text added successfully");
  })
  .catch((error) => {
    console.error("Error adding text: ", error);
  });
}

function Mappage() {
  var events_ref = db.ref("events");
  useEffect(() => {
    events_ref.on('value', (snapshot) => {
    const data = snapshot.val();
    const entries = Object.entries(data);
    const newMarkers = entries.map(([key, value], idx) => {
      return {
        key: key,
        text: value.text,
        title: value.title,
        position: value.position
      };
    });
    setMarkers(newMarkers);
    setSavedMarkers(newMarkers.map((_, idx) => idx));
  });
  }, []);
  
  const [markers, setMarkers] = useState([]);
  const [savedMarkers, setSavedMarkers] = useState([]);

  const Markers = () => {
    useMapEvents({
      click: (e) => {
        setMarkers([...markers, { position: e.latlng, title: '', text: '' }]);
      },
    });
    return markers.map((marker, idx) => (
      <Marker key={idx} position={marker.position} icon={defaultIcon}>
        <Popup>{marker.title}</Popup>
      </Marker>
    ));
  };

  const handleTitleChange = (event, idx) => {
    var newMarkers = [...markers];
    newMarkers[idx].title = event.target.value;
    setMarkers(newMarkers);
  };

  const handleTextChange = (event, idx) => {
    var newMarkers = [...markers];
    newMarkers[idx].text = event.target.value;
    setMarkers(newMarkers);
  };

function removeMarker(index) {
  setMarkers(markers.filter((_, idx) => idx !== index));
  if (markers[index].key!=null) {
    var itemRef = events_ref.child(markers[index].key);
    itemRef.remove()
      .then(function() {
        console.log("Remove succeeded.")
      })
      .catch(function(error) {
        console.log("Remove failed: " + error.message)
      }); 
  }
}

  const saveMarker = (index) => {
    const pin = markers[index];
    if (pin.key) {
      var itemRef = events_ref.child(pin.key);
      itemRef.update({
        title: pin.title,
        text: pin.text,
        position: pin.position
      });
    } else {
      writeEventData(pin.title, pin.text, pin.position);
    } 
    setSavedMarkers([...savedMarkers, index]);
  };


  return (
    <MappageContainer>
      <TopBar/>
      <LayoutContainer>
        <NavBar activeItem={'Nearby Events'}/>
        <div style={{display: 'flex', flexDirection: 'row', width: '85%', paddingTop: '8%'}}>
          <MapContainer style={{marginLeft: '20%', cursor: 'default', width: '50%', position: 'fixed'}} center={position} zoom={13}>
            <TileLayer
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Markers />
          </MapContainer>
          <div style={{marginLeft: '85%', width: '30%' }}>
            {markers.map((marker, idx) => (
              <MarkerContainer style={savedMarkers.includes(idx) ? {backgroundColor: '#F4FEF2'} : {}} key={idx}>
                <MarkerContent>
                  <input 
                    type="text" 
                    placeholder="Enter title here..."
                    value={marker.title}
                    onChange={(event) => handleTitleChange(event, idx)}
                  />
                  <input 
                    type="text" 
                    value={marker.text}
                    placeholder="Enter content here..."
                    onChange={(event) => handleTextChange(event, idx)}
                  />
                </MarkerContent>
                <Button onClick={() => removeMarker(idx)}> <CloseIcon/></Button>
                <Button onClick={() => saveMarker(idx)}> <CheckIcon/></Button>
              </MarkerContainer>
            ))}
          </div>
        </div>
      </LayoutContainer>
    </MappageContainer>
  );
}

export default Mappage;
