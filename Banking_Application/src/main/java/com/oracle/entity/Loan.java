package com.oracle.entity;

public class Loan {
	private int loanId;
	private int customerId; 
	private String loanType;
	private int loanAmount;
	public Loan()
	{
		
	}
		
	public Loan(int loanId, int customerId, String loanType, int loanAmount) {
		super();
		this.loanId = loanId;
		this.customerId = customerId;
		this.loanType = loanType;
		this.loanAmount = loanAmount;
	}

	public int getLoanId() {
		return loanId;
	}

	public void setLoanId(int loanId) {
		this.loanId = loanId;
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
