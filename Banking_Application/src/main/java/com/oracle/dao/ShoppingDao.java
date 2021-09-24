package com.oracle.dao;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.oracle.entity.Product;
import com.oracle.entity.Review;

public class ShoppingDao {

	private List<Product> productList=new ArrayList<Product>();
	{
		//Assume these data pulled from DB
		Review r1=new Review(991,"Om Sai","Excellent product",4.5f);
		Review r2=new Review(992,"Kavya","Good Product",4.4f);
		Review r3=new Review(993,"Sumit","Try it Good ",4.0f);
		Review r4=new Review(994,"Ankan","Great one ",4.9f);
		Review r5=new Review(995,"Ezaz","Average product",3.5f);
		Review r6=new Review(996,"Harith","Not OK",3.0f);
		Review r7=new Review(997,"Mayank","Nice one",4.6f);
		List<Review> revList1=Arrays.asList(r1,r2,r3); //ArrayList will be in fixed size .....
		List<Review> revList2=Arrays.asList(r4,r5,r6,r7); //ArrayList will be in fixed size .....
		
		Product p1=new Product(101,"T Shirt",999.99f);
		Product p2=new Product(102,"Jeans",2500.99f);
		Product p3=new Product(103,"watch",1500);
		Product p4=new Product(104,"shoes",4000);
		Product p5=new Product(105,"USB",500);
		p1.setReviewList(revList1);
		p2.setReviewList(revList2);
		p3.setReviewList(revList1);
		p4.setReviewList(revList1);
		p5.setReviewList(revList2);
		productList.add(p1);
		productList.add(p2);
		productList.add(p3);
		productList.add(p4);
		productList.add(p5);
	}
	
	
	public List<Product> getAllProducts(){
		return productList;
	}
}