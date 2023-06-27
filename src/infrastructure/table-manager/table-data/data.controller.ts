import {  Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { DataService } from './data.service';
import { InsertionDto } from './dto/data.dto';




@Controller('data')
export class DataController {
  constructor(

    private readonly dataService:DataService,

  ) {}
  

  @Post('insert')
  async insertData(@Body() data: any){
   return await this.dataService.insertDataIntoTable(data)
  }
    
}

