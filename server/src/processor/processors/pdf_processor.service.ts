import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import PDFParser from 'pdf2json';
import { Repository } from 'typeorm';
import { FileEntity } from '../entities/file.entity';
import { IFileProcessor } from './file_processor.interface';
import { basename } from 'path';

@Injectable()
export class PDFFileProcessor implements IFileProcessor {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {}
  async process(file: Express.Multer.File): Promise<void> {
    const content = await this.__extractText(file);

    await this.fileRepository.update(
      {
        nameOnDisk: basename(file.path),
      },
      { content },
    );
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
