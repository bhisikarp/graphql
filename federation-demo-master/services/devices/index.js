const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

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
    __resolveReference(object) {
      var deviceId = object.id;
      //let responsePromise = resolvers.getDeviceDetails(deviceId);
      //console.log(responsePromise);
      console.log(devices.find(device => device.id === deviceId));
      console.log("### Device Response  2 ###")
      return devices.find(device => device.id === deviceId);
    }
  },
  /*getDeviceDetails: function getDevice(deviceId) {
    var Request = require("request");
    var data;
    const query = `
      query {
        device(fields:${deviceId}) {
          id,
          deviceNumber,
          expiryDate
        }
      }`;
    Request.post({url:     'http://localhost:8083/graphql',
      body:    JSON.stringify({query})
    }, function(error, response, body){
      console.log("### Device Response ###")
      console.log(JSON.parse(body).data.device)
      console.log("### Returning Device Response ###")
      data = JSON.parse(body).data.device;
      //return JSON.parse(body).data.device;
    });
    return data;
  }*/
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
    id: 1,
    deviceNumber: "D1111111111",
    expiryDate: "2019-12-31"
  },
  {
    id: 2,
    deviceNumber: "D2222222222",
    expiryDate: "2020-12-31"
  }
];
