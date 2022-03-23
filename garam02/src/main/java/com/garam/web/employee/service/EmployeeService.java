package com.garam.web.employee.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.garam.web.employee.dto.EmpRsvtDTO;
import com.garam.web.employee.dto.EmployeeInfoDTO;
import com.garam.web.employee.dto.Empsalary;
import com.garam.web.employee.dto.EmpsalaryAll;
import com.garam.web.regular.dto.RegularDTO;

public interface EmployeeService {
	public int insertEmp(EmployeeInfoDTO employeeInfoDTO) throws Exception;

	public String uploadEmpPic(String id, MultipartFile[] files) throws Exception;

	public List<EmployeeInfoDTO> selectEmpAll(EmployeeInfoDTO employeeInfoDTO) throws Exception;

	public List<EmployeeInfoDTO> selectEmpNameList() throws Exception;

	public List<EmployeeInfoDTO> selectEmpName(EmployeeInfoDTO employeeInfoDTO) throws Exception;

	public List<EmployeeInfoDTO> selectEmpDetail(EmployeeInfoDTO employeeInfoDTO) throws Exception;

	public List<EmpRsvtDTO> selectEmpOperList(EmpRsvtDTO empRsvtDTO) throws Exception;

	public List<EmpRsvtDTO> selectEmpOperListCnt(EmpRsvtDTO empRsvtDTO) throws Exception;

	public List<EmployeeInfoDTO> SelectEmpBaseMoney(EmployeeInfoDTO employeeInfoDTO) throws Exception;

	public int empUpOper(List<Map<String, Object>> map) throws Exception;

	public int empUpOper2(EmpRsvtDTO empRsvtDTO) throws Exception;

	public List<Empsalary> selInMoney(Empsalary empsalary) throws Exception;

	public List<Empsalary> selOutMoney(Empsalary empsalary) throws Exception;

	public List<EmpRsvtDTO> selectOperMoney(EmpRsvtDTO empRsvtDTO) throws Exception;

	public int insertInM(List<Map<String, Object>> map) throws Exception;

	public int insertOutM(List<Map<String, Object>> map) throws Exception;

	public int delInM(Empsalary empsalary) throws Exception;

	public int delOutM(Empsalary empsalary) throws Exception;

	public List<EmpsalaryAll> selAllMoney(EmpsalaryAll empsalaryAll) throws Exception;

	public int insertAllMoney(EmpsalaryAll empsalaryAll) throws Exception;

	public List<RegularDTO> selEmpRegOperList(RegularDTO regularDTO) throws Exception;

	public List<RegularDTO> selEmpRegOperList1(RegularDTO regularDTO) throws Exception;

	public List<RegularDTO> selEmpRegOperList2(RegularDTO regularDTO) throws Exception;

	public List<EmpRsvtDTO> selectEmpAllAllo(EmpRsvtDTO empRsvtDTO) throws Exception;

	public List<RegularDTO> selectEmpAllAllo1(RegularDTO regularDTO) throws Exception;

	public int updateRegOper(RegularDTO regularDTO) throws Exception;

	public int updateRegOper1(RegularDTO regularDTO) throws Exception;

	public int updateEmpMoneys(EmployeeInfoDTO employeeInfoDTO) throws Exception;
}
