import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import ForumOverview from './ForumOverview';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage/>} />
    </Routes>
  );
}

export default App;