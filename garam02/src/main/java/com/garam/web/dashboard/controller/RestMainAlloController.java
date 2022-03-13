package com.garam.web.dashboard.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.dao.DataAccessException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.garam.web.dashboard.dto.RegularOperDTO;
import com.garam.web.dashboard.dto.RsvtDTO;
import com.garam.web.dashboard.service.MainService;
import com.lowagie.text.Anchor;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(value = "/allo")
@RequiredArgsConstructor
public class RestMainAlloController {

	private final MainService rsvtService;

	@PostMapping(value = "/customer")
	public List<RsvtDTO> customerList(@RequestBody RsvtDTO rsvtDTO) throws Exception {

		List<RsvtDTO> list = rsvtService.selectAlloCTM(rsvtDTO);

		return list;
	}

	@PostMapping(value = "/rsvt")
	public List<RsvtDTO> rsvtList(@RequestBody RsvtDTO rsvtDTO) throws Exception {

		List<RsvtDTO> list = rsvtService.selectAlloRSVT(rsvtDTO);

		return list;
	}

	@PostMapping(value = "/oper")
	public List<RsvtDTO> operList(@RequestBody RsvtDTO rsvtDTO) throws Exception {

		List<RsvtDTO> list = rsvtService.selectAlloOPER(rsvtDTO);

		return list;
	}

	@PostMapping(value = "/oneway")
	public List<RsvtDTO> onewayList(@RequestBody RsvtDTO rsvtDTO) throws Exception {

		List<RsvtDTO> list = rsvtService.selectOneWayOper(rsvtDTO);

		return list;
	}

	@PostMapping(value = "/insert")
	public List<RsvtDTO> insertAllo(@RequestBody List<Map<String, Object>> map) throws Exception {

		List<RsvtDTO> list = new ArrayList<RsvtDTO>();
		try {
			list = rsvtService.insertOper(map);
		} catch (DataAccessException e) {
			list.get(0).setOpernum("-1");
		} catch (Exception e) {
			list.get(0).setOpernum("-2");
		}
		return list;
	}

	@PostMapping(value = "/del")
	public int delAllo(@RequestBody List<Map<String, Object>> map) throws Exception {

		int rst = 0;
		try {
			rst = rsvtService.delAllo(map);
		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;
		}
		return rst;
	}

	@PostMapping(value = "/chRSVT")
	public List<RsvtDTO> chRSVT(@RequestBody RsvtDTO rsvtDTO) throws Exception {

		List<RsvtDTO> list = rsvtService.selectRSVT(rsvtDTO);

		return list;
	}

	@PostMapping(value = "/updateRsvt")
	public int updateRsvt(@RequestBody RsvtDTO rsvtDTO) throws Exception {

		int rst = 0;
		try {
			rst = rsvtService.updateRsvt(rsvtDTO);
		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;
		}
		return rst;
	}

	@PostMapping(value = "/cancleRsvt")
	public int cancleRsvt(@RequestBody RsvtDTO rsvtDTO) throws Exception {

		int rst = 0;
		try {
			rst = rsvtService.cancleRsvt(rsvtDTO);
		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;
		}
		return rst;
	}

	@PostMapping(value = "/delRsvt")
	public int delRsvt(@RequestBody RsvtDTO rsvtDTO) throws Exception {

		int rst = 0;
		try {
			rst = rsvtService.delRsvt(rsvtDTO);
		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;
		}
		return rst;
	}

	@PostMapping(value = "/reg")
	public List<RegularOperDTO> reg(@RequestBody RegularOperDTO regularOperDTO) throws Exception {
		List<RegularOperDTO> list = rsvtService.selectReg(regularOperDTO);

		return list;
	}

	@PostMapping(value = "/regDe")
	public List<RegularOperDTO> regDe(@RequestBody RegularOperDTO regularOperDTO) throws Exception {
		List<RegularOperDTO> list = rsvtService.selectRegDe(regularOperDTO);

		return list;
	}

	@PostMapping(value = "/regCoo")
	public List<RegularOperDTO> regCoo(@RequestBody RegularOperDTO regularOperDTO) throws Exception {
		List<RegularOperDTO> list = rsvtService.selectRegCoo(regularOperDTO);

		return list;
	}
}