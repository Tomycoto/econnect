import './App.css';
import ForumOverview from './ForumOverview';
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
      <ForumOverview></ForumOverview>

    </AppContainer>
  );
}

export default App;
