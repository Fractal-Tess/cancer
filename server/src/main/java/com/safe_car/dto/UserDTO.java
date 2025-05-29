package com.safe_car.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UserDTO {
	private String username;

	@NotNull
	@NotBlank
	private String password;

	@NotNull
	@NotBlank
	@Email
	private String email;
}
