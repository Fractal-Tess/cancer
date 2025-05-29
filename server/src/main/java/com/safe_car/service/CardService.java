package com.safe_car.service;

import com.safe_car.dto.CardDTO;
import com.safe_car.entity.Card;
import com.safe_car.entity.User;
import com.safe_car.mapper.CardMapper;
import com.safe_car.repositories.CardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CardService {
	private final UserService userService;
	private final CardRepository cardRepository;
	private final CardMapper cardMapper;

	public List<CardDTO> findByUserIdDTO(Long userId) {
		User user = userService.findById(userId);
		String username = user.getUsername();
		List<Card> cards = cardRepository.findByUsername(username);

		// Mask card numbers except last 4 digits
		List<CardDTO> masked = cards.stream().map(card -> {
			String cardNum = card.getCardNumber();
			String maskedNum = cardNum.length() > 4 ?
					"**** **** **** " + cardNum.substring(cardNum.length() - 4) :
					cardNum;
			card.setCardNumber(maskedNum);
			return cardMapper.toDTO(card);
		}).collect(Collectors.toList());
		return masked;
	}
}
