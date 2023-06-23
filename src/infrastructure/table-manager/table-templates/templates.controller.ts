import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { TemplateService } from './template.service';
import { TemplateDto } from './dto/create-temp.dto';
import { UpdateTemplateDto } from './dto/update-temp.dto';


@Controller('templates')
export class TemplatesController {
  constructor(private readonly templateService: TemplateService) {}


  @Post('createtemplate')   //crear el template
    createTemplate(@Body() templateDto: TemplateDto) {
      return this.templateService.createTemplate(templateDto);
  }
  

  @Get(':name')
    getTemplateByName(@Param('name') name: string) {
      return this.templateService.findTemplateByName(name);
  }

  
  @Patch(':name')
  update(
    @Param('name' ) name: string, 
    @Body() updateTemplateDto: UpdateTemplateDto
  ) {
    return this.templateService.updateTemplate( name, updateTemplateDto );
  }


  @Delete(':name')
  remove(@Param('name',  ) name: string) {
    return this.templateService.removeTemplate( name );
  }

};


