import SettingsContext from 'context/settingsContext';
import React, { useContext } from 'react';

import styles from './ResultAvatar.module.scss';

type ResultAvatarProps = {
  avatar: string;
  avatarName: string;
  ready?: (() => void);
}

const ResultAvatar: React.FC<ResultAvatarProps> = ({ avatar, avatarName, ready }) => {
  const { libras } = useContext(SettingsContext);

  return (
    <div className={`${styles.avatar} ${libras ? styles.libras : ''}`}>
      {avatar ? (
        <img src={avatar} alt={avatarName} onLoad={ready}/>
      ) : (
        <p>RESULTADO: <span>{avatarName}</span></p>
      )}
    </div>
  );
}

export default ResultAvatar;