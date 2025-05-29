package com.safe_car.service;

import com.safe_car.dto.CardDTO;
import com.safe_car.model.Card;
import com.safe_car.model.User;
import com.safe_car.mapper.CardMapper;
import com.safe_car.repositories.CardRepository;
import jakarta.servlet.http.HttpSession;
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

	public List<CardDTO> findBySession(HttpSession session) {
		User user = userService.getAuthenticated(session);
		List<Card> cards = cardRepository.findByUserId(user.getId());

		return cards.stream().map(card -> {
			String cardNum = card.getCardNumber();
			String maskedNum = cardNum.length() > 4 ?
					"**** **** **** " + cardNum.substring(cardNum.length() - 4) :
					cardNum;
			card.setCardNumber(maskedNum);
			return cardMapper.toDTO(card);
		}).collect(Collectors.toList());
	}
}
