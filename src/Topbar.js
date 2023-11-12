import React from 'react';
import styled from 'styled-components';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

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
        <BarItem><a >@Username</a></BarItem>
        <BarItem></BarItem>
      </DesktopBar>
    </Bar>
  );
};
export default TopBar;