import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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


function card(posterName, postTitle, postContent) {
  return (
    <Card variant="outlined" style={{ maxWidth: '90%', margin: 'auto', marginTop: 20 }}>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          @{posterName}
        </Typography>
        <form noValidate autoComplete="off">
          <div style={{ marginBottom: 15 }}>
            <Typography label="Title" fullWidth>
              {postTitle}
            </Typography>
          </div>
          <div style={{ marginBottom: 15 }}>
            <Typography label="Title" fullWidth>
              {postContent}
            </Typography>
          </div>
        </form>
      </CardContent>
      <CardActions style={{ justifyContent: 'space-between' }}>
        <div>
          <Tag text="Tag 1" />
          <Tag text="Tag 2" />
          <Tag text="Tag 3" />
        </div>
        <div>
          <Button size="small" color="primary">
            Like
          </Button>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button color="primary">
            Views
          </Button>
        </div>
      </CardActions>
    </Card>
  );
}


const ForumOverview = () => {
  return (
    <div style={{ paddingTop: 82 }}>
      {card("username1", "Title of post about cool topic", "Content asdlkjshaf asdfjkasldfh... adshflkjahds  ,.a sdflajsdf ")}
      {card("username2", "Title o2 2 post about cool topic", "Content asdlkjshaf asdfjkasldfh... adshflkjahds  ,.a sdflajsdf ")}
      {card("username3", "Title of post abouaölkfjdlaskjt cool topic", "Conteasdant asdlkjshaf asdfjkasldfh... adshflkjahds  ,.a sdflajsdf ")}
      {card("username1", "Title of post about cool topic", "Content asdlkjshaf asdfjkasldfh... adshflkjahds  ,.a sdflajsdf ")}
      {card("username2", "Title o2 2 post about cool topic", "Content asdlkjshaf asdfjkasldfh... adshflkjahds  ,.a sdflajsdf ")}
      {card("username3", "Title of post abouaölkfjdlaskjt cool topic", "Conteasdant asdlkjshaf asdfjkasldfh... adshflkjahds  ,.a sdflajsdf ")}
    </div>
  );
};
export default ForumOverview;