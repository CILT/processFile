import React, { useState } from 'react';
import styled from 'styled-components';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import Popup from './Popup';
import { FilesUploaded } from '../types';
import SettingsIcon from '@mui/icons-material/Settings';

const StyledButton = styled.button`
  margin-top: 10vh;
  background: #F2F6F8;
  border-radius: 50px;
  padding: 1vh 2vw;
  cursor: pointer;
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  font-size: 2.5vh;
  font-family: 'Open Sans', sans-serif;
  color: #24313D;
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    background-color: #f0f0f0;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

interface SettingsProps {
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  prompt: string;
}

const Settings: React.FC<SettingsProps> = ({ setPrompt, prompt }) => {
  const [isPopupVisible, setPopupVisible] = useState(false);

  return (
    <>
      <StyledButton onClick={() => setPopupVisible(true)}>
        <SettingsIcon style={{ marginRight: '2vh', color: '#333' }} />
        <span>Ajustar prompt</span>
      </StyledButton>

      {isPopupVisible && (
        <Popup
          title="Ajustar prompt"
          onClose={() =>setPopupVisible(false)}
          onSave={(e) => {setPrompt(e); setPopupVisible(false);}}
          prompt= {prompt}
        />
      )}
    </>
  );
};

export default Settings;
