package com.garam.web.regular.service;

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
	public List<RegulardetailDTO> selectRegulardetail(RegulardetailDTO regulardetailDTO) throws Exception {

		List<RegulardetailDTO> list = regularMapper.selectRegulardetail(regulardetailDTO);

		return list;
	}

	@Override
	public List<RegularcourseDTO> selectRegularcourse(RegularcourseDTO regularcourseDTO) throws Exception {
		List<RegularcourseDTO> list = regularMapper.selectRegularcourse(regularcourseDTO);

		return list;
	}

	@Override
	public List<RegulardetailDTO> selectRegulardetailInfo(RegulardetailDTO regulardetailDTO) throws Exception {
		List<RegulardetailDTO> list = regularMapper.selectRegulardetailInfo(regulardetailDTO);

		return list;
	}

}
