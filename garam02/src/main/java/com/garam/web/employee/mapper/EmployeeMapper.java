package com.garam.web.employee.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.garam.web.employee.dto.EmployeeInfoDTO;

@Mapper
public interface EmployeeMapper {
	public int insertEmp(EmployeeInfoDTO employeeInfoDTO) throws Exception;

	public List<EmployeeInfoDTO> selectEmpAll(EmployeeInfoDTO employeeInfoDTO) throws Exception;

	public List<EmployeeInfoDTO> selectEmpName(EmployeeInfoDTO employeeInfoDTO) throws Exception;

	public List<EmployeeInfoDTO> selectEmpDetail(EmployeeInfoDTO employeeInfoDTO) throws Exception;

	public int updateEmp(EmployeeInfoDTO employeeInfoDTO) throws Exception;
}
