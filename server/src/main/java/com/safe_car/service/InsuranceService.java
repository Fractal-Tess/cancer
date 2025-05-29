package com.safe_car.service;

import com.safe_car.dto.InsurancePurchaseRequest;
import com.safe_car.entity.Insurance;
import com.safe_car.entity.CardInfo;
import com.safe_car.repositories.InsuranceRepository;
import com.safe_car.repositories.CardInfoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class InsuranceService {

    @Autowired
    private InsuranceRepository insuranceRepository;

    @Autowired
    private CardInfoRepository cardInfoRepository;

    @Transactional
    public Insurance purchaseInsurance(String username, InsurancePurchaseRequest request) {
        Map<String, Object> carDetails = request.getCarDetails();

        // Save card info if requested
        InsurancePurchaseRequest.CardDetails cardDetails = request.getCardDetails();
        if (cardDetails != null && hasSaveCard(cardDetails)) {
            CardInfo cardInfo = new CardInfo();
            cardInfo.setUsername(username);
            cardInfo.setCardNumber(cardDetails.getCardNumber());
            cardInfo.setCardholderName(cardDetails.getCardholderName());
            // Parse expiry date MM/YY
            cardInfo.setExpiryDate(parseExpiry(cardDetails.getExpiryDate()));
            cardInfoRepository.save(cardInfo);
        }

        Insurance insurance = new Insurance();
        insurance.setUsername(username);
        insurance.setVehicleName(carDetails.get("make") + " " + carDetails.get("model"));
        insurance.setCarMake((String) carDetails.get("make"));
        insurance.setCarModel((String) carDetails.get("model"));
        insurance.setCarYear((Integer) carDetails.get("year"));
        insurance.setLicensePlate((String) carDetails.get("licensePlate"));
        insurance.setCoverageType((String) carDetails.get("coverageType"));
        insurance.setPolicyNumber(generatePolicyNumber());
        insurance.setStartDate(LocalDate.now());
        insurance.setEndDate(LocalDate.now().plusYears(1));
        insurance.setPremium(request.getPremium());
        insurance.setStatus(Insurance.InsuranceStatus.ACTIVE);

        return insuranceRepository.save(insurance);
    }

    private boolean hasSaveCard(InsurancePurchaseRequest.CardDetails cardDetails) {
        try {
            java.lang.reflect.Method m = cardDetails.getClass().getMethod("getSaveCard");
            Object result = m.invoke(cardDetails);
            return result instanceof Boolean && (Boolean) result;
        } catch (Exception e) {
            return false;
        }
    }

    private LocalDate parseExpiry(String expiry) {
        if (expiry == null)
            return null;
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/yy");
        try {
            return LocalDate.parse("01/" + expiry, DateTimeFormatter.ofPattern("dd/MM/yy"));
        } catch (Exception e) {
            return null;
        }
    }

    public List<Insurance> getUserInsurances(String username) {
        return insuranceRepository.findByUsername(username);
    }

    public List<Insurance> getUserInsurancesByStatus(String username, Insurance.InsuranceStatus status) {
        return insuranceRepository.findByUsernameAndStatus(username, status);
    }

    @Transactional
    public void cancelInsurance(Long insuranceId, String username) {
        Insurance insurance = insuranceRepository.findById(insuranceId)
                .orElseThrow(() -> new RuntimeException("Insurance not found"));

        if (!insurance.getUsername().equals(username)) {
            throw new RuntimeException("Unauthorized to cancel this insurance");
        }

        if (insurance.getStatus() != Insurance.InsuranceStatus.ACTIVE) {
            throw new RuntimeException("Only active insurances can be cancelled");
        }

        insurance.setStatus(Insurance.InsuranceStatus.CANCELLED);
        insuranceRepository.save(insurance);
    }

    private String generatePolicyNumber() {
        return "POL-" + LocalDate.now().getYear() + "-" + UUID.randomUUID().toString().substring(0, 8);
    }
}