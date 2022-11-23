import { handlerPath } from '@libs/handler-resolver';

export const app = {
  handler: `${handlerPath(__dirname)}/handler.handler`,
  events: [
    {
      http: {
        method: 'ANY',
        path: '/',
        cors: true,
      },
    },
    {
      http: {
        method: 'ANY',
        path: '/{any+}',
        cors: true,
      },
    },
  ],
};
