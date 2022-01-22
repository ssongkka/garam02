const calen = new cal();

$(document).ready(function() {

	$('#info-limit').hide();
	const now_D = new Date();

	const nowMonth = new Date(now_D.getFullYear(), now_D.getMonth(), 1);
	const nowDay = new Date(now_D.getFullYear(), now_D.getMonth(), now_D.getDate());

	const id = calen.setCalendar(nowMonth, nowDay);
	setCalWhite(id);
});

$(document).on('click', '#btnYesD', function() {

	var now_D = new Date();

	var nowMonth = new Date(now_D.getFullYear(), now_D.getMonth(), 1);
	var nowDay = new Date(now_D.getFullYear(), now_D.getMonth(), now_D.getDate());
	var day = new Date(nowDay.setDate(nowDay.getDate() - 1));

	var id = calen.setCalendar(nowMonth, day);

	setCalWhite(id);
});

$(document).on('click', '#btnToD', function() {

	var now_D = new Date();

	var nowMonth = new Date(now_D.getFullYear(), now_D.getMonth(), 1);
	var nowDay = new Date(now_D.getFullYear(), now_D.getMonth(), now_D.getDate());

	var id = calen.setCalendar(nowMonth, nowDay);

	setCalWhite(id);
});

$(document).on('click', '#btnTomD', function() {

	var now_D = new Date();

	var nowMonth = new Date(now_D.getFullYear(), now_D.getMonth(), 1);
	var nowDay = new Date(now_D.getFullYear(), now_D.getMonth(), now_D.getDate());
	var day = new Date(nowDay.setDate(nowDay.getDate() + 1));

	var id = calen.setCalendar(nowMonth, day);

	setCalWhite(id);
});

$(document).on('click', '#fnDownMonth', function() {

	var now_D = get_Year_Month();

	var downMonth = new Date(now_D.setMonth(now_D.getMonth() - 1));

	calen.setCalendar(downMonth, null);
});

$(document).on('click', '#fnUpMonth', function() {

	var now_D = get_Year_Month();

	var upMonth = new Date(now_D.setMonth(now_D.getMonth() + 1));

	calen.setCalendar(upMonth, null);
});

function get_Year_Month() {
	const aaa = $("#yearMonth").text();
	const now_D = new String(aaa);
	const year = parseInt(now_D.substring(0, 4));
	const month = parseInt(now_D.substring(6, 8));
	const now_Month = new Date(year, month - 1, 1);

	return now_Month;
}

function setCalWhite(e) {
	const day = calen.setCalclss(e);

	setBigDay(day);
	setMidDay(day);
	setCaldays(day);
}

function setBigDay(day) {
	const tmpArr = day.split("-");

	const date = new Date(tmpArr[0], tmpArr[1] + 1, tmpArr[2]);

	$('#bigDay').empty();
	$('#bigDay').prepend(
		tmpArr[0] + "년 " + tmpArr[1] + "월 " + tmpArr[2] + "일 " + calen.getDayOfWeek(date.getDay())
	);
}

function setMidDay(day) {
	const tmpArr = day.split("-");
	const daySt = new Date(tmpArr[0], (tmpArr[1] - 1), tmpArr[2]);
	let ch_day = new Date(daySt);

	for (var i = 0; i < 7; i++) {
		var id = "#dash-day-" + String(i);

		if (i === 0) {
			ch_day = new Date(ch_day.setDate(ch_day.getDate() + 0));
		} else {
			ch_day = new Date(ch_day.setDate(ch_day.getDate() + 1));
		}

		$(id).empty();
		$(id).prepend(ch_day.getDate());
	}

	let a = daySt.getDay();
	const tmp = [];
	for (var i = 0; i < 7; i++) {

		if (a < 7) {
			tmp.push(a);
		} else {
			a = 0;
			tmp.push(a);
		}
		a = a + 1;
	}

	for (var i = 0; i < 7; i++) {
		const id = "#dash-week-" + String(i);

		if (tmp[i] === 0) {
			$(id).prop('class', 'dash-item-title card-title cal-sun');
		} else if (tmp[i] === 6) {
			$(id).prop('class', 'dash-item-title card-title cal-sat');
		} else {
			$(id).prop('class', 'dash-item-title card-title');
		}

		$(id).empty();
		$(id).prepend(calen.getDayOfWeek(tmp[i]));
	}
}

function setCaldays(day) {

	const url = "/calendar/event";
	const headers = {
		"Content-Type": "application/json",
		"X-HTTP-Method-Override": "POST"
	};

	const tmp_Arr = day.split("-");

	const tmp_Day = new Date(tmp_Arr[0], parseInt(tmp_Arr[1] - 1), tmp_Arr[2]);

	const tmp_Day2 = new Date(tmp_Day.setDate(tmp_Day.getDate() + 7));

	const day7 = tmp_Day2.getFullYear() + "-" + (
		parseInt(tmp_Day2.getMonth()) + 1
	) + "-" + tmp_Day2.getDate();

	const params = {
		"stD": day,
		"endD": day7
	};

	let cal1 = "";
	let cal2 = "";

	$.ajax({
		url: url,
		type: "POST",
		headers: headers,
		dataType: "json",
		data: JSON.stringify(params),

		success: function(r) {
			if (r.length > 0) {
				cal1 = "음력 " + r[0].lunarCal;

				if (r[0].event != null || r[0].event == "") {
					cal2 += '<div>' + r[0].event + '</div>';
				}
				if (r[0].holiday != null || r[0].holiday == "") {
					cal2 += '<div class = "cal-sun">' + r[0].holiday + '</div>';
				}
				if (r[0].anniversary != null || r[0].anniversary == "") {
					cal2 += '<div>' + r[0].anniversary + '</div>';
				}
				if (r[0].season != null || r[0].season == "") {
					cal2 += '<div>' + r[0].season + '</div>';
				}
				if (r[0].etc != null || r[0].etc == "") {
					cal2 += '<div>' + r[0].etc + '</div>';
				}

				for (var i = 0; i < 7; i++) {
					const id = "#dash-hol-" + String(i);
					const id2 = "#dash-week-" + String(i);

					$(id).empty();

					if (r[i].holiday == null || r[i].holiday == "") {
						$(id).prepend("-");
					} else {
						$(id).prepend(r[i].holiday);
						$(id2).prop('class', 'dash-item-title card-title cal-sun');
					}
				}
			}
			$("#cal1").html(cal1);
			$("#cal2").html(cal2);
		}
	});
}