import { Languages } from '@prisma/client-main';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsString()
  authorId: string;

  @IsNumber()
  price: number;

  @IsString()
  ISBN: string;

  @IsEnum(Languages)
  language: Languages;

  @IsNumber()
  numberOfPage: number;

  @IsString()
  publisher: string;
}
