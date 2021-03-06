import React, { useContext, useEffect, useRef } from 'react';
import SettingsContext from 'context/settingsContext';
import { Step } from 'types/types';

import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";

import {ReactComponent as GoBackWhite} from 'assets/icons/arrow-white.svg';

import facebook from 'assets/icons/Facebook.svg';
import twitter from 'assets/icons/Twitter.svg';
import whatsapp from 'assets/icons/whatsapp.svg';

import globalStyles from 'globals.module.scss';
import styles from './Menu.module.scss';

const buttonsAudio = require('assets/audios/botoes.mp3');

const backAudio = require('assets/audios/voltar.mp3');

type MenuProps = {
  text?: string,
  prevStep: Step,
  prevAction?: (() => void),
  blackIcon?: boolean,
  topText?: string,
}

const Menu: React.FC<MenuProps> = ({ text, prevStep, prevAction, blackIcon, topText }) => {
  const { setStep, setLoading, resultAvatar } = useContext(SettingsContext);

  const backAudioRef = useRef<HTMLAudioElement>(new Audio(backAudio.default));
  const buttonsAudioRef = useRef<HTMLAudioElement>(new Audio(buttonsAudio.default));

  useEffect(() => {
    if(backAudioRef.current){
      backAudioRef.current.load();
    }
  }, []);

  const goBack = async () => {
    setLoading(false);
    backAudioRef.current.currentTime = 0.6;
    try{
      await backAudioRef.current.play();
    }catch(err){
      console.error(err);
    }
    
    if(prevAction){
      prevAction();
    } else {
      setStep(prevStep);
    }
  };
  
  const playAudio = async () => {
    buttonsAudioRef.current.currentTime = 0.3;
    try{
      await buttonsAudioRef.current.play();
    }catch(err){
      console.error(err);
    }
  }

  return (
    <nav className={`${globalStyles.menu}`}>
      <button onClick={goBack}>
        <GoBackWhite
          title="Voltar"
          className={`${globalStyles.goback} ${styles.back} ${blackIcon ? styles.black : ''}`}
        />
      </button>
      {text ? (
        <p className={`${globalStyles.text} ${styles.counter} ${blackIcon ? styles.black : ''}`}>{text}</p>
      ) : (
        <div className={globalStyles.socialWrapper}>
          {(window.innerWidth > 738 && resultAvatar) && (
            <>
              <button className={globalStyles.singleIcon}>
                <FacebookShareButton
                  url={`${window.location.href}`}
                  quote={`'Descobri que #HumanodoAmanh?? eu serei no futuro! Acesse o novo jogo do Museu do Amanh?? e veja qual ?? o seu perfil em: '`}
                  hashtag={'#HumanodoAmanh??'}
                  onClick={playAudio}
                >
                  <img src={facebook} alt="Facebook" className={globalStyles.social} />
                </FacebookShareButton>
              </button>
              <button className={globalStyles.singleIcon}>
                <WhatsappShareButton
                  url={`${window.location.href}`}
                  title={`Descobri que #HumanodoAmanh?? eu serei no futuro! Acesse o novo jogo do Museu do Amanh?? e veja qual ?? o seu perfil em: `}
                  onClick={playAudio}
                >
                  <img src={whatsapp} alt="WhatsApp" className={globalStyles.social} />
                </WhatsappShareButton>
              </button>
              <button className={globalStyles.singleIcon}>
                <TwitterShareButton
                  title={`Descobri que #HumanodoAmanh?? eu serei no futuro! Acesse o novo jogo do Museu do Amanh?? e veja qual ?? o seu perfil em: `}
                  url={`${window.location.href}`}
                  hashtags={['#HumanodoAmanh??']}
                  onClick={playAudio}
                >
                  <img src={twitter} alt="Twitter" className={globalStyles.social} />
                </TwitterShareButton>
              </button>
            </>
          )}
        </div>
      )}
      {topText && <p className={globalStyles.topText}>{topText}</p>}
    </nav>
  );
}

export default Menu;