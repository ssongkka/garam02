package com.garam.web.employee.controller;

import java.util.List;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.garam.web.Utils.UiUtils;
import com.garam.web.employee.dto.EmployeeInfoDTO;
import com.garam.web.employee.service.EmployeeService;
import com.garam.web.login.entity.User;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping(value = "/employee")
public class EmployeeController extends UiUtils {

	private final EmployeeService employeeService;

	@GetMapping
	public String employee(@AuthenticationPrincipal User user, Model model) throws Exception {

		model.addAttribute("user", user);

		return "employee/employee";
	}
}