import Fastify from 'fastify';
import FastifyCors from '@fastify/cors';

import anime from "./routes/anime/";
//import manga from "./scrapper/manga";
//import anilist from "./scrapper/anilist";
import chalk from 'chalk';

// Create a new Fastify instance
const fastify = Fastify({
  maxParamLength: 1000,
  logger: true,
});

// Register the CORS plugin with Fastify
(async () => {
  const PORT = 3000;

  await fastify.register(FastifyCors, {
    origin: '*',
    methods: 'GET',
  });

  console.log(chalk.green(`Starting server on port ${PORT}... 🚀`));

  // Register the anime and manga routes
  await fastify.register(anime, { prefix: "/anime" });
  // await fastify.register(manga, { prefix: "/manga" });

  try {
    // Define the root route
    fastify.get('/', (_, rp) => {
      rp.status(200).send(`Welcome to Animetize api! Documentation can be viewed at https://animetize-docs.vercel.app. 🎉`);
    });

    // Define the catch-all route for handling 404 errors
    fastify.get('*', (request, reply) => {
      reply.status(404).send({
        message: '',
        error: '404 Error: Page not found',
      });
    });

    // Start the Fastify server
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
