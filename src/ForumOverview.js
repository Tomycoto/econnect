import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function card(posterName, postTitle, postContent) {
  return (
    <Card variant="outlined" style={{ maxWidth: '70%', margin: 'auto', marginTop: 20 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {posterName}
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
      <CardActions style={{ justifyContent: 'flex-end' }}>
        <Button size="small" color="primary">
          Like
        </Button>
        <Button size="small" color="primary">
          Share
        </Button>
        <Typography color="primary">
          Views
        </Typography>
      </CardActions>
    </Card>
  );
}


const ForumOverview = () => {
  return (
    <div>
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