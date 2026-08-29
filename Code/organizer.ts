import * as fs from 'node:fs';
import * as path from 'node:path';

// Define explicit type mapping for file extensions to category folders
const FOLDER_RULES: Record<string, string> = {
  // Images
  '.png': 'Images',
  '.jpg': 'Images',
  '.jpeg': 'Images',
  '.gif': 'Images',
  // Documents
  '.pdf': 'Documents',
  '.docx': 'Documents',
  '.txt': 'Documents',
  '.csv': 'Documents',
  // Archives
  '.zip': 'Archives',
  '.tar': 'Archives',
  '.gz': 'Archives',
  // Code & Web
  '.ts': 'Code',
  '.js': 'Code',
  '.html': 'Code',
  '.json': 'Code',
};

function organizeFolder(targetDir: string = '.'): void {
  const absolutePath = path.resolve(targetDir);
  console.log(`Cleaning up directory: ${absolutePath}\n`);

  try {
    const items: string[] = fs.readdirSync(absolutePath);

    for (const item of items) {
      const itemPath = path.join(absolutePath, item);

      // Skip directories (only organize files)
      if (fs.statSync(itemPath).isDirectory()) {
        continue;
      }

      // Extract file extension in lowercase
      const ext = path.extname(item).toLowerCase();
      const folderName = FOLDER_RULES[ext] || 'Others';

      // Path for the target category directory
      const destinationDir = path.join(absolutePath, folderName);

      // Create destination directory if it doesn't exist
      if (!fs.existsSync(destinationDir)) {
        fs.mkdirSync(destinationDir, { recursive: true });
      }

      // Move file into organized folder
      const destinationPath = path.join(destinationDir, item);
      fs.renameSync(itemPath, destinationPath);
      console.log(`Moved: ${item} -> ${folderName}/`);
    }

    console.log('\nCleanup complete!');
  } catch (error) {
    console.error('Error organizing directory:', error);
  }
}

// Accept target directory from CLI arguments or default to current directory
const targetFolder = process.argv[2] || '.';
organizeFolder(targetFolder);