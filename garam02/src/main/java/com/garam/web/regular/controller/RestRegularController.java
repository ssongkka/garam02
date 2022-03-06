package com.garam.web.regular.controller;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.garam.web.regular.dto.RegularDTO;
import com.garam.web.regular.dto.RegularcourseDTO;
import com.garam.web.regular.dto.RegulardetailDTO;
import com.garam.web.regular.service.RegularService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(value = "/reg")
@RequiredArgsConstructor
public class RestRegularController {

	private final RegularService regularService;

	@PostMapping(value = "/regRegular")
	public List<RegularDTO> regRegular(@RequestBody RegularDTO regularDTO) throws Exception {
		List<RegularDTO> list = regularService.selctRegular(regularDTO);

		return list;
	}

	@PostMapping(value = "/regRegularInfo")
	public List<RegularDTO> regRegularInfo(@RequestBody RegularDTO regularDTO) throws Exception {
		List<RegularDTO> list = regularService.selctRegularInfo(regularDTO);

		return list;
	}

	@PostMapping(value = "/regRegularde")
	public List<RegulardetailDTO> regRegularde(@RequestBody RegulardetailDTO regulardetailDTO) throws Exception {
		List<RegulardetailDTO> list = regularService.selectRegulardetail(regulardetailDTO);

		return list;
	}

	@PostMapping(value = "/regRegulardeinfo")
	public List<RegulardetailDTO> regRegulardeinfo(@RequestBody RegulardetailDTO regulardetailDTO) throws Exception {
		List<RegulardetailDTO> list = regularService.selectRegulardetailInfo(regulardetailDTO);

		return list;
	}

	@PostMapping(value = "/regRegularcourse")
	public List<RegularcourseDTO> regRegularcourse(@RequestBody RegularcourseDTO regularcourseDTO) throws Exception {
		List<RegularcourseDTO> list = regularService.selectRegularcourse(regularcourseDTO);

		return list;
	}
}
