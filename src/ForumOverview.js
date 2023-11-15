import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { db } from './firebase';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import FavoriteIcon from '@mui/icons-material/Favorite';

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

const ForumOverview = () => {
  var forum_ref = db.ref("forum");
  const [forumData, setForumData] = useState([]);
  const navigate = useNavigate();

  const handleCardClick = (index) => {
    navigate(`/post/${index}`);
  };

  const replyCount = (currentData) => (currentData) ? Object.keys(currentData.replies ?? {}).length : 0;

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
            tags: value.tags,
            replies: value.replies
          };
        });
        setForumData(allPosts);
      }
    });
  }, [forum_ref]);

  function card(data, index) {
    console.log(data)
    return (
      <Card style={{ maxWidth: '90%', margin: 'auto', marginTop: 20 }} variant="outlined">
        <CardContent style={{ cursor: 'pointer', }} onClick={() => handleCardClick(data.key)} >
          <Typography variant="body1" component="div" gutterBottom>
            @{data.username} - <span style={{ color: '#888' }}>{data.timestamp}</span>
          </Typography>
          <form noValidate autoComplete="off">
            <div style={{ marginBottom: 15 }}>
              <Typography variant="body1" style={{ fontWeight: 'bold' }} label="Title" fullWidth>
                {data.title}
              </Typography>
            </div>
            <div style={{ marginBottom: 15 }}>
              <Typography variant='body1' label="Content" fullWidth>
                {data.content}
              </Typography>
            </div>
          </form>
        </CardContent>
        <CardActions style={{ justifyContent: 'space-between' }}>
          <div>
            {Object.values(data.tags).map((tagText, index) => (
              <Tag key={index} text={tagText} />
            ))}
          </div>
          <div style={{ display: 'flex', }}>
            <div>
              <IconTag key="replyAmount" text={replyCount(data)} />
            </div>
            <Button size="small" color="primary" onClick={() => incrementLikes(index)}>
              <FavoriteIcon></FavoriteIcon> {data.likes}
            </Button>
          </div>
        </CardActions>
      </Card>
    );
  }

  return (
    <div style={{ paddingTop: '8%' }}>
      {sortedForumData.map((data, index, key) => (
        <div key={index}>
          {card(data, index)}
        </div>
      ))}
    </div>
  );
};
export default ForumOverview;