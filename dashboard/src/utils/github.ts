import { App, Octokit } from 'octokit';
import { env } from '~/env.mjs';
import type { User } from 'next-auth';
import type { Endpoints } from '@octokit/types';
import { prisma } from '~/server/db';

type installationParameters =
  Endpoints['GET /users/{username}/installation']['parameters'];
type installationResponse =
  Endpoints['GET /users/{username}/installation']['response'];

type repositoriesParameters =
  Endpoints['GET /installation/repositories']['parameters'];
type repositoriesResponse =
  Endpoints['GET /installation/repositories']['response'];

type createInstallationTokenParameters =
  Endpoints['POST /app/installations/{installation_id}/access_tokens']['parameters'];
type createInstallationTokenResponse =
  Endpoints['POST /app/installations/{installation_id}/access_tokens']['response'];

type listAcessibleRepositoriesParameters =
  Endpoints['GET /installation/repositories']['parameters'];
type listAcessibleRepositoriesResponse =
  Endpoints['GET /installation/repositories']['response'];

const app = new App({
  appId: env.GITHUB_APP_ID,
  privateKey: env.GITHUB_APP_PRIVATE_KEY,
  oauth: {
    clientId: env.GITHUB_CLIENT_ID,
    clientSecret: env.GITHUB_CLIENT_SECRET
  }
});

export async function listRepositories(
  user: User,
  namespace?: string
): Promise<repositoriesResponse['data']['repositories']> {
  if (!user.name) throw new Error('User name not found');

  const installationId = await getInstallationId(user.name);
  const installationToken = await getInstallationToken(installationId);

  const octokit = new Octokit({
    auth: installationToken
  });

  const repositories: listAcessibleRepositoriesResponse = await octokit.request(
    'GET /installation/repositories',
    {
      per_page: 100,
      page: 1
    }
  );

  if (repositories.status !== 200) {
    throw new Error(
      `Failed to list repositories for installation ${installationId}`
    );
  }

  return repositories.data.repositories;
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

  const response: createInstallationTokenResponse = await app.octokit.request(
    'POST /app/installations/{installation_id}/access_tokens',
    {
      installation_id: installationId
    }
  );

  if (response.status !== 201) {
    throw new Error(
      `Failed to create installation token for installation ${installationId}`
    );
  }

  await prisma.gitHubInstallationToken.upsert({
    where: {
      installationId: installationId
    },
    create: {
      installationId: installationId,
      token: response.data.token,
      expires_at: response.data.expires_at,
      repository_selection: response.data.repository_selection ?? 'all'
    },
    update: {
      installationId: installationId,
      token: response.data.token,
      expires_at: response.data.expires_at,
      repository_selection: response.data.repository_selection ?? 'all'
    }
  });

  return response.data.token;
}
