package com.garam.web.admin.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.garam.web.admin.mapper.AdminMapper;
import com.garam.web.vehicle.dto.VehicleInfoDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

	private final AdminMapper adminMapper;

	@Override
	public List<VehicleInfoDTO> selectVeAllComStatic(VehicleInfoDTO vehicleInfoDTO) throws Exception {

		List<VehicleInfoDTO> list = adminMapper.selectVeAllComStatic(vehicleInfoDTO);

		return list;
	}

}