package com.safe_car.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CardDTO {
	@NotNull
	private Long userId;

	@NotNull
	@NotBlank
	private String cardNumber;

	@NotNull
	@NotBlank
	private String expiryDate;

	@NotNull
	@NotBlank
	private String cardholderName;

	private Boolean saveCard = false;
}
