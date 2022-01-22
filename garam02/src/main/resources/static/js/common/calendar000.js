function setCalendar(now_D, day) {
    var rtn = "";

    $("#yearMonth").empty();
    $("#yearMonth").prepend('<strong>' + now_D.getFullYear() + '년 ' + (
        now_D.getMonth() + 1
    ) + "월</strong>");

    var check = now_D.getMonth();
    var stD = getCalStD(now_D);
    var dayST = stD.getFullYear() + "-" + (
        stD.getMonth() + 1
    ) + "-" + stD.getDate();
    var dayED = "";

    var htmls = '<div class="dash-cal-con-item"><span>월</span></div><div class="dash-cal-con-it' +
            'em"><span>화</span></div><div class="dash-cal-con-item"><span>수</span></div><di' +
            'v class="dash-cal-con-item"><span>목</span></div><div class="dash-cal-con-item"' +
            '><span>금</span></div><div class="dash-cal-con-item cal-sat"><span class="#0C6F' +
            'CD">토</span></div><div class="dash-cal-con-item cal-sun"><span class="#CF2F11"' +
            '>일</span></div>';

    for (var i = 0; i < 42; i++) {
        var a = 0;
        if (i > 0) {
            a = 1;
        }

        stD = new Date(stD.setDate(stD.getDate() + a));
        var days = stD.getFullYear() + "-" + (
            stD.getMonth() + 1
        ) + "-" + stD.getDate();

        htmls += '<div class="dash-cal-con-item-c" id="dash-cal-con-item' + (
            i + 1
        ) + '" onclick="setCalWhite(this.id)"';
        if (check == stD.getMonth()) {
            if (stD.getDay() == 6) {
                htmls += ' style="color: #4B89DC;"';
            } else if (stD.getDay() == 0) {
                htmls += 'style="color: #CF2F11;"';
            }
        } else {
            if (stD.getDay() == 6) {
                htmls += ' style="color: #6fa0e3;"';
            } else if (stD.getDay() == 0) {
                htmls += ' style="color: #f0674f;"';
            } else {
                htmls += ' style="color: #8390A2;"';
            }
        }
        htmls += '><span>' + stD.getDate() + '</span><input type="hidden" id = "calDay' + (
            i + 1
        ) + '" value="' + days + '" ></div>\n';

        if (day != null) {

            if (day.toLocaleDateString() == stD.toLocaleDateString()) {
                rtn = "dash-cal-con-item" + (
                    i + 1
                );
            }
        }

        if (i == 41) {
            dayED = days;
        }
    }
    $("#dash-cal-contents").html(htmls);
    setCalendarHol(dayST, dayED);
    return rtn;
}

function setCalendarHol(stD, endD) {
    var url = "/dashMakeCal/getCalMake";
    var headers = {
        "Content-Type": "application/json",
        "X-HTTP-Method-Override": "POST"
    };

    var paramData = JSON.stringify({"num1Str": stD, "num2Str": endD});

    $.ajax({
        url: url,
        headers: headers,
        type: 'POST',
        data: paramData,
        dataType: 'json',

        success: function (r) {
            var tmpArr = new Array();
            for (var i = 0; i < r.length; i++) {
                if (r[i].holiday != null && r[i].holiday != "") {
                    tmpArr.push(r[i].solar_Cal);
                }
            }

            for (var i = 0; i < r.length; i++) {
                var calID = "#dash-cal-con-item" + (
                    i + 1
                );
                var aaa = $(calID).find('input');
                var dayID = "#" + aaa.attr('id');
                var getDay = $(dayID).val();
                var tmp = getDay.split("-");
                var ttmp = tmp[0] + tmp[1] + tmp[2];
                for (var k = 0; k < tmpArr.length; k++) {
                    var tmp1 = tmpArr[k].split("-");
                    var ttmp1 = tmp1[0] + tmp1[1] + tmp1[2];
                    var ttmpM = "";

                    if (tmp1[1] < 10) {
                        ttmpM = tmp1[1].substring(1);
                    } else {
                        ttmpM = tmp1[1];
                    }

                    if (tmp1[2] < 10) {
                        ttmp1 = tmp1[0] + ttmpM + tmp1[2].substring(1);
                    } else {
                        ttmp1 = tmp1[0] + ttmpM + tmp1[2];
                    }

                    if (ttmp == ttmp1) {
                        $(calID).css('color', '#CF2F11');
                    }
                }
            }
        }
    })
}

