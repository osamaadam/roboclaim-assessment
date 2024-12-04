import { Logger, Module } from '@nestjs/common';
import { ProcessorService } from './processor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobLogEntity } from './entities/job_log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobLogEntity])],
  providers: [ProcessorService, Logger],
  exports: [ProcessorService, TypeOrmModule],
})
export class ProcessorModule {}
