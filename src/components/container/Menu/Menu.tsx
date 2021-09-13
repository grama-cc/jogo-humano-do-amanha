import React, { useContext } from 'react';
import SettingsContext from 'context/settingsContext';
import { Step } from 'types/types';

import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";

import GoBackWhite from 'assets/icons/arrow-white.svg';
import GoBackBlack from 'assets/icons/arrow-black.svg';
import facebook from 'assets/icons/Facebook.svg';
import twitter from 'assets/icons/Twitter.svg';
import whatsapp from 'assets/icons/whatsapp.svg';

import globalStyles from 'globals.module.scss';

type MenuProps = {
  text?: string,
  prevStep: Step,
  prevAction?: (() => void) | null
  blackIcon?: boolean,
  topText?: string,
}

const Menu: React.FC<MenuProps> = ({ text, prevStep, prevAction = null, blackIcon, topText }) => {
  const { step, setStep, setLoading, resultAvatar } = useContext(SettingsContext);

  const goBack = () => {
    setLoading(false);
    if(prevAction){
      prevAction();
    } else {
      setStep(prevStep);
    }
  };

  return (
    <nav className={`${globalStyles.menu}`}>
      <button onClick={goBack}>
        <img src={blackIcon ? GoBackBlack : GoBackWhite} alt="Voltar" className={globalStyles.goback} />
      </button>
      {text ? (
        <p style={{ color: `${blackIcon ? '#0d0d0d' : '#E9E9E9'}` }} className={globalStyles.text}>{text}</p>
      ) : (
        <div className={globalStyles.socialWrapper}>
          {(window.innerWidth > 738 && resultAvatar) && (
            <>
              <button className={globalStyles.singleIcon}>
                <FacebookShareButton
                  url={`${window.location.href}`}
                  quote={`Meu humano do amanhã é ${resultAvatar.nome}! ${resultAvatar.descricao}`}
                  hashtag={'#humanodofuturo'}
                >
                  <img src={facebook} alt="Facebook" className={globalStyles.social} />
                </FacebookShareButton>
              </button>
              <button className={globalStyles.singleIcon}>
                <WhatsappShareButton
                  url={`${window.location.href}`}
                  title={`Meu humano do amanhã é ${resultAvatar.nome}`}
                >
                  <img src={whatsapp} alt="WhatsApp" className={globalStyles.social} />
                </WhatsappShareButton>
              </button>
              <button className={globalStyles.singleIcon}>
                <TwitterShareButton
                  title={`Meu humano do amanhã é ${resultAvatar.nome}!`}
                  url={`${window.location.href}`}
                  hashtags={['#humanodofuturo']}
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