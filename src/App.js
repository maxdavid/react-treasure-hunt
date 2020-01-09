import React from 'react';
import { Map, Dashboard, Header } from './components';

function App() {
  return (
    <div className='App'>
      <Header />
      <Dashboard />
      <Map size='1500px' />
    </div>
  );
}

export default App;
