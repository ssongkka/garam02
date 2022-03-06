package com.garam.web.regular.service;

import java.util.List;

import com.garam.web.regular.dto.RegularDTO;
import com.garam.web.regular.dto.RegularcourseDTO;
import com.garam.web.regular.dto.RegulardetailDTO;

public interface RegularService {
	public List<RegularDTO> selctRegular(RegularDTO regularDTO) throws Exception;

	public List<RegularDTO> selctRegularInfo(RegularDTO regularDTO) throws Exception;

	public List<RegulardetailDTO> selectRegulardetail(RegulardetailDTO regulardetailDTO) throws Exception;

	public List<RegulardetailDTO> selectRegulardetailInfo(RegulardetailDTO regulardetailDTO) throws Exception;

	public List<RegularcourseDTO> selectRegularcourse(RegularcourseDTO regularcourseDTO) throws Exception;
}
