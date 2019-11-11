package com.graphql.device.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.graphql.device.model.Device;

@Repository
public interface DeviceRepository extends CrudRepository<Device, Integer> {

	Optional<Device> findByDeviceNumber(String deviceNumber);
	
}
