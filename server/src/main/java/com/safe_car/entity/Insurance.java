package com.safe_car.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity @Table(name = "insurances") @Data public class Insurance {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;

	@Column(nullable = false) private String username;

	@Column(nullable = false) private String vehicleName;

	@Column(nullable = false) private String carMake;

	@Column(nullable = false) private String carModel;

	@Column(nullable = false) private Integer carYear;

	@Column(nullable = false) private String licensePlate;

	@Column(nullable = false) private String coverageType;

	@Column(nullable = false) private String policyNumber;

	@Column(nullable = false) private LocalDate startDate;

	@Column(nullable = false) private LocalDate endDate;

	@Column(nullable = false) private Double premium;

	@Column(nullable = false) @Enumerated(EnumType.STRING) private InsuranceStatus status;

	public enum InsuranceStatus {
		ACTIVE, EXPIRED, CANCELLED
	}
}
