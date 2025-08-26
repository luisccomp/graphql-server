import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`;

type Book = {
  title: string;
  author: string;
};

// Definindo o conjunto de dados do nosso servidor
const books: Book[] = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },

  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

// Query são as operações que podemos fazer na nossa API GraphQL e os resolvers são como essas operações
// serão implementadas.
const resolvers = {
  Query: {
    books: () => books,
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

async function main(): Promise<void> {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
}

main().catch((error) => console.log({ error }));
