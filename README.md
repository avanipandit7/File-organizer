# 📂 File Organizer & PDF Generator

<div align="center">

### ⚡ Organize files automatically • Generate PDFs from your terminal • Built with TypeScript

<img src="https://readme-typing-svg.demolab.com?font=Poppins&weight=600&size=24&pause=1000&color=3B82F6&center=true&vCenter=true&width=650&lines=Smart+File+Organizer+%F0%9F%93%82;Terminal+to+PDF+Generator+%F0%9F%93%84;Node.js+%2B+TypeScript+CLI+Utility+%E2%9A%A1" />

<br/>

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![PDFKit](https://img.shields.io/badge/PDFKit-E34F26?style=for-the-badge&logo=adobeacrobatreader&logoColor=white)
![TSX](https://img.shields.io/badge/TSX-000000?style=for-the-badge&logo=typescript&logoColor=white)

![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![CLI Utility](https://img.shields.io/badge/CLI-Tool-blueviolet?style=flat-square)
![Node v22+](https://img.shields.io/badge/Node-v22+-success?style=flat-square)

</div>

---

## 🌟 Overview

**File Organizer & PDF Generator** is a lightweight **CLI utility** built with **Node.js + TypeScript** that helps keep directories clean while instantly generating structured PDF documents directly from terminal commands.

Instead of manually creating folders or writing PDFs, simply run one command and let the utility handle everything automatically.

### 🎯 What this project does

- 📂 Automatically sorts files into categorized folders.
- 📄 Converts terminal input into a formatted PDF.
- 📝 Maintains a persistent history of generated content.
- ⚡ Runs TypeScript instantly using **tsx** (no manual compilation).

---

# ✨ Features

| Feature | Description |
|---------|-------------|
| 📁 Smart File Organizer | Automatically detects and sorts files into folders based on extension. |
| 📄 PDF Generator | Creates a professional PDF from terminal input using **PDFKit**. |
| 📝 History Tracking | Stores previous CLI entries in `history.txt` and appends new content. |
| ⚡ Zero Compilation | Execute TypeScript files directly using **tsx**. |
| 🖥️ CLI Based | Simple terminal commands with optional custom directory support. |

---

# 🖼️ Supported File Types

| Category | Extensions |
|----------|------------|
| 🖼️ Images | `.png`, `.jpg`, `.jpeg`, `.gif`, `.webp` |
| 📄 Documents | `.pdf`, `.csv`, `.docx`, `.txt` |
| 🗜️ Archives | `.zip`, `.rar`, `.7z` |
| 📊 Data | `.csv`, `.xlsx` |

> Easily extend the organizer by adding more file extensions.

---

# ⚙️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **TypeScript** | Type-safe backend logic |
| **Node.js** | Runtime environment |
| **PDFKit** | PDF creation engine |
| **tsx** | Execute TypeScript without compiling |

---

# 📂 Project Structure

```bash
file-organizer/
│
├── 📁 Code/
│   ├── organizer.ts        # Smart file organizer
│   └── make-pdf.ts         # Terminal PDF generator
│
├── 📁 Images/              # Sorted image files
├── 📁 Documents/           # PDFs, CSVs, Docs
├── 📁 Archives/            # ZIP/RAR/7Z files
│
├── 📄 sample-doc.pdf       # Generated PDF
├── 📝 history.txt          # Persistent CLI history
├── 📦 package.json
├── ⚙️ tsconfig.json
└── 📘 README.md
```

---

# 🚀 Installation

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/file-organizer.git
```

## 2️⃣ Navigate into the Project

```bash
cd file-organizer
```

## 3️⃣ Install Dependencies

```bash
npm install
```

---

# 💻 CLI Usage

## 📂 Organize Files

Automatically organize files in the current directory.

```powershell
npx tsx Code/organizer.ts
```

### Organize a Custom Folder

```powershell
npx tsx Code/organizer.ts "C:\Users\Avani Pandit\Downloads"
```

**Before**

```text
Downloads/
├── image.png
├── report.pdf
├── archive.zip
├── data.csv
```

**After**

```text
Downloads/
├── Images/
│   └── image.png
├── Documents/
│   ├── report.pdf
│   └── data.csv
└── Archives/
    └── archive.zip
```

---

## 📄 Generate a PDF from Terminal

Create or append text to a PDF instantly.

```powershell
npx tsx Code/make-pdf.ts "Hello from TypeScript!"
```

### Multiple Commands

```powershell
npx tsx Code/make-pdf.ts "Project Report"
npx tsx Code/make-pdf.ts "Generated using PDFKit."
npx tsx Code/make-pdf.ts "Node.js + TypeScript CLI Utility."
```

The PDF updates while preserving previous entries.

---

## 🧹 Reset PDF History

Start fresh anytime.

```powershell
Remove-Item history.txt
```

---

# 🔄 Workflow

```text
        📂 Input Directory
               │
               ▼
      organizer.ts scans files
               │
   ┌───────────┼────────────┐
   ▼           ▼            ▼
 Images     Documents     Archives
   │           │            │
   └───────────┴────────────┘
               │
               ▼
     Clean Organized Directory


        💻 Terminal Input
               │
               ▼
        make-pdf.ts
               │
               ▼
        history.txt updated
               │
               ▼
      📄 sample-doc.pdf created
```

---

# 📸 Example Terminal Session

### Organizing Files

```powershell
PS> npx tsx Code/organizer.ts

✔ Images folder created.
✔ Documents folder created.
✔ Archives folder created.

Moved:
image.png   → Images/
resume.pdf  → Documents/
files.zip   → Archives/

✨ Organization Complete.
```

### Generating PDF

```powershell
PS> npx tsx Code/make-pdf.ts "Weekly Report"

✔ Added line to history.txt
✔ PDF regenerated successfully.
```

---

# 📄 Sample Output

### Terminal

```text
Project Report

Generated using PDFKit.

Organized Files Successfully.

Total Files Moved : 24
```

### PDF

A clean document is generated containing every line stored in `history.txt`.

---

# 🧠 How It Works

## 📂 File Organizer Logic

```ts
Read Directory
      │
      ▼
Detect File Extension
      │
      ▼
Check Destination Folder
      │
      ▼
Create Folder (if missing)
      │
      ▼
Move File
```

---

## 📄 PDF Generator Logic

```ts
CLI Argument
      │
      ▼
Append to history.txt
      │
      ▼
Read Entire History
      │
      ▼
Generate sample-doc.pdf
```

---

# 📦 Scripts

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npx tsx Code/organizer.ts` | Organize current directory |
| `npx tsx Code/organizer.ts "<path>"` | Organize custom directory |
| `npx tsx Code/make-pdf.ts "<text>"` | Add text to PDF |
| `Remove-Item history.txt` | Reset PDF history |

---

# 🚀 Future Improvements

- [ ] Recursive folder organization.
- [ ] Drag & Drop folder support.
- [ ] Watch Mode (`chokidar`) for real-time organization.
- [ ] PDF themes and styling.
- [ ] File summary report in PDF.
- [ ] Support for DOCX, PPTX and Excel formatting.

---

# 🤝 Contributing

Contributions are welcome!

1. Fork this repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a Pull Request.

---

# 👩‍💻 Author

**Avani Pandit**

Frontend Developer • AI/ML Enthusiast • TypeScript & React Developer

[![GitHub](https://img.shields.io/badge/GitHub-avanipandit7-181717?style=for-the-badge&logo=github)](https://github.com/avanipandit7)

---

<div align="center">

### ⭐ If you found this project useful, consider giving it a Star!

Built with ❤️ using **Node.js + TypeScript + PDFKit**

</div>
