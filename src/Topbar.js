import {React, useState, useEffect} from 'react';
import styled from 'styled-components';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import {Button} from '@mui/material';
import {Link} from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

const Bar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: #fff;
  padding: 1rem;
  position: fixed;
  width: 100%;
  z-index: 10;
`;

const BarItem = styled.li`
  list-style: none;
  margin: 0 1rem;

  a {
    color: #fff;
    text-decoration: none;
    transition: all 0.3s ease;
  }
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  color: #8FEF79;
  margin: 0;
`;

const DesktopBar = styled.ul`
  display: flex;
  flex-direction: row;

  @media (max-width: 767px) {
    display: none;
  }
`;

const TopBar = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [user]);
  return (
    <Bar>
      <Logo>ECOnnect</Logo>
      <DesktopBar>
        <BarItem><a>Daejeon KAIST</a></BarItem>
        <BarItem>
          <div>
            <EmojiEventsIcon></EmojiEventsIcon>
            <a >2000</a>
          </div>
        </BarItem>
        {user ? (
          <>
            <BarItem><Button style={{color: 'inherit'}} disabled>{user.displayName}</Button></BarItem>
            <BarItem><Button component={Link} to="/logout" style={{color: 'inherit'}}><LogoutIcon/></Button></BarItem>
          </>
        ) : (
          <BarItem><Button component={Link} to="/login" style={{color: 'inherit'}}><LoginIcon/></Button></BarItem>
        )}
      </DesktopBar>
    </Bar>
  );
};
export default TopBar;