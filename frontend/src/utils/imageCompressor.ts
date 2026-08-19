/**
 * Compresor de Imágenes para Club Digital Pro
 * Redimensiona automáticamente a máximo 250 x 250 px con calidad JPEG 0.8.
 * Produce un Base64 ultraligero (10KB - 25KB) manteniendo alta nitidez para avatares y fichas.
 */
export async function compressImage(
  input: File | string,
  maxDimension: number = 250,
  quality: number = 0.8
): Promise<string> {
  return new Promise((resolve, reject) => {
    const processDataUrl = (dataUrl: string) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';

      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          canvas.width = Math.max(1, width);
          canvas.height = Math.max(1, height);

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            return resolve(dataUrl);
          }

          // Fondo blanco para PNG transparentes convertidos a JPEG
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          const compressed = canvas.toDataURL('image/jpeg', quality);
          resolve(compressed);
        } catch {
          resolve(dataUrl); // Fallback a la imagen original si falla el canvas
        }
      };

      img.onerror = () => {
        resolve(dataUrl);
      };

      img.src = dataUrl;
    };

    if (input instanceof File) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const raw = e.target?.result as string;
        if (raw) {
          processDataUrl(raw);
        } else {
          reject(new Error('No se pudo leer el archivo de imagen.'));
        }
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(input);
    } else if (typeof input === 'string') {
      if (input.startsWith('data:image/')) {
        processDataUrl(input);
      } else {
        // Las URLs externas se retornan directamente
        resolve(input);
      }
    } else {
      reject(new Error('Formato de entrada de imagen no válido.'));
    }
  });
}
