import * as fs from 'node:fs';

const inputData = process.argv[2]; // e.g. "Item, 10, 500"
const csvFile = 'data.csv';

// Add headers if file doesn't exist
if (!fs.existsSync(csvFile)) {
  fs.writeFileSync(csvFile, 'Name, Quantity, Price\n');
}

if (inputData) {
  fs.appendFileSync(csvFile, inputData + '\n');
  console.log(`Added row to ${csvFile}: "${inputData}"`);
}