package com.garam.employee_info.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.garam.employee_info.dto.employee_infoRequestDto;
import com.garam.employee_info.dto.employee_infoResponseDto;
import com.garam.employee_info.entity.employee_info;
import com.garam.employee_info.entity.employee_infoRepository;
import com.garam.exception.CustomException;
import com.garam.exception.ErrorCode;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class employee_infoService {

	private final employee_infoRepository employee_inforepository;

	@Transactional
	public String save_Emp(final employee_infoRequestDto params) throws Exception {

		employee_info entity = employee_inforepository.save(params.toEntity());
		return entity.getId();
	}

	public List<employee_infoResponseDto> findAll_Emp() throws Exception {

		Sort sort = Sort.by(Direction.DESC, "name");
		List<employee_info> list = employee_inforepository.findAll(sort);
		return list.stream().map(employee_infoResponseDto::new).collect(Collectors.toList());

	}

	public String update_Emp(final String id, final employee_infoRequestDto params) throws Exception {

		employee_info entity = employee_inforepository.findById(id)
				.orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
		entity.update(params.getCompany(), params.getKind(), params.getJoind(), params.getEndd(), params.getName(),
				params.getGender(), params.getBirthday(), params.getPhone1(), params.getPhone2(), params.getAddress(),
				params.getGarage(), params.getBosuM(), params.getBobuJ(), params.getDrvl(), params.getBusl(),
				params.getMemo(), params.getBank(), params.getGye(), params.getGyename(), params.getBaseM(),
				params.getKukM(), params.getGunM(), params.getGoM(), params.getSanM(), params.getTrash());

		return id;
	}
}
