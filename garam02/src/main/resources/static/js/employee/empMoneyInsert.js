$(document).ready(function () {

    const nownownow = toStringByFormatting(new Date());

    if (nownownow.split('-')[2] >= 1 && nownownow.split('-')[2] <= 10) {
        const now = new Date();
        const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
        const fff = toStringByFormatting(oneMonthAgo);
        $('#yearmonthsMoney1').val(fff.split('-')[0] + '-' + fff.split('-')[1]);
        $('#yearmonthsMoney2').val(fff.split('-')[0] + '-' + fff.split('-')[1]);
    } else {
        $('#yearmonthsMoney1').val(
            nownownow.split('-')[0] + '-' + nownownow.split('-')[1]
        );
        $('#yearmonthsMoney2').val(
            nownownow.split('-')[0] + '-' + nownownow.split('-')[1]
        );
    }
});

function setYearMonthUp(params) {
    const getYM = $(params).val();
    const nowMonth = new Date(getYM.split('-')[0], getYM.split('-')[1] - 1, 1);

    const oneMonthAgo = new Date(nowMonth.setMonth(nowMonth.getMonth() + 1));
    const fff = toStringByFormatting(oneMonthAgo);
    $(params).val(fff.split('-')[0] + '-' + fff.split('-')[1]);
}

function setYearMonthDown(params) {
    const getYM = $(params).val();
    const nowMonth = new Date(getYM.split('-')[0], getYM.split('-')[1] - 1, 1);

    const oneMonthAgo = new Date(nowMonth.setMonth(nowMonth.getMonth() - 1));
    const fff = toStringByFormatting(oneMonthAgo);
    $(params).val(fff.split('-')[0] + '-' + fff.split('-')[1]);
}

$(document).on('click', '#fnUpMonth1', function () {
    setYearMonthUp('#yearmonthsMoney1');
    getEmpOperListCompa($('#emp-iidd').val());
});

$(document).on('click', '#fnDownMonth1', function () {
    setYearMonthDown('#yearmonthsMoney1');
    getEmpOperListCompa($('#emp-iidd').val());
});

$(document).on('change', '#yearmonthsMoney1', function () {
    getEmpOperListCompa($('#emp-iidd').val());
});

$(document).on('click', '#fnUpMonth2', function () {
    setYearMonthUp('#yearmonthsMoney2');
    $('#yearmonthsMoney1').val($('#yearmonthsMoney2').val());
    getEmpOperListCompa($('#emp-iidd').val());
});

$(document).on('click', '#fnDownMonth2', function () {
    setYearMonthDown('#yearmonthsMoney2');
    $('#yearmonthsMoney1').val($('#yearmonthsMoney2').val());
    getEmpOperListCompa($('#emp-iidd').val());
});

$(document).on('change', '#yearmonthsMoney2', function () {
    $('#yearmonthsMoney1').val($('#yearmonthsMoney2').val());
    getEmpOperListCompa($('#emp-iidd').val());
});

