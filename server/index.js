const { ApolloServer } = require('apollo-server');
const { ApolloGateway } = require('@apollo/gateway');

// Initialize ApolloGateway and provide (description) names and URLs
const gateway = new ApolloGateway({
  serviceList: [
    { name: 'accounts', url: 'http://localhost:4001' },
    { name: 'products', url: 'http://localhost:4002' },
    { name: 'reviews', url: 'http://localhost:4003' }
  ],
});

// Provide ApolloGateway to ApolloServer
const server = new ApolloServer({
  gateway,
});

server.listen(4000).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
