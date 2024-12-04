import { Injectable } from '@nestjs/common';
import { IFileProcessor } from './file_processor.interface';
import { readFileSync } from 'fs';
import XLSX from 'xlsx';

@Injectable()
export class XLSXProcessorService implements IFileProcessor {
  async process(file: Express.Multer.File): Promise<string> {
    return this.__xlsxToJSON(file);
  }

  private async __xlsxToJSON(file: Express.Multer.File): Promise<string> {
    const buf = readFileSync(file.path);
    const { Sheets: sheets } = XLSX.read(buf, { type: 'buffer' });
    const jsonArr: string[] = [];

    for (const sheet in sheets) {
      const jsonData = XLSX.utils.sheet_to_json(sheets[sheet]);
      jsonArr.push(JSON.stringify(jsonData));
    }

    return jsonArr.join('\n');
  }
}
