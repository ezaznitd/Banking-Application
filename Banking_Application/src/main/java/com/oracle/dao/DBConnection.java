package com.oracle.dao;


import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnection {
	public static void main(String[] args) {
		getConnect();
		
	}
	public static Connection getConnect() {
		Connection con=null;
		try {
			Class.forName("oracle.jdbc.driver.OracleDriver");
			System.out.println("Driver loaded successfully .....");
			
			//to esabilish connection with a nw
			//need url, username and pwd
			//sample url : http://google.com:80
			String url="jdbc:oracle:thin:@localhost:1521:ORCL";
			String uname="hr";
			String pwd="hr";
			con=DriverManager.getConnection(url,uname,pwd);
			System.out.println("Connected successfully with oracle .....");
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return con;
		
	}
}

