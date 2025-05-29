package com.safe_car.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "insurances")
public class Insurance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String vehicleName;

    @Column(nullable = false)
    private String carMake;

    @Column(nullable = false)
    private String carModel;

    @Column(nullable = false)
    private Integer carYear;

    @Column(nullable = false)
    private String licensePlate;

    @Column(nullable = false)
    private String coverageType;

    @Column(nullable = false)
    private String policyNumber;

    @Column(nullable = false)
    private LocalDate startDate;

    @Column(nullable = false)
    private LocalDate endDate;

    @Column(nullable = false)
    private Double premium;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private InsuranceStatus status;

    public enum InsuranceStatus {
        ACTIVE,
        EXPIRED,
        CANCELLED
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getVehicleName() {
        return vehicleName;
    }

    public void setVehicleName(String vehicleName) {
        this.vehicleName = vehicleName;
    }

    public String getCarMake() {
        return carMake;
    }

    public void setCarMake(String carMake) {
        this.carMake = carMake;
    }

    public String getCarModel() {
        return carModel;
    }

    public void setCarModel(String carModel) {
        this.carModel = carModel;
    }

    public Integer getCarYear() {
        return carYear;
    }

    public void setCarYear(Integer carYear) {
        this.carYear = carYear;
    }

    public String getLicensePlate() {
        return licensePlate;
    }

    public void setLicensePlate(String licensePlate) {
        this.licensePlate = licensePlate;
    }

    public String getCoverageType() {
        return coverageType;
    }

    public void setCoverageType(String coverageType) {
        this.coverageType = coverageType;
    }

    public String getPolicyNumber() {
        return policyNumber;
    }

    public void setPolicyNumber(String policyNumber) {
        this.policyNumber = policyNumber;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public Double getPremium() {
        return premium;
    }

    public void setPremium(Double premium) {
        this.premium = premium;
    }

    public InsuranceStatus getStatus() {
        return status;
    }

    public void setStatus(InsuranceStatus status) {
        this.status = status;
    }
}