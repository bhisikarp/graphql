package com.graphql.customer.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;

public class Customer {
	
	@Transient
    public static final String SEQUENCE_NAME = "customer_sequence";

	@Id
	private Long id;
	private String name;
	private String customerNumber;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCustomerNumber() {
		return customerNumber;
	}

	public void setCustomerNumber(String customerNumber) {
		this.customerNumber = customerNumber;
	}


}
