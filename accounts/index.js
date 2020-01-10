const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  extend type Query {
    me: User
  }

  type User @key(fieldds: "id") {
    id: ID!
    username: String!
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

server.listen(4001).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});




