import {ApplicationDetails} from "@/interfaces/Types";

export default function
    getApplicationStatuses(): Record<string, ApplicationDetails>{
    const doesJSONExist = localStorage.getItem("ApplicationStatuses")

    let AppStats: Record<string, ApplicationDetails> = {}

    if (doesJSONExist != null) {
        AppStats = JSON.parse(doesJSONExist)
        console.log(AppStats)
    }
    return AppStats
}