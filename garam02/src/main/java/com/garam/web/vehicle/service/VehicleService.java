package com.garam.web.vehicle.service;

import java.util.List;

import com.garam.web.vehicle.dto.VehicleInfoDTO;

public interface VehicleService {
	public List<VehicleInfoDTO> selectVeAll(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectVeDetail(VehicleInfoDTO vehicleInfoDTO) throws Exception;
}
