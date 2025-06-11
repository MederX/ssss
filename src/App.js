import React from 'react';
import styled from '@emotion/styled';
import LoveLetter from './components/LoveLetter';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);
`;

function App() {
  return (
    <AppContainer>
      <LoveLetter />
    </AppContainer>
  );
}

export default App; 