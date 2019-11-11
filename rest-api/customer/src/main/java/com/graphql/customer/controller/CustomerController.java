package com.graphql.customer.controller;

import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;
import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.graphql.customer.model.Customer;
import com.graphql.customer.model.DatabaseSequence;
import com.graphql.customer.repository.CustomerRepository;

@RestController
@RequestMapping("/customers")
public class CustomerController {
	
	@Autowired
	private CustomerRepository customerRepository;
	
	@Autowired
	private MongoTemplate mongoTemplate;

	@GetMapping("/{id}")
	public ResponseEntity<Customer> findById(@PathVariable("id") Integer id) {
		System.out.println("Received Request");
		try {
			return new ResponseEntity(customerRepository.findById(id), HttpStatus.OK);
		}catch(Exception ex){
			ex.printStackTrace();
			return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PostMapping
	public  ResponseEntity<Customer> add(@RequestBody Customer customer) {
		System.out.print("Add Customer");
		try {
			customer.setId(generateSequence(Customer.SEQUENCE_NAME));
			customerRepository.save(customer);
			return new ResponseEntity(HttpStatus.OK);
		}catch(Exception ex){
			ex.printStackTrace();
			return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
	
	public long generateSequence(String seqName) {

        DatabaseSequence counter = mongoTemplate.findAndModify(query(where("_id").is(seqName)),
                new Update().inc("seq",1), options().returnNew(true).upsert(true),
                DatabaseSequence.class);
        return !Objects.isNull(counter) ? counter.getSeq() : 1;

    }
	
}
