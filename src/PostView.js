import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import { db } from './firebase';
import { useState, useEffect } from 'react';
import TopBar from './Topbar';
import { TextField } from '@mui/material';
import { useParams } from 'react-router-dom';
import NavBar from './NavBar';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import SendIcon from '@mui/icons-material/Send';
import { getAuth, updateProfile } from 'firebase/auth';
import SocialMediaPopup from './SocialMediaPopup';


const Container = styled.div`
  max-width: 100%;
  margin: 0 auto;
  paddingTop: 86;
`;

const LayoutContainer = styled.div`
  display: grid;
  grid-template-columns: 15% 85%;
  height: 100vh;
`;

const Tag = ({ text }) => {
    return (
        <div style={{
            display: 'inline-block',
            backgroundColor: '#f2f2f2',
            color: '#333',
            padding: '5px 10px',
            borderRadius: '5px',
            margin: '5px',
            fontSize: '14px'
        }}>
            {text}
        </div>
    );
};

const IconTag = ({ text }) => {
    return (
        <div style={{
            backgroundColor: '#f2f2f2',
            color: '#333',
            padding: '5px 10px',
            borderRadius: '5px',
            margin: '5px',
            fontSize: '17px',
            display: 'flex',

        }}>
            <ChatBubbleIcon></ChatBubbleIcon>
            {text}
        </div>
    );
};


const PostView = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const { key } = useParams();
    const [replyValue, setReplyValue] = useState('');
    const [currentData, setCurrentData] = useState({});

    function calcDate() {
        var currentdate = new Date();
        return currentdate.getFullYear() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getDate() + " "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes();
    }

    const sortedData = (data) => data.sort((a, b) => {
        const timestampA = new Date(a.timestamp).getTime();
        const timestampB = new Date(b.timestamp).getTime();
        return timestampB - timestampA;
    });

    const replyCount = Object.keys(currentData.replies ?? {}).length;

    function writeReplyData(content) {
        var newReplyData = {
            content: content,
            username: user.displayName.split('|')[0],
            timestamp: calcDate()
        };

        const replyKey = `reply${replyCount + 1}`;
        var update = { ...currentData.replies, [replyKey]: newReplyData };

        db.ref("forum/" + key + "/replies").update(update)
            .then(() => {
                setReplyValue('');
                let displayName = user.displayName;
                let [username, points] = displayName.split('|');
                let newPoints = parseInt(points) + 1;
                updateProfile(auth.currentUser, {
                    displayName: `${username}|${newPoints}`,
                })
                window.location.reload();
            })
            .catch((error) => {
                console.error("Error adding new reply:", error);
            });
    }

    const fetchCurrentData = async () => {
        var forum_ref = db.ref("forum");
        var currentEntryRef = forum_ref.child(key);
        try {
            const snapshot = await currentEntryRef.once("value");
            const entryData = snapshot.val();
            if (entryData) {
                setCurrentData(entryData);
            } else {
                console.log("Specific entry not found.");
            }
        } catch (error) {
            console.error("Error retrieving specific entry:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Assuming fetchDataFunction is an asynchronous function that fetches your data
                const result = await fetchCurrentData();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);



    const card = () => {
        return (

            <Card style={{ maxWidth: '90%', margin: 'auto', marginTop: 20 }} variant="outlined" >
                <CardContent>
                    <Typography variant="body1" component="div" gutterBottom>
                        @{currentData.username} - <span style={{ color: '#888' }}>{currentData.timestamp}</span>
                    </Typography>
                    <form noValidate autoComplete="off">
                        <div style={{ marginBottom: 15 }}>
                            <Typography variant="body1" style={{ fontWeight: 'bold' }} label="Title" fullWidth>
                                {currentData.title}
                            </Typography>
                        </div>
                        <div style={{ marginBottom: 15 }}>
                            <Typography variant='body1' label="Content" fullWidth>
                                {currentData.content}
                            </Typography>
                        </div>
                    </form>
                </CardContent>
                <CardActions style={{ justifyContent: 'space-between' }}>
                    <div>
                        {Object.values(currentData.tags).map((tagText, index) => (
                            <Tag key={index} text={tagText} />
                        ))}
                    </div>
                    <div style={{display: 'flex'}}>
                        <IconTag key="replyAmount" text={replyCount} />
                        <SocialMediaPopup></SocialMediaPopup>
                    </div>
                </CardActions>
            </Card >
        );
    }

    function replyCard(replyData) {
        return (
            <Card style={{ maxWidth: '90%', margin: 'auto', marginTop: 20 }} variant="outlined">
                <CardContent>
                    <Typography variant="body1" component="div" gutterBottom>
                        @{replyData.username} - <span style={{ color: '#888' }}>{replyData.timestamp}</span>
                    </Typography>
                    <form noValidate autoComplete="off">
                        <div style={{ marginBottom: 15 }}>
                            <Typography variant='body1' label="Content" fullWidth>
                                {replyData.content}
                            </Typography>
                        </div>
                    </form>
                </CardContent>
            </Card>
        );
    }

    return (
        <div >
            <Container>
                <TopBar></TopBar>
                <LayoutContainer>
                    <NavBar></NavBar>
                    <div style={{ paddingTop: '8%' }}>
                        {(Object.keys(currentData).length > 0) ? (
                            card()
                        ) : <div></div>}
                        <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '90%', margin: 'auto', marginTop: 20 }}>
                            <TextField style={{ paddingRight: '2%' }} value={replyValue} onChange={(e) => (setReplyValue(e.target.value))} label="Add a reply" fullWidth />
                            <Button onClick={() => writeReplyData(replyValue)} variant="contained"> <SendIcon></SendIcon> </Button>
                        </div>
                        {(Object.keys(currentData).length > 0 && (replyCount > 0)) ? sortedData(Object.values(currentData.replies)).map((reply) => (
                            replyCard(reply)
                        )) : <div style={{ maxWidth: '90%', margin: 'auto', marginTop: 20 }}>No replies yet</div>}
                    </div>
                </LayoutContainer>
            </Container>
        </div >)
};
export default PostView;