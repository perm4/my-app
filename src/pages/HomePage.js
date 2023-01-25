import React, { useState } from 'react';
import Home from '../components/home/Home.js';

const HomePage = () => {
  const [number, setNumber] = useState(0);
  return (
    <div>
      <Home number={number} setNumber={setNumber} />
    </div>
  );
};

export default HomePage;
