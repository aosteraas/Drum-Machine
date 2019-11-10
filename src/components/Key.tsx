import React, { useRef, useState } from 'react';
import { NoteData } from '../data/Notes';
import { KeyStyle } from '../styles/KeyStyle';
import { ctx } from '../data/AudioContext';

interface Props {
  data: NoteData;
}

export const Key: React.FC<Props> = ({ data }) => {
  const oscillator = useRef<OscillatorNode | null>(null);
  const gainNode = useRef<GainNode | null>(null);

  const [playing, setPlaying] = useState(false);
  const start = (freq: number) => {
    setPlaying(true);
    oscillator.current = ctx.createOscillator();
    gainNode.current = ctx.createGain();
    oscillator.current.frequency.value = freq;
    oscillator.current.connect(gainNode.current);
    gainNode.current.connect(ctx.destination);
    // oscillator.current.connect(ctx.destination);
    oscillator.current.start(0);
  };

  const stop = () => {
    setPlaying(false);
    // in case the mouse up occurs over another element
    if (oscillator.current && gainNode.current) {
      console.log(gainNode);
      gainNode.current.gain.setTargetAtTime(0, ctx.currentTime, 0.015);
      // oscillator.current!.stop(ctx.currentTime);
    }
  };

  const sharp = data.note.length >= 2;

  return (
    <KeyStyle
      onMouseDown={() => start(data.freq)}
      onMouseEnter={() => start(data.freq)}
      onMouseLeave={stop}
      onMouseUp={stop}
      onKeyDown={() => start(data.freq)}
      sharp={sharp}
      className={sharp ? 'black' : 'white'}
      playing={playing}
    >
      {data.note.join('/')}
    </KeyStyle>
  );
};
