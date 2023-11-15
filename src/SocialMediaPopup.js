import React from 'react';
import { Button, Popover, Typography, List, ListItem, ListItemText } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const SocialMediaPopup = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl)
            .then(() => {
                console.log('URL copied to clipboard:', currentUrl);
            })
            .catch((error) => {
                console.error('Error copying to clipboard:', error);
            });
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'social-media-popover' : undefined;

    return (
        <div>
            <Button size="small" color="primary" onClick={handleClick}> <ContentCopyIcon></ContentCopyIcon> Link + <ShareIcon></ShareIcon></Button>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}>
                <Typography sx={{ p: 2 }}>
                    Copied link to clipboard! Share this post:
                    <List>
                        <ListItem button component="a" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                            <ListItemText primary="Instagram" />
                        </ListItem>
                        <ListItem button component="a" href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                            <ListItemText primary="Facebook" />
                        </ListItem>
                        <ListItem button component="a" href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer">
                            <ListItemText primary="TikTok" />
                        </ListItem>
                        <ListItem button component="a" href="https://www.reddit.com/" target="_blank" rel="noopener noreferrer">
                            <ListItemText primary="Reddit" />
                        </ListItem>
                    </List>
                </Typography>
            </Popover>
        </div>
    );
};

export default SocialMediaPopup;
