import {User} from "@/interfaces/Types";

export default function getAllUsers(): Record<string, User>{
    const usersJSON = localStorage.getItem("Users") ?? localStorage.getItem("DummyData");
    return usersJSON ? JSON.parse(usersJSON) : {};
}