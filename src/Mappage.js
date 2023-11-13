import './Mappage.css';
import TopBar from './Topbar';
import NavBar from './NavBar';
import { db } from './firebase';
import { useState, useEffect } from 'react';
import {Button} from '@mui/material';
import styled from 'styled-components';
import { Icon } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents  } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import icon from './img/loc_pin.png';
import { getAuth, updateProfile } from "firebase/auth";

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
    position: position,
    thumbsup: 0
  })
  .then(() => {
    console.log("Text added successfully");
  })
  .catch((error) => {
    console.error("Error adding text: ", error);
  });
}

function Mappage() {
  const auth = getAuth();
  const user = auth.currentUser;
  var events_ref = db.ref("events");
  useEffect(() => {
    events_ref.on('value', (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const entries = Object.entries(data);
      const newMarkers = entries.map(([key, value], idx) => {
        return {
          key: key,
          text: value.text,
          title: value.title,
          position: value.position,
          thumbsup: value.thumbsup
        };
      });
      setMarkers(newMarkers);
      setSavedMarkers(newMarkers.map((_, idx) => idx));
    }
  });
  }, []);
  
  const [markers, setMarkers] = useState([]);
  const [savedMarkers, setSavedMarkers] = useState([]);

  const Markers = () => {
    useMapEvents({
      click: (e) => {
        setMarkers([...markers, { position: e.latlng, title: '', text: '', thumbsup: 0 }]);
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

  const incrementThumbsup = (index) => {
    const pin = markers[index];
    pin.thumbsup += 1;
    if (pin.key) {
      var itemRef = events_ref.child(pin.key);
      itemRef.update({
        title: pin.title,
        text: pin.text,
        position: pin.position,
        thumbsup: pin.thumbsup
      });
    }
    var newMarkers = [...markers];
    newMarkers[index] = pin;
    setMarkers(newMarkers);
    if (user !== null) {
      const displayName = user.displayName;
      const [username, points] = displayName.split('|');
      const newPoints = parseInt(points) + 1;
      updateProfile(auth.currentUser, {
        displayName: `${username}|${newPoints}`,
      })
      .then(() => {
        // Profile updated successfully!
        console.log(`New points: ${newPoints}`);
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
    }
    
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
    setSavedMarkers([...savedMarkers, index]);
    if (pin.key) {
      var itemRef = events_ref.child(pin.key);
      itemRef.update({
        title: pin.title,
        text: pin.text,
        position: pin.position,
        thumbsup: pin.thumbsup
      });
    } else {
      writeEventData(pin.title, pin.text, pin.position, pin.thumbsup);
    } 
  };


  return (
    <MappageContainer>
      <TopBar/>
      <LayoutContainer>
        <NavBar activeItem={'Nearby Events'}/>
        <div style={{display: 'flex', flexDirection: 'row', width: '85%', paddingTop: '8%'}}>
          <MapContainer style={{marginLeft: '17%', cursor: 'default', width: '50%', position: 'fixed'}} center={position} zoom={13}>
            <TileLayer
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Markers />
          </MapContainer>
          <div style={{marginLeft: '80%', width: '35%' }}>
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
                <Button onClick={() => removeMarker(idx)}>✖️</Button>
                <Button onClick={() => saveMarker(idx)}>✔️</Button>
                <Button onClick={() => incrementThumbsup(idx)}>👍 {marker.thumbsup}</Button>
              </MarkerContainer>
            ))}
          </div>
        </div>
      </LayoutContainer>
    </MappageContainer>
  );
}

export default Mappage;
