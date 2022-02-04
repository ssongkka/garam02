package com.garam.web.dashboard.service;

import java.io.Console;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.garam.web.dashboard.dto.OptDTO;
import com.garam.web.dashboard.dto.RsvtDTO;
import com.garam.web.dashboard.mapper.DashboardMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MainServiceImpl implements MainService {

	private final DashboardMapper rsvtMapper;

	@Override
	public List<RsvtDTO> selectCustomerAll() throws Exception {
		List<RsvtDTO> list = rsvtMapper.selectCustomerAll();
		return list;
	}

	@Override
	public List<RsvtDTO> selectCustomerName(RsvtDTO rsvtDTO) throws Exception {
		List<RsvtDTO> list = rsvtMapper.selectCustomerName(rsvtDTO);
		return list;
	}

	@Override
	public int insertCtm(RsvtDTO rsvtDTO) throws Exception {
		if (rsvtDTO.getCtmaddress().equals("")) {
			rsvtDTO.setCtmaddress(null);
		}
		if (rsvtDTO.getCtmtel1().equals("")) {
			rsvtDTO.setCtmtel1(null);
		}
		if (rsvtDTO.getCtmtel2().equals("")) {
			rsvtDTO.setCtmtel2(null);
		}
		if (rsvtDTO.getCtmfax().equals("")) {
			rsvtDTO.setCtmfax(null);
		}
		if (rsvtDTO.getCtmhomepage().equals("")) {
			rsvtDTO.setCtmhomepage(null);
		}
		if (rsvtDTO.getCtmstp().equals("")) {
			rsvtDTO.setCtmstp(null);
		}
		if (rsvtDTO.getCtmdetail().equals("")) {
			rsvtDTO.setCtmdetail(null);
		}

		int rtn = rsvtMapper.insertCtm(rsvtDTO);

		return rtn;
	}

	@Override
	public int insertRsvt(RsvtDTO rsvtDTO) throws Exception {

		int rtn = 0;

		if (rsvtDTO.getCtmaddress().equals("")) {
			rsvtDTO.setCtmaddress(null);
		}
		if (rsvtDTO.getCtmtel1().equals("")) {
			rsvtDTO.setCtmtel1(null);
		}
		if (rsvtDTO.getCtmtel2().equals("")) {
			rsvtDTO.setCtmtel2(null);
		}
		if (rsvtDTO.getCtmfax().equals("")) {
			rsvtDTO.setCtmfax(null);
		}
		if (rsvtDTO.getCtmhomepage().equals("")) {
			rsvtDTO.setCtmhomepage(null);
		}
		if (rsvtDTO.getCtmstp().equals("")) {
			rsvtDTO.setCtmstp(null);
		}
		if (rsvtDTO.getCtmdetail().equals("")) {
			rsvtDTO.setCtmdetail(null);
		}

		if (rsvtDTO.getEndt().equals("")) {
			rsvtDTO.setEndt(null);
		}

		if (rsvtDTO.getRsvt() == null || rsvtDTO.getRsvt().equals("")) {
			System.out.println(rsvtDTO);
			rsvtDTO.setRsvt(get_Rsvt(rsvtDTO.getStday().toString()));
			if (rsvtDTO.getCtmtrash() > 1) {
				rsvtDTO.setCtmno(get_Ctmno());
				int a = rsvtMapper.insertCtm(rsvtDTO);
				int b = rsvtMapper.insertRsvt(rsvtDTO);
				rtn = a * b;
			} else {
				rtn = rsvtMapper.insertRsvt(rsvtDTO);
			}

		} else {
		}
		return rtn;
	}

	private String get_Rsvt(String stday) {
		String rsvt = "R-" + stday.substring(2).replace("-", "") + "-"
				+ LocalDateTime.now().toString().substring(2, 22).replace("-", "").replace(":", "").replace(".", "-");

		return rsvt;
	}

	private String get_Ctmno() {
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
		return "C-" + day + "-" + str;
	}

	@Override
	public List<RsvtDTO> selectAlloCTM(RsvtDTO rsvtDTO) throws Exception {

		List<RsvtDTO> list = rsvtMapper.selectAlloCTM(rsvtDTO);

		return list;
	}

	@Override
	public List<RsvtDTO> selectCustomerOtherCompa() throws Exception {
		List<RsvtDTO> list = rsvtMapper.selectCustomerOtherCompa();

		return list;
	}

	@Override
	public List<RsvtDTO> selectAlloRSVT(RsvtDTO rsvtDTO) throws Exception {
		List<RsvtDTO> list = rsvtMapper.selectAlloRSVT(rsvtDTO);

		return list;
	}

	@Override
	public List<RsvtDTO> selectAlloOPER(RsvtDTO rsvtDTO) throws Exception {

		List<RsvtDTO> list = rsvtMapper.selectAlloOPER(rsvtDTO);

		return list;
	}

	@Override
	public int insertManyRsvt(List<Map<String, Object>> map) throws Exception {

		for (int i = 0; i < map.size(); i++) {
			if (map.get(i).get("endt").equals("") || map.get(i).get("endt").toString().length() == 0) {
				map.get(i).replace("endt", null);
			}

		}

		HashMap<String, Object> rsvt = new HashMap<>();
		for (int i = 0; i < map.size(); i++) {
			rsvt.put("rsvt", map);
		}

		int rtn = rsvtMapper.insertManyRsvt(rsvt);

		return rtn;
	}

	@Override
	public List<RsvtDTO> selectWeekBusNum(RsvtDTO rsvtDTO) throws Exception {
		List<RsvtDTO> list = rsvtMapper.selectWeekBusNum(rsvtDTO);

		return list;
	}

	@Override
	public List<OptDTO> selectOpt() throws Exception {
		List<OptDTO> list = rsvtMapper.selectOpt();

		return list;
	}
}
