import { IsNotEmpty, IsOptional, IsString, Max, MaxLength, MinLength } from "class-validator";

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

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  author?: string;
}
