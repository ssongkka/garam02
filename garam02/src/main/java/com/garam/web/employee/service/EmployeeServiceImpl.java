package com.garam.web.employee.service;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.pdfbox.contentstream.operator.text.SetCharSpacing;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.garam.web.Utils.FTPManager;
import com.garam.web.Utils.NameUtils;
import com.garam.web.Utils.PDFUtil;
import com.garam.web.Utils.Utils;
import com.garam.web.Utils.pdfFooter;
import com.garam.web.employee.dto.EmpRsvtDTO;
import com.garam.web.employee.dto.EmployeeInfoDTO;
import com.garam.web.employee.dto.Empsalary;
import com.garam.web.employee.dto.EmpsalaryAll;
import com.garam.web.employee.mapper.EmployeeMapper;
import com.garam.web.regular.dto.RegularDTO;
import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.text.pdf.parser.Line;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

	private final EmployeeMapper employeeMapper;
	private final FTPManager ftpmanager;

	@Override
	public String uploadEmpPic(String id, MultipartFile[] files) throws Exception {

		String rtn = "";

		String iidd = "";
		String filename = "";

		if (id.length() > 0) {
			iidd = id;
		} else {
			iidd = get_Empno();
		}

		if (files[0].getSize() > 0) {

			FTPClient ftp = ftpmanager.connect();

			if (ftp.isConnected()) {
				final String extension = FilenameUtils.getExtension(files[0].getOriginalFilename());

				InputStream inputStream = new BufferedInputStream(files[0].getInputStream());

				filename = ftpmanager.getEmpFolder() + "img/" + iidd + ".PNG";

				if (ftp.storeFile(filename, inputStream)) {
					rtn = iidd + "이미지" + "1";
				} else {
					rtn = "2";
				}

				ftpmanager.disconnect(ftp);
			} else {
				rtn = "2";
			}
		} else {
			rtn = iidd + "이미지" + "2";
		}

		return rtn;
	}

	@Override
	public int insertEmp(EmployeeInfoDTO employeeInfoDTO) throws Exception {
		if (employeeInfoDTO.getCompany() == null || employeeInfoDTO.getCompany().equals("")
				|| employeeInfoDTO.getCompany().equals("미정")) {
			employeeInfoDTO.setKind(null);
		}
		if (employeeInfoDTO.getKind() == null || employeeInfoDTO.getKind().equals("")) {
			employeeInfoDTO.setKind(null);
		}
		if (employeeInfoDTO.getJoind() == null || employeeInfoDTO.getJoind().equals("")) {
			employeeInfoDTO.setJoind(null);
		}
		if (employeeInfoDTO.getEndd() == null || employeeInfoDTO.getEndd().equals("")) {
			employeeInfoDTO.setEndd(null);
			System.out.println("없는데");
		} else {
			System.out.println("뭐지  " + employeeInfoDTO.getEndd());
		}
		if (employeeInfoDTO.getPhone2() == null || employeeInfoDTO.getPhone2().equals("")) {
			employeeInfoDTO.setPhone2(null);
		}
		if (employeeInfoDTO.getAddress() == null || employeeInfoDTO.getAddress().equals("")) {
			employeeInfoDTO.setAddress(null);
		}
		if (employeeInfoDTO.getGarage() == null || employeeInfoDTO.getGarage().equals("")) {
			employeeInfoDTO.setGarage(null);
		}
		if (employeeInfoDTO.getBosum() == null || employeeInfoDTO.getBosum().equals("")) {
			employeeInfoDTO.setBosum(null);
		}
		if (employeeInfoDTO.getBobuj() == null || employeeInfoDTO.getBobuj().equals("")
				|| employeeInfoDTO.getBobuj().equals("없음")) {
			employeeInfoDTO.setBobuj(null);
		}
		if (employeeInfoDTO.getDrvl() == null || employeeInfoDTO.getDrvl().equals("")) {
			employeeInfoDTO.setDrvl(null);
		}
		if (employeeInfoDTO.getBusl() == null || employeeInfoDTO.getBusl().equals("")) {
			employeeInfoDTO.setBusl(null);
		}
		if (employeeInfoDTO.getMemo() == null || employeeInfoDTO.getMemo().equals("")) {
			employeeInfoDTO.setMemo(null);
		}
		if (employeeInfoDTO.getBank() == null || employeeInfoDTO.getBank().equals("")) {
			employeeInfoDTO.setBank(null);
		}
		if (employeeInfoDTO.getGye() == null || employeeInfoDTO.getGye().equals("")) {
			employeeInfoDTO.setGye(null);
		}
		if (employeeInfoDTO.getGyename() == null || employeeInfoDTO.getGyename().equals("")) {
			employeeInfoDTO.setGyename(null);
		}
		if (employeeInfoDTO.getBasem() == null) {
			employeeInfoDTO.setBasem(null);
		}
		if (employeeInfoDTO.getKukm() == null) {
			employeeInfoDTO.setKukm(null);
		}
		if (employeeInfoDTO.getGunm() == null) {
			employeeInfoDTO.setGunm(null);
		}
		if (employeeInfoDTO.getGom() == null) {
			employeeInfoDTO.setGom(null);
		}
		if (employeeInfoDTO.getSanm() == null) {
			employeeInfoDTO.setSanm(null);
		}

		if (employeeInfoDTO.getImg() == null || employeeInfoDTO.getImg().equals("")) {
			employeeInfoDTO.setImg(null);
		}

		int rtn = 0;

		switch (employeeInfoDTO.getTp()) {
		case 0:
			employeeInfoDTO.setTrash(1);
			rtn = employeeMapper.insertEmp(employeeInfoDTO);
			break;

		case 1:
			if (employeeInfoDTO.getEndd() == null) {
				employeeInfoDTO.setTrash(1);
			} else {
				employeeInfoDTO.setTrash(0);
			}
			rtn = employeeMapper.updateEmp(employeeInfoDTO);
			break;
		}
		return rtn;
	}

	private String get_Empno() {
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
		return "E-" + day + "-" + str;
	}

	@Override
	public List<EmployeeInfoDTO> selectEmpNameList() throws Exception {
		List<EmployeeInfoDTO> list = employeeMapper.selectEmpNameList();
		return list;
	}

	@Override
	public List<EmployeeInfoDTO> selectEmpAll(EmployeeInfoDTO employeeInfoDTO) throws Exception {
		List<EmployeeInfoDTO> list = employeeMapper.selectEmpAll(employeeInfoDTO);

		return list;
	}

	@Override
	public List<EmployeeInfoDTO> selectEmpName(EmployeeInfoDTO employeeInfoDTO) throws Exception {
		List<EmployeeInfoDTO> list = employeeMapper.selectEmpName(employeeInfoDTO);

		return list;
	}

	@Override
	public List<EmployeeInfoDTO> selectEmpDetail(EmployeeInfoDTO employeeInfoDTO) throws Exception {
		List<EmployeeInfoDTO> list = employeeMapper.selectEmpDetail(employeeInfoDTO);

		return list;
	}

	@Override
	public List<EmpRsvtDTO> selectEmpOperList(EmpRsvtDTO empRsvtDTO) throws Exception {
		List<EmpRsvtDTO> list = employeeMapper.selectEmpOperList(empRsvtDTO);

		return list;
	}

	@Override
	public List<EmpRsvtDTO> selectEmpOperListCnt(EmpRsvtDTO empRsvtDTO) throws Exception {
		List<EmpRsvtDTO> list = employeeMapper.selectEmpOperListCnt(empRsvtDTO);

		return list;
	}

	@Override
	public List<EmployeeInfoDTO> SelectEmpBaseMoney(EmployeeInfoDTO employeeInfoDTO) throws Exception {
		List<EmployeeInfoDTO> list = employeeMapper.SelectEmpBaseMoney(employeeInfoDTO);

		return list;
	}

	@Override
	public int empUpOper2(EmpRsvtDTO empRsvtDTO) throws Exception {
		int rtn = employeeMapper.empUpOper2(empRsvtDTO);

		return rtn;
	}

	@Override
	public List<Empsalary> selInMoney(Empsalary empsalary) throws Exception {
		List<Empsalary> list = employeeMapper.selInMoney(empsalary);

		return list;
	}

	@Override
	public List<Empsalary> selOutMoney(Empsalary empsalary) throws Exception {
		List<Empsalary> list = employeeMapper.selOutMoney(empsalary);

		return list;
	}

	@Override
	public List<EmpRsvtDTO> selectOperMoney(EmpRsvtDTO empRsvtDTO) throws Exception {
		List<EmpRsvtDTO> list = employeeMapper.selectOperMoney(empRsvtDTO);

		return list;
	}

	@Override
	public int insertInM(List<Map<String, Object>> map) throws Exception {

		for (int i = 0; i < map.size(); i++) {
			if (map.get(i).get("money").equals("") || map.get(i).get("money").toString().length() == 0) {
				map.get(i).replace("money", "0");
			}
		}

		HashMap<String, Object> inM = new HashMap<>();
		for (int i = 0; i < map.size(); i++) {
			inM.put("imM", map);
		}

		int rtn = employeeMapper.insertInM(inM);

		return rtn;
	}

	@Override
	public int insertOutM(List<Map<String, Object>> map) throws Exception {

		for (int i = 0; i < map.size(); i++) {
			if (map.get(i).get("money").equals("") || map.get(i).get("money").toString().length() == 0) {
				map.get(i).replace("money", "0");
			}
		}

		HashMap<String, Object> outM = new HashMap<>();
		for (int i = 0; i < map.size(); i++) {
			outM.put("outM", map);
		}

		int rtn = employeeMapper.insertOutM(outM);

		return rtn;
	}

	@Override
	public int delInM(Empsalary empsalary) throws Exception {

		int rtn = employeeMapper.delInM(empsalary);

		return rtn;
	}

	@Override
	public int delOutM(Empsalary empsalary) throws Exception {
		int rtn = employeeMapper.delOutM(empsalary);

		return rtn;
	}

	@Override
	public List<EmpsalaryAll> selAllMoney(EmpsalaryAll empsalaryAll) throws Exception {
		List<EmpsalaryAll> list = employeeMapper.selAllMoney(empsalaryAll);

		return list;
	}

	@Override
	public int insertAllMoney(EmpsalaryAll empsalaryAll) throws Exception {
		int rtn = employeeMapper.insertAllMoney(empsalaryAll);

		return rtn;
	}

	@Override
	public List<RegularDTO> selEmpRegOperList(RegularDTO regularDTO) throws Exception {
		List<RegularDTO> list = employeeMapper.selEmpRegOperList(regularDTO);

		return list;
	}

	@Override
	public List<RegularDTO> selEmpRegOperList1(RegularDTO regularDTO) throws Exception {
		List<RegularDTO> list = employeeMapper.selEmpRegOperList1(regularDTO);

		return list;
	}

	@Override
	public List<RegularDTO> selEmpRegOperList2(RegularDTO regularDTO) throws Exception {
		List<RegularDTO> list = employeeMapper.selEmpRegOperList2(regularDTO);

		return list;
	}

	@Override
	public List<EmpRsvtDTO> selectEmpAllAllo(EmpRsvtDTO empRsvtDTO) throws Exception {
		List<EmpRsvtDTO> list = employeeMapper.selectEmpAllAllo(empRsvtDTO);

		return list;
	}

	@Override
	public List<RegularDTO> selectEmpAllAllo1(RegularDTO regularDTO) throws Exception {
		List<RegularDTO> list = employeeMapper.selectEmpAllAllo1(regularDTO);

		return list;
	}

	@Override
	public int updateRegOper(RegularDTO regularDTO) throws Exception {
		int rtn = employeeMapper.updateRegOper(regularDTO);

		return rtn;
	}

	@Override
	public int empUpOper(List<Map<String, Object>> map) throws Exception {

		HashMap<String, Object> upoper = new HashMap<>();
		for (int i = 0; i < map.size(); i++) {
			upoper.put("upoper", map);
		}

		int rtn = employeeMapper.empUpOper(upoper);

		return rtn;
	}

	@Override
	public int updateRegOper1(RegularDTO regularDTO) throws Exception {
		int rtn = employeeMapper.updateRegOper1(regularDTO);

		return rtn;
	}

	@Override
	public int updateEmpMoneys(EmployeeInfoDTO employeeInfoDTO) throws Exception {
		int rtn = employeeMapper.updateEmpMoneys(employeeInfoDTO);

		return rtn;
	}

	@Override
	public File empSalaryPdf(String id, String date, String ve) throws Exception {

		ArrayList<ArrayList<String>> arrRtn = getPdfCont(id, date);

		PDFUtil pdfU = new PDFUtil();

		Document document = null;
		File file = new File("tmp.PDF");

		try {
			document = pdfU.getDocument();

			document.setPageSize(PageSize.A4);
			document.setMargins(15, 15, 40, 15);

			Font font = pdfU.getMalgun(15f);
			Font font1 = pdfU.getMalgun(6.7f);

			PdfPTable table_Head = new PdfPTable(new float[] { 1f });
			table_Head.setWidthPercentage(100);

			String salDay = date.split("-")[0] + "년 " + date.split("-")[1] + "월";
			font.setStyle(Font.BOLD);
			PdfPCell head_Cell = new PdfPCell(new Paragraph(salDay + " 급여내역서           " + ve, font));

			head_Cell.setBackgroundColor(new BaseColor(217, 217, 217));
			head_Cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			head_Cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
			head_Cell.setFixedHeight(50);
			head_Cell.setPaddingBottom(4);
			table_Head.addCell(head_Cell);

			PdfPTable table = new PdfPTable(new float[] { 2f, 6f, 2f, 2f, 4f });
			table.setWidthPercentage(100);

			PdfPCell[] cell = new PdfPCell[5];

			font1.setStyle(Font.BOLD);

			cell[0] = new PdfPCell(new Paragraph("날  짜", font1));
			cell[1] = new PdfPCell(new Paragraph("운 행 구 간", font1));
			cell[2] = new PdfPCell(new Paragraph("금  액", font1));
			cell[3] = new PdfPCell(new Paragraph("경  비", font1));
			cell[4] = new PdfPCell(new Paragraph("비  고", font1));

			for (int i = 0; i < cell.length; i++) {
				cell[i].setBackgroundColor(new BaseColor(242, 242, 242));
				cell[i].setFixedHeight(15);
				cell[i].setPaddingBottom(4);
				cell[i].setHorizontalAlignment(Element.ALIGN_CENTER);
				cell[i].setVerticalAlignment(Element.ALIGN_MIDDLE);
				table.addCell(cell[i]);
			}

			PdfPCell[] cell_Cont = new PdfPCell[5];
			font1.setStyle(Font.NORMAL);

			for (int i = 0; i < arrRtn.get(0).size(); i++) {
				cell_Cont[0] = new PdfPCell(new Paragraph(arrRtn.get(0).get(i), font1));
				cell_Cont[1] = new PdfPCell(new Paragraph(arrRtn.get(1).get(i), font1));
				cell_Cont[2] = new PdfPCell(new Paragraph(Utils.coma_Money_Str(arrRtn.get(2).get(i)), font1));
				cell_Cont[3] = new PdfPCell(new Paragraph(Utils.coma_Money_Str(arrRtn.get(3).get(i)), font1));
				cell_Cont[4] = new PdfPCell(new Paragraph(arrRtn.get(4).get(i), font1));

				for (int y = 0; y < 5; y++) {
					cell_Cont[y].setPaddingBottom(4);
					if (y == 2 || y == 3) {
						cell_Cont[y].setHorizontalAlignment(Element.ALIGN_RIGHT);
						cell_Cont[y].setPaddingRight(10);
					} else {
						cell_Cont[y].setHorizontalAlignment(Element.ALIGN_CENTER);
					}
					cell_Cont[y].setVerticalAlignment(Element.ALIGN_MIDDLE);
					table.addCell(cell_Cont[y]);
				}
			}

			for (int i = 0; i < 35 - arrRtn.get(0).size(); i++) {
				cell_Cont[0] = new PdfPCell(new Paragraph(" ", font1));
				cell_Cont[1] = new PdfPCell(new Paragraph(" ", font1));
				cell_Cont[2] = new PdfPCell(new Paragraph(" ", font1));
				cell_Cont[3] = new PdfPCell(new Paragraph(" ", font1));
				cell_Cont[4] = new PdfPCell(new Paragraph(" ", font1));

				for (int y = 0; y < 5; y++) {
					cell_Cont[y].setPaddingBottom(4);
					cell_Cont[y].setHorizontalAlignment(Element.ALIGN_CENTER);
					cell_Cont[y].setVerticalAlignment(Element.ALIGN_MIDDLE);
					table.addCell(cell_Cont[y]);
				}
			}

			PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(file));

			document.open();

			document.add(table_Head);
//			document.add(pdfU.getBlank(20f));

			table.setHeaderRows(1);
			document.add(table);

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			if (document != null) {
				document.close();
			}
		}
		return file;
	}

	private ArrayList<ArrayList<String>> getPdfCont(String id, String date) throws Exception {
		EmpsalaryAll tmp_EmpsalaryAll = new EmpsalaryAll();
		tmp_EmpsalaryAll.setId(id);
		tmp_EmpsalaryAll.setDate(date);

		List<EmpsalaryAll> empsalaryAll = employeeMapper.selAllMoney(tmp_EmpsalaryAll);

		Empsalary tmp_Empsalary_In = new Empsalary();
		tmp_Empsalary_In.setId(id);
		tmp_Empsalary_In.setSday(date);

		List<Empsalary> empsalary_In = employeeMapper.selInMoney(tmp_Empsalary_In);

		Empsalary tmp_Empsalary_Out = new Empsalary();
		tmp_Empsalary_Out.setId(id);
		tmp_Empsalary_Out.setSday(date);

		List<Empsalary> empsalary_Out = employeeMapper.selOutMoney(tmp_Empsalary_Out);

		EmpRsvtDTO tmp_EmpRsvtDTO = new EmpRsvtDTO();
		tmp_EmpRsvtDTO.setOperid(id);
		tmp_EmpRsvtDTO.setOperconfirm(date);

		List<EmpRsvtDTO> empRsvtDTO = employeeMapper.selectEmpAllAllo(tmp_EmpRsvtDTO);

		RegularDTO tmp_RegularDTO = new RegularDTO();
		tmp_RegularDTO.setRegoperid(id);
		tmp_RegularDTO.setRegoperconfirm(date);

		List<RegularDTO> regularDTO = employeeMapper.selectEmpAllAllo1(tmp_RegularDTO);

		ArrayList<Integer> tmpDayInt = new ArrayList<Integer>();

		HashMap<Integer, String> mapRsvt0 = new HashMap<Integer, String>();
		HashMap<Integer, String> mapRsvt1 = new HashMap<Integer, String>();
		HashMap<Integer, String> mapRsvt2 = new HashMap<Integer, String>();
		HashMap<Integer, String> mapReg0 = new HashMap<Integer, String>();
		HashMap<Integer, String> mapReg1 = new HashMap<Integer, String>();
		HashMap<Integer, String> mapReg2 = new HashMap<Integer, String>();
		HashMap<Integer, String> mapInM = new HashMap<Integer, String>();
		HashMap<Integer, String> mapInM1 = new HashMap<Integer, String>();
		HashMap<Integer, String> mapInM2 = new HashMap<Integer, String>();

		for (int i = 0; i < empRsvtDTO.size(); i++) {
			int tmp = Integer.parseInt(empRsvtDTO.get(i).getOperday().split("-")[0]
					+ empRsvtDTO.get(i).getOperday().split("-")[1] + empRsvtDTO.get(i).getOperday().split("-")[2]);
			tmpDayInt.add(tmp);

			mapRsvt0.put(i, empRsvtDTO.get(i).getOperday());
			mapRsvt1.put(i, empRsvtDTO.get(i).getDesty() + "-" + empRsvtDTO.get(i).getCtmname());
			mapRsvt2.put(i, Integer.toString(empRsvtDTO.get(i).getAtlm()));
		}
		for (int i = 0; i < regularDTO.size(); i++) {
			int tmp = Integer.parseInt(
					regularDTO.get(i).getRegoperday().split("-")[0] + regularDTO.get(i).getRegoperday().split("-")[1]
							+ regularDTO.get(i).getRegoperday().split("-")[2]);
			tmpDayInt.add(tmp);

			mapReg0.put(i, regularDTO.get(i).getRegoperday());
			mapReg1.put(i, regularDTO.get(i).getRegcompany() + "(" + regularDTO.get(i).getRdname() + ")");
			mapReg2.put(i, regularDTO.get(i).getRegoperatlm());
		}

		ArrayList<Integer> arrTmpInM = new ArrayList<Integer>();
		for (int i = 0; i < empsalary_In.size(); i++) {
			int size = tmpDayInt.size();
			int ck = 1;
			for (int j = 0; j < size; j++) {
				if (empsalary_In.get(i).getDate() != null && Integer.parseInt(
						empsalary_In.get(i).getDate().split("-")[0] + empsalary_In.get(i).getDate().split("-")[1]
								+ empsalary_In.get(i).getDate().split("-")[2]) == tmpDayInt.get(j)) {
					ck = ck * 0;
				}

			}
			if (empsalary_In.get(i).getDate() != null && ck > 0) {
				tmpDayInt.add(Integer.parseInt(empsalary_In.get(i).getDate().split("-")[0]
						+ empsalary_In.get(i).getDate().split("-")[1] + empsalary_In.get(i).getDate().split("-")[2]));
			}

			if (empsalary_In.get(i).getDate() != null && empsalary_In.get(i).getSeparation().equals("경비")) {
				arrTmpInM.add(Integer.parseInt(empsalary_In.get(i).getDate().split("-")[0]
						+ empsalary_In.get(i).getDate().split("-")[1] + empsalary_In.get(i).getDate().split("-")[2]));
			}

		}

		tmpDayInt.sort(Comparator.naturalOrder());
		arrTmpInM.sort(Comparator.naturalOrder());

		for (int i = 0; i < tmpDayInt.size(); i++) {
			for (int j = 0; j < tmpDayInt.size(); j++) {
				if (i == j) {
				} else if (tmpDayInt.get(j).equals(tmpDayInt.get(i))) {
					tmpDayInt.remove(j);
				}
			}
		}

		for (int i = 0; i < arrTmpInM.size(); i++) {
			for (int j = 0; j < arrTmpInM.size(); j++) {
				if (i == j) {
				} else if (arrTmpInM.get(j).equals(arrTmpInM.get(i))) {
					arrTmpInM.remove(j);
				}
			}
		}

		for (int i = 0; i < arrTmpInM.size(); i++) {
			String tmpCont = "";
			int tmpInM = 0;
			for (int j = 0; j < empsalary_In.size(); j++) {
				if (empsalary_In.get(j).getDate() != null && Integer.parseInt(
						empsalary_In.get(j).getDate().split("-")[0] + empsalary_In.get(j).getDate().split("-")[1]
								+ empsalary_In.get(j).getDate().split("-")[2]) == arrTmpInM.get(i)) {
					if (tmpCont.length() > 0) {
						tmpCont = tmpCont + ", " + empsalary_In.get(j).getContents();
					} else {
						tmpCont = empsalary_In.get(j).getContents();
					}
					tmpInM = tmpInM + empsalary_In.get(j).getMoney();
				}
			}

			String tmptmpDay = Integer.toString(arrTmpInM.get(i));
			String tmpDay = tmptmpDay.substring(0, 4) + "-" + tmptmpDay.substring(4, 6) + "-" + tmptmpDay.substring(6);

			mapInM.put(i, tmpDay);
			mapInM1.put(i, tmpCont);
			mapInM2.put(i, Integer.toString(tmpInM));
		}

		ArrayList<ArrayList<String>> arrRtn = new ArrayList<ArrayList<String>>();

		ArrayList<String> tmpArr111 = new ArrayList<String>();
		ArrayList<String> tmpArr222 = new ArrayList<String>();
		ArrayList<String> tmpArr333 = new ArrayList<String>();
		ArrayList<String> tmpArr444 = new ArrayList<String>();
		ArrayList<String> tmpArr555 = new ArrayList<String>();

		for (int i = 0; i < tmpDayInt.size(); i++) {
			ArrayList<Integer> arr1 = new ArrayList<Integer>();
			ArrayList<Integer> arr2 = new ArrayList<Integer>();
			ArrayList<Integer> arr3 = new ArrayList<Integer>();

			int cnt = 0;
			int cnt1 = 0;

			int cnt111 = 0;
			int cnt222 = 0;

			String tmptmpDay = Integer.toString(tmpDayInt.get(i));
			String tmpDay = tmptmpDay.substring(0, 4) + "-" + tmptmpDay.substring(4, 6) + "-" + tmptmpDay.substring(6);

			for (int j = 0; j < mapRsvt0.size(); j++) {
				if (mapRsvt0.get(j).equals(tmpDay)) {
					arr1.add(j);
					cnt111++;
					cnt++;
				}

			}
			for (int j = 0; j < mapReg0.size(); j++) {
				if (mapReg0.get(j).equals(tmpDay)) {
					arr2.add(j);
					cnt222++;
					cnt++;
				}
			}

			for (int j = 0; j < mapInM.size(); j++) {
				System.out.println("mapInM  " + mapInM);
				System.out.println("tmpDay  " + tmpDay);
				if (mapInM.get(j).equals(tmpDay)) {
					arr3.add(j);
					cnt1++;
				}
			}

			if (cnt >= cnt1) {
				for (int j = 0; j < cnt111; j++) {
					tmpArr111.add(tmpDay);
					tmpArr222.add(mapRsvt1.get(arr1.get(j)));
					tmpArr333.add(mapRsvt2.get(arr1.get(j)));
				}
				for (int j = 0; j < cnt222; j++) {
					tmpArr111.add(tmpDay);
					tmpArr222.add(mapReg1.get(arr2.get(j)));
					tmpArr333.add(mapReg2.get(arr2.get(j)));
				}
				for (int j = 0; j < cnt; j++) {
					if (cnt1 > 0 && j < 1) {
						tmpArr444.add(mapInM2.get(arr3.get(j)));
						tmpArr555.add(mapInM1.get(arr3.get(j)));
					} else {
						tmpArr444.add("");
						tmpArr555.add("");
					}
				}
			} else {
				tmpArr111.add(tmpDay);
				tmpArr222.add("");
				tmpArr333.add("");
				tmpArr444.add(mapInM2.get(arr3.get(0)));
				tmpArr555.add(mapInM1.get(arr3.get(0)));
			}
		}
		System.out.println(4);
		System.out.println("tmpArr111   " + tmpArr111);
		System.out.println("tmpArr222   " + tmpArr222);
		System.out.println("tmpArr333   " + tmpArr333);
		System.out.println("tmpArr444   " + tmpArr444);
		System.out.println("tmpArr555   " + tmpArr555);

		arrRtn.add(tmpArr111);
		arrRtn.add(tmpArr222);
		arrRtn.add(tmpArr333);
		arrRtn.add(tmpArr444);
		arrRtn.add(tmpArr555);

		return arrRtn;
	}
}
