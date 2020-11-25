
import React from 'react';

import YourPositionWithEnumByKent from 'components/YourPositionWithEnumByKent';
import YourPositionWithXstateByKent from 'components/YourPositionWithXstateByKent';
import './App.css';

function App() {
  return (
    <div className='App'>
      <h2>Enum</h2>
      <YourPositionWithEnumByKent />
      <h2>State machine</h2>
      <YourPositionWithXstateByKent />
    </div>
  );
}

export default App;
