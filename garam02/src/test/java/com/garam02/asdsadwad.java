package com.garam02;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.apache.commons.io.FileUtils;
import org.apache.pdfbox.multipdf.PDFMergerUtility;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;

import com.garam.Garam02Application;
import com.garam.web.Utils.PDFUtil;
import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.text.pdf.draw.LineSeparator;

@SpringBootTest
@ContextConfiguration(classes = Garam02Application.class)
public class asdsadwad {

	@Test
	void pdfff() throws MalformedURLException, IOException {
		String OUTPUT_FILE_PATH = "tmp11.pdf";
		String FILE_URL = "http://192.168.35.29:8000/list/HDD2/src/ve/reg/V-220130-q7OPTS_Reg.PDF";

		InputStream inputStream = new URL(FILE_URL).openStream();

		File tempFile = File.createTempFile(String.valueOf(inputStream.hashCode()), ".tmp");
		tempFile.deleteOnExit();

		FileUtils.copyInputStreamToFile(inputStream, tempFile);

		// Loading an existing PDF document
//		File file1 = new File(FILE_URL);
		PDDocument doc1 = PDDocument.load(tempFile);

//		File file2 = new File(FILE_URL);
		PDDocument doc2 = PDDocument.load(tempFile);

		// Instantiating PDFMergerUtility class
		PDFMergerUtility PDFmerger = new PDFMergerUtility();

		// Setting the destination file
		PDFmerger.setDestinationFileName("C:\\IDE\\test.pdf");

		// adding the source files
		PDFmerger.addSource(tempFile);
		PDFmerger.addSource(tempFile);

		// Merging the two documents
		PDFmerger.mergeDocuments(null);

		System.out.println("Documents merged");
		// Closing the documents
		doc1.close();
		doc2.close();

	}

	@Test
	void empBaechi() throws DocumentException, IOException {
		PDFUtil pdfU = new PDFUtil();

		Document document = null;

		File file = new File("tmp.pdf");

		document = pdfU.getDocument();

		Font font = pdfU.getHYHeadM(20f);
		Font font1 = pdfU.getMalgun(12f);

		Chunk chunk = new Chunk("북부초등학교" + " 기사배치표", font);

		Paragraph ph = new Paragraph(chunk);
		ph.setAlignment(Element.ALIGN_CENTER);

		Chunk chunk1 = new Chunk("위와 같이 배차합니다.", font1);

		Paragraph ph1 = new Paragraph(chunk1);
		ph1.setAlignment(Element.ALIGN_RIGHT);

		PdfPTable table_title = new PdfPTable(new float[] { 1f, 3f, 2f, 3f, 3f });
		table_title.setWidthPercentage(100);

		PdfPCell[] cell_Title = new PdfPCell[4];

		cell_Title[0] = new PdfPCell(new Paragraph("날짜", font1));
		cell_Title[1] = new PdfPCell(new Paragraph("", font1));
		cell_Title[2] = new PdfPCell(new Paragraph("목적지", font1));
		cell_Title[3] = new PdfPCell(new Paragraph("", font1));
		cell_Title[3].setColspan(2);

		for (int i = 0; i < cell_Title.length; i++) {
			if (i % 2 == 0) {
				cell_Title[i].setBackgroundColor(new BaseColor(217, 217, 217));
			}
			cell_Title[i].setFixedHeight(20);
			cell_Title[i].setPaddingBottom(5);
			cell_Title[i].setHorizontalAlignment(Element.ALIGN_CENTER);
			cell_Title[i].setVerticalAlignment(Element.ALIGN_MIDDLE);

			table_title.addCell(cell_Title[i]);
		}

		PdfPTable table_cont = new PdfPTable(new float[] { 1f, 3f, 2f, 3f, 3f });
		table_cont.setWidthPercentage(100);

		PdfPCell[] cell_cont1 = new PdfPCell[5];

		cell_cont1[0] = new PdfPCell(new Paragraph("번호", font1));
		cell_cont1[1] = new PdfPCell(new Paragraph("차 량 번 호", font1));
		cell_cont1[2] = new PdfPCell(new Paragraph("승 무 원", font1));
		cell_cont1[3] = new PdfPCell(new Paragraph("전 화 번 호", font1));
		cell_cont1[4] = new PdfPCell(new Paragraph("비  고", font1));

		for (int i = 0; i < cell_cont1.length; i++) {
			cell_cont1[i].setFixedHeight(20);
			cell_cont1[i].setPaddingBottom(4);
			cell_cont1[i].setHorizontalAlignment(Element.ALIGN_CENTER);
			cell_cont1[i].setVerticalAlignment(Element.ALIGN_MIDDLE);

			table_cont.addCell(cell_cont1[i]);
		}

		PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(file));

