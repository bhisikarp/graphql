const { RESTDataSource } = require('apollo-datasource-rest');

class CustomerRest extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:8082';
  }

  async getCustomerById(customerId) {
    console.log('Calling Device GraphQL API || CustomerId ', customerId);
    const query = `
       query {
        customerByCustomerId(id: ${customerId}) {
          id,
          customerNumber,
          name
        }
      }`;
    const res = await this.get('/graphql?query='+query);
    console.log('Received response from Customer GraphQL API ', res);
    return await this.customerReducer(res);
  }

   customerReducer(customerResponse) {
    return {
      id: customerResponse.data.customerByCustomerId.id,
      customerNumber: customerResponse.data.customerByCustomerId.customerNumber,
      name: customerResponse.data.customerByCustomerId.name
    };
  }
}

module.exports = CustomerRest;
