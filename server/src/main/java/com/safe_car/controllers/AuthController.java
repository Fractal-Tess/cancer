package com.safe_car.controllers;

import com.safe_car.dto.UserDTO;
import com.safe_car.service.UserService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
	private final UserService userService;

	@PostMapping("/signup")
	public ResponseEntity<String> signup(@RequestBody @Valid UserDTO dto) {
		userService.createUser(dto);
		return ResponseEntity.ok("User registered successfully");
	}

	@PostMapping("/signin")
	public ResponseEntity<UserDTO> signin(@RequestBody UserDTO dto, HttpSession session) {
		UserDTO userDTO = userService.authenticate(dto);
		return ResponseEntity.ok(userDTO);
	}

	@GetMapping("/me")
	public ResponseEntity<?> me(HttpSession session) {
		Object userId = session.getAttribute("user");
		if (userId == null) {
			return ResponseEntity.status(401).body("Not authenticated");
		}

		UserDTO userDTO = userService.findByIdDTO((Long) userId);
		return ResponseEntity.ok(userDTO);
	}

	@PostMapping("/logout")
	public ResponseEntity<?> logout(HttpSession session) {
		session.invalidate();
		return ResponseEntity.ok("Logged out");
	}
}
