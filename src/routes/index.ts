import { FastifyInstance, RegisterOptions } from 'fastify';

import gogoanime from './gogoanime';

const routes = async (fastify: FastifyInstance) => {
  await fastify.register(gogoanime);
};

export default routes;
