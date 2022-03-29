package com.garam.web.dashboard.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.garam.web.dashboard.dto.OptDTO;
import com.garam.web.dashboard.dto.RegularOperDTO;
import com.garam.web.dashboard.dto.RsvtDTO;
import com.garam.web.dashboard.mapper.DashboardMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MainServiceImpl implements MainService {

	private final DashboardMapper rsvtMapper;

	@Override
	public List<RsvtDTO> selectCustomerAll(RsvtDTO rsvtDTO) throws Exception {
		List<RsvtDTO> list = rsvtMapper.selectCustomerAll(rsvtDTO);
		return list;
	}

	@Override
	public List<RsvtDTO> selectCustomerName(RsvtDTO rsvtDTO) throws Exception {
		List<RsvtDTO> list = rsvtMapper.selectCustomerName(rsvtDTO);
		return list;
	}

	@Override
	public List<RsvtDTO> insertCtm(RsvtDTO rsvtDTO) throws Exception {
		if (rsvtDTO.getCtmaddress() == null || rsvtDTO.getCtmaddress().equals("")) {
			rsvtDTO.setCtmaddress(null);
		}
		if (rsvtDTO.getCtmtel1() == null || rsvtDTO.getCtmtel1().equals("")) {
			rsvtDTO.setCtmtel1(null);
		}
		if (rsvtDTO.getCtmtel2() == null || rsvtDTO.getCtmtel2().equals("")) {
			rsvtDTO.setCtmtel2(null);
		}
		if (rsvtDTO.getCtmfax() == null || rsvtDTO.getCtmfax().equals("")) {
			rsvtDTO.setCtmfax(null);
		}
		if (rsvtDTO.getCtmhomepage() == null || rsvtDTO.getCtmhomepage().equals("")) {
			rsvtDTO.setCtmhomepage(null);
		}
		if (rsvtDTO.getCtmstp() == null || rsvtDTO.getCtmstp().equals("")) {
			rsvtDTO.setCtmstp(null);
		}
		if (rsvtDTO.getCtmdetail() == null || rsvtDTO.getCtmdetail().equals("")) {
			rsvtDTO.setCtmdetail(null);
		}
		if (rsvtDTO.getCtmemail() == null || rsvtDTO.getCtmemail().equals("")) {
			rsvtDTO.setCtmemail(null);
		}
		if (rsvtDTO.getCtmcompanum() == null || rsvtDTO.getCtmcompanum().equals("")) {
			rsvtDTO.setCtmcompanum(null);
		}
		if (rsvtDTO.getCtmno() == null || rsvtDTO.getCtmno().equals("")) {
			rsvtDTO.setCtmno(get_Ctmno());
		}

		String ctmNo = get_Oper("C");

		rsvtDTO.setCtmno(ctmNo);

		List<RsvtDTO> list = new ArrayList<RsvtDTO>();

		list.add(rsvtDTO);

		int rtn = rsvtMapper.insertCtm(rsvtDTO);
		if (rtn < 1) {
			list.get(0).setCtmtrash(-1);
		}

		return list;
	}

	@Override
	public int insertRsvt(RsvtDTO rsvtDTO) throws Exception {
		if (rsvtDTO.getNumm() == null || rsvtDTO.getNumm().equals("")) {
			rsvtDTO.setNumm(0);
		}

		if (rsvtDTO.getEndt().equals("")) {
			rsvtDTO.setEndt(null);
		}
		rsvtDTO.setRsvt(get_Rsvt(rsvtDTO.getStday().toString()));
		int rtn = rsvtMapper.insertRsvt(rsvtDTO);

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
	public List<RsvtDTO> selectRSVT(RsvtDTO rsvtDTO) throws Exception {
		List<RsvtDTO> list = rsvtMapper.selectRSVT(rsvtDTO);

		return list;
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
	public List<RsvtDTO> insertOper(List<Map<String, Object>> map) throws Exception {
		String opernum = get_Oper("O");
		int cnt = 0;
		int cnt1 = 0;
		for (int i = 0; i < map.size(); i++) {
			if (map.get(i).get("opernum").equals("") || map.get(i).get("opernum").toString().length() == 0) {
				map.get(i).replace("opernum", opernum);
			} else {
				opernum = (String) map.get(i).get("opernum");
				cnt++;
			}

			if (Integer.parseInt((String) map.get(i).get("opertype")) > 1) {
				cnt1++;
			}

		}

		RsvtDTO dto = new RsvtDTO();

		HashMap<String, Object> oper = new HashMap<>();
		for (int i = 0; i < map.size(); i++) {
			oper.put("oper", map);
		}

		String rtn = "";

		if (cnt1 > 0) {
			if (rsvtMapper.updateOper(oper) == 0) {
				if (rsvtMapper.insertOper(oper) > 0) {
					dto.setOpernum(opernum);
				} else {
					dto.setOpernum("");
				}
			} else {
				dto.setOpernum(opernum);
			}
		} else {
			if (cnt > 0) {
				if (rsvtMapper.updateOper(oper) > 0) {
					dto.setOpernum(opernum);
				} else {
					dto.setOpernum("");
				}
			} else {
				if (rsvtMapper.insertOper(oper) > 0) {
					dto.setOpernum(opernum);
				} else {
					dto.setOpernum("");
				}
			}
		}

		List<RsvtDTO> list = new ArrayList<RsvtDTO>();
		list.add(dto);

		return list;
	}

	private String get_Oper(String code) {
		String oper = code + "-"
				+ LocalDateTime.now().toString().substring(2, 22).replace("-", "").replace(":", "").replace(".", "-");

		return oper;
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

	@Override
	public List<RsvtDTO> selectOneWayOper(RsvtDTO rsvtDTO) throws Exception {
		List<RsvtDTO> list = rsvtMapper.selectOneWayOper(rsvtDTO);

		return list;
	}

	@Override
	public int delAllo(List<Map<String, Object>> map) throws Exception {
		HashMap<String, Object> allodel = new HashMap<>();
		for (int i = 0; i < map.size(); i++) {
			allodel.put("allodel", map);
		}

		int rtn = rsvtMapper.delAllo(allodel);

		return rtn;
	}

	@Override
	public int updateRsvt(RsvtDTO rsvtDTO) throws Exception {
		int rtn = rsvtMapper.updateRsvt(rsvtDTO);

		return rtn;
	}

	@Override
	public int cancleRsvt(RsvtDTO rsvtDTO) throws Exception {
		int rtn = rsvtMapper.cancleRsvt(rsvtDTO);

		return rtn;
	}

	@Override
	public int delRsvt(RsvtDTO rsvtDTO) throws Exception {
		int rtn = rsvtMapper.delRsvt(rsvtDTO);

		return rtn;
	}

	@Override
	public List<RegularOperDTO> selectReg(RegularOperDTO regularOperDTO) throws Exception {
		List<RegularOperDTO> list = rsvtMapper.selectReg(regularOperDTO);

		return list;
	}

	@Override
	public List<RegularOperDTO> selectRegDe(RegularOperDTO regularOperDTO) throws Exception {
		List<RegularOperDTO> list = rsvtMapper.selectRegDe(regularOperDTO);

		return list;
	}

	@Override
	public List<RegularOperDTO> selectRegCoo(RegularOperDTO regularOperDTO) throws Exception {
		List<RegularOperDTO> list = rsvtMapper.selectRegCoo(regularOperDTO);

		return list;
	}

	@Override
	public List<RsvtDTO> selectCustomerCheck(RsvtDTO rsvtDTO) throws Exception {
		List<RsvtDTO> list = new ArrayList<RsvtDTO>();
		if (rsvtDTO.getCtmno().length() > 0) {
			int rtn = rsvtMapper.updateCtm(rsvtDTO);
			list.add(rsvtDTO);

			if (rtn < 1) {
				list.get(0).setCtmtrash(-1);
			}
		} else {
			RsvtDTO tmpRsvt = rsvtDTO;
			String tmpTel1 = tmpRsvt.getCtmtel1();
			String tmpTel = "";

			if (rsvtDTO.getCtmtel1().length() > 4) {
				if (rsvtDTO.getCtmtel1().substring(rsvtDTO.getCtmtel1().length() - 4).length() == 4) {
					tmpTel = rsvtDTO.getCtmtel1().substring(rsvtDTO.getCtmtel1().length() - 4);
					tmpRsvt.setCtmtel1(tmpTel);
				} else {
					tmpRsvt.setCtmtel1("9999999999");
				}
			} else if (rsvtDTO.getCtmtel1().length() == 4) {
				tmpTel = rsvtDTO.getCtmtel1();
				tmpRsvt.setCtmtel1(tmpTel);
			} else {
				tmpRsvt.setCtmtel1("9999999999");
			}

			list = rsvtMapper.selectCustomerCheck(tmpRsvt);
			int rtn = 0;
			if (list.size() > 0) {
				if (list.size() < 2 && rsvtDTO.getCtmname().equals(list.get(0).getCtmname())) {
					rtn = rsvtMapper.updateCtm(list.get(0));

					if (rtn < 1) {
						list.get(0).setCtmtrash(-1);
					}
				} else {
					list.get(0).setCtmtrash(100);
				}
			} else {
				rsvtDTO.setCtmno(get_Oper("C"));
				list.clear();
				list.add(tmpRsvt);
				list.get(0).setCtmno(get_Oper("C"));
				list.get(0).setCtmtel1(tmpTel1);
				rtn = rsvtMapper.insertCtm(rsvtDTO);

				if (rtn < 1) {
					list.get(0).setCtmtrash(-1);
				}
			}
		}

		return list;
	}
}
