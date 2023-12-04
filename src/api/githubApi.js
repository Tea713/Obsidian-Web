import { Octokit } from '@octokit/core';

export default function createGithubApi(accessToken) {
    //const octokit = new Octokit({ auth: accessToken });
    const octokit = new Octokit({ auth: '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' });
    return {
        fetchRepositories: async () => {
            const { data } = await octokit.request('GET /user/repos', {
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
            const { data } = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
                owner: 'Tea713',
                repo: repo,
                path: path, // use the path argument
            });
            console.log(data);
            return data.map(item => {
                if (item.type === 'file') {
                    // If the item is a file, decode its content
                    return {
                        name: item.name,
                        content: item.content,
                        type: 'file',
                        path: item.path,
                        isOpen: false,
                    };
                } else if (item.type === 'dir') {
                    // If the item is a directory, return its name and type only
                    return {
                        name: item.name,
                        type: 'dir',
                        path: item.path,
                        isOpen: false,
                    };
                }
            });
        },
    };
}