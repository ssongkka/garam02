package com.garam.web.regular.service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.garam.web.regular.dto.RegularDTO;
import com.garam.web.regular.dto.RegularcourseDTO;
import com.garam.web.regular.dto.RegulardetailDTO;
import com.garam.web.regular.mapper.RegularMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RegularServiceImpl implements RegularService {

	private final RegularMapper regularMapper;

	@Override
	public List<RegularDTO> selctRegular(RegularDTO regularDTO) throws Exception {

		List<RegularDTO> list = regularMapper.selctRegular(regularDTO);

		return list;
	}

	@Override
	public List<RegularDTO> selctRegularInfo(RegularDTO regularDTO) throws Exception {

		List<RegularDTO> list = regularMapper.selctRegularInfo(regularDTO);

		return list;
	}

	@Override
	public List<RegulardetailDTO> selectRegulardetail(RegularDTO regularDTO) throws Exception {

		List<RegulardetailDTO> list = regularMapper.selectRegulardetail(regularDTO);

		return list;
	}

	@Override
	public List<RegularcourseDTO> selectRegularcourse(RegularDTO regularDTO) throws Exception {
		List<RegularcourseDTO> list = regularMapper.selectRegularcourse(regularDTO);

		return list;
	}

	@Override
	public List<RegulardetailDTO> selectRegulardetailInfo(RegularDTO regularDTO) throws Exception {
		List<RegulardetailDTO> list = regularMapper.selectRegulardetailInfo(regularDTO);

		return list;
	}

	@Override
	public int insertRegular(RegularDTO regularDTO) throws Exception {

		regularDTO.setConum(get_dingding("Reg"));

		int rtn = regularMapper.insertRegular(regularDTO);

		return rtn;
	}

	private String get_dingding(String code) {
		String str = "";
		for (int i = 0; i < 6; i++) {
			switch ((int) ((Math.random() * 3) + 1)) {
			case 1:
				str += Integer.toString((int) (Math.random() * 9));
				break;
			case 2:
				str += (char) (int) ((Math.random() * 26) + 65);
				break;
			case 3:
				str += (char) (int) ((Math.random() * 26) + 97);
				break;
			}
		}

		String day = LocalDate.now().toString().replaceAll("-", "").substring(2);
		return code + day + "-" + str;
	}

	@Override
	public int insertRegulardetail(RegularDTO regularDTO) throws Exception {
		regularDTO.setCodenum(get_dingding("RDe"));
		regularDTO.setIdname(get_dingding("RCo"));
		regularDTO.setIdphone1(get_dingding("RCo"));
		regularDTO.setIdvehicle(get_dingding("RCo"));
		int rtn = regularMapper.insertRegulardetail(regularDTO);

		return rtn;
	}

	@Override
	public int updateRegulardetail(RegularDTO regularDTO) throws Exception {
		int rtn = regularMapper.updateRegulardetail(regularDTO);

		return rtn;
	}

	@Override
	public int updateRegulardetailOder(List<Map<String, Object>> map) throws Exception {
		HashMap<String, Object> rde = new HashMap<>();
		for (int i = 0; i < map.size(); i++) {
			rde.put("rde", map);
		}

		int rtn = regularMapper.updateRegulardetailOder(rde);

		return rtn;
	}

	@Override
	public int delOperCar(RegularDTO regularDTO) throws Exception {
		int rtn = regularMapper.delOperCar(regularDTO);

		return rtn;
	}

	@Override
	public int delRegulardetail(RegularDTO regularDTO) throws Exception {
		int rtn = regularMapper.delRegulardetail(regularDTO);

		return rtn;
	}

}
