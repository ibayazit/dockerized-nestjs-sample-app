import { Countries } from '@prisma/client-main';
import { Transform } from 'class-transformer';
import { IsEnum, IsISO8601, IsString } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  name: string;

  @IsISO8601({ strict: true })
  @Transform(({ value }) => new Date(value).toISOString())
  birthDate: Date;

  @IsEnum(Countries)
  country: Countries;
}