		document.open();

		document.add(ph);

		document.add(pdfU.getBlank(12f));

		document.add(new LineSeparator());

		document.add(pdfU.getBlank(12f));

		document.add(table_title);

		document.add(pdfU.getBlank(8f));

		document.add(table_cont);

		document.add(pdfU.getBlank(16f));

		document.add(new LineSeparator());

		document.add(pdfU.getBlank(1f));

		document.add(ph1);

		document.close();

	}

	@Test
	void gaksu() throws DocumentException, IOException {
		PDFUtil pdfU = new PDFUtil();

		Document document = null;

		File file = new File("tmp1.pdf");

		document = pdfU.getDocument();

		Font font = pdfU.getHYHeadM(20f);
		Font font1 = pdfU.getMalgun(15f);

		Chunk chunk = new Chunk("직영차량 운행 각서", font);

		Paragraph ph = new Paragraph(chunk);
		ph.setAlignment(Element.ALIGN_CENTER);

		PdfPTable table_title = new PdfPTable(new float[] { 3f, 0.5f, 10f });
		table_title.setWidthPercentage(100);

		PdfPCell[] cell_Title1 = new PdfPCell[3];
		PdfPCell[] cell_Title2 = new PdfPCell[3];
		PdfPCell[] cell_Title3 = new PdfPCell[3];

		cell_Title1[0] = new PdfPCell(new Paragraph("상호(법인)명", font1));
		cell_Title1[1] = new PdfPCell(new Paragraph(":", font1));
		cell_Title1[2] = new PdfPCell(new Paragraph("", font1));

		for (int i = 0; i < cell_Title1.length; i++) {
			cell_Title1[i].setBorderWidth(0);
			cell_Title1[i].setFixedHeight(25);
//			cell_Title1[i].setPaddingBottom(5);
			cell_Title1[i].setHorizontalAlignment(Element.ALIGN_LEFT);
			cell_Title1[i].setVerticalAlignment(Element.ALIGN_MIDDLE);

			table_title.addCell(cell_Title1[i]);
		}

		cell_Title2[0] = new PdfPCell(new Paragraph("법인등록번호", font1));
		cell_Title2[1] = new PdfPCell(new Paragraph(":", font1));
		cell_Title2[2] = new PdfPCell(new Paragraph("123123123", font1));

		for (int i = 0; i < cell_Title2.length; i++) {
			cell_Title2[i].setBorderWidth(0);
			cell_Title2[i].setFixedHeight(25);
//			cell_Title2[i].setPaddingBottom(5);
			cell_Title2[i].setHorizontalAlignment(Element.ALIGN_LEFT);
			cell_Title2[i].setVerticalAlignment(Element.ALIGN_MIDDLE);

			table_title.addCell(cell_Title2[i]);
		}

		cell_Title3[0] = new PdfPCell(new Paragraph("주           소", font1));
		cell_Title3[1] = new PdfPCell(new Paragraph(":", font1));
		cell_Title3[2] = new PdfPCell(new Paragraph("", font1));

		for (int i = 0; i < cell_Title3.length; i++) {
			cell_Title3[i].setBorderWidth(0);
			cell_Title3[i].setFixedHeight(25);
//			cell_Title3[i].setPaddingBottom(5);
			cell_Title3[i].setHorizontalAlignment(Element.ALIGN_LEFT);
			cell_Title3[i].setVerticalAlignment(Element.ALIGN_MIDDLE);

			table_title.addCell(cell_Title3[i]);
		}

		String con1 = " 현장체험학습 전세버스 임차 운행" + "\u300D"
				+ "용역에 참가함에 있어 귀 기관에서 제시한 제반사항을 준수하고 이용객의 안전을 위해 당사의 직영차량으로만 운행을 하며, 이를 위반하였을 경우 계약해지 등 어떠한 제재조치를 취하여도 이의를 제기하지 않을 것을 확약합니다.";

		Chunk chunk1 = new Chunk("   " + "(주)새천년관광" + "은 " + "\u300C" + "초등학교" + con1, font1);

		Paragraph ph1 = new Paragraph(chunk1);
		ph1.setLeading(28f);

		Chunk chunk2 = new Chunk("2022 . 04 . 01 .", font1);

		Paragraph ph2 = new Paragraph(chunk2);
		ph2.setAlignment(Element.ALIGN_CENTER);

		PdfPTable table_foot = new PdfPTable(new float[] { 0.5f, 0.4f, 0.6f, 0.1f, 1f });
		table_foot.setWidthPercentage(100);

		PdfPCell[] cell_Foot1 = new PdfPCell[4];
		PdfPCell[] cell_Foot2 = new PdfPCell[4];
		PdfPCell[] cell_Foot3 = new PdfPCell[4];

		cell_Foot1[0] = new PdfPCell(new Paragraph("", font1));
		cell_Foot1[1] = new PdfPCell(new Paragraph("상호(법인)명", font1));
		cell_Foot1[2] = new PdfPCell(new Paragraph(":", font1));
		cell_Foot1[3] = new PdfPCell(new Paragraph("", font1));

		cell_Foot1[0].setColspan(2);

		for (int i = 0; i < cell_Foot1.length; i++) {
			cell_Foot1[i].setBorderWidth(0);
			cell_Foot1[i].setFixedHeight(25);
			cell_Foot1[i].setPaddingBottom(5);
			cell_Foot1[i].setHorizontalAlignment(Element.ALIGN_LEFT);
			cell_Foot1[i].setVerticalAlignment(Element.ALIGN_MIDDLE);

			table_foot.addCell(cell_Foot1[i]);
		}

		cell_Foot2[0] = new PdfPCell(new Paragraph("", font1));
		cell_Foot2[1] = new PdfPCell(new Paragraph("대  표  자", font1));
		cell_Foot2[2] = new PdfPCell(new Paragraph(":", font1));
		cell_Foot2[3] = new PdfPCell(new Paragraph("", font1));

		cell_Foot2[0].setColspan(2);

		for (int i = 0; i < cell_Foot2.length; i++) {
			cell_Foot2[i].setBorderWidth(0);
			cell_Foot2[i].setFixedHeight(25);
			cell_Foot2[i].setPaddingBottom(5);
			cell_Foot2[i].setHorizontalAlignment(Element.ALIGN_LEFT);
			cell_Foot2[i].setVerticalAlignment(Element.ALIGN_MIDDLE);

			table_foot.addCell(cell_Foot2[i]);
		}

		cell_Foot3[0] = new PdfPCell(new Paragraph("", font1));
		cell_Foot3[1] = new PdfPCell(new Paragraph("주민등록번호", font1));
		cell_Foot3[2] = new PdfPCell(new Paragraph(":", font1));
		cell_Foot3[3] = new PdfPCell(new Paragraph("123123123123", font1));

		cell_Foot3[0].setColspan(2);

		for (int i = 0; i < cell_Foot3.length; i++) {
			cell_Foot3[i].setBorderWidth(0);
			cell_Foot3[i].setFixedHeight(25);
			cell_Foot3[i].setPaddingBottom(5);
			cell_Foot3[i].setHorizontalAlignment(Element.ALIGN_LEFT);
			cell_Foot3[i].setVerticalAlignment(Element.ALIGN_MIDDLE);

			table_foot.addCell(cell_Foot3[i]);
		}

		font1 = pdfU.getMalgunBold(16f);

		Chunk chunk3 = new Chunk("초등학교장 귀하", font1);

		Paragraph ph3 = new Paragraph(chunk3);

		ph3.setAlignment(Element.ALIGN_LEFT);

		PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(file));

		document.open();

		document.add(ph);

		document.add(pdfU.getBlank(15f));
		document.add(pdfU.getBlank(15f));
		document.add(pdfU.getBlank(15f));

		document.add(table_title);

		document.add(pdfU.getBlank(15f));
		document.add(pdfU.getBlank(15f));

		document.add(ph1);

		document.add(pdfU.getBlank(15f));
		document.add(pdfU.getBlank(15f));
		document.add(pdfU.getBlank(15f));

		document.add(ph2);

		document.add(pdfU.getBlank(15f));
		document.add(pdfU.getBlank(15f));
		document.add(pdfU.getBlank(15f));

		document.add(table_foot);

		document.add(pdfU.getBlank(15f));
		document.add(pdfU.getBlank(15f));
		document.add(pdfU.getBlank(15f));

		document.add(ph3);

		document.close();

	}

	@Test
	void anjun() throws DocumentException, IOException {
		PDFUtil pdfU = new PDFUtil();

		Document document = null;

		File file = new File("tmp2.pdf");

		document = pdfU.getDocument();

		Font font = pdfU.getHYHeadM(18f);
		Font font1 = pdfU.getMalgun(14f);
		Font font2 = pdfU.getMalgun(13f);
		Font font3 = pdfU.getMalgunBold(13F);

		Font font4 = pdfU.getMalgunBold(10F);

		PdfPTable table_title = new PdfPTable(new float[] { 1f });
		table_title.setWidthPercentage(100);

		PdfPCell[] cell_Title = new PdfPCell[1];

		cell_Title[0] = new PdfPCell(new Paragraph("출발 전 교육 및 차량안전점검표", font));
		cell_Title[0].setBackgroundColor(new BaseColor(255, 255, 204));
		for (int i = 0; i < cell_Title.length; i++) {
			cell_Title[i].setFixedHeight(40);
			cell_Title[i].setPaddingBottom(6);
			cell_Title[i].setHorizontalAlignment(Element.ALIGN_CENTER);
			cell_Title[i].setVerticalAlignment(Element.ALIGN_MIDDLE);

			table_title.addCell(cell_Title[i]);
		}

		PdfPTable table_middle1 = new PdfPTable(new float[] { 1.7f, 1.4f, 2f });
		table_middle1.setWidthPercentage(100);

		PdfPCell[] cell_middle1 = new PdfPCell[3];

		cell_middle1[0] = new PdfPCell(new Paragraph("\u25A1" + " " + "2022년03월30일(화)", font1));
		cell_middle1[1] = new PdfPCell(new Paragraph("현장체험학습 장소 : ", font1));
		cell_middle1[2] = new PdfPCell(new Paragraph("2022 . 03 . 30 . (화)", font1));

		cell_middle1[0].setPaddingTop(3f);

		for (int i = 0; i < cell_middle1.length; i++) {
			cell_middle1[i].setBorderWidth(0);
			cell_middle1[i].setFixedHeight(30);
			cell_middle1[i].setHorizontalAlignment(Element.ALIGN_LEFT);

			table_middle1.addCell(cell_middle1[i]);
		}

		PdfPTable table_middle2 = new PdfPTable(new float[] { 1f, 3.2f });
		table_middle2.setWidthPercentage(100);

		PdfPCell[] cell_middle2 = new PdfPCell[2];

		cell_middle2[0] = new PdfPCell(new Paragraph("\u25A1" + " 점검(교육)자 : ", font1));
		cell_middle2[1] = new PdfPCell(new Paragraph("대구대구대구초등학교 (인)" + "    " + "(주)새천년고속관광 이재동 (인)", font1));

		for (int i = 0; i < cell_middle2.length; i++) {
			cell_middle2[i].setBorderWidth(0);
			cell_middle2[i].setFixedHeight(30);
			cell_middle2[i].setHorizontalAlignment(Element.ALIGN_LEFT);

			table_middle2.addCell(cell_middle2[i]);
		}

		PdfPTable table_cont = new PdfPTable(new float[] { 0.5f, 2.8f, 1.2f, 0.5f });
		table_cont.setWidthPercentage(100);

		PdfPCell[] cell_cont = new PdfPCell[4];

		cell_cont[0] = new PdfPCell(new Paragraph("구 분", font3));
		cell_cont[1] = new PdfPCell(new Paragraph("점검(교육)내용", font3));
		cell_cont[2] = new PdfPCell(new Paragraph("점검결과\n(실시여부/부적합)", font3));
		cell_cont[3] = new PdfPCell(new Paragraph("비고", font3));

		cell_cont[1].setPaddingTop(3f);

		for (int i = 0; i < cell_cont.length; i++) {
			cell_cont[i].setFixedHeight(40);
			cell_cont[i].setPaddingBottom(5);
			cell_cont[i].setHorizontalAlignment(Element.ALIGN_CENTER);
			cell_cont[i].setVerticalAlignment(Element.ALIGN_MIDDLE);

			table_cont.addCell(cell_cont[i]);
		}

		PdfPCell[] cell_cont1 = new PdfPCell[4];

		cell_cont1[0] = new PdfPCell(new Paragraph("운전자", font2));
		cell_cont1[1] = new PdfPCell(new Paragraph(" - 운전자격요건 확인 운전자 탑승 여부", font2));
		cell_cont1[2] = new PdfPCell(new Paragraph("", font2));
		cell_cont1[3] = new PdfPCell(new Paragraph("", font2));

		cell_cont1[0].setRowspan(2);

		for (int i = 0; i < cell_cont1.length; i++) {
			cell_cont1[i].setFixedHeight(30);
			cell_cont1[i].setPaddingBottom(5);
			if (i == 1) {
				cell_cont1[i].setHorizontalAlignment(Element.ALIGN_LEFT);
			} else {
				cell_cont1[i].setHorizontalAlignment(Element.ALIGN_CENTER);
			}
			cell_cont1[i].setVerticalAlignment(Element.ALIGN_MIDDLE);

			table_cont.addCell(cell_cont1[i]);
		}

		PdfPCell[] cell_cont2 = new PdfPCell[3];

		cell_cont2[0] = new PdfPCell(new Paragraph(" - 운전자 음주여부 확인", font2));
		cell_cont2[1] = new PdfPCell(new Paragraph("", font2));
		cell_cont2[2] = new PdfPCell(new Paragraph("", font2));

		for (int i = 0; i < cell_cont2.length; i++) {
			cell_cont2[i].setFixedHeight(30);
			cell_cont2[i].setPaddingBottom(5);
			if (i == 0) {
				cell_cont2[i].setHorizontalAlignment(Element.ALIGN_LEFT);
			} else {
				cell_cont2[i].setHorizontalAlignment(Element.ALIGN_CENTER);
			}
			cell_cont2[i].setVerticalAlignment(Element.ALIGN_MIDDLE);

			table_cont.addCell(cell_cont2[i]);
		}

		PdfPCell[] cell_cont3 = new PdfPCell[4];

		Chunk chunk1 = new Chunk("차량\n\n외부", font2);

		Paragraph ph1 = new Paragraph(chunk1);
		ph1.setLeading(50f);

		Chunk chunk1_1 = new Chunk(" - 앞타이어 재생타이어 사용 여부\n\n", font2);
		Chunk chunk1_2 = new Chunk("   (앞 타이어 재생사용은 불법-대형사고 원인)", font4);

		Paragraph ph1_1 = new Paragraph();

		Paragraph ph1_11 = new Paragraph(chunk1_1);
		Paragraph ph1_12 = new Paragraph(chunk1_2);

		ph1_1.add(ph1_11);
		ph1_1.add(ph1_12);

		cell_cont3[0] = new PdfPCell(ph1);
		cell_cont3[1] = new PdfPCell(ph1_1);
		cell_cont3[2] = new PdfPCell(new Paragraph("", font2));
		cell_cont3[3] = new PdfPCell(new Paragraph("", font2));

		cell_cont3[0].setRowspan(3);

		for (int i = 0; i < cell_cont3.length; i++) {
			cell_cont3[i].setFixedHeight(50);
			cell_cont3[i].setPaddingBottom(5);
			if (i == 1) {
				cell_cont3[i].setHorizontalAlignment(Element.ALIGN_LEFT);
			} else {
				cell_cont3[i].setHorizontalAlignment(Element.ALIGN_CENTER);
			}
			cell_cont3[i].setVerticalAlignment(Element.ALIGN_MIDDLE);

			table_cont.addCell(cell_cont3[i]);
		}

		PdfPCell[] cell_cont5 = new PdfPCell[3];

		cell_cont5[0] = new PdfPCell(new Paragraph(" - 차량외부 회사명 등 표시 여부", font2));
		cell_cont5[1] = new PdfPCell(new Paragraph("", font2));
		cell_cont5[2] = new PdfPCell(new Paragraph("", font2));

		for (int i = 0; i < cell_cont5.length; i++) {
			cell_cont5[i].setFixedHeight(30);
			cell_cont5[i].setPaddingBottom(5);
			if (i == 0) {
				cell_cont5[i].setHorizontalAlignment(Element.ALIGN_LEFT);
			} else {
				cell_cont5[i].setHorizontalAlignment(Element.ALIGN_CENTER);
			}
			cell_cont5[i].setVerticalAlignment(Element.ALIGN_MIDDLE);

			table_cont.addCell(cell_cont5[i]);
		}

		PdfPCell[] cell_cont6 = new PdfPCell[3];

		cell_cont6[0] = new PdfPCell(new Paragraph(" - 타이어 마모 ․ 균열 상태 확인 여부", font2));
		cell_cont6[1] = new PdfPCell(new Paragraph("", font2));
		cell_cont6[2] = new PdfPCell(new Paragraph("", font2));

		for (int i = 0; i < cell_cont6.length; i++) {
			cell_cont6[i].setFixedHeight(30);
			cell_cont6[i].setPaddingBottom(5);
			if (i == 0) {
				cell_cont6[i].setHorizontalAlignment(Element.ALIGN_LEFT);
			} else {
				cell_cont6[i].setHorizontalAlignment(Element.ALIGN_CENTER);
			}
			cell_cont6[i].setVerticalAlignment(Element.ALIGN_MIDDLE);

			table_cont.addCell(cell_cont6[i]);
		}

		PdfPCell[] cell_cont7 = new PdfPCell[4];

		Chunk chunk2 = new Chunk("차량\n\n내부", font2);

		Paragraph ph2 = new Paragraph(chunk2);
		ph2.setLeading(28f);

		cell_cont7[0] = new PdfPCell(ph2);
		cell_cont7[1] = new PdfPCell(new Paragraph(" - 회사명, 운전자, 연락처 등 비치 여부", font2));
		cell_cont7[2] = new PdfPCell(new Paragraph("", font2));
		cell_cont7[3] = new PdfPCell(new Paragraph("", font2));

		cell_cont7[0].setRowspan(4);

		for (int i = 0; i < cell_cont7.length; i++) {
			cell_cont7[i].setFixedHeight(30);
			cell_cont7[i].setPaddingBottom(5);
			if (i == 1) {
				cell_cont7[i].setHorizontalAlignment(Element.ALIGN_LEFT);
			} else {
				cell_cont7[i].setHorizontalAlignment(Element.ALIGN_CENTER);
			}
			cell_cont7[i].setVerticalAlignment(Element.ALIGN_MIDDLE);

			table_cont.addCell(cell_cont7[i]);
		}

		PdfPCell[] cell_cont8 = new PdfPCell[3];

		cell_cont8[0] = new PdfPCell(new Paragraph(" - 소화기 비치 여부", font2));
		cell_cont8[1] = new PdfPCell(new Paragraph("", font2));
		cell_cont8[2] = new PdfPCell(new Paragraph("", font2));

		for (int i = 0; i < cell_cont8.length; i++) {
			cell_cont8[i].setFixedHeight(30);
			cell_cont8[i].setPaddingBottom(5);
			if (i == 0) {
				cell_cont8[i].setHorizontalAlignment(Element.ALIGN_LEFT);
			} else {
				cell_cont8[i].setHorizontalAlignment(Element.ALIGN_CENTER);
			}
			cell_cont8[i].setVerticalAlignment(Element.ALIGN_MIDDLE);

			table_cont.addCell(cell_cont8[i]);
		}

		PdfPCell[] cell_cont9 = new PdfPCell[3];

		cell_cont9[0] = new PdfPCell(new Paragraph(" - 비상탈출용 망치 비치 여부", font2));
		cell_cont9[1] = new PdfPCell(new Paragraph("", font2));
		cell_cont9[2] = new PdfPCell(new Paragraph("", font2));

		for (int i = 0; i < cell_cont9.length; i++) {
			cell_cont9[i].setFixedHeight(30);
			cell_cont9[i].setPaddingBottom(5);
			if (i == 0) {
				cell_cont9[i].setHorizontalAlignment(Element.ALIGN_LEFT);
			} else {
				cell_cont9[i].setHorizontalAlignment(Element.ALIGN_CENTER);
			}
			cell_cont9[i].setVerticalAlignment(Element.ALIGN_MIDDLE);

			table_cont.addCell(cell_cont9[i]);
		}

		PdfPCell[] cell_cont10 = new PdfPCell[3];

		cell_cont10[0] = new PdfPCell(new Paragraph(" - 불법구조변경 여부(테이블설치 등)", font2));
		cell_cont10[1] = new PdfPCell(new Paragraph("", font2));
		cell_cont10[2] = new PdfPCell(new Paragraph("", font2));

		for (int i = 0; i < cell_cont10.length; i++) {
			cell_cont10[i].setFixedHeight(30);
			cell_cont10[i].setPaddingBottom(5);
			if (i == 0) {
				cell_cont10[i].setHorizontalAlignment(Element.ALIGN_LEFT);
			} else {
				cell_cont10[i].setHorizontalAlignment(Element.ALIGN_CENTER);
			}
			cell_cont10[i].setVerticalAlignment(Element.ALIGN_MIDDLE);

			table_cont.addCell(cell_cont10[i]);
		}

		PdfPCell[] cell_cont11 = new PdfPCell[4];

		Chunk chunk3 = new Chunk("운전자\n\n교육", font2);

		Paragraph ph3 = new Paragraph(chunk3);
		ph3.setLeading(50f);

		cell_cont11[0] = new PdfPCell(ph3);
		cell_cont11[1] = new PdfPCell(new Paragraph(" - 운전자는 출발 및 재출발시 반드시\n  안전벨트착용 토록 안내방송 실시", font2));
		cell_cont11[2] = new PdfPCell(new Paragraph("", font2));
		cell_cont11[3] = new PdfPCell(new Paragraph("", font2));

		cell_cont11[0].setRowspan(3);

		for (int i = 0; i < cell_cont11.length; i++) {
			cell_cont11[i].setFixedHeight(40);
			cell_cont11[i].setPaddingBottom(5);
			if (i == 1) {
				cell_cont11[i].setHorizontalAlignment(Element.ALIGN_LEFT);
			} else {
				cell_cont11[i].setHorizontalAlignment(Element.ALIGN_CENTER);
			}
			cell_cont11[i].setVerticalAlignment(Element.ALIGN_MIDDLE);

			table_cont.addCell(cell_cont11[i]);
		}

		PdfPCell[] cell_cont12 = new PdfPCell[3];

		Chunk chunk2_1 = new Chunk("  급출발 ․ 급제동 및 대열운행 금지", font2);
		Chunk chunk2_2 = new Chunk("   (목적지 및 중간휴식지, 운행경로 등", font4);
		Chunk chunk2_3 = new Chunk("   운전자에게 사전 안내 실시)", font4);

		Paragraph ph4_0 = new Paragraph();
		Paragraph ph4_1 = new Paragraph(chunk2_1);
		Paragraph ph4_2 = new Paragraph(chunk2_2);
		Paragraph ph4_3 = new Paragraph(chunk2_3);

		ph4_1.add(chunk2_1);
		ph4_2.add(chunk2_2);
		ph4_3.add(chunk2_3);

		ph4_0.add(ph4_1);
		ph4_0.add(ph4_2);
		ph4_0.add(ph4_3);

		for (int i = 0; i < cell_cont12.length; i++) {
			cell_cont12[i].setFixedHeight(60);
			cell_cont12[i].setPaddingBottom(5);
			if (i == 0) {
				cell_cont12[i].setHorizontalAlignment(Element.ALIGN_LEFT);
			} else {
				cell_cont12[i].setHorizontalAlignment(Element.ALIGN_CENTER);
			}
			cell_cont12[i].setVerticalAlignment(Element.ALIGN_MIDDLE);

			table_cont.addCell(cell_cont12[i]);
		}

		PdfPCell[] cell_cont13 = new PdfPCell[3];

		cell_cont13[0] = new PdfPCell(
				new Paragraph(" - 내리막길 저단기어(엔진브레이크) 사용\n   및 풋브레이크 연속사용 금지\n   (브레이크파열에 따른 대형사고 유발원인)", font2));
		cell_cont13[1] = new PdfPCell(new Paragraph("", font2));
		cell_cont13[2] = new PdfPCell(new Paragraph("", font2));

		for (int i = 0; i < cell_cont13.length; i++) {
			cell_cont13[i].setFixedHeight(60);
			cell_cont13[i].setPaddingBottom(5);
			if (i == 0) {
				cell_cont13[i].setHorizontalAlignment(Element.ALIGN_LEFT);
			} else {
				cell_cont13[i].setHorizontalAlignment(Element.ALIGN_CENTER);
			}
			cell_cont13[i].setVerticalAlignment(Element.ALIGN_MIDDLE);

			table_cont.addCell(cell_cont13[i]);
		}

		PdfPCell[] cell_cont14 = new PdfPCell[4];

		cell_cont14[0] = new PdfPCell(new Paragraph("기타", font2));
		cell_cont14[1] = new PdfPCell(new Paragraph("", font2));
		cell_cont14[2] = new PdfPCell(new Paragraph("", font2));
		cell_cont14[3] = new PdfPCell(new Paragraph("", font2));

		for (int i = 0; i < cell_cont14.length; i++) {
			cell_cont14[i].setFixedHeight(30);
			cell_cont14[i].setPaddingBottom(5);
			cell_cont14[i].setHorizontalAlignment(Element.ALIGN_CENTER);
			cell_cont14[i].setVerticalAlignment(Element.ALIGN_MIDDLE);

			table_cont.addCell(cell_cont14[i]);
		}

		PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(file));

		document.open();

		document.add(table_title);

		document.add(pdfU.getBlank(15f));

		document.add(table_middle1);

		document.add(table_middle2);

		document.add(pdfU.getBlank(15f));

		document.add(table_cont);

		document.close();
	}

}
