package com.safe_car.mapper;

import com.safe_car.dto.InsuranceDTO;
import com.safe_car.model.Insurance;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(uses = {CardMapper.class}, builder = @Builder(disableBuilder = true))
public interface InsuranceMapper {
	@Mapping(source = "carDetails.brand", target = "carBrand")
	@Mapping(source = "carDetails.model", target = "carModel")
	@Mapping(source = "carDetails.year", target = "carYear")
	@Mapping(source = "carDetails.licensePlate", target = "licensePlate")
	@Mapping(source = "carDetails.coverageType", target = "coverageType")
	@Mapping(source = "carDetails.previousIncidents", target = "previousIncidents")
	@Mapping(source = "carDetails.greenScore", target = "greenhouseEmissionScore")
	@Mapping(source = "carDetails.horsepower", target = "horsepower")
	@Mapping(source = "carDetails.mileage", target = "mileage")
	Insurance toEntity(InsuranceDTO dto);
}
