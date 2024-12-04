import { Injectable } from '@nestjs/common';
import { IFileProcessor } from './file_processor.interface';
import { createReadStream } from 'fs';
import { parse } from '@fast-csv/parse';

@Injectable()
export class CSVFileProcessor implements IFileProcessor {
  async process(file: Express.Multer.File) {
    return this.__csvToJSON(file);
  }

  private async __csvToJSON(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      const rows: Record<string, string | number>[] = [];
      createReadStream(file.path)
        .pipe(parse({ headers: true }))
        .on('error', (error) => reject(error))
        .on('data', (row) => rows.push(row))
        .on('end', () => resolve(JSON.stringify(rows)));
    });
  }
}
