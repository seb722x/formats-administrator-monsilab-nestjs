import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorService } from '../errors/erros.service';
import { TableService } from './table-entities/entities.service';
import { EntitiesController } from './table-entities/entities.controller';
import { TemplatesController } from './table-templates/templates.controller';
import { Template } from './table-templates/entities/templates.entity';
import { CustomTable } from './table-entities/entities/custom-table.entity';
import { TemplateService } from './table-templates/templates.service';
import { DataService } from './table-data/data.service';
import { DataController } from './table-data/data.controller';
import { DataTable } from './table-data/entities/data.entity';
import { GenericTable } from './table-data/entities/generic.entity';



@Module({
  imports: [TypeOrmModule.forFeature([CustomTable,Template, DataTable,GenericTable])],
  providers: [TemplateService,TableService, DataService, ErrorService],
  controllers: [TemplatesController,EntitiesController, DataController],
})
export class FormEntitiesModule {}


//