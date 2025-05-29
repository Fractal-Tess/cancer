package com.safe_car.dto;

public class CalculatorResponse {
    private double premium;

    public CalculatorResponse() {
    }

    public CalculatorResponse(double premium) {
        this.premium = premium;
    }

    public double getPremium() {
        return premium;
    }

    public void setPremium(double premium) {
        this.premium = premium;
    }
}