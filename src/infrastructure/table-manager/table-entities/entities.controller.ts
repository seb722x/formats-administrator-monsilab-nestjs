import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TableService } from './entities.service';
import { getConnection } from 'typeorm';
import { TemplateService } from '../table-templates/template.service';


@Controller('tables')
export class EntitiesController {
  constructor(
    private readonly templatesServices: TemplateService,
    private readonly tableServices:TableService) {}


 

  @Post('create-table')
    async createEntityFromTemplate( @Body() data: Record<string, any>) {
        console.log('Datos recibidos:', data);
        return await this.tableServices.createTableFromTemplate( data);
  }

  @Post('/create-with-relations')
  async createEntityTableWithRelations(@Body() data: Record<string, any>): Promise<void> {
   return await this.tableServices.createTableWithRelations(data);
  }

  @Get(':name')
  async getEntityByName(@Param('name') name: string) {
    return await this.tableServices.findTableByName(name);
  }

  @Delete(':tableName')
  async deleteTable(@Param('tableName') tableName: string): Promise<void> {
     this.tableServices.deleteTable(tableName);

  }

  //@Post('createentityrelations/:templateName')
  //  createEntityWithRelations(@Param('templateName') templateName: string, @Body() data: Record<string, any>) {
  //      console.log('Datos recibidos:', data);
  //      return this.templatesServices.createEntityWithRelations(templateName, data);
  //}

}


/*
@Post()
async createCustomEntity(@Body() fields: Record<string, any>): Promise<CustomEntity> {
  return await this.customService.createCustomEntity(fields);
}

@Get()
async getCustomEntities(): Promise<CustomEntity[]> {
  return await this.customService.getCustomEntities();
}

@Get("test")
testing(){
  return "all is conected"
}

*///

