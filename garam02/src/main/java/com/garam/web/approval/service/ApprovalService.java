package com.garam.web.approval.service;

import java.util.List;

import com.garam.web.approval.dto.ApprovalDTO;
import com.garam.web.dashboard.dto.RsvtDTO;
import com.garam.web.employee.dto.EmployeeInfoDTO;
import com.garam.web.vehicle.dto.VehicleInfoDTO;

public interface ApprovalService {
	public List<ApprovalDTO> selectapppaper() throws Exception;

	public List<ApprovalDTO> selectapppaperline(ApprovalDTO approvalDTO) throws Exception;

	public List<ApprovalDTO> selectapppaperhelp(ApprovalDTO approvalDTO) throws Exception;

	public List<ApprovalDTO> selectapppapercham(ApprovalDTO approvalDTO) throws Exception;

	public List<EmployeeInfoDTO> selectApprEmp(EmployeeInfoDTO employeeInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectApprVe(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectApprAcc(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<EmployeeInfoDTO> selectApprSal(EmployeeInfoDTO employeeInfoDTO) throws Exception;

	public List<RsvtDTO> selectApprRsvtMoney(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectApprRsvt(RsvtDTO rsvtDTO) throws Exception;

	public List<VehicleInfoDTO> selectApprInsu(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectApprInsuSepa(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectApprLoan(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectApprLoanSepa(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectApprInspec(VehicleInfoDTO vehicleInfoDTO) throws Exception;

	public List<VehicleInfoDTO> selectApprMaint(VehicleInfoDTO vehicleInfoDTO) throws Exception;
}
