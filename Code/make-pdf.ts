import PDFDocument from 'pdfkit';
import * as fs from 'node:fs';

const inputText = process.argv[2];
const historyFile = 'history.txt';

if (inputText) {
  // Append new input as a new line in history.txt
  fs.appendFileSync(historyFile, inputText + '\n');
}

// Read all stored lines
const lines = fs.existsSync(historyFile)
  ? fs.readFileSync(historyFile, 'utf-8').trim().split('\n')
  : ['No content added yet.'];

const doc = new PDFDocument();
doc.pipe(fs.createWriteStream('sample-doc.pdf'));

doc.fontSize(20).text('Terminal Output PDF', 100, 100);
doc.moveDown();

// Loop and print every line added so far
doc.fontSize(14);
lines.forEach((line) => {
  doc.text(line);
  doc.moveDown(0.5);
});

doc.end();
console.log(`Added line: "${inputText}"`);