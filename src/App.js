import './App.css';
import TopBar from './Topbar';
import styled from 'styled-components';

const AppContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
`;

function App() {
  return (
    <AppContainer>
      <TopBar />
      {/* Your app content goes here */}
    </AppContainer>
  );
}

export default App;
