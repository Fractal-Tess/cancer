package com.safe_car.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.safe_car.entity.Insurance;

import java.util.List;

@Repository
public interface InsuranceRepository extends JpaRepository<Insurance, Long> {
    List<Insurance> findByUsername(String username);

    List<Insurance> findByUsernameAndStatus(String username, Insurance.InsuranceStatus status);
}