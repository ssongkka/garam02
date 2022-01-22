package com.garam.web.admin.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.garam.web.admin.dto.UserSaveRequestDto;
import com.garam.web.login.entity.User;
import com.garam.web.login.service.UserService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
@RequestMapping(value = "/admin")
public class SignupController {

	private final UserService userService;

	@GetMapping
	public String admin(@AuthenticationPrincipal User user, Model model) {
		model.addAttribute("user", user);
		return "admin/admin";
	}

	@GetMapping("/signup")
	public String signup(@AuthenticationPrincipal User user, Model model) {

		return "admin/signup";
	}

	@PostMapping("/signup")
	public String signup(UserSaveRequestDto userSaveDto) {
		userService.save(userSaveDto);
		return "redirect:/admin";
	}
}
