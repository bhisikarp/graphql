const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

const typeDefs = gql`
  extend type Query {
    customer(fields : String): [Customer]
  }

  type Customer @key(fields: "id") {
    id: ID!,
    customerNumber: String,
    name: String
  }
`;

const resolvers = {
  Query: {
    customer(arg) {
      return customers.find(customer => customer.customerNumber === arg);
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

server.listen({ port: 4003 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

const customers = [
  {
    id: "1",
    customerNumber: "C1111111111",
    name: "Priyank"
  },
  {
    id: "2",
    customerNumber: "C2222222222",
    name: "Mandar"
  }
];
