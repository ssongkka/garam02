package com.garam.company.entity;

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
public class Company {
	// 회사이름
	@Id
	private String company;
	// 대표이사
	private String ceo;
	// 사업자번호
	private String no1;
	// 법인등록번호
	private String no2;
	// 주소
	private String adress;
	// 홈페이지
	private String hompage;
	// 전화번호
	private String telephone;
	// 팩스
	private String fax;
	// 이메일
	private String email;
	// 업종
	private String business1;
	// 업태
	private String business2;
	// 설립일
	private LocalDate day;

	@Builder
	public Company(String company, String ceo, String no1, String no2, String adress, String hompage, String telephone,
			String fax, String email, String business1, String business2, LocalDate day) {
		this.company = company;
		this.ceo = ceo;
		this.no1 = no1;
		this.no2 = no2;
		this.adress = adress;
		this.hompage = hompage;
		this.telephone = telephone;
		this.fax = fax;
		this.email = email;
		this.business1 = business1;
		this.business2 = business2;
		this.day = day;
	}
}
