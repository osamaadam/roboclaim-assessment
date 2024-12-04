import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { JobLogEntity } from './entities/job_log.entity';
import { ProcessorService } from './processor.service';
import { CSVFileProcessor } from './processors/csv_processor.service';
import { ImageProcessorService } from './processors/image_processor.service';
import { PDFFileProcessor } from './processors/pdf_processor.service';
import { ProcessorFactoryService } from './processors/processor_factory.service';

@Module({
  imports: [TypeOrmModule.forFeature([JobLogEntity, FileEntity])],
  providers: [
    ProcessorService,
    Logger,
    ProcessorFactoryService,
    CSVFileProcessor,
    PDFFileProcessor,
    ImageProcessorService,
  ],
  exports: [ProcessorService, TypeOrmModule],
})
export class ProcessorModule {}
