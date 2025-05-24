import { LecturerController } from "../LecturerController";
import getSampleLecturers from "./lecturerData";

export async function runPopulateLecturers(lecturerController: LecturerController) {
  const sampleLecturers = getSampleLecturers();

  for (const lecturer of sampleLecturers) {
    await lecturerController.save(
      { body: lecturer } as any,
      { status: () => ({ json: () => {} }) } as any
    );
  }

  console.log("Lecturers populated");
}

