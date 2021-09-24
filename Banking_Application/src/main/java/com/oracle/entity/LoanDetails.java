package com.oracle.entity;

public class LoanDetails {
	private int applicationId;
	private String customerName;
	private int customerId; 
	private String loanType;
	private int loanAmount;
	private String status;
	private String remark;
	private String adhaar;
	private String voterCard;
	private String photo;
	
	
	public LoanDetails()
	{
		
	}


	public LoanDetails(int applicationId, String customerName, int customerId, String loanType, int loanAmount,
			String status, String remark, String adhaar, String voterCard, String photo) {
		super();
		this.applicationId = applicationId;
		this.customerName = customerName;
		this.customerId = customerId;
		this.loanType = loanType;
		this.loanAmount = loanAmount;
		this.status = status;
		this.remark = remark;
		this.adhaar = adhaar;
		this.voterCard = voterCard;
		this.photo = photo;
	}


	public int getApplicationId() {
		return applicationId;
	}


	public void setApplicationId(int applicationId) {
		this.applicationId = applicationId;
	}


	public String getCustomerName() {
		return customerName;
	}


	public void setCustomerName(String customerName) {
		this.customerName = customerName;
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


	public String getStatus() {
		return status;
	}


	public void setStatus(String status) {
		this.status = status;
	}


	public String getRemark() {
		return remark;
	}


	public void setRemark(String remark) {
		this.remark = remark;
	}


	public String getAdhaar() {
		return adhaar;
	}


	public void setAdhaar(String adhaar) {
		this.adhaar = adhaar;
	}


	public String getVoterCard() {
		return voterCard;
	}


	public void setVoterCard(String voterCard) {
		this.voterCard = voterCard;
	}


	public String getPhoto() {
		return photo;
	}


	public void setPhoto(String photo) {
		this.photo = photo;
	}
}
