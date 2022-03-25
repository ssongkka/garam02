package com.garam.web.admin.dto;

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

	private String inserday;

	private String outday;

	private Integer color;

	@Builder
	public UserSaveRequestDto(String id, String pw, String company, String position, String name, String phone,
			PowerRole power, String inserday, String outday, Integer color) {
		super();
		this.id = id;
		this.pw = pw;
		this.company = company;
		this.position = position;
		this.name = name;
		this.phone = phone;
		this.power = power;
		this.inserday = inserday;
		this.outday = outday;
		this.color = color;
	}

	public User toEntity() {
		return User.builder().id(id).pw(pw).company(company).position(position).name(name).phone(phone).power(power)
				.inserday(inserday).outday(outday).color(color).build();
	}
}
