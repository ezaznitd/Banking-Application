package com.oracle.entity;

public class Roles {
	private String mail;
	private String password;
	private String role;
	public Roles()
	{
		
	}
	
	public Roles(String mail, String password, String role) {
		super();
		this.mail = mail;
		this.password = password;
		this.role = role;
	}

	public String getMail() {
		return mail;
	}
	public void setMail(String mail) {
		this.mail = mail;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}

}
