package com.graphql.device.graphql;

import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;
import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;

import com.coxautodev.graphql.tools.GraphQLMutationResolver;
import com.graphql.device.model.Device;
import com.graphql.device.model.DatabaseSequence;
import com.graphql.device.repository.DeviceRepository;


@Component
public class DeviceMutation implements GraphQLMutationResolver {
	
	@Autowired
	private DeviceRepository deviceRepository;
	
	@Autowired
	private MongoTemplate mongoTemplate;
	
	public Device createDevice(final String deviceNumber, final String expiryDate) {
		Device device = new Device();
		device.setId(generateSequence(Device.SEQUENCE_NAME));
		device.setDeviceNumber(deviceNumber);
		device.setExpiryDate(expiryDate);
		return deviceRepository.save(device);
    }

	public long generateSequence(String seqName) {

        DatabaseSequence counter = mongoTemplate.findAndModify(query(where("_id").is(seqName)),
                new Update().inc("seq",1), options().returnNew(true).upsert(true),
                DatabaseSequence.class);
        return !Objects.isNull(counter) ? counter.getSeq() : 1;

    }
}
