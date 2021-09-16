import React, { useState, useEffect, useRef } from 'react';
import Sound  from 'react-sound';

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

const introAudio = require('assets/audios/intro.mp3');
const quizAudio = require('assets/audios/quiz.mp3');

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
  
  const audioRef = useRef<typeof Sound>();

  const [play, setPlay] = useState<boolean>(false);

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

  useEffect(() => {
    if(step !== 'home'){
      setPlay(true);
    }
  }, [step])

  return (
    <SettingsContext.Provider value={value}>
      <div className="App">
        {(step ==="home" || step === "countdown") ? (
          <Sound autoLoad={true} playStatus={play ? 'PLAYING': 'PAUSED'} url={introAudio.default} loop={true} />
        ): <Sound autoLoad={true} playStatus={play ? 'PLAYING': 'PAUSED'} url={quizAudio.default} loop={true}/>}
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
