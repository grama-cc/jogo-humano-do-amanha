import React from 'react';

type ResultAvatarProps = {
  avatar: string;
  avatarName: string;
}

const ResultAvatar: React.FC<ResultAvatarProps> = ({ avatar, avatarName }) => {
  return (
    <>
      <img src={avatar} alt={avatarName} style={{ width: '180px', height: '200px'}} />
    </>
  );
}

export default ResultAvatar;