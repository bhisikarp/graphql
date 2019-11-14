const { RESTDataSource } = require('apollo-datasource-rest');

class DeviceRest extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:8083';
  }

  async getDeviceById(deviceId) {
    console.log('Calling Device GraphQL API || DeviceId ', deviceId);
    const query = `
       query {
        deviceByDeviceId(id: ${deviceId}) {
          id,
          deviceNumber,
          expiryDate
        }
      }`;
    const res = await this.get('/graphql?query='+query);
    console.log('Received response from Device GraphQL API ', res);
    return await this.deviceReducer(res);
  }

   deviceReducer(deviceResponse) {
    return {
      id: deviceResponse.data.deviceByDeviceId.id,
      deviceNumber: deviceResponse.data.deviceByDeviceId.deviceNumber,
      expiryDate: deviceResponse.data.deviceByDeviceId.expiryDate
    };
  }
}

module.exports = DeviceRest;
