import { Injectable } from '@nestjs/common';
import { IFileProcessor } from './file_processor.interface';

@Injectable()
export class CSVFileProcessor implements IFileProcessor {
  async process(file: Express.Multer.File) {
    console.log(file);
  }
}
