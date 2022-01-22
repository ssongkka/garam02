package com.garam.web.vehicle.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.garam.web.Utils.UiUtils;
import com.garam.web.login.entity.User;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping(value = "/vehicle")
public class VehicleController extends UiUtils {

	@GetMapping
	public String employee(@AuthenticationPrincipal User user, Model model) throws Exception {

		model.addAttribute("user", user);

		return "vehicle/vehicle";
	}
}