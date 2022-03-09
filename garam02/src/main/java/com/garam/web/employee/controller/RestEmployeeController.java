package com.garam.web.employee.controller;

import java.util.List;
import java.util.Map;

import org.springframework.dao.DataAccessException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.garam.web.employee.dto.EmpRsvtDTO;
import com.garam.web.employee.dto.EmployeeInfoDTO;
import com.garam.web.employee.dto.Empsalary;
import com.garam.web.employee.dto.EmpsalaryAll;
import com.garam.web.employee.service.EmployeeService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(value = "/emp")
@RequiredArgsConstructor
public class RestEmployeeController {

	private final EmployeeService employeeService;

	@PostMapping(value = "/empInsert")
	public int empInsert(@RequestBody EmployeeInfoDTO employeeInfoDTO) throws Exception {
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

	@PostMapping(value = "/empOperUp2")
	public int empOperUp2(@RequestBody EmpRsvtDTO empRsvtDTO) throws Exception {
		int rtn = 0;

		try {
			rtn = employeeService.empUpOper2(empRsvtDTO);
		} catch (DataAccessException e) {
			rtn = -1;
		} catch (Exception e) {
			rtn = -2;
		}

		return rtn;
	}

	@PostMapping(value = "/empOperM")
	public List<EmpRsvtDTO> empOperM(@RequestBody EmpRsvtDTO empRsvtDTO) throws Exception {
		List<EmpRsvtDTO> list = employeeService.selectOperMoney(empRsvtDTO);
		return list;
	}

	@PostMapping(value = "/empAllMList")
	public List<EmpsalaryAll> empAllMList(@RequestBody EmpsalaryAll empsalaryAll) throws Exception {
		List<EmpsalaryAll> list = employeeService.selAllMoney(empsalaryAll);

		return list;
	}

	@PostMapping(value = "/empInMList")
	public List<Empsalary> empInMList(@RequestBody Empsalary empsalary) throws Exception {
		List<Empsalary> list = employeeService.selInMoney(empsalary);

		return list;
	}

	@PostMapping(value = "/empOutMList")
	public List<Empsalary> empOutMList(@RequestBody Empsalary empsalary) throws Exception {
		List<Empsalary> list = employeeService.selOutMoney(empsalary);

		return list;
	}

	@PostMapping(value = "/insertInM")
	public int insertAllo(@RequestBody List<Map<String, Object>> map) throws Exception {

		int rtn = 0;

		try {
			rtn = employeeService.insertInM(map);
		} catch (DataAccessException e) {
			rtn = -1;
		} catch (Exception e) {
			rtn = -2;
		}
		return rtn;
	}

	@PostMapping(value = "/insertOutM")
	public int insertOutM(@RequestBody List<Map<String, Object>> map) throws Exception {

		int rtn = 0;

		try {
			rtn = employeeService.insertOutM(map);
		} catch (DataAccessException e) {
			rtn = -1;
		} catch (Exception e) {
			rtn = -2;
		}
		return rtn;
	}

	@PostMapping(value = "/empInMDel")
	public int empInMDel(@RequestBody Empsalary empsalary) throws Exception {
		int rtn = employeeService.delInM(empsalary);

		return rtn;
	}

	@PostMapping(value = "/empOutMDel")
	public int empoutMDel(@RequestBody Empsalary empsalary) throws Exception {
		int rtn = employeeService.delOutM(empsalary);

		return rtn;
	}

	@PostMapping(value = "/insertAllM")
	public int insertAllM(@RequestBody EmpsalaryAll empsalaryAll) throws Exception {

		int rst = 0;
		try {
			rst = employeeService.insertAllMoney(empsalaryAll);
		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;
		}
		return rst;

	}
}
