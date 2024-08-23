import OpenAI from "openai";
import { FilesUploaded } from '../types';
import { awaitForThredAndAnalyzeQuery, extractName } from "../utils/utils";
import { GoogleGenerativeAI }  from "@google/generative-ai";

const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
});

export const processFiles = async (files: any[], prompt: string): Promise<string> => {
  const apiKey = "";
  const genAI = new GoogleGenerativeAI("AIzaSyCophJbdYEimwKC_MgWMw9EKjs6rzZ4XH8");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  let input: any[] = [prompt]
  for (let i = 0; i < files.length; i++) {
    const image = [{
      inlineData: {
        data: files[i],
        mimeType: "image/png",
      },
    }];
    input.push(image);
  }
const result = await model.generateContent(input);
let response = "";
if (result?.response?.candidates && result?.response?.candidates[0].content.parts[0].text){
  response = result?.response?.candidates[0].content.parts[0].text;
  console.log(result?.response?.candidates[0].content.parts[0].text);
}

return response;
};
