package com.oracle.api;

import java.security.SecureRandom;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.oracle.dao.CustomerDao;
import com.oracle.dao.DBConnection;
import com.oracle.entity.Application;
import com.oracle.entity.Customer;
import com.oracle.entity.Document;
import com.oracle.entity.Loan;
import com.oracle.entity.LoanDetails;
import com.oracle.mailer.Mail;


@Path("/clerk")
public class ClerkAPI {
	CustomerDao dao= new CustomerDao();
	@GET
	public String testAPI() {
		return "Welcome to Clerk";
	}
	
	@Path("/customers")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Customer> listCustomers(){
		return dao.getCustomerList();
	}
	
	@Path("/customers/{cid}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Customer getByCustomerId(@PathParam("cid")  int customerId){
		List<Customer> clist=dao.getCustomerList();
		Customer c=clist.stream().filter(cust->cust.getCustomerId()==customerId).findFirst().get();
		return c;
		
	}
	@Path("/customers/{cid}/loans")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Loan> getLoanDetails(@PathParam("cid")  int customerId){
		List<Loan> llist=dao.getLoanList();
		List<Loan> filterLList=new ArrayList<Loan>();
		llist.stream().filter(ln->ln.getCustomerId()==customerId).forEach(ln->filterLList.add(ln));
		return filterLList;
		
	}
	@Path("/customers/{cid}/applications")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Application> getApplications(@PathParam("cid")  int customerId){
		List<Application> alist=dao.getApplicationList();
		List<Application> filterAList=new ArrayList<Application>();
		alist.stream().filter(app->app.getCustomerId()==customerId).forEach(app->filterAList.add(app));
		return filterAList;
		
	}
	@Path("/customers/{cid}/applications/{aid}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Application getApplicationById(@PathParam("cid")  int customerId,@PathParam("aid")  int applicationId){
		List<Application> alist=dao.getApplicationList();
		List<Application> filterAList=new ArrayList<Application>();
		alist.stream().filter(a->a.getCustomerId()==customerId).forEach(a->filterAList.add(a));
		
		Application a=filterAList.stream().filter(app->app.getApplicationId()==applicationId).findFirst().get();
		
		return a;
		
	}
	@Path("/customers/{cid}/applications/{aid}/documents")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Document getDocument(@PathParam("aid")  int applicationId){
		
		List<Document> dlist=dao.getDocumentList();
		
		
		Document d=dlist.stream().filter(doc->doc.getApplicationId()==applicationId).findFirst().get();
		System.out.println(d.getAdhaarCard());
		return d;
		
	}
	
