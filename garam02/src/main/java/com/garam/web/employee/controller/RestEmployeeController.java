package com.garam.web.employee.controller;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.garam.web.employee.dto.EmpRsvtDTO;
import com.garam.web.employee.dto.EmployeeInfoDTO;
import com.garam.web.employee.service.EmployeeService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(value = "/emp")
@RequiredArgsConstructor
public class RestEmployeeController {

	private final EmployeeService employeeService;

	@PostMapping(value = "/empInsert")
	public int empInsert(@RequestBody EmployeeInfoDTO employeeInfoDTO) throws Exception {
		System.out.println("asdfasdf " + employeeInfoDTO.getTp());
		int rtn = employeeService.insertEmp(employeeInfoDTO);

		return rtn;
	}

	@PostMapping(value = "/empInsertPic")
	public String empInsertPic(@RequestParam("empid") String id, @RequestParam("uploadfile") MultipartFile[] files)
			throws Exception {

		String rtn = employeeService.uploadEmpPic(id, files);

		return rtn;
	}

	@PostMapping(value = "/empAll")
	public List<EmployeeInfoDTO> empAll(@RequestBody EmployeeInfoDTO employeeInfoDTO) throws Exception {
		List<EmployeeInfoDTO> list = employeeService.selectEmpAll(employeeInfoDTO);

		return list;
	}

	@PostMapping(value = "/empName")
	public List<EmployeeInfoDTO> empName(@RequestBody EmployeeInfoDTO employeeInfoDTO) throws Exception {
		List<EmployeeInfoDTO> list = employeeService.selectEmpName(employeeInfoDTO);

		return list;
	}

	@PostMapping(value = "/empdetail")
	public List<EmployeeInfoDTO> empDetail(@RequestBody EmployeeInfoDTO employeeInfoDTO) throws Exception {
		List<EmployeeInfoDTO> list = employeeService.selectEmpDetail(employeeInfoDTO);

		return list;
	}

	@PostMapping(value = "/empOperCnt")
	public List<EmpRsvtDTO> empOperCnt(@RequestBody EmpRsvtDTO empRsvtDTO) throws Exception {
		List<EmpRsvtDTO> list = employeeService.selectEmpOperListCnt(empRsvtDTO);

		return list;
	}

	@PostMapping(value = "/empOper")
	public List<EmpRsvtDTO> empOper(@RequestBody EmpRsvtDTO empRsvtDTO) throws Exception {
		List<EmpRsvtDTO> list = employeeService.selectEmpOperList(empRsvtDTO);

		return list;
	}

	@PostMapping(value = "/empBaseMoney")
	public List<EmployeeInfoDTO> empBaseMoney(@RequestBody EmployeeInfoDTO employeeInfoDTO) throws Exception {
		List<EmployeeInfoDTO> list = employeeService.SelectEmpBaseMoney(employeeInfoDTO);

		return list;
	}

	@PostMapping(value = "/empOperUp")
	public int empOperUp(@RequestBody EmpRsvtDTO empRsvtDTO) throws Exception {
		int rtn = employeeService.empUpOper(empRsvtDTO);

		return rtn;
	}
}
