import React from 'react';

import desktopLogos from 'assets/images/logos_desktop.svg';
import mobileLogos from 'assets/images/logo_mobile.svg';

import styles from './Logos.module.scss';

type LogosProps = {
  about?: boolean;
};

const Logos: React.FC<LogosProps> = ({ about }) => {

  return (
    <div className={`${about ? styles.logosAbout : styles.logosOneLine}`}>
      {window.innerWidth > 768 && (
        <img src={desktopLogos} alt="Apoiadores" />
      )}
      {window.innerWidth < 768 && (
        <img src={mobileLogos} alt="Apoiadores" />
      )}
    </div>
  );
}

export default Logos;