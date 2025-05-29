package com.safe_car.repositories;

import com.safe_car.model.Insurance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InsuranceRepository extends JpaRepository<Insurance, Long> {
	List<Insurance> findByUserId(Long userId);

	List<Insurance> findByUserIdAndStatus(Long userId, Insurance.InsuranceStatus status);
}
