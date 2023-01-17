"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPipelineJobsPayload = void 0;
function getPipelineJobsPayload(params) {
    return [
        {
            commit: {
                author_email: "admin@example.com",
                author_name: "Administrator",
                created_at: "2015-12-24T16:51:14.000+01:00",
                id: "0ff3ae198f8601a285adcf5c0fff204ee6fba5fd",
                message: "Test the CI integration.",
                short_id: "0ff3ae19",
                title: "Test the CI integration.",
            },
            coverage: null,
            allow_failure: false,
            created_at: "2015-12-24T15:51:21.727Z",
            started_at: "2015-12-24T17:54:24.729Z",
            finished_at: "2015-12-24T17:54:24.921Z",
            duration: 0.192,
            queued_duration: 0.023,
            artifacts_expire_at: "2016-01-23T17:54:24.921Z",
            tag_list: ["docker runner", "ubuntu18"],
            id: 6,
            name: "rspec:other",
            pipeline: {
                id: 61,
                project_id: 1,
                ref: "main",
                sha: "0ff3ae198f8601a285adcf5c0fff204ee6fba5fd",
                status: "pending",
            },
            ref: "main",
            artifacts: [],
            runner: null,
            stage: "test",
            status: params.status,
            failure_reason: "stuck_or_timeout_failure",
            tag: false,
            web_url: "https://example.com/foo/bar/-/jobs/6",
            user: {
                id: 1,
                name: "Administrator",
                username: "root",
                state: "active",
                avatar_url: "http://www.gravatar.com/avatar/e64c7d89f26bd1972efa854d13d7dd61?s=80&d=identicon",
                web_url: "http://gitlab.dev/root",
                created_at: "2015-12-21T13:14:24.077Z",
                bio: null,
                location: null,
                public_email: "",
                skype: "",
                linkedin: "",
                twitter: "",
                website_url: "",
                organization: "",
            },
        },
    ];
}
exports.getPipelineJobsPayload = getPipelineJobsPayload;
//# sourceMappingURL=job.js.map