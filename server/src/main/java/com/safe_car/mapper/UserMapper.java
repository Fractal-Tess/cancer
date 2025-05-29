package com.safe_car.mapper;

import com.safe_car.dto.UserDTO;
import com.safe_car.entity.User;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;

@Mapper(uses = (UserMapper.class), builder = @Builder(disableBuilder = true))
public interface UserMapper {
	User toEntity(UserDTO dto);

	UserDTO toDTO(User model);
}
