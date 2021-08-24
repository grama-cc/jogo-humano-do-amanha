import React from 'react';

type IntroProps = {
  titles: string[];
}

const Intro: React.FC<IntroProps> = ({ titles }) => {
  return (
    <>
      {titles.map((item, index) => (
        <h1 key={item} id={`${index}`}>
          {item}
        </h1>
      ))}
    </>
  );
}

export default Intro;