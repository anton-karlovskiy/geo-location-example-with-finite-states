
import React from 'react';

import YourPositionByEnum from 'components/YourPositionByEnum';
import YourPositionByXstate from 'components/YourPositionByXstate';
import './App.css';

function App() {
  return (
    <div className='App'>
      <h2>Enum</h2>
      <YourPositionByEnum />
      <h2>State machine</h2>
      <YourPositionByXstate />
    </div>
  );
}

export default App;
