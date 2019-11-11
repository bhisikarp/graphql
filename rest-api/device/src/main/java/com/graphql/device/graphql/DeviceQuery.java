package com.graphql.device.graphql;

import java.util.List;
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
	
	public Optional<Device> getDevice(final int id) {
		return deviceRepository.findById(id);
	}
	
	public List<Device> getDevices(final int count) {
        return (List<Device>) this.deviceRepository.findAll();
    }
	
	public Optional<Device> getDeviceByDeviceNumber(final String deviceNumber) {
		return deviceRepository.findByDeviceNumber(deviceNumber);
	}
}
