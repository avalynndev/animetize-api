import Fastify from 'fastify';
import FastifyCors from '@fastify/cors';
import Redis from 'ioredis';
import gogoanime from './routes';
import chalk from 'chalk';

const fastify = Fastify({
  maxParamLength: 1000,
  logger: true,
});

export const redis =
  process.env.REDIS_HOST &&
  new Redis({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD,
  });

(async () => {
  const PORT = 3000;

  await fastify.register(FastifyCors, {
    origin: '*',
    methods: 'GET',
  });

  console.log(chalk.green(`Starting server on port ${PORT}... 🚀`));
  if (!process.env.REDIS_HOST)
    console.warn(chalk.yellowBright('Redis not found. Cache disabled.'));

  await fastify.register(gogoanime, { prefix: '/' });
  
  try {
    fastify.get('*', (request, reply) => {
      reply.status(404).send({
        message: '',
        error: '404 Error: Page not found',
      });
    });

    fastify.listen({ port: PORT, host: '0.0.0.0' }, (e, address) => {
      if (e) throw e;
      console.log(`Server listening on ${address}`);
    });
  } catch (err: any) {
    fastify.log.error(err);
    process.exit(1);
  }
})();

// Export the handler function for use with serverless platforms
export default async function handler(req: any, res: any) {
  await fastify.ready();
  fastify.server.emit('request', req, res);
}
