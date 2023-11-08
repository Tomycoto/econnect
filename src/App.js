import './App.css';
import { useState } from 'react';
import TopBar from './Topbar';
import NavBar from './NavBar';
import styled from 'styled-components';

const AppContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
`;

function App() {
  const [activeItem, setActiveItem] = useState('Home'); // Set the initial active item
  const changeActiveItem = (newItem) => {
    setActiveItem(newItem);
  };
  return (
    <AppContainer>
      <TopBar/>
      <NavBar activeItem={activeItem}/>
    </AppContainer>
  );
}

export default App;
