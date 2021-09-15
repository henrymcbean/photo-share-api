// 1. Require 'apollo-server'
const { ApolloServer } = require('apollo-server');

const typeDefs = `
  # 1. Add Photo type definition
  type Photo {
    id: ID!
    url: String!
    name: String!
    description: String
  }
  
  # 2. Return Photo from allPhotos
  type Query {
    totalPhotos: Int!
    allPhotos: [Photo!]!
  }

  # 3. Return the newly posted photo from the mutation
  type Mutation {
    postPhoto(name: String! description: String): Photo!
  }
`;

// 1. A variable that we will increment for unique ids
var _id = 0;
var photos = [];

const resolvers = {
  Query: {
    // 2. Return the length of the photos array
    totalPhotos: () => photos.length,
    allPhotos: () => photos,
  },
  // 3. Mutation and postPhoto resolver
  Mutation: {
    postPhoto(parent, args) {
      // 2. Create a new photo, and generate an id
      var newPhoto = {
        id: _id++,
        ...args,
      };

      photos.push(newPhoto);
      return newPhoto;
    },
  },
  Photo: {
    url: (parent) => `http://yoursite.com/img/${parent.id}.jpg`,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// 4. Call listen on the server to launch the web server
server
  .listen()
  .then(({ url }) => console.log(`GraphQL Service running on ${url}`));
