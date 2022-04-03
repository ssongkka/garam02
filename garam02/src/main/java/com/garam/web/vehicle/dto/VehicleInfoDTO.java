package com.garam.web.vehicle.dto;

public class VehicleInfoDTO {

	// 차대번호
	private String carNumber;

	// 차량번호
	private String vehicle;

	// 차량번호
	private String vehicle2;

	// 회사이름
	private String company;

	// 소유자
	private String owner;

	// 사원번호
	private String id;

	// 인승
	private String bus;

	// 제조자
	private String brand;

	// 차량명
	private String vename;

	// 등급
	private String grade;

	// 연료종류
	private String fuel;

	// 승차인원
	private String num;

	// 차량색상
	private String color;

	// 차대번호
	private String carn;

	// 차량등록일
	private String regist;

	// 차량만료일
	private String expire;

	// 차량등록일
	private String inday;

	// 차량만료일
	private String outday;

	// 출고가
	private Integer price;

	// 특이사항
	private String special;

	// 삭제여부
	private Integer trash;

	private String img1;

	private String img2;

	private String img3;

	private Integer jukseq;

	private String jukday;

	private String jukname;

	private String ve1;

	private String id1;

	private String ve2;

	private String id2;

	private String ve3;

	private String id3;

	private String ve4;

	private String id4;

	private String ve5;

	private String id5;

	private Integer juktrash;

	private String regd;
	private String reg;
	private String insud;
	private String insu;
	private String jukd;
	private String juk;

	private String name;
	private String phone1;
	private String phone2;

	private int tp;

	public Integer getJukseq() {
		return jukseq;
	}

	public void setJukseq(Integer jukseq) {
		this.jukseq = jukseq;
	}

	public String getJukday() {
		return jukday;
	}

	public void setJukday(String jukday) {
		this.jukday = jukday;
	}

	public String getJukname() {
		return jukname;
	}

	public void setJukname(String jukname) {
		this.jukname = jukname;
	}

	public String getVe1() {
		return ve1;
	}

	public void setVe1(String ve1) {
		this.ve1 = ve1;
	}

	public String getId1() {
		return id1;
	}

	public void setId1(String id1) {
		this.id1 = id1;
	}

	public String getVe2() {
		return ve2;
	}

	public void setVe2(String ve2) {
		this.ve2 = ve2;
	}

	public String getId2() {
		return id2;
	}

	public void setId2(String id2) {
		this.id2 = id2;
	}

	public String getVe3() {
		return ve3;
	}

	public void setVe3(String ve3) {
		this.ve3 = ve3;
	}

	public String getId3() {
		return id3;
	}

	public void setId3(String id3) {
		this.id3 = id3;
	}

	public String getVe4() {
		return ve4;
	}

	public void setVe4(String ve4) {
		this.ve4 = ve4;
	}

	public String getId4() {
		return id4;
	}

	public void setId4(String id4) {
		this.id4 = id4;
	}

	public String getVe5() {
		return ve5;
	}

	public void setVe5(String ve5) {
		this.ve5 = ve5;
	}

	public String getId5() {
		return id5;
	}

	public void setId5(String id5) {
		this.id5 = id5;
	}

	public Integer getJuktrash() {
		return juktrash;
	}

