import { IsEnum, IsNotEmpty } from "class-validator";

import { IsString } from "class-validator";
import { ApplicationType } from "../entity/Application";

export class ApplicationDTO {
  

  @IsEnum(ApplicationType)
  @IsNotEmpty()
  type: ApplicationType;

  @IsString()
  @IsNotEmpty()
  previousRoles: string;



  @IsString()
  @IsNotEmpty()
  availability: string;

  @IsString()
  @IsNotEmpty()
  skills: string;

  @IsString()
  @IsNotEmpty()
  credentials: string;


}
