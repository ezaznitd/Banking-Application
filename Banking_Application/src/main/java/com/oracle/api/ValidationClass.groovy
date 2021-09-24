package com.oracle.api

class ValidationClass {
	public boolean validate(int loan_amt)
	{
		if(loan_amt<5000)
			return true;
		else
			return false;
	}
}
