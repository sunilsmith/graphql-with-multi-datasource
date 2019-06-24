import { Author, Post, View, Comment } from './connectors';
  
const resolvers = {
  Query: {
    author(root, args){
      console.log('******************* query author ******************************');
      console.log('args :',args);
      return Author.findOne({where:{"firstName": args.firstName, "lastName": args.lastName}})
            .then((author) => author);
      //return { id: 1, firstName: 'Hello', lastName: 'World' };
    },
    allAuthors(){
      return Author.findAll({})
            .then((author) => author);
    },
    /* allComments() {
      console.log('****** Comments ********')
      //console.log(Comment);
      return Comment.findAll({})
             .then((comment) => comment);
    } */
  },
  Author: {
    posts(author){
      console.log('******* Author posts *******')
      //console.log(author);
      return Post.findAll({ where : {"authorId": author.id}})
              .then((post) => post);
      // [
      //   { id: 1, title: 'A post', text: 'Some text', views: 2},
      //   { id: 2, title: 'Another post', text: 'Some other text', views: 200}
      // ];
    },
  },
  Post: {
    author(post) {
      console.log('***** POST *****')
      console.log(post);
      return post.getAuthor();
    },
    views(post) {
      console.log('****** views ********');
      console.log(post);
      return View.findOne({ postId: post.id })
             .then((view) => view.views);
    },
    comments(post) {
      return Comment.findOne({ postId: post.id })
              .then((comment) => comment.comments)
    }
  },
  /* Comment: {
    comment(args) {
      console.log('****** Comments ********')
      console.log(args);
      return Comment.findAll({})
             .then((comment) => comment);
    }
  } */
};

export default resolvers;