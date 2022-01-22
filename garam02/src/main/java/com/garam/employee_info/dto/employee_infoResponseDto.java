package com.garam.employee_info.dto;

import java.time.LocalDate;

import com.garam.employee_info.entity.employee_info;

import lombok.Getter;

@Getter
public class employee_infoResponseDto {
	// 회사이름
	private String company;
	// 사원유형
	private String kind;
	// 입사일
	private LocalDate joind;
	// 입사일
	private LocalDate endd;
	// 사원이름
	private String name;
	// 성별
	private String gender;
	// 생년월일
	private LocalDate birthday;
	// 연락처
	private String phone1;
	// 연락처
	private String phone2;
	// 주소
	private String address;
	// 차고지
	private String garage;
	// 보수교육일
	private LocalDate bosuM;
	// 보수교육구분
	private String bobuJ;
	// 면허번호
	private String drvl;
	// 버스자격증번호
	private String busl;
	// 메모
	private String memo;
	// 은행
	private String bank;
	// 계좌번호
	private String gye;
	// 예금주
	private String gyename;
	// 기본급
	private int baseM;
	// 국민연금
	private int kukM;
	// 건강보험
	private int gunM;
	// 고용보험
	private int goM;
	// 산재보험
	private int sanM;
	// 재직여부
	private int trash;

	public employee_infoResponseDto(employee_info entity) {
		super();
		this.company = entity.getCompany();
		this.kind = entity.getKind();
		this.joind = entity.getJoind();
		this.endd = entity.getEndd();
		this.name = entity.getName();
		this.gender = entity.getGender();
		this.birthday = entity.getBirthday();
		this.phone1 = entity.getPhone1();
		this.phone2 = entity.getPhone2();
		this.address = entity.getAddress();
		this.garage = entity.getGarage();
		this.bosuM = entity.getBosuM();
		this.bobuJ = entity.getBobuJ();
		this.drvl = entity.getDrvl();
		this.busl = entity.getBusl();
		this.memo = entity.getMemo();
		this.bank = entity.getBank();
		this.gye = entity.getGye();
		this.gyename = entity.getGyename();
		this.baseM = entity.getBaseM();
		this.kukM = entity.getKukM();
		this.gunM = entity.getGunM();
		this.goM = entity.getGoM();
		this.sanM = entity.getSanM();
		this.trash = entity.getTrash();
	}
}
