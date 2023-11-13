import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { db } from './firebase';
import { useState, useEffect } from 'react';

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


const ForumOverview = () => {
  var forum_ref = db.ref("forum");
  const [forumData, setForumData] = useState([]);

  const sortedForumData = forumData.sort((a, b) => {
    const timestampA = new Date(a.timestamp).getTime();
    const timestampB = new Date(b.timestamp).getTime();
    return timestampB - timestampA;
  });

  const incrementLikes = (index) => {
    const clickedCard = forumData[index];
    clickedCard.likes += 1;
    if (clickedCard.key) {
      var itemRef = forum_ref.child(clickedCard.key);
      itemRef.update({
        likes: clickedCard.likes
      });
    }
    var newData = [...forumData];
    newData[index] = clickedCard;
    setForumData(newData);
  };  


  useEffect(() => {
    forum_ref.on('value', (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const entries = Object.entries(data);
      const allPosts = entries.map(([key, value], idx) => {
        return {
          key: key,
          content: value.content,
          title: value.title,
          timestamp: value.timestamp,
          username: value.username,
          likes: value.likes,
          tags: value.tags
        };
      });
      setForumData(allPosts);
    }
  });
  }, []);

  function card(posterName, postTitle, postContent, postTags, likes, timestamp, index) {
    return (
      <Card variant="outlined" style={{ maxWidth: '90%', margin: 'auto', marginTop: 20 }}>
        <CardContent>
          <Typography variant="body1" component="div" gutterBottom>
            @{posterName} - <span style={{ color: '#888' }}>{timestamp}</span>
          </Typography>
          <form noValidate autoComplete="off">
            <div style={{ marginBottom: 15 }}>
              <Typography variant="body1" style={{ fontWeight: 'bold' }} label="Title" fullWidth>
                {postTitle}
              </Typography>
            </div>
            <div style={{ marginBottom: 15 }}>
              <Typography variant='body1' label="Content" fullWidth>
                {postContent}
              </Typography>
            </div>
          </form>
        </CardContent>
        <CardActions style={{ justifyContent: 'space-between' }}>
          <div>
            {Object.values(postTags).map((tagText, index) => (
              <Tag key={index} text={tagText} />
            ))}
          </div>
          <div>
            <Button size="small" color="primary" onClick={() => incrementLikes(index)}>
              👍 {likes}
            </Button>
            <Button size="small" color="primary">
              Share
            </Button>  {/*TODO maybe add view count*/}
          </div>
        </CardActions>
      </Card>
    );
  }

  return (
    <div style={{ paddingTop: '8%' }}>
      {sortedForumData.map((data, index) => ( //TODO change to forumData
        <div key={index}>
          {card(data.username, data.title, data.content, data.tags, data.likes, data.timestamp, index)}
        </div>
      ))}
    </div>
  );
};
export default ForumOverview;