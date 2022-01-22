package com.garam.employee_info.entity;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class employee_info {

	// 사원번호
	@Id
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

	@Builder
	public employee_info(String id, String company, String kind, LocalDate joind, LocalDate endd, String name,
			String gender, LocalDate birthday, String phone1, String phone2, String address, String garage,
			LocalDate bosuM, String bobuJ, String drvl, String busl, String memo, String bank, String gye,
			String gyename, int baseM, int kukM, int gunM, int goM, int sanM, int trash) {
		this.id = id;
		this.company = company;
		this.kind = kind;
		this.joind = joind;
		this.endd = endd;
		this.name = name;
		this.gender = gender;
		this.birthday = birthday;
		this.phone1 = phone1;
		this.phone2 = phone2;
		this.address = address;
		this.garage = garage;
		this.bosuM = bosuM;
		this.bobuJ = bobuJ;
		this.drvl = drvl;
		this.busl = busl;
		this.memo = memo;
		this.bank = bank;
		this.gye = gye;
		this.gyename = gyename;
		this.baseM = baseM;
		this.kukM = kukM;
		this.gunM = gunM;
		this.goM = goM;
		this.sanM = sanM;
		this.trash = trash;
	}

	public void update(String company, String kind, LocalDate joind, LocalDate endd, String name, String gender,
			LocalDate birthday, String phone1, String phone2, String address, String garage, LocalDate bosuM,
			String bobuJ, String drvl, String busl, String memo, String bank, String gye, String gyename, int baseM,
			int kukM, int gunM, int goM, int sanM, int trash) {
		this.company = company;
		this.kind = kind;
		this.joind = joind;
		this.endd = endd;
		this.name = name;
		this.gender = gender;
		this.birthday = birthday;
		this.phone1 = phone1;
		this.phone2 = phone2;
		this.address = address;
		this.garage = garage;
		this.bosuM = bosuM;
		this.bobuJ = bobuJ;
		this.drvl = drvl;
		this.busl = busl;
		this.memo = memo;
		this.bank = bank;
		this.gye = gye;
		this.gyename = gyename;
		this.baseM = baseM;
		this.kukM = kukM;
		this.gunM = gunM;
		this.goM = goM;
		this.sanM = sanM;
		this.trash = trash;
	}
}
