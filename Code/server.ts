import express, { Request, Response } from 'express';
import cors from 'cors'; // 1. Added cors import
import PDFDocument from 'pdfkit';
import { createCanvas } from '@napi-rs/canvas';
import * as fs from 'node:fs';
import * as path from 'node:path';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(cors()); // 2. Added cors middleware
app.use(express.json());

// Serve static output files
app.use('/outputs', express.static(path.join(__dirname, '../')));

// Health check endpoint
app.get('/', (req: Request, res: Response) => {
  res.send('🚀 File Organizer & Generator API is live!');
});

// Generate PDF, CSV, and Image from HTTP POST
app.post('/api/generate', (req: Request, res: Response) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Please provide a "text" field in your JSON body.' });
  }

  try {
    // A. Update History & PDF
    const historyFile = 'history.txt';
    fs.appendFileSync(historyFile, text + '\n');
    const lines = fs.readFileSync(historyFile, 'utf-8').trim().split('\n');

    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream('sample-doc.pdf'));
    doc.fontSize(20).text('Localhost PDF Output', 100, 50);
    doc.moveDown();
    doc.fontSize(14);
    lines.forEach((line) => doc.text(line));
    doc.end();

    // B. Update CSV
    const csvFile = 'data.csv';
    if (!fs.existsSync(csvFile)) {
      fs.writeFileSync(csvFile, 'Timestamp, Entry\n');
    }
    const timestamp = new Date().toISOString().split('T')[0];
    fs.appendFileSync(csvFile, `"${timestamp}", "${text}"\n`);

    // C. Update Image
    const canvas = createCanvas(600, 300);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#1e1e2e';
    ctx.fillRect(0, 0, 600, 300);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText(text, 40, 150);
    fs.writeFileSync('output.png', canvas.toBuffer('image/png'));

    return res.status(200).json({
      message: 'Files updated successfully!',
      text,
      pdfUrl: `http://127.0.0.1:${PORT}/sample-doc.pdf`,
      imageUrl: `http://127.0.0.1:${PORT}/output.png`,
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to process files.', details: err });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`⚡ Server running locally at http://127.0.0.1:${PORT}`);
});