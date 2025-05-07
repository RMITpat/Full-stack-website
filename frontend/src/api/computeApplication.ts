import {ApplicationDetails, ApplicationParents} from "@/interfaces/Types";
// need to update this because chosen is the number of times its been ranked now
export default function computeApplication(app: ApplicationParents): ApplicationDetails {
    const votes = app.Votes;
    const chosen = votes.length;
    
    const avg = votes.length ? votes.reduce((sum, v) => sum + v.ranking, 0) / votes.length : 0;

    return {
        ...app,
        Avg_Ranking: avg,
        Times_Chosen: chosen,
    };
}