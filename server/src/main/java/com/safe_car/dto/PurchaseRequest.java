package com.safe_car.dto;

public class PurchaseRequest {
    private double premium;
    private CarDetails carDetails;
    private CardDetails cardDetails;

    public static class CarDetails {
        private String make;
        private String model;
        private int year;
        private int horsepower;
        private int mileage;
        private int greenScore;
        private int previousIncidents;

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
    }

    public static class CardDetails {
        private String cardNumber;
        private String expiryDate;
        private String cvv;
        private String cardholderName;
        private boolean saveCard;

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

        public boolean isSaveCard() {
            return saveCard;
        }

        public void setSaveCard(boolean saveCard) {
            this.saveCard = saveCard;
        }
    }

    // Getters and Setters
    public double getPremium() {
        return premium;
    }

    public void setPremium(double premium) {
        this.premium = premium;
    }

    public CarDetails getCarDetails() {
        return carDetails;
    }

    public void setCarDetails(CarDetails carDetails) {
        this.carDetails = carDetails;
    }

    public CardDetails getCardDetails() {
        return cardDetails;
    }

    public void setCardDetails(CardDetails cardDetails) {
        this.cardDetails = cardDetails;
    }
}