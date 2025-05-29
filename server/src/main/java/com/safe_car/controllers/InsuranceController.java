package com.safe_car.controllers;

import com.safe_car.dto.InsuranceDTO;
import com.safe_car.entity.Insurance;
import com.safe_car.entity.User;
import com.safe_car.repositories.UserRepository;
import com.safe_car.service.InsuranceService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/insurance")
@RequiredArgsConstructor
public class InsuranceController {
	private final InsuranceService insuranceService;
	private final UserRepository userRepository;

	@PostMapping("/purchase")
	public ResponseEntity<?> purchaseInsurance(@RequestBody InsuranceDTO request, HttpSession session) {
		Insurance insurance = insuranceService.purchaseInsurance(session, request);
		return ResponseEntity.ok(insurance);
	}

	@GetMapping("/list")
	public ResponseEntity<?> getUserInsurances(
			@RequestParam(required = false) Insurance.InsuranceStatus status,
			HttpSession session
	) {
		List<Insurance> insurance = insuranceService.getCurrentUserInsurances(session, status);
		return ResponseEntity.ok(insurance);
	}

	@PostMapping("/{insuranceId}/cancel")
	public ResponseEntity<?> cancelInsurance(@PathVariable Long insuranceId, HttpSession session) {
		Object userId = session.getAttribute("user");
		if (userId == null) {
			return ResponseEntity.status(401).body("Not authenticated");
		}

		Optional<User> userOpt = userRepository.findById((Long) userId);
		if (userOpt.isEmpty()) {
			return ResponseEntity.status(401).body("Not authenticated");
		}

		String username = userOpt.get().getUsername();
		insuranceService.cancelInsurance(insuranceId, username);
		return ResponseEntity.ok().build();
	}
}
