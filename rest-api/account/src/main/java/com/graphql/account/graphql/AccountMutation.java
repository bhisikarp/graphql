package com.graphql.account.graphql;

import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;
import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;

import com.coxautodev.graphql.tools.GraphQLMutationResolver;
import com.graphql.account.model.Account;
import com.graphql.account.model.DatabaseSequence;
import com.graphql.account.repository.AccountRepository;


@Component
public class AccountMutation implements GraphQLMutationResolver {
	
	@Autowired
	private AccountRepository accountRepository;
	
	@Autowired
	private MongoTemplate mongoTemplate;
	
	public Account createAccount(final String accountNumber, final int availableFunds, final Long customerId, final Long deviceId) {
		Account account = new Account();
		account.setId(generateSequence(Account.SEQUENCE_NAME));
		account.setAvailableFunds(availableFunds);
		account.setAccountNumber(accountNumber);
		account.setCustomerId(customerId);
		account.setDeviceId(deviceId);
		return accountRepository.save(account);
    }

	public long generateSequence(String seqName) {

        DatabaseSequence counter = mongoTemplate.findAndModify(query(where("_id").is(seqName)),
                new Update().inc("seq",1), options().returnNew(true).upsert(true),
                DatabaseSequence.class);
        return !Objects.isNull(counter) ? counter.getSeq() : 1;

    }
}
