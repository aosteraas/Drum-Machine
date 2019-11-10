import styled from 'styled-components/macro';

export const Keyboard = styled.section`
  display: flex;
  flex-direction: row;
`;

interface KeyProps {
  sharp: boolean;
}

export const KeyStyle = styled.article<KeyProps>`
  font-size: 1rem;
  color: ${p => (!p.sharp ? 'black' : 'white')};
  background: ${p => (p.sharp ? 'black' : 'white')};
  user-select: none;
  width: calc(100vw / 49);
  height: 50vh;
  max-height: 250px;
  word-break: break-word;
  position: relative;
  &.black {
    height: 10em;
    margin: 0 0 0 -1em;
    transform: translateX(1rem);
    z-index: 2;
    width: 2em;
  }
  &.white {
    width: 4em;
    margin: 0 -1em 0 0;
    border-radius: 0 0 5px 5px;
    box-shadow: -1px 0 0 rgba(255, 255, 255, 0.8) inset, 0 0 5px #ccc inset,
      0 0 3px rgba(0, 0, 0, 0.2);
  }
`;
