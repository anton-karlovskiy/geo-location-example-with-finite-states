
import React from 'react';

import YourPositionWithEnumByKent from 'components/YourPositionWithEnumByKent';
import YourPositionWithXstateByKent from 'components/YourPositionWithXstateByKent';
import YourPositionWithXstateByDavid from 'components/YourPositionWithXstateByDavid';
import './App.css';

function App() {
  return (
    <div className='App'>
      <h2>With Enum by Kent</h2>
      <YourPositionWithEnumByKent />
      <h2>With Xstate by Kent</h2>
      <YourPositionWithXstateByKent />
      <h2>With Xstate by David</h2>
      <YourPositionWithXstateByDavid />
    </div>
  );
}

export default App;
