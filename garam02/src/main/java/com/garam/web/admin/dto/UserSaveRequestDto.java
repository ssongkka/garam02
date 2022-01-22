package com.garam.web.admin.dto;

import java.time.LocalDateTime;

import com.garam.web.login.entity.PowerRole;
import com.garam.web.login.entity.User;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserSaveRequestDto {

	private String id;

	private String pw;

	private String company;

	private String position;

	private String name;

	private String phone;

	private PowerRole power;

	private LocalDateTime inserday;

	private LocalDateTime outday;

	@Builder
	public UserSaveRequestDto(String id, String pw, String company, String position, String name, String phone,
			PowerRole power, LocalDateTime inserday) {
		super();
		this.id = id;
		this.pw = pw;
		this.company = company;
		this.position = position;
		this.name = name;
		this.phone = phone;
		this.power = power;
		this.inserday = inserday;
	}

	public User toEntity() {
		return User.builder().id(id).pw(pw).company(company).position(position).name(name).phone(phone).power(power)
				.inserday(inserday).build();
	}
}
