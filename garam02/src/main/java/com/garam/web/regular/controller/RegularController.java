package com.garam.web.regular.controller;

import java.util.List;

import org.springframework.dao.DataAccessException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.garam.company.dto.CompanyDTO;
import com.garam.company.service.CompanyService;
import com.garam.web.Utils.UiUtils;
import com.garam.web.constant.Method;
import com.garam.web.dashboard.dto.OptDTO;
import com.garam.web.dashboard.dto.RsvtDTO;
import com.garam.web.dashboard.service.MainService;
import com.garam.web.employee.dto.EmployeeInfoDTO;
import com.garam.web.employee.service.EmployeeService;
import com.garam.web.login.entity.User;
import com.garam.web.regular.dto.RegularDTO;
import com.garam.web.regular.service.RegularService;
import com.garam.web.vehicle.dto.VehicleInfoDTO;
import com.garam.web.vehicle.service.VehicleService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping(value = "/regular")
public class RegularController extends UiUtils {

	private final MainService rsvtService;
	private final EmployeeService employeeService;
	private final VehicleService vehicleService;
	private final CompanyService companyService;
	private final RegularService regularService;

	@GetMapping
	public String regular(@AuthenticationPrincipal User user, Model model) throws Exception {

		model.addAttribute("user", user);

		List<CompanyDTO> company = companyService.selectCompany();
		model.addAttribute("company", company);

		List<RsvtDTO> list = rsvtService.selectCustomerAll();
		model.addAttribute("customer", list);

		List<OptDTO> opt = rsvtService.selectOpt();
		model.addAttribute("opt", opt);

		return "regular/regular";
	}

	@PostMapping(value = "/regularRegister")
	public String rsvt_Insert(@ModelAttribute("params") final RegularDTO regularDTO, Model model) throws Exception {
		try {
			int a = regularService.insertRegular(regularDTO);
			if (a < 1) {
				return ShowMgsRdrt("저장 실패", "/regular", Method.GET, model);
			}
		} catch (DataAccessException e) {
			return ShowMgsRdrt("데이터베이스 처리 과정에 문제가 발생하였습니다.", "/regular", Method.GET, model);

		} catch (Exception e) {
			return ShowMgsRdrt("시스템에 문제가 발생하였습니다", "/regular", Method.GET, model);
		}

		return ShowMgsRdrt("정기운행 등록 완료", "/regular", Method.GET, model);
	}

	@PostMapping(value = "/regularCh")
	public String regularCh(@AuthenticationPrincipal User user, @ModelAttribute("params") final RegularDTO regularDTO,
			Model model) throws Exception {

		model.addAttribute("user", user);

		List<CompanyDTO> company = companyService.selectCompany();
		model.addAttribute("company", company);

		List<RsvtDTO> list = rsvtService.selectCustomerAll();
		model.addAttribute("customer", list);

		List<OptDTO> opt = rsvtService.selectOpt();
		model.addAttribute("opt", opt);

		model.addAttribute("code", regularDTO);

		return "regular/regularCh";
	}
}