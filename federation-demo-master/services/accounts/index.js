const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

const typeDefs = gql`
  extend type Query {
    getAccount: Account
  }

  type Account @key(fields: "id") {
    id: ID!,
    accountNumber: String,
    device: Device,
    customer: Customer
  }

  extend type Customer @key(fields: "id") {
    id: ID! @external
    accounts: [Account]
  }

  extend type Device @key(fields: "id") {
    id: ID! @external
    accounts: [Account]
  }
`;

const resolvers = {
  Account: {
    customer(account) {
      return { __typename: "Customer", id: account.customerId}
    },
    device(account) {
      return { __typename: "Device", id: device.deviceId}
    }
  },
  Customer: {
    accounts(customer) {
      return accounts.filter(account => account.customer.id === customer.id)
    }
  },
  Device: {
    accounts(device) {
      return accounts.filter(account => account.device.id === device.id)
    }
  },
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
    device: {id: "1"},
    customer: {id: "1"}
  },
  {
    id: "2",
    accountNumber: "A2222222222",
    device: {id: "2"},
    customer: {id: "2"}
  }
];
