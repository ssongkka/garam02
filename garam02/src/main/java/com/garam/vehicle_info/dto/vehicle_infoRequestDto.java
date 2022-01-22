package com.garam.vehicle_info.dto;

import java.time.LocalDate;

import com.garam.vehicle_info.entity.vehicle_info;

import lombok.Getter;

@Getter
public class vehicle_infoRequestDto {
	// 차대번호
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

	public vehicle_info toEntity() {
		return vehicle_info.builder().carNumber(carNumber).vehicle(vehicle).company(company).owner(owner).bus(bus)
				.brand(brand).name(name).grade(grade).fuel(fuel).num(num).color(color).regist(regist).expire(expire)
				.price(price).special(special).trash(trash).build();
	}

}
