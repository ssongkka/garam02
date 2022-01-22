package com.garam.web.vehicle.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.garam.web.vehicle.dto.VehicleInfoDTO;

@Mapper
public interface VehicleMapper {
	public List<VehicleInfoDTO> selectVeAll(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectVeDetail(VehicleInfoDTO vehicleInfoDTO) throws Exception;
}
