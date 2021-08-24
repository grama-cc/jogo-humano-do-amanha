import React from 'react';
import Menu from 'components/container/Menu/Menu';
import ResultAvatar from 'components/view/ResultAvatar/ResultAvatar';
import ResultText from 'components/view/ResultText/ResultText';
import ResultShare from 'components/view/ResultShare/ResultsShare';
import ResultsList from 'components/view/ResultsList/ResultsList';

import image from '../../../assets/test.png';

const MOCK_DATA = [
  {
    id: '01',
    avatar: '../../../assets/test.png',
    name: 'Nome',
    text: 'Texto'
  }
]

export default function Result() {
  return (
    <>
      <Menu text={"Menu"} />
      <ResultAvatar avatar={image} avatarName={'Resultado'} />
      <ResultText title="Título" text="Texto" />
      <ResultShare link="/" />
      <ResultsList results={MOCK_DATA} />
    </>
  )
}
