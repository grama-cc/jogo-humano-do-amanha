import React, { useContext } from 'react';
import SettingsContext from 'context/settingsContext';

import styles from './Circle.module.scss';

const Circle: React.FC = ({ children }) => {
  const { step, loading, libras } = useContext(SettingsContext);

  return (
    <>
    {loading ? (
      <div className={`${styles.loaderWrapper}`}>
        <div className={styles.loader}>Carregando...</div>
        <p className={styles.loaderInner}>{children}</p>
      </div>
    ) : (
      <div 
        className={`${styles.circleWrapper} ${step === 'home' ? styles.blackBorder : styles.whiteBorder}  ${libras ? styles.libras : ''}`}
      >
        {children}
      </div>
    )}
    </>
  );
}

export default Circle;