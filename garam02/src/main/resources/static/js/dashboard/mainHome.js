$(document).ready(function () {});

function makeMainBigCal() {

    let arrDays = new Array();
    let arrSukCnt = new Array();
    let arrIlCnt = new Array();

    let arrSukCnt45 = new Array();
    let arrSukCnt25 = new Array();
    let arrSukCnt28 = new Array();

    LoadingWithMask()
        .then(setMainCalendar)
        .then(setBigCalendarHol)
        .then(plus1)
        .then(plus2)
        .then(plus3)
        .then(getCalRsvt1)
        .then(getCalRsvt2)
        .then(closeLoadingWithMask);
    clTdColor();

    function setMainCalendar(result) {
        return new Promise(function (resolve, reject) {
            const aaa = new Date($("#yearMonth").val());

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

                const aaa = $('#tbMainCal').children()[trNum];
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

                $(bbb3).text(stD.getDate());
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

    function setBigCalendarHol(result) {
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
                    for (let i = 0; i < r.length; i++) {
                        if (r[i].holiday) {
                            for (let k = 0; k < 42; k++) {
                                const trNum = Math.floor(k / 7);
                                let tdNum = k % Math.floor(parseInt(trNum) * 7);

                                if (k < 7) {
                                    tdNum = k;
                                }

                                const aaa = $('#tbMainCal').children()[trNum];
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

    function plus1(result) {
        return new Promise(function (resolve, reject) {
            const url = "/home/homeCal3";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "stday": result[0],
                "endday": result[1]
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {

                    for (let k = 0; k < arrDays.length; k++) {
                        let tmpCnt = 0;

                        let tmpCnt45 = 0;
                        let tmpCnt25 = 0;
                        let tmpCnt28 = 0;

                        const calDay = parseInt(
                            arrDays[k].split('-')[0] + arrDays[k].split('-')[1] + arrDays[k].split('-')[2]
                        );

                        for (let i = 0; i < r.length; i++) {
                            const reaStlDay = parseInt(
                                r[i].stday.split('-')[0] + r[i].stday.split('-')[1] + r[i].stday.split('-')[2]
                            );
                            const reaEdlDay = parseInt(
                                r[i].endday.split('-')[0] + r[i].endday.split('-')[1] + r[i].endday.split('-')[2]
                            );

                            if (calDay >= reaStlDay && calDay <= reaEdlDay) {
                                tmpCnt++;

                                switch (r[i].bus) {
                                    case '대형':
                                        tmpCnt45 = tmpCnt45 + parseInt(r[i].ctmtel1);
                                        break;
                                    case '중형':
                                        tmpCnt25 = tmpCnt25 + parseInt(r[i].ctmtel2);
                                        break;
                                    case '우등':
                                        tmpCnt28 = tmpCnt28 + parseInt(r[i].ctmemail);
                                        break;

                                    default:
                                        break;
                                }

                            }
                        }
                        arrSukCnt.push(tmpCnt);

                        arrSukCnt45.push(tmpCnt45);
                        arrSukCnt25.push(tmpCnt25);
                        arrSukCnt28.push(tmpCnt28);
                    }
                    resolve(result);
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }
    function plus2(result) {
        return new Promise(function (resolve, reject) {
            const url = "/home/homeCal4";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "stday": result[0],
                "endday": result[1]
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {

                    for (let k = 0; k < arrDays.length; k++) {
                        let tmpCnt = 0;
                        for (let i = 0; i < r.length; i++) {
                            if (arrDays[k] == r[i].stday) {
                                tmpCnt++;
                            }
                        }
                        arrIlCnt.push(tmpCnt);
                    }
                    resolve(result);
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }
    function plus3(result) {
        return new Promise(function (resolve, reject) {
            let tmpArr = new Array();
            for (let i = 0; i < 42; i++) {
                tmpArr.push(parseInt(arrSukCnt[i]) + parseInt(arrIlCnt[i]));
            }

            let tr01 = 0;
            let tr02 = 0;
            let tr03 = 0;
            let tr04 = 0;
            let tr05 = 0;
            let tr06 = 0;

            for (let i = 0; i < 7; i++) {
                if (tr01 < tmpArr[i]) {
                    tr01 = tmpArr[i];
                }
            }

            for (let i = 7; i < 14; i++) {
                if (tr02 < tmpArr[i]) {
                    tr02 = tmpArr[i];
                }
            }

            for (let i = 14; i < 21; i++) {
                if (tr03 < tmpArr[i]) {
                    tr03 = tmpArr[i];
                }
            }

            for (let i = 21; i < 28; i++) {
                if (tr04 < tmpArr[i]) {
                    tr04 = tmpArr[i];
                }
            }

            for (let i = 28; i < 35; i++) {
                if (tr05 < tmpArr[i]) {
                    tr05 = tmpArr[i];
                }
            }

            for (let i = 35; i < 42; i++) {
                if (tr06 < tmpArr[i]) {
                    tr06 = tmpArr[i];
                }
            }

            let inHtml1 = ``;
            let inHtml2 = ``;
            let inHtml3 = ``;
            let inHtml4 = ``;
            let inHtml5 = ``;
            let inHtml6 = ``;

            for (let i = 0; i < tr01; i++) {
                inHtml1 += `
                <div class="mainCaltd-middle">
                    <div class="mainCaltd-middle-item"></div>
                    <div class="maincaltd-middle-itemb">&nbsp;</div>
                    <input type="hidden">
                    <input type="hidden">
                    <input type="hidden">
                </div>`;
            }

            for (let i = 0; i < tr02; i++) {
                inHtml2 += `
                <div class="mainCaltd-middle">
                    <div class="mainCaltd-middle-item"></div>
                    <div class="maincaltd-middle-itemb">&nbsp;</div>
                    <input type="hidden">
                    <input type="hidden">
                    <input type="hidden">
                </div>`;
            }

            for (let i = 0; i < tr03; i++) {
                inHtml3 += `
                <div class="mainCaltd-middle">
                    <div class="mainCaltd-middle-item"></div>
                    <div class="maincaltd-middle-itemb">&nbsp;</div>
                    <input type="hidden">
                    <input type="hidden">
                    <input type="hidden">
                </div>`;
            }

            for (let i = 0; i < tr04; i++) {
                inHtml4 += `
                <div class="mainCaltd-middle">
                    <div class="mainCaltd-middle-item"></div>
                    <div class="maincaltd-middle-itemb">&nbsp;</div>
                    <input type="hidden">
                    <input type="hidden">
                    <input type="hidden">
                </div>`;
            }

            for (let i = 0; i < tr05; i++) {
                inHtml5 += `
                <div class="mainCaltd-middle">
                    <div class="mainCaltd-middle-item"></div>
                    <div class="maincaltd-middle-itemb">&nbsp;</div>
                    <input type="hidden">
                    <input type="hidden">
                    <input type="hidden">
                </div>`;
            }

            for (let i = 0; i < tr06; i++) {
                inHtml6 += `
                <div class="mainCaltd-middle">
                    <div class="mainCaltd-middle-item"></div>
                    <div class="maincaltd-middle-itemb">&nbsp;</div>
                    <input type="hidden">
                    <input type="hidden">
                    <input type="hidden">
                </div>`;
            }

            $('#calMid1').html(inHtml1);
            $('#calMid2').html(inHtml1);
            $('#calMid3').html(inHtml1);
            $('#calMid4').html(inHtml1);
            $('#calMid5').html(inHtml1);
            $('#calMid6').html(inHtml1);
            $('#calMid7').html(inHtml1);

            $('#calMid8').html(inHtml2);
            $('#calMid9').html(inHtml2);
            $('#calMid10').html(inHtml2);
            $('#calMid11').html(inHtml2);
            $('#calMid12').html(inHtml2);
            $('#calMid13').html(inHtml2);
            $('#calMid14').html(inHtml2);

            $('#calMid15').html(inHtml3);
            $('#calMid16').html(inHtml3);
            $('#calMid17').html(inHtml3);
            $('#calMid18').html(inHtml3);
            $('#calMid19').html(inHtml3);
            $('#calMid20').html(inHtml3);
            $('#calMid21').html(inHtml3);

            $('#calMid22').html(inHtml4);
            $('#calMid23').html(inHtml4);
            $('#calMid24').html(inHtml4);
            $('#calMid25').html(inHtml4);
            $('#calMid26').html(inHtml4);
            $('#calMid27').html(inHtml4);
            $('#calMid28').html(inHtml4);

            $('#calMid29').html(inHtml5);
            $('#calMid30').html(inHtml5);
            $('#calMid31').html(inHtml5);
            $('#calMid32').html(inHtml5);
            $('#calMid33').html(inHtml5);
            $('#calMid34').html(inHtml5);
            $('#calMid35').html(inHtml5);

            $('#calMid36').html(inHtml6);
            $('#calMid37').html(inHtml6);
            $('#calMid38').html(inHtml6);
            $('#calMid39').html(inHtml6);
            $('#calMid40').html(inHtml6);
            $('#calMid41').html(inHtml6);
            $('#calMid42').html(inHtml6);

            $('#calMid1')
                .next()
                .html(``);
            $('#calMid2')
                .next()
                .html(``);
            $('#calMid3')
                .next()
                .html(``);
            $('#calMid4')
                .next()
                .html(``);
            $('#calMid5')
                .next()
                .html(``);
            $('#calMid6')
                .next()
                .html(``);
            $('#calMid7')
                .next()
                .html(``);

            $('#calMid8')
                .next()
                .html(``);
            $('#calMid9')
                .next()
                .html(``);
            $('#calMid10')
                .next()
                .html(``);
            $('#calMid11')
                .next()
                .html(``);
            $('#calMid12')
                .next()
                .html(``);
            $('#calMid13')
                .next()
                .html(``);
            $('#calMid14')
                .next()
                .html(``);

            $('#calMid15')
                .next()
                .html(``);
            $('#calMid16')
                .next()
                .html(``);
            $('#calMid17')
                .next()
                .html(``);
            $('#calMid18')
                .next()
                .html(``);
            $('#calMid19')
                .next()
                .html(``);
            $('#calMid20')
                .next()
                .html(``);
            $('#calMid21')
                .next()
                .html(``);

            $('#calMid22')
                .next()
                .html(``);
            $('#calMid23')
                .next()
                .html(``);
            $('#calMid24')
                .next()
                .html(``);
            $('#calMid25')
                .next()
                .html(``);
            $('#calMid26')
                .next()
                .html(``);
            $('#calMid27')
                .next()
                .html(``);
            $('#calMid28')
                .next()
                .html(``);

            $('#calMid29')
                .next()
                .html(``);
            $('#calMid30')
                .next()
                .html(``);
            $('#calMid31')
                .next()
                .html(``);
            $('#calMid32')
                .next()
                .html(``);
            $('#calMid33')
                .next()
                .html(``);
            $('#calMid34')
                .next()
                .html(``);
            $('#calMid35')
                .next()
                .html(``);

            $('#calMid36')
                .next()
                .html(``);
            $('#calMid37')
                .next()
                .html(``);
            $('#calMid38')
                .next()
                .html(``);
            $('#calMid39')
                .next()
                .html(``);
            $('#calMid40')
                .next()
                .html(``);
            $('#calMid41')
                .next()
                .html(``);
            $('#calMid42')
                .next()
                .html(``);
            resolve(result);
        })
    }

    function getCalRsvt1(result) {
        return new Promise(function (resolve, reject) {
            const url = "/home/homeCal1";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "stday": result[0],
                "endday": result[1]
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {
                    if (r.length > 0) {
                        for (let i = 0; i < r.length; i++) {
                            const beet = betweenDateNum(r[i].stday, r[i].endday);

                            let cntChild = 0;
                            let saveDom = new Array();
                            let arrTmpDay = new Array();
                            let dayWeek = '';
                            for (let k = 0; k < beet; k++) {
                                let dayyyy = new Date(r[i].stday);
                                dayyyy = new Date(dayyyy.setDate(dayyyy.getDate() + k));

                                for (let j = 0; j < 42; j++) {
                                    const trNum = Math.floor(j / 7);
                                    let tdNum = j % Math.floor(parseInt(trNum) * 7);

                                    if (j < 7) {
                                        tdNum = j;
                                    }

                                    const aaa = $('#tbMainCal').children()[trNum];
                                    const bbb = $(aaa).children()[tdNum];

                                    const bbb1 = $(bbb).children()[0];
                                    const bbb4 = $(bbb1).children()[0];

                                    if (toStringByFormatting(dayyyy) == $(bbb4).val()) {
                                        const iiddd = '#calMid' + (
                                            j + 1
                                        )

                                        const ccc = $(bbb1).children()[2];

                                        const ccc1 = $(iiddd).children();

                                        let qwer = '';

                                        switch (r[i].ctmsepa) {
                                            case 0:
                                                qwer += `<span class="spNum1">` + r[i].desty + `</span>`;
                                                break;
                                            case 1:
                                                qwer += `<span class="spNum1">` + r[i].ctmname + `</span>`;
                                                break;
                                            case 2:
                                                qwer += `<span class="spNum1">` + r[i].desty + `</span>`;
                                                break;
                                            default:
                                                break;
                                        }

                                        if (r[i].ctmtel1 > 0) {
                                            qwer += `<span class="spNum2 big45">` + r[i].ctmtel1 + `</span>`;
                                        }
                                        if (r[i].ctmtel2 > 0) {
                                            qwer += `<span class="spNum2 big25">` + r[i].ctmtel2 + `</span>`;
                                        }
                                        if (r[i].ctmemail > 0) {
                                            qwer += `<span class="spNum2 big28">` + r[i].ctmemail + `</span>`;
                                        }

                                        let qwer1 = '';

                                        switch (r[i].ctmsepa) {
                                            case 0:
                                                qwer1 += `<span class="spNum1">` + r[i].desty + `</span>`;
                                                break;
                                            case 1:
                                                qwer1 += `<span class="spNum1">` + r[i].ctmname + `</span>`;
                                                break;
                                            case 2:
                                                qwer1 += `<span class="spNum1">` + r[i].desty + `</span>`;
                                                break;
                                            default:
                                                break;
                                        }

                                        if (k == 0) {
                                            for (let j2 = 0; j2 < ccc1.length; j2++) {
                                                const chch = $(ccc1[j2]).children()[0];
                                                const dayval = $(ccc1[j2]).children()[2];
                                                const ctmval = $(ccc1[j2]).children()[3];
                                                const sepaa = $(ccc1[j2]).children()[4];
                                                const texttt = $(chch).text();

                                                if ($(ctmval).val() == r[i].rsvt) {
                                                    break;
                                                }

                                                if (!texttt) {
                                                    $(chch).html(qwer);
                                                    $(dayval).val(r[i].stday);
                                                    $(ctmval).val(r[i].rsvt);
                                                    $(sepaa).val(1);
                                                    saveDom.push(chch);
                                                    cntChild = j2;
                                                    dayWeek += dayyyy.getDay();
                                                    break;
                                                }
                                            }
                                        } else {
                                            const chch = $(ccc1[cntChild]).children()[0];
                                            const dayval = $(ccc1[cntChild]).children()[2];
                                            const ctmval = $(ccc1[cntChild]).children()[3];
                                            const sepaa = $(ccc1[cntChild]).children()[4];
                                            $(chch).html(qwer1);
                                            $(dayval).val(r[i].stday);
                                            $(ctmval).val(r[i].rsvt);
                                            $(sepaa).val(1);
                                            if (dayyyy.getDay() == 1) {
                                                arrTmpDay.push(dayWeek);
                                                dayWeek = '1';
                                                saveDom.push(chch);
                                            } else {
                                                $(chch).css('color', 'transparent');
                                                dayWeek += dayyyy.getDay();
                                            }
                                        }
                                    }
                                }
                            }
                            arrTmpDay.push(dayWeek);

                            for (let l = 0; l < saveDom.length; l++) {
                                let rrem = 0;
                                for (let l3 = 1; l3 < arrTmpDay[l].split('').length; l3++) {
                                    rrem = rrem + getTdSize(parseInt(arrTmpDay[l].split('')[l3]));
                                }
                                $(saveDom[l]).attr('class', 'mainCaltd-middle-item middle-suk card-song');
                                $(saveDom[l]).css('right', (rrem * -1) + "px");

                                if (saveDom.length > 1) {
                                    if (l == saveDom.length - 1) {
                                        $(saveDom[l]).css('margin-left', '0')
                                        $(saveDom[l]).css('margin-right', '0.3rem')
                                        $(saveDom[l]).css('border-radius', '0 3px 3px 0')
                                    } else if (l == 0) {
                                        $(saveDom[l]).css('margin-left', '0.3rem')
                                        $(saveDom[l]).css('margin-right', '0')
                                        $(saveDom[l]).css('border-radius', '3px 0 0 3px')
                                    } else {
                                        $(saveDom[l]).css('margin-left', '0')
                                        $(saveDom[l]).css('margin-right', '0')
                                        $(saveDom[l]).css('border-radius', '0')
                                    }
                                }
                            }
                        }
                    }
                    resolve(result);
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

    function getCalRsvt2(result) {
        return new Promise(function (resolve, reject) {
            const url = "/home/homeCal2";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "stday": result[0],
                "endday": result[1]
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {
                    if (r.length) {
                        for (let i = 0; i < r.length; i++) {
                            let number = 0;
                            for (let k = 0; k < arrDays.length; k++) {
                                if (r[i].stday == arrDays[k]) {
                                    number = parseInt(k) + 1;
                                }
                            }

                            const iiddd = '#calMid' + (
                                number
                            );

                            const ccc1 = $(iiddd).children();

                            let qwer = '';

                            switch (r[i].ctmsepa) {
                                case 0:
                                    qwer += `<span class="spNum1">` + r[i].ctmname + `</span>`;
                                    break;
                                case 1:
                                    qwer += `<span class="spNum1">` + r[i].ctmname + `</span>`;
                                    break;
                                case 2:
                                    qwer += `<span class="spNum1">` + r[i].ctmname + `</span>`;
                                    break;
                                default:
                                    break;
                            }

                            if (r[i].ctmtel1 > 0) {
                                qwer += `<span class="spNum2 big45">` + r[i].ctmtel1 + `</span>`;
                            }
                            if (r[i].ctmtel2 > 0) {
                                qwer += `<span class="spNum2 big25">` + r[i].ctmtel2 + `</span>`;
                            }
                            if (r[i].ctmemail > 0) {
                                qwer += `<span class="spNum2 big28">` + r[i].ctmemail + `</span>`;
                            }

                            for (let j2 = 0; j2 < ccc1.length; j2++) {
                                const chch = $(ccc1[j2]).children()[0];
                                const dayval = $(ccc1[j2]).children()[2];
                                const ctmval = $(ccc1[j2]).children()[3];
                                const sepaa = $(ccc1[j2]).children()[4];
                                const texttt = $(chch).text();

                                if ($(ctmval).val() == r[i].ctmno) {
                                    let qqqq = ``;
                                    if (r[i].ctmtel1 > 0) {
                                        qqqq += `<span class="spNum2 big45">` + r[i].ctmtel1 + `</span>`;
                                    }
                                    if (r[i].ctmtel2 > 0) {
                                        qqqq += `<span class="spNum2 big25">` + r[i].ctmtel2 + `</span>`;
                                    }
                                    if (r[i].ctmemail > 0) {
                                        qqqq += `<span class="spNum2 big28">` + r[i].ctmemail + `</span>`;
                                    }
                                    $(chch).append(qqqq);
                                    break;
                                } else {
                                    if (!texttt) {
                                        $(chch).addClass('middle-il');
                                        $(chch).html(qwer);
                                        $(dayval).val(r[i].stday);
                                        $(ctmval).val(r[i].ctmno);
                                        $(sepaa).val(0);
                                        break;
                                    }
                                }
                            }
                        }

                        for (let k = 0; k < arrDays.length; k++) {
                            let bus45Cnt = 0;
                            let bus25Cnt = 0;
                            let bus28Cnt = 0;
                            for (let i = 0; i < r.length; i++) {
                                if (r[i].stday == arrDays[k]) {
                                    if (r[i].ctmtel1 > 0) {
                                        bus45Cnt = bus45Cnt + parseInt(r[i].ctmtel1);
                                    }
                                    if (r[i].ctmtel2 > 0) {
                                        bus25Cnt = bus25Cnt + parseInt(r[i].ctmtel2);
                                    }
                                    if (r[i].ctmemail > 0) {
                                        bus28Cnt = bus28Cnt + parseInt(r[i].ctmemail);
                                    }
                                }
                            }

                            bus45Cnt = bus45Cnt + parseInt(arrSukCnt45[k]);
                            bus25Cnt = bus25Cnt + parseInt(arrSukCnt25[k]);
                            bus28Cnt = bus28Cnt + parseInt(arrSukCnt28[k]);

                            let htmll45 = ``;
                            let htmll25 = ``;
                            let htmll28 = ``;

                            if (bus45Cnt > 0) {
                                htmll45 = `<span class="big45">` + bus45Cnt + `</span>`;
                            } else {
                                htmll45 = `<span class="">   </span>`;
                            }

                            if (bus25Cnt > 0) {
                                htmll25 = `<span class="big25">` + bus25Cnt + `</span>`;
                            } else {
                                htmll25 = `<span class="">   </span>`;
                            }

                            if (bus28Cnt > 0) {
                                htmll28 = `<span class="big28">` + bus28Cnt + `</span>`;
                            } else {
                                htmll28 = `<span class="">   </span>`;
                            }

                            const htmll = htmll45 + htmll25 + htmll28;

                            const iiddd = '#calMid' + (
                                parseInt(k) + 1
                            );

                            const aaa = $(iiddd).next();

                            $(aaa).html(htmll);
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
}

$(window).on('resize', function () {
    let delay = 300;
    let timer = null;
    clearTimeout(timer);
    timer = setTimeout(function () {
        makeMainBigCal();
    }, delay);
});

function getTdSize(params) {
    switch (params) {
        case 1:
            const size1 = document.querySelector('#Td1');
            return parseFloat(size1.getBoundingClientRect().width);
            break;
        case 2:
            const size2 = document.querySelector('#Td2');
            return parseFloat(size2.getBoundingClientRect().width);
            break;
        case 3:
            const size3 = document.querySelector('#Td3');
            return parseFloat(size3.getBoundingClientRect().width);
            break;
        case 4:
            const size4 = document.querySelector('#Td4');
            return parseFloat(size4.getBoundingClientRect().width);
            break;
        case 5:
            const size5 = document.querySelector('#Td5');
            return parseFloat(size5.getBoundingClientRect().width);
            break;
        case 6:
            const size6 = document.querySelector('#Td6');
            return parseFloat(size6.getBoundingClientRect().width);
            break;
        case 0:
            const size0 = document.querySelector('#Td0');
            return parseFloat(size0.getBoundingClientRect().width);
            break;

    }

}

$(document).on('click', '.middle-suk', function () {});

$(document).ready(function () {
    $(".mainCalTable tbody tr td .mainCaltd-top .mainCaltd-top-hol").mouseover(
        function () {
            $(this)
                .parent()
                .parent()
                .parent()
                .addClass('tdHovers');
        }
    );
    $(".mainCalTable tbody tr td .mainCaltd-top .mainCaltd-top-hol").mouseout(
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
    $(".mainCalTable tbody tr td .mainCaltd-top .mainCaltd-top-day").mouseover(
        function () {
            $(this)
                .parent()
                .parent()
                .parent()
                .addClass('tdHovers');
        }
    );
    $(".mainCalTable tbody tr td .mainCaltd-top .mainCaltd-top-day").mouseout(
        function () {
            $(this)
                .parent()
                .parent()
                .parent()
                .removeClass('tdHovers');
        }
    );
});

$(document).on('click', '.mainCaltd-top-hol', function () {
    const aaa = $(this)
        .parent()
        .next();

    const getidd = $(aaa).attr('id');
    const getidd1 = getidd.split('calMid');

    const realNum = getidd1[1];

    const iiddddd = 'dash-cal-con-item' + realNum;

    setCalWhite(iiddddd);
});
$(document).on('click', '.mainCaltd-top-day', function () {
    const aaa = $(this)
        .parent()
        .next();

    const getidd = $(aaa).attr('id');
    const getidd1 = getidd.split('calMid');

    const realNum = getidd1[1];

    const iiddddd = 'dash-cal-con-item' + realNum;

    setCalWhite(iiddddd);
});

function clTdColor() {
    for (let i = 0; i < 42; i++) {
        const trNum = Math.floor(i / 7);
        let tdNum = i % Math.floor(parseInt(trNum) * 7);

        if (i < 7) {
            tdNum = i;
        }

        const aaa = $('#tbMainCal').children()[trNum];
        const bbb = $(aaa).children()[tdNum];

        $(bbb).removeClass('tdCho');
    }

    const calIddd = $('.dash-cal-con-item-t').attr('id');

    if (calIddd) {
        const calNum = calIddd.split('dash-cal-con-item');

        const realCalNum = calNum[1];

        const iiiddd = '#calMid' + realCalNum;
        const ccc = $(iiiddd)
            .parent()
            .parent();
        $(ccc).addClass('tdCho');
    }
}

$(document).on('click', '#pills-home-tab', function () {
    makeMainBigCal();
});