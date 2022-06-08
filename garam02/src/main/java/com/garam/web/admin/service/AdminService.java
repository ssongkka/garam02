package com.garam.web.admin.service;

import java.util.List;

import com.garam.web.vehicle.dto.VehicleInfoDTO;

public interface AdminService {

	public List<VehicleInfoDTO> selectVeAllComStatic(VehicleInfoDTO vehicleInfoDTO) throws Exception;

}
