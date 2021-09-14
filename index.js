// 1. Require 'apollo-server'
const { ApolloServer } = require('apollo-server');

const typeDefs = `
  type Query {
    totalPhotos: Int!
  }

  type Mutation {
    postPhoto(name: String! description: String): Boolean!
  }
`;

// 1. A data type to store our photos in memory
var photos = []

const resolvers = {
  Query: {
    // 2. Return the length of the photos array
    totalPhotos: () => photos.length,
  },
  // 3. Mutation and postPhoto resolver
  Mutation: {
    postPhoto(parent, args) {
      photos.push(args)
      return true
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// 4. Call listen on the server to launch the web server
server
  .listen()
  .then(({ url }) => console.log(`GraphQL Service running on ${url}`));
