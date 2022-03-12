package com.garam.web.regular.controller;

import java.util.List;
import java.util.Map;

import org.springframework.dao.DataAccessException;
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

		System.out.println(regularDTO.getCodenum());
		System.out.println(regularDTO.getRdnum());
		System.out.println(regularDTO.getRdbus());
		System.out.println(regularDTO.getRdconn());
		System.out.println(regularDTO.getRdmoney());
		System.out.println(regularDTO.getRdaltm());
		System.out.println(regularDTO.getOpercar());
		System.out.println(regularDTO.getRdtrash());

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

	@PostMapping(value = "/delOperCar")
	public int delOperCar(@RequestBody RegularDTO regularDTO) throws Exception {

		int rst = 0;
		try {
			rst = regularService.delOperCar(regularDTO);
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

	@PostMapping(value = "/insertregRegularcourseGo")
	public int insertregRegularcourseGo(@RequestBody RegularDTO regularDTO) throws Exception {
		int rst = 0;
		try {
			rst = regularService.insertRegulardetailGO(regularDTO);
		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;
		}
		return rst;
	}

	@PostMapping(value = "/insertregRegularcourseOut")
	public int insertregRegularcourseOut(@RequestBody RegularDTO regularDTO) throws Exception {
		int rst = 0;
		try {
			rst = regularService.insertRegulardetailOUT(regularDTO);
		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;
		}
		return rst;
	}

	@PostMapping(value = "/insertregRegularcourse")
	public int insertregRegularcourse(@RequestBody RegularDTO regularDTO) throws Exception {
		int rst = 0;
		try {
			rst = regularService.insertRegularCoo(regularDTO);
		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;
		}
		return rst;
	}

	@PostMapping(value = "/delRegularcourse")
	public int delRegularcourse(@RequestBody RegularDTO regularDTO) throws Exception {
		int rst = 0;
		try {
			rst = regularService.delRegularCoo(regularDTO);
		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;
		}
		return rst;
	}

	@PostMapping(value = "/updateRegularcourse")
	public int updateRegularcourse(@RequestBody List<Map<String, Object>> map) throws Exception {
		int rst = 0;
		try {
			rst = regularService.updateRegularcourse(map);
		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;
		}
		return rst;
	}

}