function getEmpOperListCompa(id) {
    const getYM = $('#yearmonthsMoney1').val();
    const nowMonth = new Date(getYM.split('-')[0], getYM.split('-')[1] - 1, 1);

    const oneMonthAgo = new Date(nowMonth.setMonth(nowMonth.getMonth() + 1));

    const yesterday = new Date(oneMonthAgo.setDate(oneMonthAgo.getDate() - 1));

    const stday = toStringByFormatting(
        new Date(oneMonthAgo.getFullYear(), oneMonthAgo.getMonth(), 1)
    );
    const endday = toStringByFormatting(yesterday); // 어제

    console.log("stday   " + stday);
    console.log("endday   " + endday);

    getEmpOperCnt().then(getEmpOper);

    function getEmpOperCnt() {
        return new Promise(function (resolve, reject) {

            const url = "/emp/empOperCnt";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };
            const params = {
                "stday": stday,
                "endday": endday,
                "operid": id,
                "opertrash": 1
            };
            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                dataType: "json",
                data: JSON.stringify(params),
                success: function (r) {
                    console.log("결과는??" + r[0]);
                    const map = new Map();

                    for (let i = 0; i < r.length; i++) {
                        map.set(r[i].opernum, r[i].cnt);
                        console.log("map  " + map);
                    }
                    console.log(map.size);
                    resolve(map);
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        });
    }

    function getEmpOper(result) {
        return new Promise(function (resolve, reject) {

            const url = "/emp/empOper";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };
            const params = {
                "stday": stday,
                "endday": endday,
                "operid": id,
                "opertrash": 1
            };
            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                dataType: "json",
                data: JSON.stringify(params),
                success: function (r) {
                    console.log("결과는??222" + r[0]);

                    let cnt = 0;
                    let check = '';
                    let htmls = '';
                    for (let i = 0; i < r.length; i++) {

                        if (result.get(r[i].opernum) > 1) {
                            if (r[i].opertype > 1) {
                                cnt++;
                                htmls += '<tr id="mTr-' + i + '" onclick="chTr(this.id)">';
                                htmls += '<td><input type="checkbox" class="mCH" id="mCh-' + i + '" onclick="chCh(this.i' +
                                        'd)"></td>';
                                htmls += '<td class="hideTh">' + r[i].rsvtseq + '</td>';
                                htmls += '<td class="hideTh">' + r[i].operseq + '</td>';
                                htmls += '<td class="hideTh">' + r[i].opernum + '</td>';
                                htmls += '<td class="hideTh">' + r[i].rsvt + '</td>';
                                htmls += '<td>' + (
                                    cnt
                                ) + '</td>';
                                htmls += '<td>' + r[i]
                                    .operday
                                    .split('-')[2] + '일</td>';
                                htmls += '<td>' + r[i].desty + '</td>';
                                htmls += '<td>' + AddComma(r[i].atlm) + '</td>';
                                htmls += '<td>편도</td>';
                                htmls += '<td>' + r[i].ctmname + '</td>';
                                if (r[i].operconfirm) {
                                    htmls += '<td>' + r[i].operconfirm + '</td>';
                                } else {
                                    htmls += '<td></td>';
                                }
                                htmls += '</tr>';
                            } else {
                                if (r[i].opernum != check) {
                                    cnt++;
                                    htmls += '<tr id="mTr-' + i + '" onclick="chTr(this.id)">';
                                    htmls += '<td><input type="checkbox" class="mCH" id="mCh-' + i + '" onclick="chCh(this.i' +
                                            'd)"></td>';
                                    htmls += '<td class="hideTh">' + r[i].rsvtseq + '</td>';
                                    htmls += '<td class="hideTh">' + r[i].operseq + '</td>';
                                    htmls += '<td class="hideTh">' + r[i].opernum + '</td>';
                                    htmls += '<td class="hideTh">' + r[i].rsvt + '</td>';
                                    htmls += '<td>' + (
                                        cnt
                                    ) + '</td>';
                                    htmls += '<td>' + r[i]
                                        .operday
                                        .split('-')[2] + '일</td>';
                                    htmls += '<td>' + r[i].desty + '</td>';
                                    htmls += '<td>' + AddComma(r[i].atlm) + '</td>';
                                    htmls += '<td>' + result.get(r[i].opernum) + '일</td>';
                                    htmls += '<td>' + r[i].ctmname + '</td>';
                                    if (r[i].operconfirm) {
                                        htmls += '<td>' + r[i].operconfirm + '</td>';
                                    } else {
                                        htmls += '<td></td>';
                                    }
                                    htmls += '</tr>';
                                }
                            }
                        } else {

                            if (r[i].opertype > 1) {
                                cnt++;
                                htmls += '<tr id="mTr-' + i + '" onclick="chTr(this.id)">';
                                htmls += '<td><input type="checkbox" class="mCH" id="mCh-' + i + '" onclick="chCh(this.i' +
                                        'd)"></td>';
                                htmls += '<td class="hideTh">' + r[i].rsvtseq + '</td>';
                                htmls += '<td class="hideTh">' + r[i].operseq + '</td>';
                                htmls += '<td class="hideTh">' + r[i].opernum + '</td>';
                                htmls += '<td class="hideTh">' + r[i].rsvt + '</td>';
                                htmls += '<td>' + (
                                    cnt
                                ) + '</td>';
                                htmls += '<td>' + r[i]
                                    .operday
                                    .split('-')[2] + '일</td>';
                                htmls += '<td>' + r[i].desty + '</td>';
                                htmls += '<td>' + AddComma(r[i].atlm) + '</td>';
                                htmls += '<td>편도</td>';
                                htmls += '<td>' + r[i].ctmname + '</td>';
                                if (r[i].operconfirm) {
                                    htmls += '<td>' + r[i].operconfirm + '</td>';
                                } else {
                                    htmls += '<td></td>';
                                }
                                htmls += '</tr>';
                            } else {
                                cnt++;
                                htmls += '<tr id="mTr-' + i + '" onclick="chTr(this.id)">';
                                htmls += '<td><input type="checkbox" class="mCH" id="mCh-' + i + '" onclick="chCh(this.i' +
                                        'd)"></td>';
                                htmls += '<td class="hideTh">' + r[i].rsvtseq + '</td>';
                                htmls += '<td class="hideTh">' + r[i].operseq + '</td>';
                                htmls += '<td class="hideTh">' + r[i].opernum + '</td>';
                                htmls += '<td class="hideTh">' + r[i].rsvt + '</td>';
                                htmls += '<td>' + (
                                    cnt
                                ) + '</td>';
                                htmls += '<td>' + r[i]
                                    .operday
                                    .split('-')[2] + '일</td>';
                                htmls += '<td>' + r[i].desty + '</td>';
                                htmls += '<td>' + AddComma(r[i].atlm) + '</td>';
                                htmls += '<td>당일</td>';
                                htmls += '<td>' + r[i].ctmname + '</td>';
                                if (r[i].operconfirm) {
                                    htmls += '<td>' + r[i].operconfirm + '</td>';
                                } else {
                                    htmls += '<td></td>';
                                }
                                htmls += '</tr>';
                            }
                        }
                        check = r[i].opernum;
                    }
                    $('#emp-oper-money-tb').html(htmls);
                    $('#bgoper1').text(cnt);
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        });
    }
}

