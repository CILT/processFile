import OpenAI from "openai";
import { FilesUploaded } from '../types';

const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    organization: process.env.REACT_APP_OPENAI_ORG_ID,
    dangerouslyAllowBrowser: true 
});

export const askChatGPT = async (filesSelected: FilesUploaded[]) => {
    console.log(filesSelected);
    // const response = await openai.chat.completions.create({
    //     messages: [{ role: "system", content: "¿Cuál es la capital de Francia?" }],
    //     model: "gpt-4o-mini",
    // });
    const response = {
        "id": "chatcmpl-abc123",
        "object": "chat.completion",
        "created": 1677858242,
        "model": "gpt-4o-mini",
        "usage": {
            "prompt_tokens": 13,
            "completion_tokens": 7,
            "total_tokens": 20
        },
        "choices": [
            {
                "message": {
                    "role": "assistant",
                    "content": "\n\nThis is a test!"
                },
                "logprobs": null,
                "finish_reason": "stop",
                "index": 0
            }
        ]
    }
    console.log({response});
    return response;
};

export const uploadFiles = async (fileBuffer: any) => {
    const file = await openai.files.create({
        file: fileBuffer,
        purpose: 'fine-tune',
      });
    return {fileId: file.id, fileName: file.filename};
};
