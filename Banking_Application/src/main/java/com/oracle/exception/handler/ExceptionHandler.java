package com.oracle.exception.handler;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;

import com.oracle.exceptions.DataNotFoundException;
//Act as a Catch Block ......
public class ExceptionHandler implements ExceptionMapper<DataNotFoundException> {
	
	public Response toResponse(DataNotFoundException arg0) {
		String jsonText="{ \"msg\":\"Product not found\"}";
		
		return Response.status(404).entity(jsonText).build();
	}

}

