package com.garam.web.login.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.garam.web.login.dto.UserDTO;

@Mapper
public interface UserMapper {
	public int updateUserColor(UserDTO userDTO) throws Exception;

	public int updateUserPw(UserDTO userDTO) throws Exception;
}