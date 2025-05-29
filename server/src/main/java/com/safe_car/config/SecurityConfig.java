package com.safe_car.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration public class SecurityConfig {

	@Bean public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.cors(cors -> cors.disable()) // Disable CORS handling in Spring Security
				.csrf(csrf -> csrf.disable()) // Disable CSRF (optional, depending on your needs)
				// .authorizeHttpRequests(auth -> auth // Configure authorization rules
				// .requestMatchers("/public/**").permitAll()
				// .anyRequest().anonymous())
				.sessionManagement(session -> session // Stateless session management
						.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		return http.build();
	}
}
