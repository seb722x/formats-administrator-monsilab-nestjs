import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplateService } from './form-templates/template.service';
import { CustomTable } from './form-entities/table-administrator/custom-table.entity';
import { Template } from './form-templates/entities/templates.entity';
import { TemplatesController } from './form-templates/templates.controller';
import { EntitiesController } from './form-entities/entities.controller';
import { TableService } from './form-entities/entities.service';
import { ErrorService } from '../errors/erros.service';


@Module({
  imports: [TypeOrmModule.forFeature([CustomTable,Template])],
  providers: [TemplateService,TableService, ErrorService],
  controllers: [TemplatesController,EntitiesController],
})
export class FormEntitiesModule {}


//