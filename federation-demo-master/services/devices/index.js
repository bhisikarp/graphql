const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

const typeDefs = gql`
  extend type Query {
    device(fields : String): [Device]
  }

  type Device @key(fields: "id") {
    id: ID!
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
    __resolveReference(object) {

      const fetch = require('node-fetch');
      var deviceId = object.id;
      const query = `
        query {
          device(fields:${deviceId}) {
            id,
            deviceNumber,
            expiryDate
          }
        }`;

      fetch('http://localhost:8083/graphql', {
        method: 'POST',
        body: JSON.stringify({query}),
      }).then(res => res.text())
        .then(body => console.log(JSON.parse(body).data.device))
        .catch(error => console.error(error));
        return JSON.parse(body).data.device;
      //return devices.find(device => device.deviceNumber === device.deviceNumber);
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
