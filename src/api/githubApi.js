import { Octokit } from '@octokit/core';

export default function createGithubApi(accessToken) {
    const octokit = new Octokit({
        auth: `Bearer ${accessToken}`
    });
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
                owner: owner,
                repo: repo,
                path: path,
            });

            const notes = await Promise.all(data.map(async item => {
                if (item.type === 'file') {
                    const response = await fetch(item.download_url);
                    let isImage = false;
                    let isPDF = false;
                    let content = null;
                    if (item.name.match(/\.(jpeg|jpg|gif|png)$/i)) {
                        isImage = true;
                        content = item.download_url;
                    } else if (item.name.match(/\.(pdf)$/i)) {
                        isPDF = true;
                        content = item.download_url;
                    } else {
                        const response = await fetch(item.download_url);
                        content = await response.text();
                    }
                    return {
                        name: item.name,
                        content: content,
                        type: 'file',
                        path: item.path,
                        isOpen: false,
                        isImage: isImage,
                    };
                } else if (item.type === 'dir') {
                    return {
                        name: item.name,
                        type: 'dir',
                        path: item.path,
                        isOpen: false,
                    };
                }
            }));
            return notes;
        },
        fetchUsername: async () => {
            const { data } = await octokit.request('GET /user');
            return data.login;
        }
    };
}