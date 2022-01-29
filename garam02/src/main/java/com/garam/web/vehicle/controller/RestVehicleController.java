package com.garam.web.vehicle.controller;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.nio.file.Files;
import java.util.List;

import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.InputStreamSource;
import org.springframework.core.io.Resource;
import org.springframework.dao.DataAccessException;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.garam.web.vehicle.dto.VehicleInfoDTO;
import com.garam.web.vehicle.service.VehicleService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(value = "/ve")
@RequiredArgsConstructor
public class RestVehicleController {

	private final VehicleService vehicleService;

	@PostMapping(value = "/veInsert")
	public int veInsert(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {
		int rst = 0;
		try {
			rst = vehicleService.insertVe(vehicleInfoDTO);
		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;

		}
		return rst;
	}

	@PostMapping(value = "/veInsertPic")
	public String veInsertPic(@RequestParam("vecarn") String vecarn, @RequestParam("uploadfile") MultipartFile[] files)
			throws Exception {

		String rtn = vehicleService.uploadVePic(vecarn, files);

		return rtn;
	}

	@PostMapping(value = "/veAll")
	public List<VehicleInfoDTO> veAll(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = vehicleService.selectVeAll(vehicleInfoDTO);

		return list;
	}

	@PostMapping(value = "/vedetail")
	public List<VehicleInfoDTO> veDetail(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = vehicleService.selectVeDetail(vehicleInfoDTO);

		return list;
	}
}
