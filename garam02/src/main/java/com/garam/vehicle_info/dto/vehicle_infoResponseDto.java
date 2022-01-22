package com.garam.vehicle_info.dto;

import java.time.LocalDate;

import com.garam.vehicle_info.entity.vehicle_info;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class vehicle_infoResponseDto {
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

	public vehicle_infoResponseDto(vehicle_info entity) {
		this.carNumber = entity.getCarNumber();
		this.vehicle = entity.getVehicle();
		this.company = entity.getCompany();
		this.owner = entity.getOwner();
		this.bus = entity.getBus();
		this.brand = entity.getBrand();
		this.name = entity.getName();
		this.grade = entity.getGrade();
		this.fuel = entity.getFuel();
		this.num = entity.getNum();
		this.color = entity.getColor();
		this.regist = entity.getRegist();
		this.expire = entity.getExpire();
		this.price = entity.getPrice();
		this.special = entity.getSpecial();
		this.trash = entity.getTrash();
	}

}
