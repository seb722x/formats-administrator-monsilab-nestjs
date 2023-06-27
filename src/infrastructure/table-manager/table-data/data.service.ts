import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  Connection, Repository,  Table,  TableColumn, TableForeignKey, TableUnique,   } from 'typeorm';


import { DataTable } from './entities/data.entity';
import { InsertionDto } from '../table-entities/dtos/create-insertions.dto';


@Injectable()
export class DataService {

  
  constructor(
    @InjectRepository(DataTable)
    private readonly entityRepository: Repository<DataTable>,
   
    
  ) {}

  async insertDataIntoTable( data: any): Promise<any> {
    const {insertions,tableName} = data
    const tableExists = await this.checkTableExists(tableName);
    console.log(tableName,insertions,tableExists)
    if (!tableExists) {
      throw new NotFoundException(`La tabla "${tableName}" no existe.`);
    }
  
    try {
       await this.entityRepository.createQueryBuilder().insert().into(tableName).values(insertions).execute();
      
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Error al insertar los datos en la tabla.', error);
    }
  }

  






  







  private async checkTableExists(tableName: string): Promise<boolean> {
    const tableExistsQuery = `SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = '${tableName}')`;
    const result = await this.entityRepository.query(tableExistsQuery);
    return result[0].exists;
  }

}


