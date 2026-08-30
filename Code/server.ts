import express, { Request, Response } from 'express';
import cors from 'cors';
import PDFDocument from 'pdfkit';
import { createCanvas } from '@napi-rs/canvas';
import * as fs from 'node:fs';
import * as path from 'node:path';
import mysql from 'mysql2/promise';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

// Serve static generated files so React can display/download them
app.use('/files', express.static(path.join(__dirname, '../public/exports')));

// 1. MySQL Connection Pool
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'your_password', // Update with your MySQL password
  database: 'file_organizer_db',
  waitForConnections: true,
  connectionLimit: 10,
});

const exportsDir = path.join(__dirname, '../public/exports');
if (!fs.existsSync(exportsDir)) {
  fs.mkdirSync(exportsDir, { recursive: true });
}

// 2. CREATE / GENERATE FILE ROUTE
app.post('/api/generate', async (req: Request, res: Response) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Text prompt is required.' });

  try {
    const timestamp = Date.now();
    const pdfFilename = `doc-${timestamp}.pdf`;
    const imageFilename = `img-${timestamp}.png`;

    const pdfPath = path.join(exportsDir, pdfFilename);
    const imagePath = path.join(exportsDir, imageFilename);

    // Generate PDF
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(pdfPath));
    doc.fontSize(20).text('Generated Export Log', 100, 50);
    doc.moveDown();
    doc.fontSize(14).text(text);
    doc.end();

    // Generate Image
    const canvas = createCanvas(600, 300);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#1e1e2e';
    ctx.fillRect(0, 0, 600, 300);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText(text, 40, 150);
    fs.writeFileSync(imagePath, canvas.toBuffer('image/png'));

    // SQL INSERT QUERY
    const [result]: any = await db.execute(
      'INSERT INTO generator_logs (input_text, pdf_path, image_path) VALUES (?, ?, ?)',
      [text, pdfFilename, imageFilename]
    );

    return res.status(200).json({
      message: 'Generated successfully',
      id: result.insertId,
      text,
      pdfUrl: `/files/${pdfFilename}`,
      imageUrl: `/files/${imageFilename}`,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to process request.' });
  }
});

// 3. READ / FETCH ALL LOGS ROUTE
app.get('/api/logs', async (_req: Request, res: Response) => {
  try {
    // SQL SELECT QUERY
    const [rows] = await db.execute(
      'SELECT id, input_text, pdf_path, image_path, created_at FROM generator_logs ORDER BY created_at DESC'
    );
    return res.status(200).json(rows);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch history logs.' });
  }
});

// 4. DELETE ROUTE
app.delete('/api/logs/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // SQL SELECT to get file names before deletion
    const [rows]: any = await db.execute(
      'SELECT pdf_path, image_path FROM generator_logs WHERE id = ?',
      [id]
    );

    if (rows.length === 0) return res.status(404).json({ error: 'Record not found.' });

    // Remove local files
    const pdfPath = path.join(exportsDir, rows[0].pdf_path);
    const imagePath = path.join(exportsDir, rows[0].image_path);
    if (fs.existsSync(pdfPath)) fs.unlinkSync(pdfPath);
    if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);

    // SQL DELETE QUERY
    await db.execute('DELETE FROM generator_logs WHERE id = ?', [id]);

    return res.status(200).json({ message: 'Record and files deleted successfully.' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to delete record.' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`⚡ Express Server running at http://127.0.0.1:${PORT}`);
});