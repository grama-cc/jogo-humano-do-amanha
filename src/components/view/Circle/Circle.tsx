import React, { useContext } from 'react';
import SettingsContext from 'context/settingsContext';

import styles from './Circle.module.scss';

const Circle: React.FC = ({ children }) => {
  const { step } = useContext(SettingsContext);

  return (
    <div 
      className={`${styles.circleWrapper} ${step === 'home' ? styles.blackBorder : styles.whiteBorder}`}
    >
      {children}
    </div>
  );
}

export default Circle;