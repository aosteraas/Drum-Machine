import React, { useRef } from 'react';
import { NoteData } from '../data/Notes';
import { KeyStyle } from '../styles/KeyStyle';
import { ctx } from '../data/AudioContext';

interface Props {
  data: NoteData;
}

export const Key: React.FC<Props> = ({ data }) => {
  let oscillator = useRef<OscillatorNode | null>(null);

  const start = (freq: number) => {
    oscillator.current = ctx.createOscillator();
    oscillator.current.frequency.value = freq;
    oscillator.current.connect(ctx.destination);
    oscillator.current.start(0);
  };
  const stop = () => {
    // in case the mouse up occurs over another element
    if (oscillator.current) {
      oscillator.current!.stop(ctx.currentTime);
    }
  };
  const sharp = data.note.length >= 2;
  return (
    <KeyStyle
      onMouseDown={() => start(data.freq)}
      onMouseLeave={stop}
      onMouseUp={stop}
      onKeyDown={() => start(data.freq)}
      sharp={sharp}
      className={sharp ? 'black' : 'white'}
    >
      {data.note.join('/')}
    </KeyStyle>
  );
};
