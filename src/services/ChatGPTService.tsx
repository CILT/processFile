import OpenAI from "openai";
import { FilesUploaded } from '../types';
import { awaitForThredAndAnalyzeQuery, extractName } from "../utils/utils";

const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
});

export const askChatGPT = async (filesSelected: FilesUploaded[]): Promise<string> => {
  const assistantId = process.env.REACT_APP_OPENAI_ASSISTANT_ID ? process.env.REACT_APP_OPENAI_ASSISTANT_ID : "";
  const threadId = process.env.REACT_APP_OPENAI_THREAD_ID ? process.env.REACT_APP_OPENAI_THREAD_ID : "";
  const attachments: any = []
  const content: any[] = [{type: "text", text: "Necesito que me proceses los archivos que subi y que adjunte. Devolveme el excel generado"}]

  filesSelected.forEach(file => {
    const isImage = file.type === "image/png" || file.type === "image/jpeg";
    if (isImage) {
      content.push({
        type: "image_file",
        image_file: {file_id: file.fileId}
      },)
    } else {
      attachments.push({
        file_id: file.fileId,
        tools: [{ type: "code_interpreter" }],
      })    
    }
})

  const message = await openai.beta.threads.messages.create(
    threadId,
    {
      role: "user",
      content: content,
      attachments: attachments,
    }
  );

return awaitForThredAndAnalyzeQuery(threadId, assistantId, openai);

};
