import 'reflect-metadata';
import 'dotenv/config';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';

import resolvers from '../graphql/resolvers';

async function runServer(): Promise<void> {
  await createConnection();

  const schema = await buildSchema({ resolvers, validate: false });

  const server = new ApolloServer({ schema });

  const port = process.env.PORT || 3333;

  await server.listen(port);

  console.log(`🚀 server started at port ${port}`);
}

runServer();
