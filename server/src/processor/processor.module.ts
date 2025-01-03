import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileModule } from 'src/file/file.module';
import { JobLogEntity } from './entities/job_log.entity';
import { ProcessorService } from './processor.service';
import { CSVFileProcessor } from './processors/csv_processor.service';
import { ImageProcessorService } from './processors/image_processor.service';
import { PDFFileProcessor } from './processors/pdf_processor.service';
import { ProcessorFactoryService } from './processors/processor_factory.service';
import { XLSXProcessorService } from './processors/xlsx_processor.service';

@Module({
  imports: [TypeOrmModule.forFeature([JobLogEntity]), FileModule],
  providers: [
    ProcessorService,
    Logger,
    ProcessorFactoryService,
    CSVFileProcessor,
    PDFFileProcessor,
    ImageProcessorService,
    XLSXProcessorService,
  ],
  exports: [ProcessorService, TypeOrmModule],
})
export class ProcessorModule {}
