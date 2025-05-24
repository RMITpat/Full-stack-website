type Lecturer = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  courses_assigned_to: string[];
  votes: any[];
};

function toHex(str: string): string {
  return Array.from(str)
    .map(char => char.charCodeAt(0).toString(6))
    .join("");
}

export default function getSampleLecturers(): Lecturer[] {
  const first_names: string[] = [
    "Alice", "Bob", "Charlie", "Diana", "Ethan", "Fiona", "George", "Hannah",
    "Ian", "Julia", "Kevin", "Laura", "Mike", "Nina", "Oscar", "Paula",
    "Quinn", "Rachel", "Sam", "Tina"
  ];

  const last_names: string[] = [
    "Andrews", "Baker", "Carter", "Dawson", "Evans", "Foster", "Griffin", "Hayes",
    "Irwin", "Jenkins", "Keller", "Lambert", "Mason", "Norris", "Owens", "Parker",
    "Quincy", "Reed", "Scott", "Turner"
  ];

  const lecturers: Lecturer[] = [];

  for (let i = 0; i < 20; i++) {
    const firstName = first_names[i % first_names.length];
    const lastName = last_names[i % last_names.length];
    const email = `${firstName}${lastName}@university.edu`.toLowerCase();
    const combined = firstName + lastName;
    const hexPrefix = toHex(combined).slice(0, 5);
    const password = `${hexPrefix}@${firstName[0].toUpperCase()}${lastName[0].toLowerCase()}`;

    lecturers.push({
      firstName,
      lastName,
      email,
      password,
      courses_assigned_to: ["COSC1048", "COSC4830", "COSC4839"],
      votes: [],
    });
  }

  return lecturers;
}

