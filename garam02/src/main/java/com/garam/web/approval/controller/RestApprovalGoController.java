package com.garam.web.approval.controller;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.garam.web.approval.dto.ApprovalDTO;
import com.garam.web.approval.service.ApprovalService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(value = "/apprgo")
@RequiredArgsConstructor
public class RestApprovalGoController {

	private final ApprovalService approvalService;

	@PostMapping(value = "/going")
	public List<ApprovalDTO> going(@RequestBody ApprovalDTO approvalDTO) throws Exception {

		List<ApprovalDTO> list = approvalService.selectApprIng(approvalDTO);

		return list;
	}

}