const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

const typeDefs = gql`
extend type Device {
  device(fields : String): [Device]
}

type Device @key(fields: "id") {
  id: ID!,
  deviceNumber: String,
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
    __resolveReference(object) {
      return devices.find(device => device.deviceNumber === object.deviceNumber);
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

server.listen({ port: 4002 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

const devices = [
  {
    id: "1",
    deviceNumber: "D1111111111",
    expiryDate: "2019-12-31"
  },
  {
    id: "2",
    deviceNumber: "D2222222222",
    expiryDate: "2020-12-31"
  }
];
