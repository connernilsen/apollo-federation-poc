const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  extend type Query {
    topProducts(first: Int = 5): [Product]
  }
  
  type Product @key(fields: "upc") {
    upc: String!
    name: String!
    price: Int
  }
`;

const resolvers = {
  Query: {
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(4002).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});




