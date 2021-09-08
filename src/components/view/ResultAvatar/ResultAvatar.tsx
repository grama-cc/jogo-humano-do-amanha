import React from 'react';

import styles from './ResultAvatar.module.scss';

type ResultAvatarProps = {
  avatar: string;
  avatarName: string;
}

const ResultAvatar: React.FC<ResultAvatarProps> = ({ avatar, avatarName }) => {
  return (
    <div className={styles.avatar}>
      {avatar ? (
        <img src={avatar} alt={avatarName} />
      ) : (
        <p>RESULTADO: <span>{avatarName}</span></p>
      )}
    </div>
  );
}

export default ResultAvatar;