$(document).ready(function () {
    nowMinth();
    setRegDays();
    getRegularAll();
});

var myModalRegAlloMd = new bootstrap.Modal(
    document.getElementById('regAlloMd')
);

function nowMinth() {
    const nownownow = toStringByFormatting(new Date());

    if (nownownow.split('-')[2] >= 1 && nownownow.split('-')[2] <= 10) {
        const now = new Date();
        const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
        const fff = toStringByFormatting(oneMonthAgo);

        const nownownows = toStringByFormatting(now);
        const nowMonth = new Date(
            nownownows.split('-')[0],
            nownownows.split('-')[1] - 1,
            1
        );

        const oneMonthAgo1 = new Date(nowMonth.setMonth(nowMonth.getMonth() + 1));
        const fff1 = toStringByFormatting(oneMonthAgo1);
        $('#yearMonth').val(fff.split('-')[0] + '-' + fff.split('-')[1]);
        $('#yearMonth').attr('max', fff1.split('-')[0] + '-' + fff1.split('-')[1]);
    } else {
        $('#yearMonth').val(nownownow.split('-')[0] + '-' + nownownow.split('-')[1]);
        $('#yearMonth').attr('max', nownownow.split('-')[0] + '-' + nownownow.split(
            '-'
        )[1]);
    }
}

$(document).on('click', '#show-aside', function () {});
$(document).on('change', '#yearMonth', function () {
    if ($('#rgconum').val()) {
        LoadingWithMask()
            .then(setRegDays)
            .then(getRegularDeAll)
            .then(closeLoadingWithMask);
    } else {
        LoadingWithMask()
            .then(setRegDays)
            .then(closeLoadingWithMask);
    }
});

$(document).on('click', '#fnDownMonth', function () {

    var now_D = get_Year_Month();
    var downMonth = new Date(now_D.setMonth(now_D.getMonth() - 1));
    $("#yearMonth").val(toStringByFormatting(downMonth).substring(0, 7));

    if ($('#rgconum').val()) {
        LoadingWithMask()
            .then(setRegDays)
            .then(getRegularDeAll)
            .then(closeLoadingWithMask);
    } else {
        LoadingWithMask()
            .then(setRegDays)
            .then(closeLoadingWithMask);
    }
});

$(document).on('click', '#fnUpMonth', function () {
    const nownownow = toStringByFormatting(new Date());
    const nownownow2 = $('#yearMonth').val();

    const now1 = parseInt(nownownow.split('-')[0] + nownownow.split('-')[1]);
    const now2 = parseInt(nownownow2.split('-')[0] + nownownow2.split('-')[1]);

    if (now2 < now1) {
        var now_D = get_Year_Month();
        var upMonth = new Date(now_D.setMonth(now_D.getMonth() + 1));
        $("#yearMonth").val(toStringByFormatting(upMonth).substring(0, 7));

        if ($('#rgconum').val()) {
            LoadingWithMask()
                .then(setRegDays)
                .then(getRegularDeAll)
                .then(closeLoadingWithMask);
        } else {
            LoadingWithMask()
                .then(setRegDays)
                .then(closeLoadingWithMask);
        }
    } else {
        alert("운행 월을 확인해주세요.");
    }
});

function setAlloAll() {}

function get_Year_Month() {
    const aaa = $("#yearMonth").val();
    const bbb = aaa.split('-');
    const year = parseInt(bbb[0]);
    const month = parseInt(bbb[1]);
    const now_Month = new Date(year, month - 1, 1);

    return now_Month;
}

