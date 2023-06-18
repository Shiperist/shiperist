import { z } from 'zod';
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure
} from '~/server/api/trpc';
import { Types } from '~/types/app-types';

export const appsRouter = createTRPCRouter({
  addApp: protectedProcedure
    .meta({ openapi: { method: 'POST', path: '/addApp' } })
    .input(
      z.object({
        name: z.string(),
        description: z.optional(z.string()),
        image: z.optional(z.string()),
        releaseType: z.string(),
        os: z.string(),
        platform: z.string()
      })
    )
    .output(
      z.object({
        id: z.string(),
        userId: z.string(),
        name: z.string(),
        description: z.nullable(z.string()),
        image: z.nullable(z.string()),
        releaseType: z.string(),
        os: z.string(),
        platform: z.string(),
        createdAt: z.date(),
        updatedAt: z.date()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const os = Types[input.os];
      if (!os) {
        throw new Error('Invalid OS');
      }

      if (!os.platform.includes(input.platform)) {
        throw new Error('Invalid Platform');
      }

      const app = await ctx.prisma.app.create({
        data: {
          userId: ctx.session.user.id,
          name: input.name,
          description: input.description,
          image: input.image,
          releaseType: input.releaseType,
          os: input.os,
          platform: input.platform
        }
      });

      return app;
    }),

  get: protectedProcedure
    .meta({ openapi: { method: 'GET', path: '/get/{id}' } })
    .input(z.object({ id: z.string() }))
    .output(
      z.nullable(
        z.object({
          id: z.string(),
          userId: z.string(),
          name: z.string(),
          description: z.nullable(z.string()),
          image: z.nullable(z.string()),
          releaseType: z.string(),
          os: z.string(),
          platform: z.string(),
          createdAt: z.date(),
          updatedAt: z.date()
        })
      )
    )
    .query(async ({ ctx, input }) => {
      const app = await ctx.prisma.app.findUnique({
        where: { id: input.id }
      });

      return app;
    }),

  list: protectedProcedure
    .meta({ openapi: { method: 'GET', path: '/app' } })
    .input(
      z.object({ pageToken: z.optional(z.string()), pageSize: z.number() })
    )
    .output(
      z.array(
        z.object({
          id: z.string(),
          userId: z.string(),
          name: z.string(),
          description: z.nullable(z.string()),
          image: z.nullable(z.string()),
          releaseType: z.string(),
          os: z.string(),
          platform: z.string(),
          createdAt: z.date(),
          updatedAt: z.date()
        })
      )
    )
    .query(async ({ ctx, input }) => {
      const app = await (input.pageToken
        ? ctx.prisma.app.findMany({
            where: { userId: ctx.session.user.id },
            cursor: { id: input.pageToken },
            take: input.pageSize,
            skip: 1,
            orderBy: { id: 'desc' }
          })
        : ctx.prisma.app.findMany({
            where: { userId: ctx.session.user.id },
            take: input.pageSize,
            orderBy: { id: 'desc' }
          }));

      return app;
    }),

  patch: protectedProcedure
    .meta({ openapi: { method: 'PATCH', path: '/patch/{id}' } })
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        description: z.string()
      })
    )
    .output(
      z.object({
        id: z.string(),
        userId: z.string(),
        name: z.string(),
        description: z.nullable(z.string()),
        image: z.nullable(z.string()),
        releaseType: z.string(),
        os: z.string(),
        platform: z.string(),
        createdAt: z.date(),
        updatedAt: z.date()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const updatedApp = await ctx.prisma.app.update({
        where: { id: input.id },
        data: {
          name: input.name,
          description: input.description,
          updatedAt: new Date()
        }
      });

      return updatedApp;
    })
});
