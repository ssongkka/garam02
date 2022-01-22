package com.garam.employee_info.dto;

import java.time.LocalDate;

import com.garam.employee_info.entity.employee_info;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class employee_infoRequestDto {
	// 사원번호
	private String id;
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

	public employee_info toEntity() {
		return employee_info.builder().id(id).company(company).kind(kind).joind(joind).endd(endd).name(name)
				.gender(gender).birthday(birthday).phone1(phone1).phone2(phone2).address(address).garage(garage)
				.bosuM(bosuM).bobuJ(bobuJ).drvl(drvl).busl(busl).memo(memo).bank(bank).gye(gye).gyename(gyename)
				.baseM(baseM).kukM(kukM).gunM(gunM).goM(goM).sanM(sanM).trash(trash).build();
	}

}
