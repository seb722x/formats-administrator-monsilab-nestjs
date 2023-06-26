import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorService } from '../errors/erros.service';
import { TableService } from './table-entities/entities.service';
import { EntitiesController } from './table-entities/entities.controller';
import { TemplatesController } from './table-templates/templates.controller';
import { Template } from './table-templates/entities/templates.entity';
import { CustomTable } from './table-entities/entities/custom-table.entity';
import { TemplateService } from './table-templates/template.service';


@Module({
  imports: [TypeOrmModule.forFeature([CustomTable,Template])],
  providers: [TemplateService,TableService, ErrorService],
  controllers: [TemplatesController,EntitiesController],
})
export class FormEntitiesModule {}


//