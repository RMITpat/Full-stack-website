import { User }from "@/interfaces/Types"

export default function InsertUsers() {
    const first_names: string[] = [
        "Matt", "Liam", "Olivia", "Noah", "Ava", "Elijah", "Sophia", "James",
        "Isabella", "William", "Mia", "Benjamin", "Charlotte", "Lucas", "Amelia", "Henry",
        "Harper", "Alexander", "Evelyn", "Michael", "Abigail", "Daniel", "Emily", "Matthew",
        "Ella", "Sebastian", "Avery", "Jack", "Scarlett", "Owen", "Grace", "Jackson"
    ];

    const last_names: string[] = [
        "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis",
        "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas",
        "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White",
        "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker", "Young"
    ];

    const users: Record<string, User> = {}; // Object to store users keyed by email

    const generateBinaryPassword = (firstName: string, lastName: string) => {
        const combined = firstName + lastName;
        const binaryString = combined
            .split('')
            .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
            .join('');
        const passwordBase = binaryString.substring(0, 8) +
            firstName.charAt(0).toUpperCase() +
            lastName.charAt(0).toLowerCase() +
            '@';
        return passwordBase;
    };
    //capped at 20 users because 1024 was too many for local storage
    for (let i = 0; i < Math.min(20, first_names.length); i++) {
        const firstName = first_names[i];
        const lastName = last_names[i];

        // Generate email address using firstName, lastName, and 3 random digits
        const email = `${firstName.toLowerCase()}${lastName.toLowerCase()}${Math.floor(Math.random() * 900) + 100}@domain.com`;

        // Create user data
        const user: User = {
            User_Name: `${firstName} ${lastName}`,
            User_Email: email,
            User_Type: i === 0 ? "admin_default" : i < 11 ? "logged_in_lecturer" : "logged_in", // First user is admin, others are logged_in or logged_in_lecturer
            User_Password: generateBinaryPassword(firstName, lastName),
            User_Img_Url: "", // Empty image URL
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
        console.log(users)
    } else {
        console.log("No users found in localStorage.");
    }

}
