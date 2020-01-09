import React, { useState } from 'react';
import { Map, ClassicMap, Dashboard, Header } from './components';

function App() {
  const [classic, setClassic] = useState(false);

  return classic ? (
    <div className='App'>
      <ClassicMap size='1500px' />
    </div>
  ) : (
    <div className='App'>
      <Header />
      <Dashboard />
      <Map size='1500px' />
    </div>
  );
}

export default App;
