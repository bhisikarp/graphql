package com.graphql.account.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.graphql.account.model.Account;

@Repository
public interface AccountRepository extends CrudRepository<Account, Integer> {

	List<Account> findByCustomerId(Long customerId);
	
	Optional<Account> findByAccountNumber(String accountNumber);
	
}
