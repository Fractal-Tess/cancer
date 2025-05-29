package com.safe_car.models;

public class CalculationRequest {
    private String carMake;
    private String carModel;
    private int carYear;
    private int driverAge;

    public CalculationRequest() {}

    public String getCarMake() { return carMake; }
    public void setCarMake(String carMake) { this.carMake = carMake; }
    public String getCarModel() { return carModel; }
    public void setCarModel(String carModel) { this.carModel = carModel; }
    public int getCarYear() { return carYear; }
    public void setCarYear(int carYear) { this.carYear = carYear; }
    public int getDriverAge() { return driverAge; }
    public void setDriverAge(int driverAge) { this.driverAge = driverAge; }
} 