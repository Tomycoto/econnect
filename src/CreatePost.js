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

const CreatePost = () => {
  return (
    <Container>
      <TopBar />
      <LayoutContainer>
        <NavBar activeItem={'Create Post'} />
        <Card variant="outlined" style={{paddingTop: 82, maxWidth: '90%', marginTop: 20 }}>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Write your post
            </Typography>
            <form noValidate autoComplete="off">
              <div style={{ marginBottom: 15 }}>
                <TextField label="Add some tags: e.g. gardening, tips" fullWidth />
              </div>
              <div style={{ marginBottom: 15 }}>
                <TextField label="Name the issue" fullWidth />
              </div>
              <div style={{ marginBottom: 15 }}>
                <TextField
                  label="Describe your issue" multiline rows={7} fullWidth
                />
              </div>
            </form>
          </CardContent>
          <CardActions style={{ justifyContent: 'flex-end' }}>
            <Button variant="contained" >
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