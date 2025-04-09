import {UserCredential, User} from "@/interfaces/Types";

export default function InsertUserCreds(){
    const local_Users = localStorage.getItem("Users")
    let users: User[];
    if (local_Users != null || local_Users != undefined) {
        const parsed_local_users = JSON.parse(local_Users);
        users = parsed_local_users
            .map((key) => {
                const user = parsed_local_users[key];
                return user ? user : null;
            })
    } else {
        console.log("failed (from: InsertUserCreds)")
    }
    if (users != null || users != undefined) {

    }

}
function ConstructCredentials(users: User[]){

}