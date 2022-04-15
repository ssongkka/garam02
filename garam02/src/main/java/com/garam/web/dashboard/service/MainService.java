package com.garam.web.dashboard.service;

import java.io.File;
import java.util.List;
import java.util.Map;

import com.garam.web.dashboard.dto.OptDTO;
import com.garam.web.dashboard.dto.RegularOperDTO;
import com.garam.web.dashboard.dto.RsvtDTO;
import com.garam.web.dashboard.dto.RsvtmoneyDTO;

public interface MainService {
	public List<RsvtDTO> selectCustomerAll(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectCustomerName(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> insertCtm(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectCustomerOtherCompa() throws Exception;

	public int insertRsvt(RsvtDTO rsvtDTO) throws Exception;

	public int insertManyRsvt(List<Map<String, Object>> map) throws Exception;

	public List<RsvtDTO> insertOper(List<Map<String, Object>> map) throws Exception;

	public int updateRsvt(RsvtDTO rsvtDTO) throws Exception;

	public int cancleRsvt(RsvtDTO rsvtDTO) throws Exception;

	public int delRsvt(RsvtDTO rsvtDTO) throws Exception;

	public int delAllo(List<Map<String, Object>> map) throws Exception;

	public List<RsvtDTO> selectRSVT(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectAlloCTM(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectCustomerCheck(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectAlloRSVT(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectAlloOPER(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectWeekBusNum(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectOneWayOper(RsvtDTO rsvtDTO) throws Exception;

	public List<OptDTO> selectOpt() throws Exception;

	public List<RegularOperDTO> selectReg(RegularOperDTO regularOperDTO) throws Exception;

	public List<RegularOperDTO> selectRegDe(RegularOperDTO regularOperDTO) throws Exception;

	public List<RegularOperDTO> selectRegCoo(RegularOperDTO regularOperDTO) throws Exception;

	public int updateOperMemo(List<Map<String, Object>> map) throws Exception;

	public List<RsvtDTO> selectPapperAllo1(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectPapperAllo2(RsvtDTO rsvtDTO) throws Exception;

	public File makePapper(String companyyy, String dayyy, String ctmmm, String rsvttt, String paperCh)
			throws Exception;

	public List<RsvtmoneyDTO> selRsvtMoney(RsvtmoneyDTO rsvtmoneyDTO) throws Exception;

	public int insertRsvtMoney(RsvtmoneyDTO rsvtmoneyDTO) throws Exception;

	public int updateRsvtMoney(RsvtmoneyDTO rsvtmoneyDTO) throws Exception;

	public int delRsvtMoney(RsvtmoneyDTO rsvtmoneyDTO) throws Exception;

	public int updateRsvtConfirmMOk(RsvtDTO rsvtDTO) throws Exception;

	public int updateRsvtConfirmMNo(RsvtDTO rsvtDTO) throws Exception;

	public int insertRsvtMoneyMany(List<Map<String, Object>> map) throws Exception;

	public int updateRsvtConfirmMOkMany(List<Map<String, Object>> map) throws Exception;

	public List<RsvtmoneyDTO> selectSumRsvtMoney(List<Map<String, Object>> map) throws Exception;

	public List<RsvtDTO> selectCalRsvt1(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectCalRsvt2(RsvtDTO rsvtDTO) throws Exception;
	
	public List<RsvtDTO> selectCalRsvt3(RsvtDTO rsvtDTO) throws Exception;
	
	public List<RsvtDTO> selectCalRsvt4(RsvtDTO rsvtDTO) throws Exception;
}
