package com.garam.web.approval.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.garam.web.approval.dto.ApprovalDTO;
import com.garam.web.approval.mapper.ApprovalMapper;
import com.garam.web.dashboard.dto.RsvtDTO;
import com.garam.web.employee.dto.EmployeeInfoDTO;
import com.garam.web.vehicle.dto.VehicleInfoDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ApprovalServiceImpl implements ApprovalService {

	private final ApprovalMapper approvalMapper;

	@Override
	public List<ApprovalDTO> selectapppaper() throws Exception {
		List<ApprovalDTO> list = approvalMapper.selectapppaper();
		return list;
	}

	@Override
	public List<ApprovalDTO> selectapppaperline(ApprovalDTO approvalDTO) throws Exception {
		List<ApprovalDTO> list = approvalMapper.selectapppaperline(approvalDTO);
		return list;
	}

	@Override
	public List<ApprovalDTO> selectapppaperhelp(ApprovalDTO approvalDTO) throws Exception {
		List<ApprovalDTO> list = approvalMapper.selectapppaperhelp(approvalDTO);
		return list;
	}

	@Override
	public List<ApprovalDTO> selectapppapercham(ApprovalDTO approvalDTO) throws Exception {
		List<ApprovalDTO> list = approvalMapper.selectapppapercham(approvalDTO);
		return list;
	}

	@Override
	public List<EmployeeInfoDTO> selectApprEmp(EmployeeInfoDTO employeeInfoDTO) throws Exception {
		List<EmployeeInfoDTO> list = approvalMapper.selectApprEmp(employeeInfoDTO);
		return list;
	}

	@Override
	public List<VehicleInfoDTO> selectApprVe(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = approvalMapper.selectApprVe(vehicleInfoDTO);
		return list;
	}

	@Override
	public List<VehicleInfoDTO> selectApprAcc(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = approvalMapper.selectApprAcc(vehicleInfoDTO);
		return list;
	}

	@Override
	public List<EmployeeInfoDTO> selectApprSal(EmployeeInfoDTO employeeInfoDTO) throws Exception {
		List<EmployeeInfoDTO> list = approvalMapper.selectApprSal(employeeInfoDTO);
		return list;
	}

	@Override
	public List<RsvtDTO> selectApprRsvtMoney(RsvtDTO rsvtDTO) throws Exception {
		List<RsvtDTO> list = approvalMapper.selectApprRsvtMoney(rsvtDTO);
		return list;
	}

	@Override
	public List<RsvtDTO> selectApprRsvt(RsvtDTO rsvtDTO) throws Exception {
		List<RsvtDTO> list = approvalMapper.selectApprRsvt(rsvtDTO);
		return list;
	}

	@Override
	public List<VehicleInfoDTO> selectApprInsu(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = approvalMapper.selectApprInsu(vehicleInfoDTO);
		return list;
	}

	@Override
	public List<VehicleInfoDTO> selectApprInsuSepa(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = approvalMapper.selectApprInsuSepa(vehicleInfoDTO);
		return list;
	}

	@Override
	public List<VehicleInfoDTO> selectApprLoan(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = approvalMapper.selectApprLoan(vehicleInfoDTO);
		return list;
	}

	@Override
	public List<VehicleInfoDTO> selectApprLoanSepa(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = approvalMapper.selectApprLoanSepa(vehicleInfoDTO);
		return list;
	}

	@Override
	public List<VehicleInfoDTO> selectApprInspec(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = approvalMapper.selectApprInspec(vehicleInfoDTO);
		return list;
	}

	@Override
	public List<VehicleInfoDTO> selectApprMaint(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = approvalMapper.selectApprMaint(vehicleInfoDTO);
		return list;
	}

}
