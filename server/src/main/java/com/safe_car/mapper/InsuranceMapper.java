package com.safe_car.mapper;

import com.safe_car.dto.InsuranceDTO;
import com.safe_car.entity.Insurance;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;

@Mapper(uses = {CardMapper.class}, builder = @Builder(disableBuilder = true))
public interface InsuranceMapper {
	Insurance toEntity(InsuranceDTO dto);

	InsuranceDTO toDTO(Insurance model);
}
