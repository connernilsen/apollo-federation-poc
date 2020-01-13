const { ApolloServer } = require('apollo-server');
const { ApolloGateway } = require('@apollo/gateway');

// Initialize ApolloGateway and provide (description) names and URLs
const gateway = new ApolloGateway({
  serviceList: [
    { name: 'accounts', url: 'http://localhost:4001' },
    { name: 'inventory', url: 'http://localhost:4002' },
    { name: 'products', url: 'http://localhost:4003' },
    { name: 'reviews', url: 'http://localhost:4004' }
  ],
});

(async () => {
  // load sub-graph schemas and resolvers
  const { schema, executor } = await gateway.load();

  // initialize server
  const server = new ApolloServer({ schema, executor });

  // start server
  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
})();
