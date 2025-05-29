package com.safe_car.dto;

import java.util.Map;

public class InsurancePurchaseRequest {
    private Double premium;
    private Map<String, Object> carDetails;
    private CardDetails cardDetails;

    public static class CardDetails {
        private String cardNumber;
        private String expiryDate;
        private String cvv;
        private String cardholderName;

        // Getters and Setters
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

        public String getCvv() {
            return cvv;
        }

        public void setCvv(String cvv) {
            this.cvv = cvv;
        }

        public String getCardholderName() {
            return cardholderName;
        }

        public void setCardholderName(String cardholderName) {
            this.cardholderName = cardholderName;
        }
    }

    // Getters and Setters
    public Double getPremium() {
        return premium;
    }

    public void setPremium(Double premium) {
        this.premium = premium;
    }

    public Map<String, Object> getCarDetails() {
        return carDetails;
    }

    public void setCarDetails(Map<String, Object> carDetails) {
        this.carDetails = carDetails;
    }

    public CardDetails getCardDetails() {
        return cardDetails;
    }

    public void setCardDetails(CardDetails cardDetails) {
        this.cardDetails = cardDetails;
    }
}