import OpenAI from "openai";
import { FilesUploaded } from '../types';
import { awaitForThredAndAnalyzeQuery, extractName } from "../utils/utils";

const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
});

export const processFiles = async (filesSelected: FilesUploaded[]): Promise<string> => {
  const assistantId = process.env.REACT_APP_OPENAI_ASSISTANT_ID ? process.env.REACT_APP_OPENAI_ASSISTANT_ID : "";
  let threadId = process.env.REACT_APP_OPENAI_THREAD_ID ? process.env.REACT_APP_OPENAI_THREAD_ID : "";
  const attachments: any = []
  let filesTypes = "";

  filesSelected.forEach(file => {
      attachments.push({
        file_id: file.fileId,
        tools: [{ type: "code_interpreter" }],
      })
      filesTypes += file.fileId + "es de tipo " + file.type + " ";
  })

  if (threadId === ""){
    const thread = await openai.beta.threads.create();
    threadId = thread.id;
  }

  const message = await openai.beta.threads.messages.create(
    threadId,
    {
      role: "user",
      content: "Procesame los archivos que adjunte. Te dejo el tipo de cada archivo subido, "+ filesTypes,
      attachments: attachments,
    }
  );

return awaitForThredAndAnalyzeQuery(threadId, assistantId, openai);
};
