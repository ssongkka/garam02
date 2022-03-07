package com.garam.web.regular.service;

import java.time.LocalDate;
import java.util.List;

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

		System.out.println(regularDTO.getConum());

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

}
