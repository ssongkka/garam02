package com.garam.vehicle_info.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.garam.exception.CustomException;
import com.garam.exception.ErrorCode;
import com.garam.vehicle_info.dto.vehicle_infoRequestDto;
import com.garam.vehicle_info.dto.vehicle_infoResponseDto;
import com.garam.vehicle_info.entity.vehicle_info;
import com.garam.vehicle_info.entity.vehicle_infoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class vehicle_infoService {

	private final vehicle_infoRepository vehicle_inforepository;

	@Transactional
	public String save_Ve(final vehicle_infoRequestDto params) throws Exception {
		vehicle_info entity = vehicle_inforepository.save(params.toEntity());
		return entity.getCarNumber();
	}

	public List<vehicle_infoResponseDto> findAll_Ve() {
		Sort sort = Sort.by(Direction.DESC, "vehicle");
		List<vehicle_info> list = vehicle_inforepository.findAll(sort);

		return list.stream().map(vehicle_infoResponseDto::new).collect(Collectors.toList());
	}

	@Transactional
	public String update_Ve(final String carNumber, final vehicle_infoRequestDto params) throws Exception {

		vehicle_info entity = vehicle_inforepository.findById(carNumber)
				.orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));

		entity.update(params.getCarNumber(), params.getVehicle(), params.getCompany(), params.getOwner(),
				params.getBus(), params.getBrand(), params.getName(), params.getGrade(), params.getFuel(),
				params.getNum(), params.getColor(), params.getRegist(), params.getExpire(), params.getPrice(),
				params.getSpecial(), params.getTrash());

		return null;
	}
}