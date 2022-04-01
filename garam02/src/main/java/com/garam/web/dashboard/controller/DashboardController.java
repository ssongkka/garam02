package com.garam.web.dashboard.controller;

import java.io.File;
import java.io.FileInputStream;
import java.util.List;
import java.util.Map;

import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.dao.DataAccessException;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.garam.company.dto.CompanyDTO;
import com.garam.company.service.CompanyService;
import com.garam.web.Utils.UiUtils;
import com.garam.web.constant.Method;
import com.garam.web.dashboard.dto.OptDTO;
import com.garam.web.dashboard.dto.RsvtDTO;
import com.garam.web.dashboard.service.MainService;
import com.garam.web.employee.dto.EmployeeInfoDTO;
import com.garam.web.employee.service.EmployeeService;
import com.garam.web.login.entity.User;
import com.garam.web.vehicle.dto.VehicleInfoDTO;
import com.garam.web.vehicle.service.VehicleService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping(value = "/dashboard")
public class DashboardController extends UiUtils {

	private final MainService rsvtService;
	private final EmployeeService employeeService;
	private final VehicleService vehicleService;
	private final CompanyService companyService;

	@GetMapping
	public String rsvt(@AuthenticationPrincipal User user, Model model) throws Exception {

		model.addAttribute("user", user);

		RsvtDTO rsvtDTO = new RsvtDTO();
		List<RsvtDTO> list = rsvtService.selectCustomerAll(rsvtDTO);
		model.addAttribute("customer", list);

		List<CompanyDTO> compa = companyService.selectCompany();
		model.addAttribute("compa", compa);

		List<EmployeeInfoDTO> emp = employeeService.selectEmpNameList();
		model.addAttribute("emp", emp);

		List<VehicleInfoDTO> ve = vehicleService.selectVeNameList();
		model.addAttribute("ve", ve);

		List<OptDTO> opt = rsvtService.selectOpt();
		model.addAttribute("opt", opt);

		List<RsvtDTO> othercompa = rsvtService.selectCustomerOtherCompa();
		model.addAttribute("othercompa", othercompa);

		return "dashboard/dashBoard";
	}

	@GetMapping(value = "/rsvtMany")
	public String rsvtMany(@AuthenticationPrincipal User user, Model model) throws Exception {
		RsvtDTO rsvtDTO = new RsvtDTO();
		List<RsvtDTO> list = rsvtService.selectCustomerAll(rsvtDTO);
		model.addAttribute("customer", list);
		List<OptDTO> opt = rsvtService.selectOpt();
		model.addAttribute("opt", opt);
		model.addAttribute("user", user);
		return "dashboard/mainRsvtMany";
	}

	@GetMapping(value = "/makePapper")
	public ResponseEntity<Object> makePapper(@RequestParam(value = "companyyy", required = true) String companyyy,
			@RequestParam(value = "dayyy", required = true) String dayyy,
			@RequestParam(value = "ctmmm", required = true) String ctmmm,
			@RequestParam(value = "rsvttt", required = true) String rsvttt,
			@RequestParam(value = "paperCh", required = true) String paperCh) throws Exception {

		System.out.println("dayyy   " + dayyy);
		System.out.println("ctmmm   " + ctmmm);
		System.out.println("rsvttt   " + rsvttt);
		System.out.println("paperCh   " + paperCh);

		File file = rsvtService.makePapper(companyyy, dayyy, ctmmm, rsvttt, paperCh);

		Resource resource = new InputStreamResource(new FileInputStream(file));

		HttpHeaders headers = new HttpHeaders();
		String fileName = dayyy.split("-")[0] + dayyy.split("-")[1] + "_급여명세서_" + ctmmm + "_" + ctmmm + ".PDF";
		String fileNameOrg = new String(fileName.getBytes("UTF-8"), "ISO-8859-1");
		headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
		headers.setContentDisposition(ContentDisposition.builder("attachment").filename(fileNameOrg).build());

		return new ResponseEntity<Object>(resource, headers, HttpStatus.OK);
	}
}