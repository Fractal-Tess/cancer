package com.safe_car.controllers;

import com.safe_car.service.CalculatorService;
import com.safe_car.dto.CalculatorRequestDTO;
import com.safe_car.dto.CalculatorResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/calculator")
public class CalculatorController {

    private final CalculatorService calculatorService;

    @Autowired
    public CalculatorController(CalculatorService calculatorService) {
        this.calculatorService = calculatorService;
    }

    @PostMapping("/calculate")
    public ResponseEntity<CalculatorResponse> calculatePremium(@RequestBody CalculatorRequestDTO request) {
        CalculatorResponse response = calculatorService.calculatePremium(request);
        return ResponseEntity.ok(response);
    }
}
