package com.safe_car.dto;

import com.safe_car.model.Card;
import jakarta.persistence.Column;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class InsuranceDTO {
	@NotNull
	private Double premium;

	@NotNull
	@Valid
	private CarDetailsDTO carDetails;

	private Boolean saveCard = false;

	@NotNull
	@Valid
	private Card cardDetails;

	@Data
	public static class CarDetailsDTO {
		@NotNull
		@NotBlank
		private String brand;

		@NotNull
		@NotBlank
		private String model;

		@NotNull
		private Integer year;

		@NotNull
		@NotBlank
		private String licensePlate;

		@NotNull
		@NotBlank
		private String coverageType;

		@NotNull
		private Integer previousIncidents;

		@NotNull
		private Integer greenhouseEmissionScore;

		@NotNull
		private Integer horsepower;

		@NotNull
		private Integer mileage;
	}
}
