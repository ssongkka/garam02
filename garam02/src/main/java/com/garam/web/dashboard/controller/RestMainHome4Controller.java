package com.garam.web.dashboard.controller;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.garam.web.dashboard.dto.RsvtDTO;
import com.garam.web.dashboard.service.MainService;
import com.garam.web.vehicle.dto.VehicleInfoDTO;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(value = "/home4")
@RequiredArgsConstructor
public class RestMainHome4Controller {

	private final MainService rsvtService;

	@PostMapping(value = "/weekLoan1")
	public List<VehicleInfoDTO> weekLoan1(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {

		List<VehicleInfoDTO> list = rsvtService.selectCal2Loan1(vehicleInfoDTO);

		return list;
	}

	@PostMapping(value = "/weekLoan2")
	public List<VehicleInfoDTO> weekLoan2(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {

		List<VehicleInfoDTO> list = rsvtService.selectCal2Loan2(vehicleInfoDTO);

		return list;
	}

}