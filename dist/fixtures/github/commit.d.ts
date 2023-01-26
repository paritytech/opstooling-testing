import { Commit } from "@octokit/webhooks-types";
export declare function getPushedCommitPayload(params: {
    sha: string;
    owner: string;
    repo: string;
    login: string;
    email?: string;
}): Commit;
