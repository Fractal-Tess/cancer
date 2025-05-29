package com.safe_car.service;

import com.safe_car.dto.UserDTO;
import com.safe_car.model.User;
import com.safe_car.mapper.UserMapper;
import com.safe_car.repositories.UserRepository;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
	private final UserMapper userMapper;
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	public User createUser(UserDTO dto) {
		User user = userMapper.toEntity(dto);
		if (userRepository.findByUsername(user.getUsername()) != null ||
				userRepository.findByEmail(user.getEmail()) != null) {
			throw new DataIntegrityViolationException("Username or email already exists");
		}
		String hashedPassword = passwordEncoder.encode(user.getPassword());
		user.setPassword(hashedPassword);
		userRepository.save(user);
		return user;
	}

	public UserDTO authenticate(UserDTO dto, HttpSession session) {
		User user = findByEmail(dto.getEmail());
		if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
			throw new IllegalStateException("Invalid username or password");
		}
		session.setAttribute("user", user.getId());
		return userMapper.toDTO(user);
	}

	public UserDTO findByIdDTO(Long id) {
		var user = findById(id);
		return userMapper.toDTO(user);
	}

	public User findById(Long id) {
		var user = userRepository.findById(id).orElse(null);
		if (user == null) {
			throw new IllegalStateException("User not found");
		}
		return user;
	}

	public User findByEmail(String email) {
		var user = userRepository.findByEmail(email);
		if (user == null) {
			throw new IllegalStateException("User not found");
		}
		return user;
	}

	public User getAuthenticated(HttpSession session) {
		Object userId = session.getAttribute("user");
		if (userId == null) {
			throw new IllegalStateException("User not logged in");
		}
		User user = userRepository.findById((Long) userId).orElse(null);
		if (user == null) {
			throw new IllegalStateException("User not found");
		}
		return user;
	}

	public UserDTO getAuthenticatedDTO(HttpSession session) {
		User user = getAuthenticated(session);
		return userMapper.toDTO(user);
	}
}
