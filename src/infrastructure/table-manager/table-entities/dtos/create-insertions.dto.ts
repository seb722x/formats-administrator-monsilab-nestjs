import { IsArray, IsObject, IsString, ValidateNested } from 'class-validator';

export class InsertionDto {
  @IsString()
  tableName: string;

  @IsArray()
  @ValidateNested()
  @IsObject({ each: true })
  insertions: Record<string, any>[];
}