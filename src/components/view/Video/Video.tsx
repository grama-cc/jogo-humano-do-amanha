import React from 'react';

type VideoProps = {
  source: string | undefined;
}

const Video: React.FC<VideoProps> = ({ source }) => {
  return (
    <video width="320" height="240" controls autoPlay>
      <source src={source} type="video/mp4" />
    </video>
  );
}

export default Video;