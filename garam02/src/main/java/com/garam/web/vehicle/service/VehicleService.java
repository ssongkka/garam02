package com.garam.web.vehicle.service;

import java.io.File;
import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.garam.web.vehicle.dto.JukfileDTO;
import com.garam.web.vehicle.dto.VehicleInfoDTO;

public interface VehicleService {
	public int insertVe(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectVeAll(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectVeDetail(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectVeId(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectVeNameList() throws Exception;

	public String uploadVePic(String carnumber, MultipartFile[] files) throws Exception;

	public File veDownPdf(String compa) throws Exception;

	public File veDownExcel(String compa) throws Exception;

	public int updateVeRegPDF(String carnumber, MultipartFile[] files) throws Exception;

	public int updateVeInsuPDF(String carnumber, MultipartFile[] files) throws Exception;

	public int updateVeJukPDF(Map<String, Object> map, MultipartFile[] files) throws Exception;

	public int insertJuk(JukfileDTO jukfileDTO) throws Exception;

	public String showPdf(VehicleInfoDTO vehicleInfoDTO) throws Exception;

}
