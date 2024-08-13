import React, { useState } from 'react';
import styled from 'styled-components';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import Popup from './Popup';
import { FilesUploaded } from '../types';

const StyledButton = styled.button`
  margin-top: 10vh;
  background: white;
  border-radius: 50px;
  padding: 1vh 2vw;
  cursor: pointer;
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  font-size: 2.5vh;
  font-family: 'Poppins';
  color: #333;
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    background-color: #f0f0f0;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

interface SettingsProps {
  files: FilesUploaded[];
  filesSelected: FilesUploaded[];
  setFilesSelected: React.Dispatch<React.SetStateAction<FilesUploaded[]>>;
}

const Settings: React.FC<SettingsProps> = ({ setFilesSelected, filesSelected, files }) => {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleChecklistChange = (fileId: string) => {
    setFilesSelected(prev =>
      prev.some(file => file.fileId === fileId)
        ? prev.filter(file => file.fileId !== fileId)
        : [...prev, files.find(file => file.fileId === fileId)!]
    );
  };

  const handleSave = () => setPopupVisible(false);

  return (
    <>
      <StyledButton onClick={() => setPopupVisible(true)}>
        <FolderOpenIcon style={{ marginRight: '2vh', color: '#333' }} />
        <span>Seleccionar Archivos</span>
      </StyledButton>

      {isPopupVisible && (
        <Popup
          title="Archivos a procesar"
          onClose={handleSave}
          checklistItems={files.map(file => ({ id: file.fileId, label: file.fileName }))}
          selectedItems={filesSelected.map(file => file.fileId)}
          onChecklistChange={handleChecklistChange}
        />
      )}
    </>
  );
};

export default Settings;
