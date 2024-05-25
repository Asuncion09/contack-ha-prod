import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateContactDto {
  @IsString()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  phone: string;

  @IsString()
  @IsOptional()
  nickname: string;

  @IsBoolean()
  @IsOptional()
  isFavorite: boolean;

  @IsString()
  @IsOptional()
  userEmail: string;
}
