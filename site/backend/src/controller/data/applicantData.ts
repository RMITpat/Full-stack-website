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

  first_names.forEach((firstName, index) => {
    const email = `${firstName}${last_names[index]}@gmail.com`;
      const combined = (firstName + last_names[index]);
      const hexPrefix = toHex(combined).slice(0, 5);
      const password = `${hexPrefix}@${firstName[0].toUpperCase()}${last_names[index][0].toLowerCase()}`;
      const lastName = last_names[index]
      applicants.push({
        firstName,
        lastName,
        email,
        password,
      });
  });
  
  return applicants;
}
