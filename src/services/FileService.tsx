import OpenAI from "openai";
import { FilesUploaded } from "../types";

const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true 
});

export const uploadFiles = async (fileBuffer: any) => {
    const file = await openai.files.create({
        file: fileBuffer,
        purpose: 'assistants',
      });

    return {fileId: file.id, fileName: file.filename, type: fileBuffer.type};
};

export const getFiles = async () => {
  return await openai.files.list();
}

export const getIdFileByName = async (fileName: string) => {
    const files = await getFiles();
    const file = files.data.find(file => file.filename === fileName);
    return file?.id;
  }

export const downloadFileByName = async (fileName: string) => {
    const fileId = await getIdFileByName(fileName);
    if(fileId)
        return await openai.files.content(fileId);
    
    return null
  }

export const deleteFiles = async (files: FilesUploaded[]) => {
  files.forEach(async file => {
    await openai.files.del(file.fileId);
  });
}
