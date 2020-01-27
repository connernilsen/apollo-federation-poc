const { ApolloServer } = require('apollo-server');
const { ApolloGateway, RemoteGraphQLDataSource } = require('@apollo/gateway');

// allows server to seat request headers before contacting gateway
class DirectoryAuthenticator extends RemoteGraphQLDataSource {
  willSendRequest({ request, context }) {
    const { headers } = context;
    request.http && request.http.headers.set('X-MT-Headers', '');
    if (headers) {
      Object.keys(headers).map(
        key => request.http && request.http.headers.set(key, headers[key])
      );
    }
  }
}

// initialize ApolloGateway and provide (description) names and URLs
const gateway = new ApolloGateway({
  serviceList: [
    { name: 'directory', url: 'http://localhost:7000/graphQL' }
  ],
  buildService({ name, url }) {
    return new DirectoryAuthenticator({ name, url });
  }
});

(async () => {
  // load sub-graph schemas and resolvers
  const { schema, executor } = await gateway.load();

  // initialize server
  const server = new ApolloServer({ schema, executor,
    context: ({ req, res }) => {
      return {
        headers: req.headers
      };
    }
  });

  // start server
  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
})();
