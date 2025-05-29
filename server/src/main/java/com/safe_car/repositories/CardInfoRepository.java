package com.safe_car.repositories;

import com.safe_car.entity.Card;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardInfoRepository extends JpaRepository<Card, Long> {
}
