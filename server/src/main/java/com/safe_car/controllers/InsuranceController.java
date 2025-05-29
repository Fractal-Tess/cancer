package com.safe_car.controllers;

import com.safe_car.dto.InsuranceDTO;
import com.safe_car.model.Insurance;
import com.safe_car.repositories.UserRepository;
import com.safe_car.service.InsuranceService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
		insuranceService.cancelInsurance(insuranceId, session);
		return ResponseEntity.ok().build();
	}
}
