package com.garam.calendar.domain;

import java.time.LocalDate;

public class CalendarDTO {

	private int no;

	private LocalDate solarCal;

	private String lunarCal;

	private String season;

	private String etc;

	private String holiday;

	private String anniversary;

	private String event;

	private String stD;
	private String endD;

	public int getNo() {
		return no;
	}

	public void setNo(int no) {
		this.no = no;
	}

	public LocalDate getSolarCal() {
		return solarCal;
	}

	public void setSolarCal(LocalDate solarCal) {
		this.solarCal = solarCal;
	}

	public String getLunarCal() {
		return lunarCal;
	}

	public void setLunarCal(String lunarCal) {
		this.lunarCal = lunarCal;
	}

	public String getSeason() {
		return season;
	}

	public void setSeason(String season) {
		this.season = season;
	}

	public String getEtc() {
		return etc;
	}

	public void setEtc(String etc) {
		this.etc = etc;
	}

	public String getHoliday() {
		return holiday;
	}

	public void setHoliday(String holiday) {
		this.holiday = holiday;
	}

	public String getAnniversary() {
		return anniversary;
	}

	public void setAnniversary(String anniversary) {
		this.anniversary = anniversary;
	}

	public String getEvent() {
		return event;
	}

	public void setEvent(String event) {
		this.event = event;
	}

	public String getStD() {
		return stD;
	}

	public void setStD(String stD) {
		this.stD = stD;
	}

	public String getEndD() {
		return endD;
	}

	public void setEndD(String endD) {
		this.endD = endD;
	}

}
