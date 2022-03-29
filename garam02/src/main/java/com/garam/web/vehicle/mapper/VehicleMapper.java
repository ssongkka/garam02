package com.garam.web.vehicle.mapper;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.garam.web.vehicle.dto.JukfileDTO;
import com.garam.web.vehicle.dto.VehicleInfoDTO;

@Mapper
public interface VehicleMapper {
	public int insertVe(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public int updateVe(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectVeAll(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectVeDetail(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectVeId(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectVeAllPrint(String compa) throws Exception;

	public int updateVePDF(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectVeNameList() throws Exception;

	public int insertJuk(JukfileDTO jukfileDTO) throws Exception;

	public int updateVeJuk(HashMap<String, Object> map) throws Exception;
}
