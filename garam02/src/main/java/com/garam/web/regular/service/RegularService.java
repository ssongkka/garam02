package com.garam.web.regular.service;

import java.util.List;

import com.garam.web.regular.dto.RegularDTO;
import com.garam.web.regular.dto.RegularcourseDTO;
import com.garam.web.regular.dto.RegulardetailDTO;

public interface RegularService {
	public List<RegularDTO> selctRegular(RegularDTO regularDTO) throws Exception;

	public List<RegularDTO> selctRegularInfo(RegularDTO regularDTO) throws Exception;

	public List<RegulardetailDTO> selectRegulardetail(RegularDTO regularDTO) throws Exception;

	public List<RegulardetailDTO> selectRegulardetailInfo(RegularDTO regularDTO) throws Exception;

	public List<RegularcourseDTO> selectRegularcourse(RegularDTO regularDTO) throws Exception;

	public int insertRegular(RegularDTO regularDTO) throws Exception;
}
