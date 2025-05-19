// +======================================================================+
// | _   _     _                _           _         __ _ _        _     |
// || |_| |__ (_)___  __      _| |__   ___ | | ___   / _(_) | ___  (_)___ |
// || __| '_ \| / __| \ \ /\ / / '_ \ / _ \| |/ _ \ | |_| | |/ _ \ | / __||
// || |_| | | | \__ \  \ V  V /| | | | (_) | |  __/ |  _| | |  __/ | \__ \|
// | \__|_| |_|_|___/   \_/\_/ |_| |_|\___/|_|\___| |_| |_|_|\___| |_|___/|
// |   / \  |_ _|                                                         |
// |  / _ \  | |                                                          |
// | / ___ \ | |                                                          |
// |/_/   \_\___|                                                         |
// +======================================================================+

//https://chatgpt.com/share/67f865a9-d5d4-8005-932f-a0986a8d8eb9
// you'll see some other stuff in that chat history like the
// computeApplication.ts

import { User } from "@/interfaces/Types";

export default function InsertUsers() {
  const first_names: string[] = [
    "Matt",
    "Liam",
    "Olivia",
    "Noah",
    "Ava",
    "Elijah",
    "Sophia",
    "James",
    "Isabella",
    "William",
    "Mia",
    "Benjamin",
    "Charlotte",
    "Lucas",
    "Amelia",
    "Henry",
    "Harper",
    "Alexander",
    "Evelyn",
    "Michael",
    "Abigail",
    "Daniel",
    "Emily",
    "Matthew",
    "Ella",
    "Sebastian",
    "Avery",
    "Jack",
    "Scarlett",
    "Owen",
    "Grace",
    "Jackson",
  ];

  const last_names: string[] = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Garcia",
    "Miller",
    "Davis",
    "Rodriguez",
    "Martinez",
    "Hernandez",
    "Lopez",
    "Gonzalez",
    "Wilson",
    "Anderson",
    "Thomas",
    "Taylor",
    "Moore",
    "Jackson",
    "Martin",
    "Lee",
    "Perez",
    "Thompson",
    "White",
    "Harris",
    "Sanchez",
    "Clark",
    "Ramirez",
    "Lewis",
    "Robinson",
    "Walker",
    "Young",
  ];
  const uids: string[] = [
    "1001",
    "1002",
    "1003",
    "1004",
    "1005",
    "1006",
    "1007",
    "1008",
    "1009",
    "1010",
    "1011",
    "1012",
    "1013",
    "1014",
    "1015",
    "1016",
    "1017",
    "1018",
    "1019",
    "1020",
    "1021",
    "1022",
    "1023",
    "1024",
    "1025",
    "1026",
    "1027",
    "1028",
    "1029",
    "1030",
    "1031",
    "1032",
  ];

  const users: Record<string, User> = {}; // Object to store users keyed by email

  const generateBinaryPassword = (firstName: string, lastName: string) => {
    const combined = firstName + lastName;
    const binaryString = combined
      .split("")
      .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
      .join("");
    const passwordBase =
      binaryString.substring(0, 8) +
      firstName.charAt(0).toUpperCase() +
      lastName.charAt(0).toLowerCase() +
      "@";
    return passwordBase;
  };
  //capped at 20 users because 1024 was too many for local storage
  for (let i = 0; i < Math.min(20, first_names.length); i++) {
    const firstName = first_names[i];
    const lastName = last_names[i];
    const uid = uids[i];
    // Generate email address using firstName, lastName, and 3 random digits
    const email = `${firstName.toLowerCase()}${lastName.toLowerCase()}${uid}@domain.com`;
    const imagePath = `/${firstName}.jpg`;

    // Create user data
    const user: User = {
      User_FirstName: `${firstName}`,
      User_LastName: `${lastName}`,
      User_Email: email,
      User_Type:
        i === 0 ? "admin_default" : i < 11 ? "logged_in_lecturer" : "logged_in", // First user is admin, others are logged_in or logged_in_lecturer
      User_Password: generateBinaryPassword(firstName, lastName),
      User_Img_Url: imagePath,
    };

    // Add user to users object using email as the key
    users[email] = user;
  }

  // Optionally, store the users object in localStorage
  localStorage.setItem("Users", JSON.stringify(users));

  const storedUsers = localStorage.getItem("Users");
  if (storedUsers) {
    const users = JSON.parse(storedUsers); // Parse the stored JSON string back to an object
    console.log("Number of users:", Object.keys(users).length); // Log the length of the users object
    console.log(users);
  } else {
    console.log("No users found in localStorage.");
  }
}
