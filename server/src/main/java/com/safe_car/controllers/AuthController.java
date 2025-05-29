package com.safe_car.controllers;

import com.safe_car.models.User;
import com.safe_car.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Map<String, String> userMap) {
        String username = userMap.get("username");
        String email = userMap.get("email");
        String password = userMap.get("password");
        if (userRepository.findByUsername(username).isPresent() || userRepository.findByEmail(email).isPresent()) {
            return ResponseEntity.badRequest().body("Username or email already exists");
        }
        String hashedPassword = passwordEncoder.encode(password);
        User user = new User(username, email, hashedPassword);
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody Map<String, String> userMap, HttpSession session) {
        String username = userMap.get("username");
        String password = userMap.get("password");

        Optional<User> userOpt = userRepository.findByUsername(username);
        System.out.println(userOpt);
        if (userOpt.isEmpty() || !passwordEncoder.matches(password, userOpt.get().getPassword())) {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
        session.setAttribute("user", userOpt.get().getId());
        return ResponseEntity.ok("Login successful");
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(HttpSession session) {
        Object userId = session.getAttribute("user");
        if (userId == null) {
            return ResponseEntity.status(401).body("Not authenticated");
        }
        Optional<User> userOpt = userRepository.findById((Long) userId);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).body("Not authenticated");
        }
        User user = userOpt.get();
        return ResponseEntity.ok(Map.of(
                "id", user.getId(),
                "username", user.getUsername(),
                "email", user.getEmail()));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("Logged out");
    }
}