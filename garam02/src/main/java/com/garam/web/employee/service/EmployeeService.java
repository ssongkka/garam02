package com.garam.web.employee.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.garam.web.employee.dto.EmployeeInfoDTO;

public interface EmployeeService {
	public int insertEmp(EmployeeInfoDTO employeeInfoDTO) throws Exception;

	public String uploadEmpPic(String id, MultipartFile[] files) throws Exception;

	public List<EmployeeInfoDTO> selectEmpAll(EmployeeInfoDTO employeeInfoDTO) throws Exception;

	public List<EmployeeInfoDTO> selectEmpName(EmployeeInfoDTO employeeInfoDTO) throws Exception;

	public List<EmployeeInfoDTO> selectEmpDetail(EmployeeInfoDTO employeeInfoDTO) throws Exception;

}
