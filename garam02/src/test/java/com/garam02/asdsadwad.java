package com.garam02;

import java.io.BufferedReader;
import java.io.File;
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
	void pdfff11() {
		
	}

}
