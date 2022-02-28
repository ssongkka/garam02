package com.garam.web.employee.service;

import java.io.BufferedInputStream;
import java.io.InputStream;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.net.ftp.FTPClient;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.garam.web.Utils.FTPManager;
import com.garam.web.Utils.NameUtils;
import com.garam.web.Utils.Utils;
import com.garam.web.employee.dto.EmpRsvtDTO;
import com.garam.web.employee.dto.EmployeeInfoDTO;
import com.garam.web.employee.dto.Empsalary;
import com.garam.web.employee.mapper.EmployeeMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

	private final EmployeeMapper employeeMapper;
	private final FTPManager ftpmanager;

	@Override
	public String uploadEmpPic(String id, MultipartFile[] files) throws Exception {

		String rtn = "";

		String iidd = "";
		String filename = "";

		if (id.length() > 0) {
			iidd = id;
		} else {
			iidd = get_Empno();
		}

		if (files[0].getSize() > 0) {

			FTPClient ftp = ftpmanager.connect();

			if (ftp.isConnected()) {
				final String extension = FilenameUtils.getExtension(files[0].getOriginalFilename());

				InputStream inputStream = new BufferedInputStream(files[0].getInputStream());

				filename = ftpmanager.getEmpFolder() + "img/" + iidd + ".PNG";

				if (ftp.storeFile(filename, inputStream)) {
					rtn = iidd + "이미지" + "1";
				} else {
					rtn = "2";
				}

				ftpmanager.disconnect(ftp);
			} else {
				rtn = "2";
			}
		} else {
			rtn = iidd + "이미지" + "2";
		}

		return rtn;
	}

	@Override
	public int insertEmp(EmployeeInfoDTO employeeInfoDTO) throws Exception {
		if (employeeInfoDTO.getCompany() == null || employeeInfoDTO.getCompany().equals("")
				|| employeeInfoDTO.getCompany().equals("미정")) {
			employeeInfoDTO.setKind(null);
		}
		if (employeeInfoDTO.getKind() == null || employeeInfoDTO.getKind().equals("")) {
			employeeInfoDTO.setKind(null);
		}
		if (employeeInfoDTO.getJoind() == null || employeeInfoDTO.getJoind().equals("")) {
			employeeInfoDTO.setJoind(null);
		}
		if (employeeInfoDTO.getEndd() == null || employeeInfoDTO.getEndd().equals("")) {
			employeeInfoDTO.setEndd(null);
			System.out.println("없는데");
		} else {
			System.out.println("뭐지  " + employeeInfoDTO.getEndd());
		}
		if (employeeInfoDTO.getPhone2() == null || employeeInfoDTO.getPhone2().equals("")) {
			employeeInfoDTO.setPhone2(null);
		}
		if (employeeInfoDTO.getAddress() == null || employeeInfoDTO.getAddress().equals("")) {
			employeeInfoDTO.setAddress(null);
		}
		if (employeeInfoDTO.getGarage() == null || employeeInfoDTO.getGarage().equals("")) {
			employeeInfoDTO.setGarage(null);
		}
		if (employeeInfoDTO.getBosum() == null || employeeInfoDTO.getBosum().equals("")) {
			employeeInfoDTO.setBosum(null);
		}
		if (employeeInfoDTO.getBobuj() == null || employeeInfoDTO.getBobuj().equals("")
				|| employeeInfoDTO.getBobuj().equals("없음")) {
			employeeInfoDTO.setBobuj(null);
		}
		if (employeeInfoDTO.getDrvl() == null || employeeInfoDTO.getDrvl().equals("")) {
			employeeInfoDTO.setDrvl(null);
		}
		if (employeeInfoDTO.getBusl() == null || employeeInfoDTO.getBusl().equals("")) {
			employeeInfoDTO.setBusl(null);
		}
		if (employeeInfoDTO.getMemo() == null || employeeInfoDTO.getMemo().equals("")) {
			employeeInfoDTO.setMemo(null);
		}
		if (employeeInfoDTO.getBank() == null || employeeInfoDTO.getBank().equals("")) {
			employeeInfoDTO.setBank(null);
		}
		if (employeeInfoDTO.getGye() == null || employeeInfoDTO.getGye().equals("")) {
			employeeInfoDTO.setGye(null);
		}
		if (employeeInfoDTO.getGyename() == null || employeeInfoDTO.getGyename().equals("")) {
			employeeInfoDTO.setGyename(null);
		}
		if (employeeInfoDTO.getBasem() == null) {
			employeeInfoDTO.setBasem(null);
		}
		if (employeeInfoDTO.getKukm() == null) {
			employeeInfoDTO.setKukm(null);
		}
		if (employeeInfoDTO.getGunm() == null) {
			employeeInfoDTO.setGunm(null);
		}
		if (employeeInfoDTO.getGom() == null) {
			employeeInfoDTO.setGom(null);
		}
		if (employeeInfoDTO.getSanm() == null) {
			employeeInfoDTO.setSanm(null);
		}

		if (employeeInfoDTO.getImg() == null || employeeInfoDTO.getImg().equals("")) {
			employeeInfoDTO.setImg(null);
		}

		int rtn = 0;

		switch (employeeInfoDTO.getTp()) {
		case 0:
			employeeInfoDTO.setTrash(1);
			rtn = employeeMapper.insertEmp(employeeInfoDTO);
			break;

		case 1:
			if (employeeInfoDTO.getEndd() == null) {
				employeeInfoDTO.setTrash(1);
			} else {
				employeeInfoDTO.setTrash(0);
			}
			rtn = employeeMapper.updateEmp(employeeInfoDTO);
			break;
		}
		return rtn;
	}

	private String get_Empno() {
		String str = "";
		for (int i = 0; i < 6; i++) {
			switch ((int) ((Math.random() * 3) + 1)) {
			case 1:
				str += Integer.toString((int) (Math.random() * 9));
				break;
			case 2:
				str += (char) (int) ((Math.random() * 26) + 65);
				break;
			case 3:
				str += (char) (int) ((Math.random() * 26) + 97);
				break;
			}
		}

		String day = LocalDate.now().toString().replaceAll("-", "").substring(2);
		return "E-" + day + "-" + str;
	}

	@Override
	public List<EmployeeInfoDTO> selectEmpNameList() throws Exception {
		List<EmployeeInfoDTO> list = employeeMapper.selectEmpNameList();
		return list;
	}

	@Override
	public List<EmployeeInfoDTO> selectEmpAll(EmployeeInfoDTO employeeInfoDTO) throws Exception {
		List<EmployeeInfoDTO> list = employeeMapper.selectEmpAll(employeeInfoDTO);

		return list;
	}

	@Override
	public List<EmployeeInfoDTO> selectEmpName(EmployeeInfoDTO employeeInfoDTO) throws Exception {
		List<EmployeeInfoDTO> list = employeeMapper.selectEmpName(employeeInfoDTO);

		return list;
	}

	@Override
	public List<EmployeeInfoDTO> selectEmpDetail(EmployeeInfoDTO employeeInfoDTO) throws Exception {
		List<EmployeeInfoDTO> list = employeeMapper.selectEmpDetail(employeeInfoDTO);

		return list;
	}

	@Override
	public List<EmpRsvtDTO> selectEmpOperList(EmpRsvtDTO empRsvtDTO) throws Exception {
		List<EmpRsvtDTO> list = employeeMapper.selectEmpOperList(empRsvtDTO);

		return list;
	}

	@Override
	public List<EmpRsvtDTO> selectEmpOperListCnt(EmpRsvtDTO empRsvtDTO) throws Exception {
		List<EmpRsvtDTO> list = employeeMapper.selectEmpOperListCnt(empRsvtDTO);

		return list;
	}

	@Override
	public List<EmployeeInfoDTO> SelectEmpBaseMoney(EmployeeInfoDTO employeeInfoDTO) throws Exception {
		List<EmployeeInfoDTO> list = employeeMapper.SelectEmpBaseMoney(employeeInfoDTO);

		return list;
	}

	@Override
	public int empUpOper(EmpRsvtDTO empRsvtDTO) throws Exception {
		int rtn = employeeMapper.empUpOper(empRsvtDTO);

		return rtn;
	}

	@Override
	public List<Empsalary> selInMoney(Empsalary empsalary) throws Exception {
		List<Empsalary> list = employeeMapper.selInMoney(empsalary);

		return list;
	}

	@Override
	public List<Empsalary> selOutMoney(Empsalary empsalary) throws Exception {
		List<Empsalary> list = employeeMapper.selOutMoney(empsalary);

		return list;
	}

	@Override
	public List<EmpRsvtDTO> selectOperMoney(EmpRsvtDTO empRsvtDTO) throws Exception {
		List<EmpRsvtDTO> list = employeeMapper.selectOperMoney(empRsvtDTO);

		return list;
	}

	@Override
	public int insertInM(List<Map<String, Object>> map) throws Exception {

		for (int i = 0; i < map.size(); i++) {
			if (map.get(i).get("money").equals("") || map.get(i).get("money").toString().length() == 0) {
				map.get(i).replace("money", "0");
			}
		}

		HashMap<String, Object> inM = new HashMap<>();
		for (int i = 0; i < map.size(); i++) {
			inM.put("imM", map);
		}

		int rtn = employeeMapper.insertInM(inM);

		return rtn;
	}

	@Override
	public int insertOutM(List<Map<String, Object>> map) throws Exception {

		for (int i = 0; i < map.size(); i++) {
			if (map.get(i).get("money").equals("") || map.get(i).get("money").toString().length() == 0) {
				map.get(i).replace("money", "0");
			}
		}

		HashMap<String, Object> outM = new HashMap<>();
		for (int i = 0; i < map.size(); i++) {
			outM.put("outM", map);
		}

		int rtn = employeeMapper.insertOutM(outM);

		return rtn;
	}

	@Override
	public int delInM(Empsalary empsalary) throws Exception {

		int rtn = employeeMapper.delInM(empsalary);

		return rtn;
	}

	@Override
	public int delOutM(Empsalary empsalary) throws Exception {
		int rtn = employeeMapper.delOutM(empsalary);

		return rtn;
	}
}