function setCalWhite(e) {
    var calID = "#" + e;

    var dashCal = $('.dash-cal-con-item-t');
    for (var i = 0; i < dashCal.length; i++) {
        $(dashCal[i]).prop('class', 'dash-cal-con-item-c');
    }

    $(calID).prop('class', 'dash-cal-con-item-t')
    var aaa = $(calID).find('input');
    var dayID = "#" + aaa.attr('id');
    var getDay = $(dayID).val();

    setBigDay(getDay);
    setMidDay(getDay);
    setCaldays(getDay);
}

function setBigDay(day) {
    var tmpArr = day.split("-");

    var date = new Date(tmpArr[0], tmpArr[1] + 1, tmpArr[2]);

    $('#bigDay').empty();
    $('#bigDay').prepend(
        tmpArr[0] + "년 " + tmpArr[1] + "월 " + tmpArr[2] + "일 " + getDayOfWeek(date.getDay())
    );
}

function setMidDay(day) {
    var tmpArr = day.split("-");
    var daySt = new Date(tmpArr[0], (tmpArr[1] - 1), tmpArr[2]);
    var day = new Date(daySt);

    for (var i = 0; i < 7; i++) {
        var id = "#dash-day-" + String(i);

        if (i === 0) {
            var day = new Date(day.setDate(day.getDate() + 0));
        } else {
            var day = new Date(day.setDate(day.getDate() + 1));
        }

        $(id).empty();
        $(id).prepend(day.getDate());
    }

    var a = daySt.getDay();
    var tmp = [];
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
        var id = "#dash-week-" + String(i);

        if (tmp[i] === 0) {
            $(id).prop('class', 'dash-4-item-1 card-title cal-sun');
        } else if (tmp[i] === 6) {
            $(id).prop('class', 'dash-4-item-1 card-title cal-sat');
        } else {
            $(id).prop('class', 'dash-4-item-1 card-title');
        }

        $(id).empty();
        $(id).prepend(getDayOfWeek(tmp[i]));
    }
}

function setCaldays(day) {
    var url = "/dashCal/getCalList"
    var headers = {
        "Content-Type": "application/json",
        "X-HTTP-Method-Override": "POST"
    };

    var tmp_Arr = day.split("-");

    var tmp_Day = new Date(tmp_Arr[0], parseInt(tmp_Arr[1] - 1), tmp_Arr[2]);

    var tmp_Day2 = new Date(tmp_Day.setDate(tmp_Day.getDate() + 7));

    var day7 = tmp_Day2.getFullYear() + "-" + (
        parseInt(tmp_Day2.getMonth()) + 1
    ) + "-" + tmp_Day2.getDate();

    var paramData = JSON.stringify({"num1Str": day, "num2Str": day7});

    var cal1 = "";
    var cal2 = "";

    $.ajax({
        url: url,
        headers: headers,
        type: 'POST',
        data: paramData,
        dataType: 'json',

        success: function (r) {
            if (r.length > 0) {
                cal1 = "음력 " + r[0].lunar_Cal;

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
                    var id = "#dash-hol-" + String(i);
                    var id2 = "#dash-week-" + String(i);

                    $(id).empty();

                    if (r[i].holiday == null || r[i].holiday == "") {
                        $(id).prepend("-");
                    } else {
                        $(id).prepend(r[i].holiday);
                        $(id2).prop('class', 'dash-4-item-1 card-title cal-sun');
                    }
                }
            }

            $("#cal1").html(cal1);
            $("#cal2").html(cal2);
        }
    })
}

function getCalStD(month) {
    var now_D = month;
    var now_W;
    if (now_D.getDay() === 0) {
        now_W = 7;
    } else {
        now_W = now_D.getDay();
    }
    var day_M = 42 - (43 - now_W);
    var stD = new Date(now_D.setDate(now_D.getDate() - day_M));

    return stD;
}

function fn_get_Year_Month() {
    var aaa = $("#yearMonth").text();
    var now_D = new String(aaa);
    var year = parseInt(now_D.substring(0, 4));
    var month = parseInt(now_D.substring(6, 8));
    var now_Month = new Date(year, month - 1, 1);

    return now_Month;
}

function getDayOfWeek(num) {
    var rtn = "";

    switch (num) {
        case 1:
            rtn = "월요일";
            return rtn;
        case 2:
            rtn = "화요일";
            return rtn;
        case 3:
            rtn = "수요일";
            return rtn;
        case 4:
            rtn = "목요일";
            return rtn;
        case 5:
            rtn = "금요일";
            return rtn;
        case 6:
            rtn = "토요일";
            return rtn;
        default:
            rtn = "일요일";
            return rtn;
    }
}

function getRsvt() {}