package com.safe_car.service;

import com.safe_car.dto.CalculatorRequest;
import com.safe_car.dto.CalculatorResponse;
import org.springframework.stereotype.Service;

@Service
public class CalculatorService {

    private static final double BASE_PREMIUM = 500.0;
    private static final double GREEN_SCORE_FACTOR = 2.0;
    private static final double INCIDENT_FACTOR = 250.0;
    private static final double AGE_FACTOR = 5.0;

    public CalculatorResponse calculatePremium(CalculatorRequest request) {
        double premium = BASE_PREMIUM;

        // Apply coverage type multiplier
        switch (request.getCoverageType().toLowerCase()) {
            case "basic":
                premium *= 1.0; // Base multiplier
                break;
            case "standard":
                premium *= 1.3; // 30% more coverage
                break;
            case "comprehensive":
                premium *= 1.6; // 60% more coverage
                break;
            case "premium":
                premium *= 2.0; // Double coverage
                break;
            default:
                premium *= 1.0; // Default to basic if invalid type
        }

        // Horsepower adjustment (higher horsepower = higher premium)
        // For every 100 HP, add $100 to premium
        premium += (request.getHorsepower() / 100.0) * 100;

        // Mileage adjustment (higher mileage = higher premium)
        // For every 5000 miles, add $50 to premium
        premium += (request.getMileage() / 5000.0) * 50;

        // Green score discount (higher score = lower premium)
        // For every point in green score, reduce premium by $2
        premium -= request.getGreenScore() * GREEN_SCORE_FACTOR;

        // Previous incidents adjustment (more incidents = higher premium)
        // Each incident adds $250 to premium
        premium += request.getPreviousIncidents() * INCIDENT_FACTOR;

        // Age adjustment (younger drivers = higher premium)
        // For each year under 25, add $5 to premium
        if (request.getDriverAge() < 25) {
            premium += (25 - request.getDriverAge()) * AGE_FACTOR;
        }

        // Vehicle age adjustment (older vehicles = higher premium)
        // For each year of vehicle age, add $25 to premium
        int vehicleAge = java.time.Year.now().getValue() - request.getYear();
        premium += vehicleAge * 25;

        // Round to 2 decimal places
        premium = Math.round(premium * 100.0) / 100.0;

        // Ensure minimum premium
        return new CalculatorResponse(Math.max(premium, 100.0));
    }
}