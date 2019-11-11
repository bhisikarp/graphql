package com.graphql.device.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;

public class Device {
	
	@Transient
    public static final String SEQUENCE_NAME = "device_sequence";

	@Id
	private Long id;
	private String deviceNumber;
	private String expiryDate;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getDeviceNumber() {
		return deviceNumber;
	}
	public void setDeviceNumber(String deviceNumber) {
		this.deviceNumber = deviceNumber;
	}
	public String getExpiryDate() {
		return expiryDate;
	}
	public void setExpiryDate(String expiryDate) {
		this.expiryDate = expiryDate;
	}

}
