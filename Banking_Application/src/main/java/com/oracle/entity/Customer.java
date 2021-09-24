package com.oracle.entity;

public class Customer {
	private int customerId;
	private String CustomerName;
	private String gender;
	private String phoneNo;
	private String email;
	public Customer()
	{
		
	}
	public Customer(int customerId, String customerName, String gender, String phoneNo, String email) {
		super();
		this.customerId = customerId;
		this.CustomerName = customerName;
		this.gender = gender;
		this.phoneNo = phoneNo;
		this.email = email;
	}
	public int getCustomerId() {
		return customerId;
	}
	public void setCustomerId(int customerId) {
		this.customerId = customerId;
	}
	public String getCustomerName() {
		return CustomerName;
	}
	public void setCustomerName(String customerName) {
		this.CustomerName = customerName;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getPhoneNo() {
		return phoneNo;
	}
	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	

}
