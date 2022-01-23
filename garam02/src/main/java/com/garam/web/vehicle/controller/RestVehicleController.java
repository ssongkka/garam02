package com.garam.web.vehicle.controller;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.garam.web.employee.dto.EmployeeInfoDTO;
import com.garam.web.employee.service.EmployeeService;
import com.garam.web.vehicle.dto.VehicleInfoDTO;
import com.garam.web.vehicle.service.VehicleService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(value = "/ve")
@RequiredArgsConstructor
public class RestVehicleController {

	private final VehicleService vehicleService;

	@PostMapping(value = "/veInsertPic")
	public String empInsertPic(@RequestParam("vecarn") String vecarn, @RequestParam("uploadfile") MultipartFile[] files)
			throws Exception {

		String rtn = vehicleService.uploadVePic(vecarn, files);

		return rtn;
	}

	@PostMapping(value = "/veAll")
	public List<VehicleInfoDTO> empAll(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = vehicleService.selectVeAll(vehicleInfoDTO);

		return list;
	}

	@PostMapping(value = "/vedetail")
	public List<VehicleInfoDTO> empDetail(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = vehicleService.selectVeDetail(vehicleInfoDTO);

		return list;
	}

}
