package com.oracle.api;

import java.security.SecureRandom;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
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
import com.oracle.mailer.Mail;

@Path("/manager")
public class ManagerAPI {
	CustomerDao dao= new CustomerDao();
	@GET
	public String testAPI() {
		return "Welcome to Manager";
	}
	@Path("/customers")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Customer> listCustomers(){
		return dao.getCustomerList();
	}
	@Path("/loans")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Loan> getLoanDetails(){
		List<Loan> llist=dao.getLoanList();
		return llist;
	}
	@Path("/applications")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Application> listApplications(){
		List<Application> alist=dao.getApplicationList();
		return alist;
	}
	
	@Path("/applications/{aid}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Application getByApplicationId(@PathParam("aid")  int applicationId){
		List<Application> alist=dao.getApplicationList();
		Application a=alist.stream().filter(app->app.getApplicationId()==applicationId).findFirst().get();
		return a;
		
	}
	
	
	@Path("/applications/{aid}/documents")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Document getDocument(@PathParam("aid")  int applicationId){
		List<Document> dlist=dao.getDocumentList();
		Document d=dlist.stream().filter(doc->doc.getApplicationId()==applicationId).findFirst().get();
		return d;
	}

	@Path("/applications/{aid}/{rem}/approve")
	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes({MediaType.APPLICATION_JSON})
	public Loan approveApplication(@PathParam("aid")  int applicationId,@PathParam("rem") String comment){
		Connection con=DBConnection.getConnect();
		SecureRandom random = new SecureRandom();
		int num = random.nextInt(10000);
		List<Application> alist=dao.getApplicationList();
		Loan l= new Loan();
		Application a=alist.stream().filter(app->app.getApplicationId()==applicationId).findFirst().get();
		String sql="insert into loan values(?,?,?,?)";
		String sqlUpdateApplication="update loan_application set status='Approved',remark=? where applicationid=?";
		
		try {
			//STEP 3
			PreparedStatement pstmt=con.prepareStatement(sql);
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
			pstmt2.setString(1,comment);
			pstmt2.setInt(2,a.getApplicationId());
			int p2=pstmt2.executeUpdate(); //fires the query in DB ...
			System.out.println(p2+" no of row(s) affected ....");
			a.setStatus("Approved");
			a.setRemark(comment);
			
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
			mail.draftEmail(c.getEmail(),"Approval Mail",comment);
			mail.sendEmail("ezazhossain615@gmail.com", "Hossain80039");
		
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
	return l;
	}

	@Path("/applications/{aid}/{rem}/reject")
	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes({MediaType.APPLICATION_JSON})
	public Application rejectApplication(@PathParam("aid")  int applicationId,@PathParam("rem") String comment){
		Connection con=DBConnection.getConnect();
		List<Application> alist=dao.getApplicationList();
		Application a=alist.stream().filter(app->app.getApplicationId()==applicationId).findFirst().get();
		String sqlUpdateApplication="update loan_application set status='Rejected',remark=? where applicationid=?";
		
		try {
			PreparedStatement pstmt2=con.prepareStatement(sqlUpdateApplication);
			pstmt2.setString(1,comment);
			pstmt2.setInt(2,a.getApplicationId());
			int p2=pstmt2.executeUpdate(); //fires the query in DB ...
			System.out.println(p2+" no of row(s) affected ....");
			a.setStatus("Rejected");
			a.setRemark(comment);
			
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
		try
		{
		List<Customer> clist=dao.getCustomerList();
		Customer c=clist.stream().filter(cust->cust.getCustomerId()==a.getCustomerId()).findFirst().get();

		Mail mail = new Mail();
		mail.setupServerProperties();
		mail.draftEmail(c.getEmail(),"Rejection Mail",comment);
		mail.sendEmail("ezazhossain615@gmail.com", "Hossain80039");
		
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
	return a;
	}
}
