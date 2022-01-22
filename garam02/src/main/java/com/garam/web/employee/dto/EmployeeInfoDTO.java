package com.garam.web.employee.dto;

import com.garam.web.Utils.Utils;

public class EmployeeInfoDTO {

	// 사원번호
	private int tp;

	// 사원번호
	private String id;

	// 회사이름
	private String company;

	// 사원유형
	private String kind;

	// 입사일
	private String joind;

	// 재직일수
	private String joindDay;

	// 입사일
	private String endd;

	// 사원이름
	private String name;

	// 성별
	private String gender;

	// 생년월일
	private String birthday;

	// 나이
	private String age;

	// 연락처
	private String phone1;

	// 연락처
	private String phone2;

	// 주소
	private String address;

	// 차고지
	private String garage;

	// 보수교육일
	private String bosum;

	// 보수교육구분
	private String bobuj;

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
	private Integer basem;

	// 국민연금
	private Integer kukm;

	// 건강보험
	private Integer gunm;

	// 고용보험
	private Integer gom;

	// 산재보험
	private Integer sanm;

	// 이미지파일이름
	private String img;

	// 재직여부
	private Integer trash;

	private String carnumber;

	private String vehicle;

	public String getCarnumber() {
		return carnumber;
	}

	public void setCarnumber(String carnumber) {
		this.carnumber = carnumber;
	}

	public int getTp() {
		return tp;
	}

	public void setTp(int tp) {
		this.tp = tp;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public String getKind() {
		return kind;
	}

	public void setKind(String kind) {
		this.kind = kind;
	}

	public String getJoind() {
		return joind;
	}

	public void setJoind(String joind) {
		this.joind = joind;
	}

	public String getJoindDay() {
		return Utils.getYearMonth(getJoind());
	}

	public void setJoindDay(String joindDay) {
		this.joindDay = joindDay;
	}

	public String getEndd() {
		return endd;
	}

	public void setEndd(String endd) {
		this.endd = endd;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getBirthday() {
		return birthday;
	}

	public void setBirthday(String birthday) {
		this.birthday = birthday;
	}

	public String getAge() {
		return Utils.getAge(getBirthday());
	}

	public void setAge(String age) {
		this.age = age;
	}

	public String getPhone1() {
		return phone1;
	}

	public void setPhone1(String phone1) {
		this.phone1 = phone1;
	}

	public String getPhone2() {
		return phone2;
	}

	public void setPhone2(String phone2) {
		this.phone2 = phone2;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getGarage() {
		return garage;
	}

	public void setGarage(String garage) {
		this.garage = garage;
	}

	public String getBosum() {
		return bosum;
	}

	public void setBosum(String bosum) {
		this.bosum = bosum;
	}

	public String getBobuj() {
		return bobuj;
	}

	public void setBobuj(String bobuj) {
		this.bobuj = bobuj;
	}

	public String getDrvl() {
		return drvl;
	}

	public void setDrvl(String drvl) {
		this.drvl = drvl;
	}

	public String getBusl() {
		return busl;
	}

	public void setBusl(String busl) {
		this.busl = busl;
	}

	public String getMemo() {
		return memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

	public String getBank() {
		return bank;
	}

	public void setBank(String bank) {
		this.bank = bank;
	}

	public String getGye() {
		return gye;
	}

	public void setGye(String gye) {
		this.gye = gye;
	}

	public String getGyename() {
		return gyename;
	}

	public void setGyename(String gyename) {
		this.gyename = gyename;
	}

	public Integer getBasem() {
		return basem;
	}

	public void setBasem(Integer basem) {
		this.basem = basem;
	}

	public Integer getKukm() {
		return kukm;
	}

	public void setKukm(Integer kukm) {
		this.kukm = kukm;
	}

	public Integer getGunm() {
		return gunm;
	}

	public void setGunm(Integer gunm) {
		this.gunm = gunm;
	}

	public Integer getGom() {
		return gom;
	}

	public void setGom(Integer gom) {
		this.gom = gom;
	}

	public Integer getSanm() {
		return sanm;
	}

	public void setSanm(Integer sanm) {
		this.sanm = sanm;
	}

	public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}

	public Integer getTrash() {
		return trash;
	}

	public void setTrash(Integer trash) {
		this.trash = trash;
	}

	public String getVehicle() {
		return vehicle;
	}

	public void setVehicle(String vehicle) {
		this.vehicle = vehicle;
	}

}