function chTr(id) {
    const iidd = '#' + id;
    const asd = $(iidd)
        .children()
        .children()
        .attr('id');
    const iiiddd = '#' + asd;

    if ($(iiiddd).is(':checked')) {
        $(iiiddd).prop("checked", false);
    } else {
        $(iiiddd).prop("checked", true);
    }

    chInDay(iiiddd);

    checkChAll();
}
function chCh(id) {
    const iidd = '#' + id;

    if ($(iidd).is(':checked')) {
        $(iidd).prop("checked", false);
    } else {
        $(iidd).prop("checked", true);
    }

    chInDay(iidd);

    checkChAll();
}

function checkChAll() {

    let check = 1;

    const aaaa = $('#mCh-All')
        .parent()
        .parent()
        .parent()
        .next()
        .children();

    for (let i = 0; i < aaaa.length; i++) {
        const bbbb = $(aaaa[i]);
        const cccc = $(bbbb.children().children());
        if ($(cccc).is(':checked')) {
            check = check * 1;
        } else {
            check = check * 0;
        }
    }

    if (check > 0) {
        $('#mCh-All').prop("checked", true);
    } else {
        $('#mCh-All').prop("checked", false);
    }
}

function chInDay(params) {
    if ($(params).is(':checked')) {
        $(params)
            .parent()
            .next()
            .next()
            .next()
            .next()
            .next()
            .next()
            .next()
            .next()
            .next()
            .next()
            .next()
            .text($('#yearmonthsMoney2').val());
    } else {
        $(params)
            .parent()
            .next()
            .next()
            .next()
            .next()
            .next()
            .next()
            .next()
            .next()
            .next()
            .next()
            .next()
            .text('');
    }
}

$(document).on('change', '#mCh-All', function () {
    const aaaa = $(this)
        .parent()
        .parent()
        .parent()
        .next()
        .children();

    if ($(this).is(':checked')) {
        for (let i = 0; i < aaaa.length; i++) {
            const bbbb = $(aaaa[i]);
            const cccc = $(bbbb.children().children());
            $(cccc).prop("checked", true);
            chInDay(cccc);
        }
    } else {
        for (let i = 0; i < aaaa.length; i++) {
            const bbbb = $(aaaa[i]);
            const cccc = $(bbbb.children().children());
            $(cccc).prop("checked", false);
            chInDay(cccc);
        }
    }
});

$(document).on('click', '#mdINM', function () {
    $('#md-inM').modal('show');
});

