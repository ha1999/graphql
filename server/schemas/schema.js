const graphql = require('graphql')
const _ = require('lodash')
const { GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql

const books = [
    {id: "1", name: 'Ha_ln', genre: 'VNU', authorId: '1'},
    {id: "2", name: 'Ha_tn', genre: 'VNI',  authorId: '2'},
    { id: "3", name: 'Ha_kn', genre: 'VNK', authorId: '3' },
    {id: "4", name: 'Ha_un', genre: 'VNU', authorId: '1'},
    {id: "5", name: 'Ha_vn', genre: 'VNI',  authorId: '2'},
    {id: "6", name: 'Ha_sn', genre: 'VNK',  authorId: '3'}
]

const authors = [
    {id: "1", name: 'Ha_ln', age: 10},
    {id: "2", name: 'Ha_tn', age: 12},
    {id: "3", name: 'Ha_ln', age: 18}
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent) {
                return _.find(authors, {id: parent.authorId})
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(books, {authorId: parent.id})
            }
            
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields:{
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(books, {id: args.id})
            }
            
        },
        auth: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(authors, {id: args.id})
            }
            
        },
        books: {
            type: new GraphQLList(BookType),
            resolve() {
                return books
            }
        },

        authors: {
            type: new GraphQLList(AuthorType),
            resolve() {
                return authors
            }
        }

    }

})

module.exports = new GraphQLSchema({
    query: RootQuery
})