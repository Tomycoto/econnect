import {React, useState, useEffect} from 'react';
import styled from 'styled-components';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import {Button} from '@mui/material';
import {Link} from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

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
  var navigate = useNavigate();
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
            <Button style={{color: 'inherit'}} onClick={() => navigate("/leaderboard")}>
              <EmojiEventsIcon/>
              <a >{user ? user.displayName.split('|')[1] : 'Loading...'}</a>
            </Button>
          </div>
        </BarItem>
        {user ? (
          <>
            <BarItem><Button style={{color: 'inherit'}} disabled>{user ? user.displayName.split('|')[0] : 'Loading...'}</Button></BarItem>
            <BarItem><Button style={{color: 'inherit'}} onClick={() => navigate("/logout")}><LogoutIcon/></Button></BarItem>
          </>
        ) : (
          <BarItem><Button style={{color: 'inherit'}} onClick={() => navigate("/")}><LoginIcon/></Button></BarItem>
        )}
      </DesktopBar>
    </Bar>
  );
};
export default TopBar;