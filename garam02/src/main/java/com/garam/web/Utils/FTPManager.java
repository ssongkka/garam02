package com.garam.web.Utils;

import java.io.File;

import java.io.FileInputStream;
import java.io.IOException;
import java.net.SocketException;

import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPClientConfig;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;

@PropertySource("classpath:/application.properties")
@Service
public class FTPManager {

	@Value("${ftp.host}")
	private String host; // FTP 접속 호스트

	@Value("${ftp.username}")
	private String username; // FTP 로그인 id

	@Value("${ftp.password}")
	private String password; // FTP 로그인 pw

	@Value("${ftp.port}")
	private int port; // FTP 로그인 pw

	@Value("${ftp.url}")
	private String url;

	@Value("${ftp.empFolder}")
	private String empFolder;

	@Value("${ftp.carFolder}")
	private String carFolder;

	public String getHost() {
		return host;
	}

	public String getUsername() {
		return username;
	}

	public String getPassword() {
		return password;
	}

	public int getPort() {
		return port;
	}

	public String getEmpFolder() {
		return empFolder;
	}

	public String getCarFolder() {
		return carFolder;
	}

	public String getUrl() {
		return url;
	}

	// FTP connect
	public FTPClient connect() {

		System.out.println("모모모모   " + host);
		System.out.println("모모모모   " + username);
		System.out.println("모모모모   " + password);
		System.out.println("모모모모   " + port);

		FTPClient client = new FTPClient(); // FTP 연결 및 조작 객체 생성
		client.setControlEncoding("UTF-8");

		FTPClientConfig config = new FTPClientConfig();
		client.configure(config);

		try {
			client.connect(host, port); // FTP 서버에 연결, FTP 포트번호 21
			if (client.login(username, password)) { // FTP 서버 로그인
				client.setFileType(FTP.BINARY_FILE_TYPE); // 로그인 성공 시 업로드 파일 타입 세팅(기본 값 : ASCII)
			}
		} catch (SocketException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		return client; // client 객체 반환
	}

	// FTP disconnect
	public void disconnect(FTPClient client) {
		if (client != null && client.isConnected()) { // client가 연결된 상태일 때
			try {
				client.disconnect(); // 연결 해제
			} catch (SocketException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	public boolean uploadFile(FTPClient ftp, String fileName, String fileRoot) throws IOException {
		File file = new File(fileRoot);

		String ftpRoot = empFolder + fileName;

		FileInputStream fis = new FileInputStream(file);

		System.out.println(ftpRoot);

		boolean rtn = ftp.storeFile(ftpRoot, fis);

		return rtn;
	}

	public String getVeFolder() {
		System.out.println("url   " + url);
		System.out.println("carFolder   " + carFolder);
		return url + carFolder;
	}

}
