import React from 'react';

type IntroSidebarProps = {
  aboutText: string;
  aboutLink: string;
  text: string;
  ctaLabel: string;
}

const IntroSidebar: React.FC<IntroSidebarProps> = ({ aboutText, aboutLink, text, ctaLabel }) => {
  return (
    <>
      <a href={aboutLink}>{aboutText}</a>
      <p>{text}</p>
      <button>{ctaLabel}</button>
    </>
  );
}

export default IntroSidebar;