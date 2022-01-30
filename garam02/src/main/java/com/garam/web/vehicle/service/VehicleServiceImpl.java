package com.garam.web.vehicle.service;

import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.time.LocalDate;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.VerticalAlignment;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import com.garam.web.Utils.FTPManager;
import com.garam.web.Utils.NameUtils;
import com.garam.web.Utils.PDFUtil;
import com.garam.web.Utils.pdfFooter;
import com.garam.web.vehicle.dto.VehicleInfoDTO;
import com.garam.web.vehicle.mapper.VehicleMapper;
import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VehicleServiceImpl implements VehicleService {

	private final VehicleMapper vehicleMapper;
	private final FTPManager ftpmanager;

	@Override
	public int insertVe(VehicleInfoDTO vehicleInfoDTO) throws Exception {

		int rtn = 0;

		if (vehicleInfoDTO.getOwner().equals("미정")) {
			vehicleInfoDTO.setOwner(null);
		}

		if (vehicleInfoDTO.getId().equals("미정")) {
			vehicleInfoDTO.setId(null);
		}

		if (vehicleInfoDTO.getExpire() == null || vehicleInfoDTO.getExpire().equals("")) {
			vehicleInfoDTO.setExpire(null);
		}

		if (vehicleInfoDTO.getPrice() == null || vehicleInfoDTO.getPrice() == 0) {
			vehicleInfoDTO.setPrice(0);
		}

		if (vehicleInfoDTO.getSpecial() == null || vehicleInfoDTO.getSpecial().equals("")) {
			vehicleInfoDTO.setSpecial(null);
		}
		if (vehicleInfoDTO.getImg1() == null || vehicleInfoDTO.getImg1().equals("")) {
			vehicleInfoDTO.setImg1(null);
		}
		if (vehicleInfoDTO.getImg2() == null || vehicleInfoDTO.getImg2().equals("")) {
			vehicleInfoDTO.setImg2(null);
		}
		if (vehicleInfoDTO.getImg3() == null || vehicleInfoDTO.getImg3().equals("")) {
			vehicleInfoDTO.setImg3(null);
		}

		switch (vehicleInfoDTO.getTp()) {
		case 0:
			rtn = vehicleMapper.insertVe(vehicleInfoDTO);
			break;
		case 1:
			rtn = vehicleMapper.updateVe(vehicleInfoDTO);
			break;
		}

		return rtn;
	}

	@Override
	public String uploadVePic(String carnumber, MultipartFile[] files) throws Exception {
		String rtn = "";
		String carN = "";
		String img = "";

		if (carnumber.length() > 0) {
			carN = carnumber;
		} else {
			carN = get_Veno();
		}

		FTPClient ftp = ftpmanager.connect();
		for (int i = 0; i < files.length; i++) {
			if (files[i].getSize() > 0) {
				if (ftp.isConnected()) {
					final String extension = FilenameUtils.getExtension(files[i].getOriginalFilename());

					InputStream inputStream = new BufferedInputStream(files[i].getInputStream());

					String filename = ftpmanager.getCarFolder() + "img/" + carN + "_" + (i + 1) + ".PNG";

					if (ftp.storeFile(filename, inputStream)) {
						img += "이미지" + "1";
					} else {
						rtn = "2";
					}
				} else {
					rtn = "2";
				}
			} else {
				img += "이미지" + "2";
			}
		}

		if (!rtn.equals("2")) {
			rtn = carN + img;
		}

		System.out.println("야호   " + rtn);

		ftpmanager.disconnect(ftp);

		return rtn;

	}

	private String get_Veno() {
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
		return "V-" + day + "-" + str;
	}

	@Override
	public List<VehicleInfoDTO> selectVeAll(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = vehicleMapper.selectVeAll(vehicleInfoDTO);

		return list;
	}

	@Override
	public List<VehicleInfoDTO> selectVeDetail(VehicleInfoDTO vehicleInfoDTO) throws Exception {
		List<VehicleInfoDTO> list = vehicleMapper.selectVeDetail(vehicleInfoDTO);

		return list;
	}

	@Override
	public File veDownPdf(String compa) {

		List<VehicleInfoDTO> list;
		PDFUtil pdfU = new PDFUtil();

		Document document = null;
		File file = new File("tmp.PDF");

		try {
			document = pdfU.getDocument();

			list = vehicleMapper.selectVeAllPrint(compa);

			Font font = pdfU.getHYHeadM(20f);
			Font font1 = pdfU.getHumenMyungjo(6.7f);

			PdfPTable table = new PdfPTable(new float[] { 1f, 4f, 4f, 5f, 4f, 2f, 1f, 2f });
			table.setWidthPercentage(100);

			Chunk chunk = new Chunk("차 량 명 세 서", font); // 기본폰트로 타이틀

			Paragraph ph = new Paragraph(chunk);
			ph.setAlignment(Element.ALIGN_CENTER);

			PdfPTable aa = new PdfPTable(new float[] { 1f, 1f });
			aa.setWidthPercentage(98);
			PdfPCell cellCompa = new PdfPCell(new Paragraph("회사명 : " + compa, pdfU.getHumenMyungjo(6.7f)));
			cellCompa.setBorder(0);
			cellCompa.setHorizontalAlignment(Element.ALIGN_LEFT);
			PdfPCell cellDay = new PdfPCell(
					new Paragraph("기준일 : " + LocalDate.now().toString(), pdfU.getHumenMyungjo(6.7f)));
			cellDay.setBorder(0);
			cellDay.setHorizontalAlignment(Element.ALIGN_RIGHT);
			aa.addCell(cellCompa);
			aa.addCell(cellDay);

			PdfPCell[] cell = new PdfPCell[8];

			font1.setStyle(Font.BOLD);

			cell[0] = new PdfPCell(new Paragraph("연번", font1));
			cell[1] = new PdfPCell(new Paragraph("차량번호", font1));
			cell[2] = new PdfPCell(new Paragraph("차명", font1));
			cell[3] = new PdfPCell(new Paragraph("차대번호", font1));
			cell[4] = new PdfPCell(new Paragraph("차종", font1));
			cell[5] = new PdfPCell(new Paragraph("연식", font1));
			cell[6] = new PdfPCell(new Paragraph("정원", font1));
			cell[7] = new PdfPCell(new Paragraph("차량만료일", font1));

			for (int i = 0; i < cell.length; i++) {
				cell[i].setBackgroundColor(new BaseColor(191, 191, 191));
				cell[i].setFixedHeight(20);
				cell[i].setPaddingBottom(5);
				cell[i].setHorizontalAlignment(Element.ALIGN_CENTER);
				cell[i].setVerticalAlignment(Element.ALIGN_MIDDLE);
				table.addCell(cell[i]);
			}

			PdfPCell[] cells = new PdfPCell[8];
			font1.setStyle(Font.NORMAL);
			for (int i = 0; i < list.size(); i++) {
				cells[0] = new PdfPCell(new Paragraph(Integer.toString(i + 1), font1));
				cells[1] = new PdfPCell(new Paragraph(list.get(i).getVehicle(), font1));
				cells[2] = new PdfPCell(new Paragraph(list.get(i).getVename(), font1));
				cells[3] = new PdfPCell(new Paragraph(list.get(i).getCarn(), font1));
				cells[4] = new PdfPCell(new Paragraph(list.get(i).getBrand(), font1));
				cells[5] = new PdfPCell(new Paragraph(list.get(i).getRegist().substring(0, 4), font1));
				cells[6] = new PdfPCell(new Paragraph(list.get(i).getNum(), font1));
				cells[7] = new PdfPCell(new Paragraph(list.get(i).getExpire(), font1));

				if (i % 2 != 0) {
					for (int k = 0; k < cells.length; k++) {
						cells[k].setBackgroundColor(new BaseColor(240, 240, 240));
					}
				}

				for (int y = 0; y < 8; y++) {
					cells[y].setPaddingBottom(5);
					cells[y].setHorizontalAlignment(Element.ALIGN_CENTER);
					cells[y].setVerticalAlignment(Element.ALIGN_MIDDLE);
					table.addCell(cells[y]);
				}
			}

			table.setHeaderRows(1);

			PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(file));

			pdfFooter event = new pdfFooter((list.size() / 45) + 1);
			writer.setPageEvent(event);

			document.open();

			document.add(ph);
			document.add(pdfU.getBlank(16f));

			document.add(aa);
			document.add(pdfU.getBlank(3f));

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

	@Override
	public File veDownExcel(String compa) {
		HSSFWorkbook wb = null;
		FileOutputStream fileoutputstream = null;

		try {
			List<VehicleInfoDTO> list = vehicleMapper.selectVeAllPrint(compa);

			String url = "src/main/resources/static/excel/car.xls";

			FileInputStream fis = new FileInputStream(url);

			wb = new HSSFWorkbook(fis);
			HSSFSheet sheet = wb.getSheetAt(0);

			CellStyle style0 = wb.createCellStyle();
			style0.setAlignment(HorizontalAlignment.LEFT);

			HSSFRow rowCont = sheet.createRow(1);
			HSSFCell cellCont = rowCont.createCell(0);
			cellCont.setCellStyle(style0);
			cellCont.setCellValue("회사명 : " + compa);

			CellStyle style1 = wb.createCellStyle();
			style1.setAlignment(HorizontalAlignment.RIGHT);
			cellCont = rowCont.createCell(5);
			cellCont.setCellStyle(style1);
			cellCont.setCellValue("기준일 : " + LocalDate.now().toString());

			CellStyle style = wb.createCellStyle();
			style.setBorderBottom(BorderStyle.THIN);
			style.setBorderTop(BorderStyle.THIN);
			style.setBorderRight(BorderStyle.THIN);
			style.setBorderLeft(BorderStyle.THIN);

			style.setAlignment(HorizontalAlignment.CENTER);
			style.setVerticalAlignment(VerticalAlignment.CENTER);

			int rowNO = 3;

			for (int i = 0; i < list.size(); i++) {
				int cellNo = 0;
				HSSFRow row = sheet.createRow(rowNO++);
				HSSFCell cell = row.createCell(cellNo++);
				cell.setCellStyle(style);
				cell.setCellValue(i + 1);

				cell = row.createCell(cellNo++);
				cell.setCellStyle(style);
				cell.setCellValue(list.get(i).getVehicle());

				cell = row.createCell(cellNo++);
				cell.setCellStyle(style);
				cell.setCellValue(list.get(i).getVename());

				cell = row.createCell(cellNo++);
				cell.setCellStyle(style);
				cell.setCellValue(list.get(i).getCarn());

				cell = row.createCell(cellNo++);
				cell.setCellStyle(style);
				cell.setCellValue(list.get(i).getBrand());

				cell = row.createCell(cellNo++);
				cell.setCellStyle(style);
				cell.setCellValue(Integer.parseInt(list.get(i).getRegist().split("-")[0]));

				cell = row.createCell(cellNo++);
				cell.setCellStyle(style);
				cell.setCellValue(Integer.parseInt(list.get(i).getNum()));

				cell = row.createCell(cellNo++);
				cell.setCellStyle(style);
				cell.setCellValue(list.get(i).getExpire());

			}

			fileoutputstream = new FileOutputStream("tmp.XLS");
			wb.write(fileoutputstream);

			fileoutputstream.close();

			wb.close();

		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
		}

		return new File("tmp.XLS");
	}

	@Override
	public int updateVeRegPDF(String carnumber, MultipartFile[] files) throws Exception {

		int rtn = 0;
		String fileName = carnumber + "_Reg.PDF";

		FTPClient ftp = ftpmanager.connect();
		if (files[0].getSize() > 0) {
			if (ftp.isConnected()) {
				InputStream inputStream = new BufferedInputStream(files[0].getInputStream());

				String filename = ftpmanager.getCarFolder() + "reg/" + fileName;

				if (ftp.storeFile(filename, inputStream)) {
					VehicleInfoDTO dto = new VehicleInfoDTO();

					dto.setCarNumber(carnumber);
					dto.setRegd(LocalDate.now().toString());
					dto.setReg(fileName);

					rtn = vehicleMapper.updateVePDF(dto);

				} else {
					rtn = 2;
				}
			} else {
				rtn = 2;
			}
		} else {
			rtn = 2;
		}

		ftpmanager.disconnect(ftp);

		return rtn;
	}

	@Override
	public int updateVeInsuPDF(String carnumber, MultipartFile[] files) throws Exception {
		int rtn = 0;
		String fileName = carnumber + "_Insu.PDF";

		FTPClient ftp = ftpmanager.connect();
		if (files[0].getSize() > 0) {
			if (ftp.isConnected()) {
				InputStream inputStream = new BufferedInputStream(files[0].getInputStream());

				String filename = ftpmanager.getCarFolder() + "insu/" + fileName;

				if (ftp.storeFile(filename, inputStream)) {
					VehicleInfoDTO dto = new VehicleInfoDTO();

					dto.setCarNumber(carnumber);
					dto.setInsud(LocalDate.now().toString());
					dto.setInsu(fileName);

					rtn = vehicleMapper.updateVePDF(dto);

				} else {
					rtn = 2;
				}
			} else {
				rtn = 2;
			}
		} else {
			rtn = 2;
		}

		ftpmanager.disconnect(ftp);

		return rtn;
	}

}
