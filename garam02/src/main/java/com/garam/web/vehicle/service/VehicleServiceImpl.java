package com.garam.web.vehicle.service;

import java.io.BufferedInputStream;
import java.io.InputStream;
import java.time.LocalDate;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.net.ftp.FTPClient;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.garam.web.Utils.FTPManager;
import com.garam.web.Utils.NameUtils;
import com.garam.web.vehicle.dto.VehicleInfoDTO;
import com.garam.web.vehicle.mapper.VehicleMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VehicleServiceImpl implements VehicleService {

	private final VehicleMapper vehicleMapper;
	private final FTPManager ftpmanager;

	@Override
	public int insertVe(VehicleInfoDTO vehicleInfoDTO) throws Exception {

		int rtn = 0;

		if (vehicleInfoDTO.getOwner().equals("미정")) {
			vehicleInfoDTO.setOwner(null);
		}

		if (vehicleInfoDTO.getId().equals("미정")) {
			vehicleInfoDTO.setId(null);
		}

		if (vehicleInfoDTO.getExpire() == null || vehicleInfoDTO.getExpire().equals("")) {
			vehicleInfoDTO.setExpire(null);
		}

		if (vehicleInfoDTO.getPrice() == null || vehicleInfoDTO.getPrice() == 0) {
			vehicleInfoDTO.setPrice(0);
		}

		if (vehicleInfoDTO.getSpecial() == null || vehicleInfoDTO.getSpecial().equals("")) {
			vehicleInfoDTO.setSpecial("");
		}

		vehicleInfoDTO.setImg1(vehicleInfoDTO.getCarNumber() + "_1.png");
		vehicleInfoDTO.setImg2(vehicleInfoDTO.getCarNumber() + "_2.png");
		vehicleInfoDTO.setImg3(vehicleInfoDTO.getCarNumber() + "_3.png");

		switch (vehicleInfoDTO.getTp()) {
		case 0:
			rtn = vehicleMapper.insertVe(vehicleInfoDTO);
			break;
		case 1:
			rtn = vehicleMapper.updateVe(vehicleInfoDTO);
			break;
		}

		return rtn;
	}

	@Override
	public String uploadVePic(String carnumber, MultipartFile[] files) throws Exception {
		String rtn = "";
		String carN = "";

		if (carnumber.length() > 0) {
			carN = carnumber;
		} else {
			carN = get_Veno();
		}

		FTPClient ftp = ftpmanager.connect();
		for (int i = 0; i < files.length; i++) {
			if (files[i].getSize() > 0) {
				if (ftp.isConnected()) {
					final String extension = FilenameUtils.getExtension(files[i].getOriginalFilename());

					InputStream inputStream = new BufferedInputStream(files[i].getInputStream());

					String filename = ftpmanager.getCarFolder() + carN + "_" + (i + 1) + ".png";

					if (ftp.storeFile(filename, inputStream)) {
						rtn = carN;
					} else {
						rtn = "2";
					}
				} else {
					rtn = "2";
				}
			} else {
				rtn = carN;
			}

		}
		ftpmanager.disconnect(ftp);

		return rtn;

	}

	private String get_Veno() {
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
		return "V-" + day + "-" + str;
	}

	@Override
	public List<VehicleInfoDTO> selectVeAll(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = vehicleMapper.selectVeAll(vehicleInfoDTO);

		return list;
	}

	@Override
	public List<VehicleInfoDTO> selectVeDetail(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = vehicleMapper.selectVeDetail(vehicleInfoDTO);

		return list;
	}

	@Override
	public List<VehicleInfoDTO> selectVeAllPrint(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = vehicleMapper.selectVeAllPrint(vehicleInfoDTO);

		return list;
	}
}
