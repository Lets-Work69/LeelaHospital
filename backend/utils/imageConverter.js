import sharp from 'sharp';

const SUPPORTED_INPUT_MIMES = new Set(['image/jpeg', 'image/jpg', 'image/png']);

export async function ensureWebpDataUrl(imageDataUrl) {
  if (!imageDataUrl || typeof imageDataUrl !== 'string') {
    return imageDataUrl;
  }

  const match = imageDataUrl.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,(.+)$/);
  if (!match) {
    return imageDataUrl;
  }

  const mime = match[1].toLowerCase();
  const base64Payload = match[2];

  if (mime === 'image/webp') {
    return imageDataUrl;
  }

  if (!SUPPORTED_INPUT_MIMES.has(mime)) {
    return imageDataUrl;
  }

  const inputBuffer = Buffer.from(base64Payload, 'base64');
  const outputBuffer = await sharp(inputBuffer)
    .webp({ quality: 80 })
    .toBuffer();

  return `data:image/webp;base64,${outputBuffer.toString('base64')}`;
}
