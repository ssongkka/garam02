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
        .then(getLoanDay1)
        .then(setMonthMiddle)
        .then(closeLoadingWithMask);

    clTdColor2();

    function setMainCalendar2(result) {
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
        </div>`;
            resolve();
        })
    }

    function getLoanDay1() {
        return new Promise(function (resolve, reject) {

            const url = "/home4/weekLoan1";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const monththth = $('#yearMonth').val();

            const params = {
                "owner": monththth
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

                        if (r[i].owner) {
                            console.log("r[i].owner  " + checkHolDay1(r[i].owner));
                            arrHtmls[checkHolDay1(r[i].owner)] += `
                        <div class="mainCal2td-middle-item middle-loan">
                            <input type="hidden" value="` +
                                    r[i].loanno +
                                    `">
                            <span class="spNum1">` + r[i].vehicle2 +
                                    `</span>
                            <span class="h2loan">대출</span>
                            <span class="h2ch">냇음</span>
                        </div>`;
                        } else {
                            arrHtmls[checkHolDay(r[i].loandayloan)] += `
                        <div class="mainCal2td-middle-item middle-loan">
                            <input type="hidden" value="` +
                                    r[i].loanno +
                                    `">
                            <span class="spNum1">` + r[i].vehicle2 +
                                    `</span>
                            <span class="h2loan">대출</span>
                            <span class="h2ch"></span>
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
    function getLoanDay2() {
        return new Promise(function (resolve, reject) {

            const url = "/home4/weekLoan2";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const monththth = String(parseInt($('#yearMonth').val().split('-')[0])) + '-' +
                    String(parseInt($('#yearMonth').val().split('-')[1]))

            const params = {
                "owner": monththth
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

                        for (let k = 0; k < arrHtmls.length; k++) {
                            if (arrHtmls[i].includes(r[i].loandayloan)) {}
                        }

                        arrHtmls[checkHolDay(r[i].loandayloan)] += `
                    <div class="mainCal2td-middle-item middle-loan">
                        <input type="hidden" value="` +
                                r[i].loanno +
                                `">
                        <span class="spNum1">` + r[i].vehicle +
                                `</span>
                        <span class="h2loan">대출</span>
                        <span class="h2ch"></span>
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

function checkHolDay(dateNum) {

    const aaa = $('#tbMainCal2').children();

    const makeDay = $('#yearMonth').val() + '-' + dateNum;

    let paramddaayy = new Date(makeDay);

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
                if (!cssss) {
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

$(document).on('click', '#pills-home4-tab', function () {
    makeMain2BigCal();
});