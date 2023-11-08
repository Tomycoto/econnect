import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import Mappage from './Mappage';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage/>} />
    </Routes>
  );
}

export default App;