import { IsEmail, IsNotEmpty, Length } from "class-validator";

import { IsString } from "class-validator";

export class ApplicantSignUpDTO {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;
}
