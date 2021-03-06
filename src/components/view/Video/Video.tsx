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
    async function videoPlay(){
      if(videoRef.current){
        videoRef.current.currentTime = 0;
        try{
          await videoRef.current.play();
        }catch(err){
          console.error(err);
        }
      }
    }
    videoPlay();
   
  }, [source]);

  const endedVideo = async () => {
    if(onEnded){
      onEnded();
    } else {
      if(videoRef.current){
        videoRef.current.currentTime = 0;
        try{
          await videoRef.current.play();
        }catch(err){
          console.error(err);
        }
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