$(document).on('keydown', '.input-M', function (eInner) {
    const tabi = $(this).attr('tabindex');
    var keyValue = eInner.which;
    if (keyValue == 13) {
        switch (tabi) {
            case "1":
                const getYM = $('#yearmonthsMoney2').val();
                const nowMonth = new Date(getYM.split('-')[0], getYM.split('-')[1] - 1, 1);

                const oneMonthAgo = new Date(nowMonth.setMonth(nowMonth.getMonth() + 1));

                const yesterday = new Date(oneMonthAgo.setDate(oneMonthAgo.getDate() - 1));

                const endday = toStringByFormatting(yesterday); // 어제

                const lastD = endday.split('-')[2];

                if (parseInt($(this).val()) > 0 && parseInt($(this).val()) <= lastD) {
                    $('[tabindex=2]').focus();
                } else {
                    const ddday = endday.split('-')[1] + '월은 ' + lastD + '까지입니다.'
                    alert("날짜를 확인해주세요.\n\n" + ddday);
                    $(this).val('');
                }
                break;
            case "2":
                switch ($(this).val()) {
                    case "1":
                        $(this).val('식대');
                        $('#inp-cont2').val('경비');
                        break;
                    case "2":
                        $(this).val('주차비');
                        $('#inp-cont2').val('경비');
                        break;
                    case "3":
                        $(this).val('세차비');
                        $('#inp-cont2').val('경비');
                        break;
                }

                $('[tabindex=3]').focus();
                break;
            case "3":
                insertInM();
                $('[tabindex=1]').focus();
                break;
        }

    } else if (keyValue == 37) {
        switch (tabi) {
            case "1":
                $('[tabindex=3]').focus();
                break;
            case "2":
                $('[tabindex=1]').focus();
                break;
            case "3":
                $('[tabindex=2]').focus();
                break;
        }
    } else if (keyValue == 39) {
        switch (tabi) {
            case "1":
                $('[tabindex=2]').focus();
                break;
            case "2":
                $('[tabindex=3]').focus();
                break;
            case "3":
                $('[tabindex=1]').focus();
                break;
        }
    }
});

function insertInM() {
    if ($('#inp-cont1').val() && $('#inp-cont2').val() && $('#inp-cont3').val() && $('#inp-cont4').val()) {
        const cccc = $('#inp-cont4')
            .val()
            .replaceAll(',', '');
        let conttt4 = '';

        switch ($('#inp-cont4').val().length) {
            case 1:
            case 2:
                if (cccc == '0') {
                    conttt4 = '0';
                } else {
                    conttt4 = cccc + "000";
                }
                break;
            default:
                conttt4 = cccc;
                break;
        }

        let size = 0;
        if ($('#emp-in-money-tb').children().length > 0) {
            size = parseInt($('#emp-in-money-tb').children().length) + 1;
        } else {
            size = 1;
        }

        let conttt1 = $('#inp-cont1').val();
        let conttt2 = $('#inp-cont2').val();
        let conttt3 = $('#inp-cont3').val();

        let httmll = '';
        httmll += '<tr>';
        httmll += '<td class="hideTh"></td>';
        httmll += '<td class="hideTh"></td>';
        httmll += '<td class="hideTh"></td>';
        httmll += '<td class="hideTh"></td>';
        httmll += '<td>' + size + '</td>';
        httmll += '<td>' + conttt1 + '일</td>';
        httmll += '<td>' + conttt2 + '</td>';
        httmll += '<td>' + conttt3 + '</td>';
        httmll += '<td>' + AddComma(conttt4) + '</td>';
        httmll += '<td class="cuor-p" onclick="delTb(this)">';
        httmll += '<i class="fas fa-minus-square"></i>';
        httmll += '</td>';
        httmll += '</tr>';

        $('#emp-in-money-tb').append(httmll);
    } else {
        let st = '';
        if (!$('#inp-cont1').val()) {
            st += '지급날짜';
        }
        if (!$('#inp-cont3').val()) {
            if (st.length > 0) {
                st += ', 내용'
            } else {
                st += '지급내용';
            }
        }
        if (!$('#inp-cont4').val()) {
            if (st.length > 0) {
                st += ', 금액'
            } else {
                st += '지급금액';
            }
        }
        alert(st + '을 입력해주세요.');
    }
}

$(document).on('click', '#insert-inM', function () {
    insertInM();
});

