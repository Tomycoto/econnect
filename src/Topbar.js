import React from 'react';
import styled from 'styled-components';

const Bar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: #fff;
  padding: 1rem;
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
        <BarItem><a>Location</a></BarItem>
        <BarItem><a >Home</a></BarItem>
        <BarItem><a >About</a></BarItem>
        <BarItem><a >Services</a></BarItem>
        <BarItem><a >Contact</a></BarItem>
      </DesktopBar>
    </Bar>
  );
};
export default TopBar;