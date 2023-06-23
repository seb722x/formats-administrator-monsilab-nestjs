import { IsArray, IsObject, IsString, ValidateNested } from 'class-validator';

export class InsertionDto {
  @IsString()
  table_name: string;

  @IsArray()
  @ValidateNested()
  @IsObject({ each: true })
  insertions: Record<string, any>[];
}