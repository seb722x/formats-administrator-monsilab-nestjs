import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, FindOneOptions, Repository, Table, TableColumn, TableForeignKey, TableUnique, getConnection  } from 'typeorm';


import { CustomEntity } from './entities/custom-template.entity';
import { Template } from './entities/templates.entity';
import { TemplateDto } from './dto/template.dto';

@Injectable()
export class TemplatesServices {

  constructor(
    @InjectRepository(CustomEntity)
    private readonly customRepository: Repository<CustomEntity>,
    @InjectRepository(Template)
    private readonly templateRepository: Repository<Template>,

  ) {}


 
  async createTemplate(templateDto: TemplateDto): Promise<Template> {
    const template = this.templateRepository.create(templateDto);
    
    if (template.relations && template.relations.length > 0) {
      for (const relation of template.relations) {
        const tableName = relation.tableName;
        const columnName = relation.columnName;
          }
     }
     return await this.templateRepository.save(template);
    }

  async getTemplateByName(name: string): Promise<Template> {
    const options: FindOneOptions<Template> = {
      where: { name },
    };
    const template = await this.templateRepository.findOne(options);
    if (!template) {
      throw new NotFoundException('Template not found');
    }
    return template;
  }

  async createEntityFromTemplate(templateName: string, data: Record<string, any>): Promise<void> {
    const template = await this.getTemplateByName(templateName);
    const tableName = data.tableName;
  
    const queryRunner = this.customRepository.manager.connection.createQueryRunner();
  
    // Crear la tabla principal
    const mainTable = new Table({
      name: tableName,
      columns: template.fields.map((field: any) => ({
        name: field.name,
        type: field.type,
      })),
    });
  
    // Verificar si hay relaciones definidas en el template
    if (template.relations && template.relations.length > 0) {
      // Iterar sobre cada relación y crear las columnas de relación en la tabla principal
      for (const relation of template.relations) {
        const referencedTable = relation.options.referencedTable;
        const referencedColumn = relation.options.referencedColumn;
        const actualColumn = relation.options.actualColumn;
  
        // Crear columna de relación
        const relationColumn = new TableColumn({
          name: actualColumn,
          type: 'integer', // Ajusta el tipo de dato según corresponda
        });
  
        // Agregar la columna de relación a la tabla principal
        mainTable.addColumn(relationColumn);
  
        // Establecer la relación con la tabla referenciada
        const foreignKey = new TableForeignKey({
          columnNames: [actualColumn],
          referencedTableName: referencedTable,
          referencedColumnNames: [referencedColumn],
        });
  
        // Agregar la clave foránea a la tabla principal
        mainTable.addForeignKey(foreignKey);
      }
    }
  
    // Crear la tabla principal en la base de datos
    await queryRunner.createTable(mainTable);
  
    // Agregar restricciones únicas a las columnas de relación
    if (template.relations && template.relations.length > 0) {
      for (const relation of template.relations) {
        const actualColumn = relation.options.actualColumn;
  
        // Agregar restricción única a la columna de relación
        const uniqueConstraint = new TableUnique({
          columnNames: [actualColumn],
        });
  
        // Agregar la restricción única a la tabla principal
        await queryRunner.createUniqueConstraint(tableName, uniqueConstraint);
      }
    }
  
    // Finalizar la transacción y liberar los recursos
    await queryRunner.release();
  }

  // ...
}









//  async createEntityFromTemplate(templateName: string, data: Record<string, any>): Promise<void> {
//    const template = await this.getTemplateByName(templateName);
//    const tableName = data.tableName;
//    console.log(tableName)
//    const queryRunner = this.customRepository.manager.connection.createQueryRunner();
//    const table = new Table({
//      name: tableName,
//      columns: template.fields.map((field) => ({
//        name: field.name,
//        type: field.type,
//      })),
//      
//    })
//    console.log(table)
//    await queryRunner.createTable(table);
//    console.log(table);
//  }
//
//  async createEntityWithRelations(templateName: string, data: Record<string, any>): Promise<void> {
//    const template = await this.getTemplateByName(templateName);
//    const tableName = data.tableName;
//    const queryRunner = this.customRepository.manager.connection.createQueryRunner();
//    const table = new Table({
//      name: tableName,
//      columns: template.fields.map((field) => ({
//        name: field.name,
//        type: field.type,
//      })),
//    });
//    if (template.relations && template.relations.length > 0) {
//      for (const relation of template.relations) {
//        const columnName = relation.columnName;
//        const columnType = relation.columnType;
//
//        table.columns.push({
//          name: columnName,
//          type: columnType,
//          isNullable: false,
//          '@instanceof': undefined,
//          isGenerated: false,
//          isPrimary: false,
//          isUnique: false,
//          isArray: false,
//          length: '',
//          zerofill: false,
//          unsigned: false,
//          clone: function (): TableColumn {
//            throw new Error('Function not implemented.');
//          }
//        });
//      }
//    }
//
//    // Crear la tabla en la base de datos
//    await queryRunner.createTable(table);
//    // Crear las relaciones dinámicamente
//    if (template.relations && template.relations.length > 0) {
//      for (const relation of template.relations) {
//        const relationType = relation.relationType;
//        const relationName = relation.relationName;
//        const referencedTableName = relation.referencedTableName;
//        const referencedColumnName = relation.referencedColumnName;
//
//        if (relationType === 'ManyToOne' || relationType === 'ManyToMany') {
//          const foreignKey = new TableForeignKey({
//            columnNames: [relationName],
//            referencedColumnNames: [referencedColumnName],
//            referencedTableName: referencedTableName,
//          });
//
//          table.foreignKeys.push(foreignKey);
//        }
//      }
//    }
//    // Confirmar los cambios y cerrar el QueryRunner
//    await queryRunner.commitTransaction();
//    await queryRunner.release();
  
  




//}