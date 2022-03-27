package com.garam.web.dashboard.mapper;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.garam.web.dashboard.dto.OptDTO;
import com.garam.web.dashboard.dto.RegularOperDTO;
import com.garam.web.dashboard.dto.RsvtDTO;

@Mapper
public interface DashboardMapper {
	public List<RsvtDTO> selectCustomerAll(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectCustomerName(RsvtDTO rsvtDTO) throws Exception;

	public int insertRsvt(RsvtDTO rsvtDTO) throws Exception;

	public int insertCtm(RsvtDTO rsvtDTO) throws Exception;

	public List<RsvtDTO> selectCustomerOtherCompa() throws Exception;

	public int insertManyRsvt(HashMap<String, Object> map) throws Exception;

	public int insertOper(HashMap<String, Object> map) throws Exception;

	public int updateOper(HashMap<String, Object> map) throws Exception;

	public int updateRsvt(RsvtDTO rsvtDTO) throws Exception;

	public int cancleRsvt(RsvtDTO rsvtDTO) throws Exception;

	public int delRsvt(RsvtDTO rsvtDTO) throws Exception;

	public int updateCtm(RsvtDTO rsvtDTO) throws Exception;

	public int delAllo(HashMap<String, Object> map) throws Exception;

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
}
