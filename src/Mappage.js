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
import ThumbUpOffAlt from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAlt from '@mui/icons-material/ThumbUpAlt';
import { useNavigate } from 'react-router-dom';

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
  background-color: #F4FEF2;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 30vw;
  height: auto;
  margin-bottom: 20px;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  overflow: auto;

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }

  input[type="text"] {
    width: 90%;
    padding: 5px;
    border: none;
    border-radius: 5px;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.2);
    margin-bottom: 10px;
  }
`;

const CommentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CommentDiv = styled.div`
  position: relative;
  font-size: small;
  flex-grow: 1;
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 0;
  left: 80px;
  border: none;
  background-color: inherit;
  cursor: pointer;
`;

const SubmitButton = styled.div`
  border: none;
  background-color: #DDDDDD;
  color: black;
  width: fit-content;
  padding: 5px 10px;
  font-size: 12px;
  cursor: pointer;
  border-radius: 10px;
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

function writeEventData(username, title, text, position) {
  var db_ref = db.ref("events");
  db_ref.push().set({
    username: username,
    title: title,
    text: text,
    position: position,
    thumbsup: 0,
    voters: ["|"],
    comments: []
  })
  .then(() => {
    console.log("Text added successfully");
  })
  .catch((error) => {
    console.error("Error adding text: ", error);
  });
}

