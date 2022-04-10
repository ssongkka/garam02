package com.garam.web.vehicle.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.dao.DataAccessException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.garam.web.vehicle.dto.JukfileDTO;
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

	@PostMapping(value = "/veId")
	public List<VehicleInfoDTO> veId(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = vehicleService.selectVeId(vehicleInfoDTO);

		return list;
	}

	@PostMapping(value = "/veInsertRegPdf")
	public int veInsertRegPdf(@RequestParam("regcarn") String vecarn, @RequestParam("uploadfile") MultipartFile[] files)
			throws Exception {

		int rtn = vehicleService.updateVeRegPDF(vecarn, files);

		return rtn;
	}

	@PostMapping(value = "/veInsertInsuPdf")
	public int veInsertInsuPdf(@RequestParam("insucarn") String vecarn,
			@RequestParam("uploadfile") MultipartFile[] files) throws Exception {

		int rtn = vehicleService.updateVeInsuPDF(vecarn, files);
		return rtn;
	}

	@PostMapping(value = "/veInsertJukPdf")
	public int veInsertJukPdf(@RequestParam("jukday") String jukday, @RequestParam("ve1") String ve1,
			@RequestParam("id1") String id1, @RequestParam("ve2") String ve2, @RequestParam("id2") String id2,
			@RequestParam("ve3") String ve3, @RequestParam("id3") String id3, @RequestParam("ve4") String ve4,
			@RequestParam("id4") String id4, @RequestParam("ve5") String ve5, @RequestParam("id5") String id5,
			@RequestParam("uploadfile") MultipartFile[] files) throws Exception {

		Map<String, Object> map = new HashMap<String, Object>();

		map.put("jukday", jukday);

		if (ve1 != null) {
			map.put("ve1", ve1);
		} else {
			map.put("ve1", "");
		}
		if (id1 != null) {
			map.put("id1", id1);
		} else {
			map.put("id1", "");
		}

		if (ve2 != null) {
			map.put("ve2", ve2);
		} else {
			map.put("ve2", "");
		}
		if (id2 != null) {
			map.put("id2", id2);
		} else {
			map.put("id2", "");
		}

		if (ve3 != null) {
			map.put("ve3", ve3);
		} else {
			map.put("ve3", "");
		}
		if (id3 != null) {
			map.put("id3", id3);
		} else {
			map.put("id3", "");
		}

		if (ve4 != null) {
			map.put("ve4", ve4);
		} else {
			map.put("ve4", "");
		}
		if (id4 != null) {
			map.put("id4", id4);
		} else {
			map.put("id4", "");
		}

		if (ve5 != null) {
			map.put("ve5", ve5);
		} else {
			map.put("ve5", "");
		}
		if (id5 != null) {
			map.put("id5", id5);
		} else {
			map.put("id5", "");
		}

		int rtn = vehicleService.updateVeJukPDF(map, files);
		return rtn;
	}

	@PostMapping(value = "/insertJuk")
	public int insertJuk(@RequestBody JukfileDTO jukfileDTO) throws Exception {
		int rst = 0;
		try {
			rst = vehicleService.insertJuk(jukfileDTO);
		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;
		}
		return rst;
	}

	@PostMapping(value = "/showPdf")
	public String showPdf(@RequestBody VehicleInfoDTO vehicleInfoDTO) throws Exception {

		String rtn = vehicleService.showPdf(vehicleInfoDTO);

		System.out.println("곡고고고  " + rtn);

		return rtn;
	}
}
