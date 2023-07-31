const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    savedBooks: [bookSchema]
}

type Book {
    authors: [String]
    description: String!
    bookId: ID!
    image: String
    link: String
    title: String
}

type Query {
    users: [User]
    user(id: ID!): User
}

type Mutation { 
    createUser(username: String!, email: String!, password: String!): User
    savedBook(id: ID!, savedBooks: [Book]): User
}
`

module.exports = typeDefs;