$(document).ready(function () {});

function makeMain2BigCal() {

    let arrDays = new Array();

    let arrHtmls = new Array();

    for (let i = 0; i < 42; i++) {
        arrHtmls[i] = ``;
    }

    LoadingWithMask()
        .then(setMainCalendar2)
        .then(setBigCalendarHol2)
        .then(getSalDay)
        .then(getEvent)
        .then(getCarDayEnd2)
        .then(getInspecDayEnd2)
        .then(getInsuDayEnd2)
        .then(getInsuDay2)
        .then(getLoanDay1)
        .then(setMonthMiddle)
        .then(closeLoadingWithMask);

    clTdColor2();

    function setMainCalendar2(result) {
        return new Promise(function (resolve, reject) {
            const aaa = new Date($('.yearMonth').val());

            const check = aaa.getMonth();
            let stD = getCalStD(aaa);

            const daysted = new Array;

            for (var i = 0; i < 42; i++) {
                let a = 0;
                if (i > 0) {
                    a = 1;
                }

                stD = new Date(stD.setDate(stD.getDate() + a));

                arrDays.push(toStringByFormatting(stD));

                let colorDay = '';
                let colorNoday = '1';

                if (check == stD.getMonth()) {
                    if (stD.getDay() == 6) {
                        colorDay = '#4B89DC';
                    } else if (stD.getDay() == 0) {
                        colorDay = '#CF2F11';
                    }
                    colorNoday = '1';
                } else {
                    if (stD.getDay() == 6) {
                        colorDay = '#6fa0e3';
                    } else if (stD.getDay() == 0) {
                        colorDay = '#f0674f"';
                    } else {
                        colorDay = '#8390A2';
                    }
                    colorNoday = '1';
                }

                const trNum = Math.floor(i / 7);
                let tdNum = i % Math.floor(parseInt(trNum) * 7);

                if (i < 7) {
                    tdNum = i;
                }

                const aaa = $('#tbMainCal2').children()[trNum];
                const bbb = $(aaa).children()[tdNum];

                $(bbb).css('opacity', colorNoday);

                const bbb1 = $(bbb).children()[0];
                const bbb2 = $(bbb1).children()[1];
                const bbb3 = $(bbb2).children()[0];
                const bbb31 = $(bbb2).children()[1];

                const bbb4 = $(bbb1).children()[0];

                $(bbb4).val(toStringByFormatting(stD));

                if (toStringByFormatting(new Date()) == $(bbb4).val()) {
                    $(bbb).addClass('tdMainCal');
                } else {
                    $(bbb).removeClass('tdMainCal');
                }

                $(bbb3).text(stD.getDate() + '일');
                $(bbb3).css('color', colorDay);

                $(bbb31).text('');

                if (i == 0) {
                    daysted.push(toStringByFormatting(stD));
                }
                if (i == 41) {
                    daysted.push(toStringByFormatting(stD));
                }
            }
            resolve(daysted);
        });
    }

    function setBigCalendarHol2(result) {
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
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),
                success: function (r) {
                    for (let i = 0; i < r.length; i++) {
                        if (r[i].holiday) {
                            for (let k = 0; k < 42; k++) {
                                const trNum = Math.floor(k / 7);
                                let tdNum = k % Math.floor(parseInt(trNum) * 7);

                                if (k < 7) {
                                    tdNum = k;
                                }

                                const aaa = $('#tbMainCal2').children()[trNum];
                                const bbb = $(aaa).children()[tdNum];

                                const bbb1 = $(bbb).children()[0];

                                const bbb4 = $(bbb1).children()[0];
                                const bbb2 = $(bbb1).children()[1];
                                const bbb3 = $(bbb2).children()[1];
                                const bbb5 = $(bbb2).children()[0];

                                if ($(bbb4).val() == r[i].solarcal) {
                                    $(bbb5).css('color', '#CF2F11');
                                    $(bbb3).text(r[i].holiday);
                                }
                            }
                        }
                    }
                    resolve(result);
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            });
        })
    }
    function getSalDay() {
        return new Promise(function (resolve, reject) {
            arrHtmls[checkHolDay(opt[0].salday)] = `
        <div class="mainCal2td-middle-item middle-sal">
            <span class="spNum1">급여지급일</span>
            <span class="h2ch h2chSal"><i class="fa-solid fa-calculator"></i></span>
        </div>`;
            resolve();
        })
    }

    function getEvent() {
        return new Promise(function (resolve, reject) {

            const url = "/home4/weekselevent";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "caleventtitle": $('#calDay1').val(),
                "caleventevent": $('#calDay42').val()
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {
                    for (let i = 0; i < r.length; i++) {

                        let tititle = '';

                        if (r[i].caleventtitle.length > 7) {
                            tititle = r[i]
                                .caleventtitle
                                .substring(0, 8) + '...';
                        } else {
                            tititle = r[i].caleventtitle;
                        }

                        if (r[i].caleventgrade > 0) {
                            arrHtmls[checkHolDay1(r[i].caleventday)] += `
                                <div class="mainCal2td-middle-item middle-event">
                                    <input type="hidden" value="">
                                    <input type="hidden" value="` +
                                    r[i].caleventseq +
                                    `">
                                    <span class="spNum1">
                                        ` +
                                    tititle +
                                    `</span>
                                    <span class="h2ch h2chEvent"><i class="fa-solid fa-calendar-check"></i></i></span>
                                    <span class="h2ch h2chEventgrade"><i class="fa-solid fa-exclamation"></i></span>
                                </div>`;
                        } else {
                            arrHtmls[checkHolDay1(r[i].caleventday)] += `
                                <div class="mainCal2td-middle-item middle-event">
                                    <input type="hidden" value="">
                                    <input type="hidden" value="` +
                                    r[i].caleventseq +
                                    `">
                                    <span class="spNum1">
                                        ` +
                                    tititle +
                                    `</span><span class="h2ch h2chEvent"><i class="fa-solid fa-calendar-check"></i></span>
                                </div>`;
                        }
                    }
                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

    function getLoanDay1() {
        return new Promise(function (resolve, reject) {

            const url = "/home4/weekLoan1";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const monththth1 = $('#calDay1')
                .val()
                .split('-')[0] + '-' + $('#calDay1')
                .val()
                .split('-')[1];
            const monththth2 = $('#calDay42')
                .val()
                .split('-')[0] + '-' + $('#calDay42')
                .val()
                .split('-')[1];
            const monththth3 = $('#calDay21')
                .val()
                .split('-')[0] + '-' + $('#calDay21')
                .val()
                .split('-')[1];

            const params = {
                "regist": monththth1,
                "color": monththth3,
                "expire": monththth2
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {
                    for (let i = 0; i < r.length; i++) {

                        if (r[i].regist) {
                            arrHtmls[checkHolDay1(r[i].regist)] += `
                        <div class="mainCal2td-middle-item middle-loan">
                            <input type="hidden" value="` +
                                    monththth1 +
                                    `">
                            <input type="hidden" value="` + r[i].loanno +
                                    `">
                            <span class="spNum1"><span class="h2Ve">` + r[i].vehicle2 +
                                    `</span><span class="h2loan text-decoration-line-through">대출</span></span>
                            <span class="h2ch h2chLoan"></span>
                        </div>`;
                        } else {
                            arrHtmls[checkHolDay2(r[i].loandayloan)] += `
                            <div class="mainCal2td-middle-item middle-loan">
                                <input type="hidden" value="` +
                                    monththth1 +
                                    `">
                                <input type="hidden" value="` + r[i].loanno +
                                    `">
                                <span class="spNum1"><span class="h2Ve">` +
                                    r[i].vehicle2 +
                                    `</span><span class="h2loan">대출</span></span>
                                <span class="h2ch h2chLoan"><i class="fa-solid fa-bookmark"></i></span>
                            </div>`;
                        }

                        if (r[i].color) {
                            arrHtmls[checkHolDay1(r[i].color)] += `
                        <div class="mainCal2td-middle-item middle-loan">
                            <input type="hidden" value="` +
                                    monththth3 +
                                    `">
                            <input type="hidden" value="` + r[i].loanno +
                                    `">
                            <span class="spNum1"><span class="h2Ve">` + r[i].vehicle2 +
                                    `</span><span class="h2loan text-decoration-line-through">대출</span></span>
                            <span class="h2ch h2chLoan"></span>
                        </div>`;
                        } else {
                            arrHtmls[checkHolDay(r[i].loandayloan)] += `
                            <div class="mainCal2td-middle-item middle-loan">
                                <input type="hidden" value="` +
                                    monththth3 +
                                    `">
                                <input type="hidden" value="` + r[i].loanno +
                                    `">
                                <span class="spNum1"><span class="h2Ve">` +
                                    r[i].vehicle2 +
                                    `</span><span class="h2loan">대출</span></span>
                                <span class="h2ch h2chLoan"><i class="fa-solid fa-bookmark"></i></span>
                            </div>`;
                        }

                        if (r[i].expire) {
                            arrHtmls[checkHolDay1(r[i].expire)] += `
                        <div class="mainCal2td-middle-item middle-loan">
                            <input type="hidden" value="` +
                                    monththth2 +
                                    `">
                            <input type="hidden" value="` + r[i].loanno +
                                    `">
                            <span class="spNum1"><span class="h2Ve">` + r[i].vehicle2 +
                                    `</span><span class="h2loan text-decoration-line-through">대출</span></span>
                            <span class="h2ch h2chLoan"></span>
                        </div>`;
                        } else {
                            arrHtmls[checkHolDay3(r[i].loandayloan)] += `
                            <div class="mainCal2td-middle-item middle-loan">
                                <input type="hidden" value="` +
                                    monththth2 +
                                    `">
                                <input type="hidden" value="` + r[i].loanno +
                                    `">
                                <span class="spNum1"><span class="h2Ve">` +
                                    r[i].vehicle2 +
                                    `</span><span class="h2loan">대출</span></span>
                                <span class="h2ch h2chLoan"><i class="fa-solid fa-bookmark"></i></span>
                            </div>`;
                        }

                    }
                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }
    function getInsuDay2() {
        return new Promise(function (resolve, reject) {

            const url = "/home4/weekinsu";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "inday": $('#calDay1').val(),
                "outday": $('#calDay42').val()
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {
                    for (let i = 0; i < r.length; i++) {
                        if (r[i].insusepatrash < 1) {
                            arrHtmls[checkHolDay1(r[i].insusepaday)] += `
                            <div class="mainCal2td-middle-item middle-insu">
                                <input type="hidden" value="` +
                                    r[i].carnumber +
                                    `">
                                <input type="hidden" value="` + r[i].insuno +
                                    `">
                                <span class="spNum1">
                                    <span class="h2Ve">` +
                                    r[i].vehicle2 +
                                    `</span><span class="h2insu text-decoration-line-through">보험료` + r[i].insusepatime +
                                    `회</span></span>
                                <span class="h2ch h2chInsu"></span>
                            </div>`;
                        } else {
                            arrHtmls[checkHolDay1(r[i].insusepaday)] += `
                            <div class="mainCal2td-middle-item middle-insu">
                                <input type="hidden" value="` +
                                    r[i].carnumber +
                                    `">
                                <input type="hidden" value="` + r[i].insuno +
                                    `">
                                <span class="spNum1"><span class="h2Ve">` +
                                    r[i].vehicle2 +
                                    `</span><span class="h2insu">보험료` + r[i].insusepatime +
                                    `회</span></span>
                                <span class="h2ch h2chInsu"><i class="fa-solid fa-car"></i></span>
                            </div>`;
                        }
                    }
                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }
    function getCarDayEnd2() {
        return new Promise(function (resolve, reject) {

            const url = "/home4/weekcarend";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "inday": $('#calDay1').val(),
                "outday": $('#calDay42').val()
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {
                    for (let i = 0; i < r.length; i++) {
                        arrHtmls[checkHolDay1(r[i].expire)] += `
                            <div class="mainCal2td-middle-item middle-end">
                                <input type="hidden" value="` +
                                r[i].carnumber +
                                `">
                                <input type="hidden" value="` + r[i].carnumber +
                                `">
                                <span class="spNum1">
                                    <span class="h2Ve">` +
                                r[i].vehicle2 +
                                `</span><span class="h2insuEnd">차량만료</span></span>
                                <span class="h2ch h2chEnd"><i class="fa-solid fa-triangle-exclamation"></i></span>
                            </div>`;
                    }
                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }
    function getInspecDayEnd2() {
        return new Promise(function (resolve, reject) {

            const url = "/home4/weekinspecend";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "inday": $('#calDay1').val(),
                "outday": $('#calDay42').val()
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {
                    for (let i = 0; i < r.length; i++) {
                        arrHtmls[checkHolDay1(r[i].inspecdateend)] += `
                            <div class="mainCal2td-middle-item middle-end">
                                <input type="hidden" value="` +
                                r[i].carnumber +
                                `">
                                <input type="hidden" value="` + r[i].inspecseq +
                                `">
                                <span class="spNum1">
                                    <span class="h2Ve">` +
                                r[i].vehicle2 +
                                `</span><span class="h2insuEnd">점검만료</span></span>
                                <span class="h2ch h2chEnd"><i class="fa-solid fa-wrench"></i></span>
                            </div>`;
                    }
                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }
    function getInsuDayEnd2() {
        return new Promise(function (resolve, reject) {

            const url = "/home4/weekinsuend";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "inday": $('#calDay1').val(),
                "outday": $('#calDay42').val()
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {
                    for (let i = 0; i < r.length; i++) {
                        arrHtmls[checkHolDay1(r[i].insudateend)] += `
                            <div class="mainCal2td-middle-item middle-end">
                                <input type="hidden" value="` +
                                r[i].carnumber +
                                `">
                                <input type="hidden" value="` + r[i].insuno +
                                `">
                                <span class="spNum1">
                                    <span class="h2Ve">` +
                                r[i].vehicle2 +
                                `</span><span class="h2insuEnd">보험만료</span></span>
                                <span class="h2ch h2chEnd"><i class="fa-solid fa-triangle-exclamation"></i></span>
                            </div>`;
                    }
                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

    function setMonthMiddle() {
        return new Promise(function (resolve, reject) {
            for (let i = 0; i < 42; i++) {
                const iidd = '#cal2Mid' + (
                    i + 1
                );

                $(iidd).html(arrHtmls[i]);
            }
            resolve();
        })
    }
}

function makeBigcal2Aside() {

    LoadingWithMask()
        .then(getInfo)
        .then(getEndCar)
        .then(getEndInsu)
        .then(getEndInspec)
        .then(closeLoadingWithMask);

    function getInfo() {
        return new Promise(function (resolve, reject) {
            const url = "/home4/weekseleventinfo";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {};

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {
                    let htmls = ``;
                    for (let i = 0; i < r.length; i++) {

                        let titlee = ``;
                        if (r[i].caleventtitle.length > 10) {
                            titlee = r[i]
                                .caleventtitle
                                .substring(0, 11) + '...';
                        } else {
                            titlee = r[i].caleventtitle;
                        }

                        let gradee = ``;
                        let sttyle = ``;
                        if (parseInt(r[i].caleventgrade) > 0) {
                            gradee = `<i class="fa-solid fa-exclamation h2chEventgrade"></i>`;
                            sttyle = `style="text-align: left;"`;
                        } else {
                            sttyle = `style="text-align: left; padding-left: 2rem;"`;
                        }

                        htmls += `
                    <tr class="eventAside">
                        <th ` +
                                sttyle +
                                `>
                            <input type="hidden" value="` + r[i].caleventseq +
                                `">
                        ` + gradee + titlee +
                                `
                        </th>
                        <th>` + r[i].caleventemp +
                                `</th>
                    </tr>`;
                    }

                    resolve();

                    $('#home4InfoTb').html(htmls);
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

    function getEndCar() {
        return new Promise(function (resolve, reject) {
            const url = "/home4/weekcarenddday";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "price": 30
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {
                    let htmls = ``;

                    for (let i = 0; i < r.length; i++) {

                        let dDayyy = ``;
                        if (parseInt(r[i].vegasid) < 0) {
                            dDayyy = `<td class="h2chEventgrade">` + r[i].vegasid + `일</td>`;
                        } else {
                            dDayyy = `<td>` + r[i].vegasid + `일</td>`;
                        }

                        htmls += `
                        <tr class="carAside">
                            <td>` +
                                r[i].vehicle2 +
                                `
                                <input type="hidden" value="` + r[i].carnumber +
                                `">
                            </td>
                            <td>` + r[i].vegasyearmonth +
                                `</td>` + dDayyy +
                                `
                        </tr>`;;
                    }

                    $('#home4EndCarTb').html(htmls);

                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

    function getEndInsu() {
        return new Promise(function (resolve, reject) {
            const url = "/home4/weekinsudday";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "price": 30
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {
                    let htmls = ``;

                    for (let i = 0; i < r.length; i++) {

                        let dDayyy = ``;
                        if (parseInt(r[i].vegasid) < 0) {
                            dDayyy = `<td class="h2chEventgrade">` + r[i].vegasid + `일</td>`;
                        } else {
                            dDayyy = `<td>` + r[i].vegasid + `일</td>`;
                        }

                        htmls += `
                        <tr class="carAside">
                            <td>` +
                                r[i].vehicle2 +
                                `
                                <input type="hidden" value="` + r[i].carnumber +
                                `">
                            </td>
                            <td>` + r[i].vegasyearmonth +
                                `</td>
                                ` + dDayyy +
                                `
                        </tr>`;;
                    }

                    $('#home4EndInsuTb').html(htmls);

                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

    function getEndInspec() {
        return new Promise(function (resolve, reject) {
            const url = "/home4/weekinspecenddday";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "price": 30
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {
                    let htmls = ``;

                    for (let i = 0; i < r.length; i++) {
                        let dDayyy = ``;
                        if (parseInt(r[i].vegasid) < 0) {
                            dDayyy = `<td class="h2chEventgrade">` + r[i].vegasid + `일</td>`;
                        } else {
                            dDayyy = `<td>` + r[i].vegasid + `일</td>`;
                        }

                        htmls += `
                        <tr class="carAside">
                            <td>` +
                                r[i].vehicle2 +
                                `
                                <input type="hidden" value="` + r[i].carnumber +
                                `">
                            </td>
                            <td>` + r[i].vegasyearmonth +
                                `</td>
                            ` + dDayyy +
                                `
                        </tr>`;;
                    }

                    $('#home4EndInsepcTb').html(htmls);

                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }
}

function checkHolDay(dateNum) {

    const endDate = getStDayEndDayMain()[1].split('-')[2];
    let makeDay = '';

    if (dateNum > endDate) {
        makeDay = $('.yearMonth').val() + '-' + endDate;
    } else {
        makeDay = $('.yearMonth').val() + '-' + dateNum;
    }

    let paramddaayy = new Date(makeDay);

    const aaa = $('#tbMainCal2').children();

    for (let i = 0; i < aaa.length; i++) {
        const bbb = $(aaa[i]).children();
        for (let k = 0; k < bbb.length; k++) {
            const ccc = $(bbb[k]).children()[0];
            const ddd = $(ccc).children()[0];
            const dayyy = $(ddd).val();

            const eee = $(ccc).children()[1];
            const eee1 = $(eee).children()[0];
            const cssss = $(eee1).attr('style');

            const ggg = $(ccc).children()[2];

            if (toStringByFormatting(paramddaayy) == dayyy) {
                if (cssss == `color: rgb(131, 144, 162);` || !cssss) {
                    return parseInt($(ggg).attr('id').split('cal2Mid')[1]) - 1;
                } else {
                    paramddaayy = new Date(paramddaayy.setDate(paramddaayy.getDate() + 1));
                }
            }
        }
    }
}

function checkHolDay1(dateDay) {

    const aaa = $('#tbMainCal2').children();

    for (let i = 0; i < aaa.length; i++) {
        const bbb = $(aaa[i]).children();
        for (let k = 0; k < bbb.length; k++) {
            const ccc = $(bbb[k]).children()[0];
            const ddd = $(ccc).children()[0];
            const dayyy = $(ddd).val();

            const ggg = $(ccc).children()[2];

            if (dateDay == dayyy) {
                return parseInt($(ggg).attr('id').split('cal2Mid')[1]) - 1;
            }
        }
    }
}

function checkHolDay2(dateNum) {

    let endDate = new Date($('.yearMonth').val() + '-01');
    endDate = new Date(endDate.setDate(endDate.getDate() - 1)).getDate();

    let makeDay = '';

    if (parseInt(dateNum) > parseInt(endDate)) {
        makeDay = $('#calDay1')
            .val()
            .split('-')[0] + '-' + $('#calDay1')
            .val()
            .split('-')[1] + '-' + endDate;
    } else {
        makeDay = $('#calDay1')
            .val()
            .split('-')[0] + '-' + $('#calDay1')
            .val()
            .split('-')[1] + '-' + dateNum;
    }

    let paramddaayy = new Date(makeDay);

    const aaa = $('#tbMainCal2').children();

    for (let i = 0; i < aaa.length; i++) {
        const bbb = $(aaa[i]).children();
        for (let k = 0; k < bbb.length; k++) {
            const ccc = $(bbb[k]).children()[0];
            const ddd = $(ccc).children()[0];
            const dayyy = $(ddd).val();

            const eee = $(ccc).children()[1];
            const eee1 = $(eee).children()[0];
            const cssss = $(eee1).attr('style');

            const ggg = $(ccc).children()[2];

            if (toStringByFormatting(paramddaayy) == dayyy) {
                if (cssss == `color: rgb(131, 144, 162);` || !cssss) {
                    return parseInt($(ggg).attr('id').split('cal2Mid')[1]) - 1;
                } else {
                    paramddaayy = new Date(paramddaayy.setDate(paramddaayy.getDate() + 1));
                }
            }
        }
    }
}
function checkHolDay3(dateNum) {

    const makeDay = $('#calDay42')
        .val()
        .split('-')[0] + '-' + $('#calDay42')
        .val()
        .split('-')[1] + '-' + dateNum;

    let paramddaayy = new Date(makeDay);

    const aaa = $('#tbMainCal2').children();

    for (let i = 0; i < aaa.length; i++) {
        const bbb = $(aaa[i]).children();
        for (let k = 0; k < bbb.length; k++) {
            const ccc = $(bbb[k]).children()[0];
            const ddd = $(ccc).children()[0];
            const dayyy = $(ddd).val();

            const eee = $(ccc).children()[1];
            const eee1 = $(eee).children()[0];
            const cssss = $(eee1).attr('style');

            const ggg = $(ccc).children()[2];

            if (toStringByFormatting(paramddaayy) == dayyy) {
                if (cssss == `color: rgb(131, 144, 162);` || !cssss) {
                    return parseInt($(ggg).attr('id').split('cal2Mid')[1]) - 1;
                } else {
                    paramddaayy = new Date(paramddaayy.setDate(paramddaayy.getDate() + 1));
                }
            }
        }
    }
}

$(document).ready(function () {
    $(".mainCalTable2 tbody tr td .mainCal2td-top .mainCal2td-top-hol").mouseover(
        function () {
            $(this)
                .parent()
                .parent()
                .parent()
                .addClass('tdHovers');
        }
    );
    $(".mainCalTable2 tbody tr td .mainCal2td-top .mainCal2td-top-hol").mouseout(
        function () {
            $(this)
                .parent()
                .parent()
                .parent()
                .removeClass('tdHovers');
        }
    );
});

$(document).ready(function () {
    $(".mainCalTable2 tbody tr td .mainCal2td-top .mainCal2td-top-day").mouseover(
        function () {
            $(this)
                .parent()
                .parent()
                .parent()
                .addClass('tdHovers');
        }
    );
    $(".mainCalTable2 tbody tr td .mainCal2td-top .mainCal2td-top-day").mouseout(
        function () {
            $(this)
                .parent()
                .parent()
                .parent()
                .removeClass('tdHovers');
        }
    );
});

$(document).on('click', '.mainCal2td-top-hol', function () {
    const aaa = $(this)
        .parent()
        .next();

    const getidd = $(aaa).attr('id');
    const getidd1 = getidd.split('cal2Mid');

    const realNum = getidd1[1];

    const iiddddd = 'dash-cal-con-item' + realNum;

    setCalWhite(iiddddd, 1);
});
$(document).on('click', '.mainCal2td-top-day', function () {
    const aaa = $(this)
        .parent()
        .next();

    const getidd = $(aaa).attr('id');
    const getidd1 = getidd.split('cal2Mid');

    const realNum = getidd1[1];

    const iiddddd = 'dash-cal-con-item' + realNum;

    setCalWhite(iiddddd, 1);
});

function clTdColor2() {
    for (let i = 0; i < 42; i++) {
        const trNum = Math.floor(i / 7);
        let tdNum = i % Math.floor(parseInt(trNum) * 7);

        if (i < 7) {
            tdNum = i;
        }

        const aaa = $('#tbMainCal2').children()[trNum];
        const bbb = $(aaa).children()[tdNum];

        $(bbb).removeClass('tdCho');
    }

    const calIddd = $('.dash-cal-con-item-t').attr('id');

    if (calIddd) {
        const calNum = calIddd.split('dash-cal-con-item');

        const realCalNum = calNum[1];

        const iiiddd = '#cal2Mid' + realCalNum;
        const ccc = $(iiiddd)
            .parent()
            .parent();

        $(ccc).addClass('tdCho');
    }
}

$(document).on('click', '.middle-end', function () {
    const ddd = $(this).children()[2];
    const ddd1 = $(ddd).children()[0];

    const carNum = $(ddd1)
        .text()
        .trim();

    goCarDetail(carNum);
});

$(document).on('click', '.carAside', function () {
    const ddd = $(this).children()[0];

    const carNum = $(ddd)
        .text()
        .trim();

    console.log("carNum   " + carNum);

    goCarDetail(carNum);
});

function goCarDetail(paramCarn) {
    //create element (form)
    var newForm = $('<form></form>');

    console.log("paramCarn  " + paramCarn);

    //set attribute (form)
    newForm.attr("name", "newForm");
    newForm.attr("action", "/vehicle");
    newForm.attr("target", "차량정보");
    newForm.append($('<input/>', {
        type: 'hidden',
        name: 'carn',
        value: paramCarn
    }));

    // append form(to body)
    newForm.appendTo('body');

    // submit form
    newForm.submit();
}

$(document).on('click', '.carAside', function () {});