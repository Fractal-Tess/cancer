package com.safe_car.controllers;

import com.safe_car.dto.CalculatorRequestDTO;
import com.safe_car.dto.CalculatorResponseDTO;
import com.safe_car.service.CalculatorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/calculator")
@RequiredArgsConstructor
public class CalculatorController {
	private final CalculatorService calculatorService;

	@PostMapping("/calculate")
	public ResponseEntity<CalculatorResponseDTO> calculatePremium(@RequestBody CalculatorRequestDTO request) {
		CalculatorResponseDTO response = calculatorService.calculatePremium(request);
		return ResponseEntity.ok(response);
	}
}
