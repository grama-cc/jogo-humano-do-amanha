import React from 'react';

import globalStyles from 'globals.module.scss'

type IntroSidebarProps = {
  aboutText: string;
  aboutLink: string;
  text: string;
  ctaLabel: string;
  ctaAction: () => void;

}

const IntroSidebar: React.FC<IntroSidebarProps> = ({ aboutText, aboutLink, text, ctaLabel, ctaAction }) => {
  return (
    <div className={globalStyles.sidebar}>
      <a href={aboutLink}>{aboutText}</a>
      <p>{text}</p>
      <button onClick={ctaAction}>{ctaLabel}</button>
    </div>
  );
}

export default IntroSidebar;