	@Path("/customers")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public List<Customer> addNewCustomer(Customer c) {
		Connection con=DBConnection.getConnect();
		String sql="insert into customer values(?,?,?,?,?)";
		
		try {
			//STEP 3
			PreparedStatement pstmt=con.prepareStatement(sql);
			pstmt.setInt(1, c.getCustomerId());
			pstmt.setString(2, c.getCustomerName());
			pstmt.setString(3, c.getGender());
			pstmt.setString(4, c.getPhoneNo());
			pstmt.setString(5, c.getEmail());
			//u can do insert/update/delete query
			int p=pstmt.executeUpdate(); //fires the query in DB ....
			System.out.println(p+" no of row(s) affected ....");
			
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
	
		List<Customer> Clist = dao.getCustomerList();
		Clist.add(c);
		try
		{
			String comment = "Congratulation! New Customer Id is successfully created. Your customer id is : " 
					+ Integer.toString(c.getCustomerId());
			Mail mail = new Mail();
			mail.setupServerProperties();
			mail.draftEmail(c.getEmail(),"Customer Account Creation Confirmation Mail",comment);
			mail.sendEmail("ezazhossain615@gmail.com", "Hossain80039");
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		return Clist;
		
	}
	@Path("/customers/{cid}/applications")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public List<Application> addNewApplication(@PathParam("cid")  int customerId,Application a) {
		Connection con=DBConnection.getConnect();
		String sql="insert into loan_application values(?,?,?,?,?,?)";
		
		try {
			//STEP 3
			PreparedStatement pstmt=con.prepareStatement(sql);
			pstmt.setInt(1, a.getApplicationId());
			pstmt.setInt(2, a.getCustomerId());
			pstmt.setString(3, a.getLoanType());
			pstmt.setInt(4, a.getLoanAmount());
			pstmt.setString(5, a.getStatus());
			pstmt.setString(6, a.getRemark());
			
			//u can do insert/update/delete query
			int p=pstmt.executeUpdate(); //fires the query in DB ....
			System.out.println(p+" no of row(s) affected ....");
			
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
		ValidationClass v = new ValidationClass();
		if(v.validate(a.getLoanAmount()))
		{
			con=DBConnection.getConnect();
			SecureRandom random = new SecureRandom();
			int num = random.nextInt(10000);
			Loan l= new Loan();
			String sqlLoan="insert into loan values(?,?,?,?)";
			String sqlUpdateApplication="update loan_application set status='Approved',remark='Directly Approved' where applicationid=?";
			
			try {
				//STEP 3
				PreparedStatement pstmt=con.prepareStatement(sqlLoan);
				pstmt.setInt(1, num);
				pstmt.setInt(2,a.getCustomerId());
				pstmt.setString(3, a.getLoanType());
				pstmt.setInt(4, a.getLoanAmount());
				l.setLoanId(num);
				l.setCustomerId(a.getCustomerId());
				l.setLoanType(a.getLoanType());
				l.setLoanAmount(a.getLoanAmount());
				
				
				//u can do insert/update/delete query
				int p=pstmt.executeUpdate(); //fires the query in DB ....
				System.out.println(p+" no of row(s) affected ....");
				PreparedStatement pstmt2=con.prepareStatement(sqlUpdateApplication);
				pstmt2.setInt(1,a.getApplicationId());
				int p2=pstmt2.executeUpdate(); //fires the query in DB ...
				System.out.println(p2+" no of row(s) affected ....");
				a.setStatus("Approved");
				a.setRemark("Directly Approved");
				
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			catch(Exception e)
			{
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
			try
			{
			List<Customer> clist=dao.getCustomerList();
			Customer c=clist.stream().filter(cust->cust.getCustomerId()==a.getCustomerId()).findFirst().get();
			Mail mail = new Mail();
			mail.setupServerProperties();
			mail.draftEmail(c.getEmail(),"Approval Mail",a.getRemark());
			mail.sendEmail("user id", "password");
			
			}
			catch(Exception e)
			{
				e.printStackTrace();
			}
		}
	
		List<Application> alist=dao.getApplicationList();
		List<Application> filterAList=new ArrayList<Application>();
		alist.stream().filter(app->app.getCustomerId()==customerId).forEach(app->filterAList.add(app));
		filterAList.add(a);
		return filterAList;
		
	}
	@Path("/customers/{cid}/applications/{aid}/documents")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Document addNewDocuments(@PathParam("aid")  int applicationId,Document d) {
		Connection con=DBConnection.getConnect();
		String sql="insert into documents values(?,?,?,?)";
		
		try {
			//STEP 3
			PreparedStatement pstmt=con.prepareStatement(sql);
			pstmt.setInt(1, d.getApplicationId());
			pstmt.setString(2, d.getAdhaarCard());
			pstmt.setString(3,d.getPhoto());
			pstmt.setString(4,d.getVoterCard());
			//u can do insert/update/delete query
			int p=pstmt.executeUpdate(); //fires the query in DB ....
			System.out.println(p+" no of row(s) affected ....");
			
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
		List<Document> dlist=dao.getDocumentList();
		dlist.add(d);
		
		Document document=dlist.stream().filter(doc->doc.getApplicationId()==applicationId).findFirst().get();
		
		return document;
		
	}
	

}
