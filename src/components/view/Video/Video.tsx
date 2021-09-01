import React, { useRef, useEffect } from 'react';

type VideoProps = {
  source: string;
  onEnded?: () => void;
}

const Video: React.FC<VideoProps> = ({ source, onEnded = () => {} }) => {

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if(videoRef.current){
      videoRef.current.load();
    }
  }, [source]);

  return (
    <video ref={videoRef} width="320" height="240" controls autoPlay onEnded={onEnded}>
      <source src={source} type="video/mp4" />
    </video>
  );
}

export default Video;