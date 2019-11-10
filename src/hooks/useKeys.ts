import { ctx } from '../data/AudioContext';
import { middleCKeys } from '../data/Notes';
export function useKeys() {
  // todo
  const play = () => {
    const o = ctx.createOscillator();
    o.frequency.value = 261.63;
    o.connect(ctx.destination);
    o.start(0);
  };
  return { play, middleCKeys };
}
// https://pages.mtu.edu/~suits/notefreqs.html
