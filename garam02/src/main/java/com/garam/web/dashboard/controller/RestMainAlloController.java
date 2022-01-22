package com.garam.web.dashboard.controller;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.garam.web.dashboard.dto.RsvtDTO;
import com.garam.web.dashboard.service.MainService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(value = "/allo")
@RequiredArgsConstructor
public class RestMainAlloController {

	private final MainService rsvtService;

	@PostMapping(value = "/customer")
	public List<RsvtDTO> customerList(@RequestBody RsvtDTO rsvtDTO) throws Exception {

		List<RsvtDTO> list = rsvtService.selectAlloCTM(rsvtDTO);

		return list;
	}

	@PostMapping(value = "/rsvt")
	public List<RsvtDTO> rsvtList(@RequestBody RsvtDTO rsvtDTO) throws Exception {

		List<RsvtDTO> list = rsvtService.selectAlloRSVT(rsvtDTO);

		return list;
	}

	@PostMapping(value = "/oper")
	public List<RsvtDTO> operList(@RequestBody RsvtDTO rsvtDTO) throws Exception {

		List<RsvtDTO> list = rsvtService.selectAlloOPER(rsvtDTO);

		return list;
	}
}