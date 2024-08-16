import OpenAI from "openai";

export const extractName = (text: string): string => {
    const regex = /sandbox:(\/mnt\/data\/.*\.xlsx)/;
    const match = text.match(regex);
    return match ? match[1] : '';
};

export const downloadFile = (file: Blob, fileName: string) => {
    const url = URL.createObjectURL(file);

    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = fileName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    URL.revokeObjectURL(url);
}

export const awaitForThredAndAnalyzeQuery =(threadId: string, assistantId:string, openai: OpenAI): Promise<string> => {
    let finalText = '';
    return new Promise((resolve, reject) => {
        const run = openai.beta.threads.runs.stream(threadId, {
          assistant_id: assistantId
        })
          .on('textCreated', (text) => {
            if (text && typeof text === 'object' && text.value) {
              finalText += text.value;
            } else if (typeof text === 'string') {
              finalText += text;
            }
          })
          .on('textDelta', (textDelta, snapshot) => {
            if (textDelta && textDelta.value) {
              if (typeof textDelta.value === 'string') {
                finalText += textDelta.value;
              } else if (typeof textDelta.value === 'object' && textDelta.value) {
                finalText += textDelta.value;
              }
            }
          })
          .on('end', async () => {
            console.log("Processing complete.");
            console.log("Final text:", finalText);
            
            const queryResult = await analyzeAndQuery(finalText, openai, threadId, assistantId);

            resolve(queryResult);
          })
          .on('error', (error) => {
            console.error("An error occurred:", error);
            reject(error);
          });
      });
}

export async function analyzeAndQuery(text: string, openai: OpenAI, threadId: string, assistantId: string): Promise<string> {
    if (text.includes("¿Desea continuar subiendo más archivos o procederemos con el análisis de los documentos proporcionados?")) {
      console.log("El texto indica que se deben subir más archivos.");
      return await confirm(openai, "Son todos los archivos, procesamelo", threadId, assistantId);
    } else if (text.includes("sandbox:/mnt/data")){
      return extractName(text);
    } else if (text.includes("Voy a empezar a examinar los archivos")) {
      console.log("El texto indica que el análisis está por realizarse.");
      return await confirm(openai, "Ok, espero el excel.", threadId, assistantId);
    } else {
      console.log("Texto no reconocido, tomando acción predeterminada.");
    }
  
    return "";
  }

export const confirm = async (openai: OpenAI, messageContent: string, threadId: string, assistantId: string): Promise<string> => {
  const message = await openai.beta.threads.messages.create(
    threadId,
    {
      role: "user",
      content: messageContent,
    }
  );

  return awaitForThredAndAnalyzeQuery(threadId, assistantId, openai);
};