package com.safe_car.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data @AllArgsConstructor @NoArgsConstructor public class ErrorDetails {
	private String message;
	private LocalDate timestamp;
}
