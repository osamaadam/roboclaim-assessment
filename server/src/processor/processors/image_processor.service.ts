import { Injectable } from '@nestjs/common';
import { IFileProcessor } from './file_processor.interface';

@Injectable()
export class ImageProcessorService implements IFileProcessor {
  async process(file: Express.Multer.File): Promise<string> {
    throw new Error('Image processing not implemented');
  }
}
