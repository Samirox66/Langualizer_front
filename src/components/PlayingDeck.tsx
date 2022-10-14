import React from 'react';

interface IPlayingDeckProp {
  firstLang: string;
  secondLang: string;
}

const PlayingDeck = ({ firstLang, secondLang }: IPlayingDeckProp) => {
  return (
    <div>
      playing {firstLang} {secondLang}
    </div>
  );
};

export default PlayingDeck;
