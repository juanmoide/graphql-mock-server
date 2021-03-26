import { ApolloServer, gql } from 'apollo-server-micro';

const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`

const path = '/api/graphql'

const apolloServer = new ApolloServer({
  typeDefs,
  // Adding mock values
  mocks: true,
  context: async ({ req, connection }) => {
    if (connection) {
      // check connection for metadata
      return connection.context;
    }
    // get some data from the request
    return {};
  },
  introspection: true,
  subscriptions: {
    path
  },
  playground: {
    subscriptionEndpoint: path,
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const graphqlWithSubscriptionHandler = (req, res, next) => {
  if (!res.socket.server.apolloServer) {
    apolloServer.installSubscriptionHandlers(res.socket.server);
    const handler = apolloServer.createHandler({ path });
    res.socket.server.apolloServer = handler;
  }

  return res.socket.server.apolloServer(req, res, next);
};

export default graphqlWithSubscriptionHandler;