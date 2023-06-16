import type { NextApiRequest, NextApiResponse } from 'next';
import cors from 'nextjs-cors';
import { createOpenApiNextHandler } from 'trpc-openapi';
import { createTRPCContext } from '../../server/api/trpc';
import { appRouter } from '../../server/api/root';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Setup CORS
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  await cors(req, res);

  // Handle incoming OpenAPI requests
  return createOpenApiNextHandler({
    router: appRouter,
    createContext: createTRPCContext
  })(req, res);
};

export default handler;
