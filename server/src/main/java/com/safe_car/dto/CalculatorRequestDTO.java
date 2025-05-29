package com.safe_car.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CalculatorRequestDTO {
	@NotNull
	@NotBlank
	private String make;

	@NotNull
	@NotBlank
	private String model;

	@NotNull
	private int year;

	@NotNull
	private int driverAge;

	@NotNull
	private int horsepower;

	@NotNull
	private int mileage;

	@NotNull
	private int greenScore;

	@NotNull
	private int previousIncidents;

	@NotNull
	@NotBlank
	private String coverageType;
}
