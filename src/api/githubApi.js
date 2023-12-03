import { Octokit } from '@octokit/core';

export default function createGithubApi(accessToken) {
  const octokit = new Octokit({ auth: accessToken });

  return {
    fetchNotes: async (owner, repo, path) => {
      const { data } = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
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