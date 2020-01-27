const { ApolloServer } = require('apollo-server');
const { ApolloGateway, RemoteGraphQLDataSource } = require('@apollo/gateway');
require('dotenv').config();

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
  apiKey: process.env.ENGINE_API_KEY,
  buildService({ name, url }) {
    return new DirectoryAuthenticator({ name, url });
  }
});

(async () => {
  // initialize server
  const server = new ApolloServer({ gateway, 
    context: ({ req, res }) => {
      return {
        headers: req.headers
      };
    },
    subscriptions: false, // does not support subscriptions yet
    tracing: true // enable tracing
  });

  // start server
  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
})();
