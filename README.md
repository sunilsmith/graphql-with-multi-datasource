# apollo-tutorial-with-multi-datasource-and-schema-stitching

Starting point for the Apollo GraphQL Server tutorial.

## Getting started

```bash
git clone https://github.com/sunilsmith/graphql-with-multi-datasource.git
cd apollo-starter-kit
npm install
npm start
```

Then open [http://localhost:3000/graphiql](http://localhost:3000/graphiql)

When you paste this on the left side of the page:

```graphql
{
  testString
}
```

and hit the play button (cmd-return), then you should get this on the right side:

```json
{
  "data": {
    "testString": "It works!"
  }
}
```
But this GIT Project is incompleted as i am facing issues with schema stitching
I have 2 different schema's in data/schema.js, authorSchema and commentSchema

Lets describe what i am tryin to achieve
1. I have created 2 schemas with typedef's and Query
2. The first schema authorSchema is defined and the query is resolved in the data/resolver.js file
3. But the second schema commentSchema is defined and queried in data/schema but can't able to resolve in data/resolver.js
4. To achieve: I need to create relation between both schema i.e with a query on author schema with comments array i need to get values for author, post, view(based on postId) and comments(based on postId which is in commentSchema)