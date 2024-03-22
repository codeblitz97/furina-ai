import { createCanvas, loadImage } from '@napi-rs/canvas';

export async function getColorFromImage(imagePath: string): Promise<string> {
  const image = await loadImage(imagePath);
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0, image.width, image.height);

  const imageData = ctx.getImageData(0, 0, image.width, image.height);
  const data = imageData.data;

  const colorMap: Map<string, number> = new Map();

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];

    if (a === 0) continue;

    const hex = rgbToHex(r, g, b);
    const count = colorMap.get(hex) || 0;
    colorMap.set(hex, count + 1);
  }

  let maxCount = 0;
  let dominantColor = '';

  colorMap.forEach((count, color) => {
    if (count > maxCount) {
      maxCount = count;
      dominantColor = color;
    }
  });

  return dominantColor;
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
