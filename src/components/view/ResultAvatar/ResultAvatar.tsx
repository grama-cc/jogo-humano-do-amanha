import React from 'react';

type ResultAvatarProps = {
  avatar: string;
  avatarName: string;
}

const ResultAvatar: React.FC<ResultAvatarProps> = ({ avatar, avatarName }) => {
  return (
    <>
      {avatar ? (
        <img src={avatar} alt={avatarName} style={{ width: '180px', height: '200px'}} />
      ) : (
        <p style={{ width: '180px', height: '200px'}} >RESULTADO: <span>{avatarName}</span></p>
      )}
    </>
  );
}

export default ResultAvatar;