function Mappage() {
  var navigate = useNavigate();
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
          username: value.username,
          text: value.text,
          title: value.title,
          position: value.position,
          thumbsup: value.thumbsup,
          voters: value.voters,
          comments: value.comments
        };
      });
      setMarkers(newMarkers);
      setSavedMarkers(newMarkers.map((_, idx) => idx));
      if (user) {
        let username = user.displayName.split('|')[0];
        let newClicked = newMarkers.map(marker => marker.voters.includes(username));
        setClicked(newClicked);
        //setGainedPoints(newClicked);
      }
    }
  });
  }, []);
  
  const [markers, setMarkers] = useState([]);
  const [savedMarkers, setSavedMarkers] = useState([]);
  const [clicked, setClicked] = useState([]);
  const [gainedPoints, setGainedPoints] = useState([]);
  const [showComments, setShowComments] = useState([]);
  const [currentComment, setCurrentComment] = useState("");

  const Markers = () => {
    useMapEvents({
      click: (e) => {
        setMarkers([...markers, { username: user.displayName.split('|')[0], position: e.latlng, title: '', text: '', thumbsup: 0, voters: ["|"], comments: [] }]);
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

  const changeThumbsup = (index, value) => {
    const pin = markers[index];
    let name = user.displayName.split('|')[0];
    pin.thumbsup += value;
    var newMarkers = [...markers];
    newMarkers[index] = pin;
    setMarkers(newMarkers);
    if (pin.key) {
      var itemRef = events_ref.child(pin.key);
      if (value<0){
        itemRef.update({
          thumbsup: pin.thumbsup,
          voters: pin.voters.filter(voter => voter !== name),
        });
      }
      else if (value>0) {
        itemRef.update({
          thumbsup: pin.thumbsup,
          voters: [...pin.voters, name],
        }).then(() => {
          if (!(gainedPoints[index])) {
            let newGainedPoints = [...gainedPoints];
            newGainedPoints[index] = true;
            setGainedPoints(newGainedPoints);
            let displayName = user.displayName;
            let [username, points] = displayName.split('|');
            let newPoints = parseInt(points) + 1;
            updateProfile(auth.currentUser, {
              displayName: `${username}|${newPoints}`,
            }).then(() => {
              navigate("/map");
            });
          }
        });
      }
      else {
        itemRef.update({
          thumbsup: pin.thumbsup,
        });
      }
    }
  };

  function removeMarker(index) {
    setMarkers(markers.filter((_, idx) => idx !== index));
    setSavedMarkers(savedMarkers.filter((_, idx) => idx !== index));
    setClicked(clicked.filter((_, idx) => idx !== index));
    setGainedPoints(clicked.filter((_, idx) => idx !== index));

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
      if (pin.comments && pin.comments.length){
        itemRef.update({
          username: pin.username,
          title: pin.title,
          text: pin.text,
          position: pin.position,
          thumbsup: pin.thumbsup,
          voters: pin.voters,
          comments: pin.comments
        });
      } else {
        itemRef.update({
          username: pin.username,
          title: pin.title,
          text: pin.text,
          position: pin.position,
          thumbsup: pin.thumbsup,
          voters: pin.voters,
          comments: []
        });
      }
    } else {
      if (pin.comments && pin.comments.length) {
        writeEventData(pin.username, pin.title, pin.text, pin.position, pin.thumbsup, pin.voters, pin.comments);
      } else {
        writeEventData(pin.username, pin.title, pin.text, pin.position, pin.thumbsup, pin.voters, []);  
      }
    } 
  };

  const toggleComments = (idx) => {
    let newShowComments = [...showComments];
    newShowComments[idx] = !newShowComments[idx];
    setShowComments(newShowComments);
  };

  const handleCommentChange = (event) => {
    setCurrentComment(event.target.value);
  };
  
  const handleSubmitComment = (idx) => {
    let newMarkers = [...markers];
    let marker = {...newMarkers[idx]};
    if (!marker.comments) {
      marker.comments = [];
    }
    marker.comments.push({author: user.displayName.split('|')[0], text: currentComment});
    newMarkers[idx] = marker;
    setMarkers(newMarkers);
    setCurrentComment("");
    if (marker.key) {
      var itemRef = events_ref.child(marker.key);
        itemRef.update({
          comments: marker.comments
        });
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
            <MarkerContainer style={savedMarkers.includes(idx) ? {backgroundColor: '#F4FEF2'} : {backgroundColor: 'white'}} key={idx}>
              <MarkerContent>
                <div style={{fontSize: 'small'}}>
                  @{marker.username}
                </div>
                <input 
                  type="text" 
                  placeholder="Enter title here..."
                  value={marker.title}
                  onChange={(event) => handleTitleChange(event, idx)}
                  readOnly={marker.username !== user.displayName.split('|')[0]}
                />
                <input 
                  type="text" 
                  value={marker.text}
                  placeholder="Enter content here..."
                  onChange={(event) => handleTextChange(event, idx)}
                  readOnly={marker.username !== user.displayName.split('|')[0]}
                />
                <CommentWrapper>
                  <CommentDiv>
                    Comments: {marker.comments && marker.comments.length ? marker.comments.length : 0}
                    <ArrowButton onClick={() => toggleComments(idx)}>
                      {showComments[idx] ? '▼' : '▶'}
                    </ArrowButton>
                    {showComments[idx] && 
                      <div>
                        {Array.isArray(marker.comments) && marker.comments.map((comment, commentIdx) => (
                          <div key={commentIdx}>{comment.author}: {comment.text}</div>
                        ))}
                        <input 
                          type="text" 
                          placeholder="Write a comment..."
                          value={currentComment}
                          onChange={handleCommentChange}
                        />
                        <SubmitButton onClick={() => handleSubmitComment(idx)}>Submit</SubmitButton>
                      </div>
                    }
                  </CommentDiv>
                  {marker.username === user.displayName.split('|')[0] && 
                    <>
                      <Button onClick={() => removeMarker(idx)}>✖️</Button>
                      <Button onClick={() => saveMarker(idx)}>✔️</Button>
                    </>
                  }
                  {savedMarkers.includes(idx) ? 
                    <Button onClick={() => {
                      const clickedValue = !clicked[idx];
                      let newClicked = [...clicked];
                      newClicked[idx] = clickedValue;
                      setClicked(newClicked);
                      clicked[idx] ? changeThumbsup(idx,-1) : changeThumbsup(idx,1);
                    }}>
                      {clicked[idx] ? <ThumbUpAlt /> : <ThumbUpOffAlt />} {marker.thumbsup}
                    </Button>                 
                  : null}         
                </CommentWrapper>
              </MarkerContent>
            </MarkerContainer>
          ))}
          </div>
        </div>
      </LayoutContainer>
    </MappageContainer>
  );
  
}

export default Mappage;
