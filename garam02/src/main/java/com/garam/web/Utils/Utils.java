package com.garam.web.Utils;

import java.time.LocalDate;
import java.time.Period;

public class Utils {
	static public String getAge(String date) {

		String rtn = "";

		if (date == null || date.equals("")) {
			rtn = "";
		} else {
			String[] arr = date.split("-");

			LocalDate today = LocalDate.now();
			LocalDate hiredDate = LocalDate.of(Integer.parseInt(arr[0]), Integer.parseInt(arr[1]),
					Integer.parseInt(arr[2]));

			Period period = hiredDate.until(today);

			rtn = "만 " + period.getYears() + "세";
		}

		return rtn;
	}

	static public String getYearMonth(String date) {

		String rtn = "";

		if (date == null || date.equals("")) {
			rtn = "";
		} else {
			String[] arr = date.split("-");

			LocalDate today = LocalDate.now();
			LocalDate hiredDate = LocalDate.of(Integer.parseInt(arr[0]), Integer.parseInt(arr[1]),
					Integer.parseInt(arr[2]));

			Period period = hiredDate.until(today);

			if (period.getYears() > 0) {
				rtn = period.getYears() + "년 " + period.getMonths() + "개월";
			} else {
				rtn = period.getMonths() + "개월";
			}

		}

		return rtn;
	}

	static public String getFileName(String name, String unique) {
		String rtn;

		String fileN1 = name.replaceAll("\\\\", ",");
		String[] fileN2 = fileN1.split(",");
		String fileN3 = fileN2[fileN2.length - 1];
		String[] fileN4 = fileN3.split("\\.");
		String fileN5 = fileN4[fileN4.length - 1];

		rtn = unique + "." + fileN5;

		return rtn;
	}

	static public String splitVehicle(String vehicle) {

		int nnn = vehicle.length();

		String rtn = vehicle.substring(nnn - 4);

		return rtn;
	}
}
