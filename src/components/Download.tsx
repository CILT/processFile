import React from 'react';
import { IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { Card } from '../styles/components/Card';
import styled from 'styled-components';
import { downloadFileByName } from '../services/FileService';
import { downloadFile } from '../utils/utils';

const StatusText = styled.p`
  margin: 5px 0;
  font-size: 1.9vh;
  color: #24313D;
`;

const Download: React.FC<{ downloadStatus: string, fileName: string }> = ({ downloadStatus, fileName }) => {

const handleDownloadClick = async () => {
    console.log("descargar");

    try {
        const response = await downloadFileByName(fileName);
        if (response && response.ok) {
            const fileBlob = await response.blob();
            downloadFile(fileBlob, fileName);
        } else {
            console.error('No se pudo obtener el archivo.');
        }
    } catch (error) {
        console.error('Error al descargar el archivo:', error);
    }
};

  return (
    <Card>
      <div>
        <h3>Descargar</h3>
        <StatusText>{downloadStatus}</StatusText>
      </div>
      <IconButton onClick={async() => await handleDownloadClick()}>
        <DownloadIcon />
      </IconButton>
    </Card>
  );
};

export default Download;
