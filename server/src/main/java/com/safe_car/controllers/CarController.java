package com.safe_car.controllers;

import com.safe_car.models.Car;
import com.safe_car.repositories.CarRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cars")
public class CarController {
    @Autowired
    private CarRepository carRepository;

    @GetMapping
    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    @PostMapping
    public Car createCar(@RequestBody Car car) {
        return carRepository.save(car);
    }
} 