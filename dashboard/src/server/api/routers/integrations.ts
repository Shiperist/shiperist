import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc';
import { listRepositories } from '~/utils/github';

export const integrationsRouter = createTRPCRouter({
  listRepositories: protectedProcedure
    .meta({ openapi: { method: 'GET', path: '/list-repositories' } })
    .input(
      z.object({ provider: z.string(), namespace: z.optional(z.string()) })
    )
    .output(
      z.array(
        z.object({
          id: z.number(),
          name: z.string(),
          namespace: z.string(),
          private: z.boolean(),
          defaultBranch: z.string(),
          updatedAt: z.date(),
          createdAt: z.date(),
          url: z.string(),
          ownerType: z.string()
        })
      )
    )
    .query(async ({ ctx, input }) => {
      const repositories = await listRepositories(
        ctx.session.user,
        input.namespace
      );
      return repositories.map((repository) => {
        return {
          id: repository.id,
          name: repository.name,
          namespace: ctx.session.user.name || '',
          private: repository.private,
          defaultBranch: repository.default_branch,
          updatedAt: new Date(repository.updated_at || ''),
          createdAt: new Date(repository.created_at || ''),
          url: repository.html_url,
          ownerType: repository.owner.type
        };
      });
    })
});
