package com.garam.company.dto;

public class CompanyDTO {
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
	private String day;

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public String getCeo() {
		return ceo;
	}

	public void setCeo(String ceo) {
		this.ceo = ceo;
	}

	public String getNo1() {
		return no1;
	}

	public void setNo1(String no1) {
		this.no1 = no1;
	}

	public String getNo2() {
		return no2;
	}

	public void setNo2(String no2) {
		this.no2 = no2;
	}

	public String getAdress() {
		return adress;
	}

	public void setAdress(String adress) {
		this.adress = adress;
	}

	public String getHompage() {
		return hompage;
	}

	public void setHompage(String hompage) {
		this.hompage = hompage;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public String getFax() {
		return fax;
	}

	public void setFax(String fax) {
		this.fax = fax;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getBusiness1() {
		return business1;
	}

	public void setBusiness1(String business1) {
		this.business1 = business1;
	}

	public String getBusiness2() {
		return business2;
	}

	public void setBusiness2(String business2) {
		this.business2 = business2;
	}

	public String getDay() {
		return day;
	}

	public void setDay(String day) {
		this.day = day;
	}

	@Override
	public String toString() {
		return "CompanyDTO [company=" + company + ", ceo=" + ceo + ", no1=" + no1 + ", no2=" + no2 + ", adress="
				+ adress + ", hompage=" + hompage + ", telephone=" + telephone + ", fax=" + fax + ", email=" + email
				+ ", business1=" + business1 + ", business2=" + business2 + ", day=" + day + ", getCompany()="
				+ getCompany() + ", getCeo()=" + getCeo() + ", getNo1()=" + getNo1() + ", getNo2()=" + getNo2()
				+ ", getAdress()=" + getAdress() + ", getHompage()=" + getHompage() + ", getTelephone()="
				+ getTelephone() + ", getFax()=" + getFax() + ", getEmail()=" + getEmail() + ", getBusiness1()="
				+ getBusiness1() + ", getBusiness2()=" + getBusiness2() + ", getDay()=" + getDay() + ", getClass()="
				+ getClass() + ", hashCode()=" + hashCode() + ", toString()=" + super.toString() + "]";
	}

}
