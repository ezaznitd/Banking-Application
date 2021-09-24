package com.oracle.entity;

public class Application {
	private int applicationId;
	private int customerId; 
	private String loanType;
	private int loanAmount;
	private String status;
	private String remark;
	
	
	public Application()
	{
		
	}
	
	public Application(int applicationId, int customerId, String loanType, int loanAmount, String status,
			String remark) {
		super();
		this.applicationId = applicationId;
		this.customerId = customerId;
		this.loanType = loanType;
		this.loanAmount = loanAmount;
		this.status = status;
		this.remark = remark;
	}

	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public int getApplicationId() {
		return applicationId;
	}
	public void setApplicationId(int applicationId) {
		this.applicationId = applicationId;
	}
	public int getCustomerId() {
		return customerId;
	}
	public void setCustomerId(int customerId) {
		this.customerId = customerId;
	}
	public String getLoanType() {
		return loanType;
	}
	public void setLoanType(String loanType) {
		this.loanType = loanType;
	}
	public int getLoanAmount() {
		return loanAmount;
	}
	public void setLoanAmount(int loanAmount) {
		this.loanAmount = loanAmount;
	}

}
