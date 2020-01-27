const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');

// define GraphQL schema
const typeDefs = gql`
  extend type Query {
    me: User
    users: [User]
  }

  type User @key(fields: "id") {
    id: ID!
    name: String
    username: String
   }
`;

// define GraphQL resolvers
const resolvers = {
  Query: {
    me() {
      return users[0];
    },
    users() {
      return users;
    }
  },
  User: {
    __resolveReference(reference) {
      return users.find(user => user.id === reference.id);
    }
  }
};

// initialize server
const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }])
});

// start server
server.listen(4001).then(({ url }) => {
  console.log(`🚀 Server 1 ready at ${url}`);
});

// data store
const users = [
  {
    id: "1",
    name: "Conner Nilsen",
    birthDate: "1998-11-03",
    username: "@conner"
  },
  {
    id: "2",
    name: "Mineral Tree",
    birthDate: "2010-07-07",
    username: "@mt"
  }
];
