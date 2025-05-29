package com.safe_car.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.safe_car.entity.CardInfo;

import java.util.Optional;

public interface CardInfoRepository extends JpaRepository<CardInfo, Long> {
    Optional<CardInfo> findByUsername(String username);
}