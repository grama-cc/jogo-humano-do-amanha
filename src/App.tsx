import React, { useState } from 'react';
import './App.scss';
import SettingsContext from './context/settingsContext';

import Home from 'components/container/Home/Home';
import Quiz from 'components/container/Quiz/Quiz';
import Result from 'components/container/Result/Result';
import Research from 'components/container/Research/Research';
import Countdown from 'components/container/Countdown/Countdown';

function App() {
  const [libras, setLibras] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("pt-br");
  const [step, setStep] = useState<number>(0)
  const value = { language, setLanguage, libras, setLibras, step, setStep };

  return (
    <SettingsContext.Provider value={value}>
      <div className="App">
        <Home/>
        <Countdown />
        <Quiz />
        <Research />
        <Result />
      </div>
    </SettingsContext.Provider>
    
  );
}

export default App;
