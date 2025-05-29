package com.safe_car.dto;

public class CalculatorRequestDTO {
	private String make;
	private String model;
	private int year;
	private int driverAge;
	private int horsepower;
	private int mileage;
	private int greenScore;
	private int previousIncidents;
	private String coverageType;

	// Getters and Setters
	public String getMake() {
		return make;
	}

	public void setMake(String make) {
		this.make = make;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public int getDriverAge() {
		return driverAge;
	}

	public void setDriverAge(int driverAge) {
		this.driverAge = driverAge;
	}

	public int getHorsepower() {
		return horsepower;
	}

	public void setHorsepower(int horsepower) {
		this.horsepower = horsepower;
	}

	public int getMileage() {
		return mileage;
	}

	public void setMileage(int mileage) {
		this.mileage = mileage;
	}

	public int getGreenScore() {
		return greenScore;
	}

	public void setGreenScore(int greenScore) {
		this.greenScore = greenScore;
	}

	public int getPreviousIncidents() {
		return previousIncidents;
	}

	public void setPreviousIncidents(int previousIncidents) {
		this.previousIncidents = previousIncidents;
	}

	public String getCoverageType() {
		return coverageType;
	}

	public void setCoverageType(String coverageType) {
		this.coverageType = coverageType;
	}
}
