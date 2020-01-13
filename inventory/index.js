const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');

// define GraphQL schema
const typeDefs = gql`
  extend type Product @key(fields: "upc") {
    upc: String! @external
    weight: Int @external
    price: Int @external
    inStock: Boolean
    shippingEstimate: Int @requires(fields: "price weight")
  }
`;

// define GraphQL resolvers
const resolvers = {
  Product: {
    __resolveReference(reference) {
      return {
        ...reference,
        ...inventory.find(product => product.upc === reference.upc)
      };
    },
    // define shipping estimate function resolver
    shippingEstimate(reference) {
      if (reference.price > 1000) return 0;
      return reference.weight * .5;
    }
  }
};

// initalize server
const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }])
});

// start server
server.listen({ port: 4002 }).then(({ url }) => {
  console.log(`🚀 Server 2 ready at ${url}`);
});

// data store
const inventory = [
  { upc: "1", inStock: true },
  { upc: "2", inStock: false },
  { upc: "3", inStock: true }
];