	public void setJuktrash(Integer juktrash) {
		this.juktrash = juktrash;
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

	public String getCarNumber() {
		return carNumber;
	}

	public void setCarNumber(String carNumber) {
		this.carNumber = carNumber;
	}

	public String getVehicle() {
		return vehicle;
	}

	public void setVehicle(String vehicle) {
		this.vehicle = vehicle;
	}

	public String getVehicle2() {
		int size = getVehicle().length() - 4;

		return getVehicle().substring(size);
	}

	public void setVehicle2(String vehicle2) {
		this.vehicle2 = vehicle2;
	}

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public String getOwner() {
		return owner;
	}

	public void setOwner(String owner) {
		this.owner = owner;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getBus() {
		return bus;
	}

	public void setBus(String bus) {
		this.bus = bus;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public String getVename() {
		return vename;
	}

	public void setVename(String vename) {
		this.vename = vename;
	}

	public String getGrade() {
		return grade;
	}

	public void setGrade(String grade) {
		this.grade = grade;
	}

	public String getFuel() {
		return fuel;
	}

	public void setFuel(String fuel) {
		this.fuel = fuel;
	}

	public String getNum() {
		return num;
	}

	public void setNum(String num) {
		this.num = num;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public String getCarn() {
		return carn;
	}

	public void setCarn(String carn) {
		this.carn = carn;
	}

	public String getRegist() {
		return regist;
	}

	public void setRegist(String regist) {
		this.regist = regist;
	}

	public String getExpire() {
		return expire;
	}

	public void setExpire(String expire) {
		this.expire = expire;
	}

	public String getInday() {
		return inday;
	}

	public void setInday(String inday) {
		this.inday = inday;
	}

	public String getOutday() {
		return outday;
	}

	public void setOutday(String outday) {
		this.outday = outday;
	}

	public Integer getPrice() {
		return price;
	}

	public void setPrice(Integer price) {
		this.price = price;
	}

	public String getSpecial() {
		return special;
	}

	public void setSpecial(String special) {
		this.special = special;
	}

	public Integer getTrash() {
		return trash;
	}

	public void setTrash(Integer trash) {
		this.trash = trash;
	}

	public String getImg1() {
		return img1;
	}

	public void setImg1(String img1) {
		this.img1 = img1;
	}

	public String getImg2() {
		return img2;
	}

	public void setImg2(String img2) {
		this.img2 = img2;
	}

	public String getImg3() {
		return img3;
	}

	public void setImg3(String img3) {
		this.img3 = img3;
	}

	public String getRegd() {
		return regd;
	}

	public void setRegd(String regd) {
		this.regd = regd;
	}

	public String getReg() {
		return reg;
	}

	public void setReg(String reg) {
		this.reg = reg;
	}

	public String getInsud() {
		return insud;
	}

	public void setInsud(String insud) {
		this.insud = insud;
	}

	public String getInsu() {
		return insu;
	}

	public void setInsu(String insu) {
		this.insu = insu;
	}

	public String getJukd() {
		return jukd;
	}

	public void setJukd(String jukd) {
		this.jukd = jukd;
	}

	public String getJuk() {
		return juk;
	}

	public void setJuk(String juk) {
		this.juk = juk;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getTp() {
		return tp;
	}

	public void setTp(int tp) {
		this.tp = tp;
	}

	@Override
	public String toString() {
		return "VehicleInfoDTO [carNumber=" + carNumber + ", vehicle=" + vehicle + ", vehicle2=" + vehicle2
				+ ", company=" + company + ", owner=" + owner + ", id=" + id + ", bus=" + bus + ", brand=" + brand
				+ ", vename=" + vename + ", grade=" + grade + ", fuel=" + fuel + ", num=" + num + ", color=" + color
				+ ", carn=" + carn + ", regist=" + regist + ", expire=" + expire + ", price=" + price + ", special="
				+ special + ", trash=" + trash + ", img1=" + img1 + ", img2=" + img2 + ", img3=" + img3 + ", regd="
				+ regd + ", reg=" + reg + ", insud=" + insud + ", insu=" + insu + ", jukd=" + jukd + ", juk=" + juk
				+ ", name=" + name + ", tp=" + tp + ", getCarNumber()=" + getCarNumber() + ", getVehicle()="
				+ getVehicle() + ", getVehicle2()=" + getVehicle2() + ", getCompany()=" + getCompany() + ", getOwner()="
				+ getOwner() + ", getId()=" + getId() + ", getBus()=" + getBus() + ", getBrand()=" + getBrand()
				+ ", getVename()=" + getVename() + ", getGrade()=" + getGrade() + ", getFuel()=" + getFuel()
				+ ", getNum()=" + getNum() + ", getColor()=" + getColor() + ", getCarn()=" + getCarn()
				+ ", getRegist()=" + getRegist() + ", getExpire()=" + getExpire() + ", getPrice()=" + getPrice()
				+ ", getSpecial()=" + getSpecial() + ", getTrash()=" + getTrash() + ", getImg1()=" + getImg1()
				+ ", getImg2()=" + getImg2() + ", getImg3()=" + getImg3() + ", getRegd()=" + getRegd() + ", getReg()="
				+ getReg() + ", getInsud()=" + getInsud() + ", getInsu()=" + getInsu() + ", getJukd()=" + getJukd()
				+ ", getJuk()=" + getJuk() + ", getName()=" + getName() + ", getTp()=" + getTp() + ", getClass()="
				+ getClass() + ", hashCode()=" + hashCode() + ", toString()=" + super.toString() + "]";
	}

}
