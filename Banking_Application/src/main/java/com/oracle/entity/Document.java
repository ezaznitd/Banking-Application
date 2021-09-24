package com.oracle.entity;

public class Document {
	private int applicationId;
	private String adhaarCard; 
	private String photo;
	private String voterCard;
	public Document()
	{
		
	}
	public Document(int applicationId, String adhaarCard, String photo, String voterCard) {
		super();
		this.applicationId = applicationId;
		this.adhaarCard = adhaarCard;
		this.photo = photo;
		this.voterCard = voterCard;
	}
	public int getApplicationId() {
		return applicationId;
	}
	public void setApplicationId(int applicationId) {
		this.applicationId = applicationId;
	}
	public String getAdhaarCard() {
		return adhaarCard;
	}
	public void setAdhaarCard(String adhaarCard) {
		this.adhaarCard = adhaarCard;
	}
	public String getPhoto() {
		return photo;
	}
	public void setPhoto(String photo) {
		this.photo = photo;
	}
	public String getVoterCard() {
		return voterCard;
	}
	public void setVoterCard(String voterCard) {
		this.voterCard = voterCard;
	}
	
	

}
