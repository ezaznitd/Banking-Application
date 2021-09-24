package com.oracle.api;

import org.glassfish.jersey.server.ResourceConfig;

import com.oracle.exception.handler.ExceptionHandler;



public class ApplicationConfig extends ResourceConfig{

	public ApplicationConfig() {
		register(ExceptionHandler.class);
	}

}