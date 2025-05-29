package com.safe_car.mapper;

import com.safe_car.dto.CardDTO;
import com.safe_car.model.Card;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;

@Mapper(builder = @Builder(disableBuilder = true))
public interface CardMapper {
	Card toEntity(CardDTO dto);

	CardDTO toDTO(Card model);
}
