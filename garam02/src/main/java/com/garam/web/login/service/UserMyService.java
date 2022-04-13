package com.garam.web.login.service;

import com.garam.web.login.dto.UserDTO;

public interface UserMyService {

	public int updateUserColor(UserDTO userDTO) throws Exception;

	public int updateUserPw(UserDTO userDTO) throws Exception;

	public int insertUser(UserDTO userDTO) throws Exception;

}
