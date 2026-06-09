import fs from 'fs';
import { parse } from 'csv-parse/sync';

export interface CsvRecord {
  [key: string]: string;
}

export function readCsv(filePath: string): CsvRecord[] {
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  return parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    delimiter: ';',  //add if your csv file uses a different delimiter, e.g., comma (',') or tab ('\t')
  });
}