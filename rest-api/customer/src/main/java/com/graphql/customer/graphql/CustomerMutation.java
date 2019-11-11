package com.graphql.customer.graphql;

import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;
import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;

import com.coxautodev.graphql.tools.GraphQLMutationResolver;
import com.graphql.customer.model.Customer;
import com.graphql.customer.model.CustomerType;
import com.graphql.customer.model.DatabaseSequence;
import com.graphql.customer.repository.CustomerRepository;


@Component
public class CustomerMutation implements GraphQLMutationResolver {
	
	@Autowired
	private CustomerRepository customerRepository;
	
	@Autowired
	private MongoTemplate mongoTemplate;
	
	public Customer createCustomer(final String customerNumber, final String name) {
		Customer customer = new Customer();
		customer.setId(generateSequence(Customer.SEQUENCE_NAME));
		customer.setName(name);
		customer.setCustomerNumber(customerNumber);
		return customerRepository.save(customer);
    }

	public long generateSequence(String seqName) {

        DatabaseSequence counter = mongoTemplate.findAndModify(query(where("_id").is(seqName)),
                new Update().inc("seq",1), options().returnNew(true).upsert(true),
                DatabaseSequence.class);
        return !Objects.isNull(counter) ? counter.getSeq() : 1;

    }
}
