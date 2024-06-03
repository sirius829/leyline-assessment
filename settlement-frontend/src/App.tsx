import React from 'react';
import './styles/App.css';
import { Route, Routes } from 'react-router-dom';
import PartyA from './components/PartyA';
import PartyB from './components/PartyB';
import { Navbar } from './components/Navbar';

function App() {
  return (
    <div>
      <Navbar />
      <div className='container mx-auto my-8'>
        <Routes>
          <Route path="/party-a" element={<PartyA />} />
          <Route path="/party-b" element={<PartyB />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
