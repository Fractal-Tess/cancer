package com.safe_car.dto;

public class CalculatorResponseDTO {
	private double premium;

	public CalculatorResponseDTO() {
	}

	public CalculatorResponseDTO(double premium) {
		this.premium = premium;
	}

	public double getPremium() {
		return premium;
	}

	public void setPremium(double premium) {
		this.premium = premium;
	}
}
