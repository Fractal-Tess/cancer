package com.safe_car.mapper;

import com.safe_car.dto.InsuranceDTO;
import com.safe_car.model.Insurance;
import org.mapstruct.*;

@Mapper(uses = {CardMapper.class}, builder = @Builder(disableBuilder = true))
public interface InsuranceMapper {
	@Mapping(source = "carDetails.brand", target = "carBrand")
	@Mapping(source = "carDetails.model", target = "carModel")
	@Mapping(source = "carDetails.year", target = "carYear")
	@Mapping(source = "carDetails.licensePlate", target = "licensePlate")
	@Mapping(source = "carDetails.coverageType", target = "coverageType")
	Insurance toEntity(InsuranceDTO dto);

	InsuranceDTO toDTO(Insurance model);

	@AfterMapping
	default void mapCarMakeToVehicleName(Insurance dto, @MappingTarget Insurance model) {
	}
}
