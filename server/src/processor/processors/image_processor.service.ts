import { Injectable } from '@nestjs/common';
import { IFileProcessor } from './file_processor.interface';

@Injectable()
export class ImageProcessorService implements IFileProcessor {
  async process(file: Express.Multer.File): Promise<string> {
    return 'yo';
  }
}
