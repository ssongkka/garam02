package com.garam.web.employee.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.garam.web.employee.dto.EmpRsvtDTO;
import com.garam.web.employee.dto.EmployeeInfoDTO;
import com.garam.web.employee.dto.Empsalary;

@Mapper
public interface EmployeeMapper {
	public int insertEmp(EmployeeInfoDTO employeeInfoDTO) throws Exception;

	public List<EmployeeInfoDTO> selectEmpAll(EmployeeInfoDTO employeeInfoDTO) throws Exception;

	public List<EmployeeInfoDTO> selectEmpNameList() throws Exception;

	public List<EmployeeInfoDTO> selectEmpName(EmployeeInfoDTO employeeInfoDTO) throws Exception;

	public List<EmployeeInfoDTO> selectEmpDetail(EmployeeInfoDTO employeeInfoDTO) throws Exception;

	public int updateEmp(EmployeeInfoDTO employeeInfoDTO) throws Exception;

	public List<EmpRsvtDTO> selectEmpOperList(EmpRsvtDTO empRsvtDTO) throws Exception;

	public List<EmpRsvtDTO> selectEmpOperListCnt(EmpRsvtDTO empRsvtDTO) throws Exception;

	public List<EmployeeInfoDTO> SelectEmpBaseMoney(EmployeeInfoDTO employeeInfoDTO) throws Exception;

	public int empUpOper(EmpRsvtDTO empRsvtDTO) throws Exception;

	public List<Empsalary> selInMoney(Empsalary empsalary) throws Exception;

	public List<Empsalary> selOutMoney(Empsalary empsalary) throws Exception;
}
