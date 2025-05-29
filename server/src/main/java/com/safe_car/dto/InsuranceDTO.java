package com.safe_car.dto;

import com.safe_car.entity.Card;
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
		private String make;

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
	}
}
