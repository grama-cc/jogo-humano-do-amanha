import React from 'react';
import './App.scss';
import Home from 'components/container/Home/Home';

import SettingsContext, { defaultSettings } from './context/settingsContext';

function App() {

  return (
    <SettingsContext.Provider value={defaultSettings}>
      <div className="App">
        <p>Humano do Amanhã</p>
        <Home/>
      </div>
    </SettingsContext.Provider>
    
  );
}

export default App;
