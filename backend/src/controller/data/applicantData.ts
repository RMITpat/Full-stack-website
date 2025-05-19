type Applicant = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

function toHex(str: string): string {
  return Array.from(str)
    .map(char => char.charCodeAt(0).toString(6))
    .join("");
}

export default function getSampleApplicants(): Applicant[] {
  const first_names: string[] = [
    "Matt", "Liam", "Olivia", "Noah", "Ava", "Elijah", "Sophia", "James", "Isabella", "William",
    "Mia", "Benjamin", "Charlotte", "Lucas", "Amelia", "Henry", "Harper", "Alexander", "Evelyn",
    "Michael", "Abigail", "Daniel", "Emily", "Matthew", "Ella", "Sebastian", "Avery", "Jack",
    "Scarlett", "Owen", "Grace", "Jackson",
  ];

  const last_names: string[] = [
    "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez",
    "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore",
    "Jackson", "Martin", "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark",
    "Ramirez", "Lewis", "Robinson", "Walker", "Young",
  ];

  const applicants: Applicant[] = [];

  for (const firstName of first_names) {
    for (const lastName of last_names) {
      const email = `${firstName}${lastName}@gmail.com`;
      const combined = (firstName + lastName);
      const hexPrefix = toHex(combined).slice(0, 5);
      const password = `${hexPrefix}@${firstName[0].toUpperCase()}${lastName[0].toLowerCase()}`;

      applicants.push({
        firstName,
        lastName,
        email,
        password,
      });
    }
  }

  return applicants;
}
