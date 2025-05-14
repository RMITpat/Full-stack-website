import { AppDataSource }  from "../data-source";
import { CourseController } from "./CourseController";
//  import { Course }         from "../entity/Course";
//  import { App_Credential } from "../entity/App_Credential";
//  import { Applicant }      from "../entity/Applicant";
//  import { Application }    from "../entity/Application";
//  import { Lecturer }       from "../entity/Lecturer";
//  import { Vote}            from "../entity/Vote";


async function populate() {
  await AppDataSource.initialize();

//  const CourseRepository         = AppDataSource.getRepository(Course)
//  const App_CredentialRepository = AppDataSource.getRepository(App_Credential)
//  const ApplicationRepository    = AppDataSource.getRepository(Application)
//  const ApplicantRepository      = AppDataSource.getRepository(Applicant) 
//  const LecturerRepository       = AppDataSource.getRepository(Lecturer)
//  const VoteRepository           = AppDataSource.getRepository(Vote)

  const courseController = new CourseController();

  courseController.all
  


}
