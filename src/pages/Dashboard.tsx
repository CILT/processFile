import React, { useEffect, useState } from 'react';
import FileUpload from '../components/FileUpload';
import ProcessButton from '../components/buttons/ProcessButton';
import Download from '../components/Download';
import ResetButton from '../components/buttons/ResetButton';
import APIKeys from '../components/keys/APIKeys';
import { FilesUploaded } from '../types';
import OutputAPIKeys from '../components/keys/OutputAPIKeys';
import Header from '../components/Header';
import { MainWrapper, TopRow, MiddleRow, LargeButton, SpacedContainer, CentralButton } from '../styles/pages/DashboardStyle';
import Settings from '../components/Settings';
import { Box, CircularProgress } from '@mui/material';

const Dashboard: React.FC = () => {
  const [files, setFiles] = useState<string>("");
  const [filesSelected, setFilesSelected] = useState<FilesUploaded[]>([]);
  const [downloadStatus, setDownloadStatus] = useState<string>('Pendiente de procesamiento');
  const [fileName, setFileName] = useState<string>(''); 
  const [loading, setLoading] = useState(false);

  return (
    <>
    <Header />
    <MainWrapper>
        <Box
          position="fixed"
        >
          {loading ? <CircularProgress /> : null}
        </Box>
        <TopRow>
          <ResetButton setDownloadStatus={setDownloadStatus} setFileName={setFileName} setFiles={setFiles} setLoading={setLoading}/>
        </TopRow>
        <MiddleRow>
          <LargeButton>
            <APIKeys />
            <SpacedContainer />
            <FileUpload setFiles={setFiles} setLoading={setLoading}/>
          </LargeButton>
          <CentralButton>
            <ProcessButton files={files} setDownloadStatus={setDownloadStatus} setFileName={setFileName} setLoading={setLoading}/>
          </CentralButton>
          <LargeButton>
            <OutputAPIKeys />
            <SpacedContainer />
            <Download downloadStatus={downloadStatus} fileName={fileName} />
          </LargeButton>
        </MiddleRow>
        {/* <Settings 
          setFilesSelected={setFilesSelected} 
          files={files} 
          filesSelected={filesSelected} 
        /> */}
      </MainWrapper>
    </>
  );
}

export default Dashboard;
