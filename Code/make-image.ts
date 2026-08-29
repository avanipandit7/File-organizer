import { createCanvas } from '@napi-rs/canvas';
import * as fs from 'node:fs';

const inputText = process.argv[2] || 'Default Text';

// Create a 600x400 canvas
const canvas = createCanvas(600, 400);
const ctx = canvas.getContext('2d');

// Draw Background
ctx.fillStyle = '#1e1e2e';
ctx.fillRect(0, 0, 600, 400);

// Draw Text from Terminal
ctx.fillStyle = '#ffffff';
ctx.font = 'bold 30px sans-serif';
ctx.fillText(inputText, 50, 200);

// Save as PNG
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('output.png', buffer);

console.log(`Created output.png with text: "${inputText}"`);