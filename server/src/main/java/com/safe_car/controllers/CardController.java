package com.safe_car.controllers;

import com.safe_car.dto.CardDTO;
import com.safe_car.service.CardService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/card")
@RequiredArgsConstructor
public class CardController {
	private final CardService cardService;
	
	@GetMapping
	public ResponseEntity<List<CardDTO>> getSavedCards(HttpSession session) {
		return ResponseEntity.ok(cardService.findBySession(session));
	}
}
