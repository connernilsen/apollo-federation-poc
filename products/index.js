const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');

// define GraphQL schema
const typeDefs = gql`
  extend type Query {
    topProducts(first: Int = 2): [Product]
  }
  
  type Product @key(fields: "upc") {
    upc: String!
    name: String
    price: Int
    weight: Int
  }
`;

// define GraphQL resolvers
const resolvers = {
  Product: {
    __resolveReference(reference) {
      return products.find(product => product.upc === reference.upc);
    }
  },
  Query: {
    topProducts(_, args) {
      return products.slice(0, args.first);
    }
  }
};

// initialize server
const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }])
});

// start server
server.listen(4003).then(({ url }) => {
  console.log(`🚀 Server 3 ready at ${url}`);
});

// data store
const products = [
  {
    upc: "1",
    name: "Table",
    price: 899,
    weight: 100
  },
  {
    upc: "2",
    name: "Couch",
    price: 1299,
    weight: 1000
  },
  {
    upc: "3",
    name: "Chair",
    price: 54,
    weight: 50
  }
];


