let searchForm = document.querySelector('.deail-form');

document
    .querySelector('#detail-user')
    .onclick = () => {
        searchForm
            .classList
            .toggle('active');
    }
    const calen = new cal();

$(document).ready(function () {

    $('#info-limit').hide();
    const now_D = new Date();

    const nowMonth = new Date(now_D.getFullYear(), now_D.getMonth(), 1);
    const nowDay = new Date(now_D.getFullYear(), now_D.getMonth(), now_D.getDate());

    const id = makeCal(nowMonth, nowDay);
    setCalWhite(id);
});

$(document).on('click', '#btnYesD', function () {

    var now_D = new Date();

    var nowMonth = new Date(now_D.getFullYear(), now_D.getMonth(), 1);
    var nowDay = new Date(now_D.getFullYear(), now_D.getMonth(), now_D.getDate());
    var day = new Date(nowDay.setDate(nowDay.getDate() - 1));

    const id = makeCal(nowMonth, day);
    setCalWhite(id);
});

$(document).on('click', '#btnToD', function () {

    var now_D = new Date();

    var nowMonth = new Date(now_D.getFullYear(), now_D.getMonth(), 1);
    var nowDay = new Date(now_D.getFullYear(), now_D.getMonth(), now_D.getDate());

    const id = makeCal(nowMonth, nowDay);
    setCalWhite(id);
});

$(document).on('click', '#btnTomD', function () {

    var now_D = new Date();

    var nowMonth = new Date(now_D.getFullYear(), now_D.getMonth(), 1);
    var nowDay = new Date(now_D.getFullYear(), now_D.getMonth(), now_D.getDate());
    var day = new Date(nowDay.setDate(nowDay.getDate() + 1));

    const id = makeCal(nowMonth, day);
    setCalWhite(id);
});

$(document).on('click', '#fnDownMonth', function () {

    var now_D = get_Year_Month();
    var downMonth = new Date(now_D.setMonth(now_D.getMonth() - 1));
    $("#yearMonth").val(toStringByFormatting(downMonth).substring(0, 7));
    makeCal(downMonth, null);
});

$(document).on('click', '#fnUpMonth', function () {
    var now_D = get_Year_Month();
    var upMonth = new Date(now_D.setMonth(now_D.getMonth() + 1));
    $("#yearMonth").val(toStringByFormatting(upMonth).substring(0, 7));
    makeCal(upMonth, null);
});

$(document).on('click', '#fnDownDay', function () {

    let ddd = new Date($("#yearMonthDay").val());
    ddd = ddd.setDate(ddd.getDate() - 1);

    const dday = toStringByFormatting(new Date(ddd));

    $("#yearMonthDay").val(dday);

    makeCal(new Date(ddd), null);

    for (let i = 0; i < 42; i++) {
        let iiiddd = '#dash-cal-con-item' + (
            i + 1
        );

        if (toStringByFormatting(new Date(ddd)) == toStringByFormatting(new Date($(iiiddd).children().children().next().val()))) {
            setCalWhite($(iiiddd).attr('id'));
        }
    }
});

$(document).on('click', '#fnUpDay', function () {

    let ddd = new Date($("#yearMonthDay").val());
    ddd = ddd.setDate(ddd.getDate() + 1);

    const dday = toStringByFormatting(new Date(ddd));

    $("#yearMonthDay").val(dday);

    makeCal(new Date(ddd), null);

    for (let i = 0; i < 42; i++) {
        let iiiddd = '#dash-cal-con-item' + (
            i + 1
        );

        if (toStringByFormatting(new Date(ddd)) == toStringByFormatting(new Date($(iiiddd).children().children().next().val()))) {
            setCalWhite($(iiiddd).attr('id'));
        }
    }
});

function get_Year_Month() {
    const aaa = $("#yearMonth").val();
    const bbb = aaa.split('-');
    const year = parseInt(bbb[0]);
    const month = parseInt(bbb[1]);
    const now_Month = new Date(year, month - 1, 1);

    return now_Month;
}

function get_Year_Month1() {
    const aaa = $("#yearMonthDay").val();
    console.log("ccsscc   " + aaa);
    const bbb = aaa.split('-');
    const year = parseInt(bbb[0]);
    const month = parseInt(bbb[1]);
    const now_Month = new Date(year, month - 1, 1);

    return now_Month;
}

function setCalWhite(e) {
    const day = calen_Rsvt.setCalclss(e);

    const aaa = toStringByFormatting(new Date(day)).split('-')[1];;
    const bbb = $("#yearMonth")
        .val()
        .split('-')[1];

    $("#yearMonth").val(day.substring(0, 7));

    $("#yearMonthDay").val(day);
    setBigDay(day);
    getAlloList(day);
    setStEdDay(day);

    for (let i = 0; i < 7; i++) {
        let ddd = new Date(day);
        ddd = ddd.setDate(ddd.getDate() + i);
        const dweek = toStringByFormatting(new Date(ddd));
        getMidCnt(dweek, i);
    }
}

