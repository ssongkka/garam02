package com.garam.web.regular.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.garam.web.regular.dto.RegularDTO;
import com.garam.web.regular.dto.RegularcourseDTO;
import com.garam.web.regular.dto.RegulardetailDTO;

@Mapper
public interface RegularMapper {

	public List<RegularDTO> selctRegular(RegularDTO regularDTO) throws Exception;

	public List<RegularDTO> selctRegularInfo(RegularDTO regularDTO) throws Exception;

	public List<RegulardetailDTO> selectRegulardetail(RegulardetailDTO regulardetailDTO) throws Exception;

	public List<RegulardetailDTO> selectRegulardetailInfo(RegulardetailDTO regulardetailDTO) throws Exception;

	public List<RegularcourseDTO> selectRegularcourse(RegularcourseDTO regularcourseDTO) throws Exception;

}
