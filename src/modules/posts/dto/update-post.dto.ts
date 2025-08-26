import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class UpdatePostDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  title?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  content?: string;
}
