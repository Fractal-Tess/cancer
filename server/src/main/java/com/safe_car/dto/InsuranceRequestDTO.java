package com.safe_car.dto;

import com.safe_car.entity.CardInfo;

import java.util.Map;

public class InsuranceRequestDTO {
	private Double premium;
	private Map<String, Object> carDetails;
	private Boolean saveCard;
	private CardInfo cardDetails;

	// Getters and Setters
	public Double getPremium() {
		return premium;
	}

	public void setPremium(Double premium) {
		this.premium = premium;
	}

	public Map<String, Object> getCarDetails() {
		return carDetails;
	}

	public void setCarDetails(Map<String, Object> carDetails) {
		this.carDetails = carDetails;
	}

	public CardInfo getCardDetails() {
		return cardDetails;
	}

	public void setCardDetails(CardInfo cardDetails) {
		this.cardDetails = cardDetails;
	}

	public Boolean getSaveCard() {
		return saveCard;
	}

	public InsuranceRequestDTO setSaveCard(Boolean saveCard) {
		this.saveCard = saveCard;
		return this;
	}
}
