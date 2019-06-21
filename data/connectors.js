import Sequelize from 'sequelize';
import casual from 'casual';
import _ from 'lodash';
import Mongoose from 'mongoose';

const db = new Sequelize('blog', null, null, {
  dialect: 'sqlite',
  storage: './blog.sqlite',
});

const mongo = Mongoose.connect('mongodb://demouser:demouser1@ds161475.mlab.com:61475/databasedemo');

const ViewSchema = Mongoose.Schema({
  postId: Number,
  views: Number,
});

const CommentSchema = Mongoose.Schema({
  postId: Number,
  comments: String,
});

const View = Mongoose.model('views', ViewSchema);
const Comment = Mongoose.model('comments', CommentSchema);

const AuthorModel = db.define('author', {
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING },
});

const PostModel = db.define('post', {
  title: { type: Sequelize.STRING },
  text: { type: Sequelize.STRING },
});

AuthorModel.hasMany(PostModel);
PostModel.belongsTo(AuthorModel);

// create mock data with a seed, so we always get the same
// casual.seed(123);
// db.sync({ force: true }).then(() => {
//   _.times(10, () => {
//     return AuthorModel.create({
//       firstName: casual.first_name,
//       lastName: casual.last_name,
//     }).then((author) => {
//       return author.createPost({
//         title: `A post by ${author.firstName}`,
//         text: casual.sentences(3),
//       });
//     });
//   });
// });

casual.seed(123);
db.sync({ force: true }).then(() => {
  _.times(10, () => {
    return AuthorModel.create({
      firstName: casual.first_name,
      lastName: casual.last_name,
    }).then((author) => {
      return author.createPost({
        title: `A post by ${author.firstName}`,
        text: casual.sentences(3),
      })
      .then((post) => { // <- the new part starts here
        // create some View mocks
        return View.update(
          { postId: post.id },
          { views: casual.integer(0, 100) },
          { upsert: true });
      })
      .then((post) => {
        console.log('********* Comments **************')
        return Comment.update(
            { postId: post.id },
            { comments: casual.sentences(5) },
            { upsert: true }
            )
        });
    });
  });
});

const Author = db.models.author;
const Post = db.models.post;

export { Author, Post, View, Comment };