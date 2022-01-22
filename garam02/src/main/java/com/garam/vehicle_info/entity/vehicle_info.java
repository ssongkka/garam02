package com.garam.vehicle_info.entity;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity
public class vehicle_info {

	// 차대번호
	@Id
	private String carNumber;
	// 차량번호
	private String vehicle;
	// 회사이름
	private String company;
	// 소유자
	private String owner;
	// 인승
	private String bus;
	// 제조자
	private String brand;
	// 차량명
	private String name;
	// 등급
	private String grade;
	// 연료종류
	private String fuel;
	// 승차인원
	private String num;
	// 차량색상
	private String color;
	// 차량등록일
	private LocalDate regist;
	// 차량만료일
	private LocalDate expire;
	// 출고가
	private Integer price;
	// 특이사항
	private String special;
	// 삭제여부
	private Integer trash;

	@Builder
	public vehicle_info(String carNumber, String vehicle, String company, String owner, String bus, String brand,
			String name, String grade, String fuel, String num, String color, LocalDate regist, LocalDate expire,
			Integer price, String special, Integer trash) {

		this.carNumber = carNumber;
		this.vehicle = vehicle;
		this.company = company;
		this.owner = owner;
		this.bus = bus;
		this.brand = brand;
		this.name = name;
		this.grade = grade;
		this.fuel = fuel;
		this.num = num;
		this.color = color;
		this.regist = regist;
		this.expire = expire;
		this.price = price;
		this.special = special;
		this.trash = trash;

	}

	public void update(String carNumber, String vehicle, String company, String owner, String bus, String brand,
			String name, String grade, String fuel, String num, String color, LocalDate regist, LocalDate expire,
			Integer price, String special, Integer trash) {

		this.carNumber = carNumber;
		this.vehicle = vehicle;
		this.company = company;
		this.owner = owner;
		this.bus = bus;
		this.brand = brand;
		this.name = name;
		this.grade = grade;
		this.fuel = fuel;
		this.num = num;
		this.color = color;
		this.regist = regist;
		this.expire = expire;
		this.price = price;
		this.special = special;
		this.trash = trash;

	}

}
