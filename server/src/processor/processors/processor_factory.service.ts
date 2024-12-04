import { Injectable } from '@nestjs/common';
import { CSVFileProcessor } from './csv_processor.service';
import { IFileProcessor } from './file_processor.interface';
import { ImageProcessorService } from './image_processor.service';
import { PDFFileProcessor } from './pdf_processor.service';
import { XLSXProcessorService } from './xlsx_processor.service';

@Injectable()
export class ProcessorFactoryService {
  constructor(
    private readonly csvProcessor: CSVFileProcessor,
    private readonly pdfProcessor: PDFFileProcessor,
    private readonly imageProcessor: ImageProcessorService,
    private readonly xlsxProcessor: XLSXProcessorService,
  ) {}
  createProcessor(file: Express.Multer.File): IFileProcessor {
    switch (file.mimetype) {
      case 'text/csv':
        return this.csvProcessor;
      case 'application/pdf':
        return this.pdfProcessor;
      case 'image/jpeg':
      case 'image/png':
        return this.imageProcessor;
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      case 'application/vnd.ms-excel':
        return this.xlsxProcessor;
      default:
        throw new Error('Unsupported file type');
    }
  }
}
