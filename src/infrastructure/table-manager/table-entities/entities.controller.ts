import { BadRequestException, Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TableService } from './entities.service';
import { getConnection } from 'typeorm';
import { TemplateService } from '../table-templates/template.service';
import { InsertionDto } from './dtos/insertions.dto';


@Controller('tables')
export class EntitiesController {
  constructor(
    private readonly templatesServices: TemplateService,
    private readonly tableServices:TableService,
  ) {}


  @Post('create-table')
    async createEntityFromTemplate( @Body() data: Record<string, any>) {
        console.log('Datos recibidos:', data);
        return await this.tableServices.createTableFromTemplate( data);
  }

  @Get(':name')
  async getEntityByName(@Param('name') name: string) {
    return await this.tableServices.findTableByName(name);
  }

  @Delete(':tableName')
  async deleteTable(@Param('tableName') tableName: string): Promise<void> {
     this.tableServices.deleteTable(tableName);
  }


  @Get('entity/:tableName')
    async getOrmEntity(@Param('tableName') tableName:string){
      this.tableServices.createEntityORM(tableName);
    }

  @Post('/insert-data')
    async insertDataIntoTable( @Body() data: any): Promise<void> {
      await this.tableServices.insertDataIntoTable( data);
    }
    






}


/** 
@Post('/create-with-relations')
  async createEntityTableWithRelations(@Body() data: Record<string, any>): Promise<void> {
   return await this.tableServices.createTableWithRelations(data);
  }


//  @Post('insert-data')
//  async insertData(@Body() data: Record<string, any>) {
//    const { tableName, insertions } = data;
//
//    // Obtener las columnas de la tabla desde la plantilla
//    const tableColumns = await this.tableServices.getTableColumns(tableName);
//
//    // Mapear los datos de inserción según las columnas de la tabla
//    const mappedInsertions = insertions.map((insertion) => {
//      const mappedInsertion: Record<string, any> = {};
//
//      for (const column of tableColumns) {
//        const columnName = column.name;
//        const columnType = column.type;
//
//        // Verificar si el campo existe en los datos de inserción
//        if (insertion.hasOwnProperty(columnName)) {
//          const value = insertion[columnName];
//
//          // Validar y convertir el valor según el tipo de columna definido en la plantilla
//          switch (columnType) {
//            case 'text':
//              mappedInsertion[columnName] = String(value);
//              break;
//            case 'integer':
//              mappedInsertion[columnName] = parseInt(value, 10);
//              break;
//            // Agregar más casos según los tipos de columna necesarios
//            default:
//              // Manejar el caso de tipo de columna no compatible
//              throw new BadRequestException(`Tipo de columna no compatible: ${columnType}`);
//          }
//        } else {
//          // Manejar el caso en el que el campo no está presente en los datos de inserción
//          throw new BadRequestException(`Falta el campo requerido: ${columnName}`);
//        }
//      }
//
//      return mappedInsertion;
//    });
//
//    // Insertar los datos en la tabla
//    await this.tableServices.insertDataIntoTable(tableName, mappedInsertions);
//  }


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
*/
