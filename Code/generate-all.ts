import PDFDocument from 'pdfkit';
import { createCanvas } from '@napi-rs/canvas';
import * as fs from 'node:fs';

const inputText = process.argv[2];

if (!inputText) {
  console.log('⚠️ Please provide text! Example: npx tsx Code/generate-all.ts "My Text"');
  process.exit(1);
}

// 1. UPDATE PDF (Append Mode)
const historyFile = 'history.txt';
fs.appendFileSync(historyFile, inputText + '\n');
const lines = fs.readFileSync(historyFile, 'utf-8').trim().split('\n');

const doc = new PDFDocument();
doc.pipe(fs.createWriteStream('sample-doc.pdf'));
doc.fontSize(20).text('Terminal Output PDF', 100, 50);
doc.moveDown();
doc.fontSize(14);
lines.forEach((line) => doc.text(line));
doc.end();

// 2. UPDATE CSV (Append Mode)
const csvFile = 'data.csv';
if (!fs.existsSync(csvFile)) {
  fs.writeFileSync(csvFile, 'Timestamp, Entry\n');
}
const timestamp = new Date().toISOString().split('T')[0];
fs.appendFileSync(csvFile, `"${timestamp}", "${inputText}"\n`);

// 3. UPDATE IMAGE (Generate PNG)
const canvas = createCanvas(600, 300);
const ctx = canvas.getContext('2d');
ctx.fillStyle = '#1e1e2e';
ctx.fillRect(0, 0, 600, 300);
ctx.fillStyle = '#ffffff';
ctx.font = 'bold 24px sans-serif';
ctx.fillText(inputText, 40, 150);
fs.writeFileSync('output.png', canvas.toBuffer('image/png'));

console.log(`✅ Updated PDF, CSV, and Image with text: "${inputText}"`);