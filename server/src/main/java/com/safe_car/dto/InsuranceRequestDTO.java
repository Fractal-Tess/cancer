package com.safe_car.dto;

import com.safe_car.entity.CardInfo;
import lombok.Data;

import java.util.Map;

@Data
public class InsuranceRequestDTO {
	private Double premium;
	private Map<String, Object> carDetails;
	private Boolean saveCard;
	private CardInfo cardDetails;
}
