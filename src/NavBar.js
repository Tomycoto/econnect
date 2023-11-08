import React from 'react';
import {Drawer, List, ListItem, ListItemButton, ListItemText, ListItemIcon} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import MapIcon from '@mui/icons-material/Map';
const NavBar = ({activeItem}) => {
    return (
        <Drawer
        sx={{
            '& .MuiDrawer-paper': {
                width: '15%',
                marginTop: '7%',
            },
            }}
            variant="permanent"
            anchor="left">
            <List>
                <div>
                    <ListItem style={{ background: activeItem === 'Home' ? '#F4FEF2' : 'white', pointerEvents: activeItem === 'Home' ? 'none' : 'auto' }}>
                        <ListItemButton>
                            <ListItemIcon>
                                <HomeIcon style={{ color: activeItem === 'Home' ? '#8FEF79' : 'inherit' }}/>
                            </ListItemIcon>
                            <ListItemText style={{ color: activeItem === 'Home' ? '#8FEF79' : 'inherit' }}>Home</ListItemText>
                        </ListItemButton>
                    </ListItem>
                </div>
                <div>
                <ListItem style={{ background: activeItem === 'Nearby Events' ? '#F4FEF2' : 'white', pointerEvents: activeItem === 'Nearby Events' ? 'none' : 'auto' }}>
                        <ListItemButton>
                            <ListItemIcon>
                                <MapIcon style={{ color: activeItem === 'Nearby Events' ? '#8FEF79' : 'inherit' }}/>
                            </ListItemIcon>
                            <ListItemText style={{ color: activeItem === 'Nearby Events' ? '#8FEF79' : 'inherit' }}>Nearby Events</ListItemText>
                        </ListItemButton>
                    </ListItem>
                </div>
            </List>
        </Drawer>
    );
};
export default NavBar;

/*{['Item 1', 'Item 2', 'Item 3'].map((text) => (
                <ListItem key={text}>
                <ListItemButton>
                    <ListItemText>{text}</ListItemText>
                </ListItemButton>
                </ListItem>
            ))}*/