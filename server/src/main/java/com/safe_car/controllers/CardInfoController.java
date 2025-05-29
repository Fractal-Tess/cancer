package com.safe_car.controllers;

import com.safe_car.entity.CardInfo;
import com.safe_car.entity.User;
import com.safe_car.repositories.CardInfoRepository;
import com.safe_car.repositories.UserRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/card-info")
public class CardInfoController {
	@Autowired
	private CardInfoRepository cardInfoRepository;
	@Autowired
	private UserRepository userRepository;

	@GetMapping
	public ResponseEntity<?> getSavedCards(HttpSession session) {
		Object userId = session.getAttribute("user");
		if (userId == null) {
			return ResponseEntity.status(401).body("Not authenticated");
		}
		Optional<User> userOpt = userRepository.findById((Long) userId);
		if (userOpt.isEmpty()) {
			return ResponseEntity.status(401).body("Not authenticated");
		}
		String username = userOpt.get().getUsername();
		List<CardInfo> cards = cardInfoRepository.findAll().stream()
				.filter(card -> card.getUsername().equals(username))
				.collect(Collectors.toList());
		// Mask card numbers except last 4 digits
		List<Object> masked = cards.stream().map(card -> {
			String cardNum = card.getCardNumber();
			String maskedNum = cardNum.length() > 4 ? "**** **** **** " + cardNum.substring(cardNum.length() - 4)
					: cardNum;
			return new java.util.HashMap<String, Object>() {
				{
					put("id", card.getId());
					put("cardNumber", maskedNum);
					put("expiryDate", card.getExpiryDate());
					put("cardholderName", card.getCardholderName());
				}
			};
		}).collect(Collectors.toList());
		return ResponseEntity.ok(masked);
	}
}
