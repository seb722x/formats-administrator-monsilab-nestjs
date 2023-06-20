import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CustomEntity } from './entities/custom-template.entity';
import { TemplatesServices } from './templates.service';
import { TemplateDto } from './dto/template.dto';


@Controller('custom')
export class FormEntitiesController {
  constructor(private readonly templatesServices: TemplatesServices) {}


  @Post('createtemplate')   //crear el template
    createTemplate(@Body() templateDto: TemplateDto) {
      return this.templatesServices.createTemplate(templateDto);
  }
  

  @Get('template/:name')
    getTemplateByName(@Param('name') name: string) {
      return this.templatesServices.getTemplateByName(name);
  }

  @Post('createentity/:templateName')
    createEntityFromTemplate(@Param('templateName') templateName: string, @Body() data: Record<string, any>) {
        console.log('Datos recibidos:', data);
        return this.templatesServices.createEntityFromTemplate(templateName, data);
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

