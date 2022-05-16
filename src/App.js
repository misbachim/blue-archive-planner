import './App.css';
import { Navbar } from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Characters from './pages/Characters/Characters';
import Inventory from './pages/Inventory';
import styled from 'styled-components';
import { Main } from './components/Main';
import Footer from './components/Footer';
import GearOptimizer from './pages/GearOptimizer/GearOptimizer';

function App() {
  return (
    <>
    <Router>
      <Container>
        <Navbar />
        <Main>
          <Content>
            <Routes>
              <Route path='/' exact element={<Home />} />
              <Route path='/characters' element={<Characters />} />
              <Route path='/gear-optimization' element={<GearOptimizer />} />
              <Route path='/inventory' element={<Inventory />} />
            </Routes>
          </Content>
          <Footer />
        </Main>
      </Container>
    </Router>
    </>
  );
}

const Container = styled.div`
  background-color: hsl(217,32%,17%);
  color: #fff;
  display: flex;
  min-height: 100vh;
`

const Content = styled.div`
  flex: 1;
  padding: 2.5rem;
  gap: 0.5rem;
  width: 100%;
`

export default App;
