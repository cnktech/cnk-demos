const { GraphQLServer } = require('graphql-yoga')

const typeDefs = `
    type Member {
        id: String
        name: String
        email: String
    }

    type Org {
        id: String
        name: String
    }


    type Query {
        member(id: String): Member
        org: Org
    }

`

const resolvers = {
    Query: {
        member: (parent, input) => {
            return {
                id: input.id,
                name: 'gary',
                email: 'adkjnvsjk'
            }
        },
        org: () => {
            return {
                id: '123',
                name: 'org1'
            }
        }
    }
}

const server = new GraphQLServer({ typeDefs, resolvers })
server.start(() => console.log('Server is running on localhost:4000'))
