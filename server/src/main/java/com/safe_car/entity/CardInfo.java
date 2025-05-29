package com.safe_car.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "card_info")
public class CardInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String cardNumber;

    @Column(nullable = false)
    private String expiryDate;

    @Column(nullable = false)
    private String cardholderName;

    @Transient
    private Boolean saveCard = false;

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

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(String expiryDate) {
        this.expiryDate = expiryDate;
    }

    public String getCardholderName() {
        return cardholderName;
    }

    public void setCardholderName(String cardholderName) {
        this.cardholderName = cardholderName;
    }

    public Boolean getSaveCard() {
        return saveCard;
    }

    public CardInfo setSaveCard(Boolean saveCard) {
        this.saveCard = saveCard;
        return this;
    }
}