function setRegDays() {
    return new Promise(function (resolve, reject) {
        const endDay = fnEndDay();

        let htmlsday1 = '';
        let htmlsday2 = '';
        let htmlsday3 = '';
        let htmlsday4 = '';

        htmlsday1 += '<tr>';
        htmlsday1 += '<th rowspan="3">노선</th>';

        htmlsday2 += '<tr>';
        htmlsday3 += '<tr class="thNone">';
        htmlsday4 += '<tr class="thNone">';

        let cont = 0;

        let dow = 0;

        for (let i = 0; i < 31; i++) {
            if (cont < parseInt(endDay)) {
                const tmpd = new Date($("#yearMonth").val()).setDate(
                    new Date($("#yearMonth").val()).getDate() + cont
                );
                dow = new Date(tmpd).getDay();

                let nnn = '';
                if (cont < 9) {
                    nnn = '0' + ++cont;
                } else {
                    nnn = ++cont;
                }

                switch (dow) {
                    case 0:
                        htmlsday1 += '<th style="color: #4B89DC;">' + (
                            nnn
                        ) + '일</th>';
                        htmlsday2 += '<th style="color: #4B89DC;">' + getDayOfWeek(dow) + '</th>';
                        htmlsday3 += '<th style="color: #4B89DC;">' + toStringByFormatting(
                            new Date(tmpd)
                        ) + '</th>';
                        htmlsday4 += '<th style="color: #4B89DC;">' + dow + '</th>';
                        break;
                    case 6:
                        htmlsday1 += '<th style="color: #CF2F11;">' + (
                            nnn
                        ) + '일</th>';
                        htmlsday2 += '<th style="color: #CF2F11;">' + getDayOfWeek(dow) + '</th>';
                        htmlsday3 += '<th style="color: #CF2F11;">' + toStringByFormatting(
                            new Date(tmpd)
                        ) + '</th>';
                        htmlsday4 += '<th style="color: #CF2F11;">' + dow + '</th>';
                        break;
                    default:
                        htmlsday1 += '<th>' + (
                            nnn
                        ) + '일</th>';
                        htmlsday2 += '<th>' + getDayOfWeek(dow) + '</th>';
                        htmlsday3 += '<th>' + toStringByFormatting(new Date(tmpd)) + '</th>';
                        htmlsday4 += '<th>' + dow + '</th>';
                        break;
                }
            } else {
                htmlsday1 += '<th style="opacity: 0;">잉요일</th>';
                htmlsday2 += '<th style="opacity: 0;">잉요일</th>';
                htmlsday3 += '<th style="opacity: 0;">잉요일</th>';
                htmlsday4 += '<th style="opacity: 0;">잉요일</th>';
            }
        }
        htmlsday1 += '</tr>';
        htmlsday2 += '</tr>';
        htmlsday3 += '</tr>';
        htmlsday4 += '</tr>';

        const htmls = htmlsday1 + htmlsday2 + htmlsday3 + htmlsday4;

        $('#thDays').html(htmls);
        resolve();
    })
}

