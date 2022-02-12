let searchForm = document.querySelector('.deail-form');

var swiper = new Swiper('.swiper-container', {
    speed: 500,
    slidesPerView: 2,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    }
});

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
    $("#yearMonth").val(day.substring(0, 7));
    $("#yearMonthDay").val(day);
    setBigDay(day);
    setCaldays(day);
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
    setCaldays(day);
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

    const date = new Date(tmpArr[0], tmpArr[1] + 1, tmpArr[2]);

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

function setCaldays(st) {
    return new Promise(function (resolve, reject) {
        const url = "/calendar/event";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const params = {
            "stD": st
        };

        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            dataType: "json",
            data: JSON.stringify(params),

            success: function (r) {
                let mid = '';
                let cal = '';
                const idd = '#dash-week-';
                if (r.length > 0) {
                    if (r[0].holiday) {
                        mid += '<p>' + r[0].holiday + '</p>';
                    }
                    if (r[0].anniversary) {
                        mid += '<p>' + r[0].anniversary + '</p>';
                    }
                    if (r[0].season) {
                        mid += '<p>' + r[0].season + '</p>';
                    }
                    if (r[0].etc) {
                        mid += '<p>' + r[0].etc + '</p>';
                    }

                    if (!mid) {
                        mid += `<p>이벤트 없음</p>`;
                    }

                    if (!!r[0].lunarCal) {
                        cal = '음력 ' + r[0].lunarCal;
                    } else {
                        cal = '음력 정보없음';
                    }

                    for (let i = 0; i < r.length; i++) {

                        $(idd + (i + 1) + '1').html(
                            '<h5>' + calen.getDayOfWeek(new Date(r[i].solarCal).getDay()) + '</h5>'
                        );

                        $(idd + (i + 1) + '2').html(
                            '<h2>' + new Date(r[i].solarCal).getDate() + '</h2>'
                        );

                        switch (new Date(r[i].solarCal).getDay()) {
                            case 0:
                                $(idd + (i + 1) + '1').css('color', '#CF2F11');
                                $(idd + (i + 1) + '1').css('border', '1px solid rgba(207, 47, 17, 0.5)');
                                break;
                            case 6:
                                $(idd + (i + 1) + '1').css('color', '#4B89DC');
                                $(idd + (i + 1) + '1').css('border', '1px solid rgba(75, 137, 220, 0.5)');
                                break;
                            default:
                                $(idd + (i + 1) + '1').css('color', 'black');
                                $(idd + (i + 1) + '1').css('border', 'none');
                                break;
                        }

                        if (r[i].holiday) {
                            $(idd + (i + 1) + '3').html('<h5>' + r[i].holiday + '</h5>');
                        } else {
                            $(idd + (i + 1) + '3').html('<h5>&ndash;</h5>');
                        }

                        if (r[i].holiday) {
                            $(idd + (i + 1) + '1').css('color', '#CF2F11');
                            $(idd + (i + 1) + '1').css('border', '1px solid rgba(207, 47, 17, 0.5)');
                        }
                    }

                } else {
                    mid += `<p>이벤트 없음</p>`;
                    cal = '음력 정보없음';

                    for (let i = 0; i < 7; i++) {
                        let ddd = new Date(st);

                        ddd1 = ddd.setDate(ddd.getDate() + i);

                        $(idd + (i + 1) + '1').html(
                            '<h5>' + calen.getDayOfWeek(new Date(ddd1).getDay()) + '</h5>'
                        );

                        $(idd + (i + 1) + '2').html('<h2>' + new Date(ddd1).getDate() + '</h2>');

                        $(idd + (i + 1) + '3').html('<h5>&ndash;</h5>');

                        switch (new Date(ddd1).getDay()) {
                            case 0:
                                $(idd + (i + 1) + '1').css('color', '#CF2F11');
                                $(idd + (i + 1) + '1').css('border', '1px solid rgba(207, 47, 17, 0.5)');
                                break;
                            case 6:
                                $(idd + (i + 1) + '1').css('color', '#4B89DC');
                                $(idd + (i + 1) + '1').css('border', '1px solid rgba(75, 137, 220, 0.5)');
                                break;
                            default:
                                $(idd + (i + 1) + '1').css('color', 'black');
                                $(idd + (i + 1) + '1').css('border', 'none');
                                break;
                        }
                    }
                }
                $('#midday').html(mid);
                $('#cal1').html(cal);
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        });
    });
}
