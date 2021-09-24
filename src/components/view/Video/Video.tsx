import React, { useRef, useEffect } from 'react';

import styles from './Video.module.scss';

type VideoProps = {
  source: string | '';
  onEnded?: (() => void );
}

const Video: React.FC<VideoProps> = ({ source, onEnded }) => {

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if(videoRef.current){
      videoRef.current.load();
    }
  }, [source]);

  useEffect(() => {
    if(videoRef.current){
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  }, [source]);

  const endedVideo = () => {
    if(onEnded){
      onEnded();
    } else {
      if(videoRef.current){
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      }
    }
  };

  if(source){
    return (
      <div className={styles.videoWrapper}>
        <video ref={videoRef} autoPlay onEnded={endedVideo}>
          <source src={source} type="video/mp4" />
        </video>
      </div>
    );
  }
  return (
    <div/>
  )
}

export default Video;