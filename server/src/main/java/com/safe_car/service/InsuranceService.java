package com.safe_car.service;

import com.safe_car.dto.InsuranceDTO;
import com.safe_car.mapper.CardMapper;
import com.safe_car.mapper.InsuranceMapper;
import com.safe_car.model.Card;
import com.safe_car.model.Insurance;
import com.safe_car.model.User;
import com.safe_car.repositories.CardRepository;
import com.safe_car.repositories.InsuranceRepository;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class InsuranceService {
	private final InsuranceRepository insuranceRepository;
	private final CardRepository cardRepository;
	private final InsuranceMapper insuranceMapper;
	private final UserService userService;
	private final CardMapper cardMapper;

	@Transactional
	public Insurance purchaseInsurance(HttpSession session, InsuranceDTO dto) {
		User user = userService.getAuthenticated(session);

		// Save card info if requested
		if (dto.getCardDetails().getSaveCard()) {
			var cardInfo = dto.getCardDetails();
			cardInfo.setUserId(user.getId());
			var card = cardMapper.toEntity(cardInfo);
			cardRepository.save(card);
		} else {
			Long cardId = dto.getCardDetails().getId();
			if (cardId == null) {
				throw new IllegalArgumentException("Card id is null");
			}
			Optional<Card> card = cardRepository.findById(cardId);
			if (card.isEmpty()) {
				throw new IllegalArgumentException("Card not found");
			}
			if (!card.get().getCvv().equals(dto.getCardDetails().getCvv())) {
				throw new IllegalStateException("Card cvv does not match");
			}
		}

		Insurance insurance = insuranceMapper.toEntity(dto);
		insurance.setVehicleName(dto.getCarDetails().getBrand() + " " + dto.getCarDetails().getModel());
		insurance.setUserId(user.getId());
		insurance.setStartDate(LocalDate.now());
		insurance.setPolicyNumber(generatePolicyNumber());
		insurance.setStartDate(LocalDate.now());
		insurance.setEndDate(LocalDate.now().plusYears(1));
		insurance.setPremium(dto.getPremium());
		insurance.setStatus(Insurance.InsuranceStatus.ACTIVE);

		return insuranceRepository.save(insurance);
	}

	public List<Insurance> getCurrentUserInsurances(HttpSession session, Insurance.InsuranceStatus status) {
		User user = userService.getAuthenticated(session);
		List<Insurance> insurances;
		if (status != null) {
			insurances = getUserInsurancesByStatus(user.getId(), status);
		} else {
			insurances = getUserInsurances(user.getId());
		}
		return insurances;
	}

	public List<Insurance> getUserInsurances(Long userId) {
		return insuranceRepository.findByUserId(userId);
	}

	public List<Insurance> getUserInsurancesByStatus(Long userId, Insurance.InsuranceStatus status) {
		return insuranceRepository.findByUserIdAndStatus(userId, status);
	}

	@Transactional
	public void cancelInsurance(Long insuranceId, HttpSession session) {
		User user = userService.getAuthenticated(session);
		Insurance insurance = insuranceRepository.findById(insuranceId).orElseThrow(() -> new RuntimeException(
				"Insurance not found"));

		if (!insurance.getUserId().equals(user.getId())) {
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
