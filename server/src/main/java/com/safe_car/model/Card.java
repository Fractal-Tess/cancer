package com.safe_car.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "card_info")
@Data
public class Card {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private Long userId;

	@Column(nullable = false)
	private String cardNumber;

	@Column(nullable = false)
	private String expiryDate;

	@Column(nullable = false)
	private String cardholderName;
}
