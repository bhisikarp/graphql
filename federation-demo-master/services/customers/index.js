const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");
const CustomerRest = require('./datasources/customer');

const typeDefs = gql`
  extend type Query {
    customer(fields : String): [Customer]
  }

  type Customer @key(fields: "id") {
    id: Int!
    customerNumber: String
    name: String
  }
`;

const resolvers = {
  Query: {
    customer(arg) {
      return customers.find(customer => customer.customerNumber === arg);
    }
  },
  Customer: {
    __resolveReference: async (object, { dataSources }) => {
      var customerId = object.id;
      const customerRestResponse = await dataSources.customerRest.getCustomerById(customerId);
      console.log("### Customer Response ###")
      return customerRestResponse;
    }
  }
};

const server = new ApolloServer({
  dataSources: () => {
    return {
      customerRest: new CustomerRest(),
    }
  },
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

// export all the important pieces for integration/e2e tests to use
module.exports = {
  typeDefs,
  resolvers,
  ApolloServer,
  CustomerRest,
  server,
};
