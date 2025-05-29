package com.safe_car.service;

import com.safe_car.dto.UserDTO;
import com.safe_car.entity.User;
import com.safe_car.mapper.UserMapper;
import com.safe_car.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
	private final UserMapper userMapper;
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	public User createUser(UserDTO dto) {
		User user = userMapper.toEntity(dto);
		if (userRepository.findByUsername(user.getUsername()).isPresent() ||
				userRepository.findByEmail(user.getEmail()).isPresent()) {
			throw new DataIntegrityViolationException("Username or email already exists");
		}
		String hashedPassword = passwordEncoder.encode(user.getPassword());
		user.setPassword(hashedPassword);
		userRepository.save(user);
		return user;
	}

	public UserDTO authenticate(UserDTO dto) {
		Optional<User> userOpt = userRepository.findByUsername(dto.getUsername());
		if (userOpt.isEmpty() || !passwordEncoder.matches(dto.getPassword(), userOpt.get().getPassword())) {
			throw new IllegalStateException("Invalid username or password");
		}
		return userMapper.toDTO(userOpt.get());
	}

	public UserDTO findById(Long id) {
		var user = userRepository.findById(id).orElse(null);
		if (user == null) {
			throw new IllegalStateException("User not found");
		}
		return userMapper.toDTO(user);
	}
}
