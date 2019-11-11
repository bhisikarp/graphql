package com.graphql.account.graphql;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import com.graphql.account.model.Account;
import com.graphql.account.repository.AccountRepository;

@Component
public class AccountQuery implements GraphQLQueryResolver {

	@Autowired
	private AccountRepository accountRepository;
	
	public Optional<Account> getAccount(final int id) {
		return accountRepository.findById(id);
	}
	
	public List<Account> getAccounts(final int count) {
        return (List<Account>) this.accountRepository.findAll();
    }
	
	public Optional<Account> getAccountByAccountNumber(final String accountNumber) {
		return accountRepository.findByAccountNumber(accountNumber);
	}
	
}
