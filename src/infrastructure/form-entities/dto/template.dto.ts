import { IsArray, IsIn, IsInt, IsNumber, IsObject, IsOptional, 
    IsPositive, IsString, MinLength 
} from 'class-validator';


export class TemplateDto {
    @IsString()
    name: string;


    @IsArray()
    fields: Record<string, any>[];

    @IsOptional()
    @IsArray()
    relations: Record<string, any>[]
  }