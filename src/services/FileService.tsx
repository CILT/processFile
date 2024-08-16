import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true 
});

export const uploadFiles = async (fileBuffer: any) => {
    const isImage = fileBuffer.type === "image/png" || fileBuffer.type === "image/jpeg";
    const file = await openai.files.create({
        file: fileBuffer,
        purpose: isImage ? 'vision' : 'assistants',
      });
      
    return {fileId: file.id, fileName: file.filename, type: fileBuffer.type};
};

export const getFiles = async () => {
  return await openai.files.list();
}

export const getIdFileByName = async (fileName: string) => {
    const files = await getFiles();
    console.log(files);
    const file = files.data.find(file => file.filename === fileName);
    return file?.id;
  }

export const downloadFileByName = async (fileName: string) => {
    const fileId = await getIdFileByName(fileName);
    let file;
    if(fileId)
        return file = await openai.files.content(fileId);
    
    return null
  }
