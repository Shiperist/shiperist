import { App, Octokit } from 'octokit';
import { env } from '~/env.mjs';
import { User } from 'next-auth';
import { Endpoints } from '@octokit/types';
import { prisma } from '~/server/db';

type installationParameters =
  Endpoints['GET /users/{username}/installation']['parameters'];
type installationResponse =
  Endpoints['GET /users/{username}/installation']['response'];

type repositoriesParameters =
  Endpoints['GET /installation/repositories']['parameters'];
type repositoriesResponse =
  Endpoints['GET /installation/repositories']['response'];

const app = new App({
  appId: env.GITHUB_APP_ID,
  privateKey: env.GITHUB_APP_PRIVATE_KEY,
  oauth: {
    clientId: env.GITHUB_CLIENT_ID,
    clientSecret: env.GITHUB_CLIENT_SECRET
  }
});

export async function listRepositories(user: User, namespace?: string) {
  const installationId = await getInstallationId(user.username);
  const installationToken = await getInstallationToken(installationId);

  const octokit = new Octokit({
    auth: installationToken as string
  });

  const repositories = await octokit
    .request('GET /installation/repositories', {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })
    .catch((e) => {
      console.log(e);
    });

  console.log(repositories);

  //Print out all repositories
  for (const repository of repositories?.data.repositories) {
    console.log(repository);
  }
}

async function getInstallationId(username: string) {
  const response: installationResponse = await app.octokit.request(
    'GET /users/{username}/installation',
    {
      username: username
    }
  );

  if (response.status !== 200) {
    throw new Error(`Failed to get installation ID for user ${username}`);
  }

  return response.data.id;
}

async function getInstallationToken(installationId: number) {
  const installationToken = await prisma.gitHubInstallationToken.findFirst({
    where: {
      installationId: installationId,
      expires_at: {
        gt: new Date()
      }
    }
  });

  if (installationToken) {
    return installationToken.token;
  }

  const response = await app.octokit
    .auth({
      type: 'installation',
      installationId: installationId
    })
    .catch((e) => {
      console.log(e);
    });

  await prisma.gitHubInstallationToken.create({
    data: {
      installationId: installationId,
      token: response.token,
      expires_at: response.expiresAt,
      repository_selection: response.repositorySelection,
      permissions: response.permissions.toString()
    }
  });

  return response.token;
}
