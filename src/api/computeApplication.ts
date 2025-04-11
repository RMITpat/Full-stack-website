import {ApplicationDetails, ApplicationParents} from "@/interfaces/Types";

export default function computeApplication(app: ApplicationParents): ApplicationDetails {
    const votes = app.Votes;
    const avg = votes.length ? votes.reduce((sum, v) => sum + v.ranking, 0) / votes.length : 0;
    const chosen = votes.reduce((sum, v) => v.Chosen ? sum + 1 : sum - 1, 0);

    return {
        ...app,
        Avg_Ranking: avg,
        Times_Chosen: chosen,
    };
}