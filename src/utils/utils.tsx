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
            
            const queryResult = await analyzeAndQuery(finalText, openai);

            resolve(queryResult);
          })
          .on('error', (error) => {
            console.error("An error occurred:", error);
            reject(error);
          });
      });
}

export async function analyzeAndQuery(text: string, openai: OpenAI): Promise<string> {
    if (text.includes("¿Desea continuar subiendo más archivos o procederemos con el análisis de los documentos proporcionados?")) {
      console.log("El texto indica que se deben subir más archivos.");
      return await confirmFiles(openai);
    } else if (text.includes("Podrías intentar subir el archivo otra vez, por favor?")) {
      console.log("El texto indica que el análisis está completo.");
    } else if (text.includes("Puedes descargarlo utilizando el siguiente enlace:")){
      return extractName(text);
    } else {
      console.log("Texto no reconocido, tomando acción predeterminada.");
    }
  
    return "";
  }

export const confirmFiles = async (openai: OpenAI): Promise<string> => {
  const assistantId = "asst_BsOZ20e8aybHedRgNrf5JHHz";
  const storageId = "vs_vca3UzfMAwkNw44hdr67Y6lA";
  const thread = await openai.beta.threads.create();
  const message = await openai.beta.threads.messages.create(
    thread.id,
    {
      role: "user",
      content: "Son todos los archivos, procesamelo",
    }
  );

  return awaitForThredAndAnalyzeQuery(thread.id, assistantId, openai);
};