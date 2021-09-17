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
import EndPage from 'components/container/EndPage/EndPage';

const introAudio = require('assets/audios/intro.mp3');
const quizAudio = require('assets/audios/quiz.mp3');

function App() {
  const [libras, setLibras] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("pt-br");
  const [step, setStep] = useState<Step>('allhumans');
  const [loading, setLoading] = useState<boolean>(false);
  const [transitionStep, settransitionStep] = useState<boolean>(false);
  const [allHumanTypes, setAllHumanTypes] = useState<HumanType[]>([]);
  const [humanId, setHumanId] = useState<string | HumanId>('');
  const [showAboutPopUp, setShowAboutPopUp] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>('');
  const [resultAvatar, setResultAvatar] = useState<HumanType|null>(null);
  const [resultsListHuman, setResultsListHuman] = useState<HumanType>(defaultHuman);
  
  const [play, setPlay] = useState<boolean>(false);

  const [volume, setVolume] = useState<number>(100);

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

  const volumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const reduceVolume = () => {
    if(volumeTimerRef.current){
      clearTimeout(volumeTimerRef.current);
    }
    if(volume > 0){
      volumeTimerRef.current = setTimeout(() => {
        setVolume(prev => prev - 10);
        reduceVolume();
      }, 100);
    }
  }

  const increaseVolume = () => {
    if(volumeTimerRef.current){
      clearTimeout(volumeTimerRef.current);
    }
    if(volume < 100){
      volumeTimerRef.current = setTimeout(() => {
        setVolume(prev => prev + 10);
        increaseVolume();
      }, 100);
    }
  }

  useEffect(() => {
    if(step !== 'home'){
      setPlay(true);
    }
  }, [step]);

  useEffect(() => {
    if(step === 'countdown' && libras){
      if(volume !== 0){
        reduceVolume();
      }
    } else {
      if(volume !== 100){
        increaseVolume();
      }
    }
  }, [step, libras, increaseVolume, reduceVolume]);


  return (
    <SettingsContext.Provider value={value}>
      <div className="App">
        {(step ==="home" || step === "countdown") ? (
          <Sound autoLoad={true} playStatus={play ? 'PLAYING': 'PAUSED'} url={introAudio.default} loop={true} volume={volume}  />
        ): <Sound autoLoad={true} playStatus={play ? 'PLAYING': 'PAUSED'} url={quizAudio.default} loop={true} volume={volume}/>}
        <Home/>
        <Countdown />
        <Quiz />
        <Research />
        <PreResult />
        <Result />
        <AllHumans />
        <EndPage />
      </div>
    </SettingsContext.Provider>
    
  );
}

export default App;
