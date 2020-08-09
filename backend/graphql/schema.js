const { buildSchema } = require('graphql');

module.exports=buildSchema(`
    type Book{
        name: String!
        author: String!
        available: Boolean
    }

    type BookData{
        bookDetails: [Book!]
    }

    type RootQuery{
        getBookData: BookData!
    }

    schema{
        query: RootQuery
    }
`);