import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplatesServices } from './templates.service';
import { FormEntitiesController } from './templates.controller';
import { CustomEntity } from './entities/custom-template.entity';
import { Template } from './entities/templates.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomEntity,Template])],
  providers: [TemplatesServices],
  controllers: [FormEntitiesController],
})
export class FormEntitiesModule {}


//