function setCalWhite1(day) {
    $("#yearMonth").val(day.substring(0, 7));
    $("#yearMonthDay").val(day);
    setBigDay(day);
    getAlloList(day);
    setStEdDay(day);

    for (let i = 0; i < 7; i++) {
        let ddd = new Date(day);
        ddd = ddd.setDate(ddd.getDate() + i);
        const dweek = toStringByFormatting(new Date(ddd));
        getMidCnt(dweek, i);
    }
}

function setBigDay(day) {
    const tmpArr = day.split("-");

    const date = new Date(tmpArr[0], parseInt(tmpArr[1]) - 1, tmpArr[2]);

    $('#bigDay').empty();
    $('#bigDay').prepend(
        tmpArr[0] + "년 " + tmpArr[1] + "월 " + tmpArr[2] + "일 " + calen.getDayOfWeek(date.getDay())
    );
}

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

$("#yearMonth").change(function () {
    makeCal(get_Year_Month(), null);
});

$("#yearMonthDay").change(function () {
    makeCal(get_Year_Month1(), null);

    for (let i = 0; i < 42; i++) {
        let iiiddd = '#dash-cal-con-item' + (
            i + 1
        );

        if (toStringByFormatting(new Date($("#yearMonthDay").val())) == toStringByFormatting(new Date($(iiiddd).children().children().next().val()))) {
            setCalWhite($(iiiddd).attr('id'));
        }
    }
});

function makeCal(nowD, day) {
    let rtn = '';

    setCalendar().then(setCalendarHol);

    function setCalendar() {
        return new Promise(function (resolve, reject) {

            const check = nowD.getMonth();
            let stD = getCalStD(nowD);
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

                let date111 = '';
                if ((stD.getMonth() + 1) < 10) {
                    date111 = '0' + (
                        stD.getMonth() + 1
                    );
                } else {
                    date111 = (stD.getMonth() + 1);
                }

                let date222 = '';
                if (stD.getDate() < 10) {
                    date222 = '0' + stD.getDate();
                } else {
                    date222 = stD.getDate();
                }

                const days = stD.getFullYear() + "-" + date111 + "-" + date222;

                htmls += '<div class="dash-cal-con-item-c" id="dash-cal-con-item' + (
                    i + 1
                ) + '" onclick="setCalWhite(this.id)"';

                if (check == stD.getMonth()) {
                    if (stD.getDay() == 6) {
                        htmls += ' style="color: #4B89DC;"';
                    } else if (stD.getDay() == 0) {
                        htmls += ' style="color: #CF2F11;"';
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

            const daysted = new Array;
            daysted.push(dayST);
            daysted.push(dayED);

            resolve(daysted);
        })
    }
    function setCalendarHol(result) {
        return new Promise(function (resolve, reject) {
            const url = "/calendar/event";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };
            const params = {
                "stD": result[0],
                "endD": result[1]
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

                        const dateutil = new dateUtil();
                        for (var k = 0; k < tmpArr.length; k++) {
                            if (dateutil.isSameDay(getDay, tmpArr[k])) {
                                $(calID).css('color', '#CF2F11');
                            }
                        }

                        for (let index = 0; index < tmpArr2.length; index++) {
                            if (dateutil.isSameDay(getDay, tmpArr2[index])) {
                                $(dotID).html("&#149;");
                            }
                        }

                        if (dateutil.isSameDay(getDay, new Date())) {
                            $(calID)
                                .children()
                                .children()
                                .css('background', 'rgba(255, 239, 55, 0.5)')
                                .css('border-radius', '30%');
                        } else {
                            $(calID)
                                .children()
                                .children()
                                .css('background', 'none')
                                .css('border-radius', '30%');

                        }
                    }
                }
            });
        })
    }
    return rtn;
}

$(
    '#dash-week-10, #dash-week-20, #dash-week-30, #dash-week-40, #dash-week-50, #da' +
    'sh-week-60, #dash-week-70'
).click(function () {
    const iidd = $(this).children()[4];
    const val = $(iidd).val();
    console.log("몇번 ??  " + val);

    let cnt = 0;
    for (let i = 0; i < 42; i++) {
        const iddd = '#dash-cal-con-item' + (
            i + 1
        );

        const ddoomm = $(iddd)
            .children()
            .children()[1];
        const day = $(ddoomm).val();

        if (val == day) {
            cnt = 0;
            setCalWhite($(iddd).attr('id'));
            break;
        } else {
            cnt++;
        }
    }
    if (cnt > 0) {
        $('#fnUpMonth').click();

        for (let i = 0; i < 42; i++) {
            const iddd1 = '#dash-cal-con-item' + (
                i + 1
            );

            const ddoomm1 = $(iddd1)
                .children()
                .children()[1];
            const day1 = $(ddoomm1).val();

            if (val == day1) {
                setCalWhite($(iddd1).attr('id'));
            }
        }
    }
});