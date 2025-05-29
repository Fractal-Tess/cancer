package com.safe_car.dto;

import lombok.Data;

@Data public class CalculatorRequestDTO {
	private String make;
	private String model;
	private int year;
	private int driverAge;
	private int horsepower;
	private int mileage;
	private int greenScore;
	private int previousIncidents;
	private String coverageType;
}
