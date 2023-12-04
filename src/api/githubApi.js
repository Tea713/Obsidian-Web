import { Octokit } from '@octokit/core';

export default function createGithubApi(accessToken) {
    //const octokit = new Octokit({ auth: accessToken });
    const octokit = new Octokit({ auth: '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' });
    return {
        fetchRepositories: async (username) => {
            const { data } = await octokit.request('GET /user/repos', {
                username,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            });
            return data.map(repo => ({
                name: repo.name,
                owner: repo.owner.login,
            }));
        },
        fetchNotes: async (owner, repo, path) => {
            const { data } = await octokit.request('GET /repos/Tea713/Note/contents/', {
                owner,
                repo,
                path,
            });
            return data.map(file => ({
                name: file.name,
                content: atob(file.content),
            }));
        },
    };
}