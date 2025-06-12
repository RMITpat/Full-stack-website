import { IsNumber, IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class LecturerVoteDTO {
  @IsNumber()
  ranking: number;

  @IsNumber()
  lecturerId: number;
  
  @IsNumber()
  applicationId: number

  //dont check comment it can be null 
}

