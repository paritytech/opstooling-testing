export type RepoRef = {
    ref: string;
    node_id: string;
    url: string;
    object: {
        sha: string;
        type: string;
        url: string;
    };
};
export declare function getRepoRefPayload(params: {
    name: string;
    commit: string;
    owner: string;
    repo: string;
}): RepoRef;
export declare function getRepoRefsPayload(params: {
    name: string;
    commit: string;
    owner: string;
    repo: string;
}[]): RepoRef[];
