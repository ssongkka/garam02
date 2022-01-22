package com.garam.web.dashboard.controller;

import java.util.List;

import org.springframework.dao.DataAccessException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.garam.web.Utils.UiUtils;
import com.garam.web.constant.Method;
import com.garam.web.dashboard.dto.RsvtDTO;
import com.garam.web.dashboard.service.MainService;
import com.garam.web.login.entity.User;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping(value = "/dashboard")
public class DashboardController extends UiUtils {

	private final MainService rsvtService;

	@GetMapping
	public String rsvt(@AuthenticationPrincipal User user, Model model) throws Exception {

		List<RsvtDTO> list = rsvtService.selectCustomerAll();
		model.addAttribute("customer", list);

		model.addAttribute("user", user);

		return "dashboard/dashBoard";
	}

	@PostMapping(value = "/rsvtregister")
	public String rsvt_Insert(@ModelAttribute("params") final RsvtDTO rsvtDTO, Model model) throws Exception {

		try {
			int a = rsvtService.insertRsvt(rsvtDTO);
			if (a < 1) {
				return ShowMgsRdrt("저장 실패", "/rsvt", Method.GET, model);
			}
		} catch (DataAccessException e) {
			return ShowMgsRdrt("데이터베이스 처리 과정에 문제가 발생하였습니다.", "/dashboard", Method.GET, model);

		} catch (Exception e) {
			return ShowMgsRdrt("시스템에 문제가 발생하였습니다", "/dashboard", Method.GET, model);
		}

		return ShowMgsRdrt("게시글 등록이 완료되었습니다.", "/dashboard", Method.GET, model);
	}

	@PostMapping(value = "/rsvtmanyregister")
	public String rsvt_Many_Insert() {
		return null;
	}

	@GetMapping(value = "/rsvtMany")
	public String rsvtMany(@AuthenticationPrincipal User user, Model model) throws Exception {
		List<RsvtDTO> list = rsvtService.selectCustomerAll();
		model.addAttribute("customer", list);
		model.addAttribute("user", user);
		return "dashboard/mainRsvtMany";
	}
}