import { createTRPCRouter } from '~/server/api/trpc';
import { appsRouter } from '~/server/api/routers/apps';
import { integrationsRouter } from '~/server/api/routers/integrations';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  apps: appsRouter,
  integrations: integrationsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