function delTbInM() {
    if (confirm('지급내역을 모두 삭제하겠습니까?')) {
        $('#emp-in-money-tb')
            .children()
            .remove();
    }
}
$(document).on('keydown', '.output-M', function (eInner) {
    const tabi = $(this).attr('tabindex');
    var keyValue = eInner.which;
    if (keyValue == 13) {
        switch (tabi) {
            case "11":
                const getYM = $('#yearmonthsMoney2').val();
                const nowMonth = new Date(getYM.split('-')[0], getYM.split('-')[1] - 1, 1);

                const oneMonthAgo = new Date(nowMonth.setMonth(nowMonth.getMonth() + 1));

                const yesterday = new Date(oneMonthAgo.setDate(oneMonthAgo.getDate() - 1));

                const endday = toStringByFormatting(yesterday); // 어제

                const lastD = endday.split('-')[2];

                if (parseInt($(this).val()) > 0 && parseInt($(this).val()) <= lastD) {
                    $('[tabindex=12]').focus();
                } else {
                    const ddday = endday.split('-')[1] + '월은 ' + lastD + '까지입니다.'
                    alert("날짜를 확인해주세요.\n\n" + ddday);
                    $(this).val('');
                }
                break;
            case "12":
                switch ($(this).val()) {
                    case "1":
                        $(this).val('과태료');
                        $('#inp-cont12').val('기타');
                        break;
                }

                $('[tabindex=13]').focus();
                break;
            case "13":
                insertOutM();
                $('[tabindex=11]').focus();
                break;
        }

    } else if (keyValue == 37) {
        switch (tabi) {
            case "11":
                $('[tabindex=13]').focus();
                break;
            case "12":
                $('[tabindex=11]').focus();
                break;
            case "13":
                $('[tabindex=12]').focus();
                break;
        }
    } else if (keyValue == 39) {
        switch (tabi) {
            case "11":
                $('[tabindex=12]').focus();
                break;
            case "12":
                $('[tabindex=13]').focus();
                break;
            case "13":
                $('[tabindex=11]').focus();
                break;
        }
    }
});

function insertOutM() {
    if ($('#inp-cont11').val() && $('#inp-cont12').val() && $('#inp-cont13').val() && $('#inp-cont14').val()) {
        const cccc = $('#inp-cont14')
            .val()
            .replaceAll(',', '');
        let conttt4 = '';

        switch ($('#inp-cont14').val().length) {
            case 1:
            case 2:
                if (cccc == '0') {
                    conttt4 = '0';
                } else {
                    conttt4 = cccc + "000";
                }
                break;
            default:
                conttt4 = cccc;
                break;
        }

        let size = 0;
        if ($('#emp-out-money-tb').children().length > 0) {
            size = parseInt($('#emp-out-money-tb').children().length) + 1;
        } else {
            size = 1;
        }

        let conttt1 = $('#inp-cont11').val();
        let conttt2 = $('#inp-cont12').val();
        let conttt3 = $('#inp-cont13').val();

        let httmll = '';
        httmll += '<tr>';
        httmll += '<td class="hideTh"></td>';
        httmll += '<td class="hideTh"></td>';
        httmll += '<td class="hideTh"></td>';
        httmll += '<td class="hideTh"></td>';
        httmll += '<td>' + size + '</td>';
        httmll += '<td>' + conttt1 + '일</td>';
        httmll += '<td>' + conttt2 + '</td>';
        httmll += '<td>' + conttt3 + '</td>';
        httmll += '<td>' + AddComma(conttt4) + '</td>';
        httmll += '<td class="cuor-p" onclick="delTb(this)">';
        httmll += '<i class="fas fa-minus-square"></i>';
        httmll += '</td>';
        httmll += '</tr>';

        $('#emp-out-money-tb').append(httmll);
    } else {
        let st = '';
        if (!$('#inp-cont11').val()) {
            st += '공제날짜';
        }
        if (!$('#inp-cont13').val()) {
            if (st.length > 0) {
                st += ', 내용'
            } else {
                st += '공제내용';
            }
        }
        if (!$('#inp-cont14').val()) {
            if (st.length > 0) {
                st += ', 금액'
            } else {
                st += '공제금액';
            }
        }
        alert(st + '을 입력해주세요.');
    }
}

$(document).on('click', '#insert-outM', function () {
    insertOutM();
});

function delTbInM() {
    if (confirm('공제내역을 모두 삭제하겠습니까?')) {
        $('#emp-out-money-tb')
            .children()
            .remove();
    }
}

function delTb(params) {
    $(params)
        .parent()
        .remove();
}