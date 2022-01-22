function getCalStD(month) {
    let now_D = month;
    let now_W;
    if (now_D.getDay() === 0) {
        now_W = 7;
    } else {
        now_W = now_D.getDay();
    }
    const day_M = 42 - (43 - now_W);
    const stD = new Date(now_D.setDate(now_D.getDate() - day_M));

    return stD;
}

function get_Year_Month() {
    const aaa = $("#yearMonth").text();
    const now_D = new String(aaa);
    const year = parseInt(now_D.substring(0, 4));
    const month = parseInt(now_D.substring(6, 8));
    const now_Month = new Date(year, month - 1, 1);

    return now_Month;
}

function setCalendar(now_D, day) {
    let rtn = "";

    $("#yearMonth").empty();
    $("#yearMonth").prepend('<strong>' + now_D.getFullYear() + '년 ' + (
        now_D.getMonth() + 1
    ) + "월</strong>");

    const check = now_D.getMonth();
    let stD = getCalStD(now_D);
    const dayST = stD.getFullYear() + "-" + (
        stD.getMonth() + 1
    ) + "-" + stD.getDate();
    let dayED = "";

    let htmls = `<div class="dash-cal-con-item">
                    <span>월</span>
                 </div>
                 <div class="dash-cal-con-item">
                    <span>화</span>
                 </div>
                 <div class="dash-cal-con-item">
                    <span>수</span>
                  </div>
                 <div class="dash-cal-con-item">
                    <span>목</span>
                  </div>
                  <div class="dash-cal-con-item">
                    <span>금</span>
                 </div>
                 <div class="dash-cal-con-item cal-sat">
                    <span class="#0C6FCD">토</span>
                 </div>
                 <div class="dash-cal-con-item cal-sun">
                    <span class="#CF2F11">일</span>
                 </div>`;

    for (var i = 0; i < 42; i++) {
        let a = 0;
        if (i > 0) {
            a = 1;
        }

        stD = new Date(stD.setDate(stD.getDate() + a));
        const days = stD.getFullYear() + "-" + (
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

        htmls += '><div class=""><span>' + stD.getDate() + '</span><input type="hidden" id = "ca' +
                'lDay' + (
            i + 1
        ) + '" value="' + days + '" ></div>';
        htmls += '<div id="cal-dot' + (
            i + 1
        ) + '">';
        htmls += '&nbsp;';
        htmls += '</div>';
        htmls += '</div>';

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

    const url = "/calendar/event";
    const headers = {
        "Content-Type": "application/json",
        "X-HTTP-Method-Override": "POST"
    };
    const params = {
        "stD": stD,
        "endD": endD
    };

    $.ajax({
        url: url,
        type: "POST",
        headers: headers,
        dataType: "json",
        data: JSON.stringify(params),
        success: function (r) {
            let tmpArr = new Array();
            let tmpArr2 = new Array();
            for (let i = 0; i < r.length; i++) {
                if (r[i].holiday != null && r[i].holiday != "") {
                    tmpArr.push(new Date(r[i].solarCal));
                }

                if (r[i].event != null && r[i].event != "") {
                    tmpArr2.push(new Date(r[i].solarCal));
                }
            }

            for (let i = 0; i < r.length; i++) {
                const calID = "#dash-cal-con-item" + (
                    i + 1
                );

                const dotID = "#cal-dot" + (
                    i + 1
                );
                const aaa = $(calID).find('input');
                const dayID = "#" + aaa.attr('id');
                const getDay = new Date($(dayID).val());

                for (var k = 0; k < tmpArr.length; k++) {
                    if (getDay.valueOf() == tmpArr[k].valueOf()) {
                        $(calID).css('color', '#CF2F11');
                    }
                }

                for (let index = 0; index < tmpArr2.length; index++) {
                    if (getDay.valueOf() == tmpArr2[index].valueOf()) {
                        $(dotID).html("&#149;");
                    }
                }
            }
        }
    });
}