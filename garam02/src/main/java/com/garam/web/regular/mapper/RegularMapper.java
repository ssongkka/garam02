package com.garam.web.regular.mapper;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.garam.web.regular.dto.RegularDTO;
import com.garam.web.regular.dto.RegularcourseDTO;
import com.garam.web.regular.dto.RegulardetailDTO;

@Mapper
public interface RegularMapper {

	public List<RegularDTO> selctRegular(RegularDTO regularDTO) throws Exception;

	public List<RegularDTO> selctRegularInfo(RegularDTO regularDTO) throws Exception;

	public List<RegulardetailDTO> selectRegulardetail(RegularDTO regularDTO) throws Exception;

	public List<RegulardetailDTO> selectRegulardetailInfo(RegularDTO regularDTO) throws Exception;

	public List<RegularcourseDTO> selectRegularcourse(RegularDTO regularDTO) throws Exception;

	public int insertRegular(RegularDTO regularDTO) throws Exception;

	public int insertRegulardetail(RegularDTO regularDTO) throws Exception;

	public int updateRegulardetail(RegularDTO regularDTO) throws Exception;

	public int updateRegulardetailOder(HashMap<String, Object> map) throws Exception;

	public int delOperCar(RegularDTO regularDTO) throws Exception;

	public int delRegulardetail(RegularDTO regularDTO) throws Exception;

}
