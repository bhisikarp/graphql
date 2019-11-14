const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");
const DeviceRest = require('./datasources/device');

const typeDefs = gql`
  extend type Query {
    device(fields : String): [Device]
  }

  type Device @key(fields: "id") {
    id: Int!
    deviceNumber: String
    expiryDate: String
  }
`;

const resolvers = {
  Query: {
    device(arg) {
      return devices.find(device => device.deviceNumber === arg);
    }
  },
  Device: {
    __resolveReference: async (object, { dataSources }) => {
      var deviceId = object.id;
      const deviceRestResponse = await dataSources.deviceRest.getDeviceById(deviceId);
      console.log("### Device Response ###")
      return deviceRestResponse;
    }
  },
};

const server = new ApolloServer({
  dataSources: () => {
    return {
      deviceRest: new DeviceRest(),
    }
  },
  schema: buildFederatedSchema([
    {
      resolvers,
      typeDefs,
    },
  ]),
})

server.listen({ port: 4002 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

// export all the important pieces for integration/e2e tests to use
module.exports = {
  typeDefs,
  resolvers,
  ApolloServer,
  DeviceRest,
  server,
};
