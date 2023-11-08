import React from 'react';
import {Drawer, List, ListItem, ListItemButton, ListItemText, ListItemIcon} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import MapIcon from '@mui/icons-material/Map';
import {Link} from 'react-router-dom';

const NavBar = ({activeItem}) => {
    return (
        <Drawer
        sx={{
            '& .MuiDrawer-paper': {
                width: '15%',
                marginTop: '8%',
            },
            }}
            variant="permanent"
            anchor="left">
            <List>
                <div>
                    <ListItem component ={Link} to="/" style={{ background: activeItem === 'Home' ? '#F4FEF2' : 'white', pointerEvents: activeItem === 'Home' ? 'none' : 'auto' }}>
                        <ListItemButton>
                            <ListItemIcon>
                                <HomeIcon style={{ color: activeItem === 'Home' ? '#8FEF79' : 'inherit' }}/>
                            </ListItemIcon>
                            <ListItemText style={{ color: activeItem === 'Home' ? '#8FEF79' : 'inherit' }}>Home</ListItemText>
                        </ListItemButton>
                    </ListItem>
                </div>
                <div>
                <ListItem component ={Link} to="/map" style={{ background: activeItem === 'Nearby Events' ? '#F4FEF2' : 'white', pointerEvents: activeItem === 'Nearby Events' ? 'none' : 'auto' }}>
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