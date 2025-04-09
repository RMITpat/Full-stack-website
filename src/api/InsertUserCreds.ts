import {UserCredential, User} from "@/interfaces/Types";

export default function InsertUserCreds(){
    const local_Users = localStorage.getItem("Users")
    let users: User[] = []; //needs to be empty so the "if" works

    if (local_Users != null || local_Users != undefined) {
        const parsed_local_users = JSON.parse(local_Users);

        try { users = Object.values(parsed_local_users) }
        catch (e) { console.log(e) }
    } else {
        console.log("failed (from: InsertUserCreds)")
    }
    if (users != null || users != undefined) {
        const blank_Cred: UserCredential = {
            previousRoles: "",
            availability: "",
            skills: "",
            credentials: "",
        }
        const all_user_creds: Record<string, UserCredential> = ConstructCredentials(users, blank_Cred);
        localStorage.setItem("Credentials", JSON.stringify(all_user_creds))
    }

}
//todo make something like this that can be used to set the credential of a passed user
//set user creds method should do this
function ConstructCredentials
(users: User[], user_Cred: UserCredential):Record<string, UserCredential> {

    const all_user_Creds: Record<string, UserCredential> = users.reduce(
        (accumulator, user) => {
            accumulator[user.User_Email] = user_Cred
            return accumulator;
        }, {} as Record<string, UserCredential>
    );
    return all_user_Creds;
}