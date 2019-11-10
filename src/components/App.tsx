import React from 'react';
import { AppStyle } from '../styles/AppStyle';
import { useKeys } from '../hooks/useKeys';
import { Key } from './Key';
import styled from 'styled-components/macro';

const Main = styled.main`
  display: flex;
  flex-direction: row;
`;

const App: React.FC = () => {
  const { play, middleCKeys } = useKeys();
  return (
    <AppStyle>
      <div className="App">
        <header className="App-header">Keyboard</header>
      </div>
      <Main>
        {middleCKeys.map((k, i) => (
          <Key data={k} key={i} />
        ))}
      </Main>
    </AppStyle>
  );
};

export default App;
