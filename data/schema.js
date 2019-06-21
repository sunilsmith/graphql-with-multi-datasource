import { makeExecutableSchema, addMockFunctionsToSchema, mergeSchemas } from 'graphql-tools';
// import mocks from './mocks' <-- comment out
import resolvers from './resolvers';

/* const typeDefs = `
type Author {
  id: Int
  firstName: String
  lastName: String
  posts: [Post]
}

type Post {
  id: Int
  title: String
  text: String
  views: Int
  author: Author
}

type Query {
  author(firstName: String, lastName: String): Author
  allAuthors: [Author]
  getFortuneCookie: String # we'll use this later
}
`; */

// Add resolvers option to this call
//const schema = makeExecutableSchema({ typeDefs, resolvers });
const authorSchema = makeExecutableSchema({ typeDefs : `
type Author {
  id: Int
  firstName: String
  lastName: String
  posts: [Post]
}

type Post {
  id: Int
  title: String
  text: String
  views: Int
  author: Author
}

type Query {
  author(firstName: String, lastName: String): Author
  allAuthors: [Author]
}
` });

const commentSchema = makeExecutableSchema({ typeDefs : `
type Comment {
  postId: Int
  comments: String
}

type Query {
  comment: Comment
  allComments: [Comment]
}
` });
//const schema = makeExecutableSchema({ typeDefs });

//addMockFunctionsToSchema({ schema, mocks });
//export default schema
//console.log('resolvers: ',resolvers);
const mergedSchema = mergeSchemas({schemas:[authorSchema, commentSchema], resolvers});
export default mergedSchema
