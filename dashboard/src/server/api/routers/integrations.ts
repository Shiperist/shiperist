import { z } from 'zod';
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure
} from '~/server/api/trpc';
import { Types } from '~/types/app-types';
import { listRepositories } from '~/utils/github';

export const integrationsRouter = createTRPCRouter({
  listRepositories: protectedProcedure
    .meta({ openapi: { method: 'GET', path: '/list-repositories' } })
    .input(
      z.object({ provider: z.string(), namespace: z.optional(z.string()) })
    )
    .output(z.boolean())
    .query(async ({ ctx, input }) => {
      await listRepositories(ctx.session.user, input.namespace);
      return true;
    })
});
