package com.oracle.entity;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Review {
	private int reviewId;
	private String reviewerName;
	private String comment;
	private float rating;
	public Review() {
		
	}
	public Review(int reviewId, String reviewerName, String comment, float rating) {
		super();
		this.reviewId = reviewId;
		this.reviewerName = reviewerName;
		this.comment = comment;
		this.rating = rating;
	}
	public int getReviewId() {
		return reviewId;
	}
	public void setReviewId(int reviewId) {
		this.reviewId = reviewId;
	}
	public String getReviewerName() {
		return reviewerName;
	}
	public void setReviewerName(String reviewerName) {
		this.reviewerName = reviewerName;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public float getRating() {
		return rating;
	}
	public void setRating(float rating) {
		this.rating = rating;
	}
}
