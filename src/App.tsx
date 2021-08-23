import React, { useState } from 'react';
import './App.scss';
import Home from 'components/container/Home/Home';

import SettingsContext from './context/settingsContext';
import Quiz from 'components/container/Quiz/Quiz';
import Result from 'components/container/Result/Result';

function App() {
  const [libras, setLibras] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("pt-br")
  const value = { language, setLanguage, libras, setLibras };

  return (
    <SettingsContext.Provider value={value}>
      <div className="App">
        <p>Humano do Amanhã</p>
        <Home/>
        <Quiz />
        <Result />
      </div>
    </SettingsContext.Provider>
    
  );
}

export default App;
