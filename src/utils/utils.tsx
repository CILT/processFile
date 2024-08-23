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

export const defaultPrompt = `Sigue los siguientes pasos y procesame las iamgenes adjuntas. Recuerda que me debes devolver un json

Instrucciones para Procesamiento de Documentos:
Extracción y Clasificación de Documentos:
Extrae el texto de la imagen y organiza la información en un archivo JSON.
El documento puede contener múltiples tipos de documentos, como órdenes de pago, comprobantes de transferencia y certificados de retención.
Tu tarea es clasificar cada tipo de documento identificado en las categorías mencionadas (órdenes de pago, comprobantes de transferencia, certificados de retención) y procesarlos por separado, incluso si están dentro del mismo archivo. Por ejemplo un archivo puede ser una orden de pago pero contener comprobante de pago, esos deben ser registros aparte en el json, en ese caso el saldo_a_pagar en los comprobantes de pago debe ser siempre 0
Estructura del JSON:
La información extraída debe consolidarse en un archivo JSON utilizando las siguientes claves:
tipo_de_documento
fecha_emision_factura
fecha_retencion
fecha_comprobante_pago
razon_social
CUIT
ID_factura
monto_factura
ID_orden_pago
monto_orden_pago
ID_comprobante_pago
monto_comprobante_pago
ID_certificacion_retencion
monto_certificado_retencion
total_recibido
saldo_a_pagar
Estas claves deben estar siempre presentes en el JSON, incluso si algún valor es nulo.
Cálculo de Campos Financieros:
total_recibido: Corresponde al monto_comprobante_pago.
saldo_a_pagar: Calculado como la diferencia entre monto_orden_pago y total_recibido.
Si monto_orden_pago es nulo, establece saldo_a_pagar como 0.
Si total_recibido es nulo, establece saldo_a_pagar como monto_orden_pago.
Es crucial que estos cálculos se realicen con precisión.
Si el archivo es de tipo orden de pago la fecha tiene que ir en el campo fecha_emision_factura
Si el archivo es de tipo comprobante de pago la fecha tiene que ir en el campo fecha_comprobante_pago
Si el archivo es de tipo certificado de retencion la fecha tiene que ir en fecha_retencion



Consideraciones para Órdenes de Pago con Comprobantes:
Si una orden de pago incluye comprobantes de pago, estos no deben tener un valor en monto_orden_pago, pero deben mantener el ID_orden_pago.
Para fines de cálculo, el valor de monto_orden_pago debe considerarse 0 en estos casos.
`;