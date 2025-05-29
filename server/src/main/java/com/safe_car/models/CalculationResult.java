package com.safe_car.models;

public class CalculationResult {
    private double premium;

    public CalculationResult() {}
    public CalculationResult(double premium) { this.premium = premium; }

    public double getPremium() { return premium; }
    public void setPremium(double premium) { this.premium = premium; }
} 