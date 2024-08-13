import React from 'react';
import { IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { Card } from '../styles/components/Card';
import styled from 'styled-components';

const StatusText = styled.p`
  margin: 5px 0;
  font-size: 1.9vh;
  color: #24313D;
`;

const Download: React.FC<{ downloadStatus: string }> = ({ downloadStatus }) => (
  <Card>
    <div>
      <h3>Descargar</h3>
      <StatusText>{downloadStatus}</StatusText>
    </div>
    <IconButton>
      <DownloadIcon />
    </IconButton>
  </Card>
);

export default Download;
