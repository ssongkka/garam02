package com.garam.web.vehicle.dto;

import com.garam.web.Utils.Utils;

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

	// 차량등록일
	private String regist;

	// 차량만료일
	private String expire;

	// 출고가
	private Integer price;

	// 특이사항
	private String special;

	// 삭제여부
	private Integer trash;

	private String img1;

	private String img2;

	private String img3;

	private String name;

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
		return Utils.splitVehicle(getVehicle());
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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return "VehicleInfoDTO [carNumber=" + carNumber + ", vehicle=" + vehicle + ", vehicle2=" + vehicle2
				+ ", company=" + company + ", owner=" + owner + ", id=" + id + ", bus=" + bus + ", brand=" + brand
				+ ", vename=" + vename + ", grade=" + grade + ", fuel=" + fuel + ", num=" + num + ", color=" + color
				+ ", regist=" + regist + ", expire=" + expire + ", price=" + price + ", special=" + special + ", trash="
				+ trash + ", img1=" + img1 + ", img2=" + img2 + ", img3=" + img3 + ", name=" + name
				+ ", getCarNumber()=" + getCarNumber() + ", getVehicle()=" + getVehicle() + ", getVehicle2()="
				+ getVehicle2() + ", getCompany()=" + getCompany() + ", getOwner()=" + getOwner() + ", getId()="
				+ getId() + ", getBus()=" + getBus() + ", getBrand()=" + getBrand() + ", getVename()=" + getVename()
				+ ", getGrade()=" + getGrade() + ", getFuel()=" + getFuel() + ", getNum()=" + getNum() + ", getColor()="
				+ getColor() + ", getRegist()=" + getRegist() + ", getExpire()=" + getExpire() + ", getPrice()="
				+ getPrice() + ", getSpecial()=" + getSpecial() + ", getTrash()=" + getTrash() + ", getImg1()="
				+ getImg1() + ", getImg2()=" + getImg2() + ", getImg3()=" + getImg3() + ", getName()=" + getName()
				+ ", getClass()=" + getClass() + ", hashCode()=" + hashCode() + ", toString()=" + super.toString()
				+ "]";
	}
}
