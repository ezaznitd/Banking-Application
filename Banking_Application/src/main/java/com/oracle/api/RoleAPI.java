package com.oracle.api;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
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
import com.oracle.entity.Roles;

@Path("/roles")
public class RoleAPI {
	CustomerDao dao= new CustomerDao();
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Roles> getRolesList(){
		return dao.getRolesList();
	}
	

}
