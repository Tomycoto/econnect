import './Homepage.css';
import TopBar from './Topbar';
import NavBar from './NavBar';
import ForumOverview from './ForumOverview';
import styled from 'styled-components';
import "leaflet/dist/leaflet.css"

const HomeContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
`;

const LayoutContainer = styled.div`
  display: grid;
  grid-template-columns: 15% auto;
  height: 100vh;
`;

function Home() {
  return (
    <HomeContainer>
      <TopBar/>
      <LayoutContainer>
        <NavBar activeItem={'Home'}/>
        <ForumOverview/>
      </LayoutContainer>
    </HomeContainer>
  );
}

export default Home;
