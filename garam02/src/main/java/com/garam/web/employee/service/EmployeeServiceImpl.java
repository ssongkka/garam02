package com.garam.web.employee.service;

import java.io.BufferedInputStream;
import java.io.InputStream;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.net.ftp.FTPClient;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.garam.web.Utils.FTPManager;
import com.garam.web.Utils.NameUtils;
import com.garam.web.Utils.Utils;
import com.garam.web.employee.dto.EmployeeInfoDTO;
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

				filename = ftpmanager.getEmpFolder() + iidd + ".png";

				if (ftp.storeFile(filename, inputStream)) {
					rtn = iidd;
				} else {
					rtn = "2";
				}

				ftpmanager.disconnect(ftp);
			} else {
				rtn = "2";
			}
		} else {
			rtn = iidd;
		}

		return rtn;
	}

	@Override
	public int insertEmp(EmployeeInfoDTO employeeInfoDTO) throws Exception {
		if (employeeInfoDTO.getKind() == null || employeeInfoDTO.getKind().equals("")) {
			employeeInfoDTO.setKind(null);
		}
		if (employeeInfoDTO.getJoind() == null || employeeInfoDTO.getJoind().equals("")) {
			employeeInfoDTO.setJoind(null);
		}
		if (employeeInfoDTO.getEndd() == null || employeeInfoDTO.getEndd().equals("")) {
			employeeInfoDTO.setEndd(null);
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
		if (employeeInfoDTO.getBobuj() == null || employeeInfoDTO.getBobuj().equals("")) {
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

		int rtn = 0;

		if (employeeInfoDTO.getImg() == null || employeeInfoDTO.getImg().equals("")) {
			employeeInfoDTO.setImg(null);
		} else {

			employeeInfoDTO.setImg(Utils.getFileName(employeeInfoDTO.getImg(), employeeInfoDTO.getId()));
		}

		switch (employeeInfoDTO.getTp()) {
		case 0:
			rtn = employeeMapper.insertEmp(employeeInfoDTO);
			break;

		case 1:
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
}
