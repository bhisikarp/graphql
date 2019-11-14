package com.graphql.customer.graphql;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import com.graphql.customer.model.Customer;
import com.graphql.customer.repository.CustomerRepository;

@Component
public class CustomerQuery implements GraphQLQueryResolver {

	@Autowired
	private CustomerRepository customerRepository;
	
	public Optional<Customer> getCustomerByCustomerId(final int id) {
		System.out.println("Received Request");
		return customerRepository.findById(id);
	}
}
