import React, { useState, ChangeEvent, useContext } from 'react';
import { IconButton } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import { uploadFiles } from '../services/ChatGPTService';
import { FileUploadType } from '../types';
import { Card } from '../styles/components/Card';
import styled from 'styled-components';
import { AlertContext } from '../context/AlertContext';

const HiddenInput = styled.input`
  display: none;
`;

const FileCountText = styled.p`
  margin: 5px 0;
  font-size: 1.9vh;
  color: #24313D;
`;

const FileTypeText = styled.small`
  font-size: 1.5vh;
  color: #24313D;
`;

const FileUpload: React.FC<FileUploadType> = ({ setFiles }) => {
  const [fileCount, setFileCount] = useState<number>(0);
  const { showAlert } = useContext(AlertContext)!;

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setFileCount(files.length);
      const filesUploaded = [];
      let allFilesUploaded = true;

      for (let i = 0; i < files.length; i++) {
        try {
          const file = await uploadFiles(files[i]);
          filesUploaded.push(file);
        } catch (error) {
          allFilesUploaded = false;
        }
      }

      setFiles(filesUploaded);
      if (allFilesUploaded) {
        showAlert('Todos los archivos fueron subidos correctamente.', 'success');
      } else {
        showAlert('Algunos archivos no se pudieron subir.', 'error');
      }
    }
  };

  return (
    <Card>
      <div>
        <h3>Subir Archivos</h3>
        <FileCountText>
          {fileCount} Documento{fileCount !== 1 ? 's' : ''} listo{fileCount !== 1 ? 's' : ''}
        </FileCountText>
        <FileTypeText>PDF, JPEG, PNG</FileTypeText>
      </div>
      <label htmlFor="file-upload">
        <IconButton component="span">
          <UploadIcon />
        </IconButton>
        <HiddenInput
          id="file-upload"
          type="file"
          accept=".pdf, .png, .jpeg, .jpg"
          onChange={handleFileChange}
          multiple
        />
      </label>
    </Card>
  );
};

export default FileUpload;
