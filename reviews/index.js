const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Review {
    body: String
    author: User @provides(fields: "username")
    product: Product
  }

  extend type User @key(fields: "id") {
    id: ID! @external
    reviews: [Review]
  }

  extend type Product @key(fields: "upc") {
    upc: String! @external
    reviews: [Review]
  }
`;

const resolvers = {
  Query: {
    me() {
      return { id: "1", username: "@conner" }
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(4003).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});




