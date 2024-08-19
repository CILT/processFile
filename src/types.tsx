export interface FilesUploaded {
    fileName: string,
    fileId: string,
    type: string,
  }

export interface FileUploadType {
    setFiles: React.Dispatch<React.SetStateAction<FilesUploaded[]>>;
    files: FilesUploaded[];
}

export interface ProcessButtonType {
  filesSelected: FilesUploaded[],
  setDownloadStatus: React.Dispatch<React.SetStateAction<string>>;
  setFileName: React.Dispatch<React.SetStateAction<string>>;
}

export interface ResetButtonType {
  files: FilesUploaded[],
  setDownloadStatus: React.Dispatch<React.SetStateAction<string>>;
  setFileName: React.Dispatch<React.SetStateAction<string>>;
  setFiles: React.Dispatch<React.SetStateAction<FilesUploaded[]>>;
}
