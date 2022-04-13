package com.garam.web.admin.controller;

import java.util.List;

import org.springframework.dao.DataAccessException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.garam.company.dto.CompanyDTO;
import com.garam.company.service.CompanyService;
import com.garam.web.admin.dto.UserSaveRequestDto;
import com.garam.web.dashboard.dto.OptDTO;
import com.garam.web.dashboard.dto.RsvtDTO;
import com.garam.web.dashboard.service.MainService;
import com.garam.web.employee.dto.EmployeeInfoDTO;
import com.garam.web.employee.service.EmployeeService;
import com.garam.web.login.dto.UserDTO;
import com.garam.web.login.entity.User;
import com.garam.web.login.service.UserMyService;
import com.garam.web.login.service.UserService;
import com.garam.web.vehicle.dto.VehicleInfoDTO;
import com.garam.web.vehicle.service.VehicleService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
@RequestMapping(value = "/admin")
public class AdminController {

	private final UserService userService;
	private final MainService rsvtService;
	private final EmployeeService employeeService;
	private final VehicleService vehicleService;
	private final CompanyService companyService;

	private final UserMyService userMyService;

	@GetMapping
	public String admin(@AuthenticationPrincipal User user, Model model) throws Exception {
		model.addAttribute("user", user);

		List<CompanyDTO> compa = companyService.selectCompany();
		model.addAttribute("compa", compa);

		return "admin/admin";
	}

	@PostMapping("/signup")
	public String signup(UserDTO userDTO) throws Exception {

		try {
			int rtn = userMyService.insertUser(userDTO);
		} catch (DataAccessException e) {
		} catch (Exception e) {
		}

		return "redirect:/admin";
	}
}
