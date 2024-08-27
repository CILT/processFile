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
            
            const queryResult = await analyzeAndQuery(finalText);

            resolve(queryResult);
          })
          .on('error', (error) => {
            console.error("An error occurred:", error);
            reject(error);
          });
      });
}

export async function analyzeAndQuery(text: string): Promise<string> {
  if (text.includes("sandbox:/mnt/data"))
    return extractName(text);

  return "";
}

export const defaultPrompt = `
usando todos esos jsons de facturas ordenes, comprobantes y retenciones generar un json con toda la informacion de un xls tabla que luego voy a generar la cual tiene como objetivo relacionar las facturas con sus ordenes pagos y certificados asociados mostrando en una ultima columna el saldo diferencia entre lo facturado y la suma de retencion y comprobantes para asi visualziar su conciliacion
Es importante que solo me respondas con el json y que cada json de entrada procesado tenga las mismas columnas entre si en el json de salida. Es importante validar que el json de salida sea un json valido`;

export const promptToConvertImagesToJson = "Convertime estas imagenes png en texto con formato json"