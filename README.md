# ⚙️ File Organizer & PDF Generator — TypeScript Backend Utility

A backend-focused CLI utility built with **Node.js + TypeScript** that automates file organization and generates PDF documents directly from the terminal. This project showcases backend development concepts such as file system operations, CLI argument handling, persistent storage, and PDF generation using TypeScript.

> Designed as a **TypeScript backend project** with minimal setup and fast execution using `tsx`.

---

## 🚀 Backend Highlights

- 📂 **Automated File Organization** — Scans a directory and moves files into categorized folders using Node.js File System APIs.
- 📄 **CLI PDF Generator** — Generates and updates PDF documents from terminal input using **PDFKit**.
- 📝 **Persistent Data Storage** — Stores terminal history in a local text file and regenerates PDFs without losing previous entries.
- ⚡ **TypeScript Execution** — Runs TypeScript files directly using `tsx`, eliminating manual compilation during development.
- 🖥️ **Command-Line Interface** — Accepts optional directory paths and dynamic user input through CLI arguments.

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| **TypeScript** | Backend development with static typing |
| **Node.js** | Runtime environment |
| **FS Module** | File and directory management |
| **Path Module** | Cross-platform path handling |
| **PDFKit** | PDF generation |
| **TSX** | Execute TypeScript without compiling |

---

## 📁 Project Structure

```text
file-organizer/
│
├── Code/
│   ├── organizer.ts        # File organization logic
│   └── make-pdf.ts         # PDF generation logic
│
├── Images/                 # Organized image files
├── Documents/              # Organized documents
├── Archives/               # Organized archives
│
├── sample-doc.pdf          # Generated PDF output
├── history.txt             # Persistent CLI history
├── package.json
├── tsconfig.json
└── README.md
```

---

# ⚙️ Installation

### Prerequisites

- Node.js **v22+**
- npm

### Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/file-organizer.git
cd file-organizer
```

### Install Dependencies

```bash
npm install
```

---

# 💻 Running the Backend

## 1. Organize Files

Organizes supported file types in the current directory.

```powershell
npx tsx Code/organizer.ts
```

### Organize a Custom Directory

```powershell
npx tsx Code/organizer.ts "C:\Users\Avani Pandit\Downloads"
```

### Supported File Categories

| Folder | Extensions |
|--------|------------|
| **Images** | `.png`, `.jpg`, `.jpeg`, `.gif`, `.webp` |
| **Documents** | `.pdf`, `.csv`, `.txt`, `.docx` |
| **Archives** | `.zip`, `.rar`, `.7z` |

---

## 2. Generate a PDF from Terminal

Pass text as a CLI argument to append it to the PDF.

```powershell
npx tsx Code/make-pdf.ts "Backend report generated successfully."
```

### Example

```powershell
npx tsx Code/make-pdf.ts "Daily File Report"
npx tsx Code/make-pdf.ts "24 files organized."
npx tsx Code/make-pdf.ts "PDF generated using PDFKit."
```

The command:

- Updates `history.txt`
- Reads all stored entries
- Regenerates `sample-doc.pdf`

---

## 3. Reset Stored History

Delete the history file to create a fresh PDF.

```powershell
Remove-Item history.txt
```

---

# 🧠 Backend Workflow

## File Organizer

```text
Input Directory
      │
      ▼
Read Files (fs.readdir)
      │
      ▼
Identify Extension
      │
      ▼
Create Folder if Needed
      │
      ▼
Move File (fs.rename)
      │
      ▼
Organized Directory
```

## PDF Generator

```text
CLI Argument
      │
      ▼
Append to history.txt
      │
      ▼
Read Complete History
      │
      ▼
Generate sample-doc.pdf
```

---

# 🔍 Backend Concepts Demonstrated

### File System Operations

- Reading directory contents.
- Creating folders dynamically.
- Moving files between directories.
- Checking file existence.

### Command-Line Argument Parsing

Uses Node.js process arguments to accept user input.

```ts
const input = process.argv.slice(2).join(" ");
```

### Persistent Storage

Instead of overwriting content, the application appends data to `history.txt` before generating the PDF.

### PDF Generation

Uses **PDFKit** to create formatted PDF documents programmatically from stored text.

---

# 📦 Available Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npx tsx Code/organizer.ts` | Organize current directory |
| `npx tsx Code/organizer.ts "<path>"` | Organize a custom directory |
| `npx tsx Code/make-pdf.ts "<text>"` | Append text and regenerate PDF |
| `Remove-Item history.txt` | Reset stored history |

---

# 📈 Future Backend Enhancements

- Recursive folder scanning.
- Watch mode using `chokidar`.
- Configurable file categories via JSON.
- Logging with timestamps.
- Generate organization summary reports.
- Unit tests using Jest or Vitest.

---

# 🎯 Backend Skills Demonstrated

- TypeScript
- Node.js
- CLI Development
- File System (FS) Module
- Path Module
- PDF Generation with PDFKit
- Persistent File Handling
- Backend Utility Development

---

