const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

const typeDefs = gql`
  extend type Query {
    getAccount: Account
  }

  type Account @key(fields: "id") {
    id: ID!,
    accountNumber: String,
    deviceNumber: String,
    customerNumber: String
  }
`;

const resolvers = {
  Query: {
    getAccount() {
      return accounts[0];
    }
  },
  Account: {
    __resolveReference(object) {
      return accounts.find(account => account.id === object.id);
    }
  }
};

const server = new ApolloServer({
  schema: buildFederatedSchema([
    {
      typeDefs,
      resolvers
    }
  ])
});

server.listen({ port: 4001 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

const accounts = [
  {
    id: "1",
    accountNumber: "A1111111111",
    deviceNumber: "D1111111111",
    customerNumber: "C1111111111"
  },
  {
    id: "2",
    accountNumber: "A2222222222",
    deviceNumber: "D2222222222",
    customerNumber: "C2222222222"
  }
];
