import React, { useState, useContext } from 'react';
import SettingsContext from 'context/settingsContext';

import globalStyles from 'globals.module.scss'

type IntroSidebarProps = {
  aboutText: string;
  text: string;
  ctaLabel: string;
  ctaAction: () => void;

}

const IntroSidebar: React.FC<IntroSidebarProps> = ({ aboutText, text, ctaLabel, ctaAction }) => {
  const { showAboutPopUp, setShowAboutPopUp } = useContext(SettingsContext);

  const aboutPopUp = () => {
    setShowAboutPopUp(!showAboutPopUp);
  };

  return (
    <div className={globalStyles.sidebar}>
      <button onClick={aboutPopUp}>{aboutText}</button>
      <p>{text}</p>
      <button onClick={ctaAction}>{ctaLabel}</button>
    </div>
  );
}

export default IntroSidebar;