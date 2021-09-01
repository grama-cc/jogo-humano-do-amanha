import React, { useState } from 'react';
import { FacebookShareButton, TwitterShareButton } from "react-share";

type ResultShareProps = {
  resultTitle: string,
  resultDescription: string
}

const ResultShare: React.FC<ResultShareProps> = ({ resultTitle, resultDescription }) => {
  const [shareButtons, setShareButtons] = useState<boolean>(false);

  const showButtons = () => {
    setShareButtons(true)
  }

  return (
    <div>
      {shareButtons ? (
        <>
          <FacebookShareButton
            url={'https://develop.d2r4xr1ll165o7.amplifyapp.com/'}
            quote={`Meu humano do amanhã é ${resultTitle}! ${resultDescription}`}
            hashtag={'#humanodofuturo'}
          >
            Facebook
          </FacebookShareButton>
          <TwitterShareButton
            title={`Meu humano do amanhã é ${resultTitle}!`}
            url={'https://develop.d2r4xr1ll165o7.amplifyapp.com/'}
            hashtags={['#humanodofuturo']}
          >
            Twitter
          </TwitterShareButton>
        </>
      ) : (
        <button onClick={showButtons} >Compartilhar</button>
      )}
    </div>
  )
}

export default ResultShare;