# 📂 File Organizer & PDF Generator (TypeScript Backend)

A lightweight, powerful Node.js & TypeScript backend utility built to organize loose directory files dynamically and generate formatted PDFs right from your terminal.

---

## 🚀 Key Features

* 📁 **Smart File Sorting:** Scans and organizes files (`.png`, `.pdf`, `.zip`, `.csv`) into designated subfolders.
* 📄 **Terminal-to-PDF Engine:** Dynamically renders text entries directly into a structured PDF document via CLI arguments.
* 📜 **Persistent History Tracking:** Appends new terminal input to a running log without overwriting previous entries.
* ⚡ **Fast Execution:** Powered by `tsx` for real-time TypeScript execution without manual compilation steps.

---

## 🛠️ Tech Stack

* **Language:** TypeScript
* **Runtime:** Node.js (v22+)
* **PDF Engine:** PDFKit
* **Execution:** `tsx` (TypeScript Execute)

---

## 🏁 Getting Started

### 1. Prerequisites
Ensure you have Node.js installed on your machine.

### 2. Installation
Clone the repository and install the project dependencies:

\`\`\`bash
git clone https://github.com/YOUR_USERNAME/file-organizer.git
cd file-organizer
npm install
\`\`\`

---

## 💻 Usage & CLI Commands

### 📂 1. Run the File Organizer
Sort loose files in your project directory automatically:

\`\`\`powershell
npx tsx Code/organizer.ts
\`\`\`

> **Tip:** You can also pass a custom directory path:
> \`\`\`powershell
> npx tsx Code/organizer.ts "C:\Users\Avani Pandit\Downloads"
> \`\`\`

---

### 📄 2. Generate PDF Content from Terminal
Append new lines directly to `sample-doc.pdf`:

\`\`\`powershell
npx tsx Code/make-pdf.ts "Your dynamic text here"
\`\`\`

**Example Workflow:**
\`\`\`powershell
npx tsx Code/make-pdf.ts "File organizer report"
npx tsx Code/make-pdf.ts "Generated using PDFKit & TypeScript"
\`\`\`

---

### 🧹 3. Reset PDF History
Clear stored lines and start a fresh PDF document:

\`\`\`powershell
Remove-Item history.txt
\`\`\`

---

## 📁 Directory Structure

\`\`\`text
file-organizer/
├── Code/
│   ├── organizer.ts    # File sorting logic
│   └── make-pdf.ts     # Terminal PDF renderer
├── Documents/          # Sorted PDF and CSV documents
├── Images/             # Sorted image files
├── Archives/           # Sorted zip/archive files
├── sample-doc.pdf      # Output PDF document
├── history.txt         # Terminal input log
├── package.json
└── tsconfig.json
\`\`\`

---

## 🛡️ License
Distributed under the MIT License. See `LICENSE` for more information.
