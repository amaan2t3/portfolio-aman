import { mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assetsDir = path.join(root, 'src/assets');
const outputDir = path.join(assetsDir, 'optimized');
const imageNames = [
  'aman.png',
  'Aqcollege.jpg',
  'cisco-logo.png',
  'C++.png',
  'DeveloperHub-intership.jpeg',
  'futsal.png',
  'GYM.png',
  'blogwebapp.png',
  'kiwilogic-intership.png',
  'Nsu-mukhtar-auditorium.jpg',
  'pny.png',
  'PNY.png',
  'smart-watch.png',
  'bg-changer.png',
  'currency-converter.png',
  'urlshortner.png',
  'digital.png',
  'writing.png',
];

await mkdir(outputDir, { recursive: true });

for (const imageName of imageNames) {
  const sourcePath = path.join(assetsDir, imageName);
  const outputPath = path.join(outputDir, `${path.parse(imageName).name}.webp`);
  const metadata = await sharp(sourcePath).metadata();
  const maxWidth = imageName === 'cisco-logo.png' ? 512 : 1400;
  const maxHeight = imageName === 'aman.png' || imageName === 'kiwilogic-intership.png' ? 1200 : 1100;

  await sharp(sourcePath)
    .rotate()
    .resize({ width: maxWidth, height: maxHeight, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 78, effort: 5, alphaQuality: 80 })
    .toFile(outputPath);

  const { size: outputBytes } = await stat(outputPath);
  console.log(`${imageName}: ${metadata.width}x${metadata.height} -> ${path.basename(outputPath)} (${Math.round(outputBytes / 1024)} KB)`);
}
