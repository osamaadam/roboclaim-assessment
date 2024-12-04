import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobLogEntity } from './entities/job_log.entity';
import { ProcessorService } from './processor.service';
import { CSVFileProcessor } from './processors/csv_processor.service';
import { PDFFileProcessor } from './processors/pdf_process.service';
import { ProcessorFactoryService } from './processors/processor_factory.service';
import { ImageProcessorService } from './processors/image_processor.service';

@Module({
  imports: [TypeOrmModule.forFeature([JobLogEntity])],
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
