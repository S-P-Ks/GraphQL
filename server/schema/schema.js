const graphql = require("graphql");
const _ = require("lodash");
const Book = require("../models/book");
const Author = require("../models/author");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

// dummy data
var books = [
  { name: "Name of the Wind", genre: "Fantasy", id: "1", authorID: "1" },
  { name: "The Final Empire", genre: "Fantasy", id: "2", authorID: "2" },
  { name: "The Long Earth", genre: "Sci-Fi", id: "3", authorID: "3" },
  { name: "Name of the Wind", genre: "Fantasy", id: "4", authorID: "1" },
  { name: "The Final Empire", genre: "Fantasy", id: "5", authorID: "2" },
  { name: "The Long Earth", genre: "Sci-Fi", id: "6", authorID: "3" },
];

var authors = [
  { name: "A1", age: 21, id: "1", bookID: "1" },
  { name: "A2", age: 22, id: "2", bookID: "2" },
  { name: "A3", age: 23, id: "3", bookID: "3" },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        console.log(parent);
        // return _.find(authors, { id: parent.authorID });
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    book: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return _.filter(books, { authorID: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db / other source
        // return _.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(authors, { id: args.id });
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return books;
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        // return authors;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        resolve(parent, args) {
          let author = new Author({
            name: args.name,
            age: args.age,
          });

          author.save();
        },
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
