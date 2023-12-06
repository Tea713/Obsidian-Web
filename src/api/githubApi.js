import { Octokit } from '@octokit/core';
const TEST_TOKEN = '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';

export default function createGithubApi(accessToken) {
    //const octokit = new Octokit({ auth: accessToken });
    const octokit = new Octokit({ auth: TEST_TOKEN });
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
              path: path,
            });
          
            const notes = await Promise.all(data.map(async item => {
              if (item.type === 'file') {
                const response = await fetch(item.download_url);
                const content = await response.text();
          
                return {
                  name: item.name,
                  content: content,
                  type: 'file',
                  path: item.path,
                  isOpen: false,
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
    };
}