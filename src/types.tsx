export interface FilesUploaded {
    fileName: string,
    fileId: string,
    type: string,
  }

export interface FileUploadType {
    setFiles: React.Dispatch<React.SetStateAction<FilesUploaded[]>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ProcessButtonType {
  filesSelected: FilesUploaded[],
  setDownloadStatus: React.Dispatch<React.SetStateAction<string>>;
  setFileName: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ResetButtonType {
  files: FilesUploaded[],
  setDownloadStatus: React.Dispatch<React.SetStateAction<string>>;
  setFileName: React.Dispatch<React.SetStateAction<string>>;
  setFiles: React.Dispatch<React.SetStateAction<FilesUploaded[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
