package com.garam.web.regular.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.dao.DataAccessException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.garam.web.dashboard.dto.RsvtDTO;
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
	public List<RegulardetailDTO> regRegularde(@RequestBody RegularDTO regularDTO) throws Exception {
		List<RegulardetailDTO> list = regularService.selectRegulardetail(regularDTO);

		return list;
	}

	@PostMapping(value = "/regRegulardeinfo")
	public List<RegulardetailDTO> regRegulardeinfo(@RequestBody RegularDTO regularDTO) throws Exception {
		List<RegulardetailDTO> list = regularService.selectRegulardetailInfo(regularDTO);

		return list;
	}

	@PostMapping(value = "/regRegularcourse")
	public List<RegularcourseDTO> regRegularcourse(@RequestBody RegularDTO regularDTO) throws Exception {
		List<RegularcourseDTO> list = regularService.selectRegularcourse(regularDTO);

		return list;
	}

	@PostMapping(value = "/regularDetailRegister")
	public int regularDetailRegister(@RequestBody RegularDTO regularDTO) throws Exception {
		int rst = 0;
		try {
			rst = regularService.insertRegulardetail(regularDTO);
		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;
		}
		return rst;
	}

	@PostMapping(value = "/regularDetaildel")
	public int regularDetaildel(@RequestBody RegularDTO regularDTO) throws Exception {
		int rst = 0;
		if (regularDTO.getRdtrash() > 0) {
			try {
				rst = regularService.delRegulardetail(regularDTO);
			} catch (DataAccessException e) {
				rst = -1;

			} catch (Exception e) {
				rst = -2;
			}
		} else {
			try {
				rst = regularService.updateRegulardetail(regularDTO);
			} catch (DataAccessException e) {
				rst = -1;

			} catch (Exception e) {
				rst = -2;
			}
		}
		return rst;
	}

	@PostMapping(value = "/updateRegulardetail")
	public int updateRegulardetail(@RequestBody RegularDTO regularDTO) throws Exception {

		int rst = 0;
		try {
			rst = regularService.updateRegulardetail(regularDTO);
		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;
		}
		return rst;
	}

	@PostMapping(value = "/updateRegulardetailOrder")
	public int updateRegulardetailOrder(@RequestBody List<Map<String, Object>> map) throws Exception {
		int rst = 0;
		try {
			rst = regularService.updateRegulardetailOder(map);
		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;
		}
		return rst;
	}
}
