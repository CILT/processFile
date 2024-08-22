import React, { useState, ChangeEvent, useContext } from 'react';
import { IconButton } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import { FileUploadType } from '../types';
import { Card } from '../styles/components/Card';
import styled from 'styled-components';
import { AlertContext } from '../utils/context/AlertContext';
import { uploadFiles } from '../services/FileService';

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

const FileUpload: React.FC<FileUploadType> = ({ setFiles, setLoading }) => {
  const [fileCount, setFileCount] = useState<number>(0);
  const { showAlert } = useContext(AlertContext)!;

  async function getBase64(file: Blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
           const result = reader?.result?.toString().replace('data:image/png;base64,', '');
        resolve(result)
      }
      reader.onerror = reject
    })
  }

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const files = event.target.files;
    if (files) {
      setFileCount(files.length);
      let filesUploaded = "";
      let allFilesUploaded = true;

      for (let i = 0; i < files.length; i++) {
        const file = await getBase64(files[i]);
        

                // Llamar a la Vision API de Google
                const response = await fetch(
                  `https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCophJbdYEimwKC_MgWMw9EKjs6rzZ4XH8`,
                  {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      requests: [
                        {
                          image: {
                            content: file,
                          },
                          features: [
                            {
                              type: 'DOCUMENT_TEXT_DETECTION',
                            },
                          ],
                        },
                      ],
                    }),
                  }
                );
        
                const data = await response.json();
                console.log(data.responses[0].fullTextAnnotation.text || 'No text found.');
                filesUploaded += data.responses[0].fullTextAnnotation.text + " ------ "
      }

      setFiles(filesUploaded);
      
      setLoading(false);
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


