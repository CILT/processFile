export interface FilesUploaded {
    fileName: string,
    fileId: string
  }

export interface FileUploadType {
    setFiles: React.Dispatch<React.SetStateAction<FilesUploaded[]>>;
}

export interface ProcessButtonType {
  filesSelected: FilesUploaded[],
  setDownloadStatus: React.Dispatch<React.SetStateAction<string>>;
  setFileName: React.Dispatch<React.SetStateAction<string>>;
}
