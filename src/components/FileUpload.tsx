import React, { useState, ChangeEvent } from 'react';
import { IconButton } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import { uploadFiles } from '../services/ChatGPTService';
import { FileUploadType } from '../types';
import { Card } from '../styles/components/Card';
import styled from 'styled-components';

const HiddenInput = styled.input`
  display: none;
`;

const FileCountText = styled.p`
  margin: 5px 0;
  font-size: 1.9vh;
  color: #888;
`;

const FileTypeText = styled.small`
  font-size: 1.5vh;
  color: #aaa;
`;

const FileUpload: React.FC<FileUploadType> = ({ setFiles }) => {
  const [fileCount, setFileCount] = useState<number>(0);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setFileCount(files.length);
      const filesUploaded = [];
      for (let i = 0; i < files.length; i++) {
        const file = await uploadFiles(files[i]);
        filesUploaded.push(file);
      }
      setFiles(filesUploaded);
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
