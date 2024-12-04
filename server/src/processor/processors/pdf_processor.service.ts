import { Injectable } from '@nestjs/common';
import PDFParser from 'pdf2json';
import { IFileProcessor } from './file_processor.interface';

@Injectable()
export class PDFFileProcessor implements IFileProcessor {
  constructor() {}
  async process(file: Express.Multer.File): Promise<string> {
    return this.__extractText(file);
  }

  private __extractText(file: Express.Multer.File): Promise<string> {
    const pdfParser = new PDFParser(1, true);

    return new Promise((resolve, reject) => {
      pdfParser.on('pdfParser_dataReady', () => {
        const textContent = pdfParser.getRawTextContent();
        resolve(textContent);
      });

      pdfParser.on('pdfParser_dataError', (error) => {
        reject(error);
      });

      pdfParser.loadPDF(file.path);
    });
  }
}
