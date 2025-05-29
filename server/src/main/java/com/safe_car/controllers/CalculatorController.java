package com.safe_car.controllers;

import com.safe_car.models.CalculationRequest;
import com.safe_car.models.CalculationResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/calculator")
public class CalculatorController {
    @PostMapping("/calculate")
    public CalculationResult calculate(@RequestBody CalculationRequest request) {
        // Simple example calculation logic
        double basePremium = 500.0;
        double ageFactor = (request.getDriverAge() < 25) ? 1.5 : 1.0;
        double yearFactor = (2024 - request.getCarYear()) * 10;
        double premium = basePremium * ageFactor + yearFactor;
        return new CalculationResult(premium);
    }
} 