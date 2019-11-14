package com.graphql.device.graphql;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import com.graphql.device.model.Device;
import com.graphql.device.repository.DeviceRepository;

@Component
public class DeviceQuery implements GraphQLQueryResolver {

	@Autowired
	private DeviceRepository deviceRepository;
	
	public Optional<Device> getDeviceByDeviceId(final int id) {
		System.out.println("Received Request for Device Id "+id);
		return deviceRepository.findById(id);
	}
	
	public Optional<Device> getDeviceByDeviceNumber(final String deviceNumber) {
		return deviceRepository.findByDeviceNumber(deviceNumber);
	}
}
