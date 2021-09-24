package com.oracle.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.oracle.entity.Application;
import com.oracle.entity.Customer;
import com.oracle.entity.Document;
import com.oracle.entity.Loan;
import com.oracle.entity.Roles;




public class CustomerDao {
	private List<Customer> customerList=new ArrayList<Customer>();
	private List<Application> applicationList=new ArrayList<Application>();
	private List<Loan> loanList=new ArrayList<Loan>();
	private List<Document> documentList=new ArrayList<Document>();
	private List<Roles> rolesList=new ArrayList<Roles>();
	
	

	{
		Connection con=DBConnection.getConnect();

		try {
			String sql="select * from Customer";
			PreparedStatement pstmt=con.prepareStatement(sql); 
			ResultSet resultSet=pstmt.executeQuery();
			
			while(resultSet.next()) {
				int custid=resultSet.getInt("custid");
				String name=resultSet.getString("name");
				String gender=resultSet.getString("gender");
				String phoneno=resultSet.getString("phoneno");
				String email=resultSet.getString("email");
				Customer c=new Customer(custid,name,gender,phoneno,email);
				customerList.add(c);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		try {
			String sql="select * from Loan_Application";
			PreparedStatement pstmt=con.prepareStatement(sql); 
			ResultSet resultSet=pstmt.executeQuery();
			
			while(resultSet.next()) {
				int ApplicationId=resultSet.getInt("ApplicationId");
				int  custID=resultSet.getInt("custID");
				String loan_type=resultSet.getString("loan_type");
				int loan_amount=resultSet.getInt("loan_amount");
				String status=resultSet.getString("status");
				String remark=resultSet.getString("remark");
				
				Application a=new Application( ApplicationId,custID,loan_type,loan_amount,status,remark);
				applicationList.add(a);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		try {
			String sql="select * from Loan";
			PreparedStatement pstmt=con.prepareStatement(sql); 
			ResultSet resultSet=pstmt.executeQuery();
			
			while(resultSet.next()) {
				int LoanId=resultSet.getInt("LoanId");
				int  custID=resultSet.getInt("custID");
				String loan_type=resultSet.getString("loan_type");
				int loan_amount=resultSet.getInt("loan_amount");
				
				Loan a=new Loan(LoanId,custID,loan_type,loan_amount);
				loanList.add(a);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		try {
			String sql="select * from Documents";
			PreparedStatement pstmt=con.prepareStatement(sql); 
			ResultSet resultSet=pstmt.executeQuery();
			
			while(resultSet.next()) {
				int ApplicationId=resultSet.getInt("ApplicationId");
				String adhaar=resultSet.getString("adhaar");
				String photo=resultSet.getString("photo");
				String votercard=resultSet.getString("votercard");
				
				Document d=new Document(ApplicationId,adhaar,photo,votercard);
				documentList.add(d);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		try {
			String sql="select * from Roles";
			PreparedStatement pstmt=con.prepareStatement(sql); 
			ResultSet resultSet=pstmt.executeQuery();
			
			while(resultSet.next()) {
				
				String mail=resultSet.getString("mail");
				String password=resultSet.getString("password");
				String role=resultSet.getString("role");
				
				Roles r=new Roles(mail,password,role);
				rolesList.add(r);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		finally {
			try {
				con.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
	


	public List<Loan> getLoanList() {
		return loanList;
	}

	public void setLoanList(List<Loan> loanList) {
		this.loanList = loanList;
	}

	public List<Document> getDocumentList() {
		return documentList;
	}

	public void setDocumentList(List<Document> documentList) {
		this.documentList = documentList;
	}

	public void setCustomerList(List<Customer> customerList) {
		this.customerList = customerList;
	}

	public List<Customer> getCustomerList() {
		return customerList;
	}

	public List<Application> getApplicationList() {
		return applicationList;
	}

	public void setApplicationList(List<Application> applicationList) {
		this.applicationList = applicationList;
	}

	public List<Roles> getRolesList() {
		return rolesList;
	}

	public void setRolesList(List<Roles> rolesList) {
		this.rolesList = rolesList;
	}
	
	
}
