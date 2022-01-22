package com.garam.company.dto;

import java.time.LocalDate;

import com.garam.company.entity.Company;

import lombok.Getter;

@Getter
public class CompanyResponseDto {

	// 회사이름
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

	public CompanyResponseDto(Company entity) {
		this.company = entity.getCompany();
		this.ceo = entity.getCeo();
		this.no1 = entity.getNo1();
		this.no2 = entity.getNo2();
		this.adress = entity.getAdress();
		this.hompage = entity.getHompage();
		this.telephone = entity.getTelephone();
		this.fax = entity.getFax();
		this.email = entity.getEmail();
		this.business1 = entity.getBusiness1();
		this.business2 = entity.getBusiness2();
		this.day = entity.getDay();
	}
}
