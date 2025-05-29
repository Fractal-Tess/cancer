package com.safe_car.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.safe_car.models.Car;

public interface CarRepository extends JpaRepository<Car, Long> {
} 