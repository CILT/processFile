import React from 'react';
import styled from 'styled-components';
import { IconButton } from '@mui/material';
import { askChatGPT } from '../../services/ChatGPTService';
import { ProcessButtonType } from '../../types';

import processFile from '../../assets/images/processFile.png'; 

const ProcessWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10vh;
`;

const StyledIconButton = styled(IconButton)`
  border-radius: 50%;
  width: 25vh;
  height: 25vh;
  display: flex;
  justify-content: center;
  box-shadow: 0 0 30px 30px rgba(203, 244, 244, 0.5);

  &:hover {
    box-shadow: 0 0 35px 15px rgba(203, 244, 244, 0.9);
  }

  & img {
    width: 100%;
    height: 100%;
    border-radius: 50%; 
    object-fit: cover;
    display: block;
    margin: 0;
    padding: 0;
  }
`;

const ProcessButton: React.FC<ProcessButtonType> = ({ filesSelected }) => (
  <ProcessWrapper>
    <StyledIconButton 
      onClick={async () => await askChatGPT(filesSelected)}
    >
      <img 
        src={processFile} 
        alt="Process File Icon" 
      />
    </StyledIconButton>
    <div style={{ paddingTop: '2.5vh', color: '#666' }}><p style={{ margin: '5px 0', fontSize: '3vh', color: '#888' }}>Procesar Archivos</p></div>
  </ProcessWrapper>
);

export default ProcessButton;
