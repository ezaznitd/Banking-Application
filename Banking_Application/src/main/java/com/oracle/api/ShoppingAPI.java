package com.oracle.api;

import java.util.List;
import java.util.Optional;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.oracle.dao.ShoppingDao;
import com.oracle.entity.Product;
import com.oracle.entity.Review;
import com.oracle.exceptions.ProductNotFoundException;

@Path("/products")
public class ShoppingAPI {
	ShoppingDao dao=new ShoppingDao();
	/*@GET
	public String testAPI() {
		return "Our shopping api works properly";
	}*/
	
	@GET
	@Path("/relevantProduct")
	@Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
	public Product sampleProduct() {
		return new Product(101, "T Shirt", 999.9f);
	}
	
	@GET
	@Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
	public List<Product> listProducts() {
		return dao.getAllProducts();
	}
	
	@POST
	@Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
	@Consumes(MediaType.APPLICATION_JSON)
	public List<Product> addNewProduct(Product p){
		List<Product> plist=dao.getAllProducts();
		plist.add(p);
		return plist;
	}
	
	@Path("/{pid}/price/{price}")
	@PUT
	@Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
	public Product updateProductPrice(@PathParam("pid")  int prodid,@PathParam("price") float newPrice) {
		List<Product> plist=dao.getAllProducts();
		Product product=plist.stream().filter(p->p.getProductId()==prodid).findFirst().get();
		product.setPrice(newPrice);
		return product;

	}
	@Path("/{pid}")
	@DELETE
	@Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
	public List<Product> deleteProductById(@PathParam("pid") int prodid){
		List<Product> plist=dao.getAllProducts();
		Product product=plist.stream().filter(p->p.getProductId()==prodid).findFirst().get();
		plist.remove(product);
		return plist;

	}
	
	@Path("/{productId}")
	@GET
	@Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
	public Product getProductById(@PathParam("productId")  int productId) {
		List<Product> plist=dao.getAllProducts();
		Optional<Product>optionalProduct=plist.stream().filter(p->p.getProductId()==productId).findFirst();
		if(optionalProduct.isPresent())
			return optionalProduct.get();
		else
			throw new ProductNotFoundException("The product "+productId+" Not Found");
	}
	
	@Path("/{productId}/reviews")
	@GET
	@Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
	public List<Review> getReviews(@PathParam("productId")  int productId) {
		List<Product> plist1=dao.getAllProducts();
		Product product1=plist1.stream().filter(p->p.getProductId()==productId).findFirst().get();
		return product1.getReviewList();
	}
	
	@Path("/{productId}/reviews/{reviewId}")
	@GET
	@Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
	public Review getReviewById(@PathParam("productId")  int productId, @PathParam("reviewId")  int reviewId) {
		List<Product> plist2=dao.getAllProducts();
		Product product2=plist2.stream().filter(p->p.getProductId()==productId).findFirst().get();
		List<Review> rList=product2.getReviewList();
		Review review=rList.stream().filter(r->r.getReviewId()==reviewId).findFirst().get();
		return review;
	}
}