function getRegularAll() {
    return new Promise(function (resolve, reject) {

        const url = "/reg/regRegular";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const params = {
            "regcompany": ''
        };

        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            dataType: "json",
            data: JSON.stringify(params),
            success: function (r) {
                let htmls = '';
                if (r.length > 0) {
                    for (let i = 0; i < r.length; i++) {
                        let act = 'class="nav-link"';

                        htmls += `<li class="nav-item regAll" role="presentation">
                        <input type="hidden" value="` +
                                r[i].conum +
                                `">
                        <button
                            ` + act +
                                `
                            data-bs-toggle="pill"
                            type="button"
                            role="tab"
                            aria-selected="true">` +
                                r[i].regcompany +
                                `</button>
                    </li>`;
                    }
                } else {}

                $('#regCompa-tab').html(htmls);
                resolve();
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    });
}

$(document).on('click', '.regAll', function () {

    const aaa = $(this).children()[0];
    const iidd = $(aaa).val();
    $('#rgconum').val(iidd);

    LoadingWithMask()
        .then(setRegDays)
        .then(getRegularDeAll)
        .then(closeLoadingWithMask);
});

function getRegularDeAll() {
    return new Promise(function (resolve, reject) {

        const url = "/reg/regRegularde";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const params = {
            "conum": $('#rgconum').val()
        };

        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            dataType: "json",
            data: JSON.stringify(params),
            success: function (r) {
                let htmls = '';
                let htmlsFoot = '';
                if (r.length > 0) {
                    for (let i = 0; i < r.length; i++) {
                        if (r[i].rdtrash > 0) {
                            htmls += '<tr>';
                            htmls += '<td class="text-truncate">';
                            htmls += '<input type="hidden" value="' + r[i].codenum + '">';
                            htmls += '<input type="hidden" value="' + r[i].rdnum + '">';
                            htmls += r[i].rdname;
                            htmls += '</td>';

                            let cont = 0;
                            for (let k = 0; k < 31; k++) {
                                if (cont < parseInt(fnEndDay())) {

                                    const tmpNowDd = toStringByFormatting(new Date());
                                    const nowDayday = parseInt(
                                        tmpNowDd.split('-')[0] + tmpNowDd.split('-')[1] + tmpNowDd.split('-')[2]
                                    );

                                    const tmpd = new Date($("#yearMonth").val()).setDate(
                                        new Date($("#yearMonth").val()).getDate() + cont
                                    );

                                    const tmpShowd = toStringByFormatting(new Date(tmpd));
                                    const showDayday = parseInt(
                                        tmpShowd.split('-')[0] + tmpShowd.split('-')[1] + tmpShowd.split('-')[2]
                                    );

                                    if (nowDayday >= showDayday) {
                                        htmls += '<td class="text-truncate user-select-none allocur" onclick="checkAllo(this)" o' +
                                                'ndblclick="getAllo(this)">';
                                        htmls += '<input type="hidden" value="' + toStringByFormatting(new Date(tmpd)) + '">';
                                        htmls += '<input type="hidden" value="' + r[i].codenum + '">';
                                        if (r[i].opercar) {
                                            htmls += '<input type="hidden" value="' + r[i].opercar + '">';

                                            if (isNaN(r[i].idvehicle.substring(r[i].idvehicle.length - 4))) {
                                                htmls += r[i]
                                                    .idvehicle
                                                    .replaceAll('고속', '')
                                                    .replaceAll('관광', '')
                                                    .replaceAll('여행사', '');
                                            } else {
                                                htmls += r[i]
                                                    .idvehicle
                                                    .substring(r[i].idvehicle.length - 4);
                                            }
                                        } else {
                                            htmls += '<input type="hidden" value="">';
                                            htmls += '';
                                        }
                                        htmls += '</td>';
                                    } else {
                                        htmls += '<td>';
                                        htmls += '</td>';
                                    }

                                } else {
                                    htmls += '<td>';
                                    htmls += '</td>';
                                }
                                cont++;
                            }
                            htmls += '</tr>';
                        }
                    }

                    htmlsFoot += '<tr>';
                    htmlsFoot += '<th></th>';
                    let cont1 = 0;
                    for (let k = 0; k < 31; k++) {
                        if (cont1 < parseInt(fnEndDay())) {
                            const tmpNowDd = toStringByFormatting(new Date());
                            const nowDayday = parseInt(
                                tmpNowDd.split('-')[0] + tmpNowDd.split('-')[1] + tmpNowDd.split('-')[2]
                            );

                            const tmpd = new Date($("#yearMonth").val()).setDate(
                                new Date($("#yearMonth").val()).getDate() + cont1
                            );

                            const tmpShowd = toStringByFormatting(new Date(tmpd));
                            const showDayday = parseInt(
                                tmpShowd.split('-')[0] + tmpShowd.split('-')[1] + tmpShowd.split('-')[2]
                            );

                            if (nowDayday >= showDayday) {
                                htmlsFoot += '<th>';
                                htmlsFoot += '<button type="button" class="btn btn-outline-secondary btn-xs">배차</button>';
                                htmlsFoot += '</th>';
                            } else {
                                htmlsFoot += '<th>';
                                htmlsFoot += '</th>';
                            }

                        } else {
                            htmlsFoot += '<th>';
                            htmlsFoot += '</th>';
                        }
                        cont1++;
                    }
                    htmlsFoot += '</tr>';
                }

                console.log(htmlsFoot);
                $('#tbAllo').html(htmls);
                $('#tfBtn').html(htmlsFoot);
                resolve();
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    });
}

function checkAllo(param) {

    const aaa = $(param).parent()[0];
    const aaa1 = $(aaa).children()[0];
    const nocun = $(aaa1);

    const bbb = $(param).children()[0];
    const thisDay = $(bbb).val();

    const ccc = $('#thDays').children()[2];
    const ccc1 = $(ccc)
        .children()
        .length;

    let numm = 0;
    for (let i = 0; i < ccc1; i++) {
        const tthh = $($(ccc).children()[i]).text();
        if (thisDay === tthh) {
            thddday = $($(ccc).children()[i]);
            numm = i + 1;
        }
    }

    const ddd = $('#thDays').children()[0];
    const day1 = $($(ddd).children()[numm]);
    const eee = $('#thDays').children()[1];
    const day2 = $($(eee).children()[parseInt(numm) - 1]);

    $('td').css('background', 'transparent');
    $('th').css('background', 'transparent');

    day1.css('background', '#fcf8e3');
    day2.css('background', '#fcf8e3');
    nocun.css('background', '#fcf8e3');
    $(param).css('background', '#fcf8e3');
}

function getAllo(param) {
    myModalRegAlloMd.show();
}

function fnEndDay() {
    const ddd = new Date($("#yearMonth").val());
    const dddP = ddd.setMonth(ddd.getMonth() + 1);

    let eee = new Date(ddd);
    eee = eee.setDate(eee.getDate() - 1);

    const dday1 = toStringByFormatting(new Date(eee));

    const endDay = dday1.split('-')[2];

    return endDay;
}