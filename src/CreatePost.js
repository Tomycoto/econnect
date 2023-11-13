import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import TopBar from './Topbar';
import NavBar from './NavBar';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { db } from './firebase';
import { useState } from 'react';

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



function calcDate() {
  var currentdate = new Date();
  return currentdate.getFullYear() + "/"
    + (currentdate.getMonth() + 1) + "/"
    + currentdate.getDate() + " "
    + currentdate.getHours() + ":"
    + currentdate.getMinutes();
}

function processTags(tags) {
  const tagsArray = tags.split(',');
  const tagsObject = {};
  tagsArray.forEach((tag, index) => {
    const cleanedTag = tag.trim();
    const key = `tag${index + 1}`;
    tagsObject[key] = cleanedTag;
  });

  return tagsObject;
}


const CreatePost = () => {
  const [titleValue, setTitleValue] = useState('');
  const [contentValue, setContentValue] = useState('');
  const [tagValue, setTagValue] = useState('');

  function writeForumData(title, content, likes, tags) {
    var db_ref = db.ref("forum");
    db_ref.push().set({
      username: "username", //TODO change username
      title: title,
      content: content,
      timestamp: calcDate(),
      tags: processTags(tags),
      likes: likes,
    })
      .then(() => {
        console.log("Post added successfully");
        setTagValue('');
        setTitleValue('');
        setContentValue('');
        //TODO add point additions
        //TODO maybe link to home page
      })
      .catch((error) => {
        console.error("Posting failed", error);
      });
  }

  return (
    <Container>
      <TopBar />
      <LayoutContainer>
        <NavBar activeItem={'Create Post'} />
        <Card variant="outlined" style={{ paddingTop: '8%', maxWidth: '90%', marginTop: 20 }}>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Write your post
            </Typography>
            <form noValidate autoComplete="off">
              <div style={{ marginBottom: 15 }}>
                <TextField value={tagValue} onChange={(e) => (setTagValue(e.target.value))} label="Add some tags separated by commas: e.g. gardening, tips" fullWidth />
              </div>
              <div style={{ marginBottom: 15 }}>
                <TextField value={titleValue} onChange={(e) => (setTitleValue(e.target.value))} label="Name the issue" fullWidth />
              </div>
              <div style={{ marginBottom: 15 }}>
                <TextField value={contentValue} onChange={(e) => (setContentValue(e.target.value))} label="Describe your issue" multiline rows={7} fullWidth
                />
              </div>
            </form>
          </CardContent>
          <CardActions style={{ justifyContent: 'flex-end' }}>
            <Button onClick={() => writeForumData(titleValue, contentValue, 0, tagValue)} variant="contained" >
              <EmojiEventsIcon></EmojiEventsIcon>
              +2 Post
            </Button>
          </CardActions>
        </Card>
      </LayoutContainer>
    </Container>
  );
};
export default CreatePost;