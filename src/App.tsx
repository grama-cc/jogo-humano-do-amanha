import React, { useState } from 'react';
import './App.scss';
import SettingsContext, { defaultHuman } from './context/settingsContext';
import { HumanId, HumanType, Step } from 'types/types'

import Home from 'components/container/Home/Home';
import Quiz from 'components/container/Quiz/Quiz';
import Result from 'components/container/Result/Result';
import Research from 'components/container/Research/Research';
import Countdown from 'components/container/Countdown/Countdown';
import PreResult from 'components/container/PreResult/PreResult';
import AllHumans from 'components/container/AllHumans/AllHumans';

function App() {
  const [libras, setLibras] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("pt-br");
  const [step, setStep] = useState<Step>('home');
  const [loading, setLoading] = useState<boolean>(false);
  const [transitionStep, settransitionStep] = useState<boolean>(false);
  const [allHumanTypes, setAllHumanTypes] = useState<HumanType[]>([]);
  const [humanId, setHumanId] = useState<string | HumanId>('');
  const [showAboutPopUp, setShowAboutPopUp] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>('');
  const [resultAvatar, setResultAvatar] = useState<HumanType|null>(null);
  const [resultsListHuman, setResultsListHuman] = useState<HumanType>(defaultHuman);

  const value = { 
    language,
    setLanguage,
    libras,
    setLibras,
    step,
    setStep,
    loading,
    setLoading,
    transitionStep,
    settransitionStep,
    allHumanTypes,
    setAllHumanTypes,
    humanId,
    setHumanId,
    showAboutPopUp,
    setShowAboutPopUp,
    userId,
    setUserId,
    resultAvatar,
    setResultAvatar,
    resultsListHuman,
    setResultsListHuman,
  };

  return (
    <SettingsContext.Provider value={value}>
      <div className="App">
        <Home/>
        <Countdown />
        <Quiz />
        <Research />
        <PreResult />
        <Result />
        <AllHumans />
      </div>
    </SettingsContext.Provider>
    
  );
}

export default App;
