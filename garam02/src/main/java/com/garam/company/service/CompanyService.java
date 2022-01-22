package com.garam.company.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.garam.company.dto.CompanyResponseDto;
import com.garam.company.entity.Company;
import com.garam.company.entity.CompanyRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CompanyService {

	private final CompanyRepository companyRepository;

	public List<CompanyResponseDto> findall() throws Exception {
		List<Company> companyList = companyRepository.findAll();
		return companyList.stream().map(CompanyResponseDto::new).collect(Collectors.toList());
	}

}
