import OpenAI from "openai";
import { FilesUploaded } from '../types';
import { awaitForThredAndAnalyzeQuery, extractName } from "../utils/utils";

const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
});

export const askChatGPT = async (filesSelected: FilesUploaded[]): Promise<string> => {
  const assistantId = "asst_BsOZ20e8aybHedRgNrf5JHHz";
  const storageId="vs_vca3UzfMAwkNw44hdr67Y6lA";
  const thread = await openai.beta.threads.create();
  const attachments: any = []

  filesSelected.forEach(file => attachments.push({
    file_id: file.fileId,
    tools: [{ type: "file_search" }],
  }))

  const message = await openai.beta.threads.messages.create(
    thread.id,
    {
      role: "user",
      content: "Necesito que me proceses el/los archivos que adjunte",
      attachments: attachments,
    }
  );

  return awaitForThredAndAnalyzeQuery(thread.id, assistantId, openai);
};
