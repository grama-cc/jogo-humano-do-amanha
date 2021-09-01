import React, { useRef, useEffect } from 'react';

import styles from './Video.module.scss';

type VideoProps = {
  source: string;
  onEnded: () => void;
}

const Video: React.FC<VideoProps> = ({ source, onEnded }) => {

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if(videoRef.current){
      videoRef.current.load();
    }
  }, [source]);
  return (
    <video ref={videoRef} autoPlay onEnded={onEnded} className={styles.videoWrapper}>
      <source src={source} type="video/mp4" />
    </video>
  );
}

export default Video;