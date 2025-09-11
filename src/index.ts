import path from 'path';
import { readFile } from './utils/files';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { mutationResolvers, queryResolvers } from './resolvers';

async function main(): Promise<void> {
  // Lendo o arquivo de esquema GraphQL
  const schema = await readFile(path.join(__dirname, 'schema.graphql'));

  // Definindo resolvers (lógica para buscar dados)
  const resolvers = {
    Query: {
      ...queryResolvers,
    },
    Mutation: {
      ...mutationResolvers,
    },
  };

  const server = new ApolloServer({ typeDefs: schema, resolvers });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
}

main().catch((err) => console.error(err));
