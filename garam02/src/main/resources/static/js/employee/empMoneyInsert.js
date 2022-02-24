$(document).ready(function () {
    $("#inp-cont1").attr("disabled", true);
    $("#inp-cont2").attr("disabled", true);
    $("#inp-cont3").attr("disabled", true);
    $("#inp-cont4").attr("disabled", true);

    $("#inp-cont11").attr("disabled", true);
    $("#inp-cont12").attr("disabled", true);
    $("#inp-cont13").attr("disabled", true);
    $("#inp-cont14").attr("disabled", true);

    $("#kukmM").attr("disabled", true);
    $("#gunmM").attr("disabled", true);
    $("#gomM").attr("disabled", true);
    $("#sanmM").attr("disabled", true);

    $("#in-baseM").attr("disabled", true);

    $("#insert-outM").prop("disabled", true);
    $("#insert-inM").prop("disabled", true);

    $("#yesSave").attr("disabled", true);
    $("#noSave").attr("disabled", true);

    $("#fnDownMonth1").attr("disabled", true);
    $("#fnUpMonth1").attr("disabled", true);
    $("#fnDownMonth2").attr("disabled", true);
    $("#fnUpMonth2").attr("disabled", true);

    $("#yearmonthsMoney1").attr("disabled", true);
    $("#yearmonthsMoney2").attr("disabled", true);

    const nownownow = toStringByFormatting(new Date());

    if (nownownow.split('-')[2] >= 1 && nownownow.split('-')[2] <= 10) {
        const now = new Date();
        const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
        const fff = toStringByFormatting(oneMonthAgo);
        $('#yearmonthsMoney1').val(fff.split('-')[0] + '-' + fff.split('-')[1]);
        $('#yearmonthsMoney2').val(fff.split('-')[0] + '-' + fff.split('-')[1]);
        $('#yearmonthsMoney1').attr('max', fff.split('-')[0] + '-' + fff.split('-')[1]);
        $('#yearmonthsMoney2').attr('max', fff.split('-')[0] + '-' + fff.split('-')[1]);
    } else {
        $('#yearmonthsMoney1').val(
            nownownow.split('-')[0] + '-' + nownownow.split('-')[1]
        );
        $('#yearmonthsMoney2').val(
            nownownow.split('-')[0] + '-' + nownownow.split('-')[1]
        );
        $('#yearmonthsMoney1').attr(
            'max',
            nownownow.split('-')[0] + '-' + nownownow.split(
                '-'
            )[1]
        );
        $('#yearmonthsMoney2').attr(
            'max',
            nownownow.split('-')[0] + '-' + nownownow.split(
                '-'
            )[1]
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
    const nownownow = toStringByFormatting(new Date());
    const nownownow2 = $('#yearmonthsMoney1').val();

    const now1 = parseInt(nownownow.split('-')[0] + nownownow.split('-')[1]);
    const now2 = parseInt(nownownow2.split('-')[0] + nownownow2.split('-')[1]);

    if (now2 < now1) {
        setYearMonthUp('#yearmonthsMoney1');
        getEmpOperListCompa($('#emp-iidd').val());
    } else {
        alert("운행 월을 확인해주세요.");
    }
});

$(document).on('click', '#fnDownMonth1', function () {
    setYearMonthDown('#yearmonthsMoney1');
    getEmpOperListCompa($('#emp-iidd').val());
});

$(document).on('change', '#yearmonthsMoney1', function () {
    getEmpOperListCompa($('#emp-iidd').val());
});

$(document).on('click', '#fnUpMonth2', function () {
    const nownownow = toStringByFormatting(new Date());
    const nownownow2 = $('#yearmonthsMoney2').val();

    const now1 = parseInt(nownownow.split('-')[0] + nownownow.split('-')[1]);
    const now2 = parseInt(nownownow2.split('-')[0] + nownownow2.split('-')[1]);

    if (now2 < now1) {
        setYearMonthUp('#yearmonthsMoney2');
        $('#yearmonthsMoney1').val($('#yearmonthsMoney2').val());
        getEmpOperListCompa($('#emp-iidd').val());
    } else {
        alert("급여 지급 월을 확인해주세요.");
    }
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

    $("#inp-cont1").removeAttr("disabled");
    $("#inp-cont2").removeAttr("disabled");
    $("#inp-cont3").removeAttr("disabled");
    $("#inp-cont4").removeAttr("disabled");

    $("#inp-cont11").removeAttr("disabled");
    $("#inp-cont12").removeAttr("disabled");
    $("#inp-cont13").removeAttr("disabled");
    $("#inp-cont14").removeAttr("disabled");

    $("#kukmM").removeAttr("disabled");
    $("#gunmM").removeAttr("disabled");
    $("#gomM").removeAttr("disabled");
    $("#sanmM").removeAttr("disabled");

    $("#in-baseM").removeAttr("disabled");

    $("#insert-inM").removeAttr("disabled");
    $("#insert-outM").removeAttr("disabled");

    $("#insert-outM").prop("disabled", false);
    $("#insert-inM").prop("disabled", false);

    $("#yesSave").removeAttr("disabled");
    $("#noSave").removeAttr("disabled");

    $("#fnDownMonth1").attr("disabled", false);
    $("#fnUpMonth1").attr("disabled", false);
    $("#fnDownMonth2").attr("disabled", false);
    $("#fnUpMonth2").attr("disabled", false);

    $("#yearmonthsMoney1").attr("disabled", false);
    $("#yearmonthsMoney2").attr("disabled", false);

    $('#inForm')[0].reset();
    $('#outForm')[0].reset();

    getEmpOperCnt()
        .then(getEmpOper)
        .then(getEmpBaseM);

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
                    const map = new Map();

                    for (let i = 0; i < r.length; i++) {
                        map.set(r[i].opernum, r[i].cnt);
                    }
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

                    let cnt = 0;
                    let check = '';
                    let htmls = '';
                    if (r.length > 0) {

                        for (let i = 0; i < r.length; i++) {
                            console.log("operconfirm   " + r[i].operconfirm);
                            switch (r[i].opertrash) {
                                case 0:
                                    if (result.get(r[i].opernum) > 1) {
                                        if (r[i].opertype > 1) {
                                            cnt++;
                                            htmls += '<tr id="mTr-' + i + '" onclick="chTr(this.id)">';
                                            htmls += '<td><input type="checkbox" class="mCH" id="mCh-' + i + '" onclick="chCh(this.i' +
                                                    'd)" checked="checked" disabled="disabled"></td>';
                                            htmls += '<td class="hideTh">' + r[i].opercar + '</td>';
                                            htmls += '<td class="hideTh">' + r[i].opertype + '</td>';
                                            htmls += '<td class="hideTh">' + r[i].opernum + '</td>';
                                            htmls += '<td class="hideTh">' + r[i].operno + '</td>';
                                            htmls += '<td>' + (
                                                cnt
                                            ) + '</td>';
                                            htmls += '<td>' + r[i]
                                                .operday
                                                .split('-')[2] + '일</td>';
                                            htmls += '<td>' + r[i].desty + '</td>';
                                            htmls += '<td class="tdRight">' + AddComma(r[i].atlm) + '</td>';
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
                                                        'd)" checked="checked" disabled="disabled"></td>';
                                                htmls += '<td class="hideTh">' + r[i].opercar + '</td>';
                                                htmls += '<td class="hideTh">' + r[i].opertype + '</td>';
                                                htmls += '<td class="hideTh">' + r[i].opernum + '</td>';
                                                htmls += '<td class="hideTh">' + r[i].operno + '</td>';
                                                htmls += '<td>' + (
                                                    cnt
                                                ) + '</td>';
                                                htmls += '<td>' + r[i]
                                                    .operday
                                                    .split('-')[2] + '일</td>';
                                                htmls += '<td>' + r[i].desty + '</td>';
                                                htmls += '<td class="tdRight">' + AddComma(r[i].atlm) + '</td>';
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
                                                    'd)" checked="checked" disabled="disabled"></td>';
                                            htmls += '<td class="hideTh">' + r[i].opercar + '</td>';
                                            htmls += '<td class="hideTh">' + r[i].opertype + '</td>';
                                            htmls += '<td class="hideTh">' + r[i].opernum + '</td>';
                                            htmls += '<td class="hideTh">' + r[i].operno + '</td>';
                                            htmls += '<td>' + (
                                                cnt
                                            ) + '</td>';
                                            htmls += '<td>' + r[i]
                                                .operday
                                                .split('-')[2] + '일</td>';
                                            htmls += '<td>' + r[i].desty + '</td>';
                                            htmls += '<td class="tdRight">' + AddComma(r[i].atlm) + '</td>';
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
                                                    'd)" checked="checked" disabled="disabled"></td>';
                                            htmls += '<td class="hideTh">' + r[i].opercar + '</td>';
                                            htmls += '<td class="hideTh">' + r[i].opertype + '</td>';
                                            htmls += '<td class="hideTh">' + r[i].opernum + '</td>';
                                            htmls += '<td class="hideTh">' + r[i].operno + '</td>';
                                            htmls += '<td>' + (
                                                cnt
                                            ) + '</td>';
                                            htmls += '<td>' + r[i]
                                                .operday
                                                .split('-')[2] + '일</td>';
                                            htmls += '<td>' + r[i].desty + '</td>';
                                            htmls += '<td class="tdRight">' + AddComma(r[i].atlm) + '</td>';
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
                                    break;
                                case 1:
                                    if (result.get(r[i].opernum) > 1) {
                                        if (r[i].opertype > 1) {
                                            cnt++;
                                            htmls += '<tr id="mTr-' + i + '" onclick="chTr(this.id)">';
                                            htmls += '<td><input type="checkbox" class="mCH" id="mCh-' + i + '" onclick="chCh(this.i' +
                                                    'd)"></td>';
                                            htmls += '<td class="hideTh">' + r[i].opercar + '</td>';
                                            htmls += '<td class="hideTh">' + r[i].opertype + '</td>';
                                            htmls += '<td class="hideTh">' + r[i].opernum + '</td>';
                                            htmls += '<td class="hideTh">' + r[i].operno + '</td>';
                                            htmls += '<td>' + (
                                                cnt
                                            ) + '</td>';
                                            htmls += '<td>' + r[i]
                                                .operday
                                                .split('-')[2] + '일</td>';
                                            htmls += '<td>' + r[i].desty + '</td>';
                                            htmls += '<td class="tdRight">' + AddComma(r[i].atlm) + '</td>';
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
                                                htmls += '<td class="hideTh">' + r[i].opercar + '</td>';
                                                htmls += '<td class="hideTh">' + r[i].opertype + '</td>';
                                                htmls += '<td class="hideTh">' + r[i].opernum + '</td>';
                                                htmls += '<td class="hideTh">' + r[i].operno + '</td>';
                                                htmls += '<td>' + (
                                                    cnt
                                                ) + '</td>';
                                                htmls += '<td>' + r[i]
                                                    .operday
                                                    .split('-')[2] + '일</td>';
                                                htmls += '<td>' + r[i].desty + '</td>';
                                                htmls += '<td class="tdRight">' + AddComma(r[i].atlm) + '</td>';
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
                                            htmls += '<td class="hideTh">' + r[i].opercar + '</td>';
                                            htmls += '<td class="hideTh">' + r[i].opertype + '</td>';
                                            htmls += '<td class="hideTh">' + r[i].opernum + '</td>';
                                            htmls += '<td class="hideTh">' + r[i].operno + '</td>';
                                            htmls += '<td>' + (
                                                cnt
                                            ) + '</td>';
                                            htmls += '<td>' + r[i]
                                                .operday
                                                .split('-')[2] + '일</td>';
                                            htmls += '<td>' + r[i].desty + '</td>';
                                            htmls += '<td class="tdRight">' + AddComma(r[i].atlm) + '</td>';
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
                                            htmls += '<td class="hideTh">' + r[i].opercar + '</td>';
                                            htmls += '<td class="hideTh">' + r[i].opertype + '</td>';
                                            htmls += '<td class="hideTh">' + r[i].opernum + '</td>';
                                            htmls += '<td class="hideTh">' + r[i].operno + '</td>';
                                            htmls += '<td>' + (
                                                cnt
                                            ) + '</td>';
                                            htmls += '<td>' + r[i]
                                                .operday
                                                .split('-')[2] + '일</td>';
                                            htmls += '<td>' + r[i].desty + '</td>';
                                            htmls += '<td class="tdRight">' + AddComma(r[i].atlm) + '</td>';
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
                                    break;
                                case 2:
                                    if (result.get(r[i].opernum) > 1) {
                                        if (r[i].opertype > 1) {
                                            cnt++;
                                            htmls += '<tr id="mTr-' + i + '" onclick="chTr(this.id)">';
                                            htmls += '<td><input type="checkbox" class="mCH" id="mCh-' + i + '" onclick="chCh(this.i' +
                                                    'd)" checked="checked"></td>';
                                            htmls += '<td class="hideTh">' + r[i].opercar + '</td>';
                                            htmls += '<td class="hideTh">' + r[i].opertype + '</td>';
                                            htmls += '<td class="hideTh">' + r[i].opernum + '</td>';
                                            htmls += '<td class="hideTh">' + r[i].operno + '</td>';
                                            htmls += '<td>' + (
                                                cnt
                                            ) + '</td>';
                                            htmls += '<td>' + r[i]
                                                .operday
                                                .split('-')[2] + '일</td>';
                                            htmls += '<td>' + r[i].desty + '</td>';
                                            htmls += '<td class="tdRight">' + AddComma(r[i].atlm) + '</td>';
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
                                                        'd)" checked="checked"></td>';
                                                htmls += '<td class="hideTh">' + r[i].opercar + '</td>';
                                                htmls += '<td class="hideTh">' + r[i].opertype + '</td>';
                                                htmls += '<td class="hideTh">' + r[i].opernum + '</td>';
                                                htmls += '<td class="hideTh">' + r[i].operno + '</td>';
                                                htmls += '<td>' + (
                                                    cnt
                                                ) + '</td>';
                                                htmls += '<td>' + r[i]
                                                    .operday
                                                    .split('-')[2] + '일</td>';
                                                htmls += '<td>' + r[i].desty + '</td>';
                                                htmls += '<td class="tdRight">' + AddComma(r[i].atlm) + '</td>';
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
                                                    'd)" checked="checked"></td>';
                                            htmls += '<td class="hideTh">' + r[i].opercar + '</td>';
                                            htmls += '<td class="hideTh">' + r[i].opertype + '</td>';
                                            htmls += '<td class="hideTh">' + r[i].opernum + '</td>';
                                            htmls += '<td class="hideTh">' + r[i].operno + '</td>';
                                            htmls += '<td>' + (
                                                cnt
                                            ) + '</td>';
                                            htmls += '<td>' + r[i]
                                                .operday
                                                .split('-')[2] + '일</td>';
                                            htmls += '<td>' + r[i].desty + '</td>';
                                            htmls += '<td class="tdRight">' + AddComma(r[i].atlm) + '</td>';
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
                                                    'd)" checked="checked"></td>';
                                            htmls += '<td class="hideTh">' + r[i].opercar + '</td>';
                                            htmls += '<td class="hideTh">' + r[i].opertype + '</td>';
                                            htmls += '<td class="hideTh">' + r[i].opernum + '</td>';
                                            htmls += '<td class="hideTh">' + r[i].operno + '</td>';
                                            htmls += '<td>' + (
                                                cnt
                                            ) + '</td>';
                                            htmls += '<td>' + r[i]
                                                .operday
                                                .split('-')[2] + '일</td>';
                                            htmls += '<td>' + r[i].desty + '</td>';
                                            htmls += '<td class="tdRight">' + AddComma(r[i].atlm) + '</td>';
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
                                    break;

                                default:
                                    break;
                            }

                            check = r[i].opernum;
                        }
                    } else {
                        htmls = `<tr><td colspan="12">운행정보없음</td></tr>`;
                    }
                    $('#emp-oper-money-tb').html(htmls);
                    $('#bgoper1').text(cnt);
                    checkChAll();
                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        });
    }
    function getEmpBaseM(result) {
        return new Promise(function (resolve, reject) {

            const url = "/emp/empBaseMoney";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };
            const params = {
                "id": id
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                dataType: "json",
                data: JSON.stringify(params),
                success: function (r) {
                    console.log("baseM   " + r[0].basem)
                    console.log("kukM   " + r[0].kukm)
                    console.log("gunM   " + r[0].gunm)
                    console.log("goM   " + r[0].gom)
                    console.log("sanM   " + r[0].sanm)

                    $('#in-baseM').val(AddComma(r[0].basem));
                    $('#kukmM').val(AddComma(r[0].kukm));
                    $('#gunmM').val(AddComma(r[0].gunm));
                    $('#gomM').val(AddComma(r[0].gom));
                    $('#sanmM').val(AddComma(r[0].sanm));
                    sumAllpro();
                }
            })
        })
    }
}

$(document).on('change', '#in-baseM', function () {
    sumAllpro();
});

function chTr(id) {
    const iidd = '#' + id;
    const asd = $(iidd)
        .children()
        .children()
        .attr('id');
    const iiiddd = '#' + asd;

    let trta = 0;

    if ($(iiiddd).is(':checked')) {
        $(iiiddd).prop("checked", false);
        trta = 1;
    } else {
        $(iiiddd).prop("checked", true);
        trta = 2;
    }

    chInDay(iiiddd);
    const iiidddddd = $('#emp-iidd').val();
    const carcarcar = $(iiiddd)
        .parent()
        .next()
        .text();
    const typetype = $(iiiddd)
        .parent()
        .next()
        .next()
        .text();
    const opnumnumnum = $(iiiddd)
        .parent()
        .next()
        .next()
        .next()
        .text();
    const opnononono = $(iiiddd)
        .parent()
        .next()
        .next()
        .next()
        .next()
        .text();
    const daydayday = $(iiiddd)
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
        .text();
    updateOper(
        iiidddddd,
        carcarcar,
        opnumnumnum,
        typetype,
        opnononono,
        daydayday,
        trta
    );

    checkChAll();
}
function chCh(id) {
    const iidd = '#' + id;
    if ($(iidd).is(':checked')) {
        $(iidd).prop("checked", false);
    } else {
        $(iidd).prop("checked", true);
    }
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
    sumAllpro();
}

function updateOper(id, car, opernum, opertype, operno, day, trash) {
    console.log("id   " + id);
    console.log("car   " + car);
    console.log("opernum   " + opernum);
    console.log("opertype   " + opertype);
    console.log("operno   " + operno);
    console.log("day   " + day);
    console.log("trash   " + trash);

    if (!day) {
        day = null;
    }

    const url = "/emp/empOperUp";
    const headers = {
        "Content-Type": "application/json",
        "X-HTTP-Method-Override": "POST"
    };
    const params = {
        "opernum": opernum,
        "operno": operno,
        "opertype": opertype,
        "operid": id,
        "opercar": car,
        "operconfirm": day,
        "opertrash": trash
    };
    $.ajax({
        url: url,
        type: "POST",
        headers: headers,
        dataType: "json",
        data: JSON.stringify(params),
        success: function (r) {
            console.log("결론은?   " + r);
        },
        error: (jqXHR) => {
            loginSession(jqXHR.status);
        }
    })
}

function sumAllpro() {
    operMSet()
        .then(sumInList)
        .then(sumOutList)
        .then(sumIN)
        .then(sumOut)
        .then(sumAll);
    function operMSet() {
        return new Promise(function (resolve, reject) {
            let money = 0;

            const aaaa = $('#mCh-All')
                .parent()
                .parent()
                .parent()
                .next()
                .children();

            for (let i = 0; i < aaaa.length; i++) {
                const bbbb = $(aaaa[i]);
                const cccc = $(bbbb.children().children());
                const dddd = (
                    cccc.parent().next().next().next().next().next().next().next().next().text()
                ).replaceAll(',', '');
                if ($(cccc).is(':checked')) {
                    money = money + parseInt(dddd);
                }
            }
            $('#in-operM').text(AddComma(money * opt[0].oper));
            resolve();
        })
    }
    function sumInList(result) {
        return new Promise(function (resolve, reject) {
            const aaa = $('#emp-in-money-tb')
                .children()
                .length;
            console.log("ggggggggg   " + aaa);
            let sumGy = 0;
            let sumGisu = 0;
            let sumGitaa = 0;

            for (let i = 0; i < aaa; i++) {
                const ttrr1 = $('#emp-in-money-tb').children()[i];
                const ttdd11 = $(ttrr1)
                    .children()
                    .next()
                    .next()
                    .next()
                    .next()
                    .next()
                    .next()[0];
                const ttdd22 = $(ttrr1)
                    .children()
                    .next()
                    .next()
                    .next()
                    .next()
                    .next()
                    .next()
                    .next()
                    .next();
                console.log("llll  " + $(ttdd11).text());

                switch ($(ttdd11).text()) {
                    case "경비":
                        const inpp1 = $(ttdd22).text();
                        sumGy = sumGy + parseInt(inpp1.replaceAll(',', ''));
                        break;
                    case "수당":
                        const inpp2 = $(ttdd22).text();
                        sumGisu = sumGisu + parseInt(inpp2.replaceAll(',', ''));
                        break;
                    case "기타":
                        const inpp3 = $(ttdd22).text();
                        sumGitaa = sumGitaa + parseInt(inpp3.replaceAll(',', ''));
                        break;
                }
            }
            $('#in-goM').text(AddComma(sumGy));
            $('#in-gisuM').text(AddComma(sumGisu));
            $('#in-gitaM').text(AddComma(sumGitaa));

            resolve();
        })
    }
    function sumOutList(result) {
        return new Promise(function (resolve, reject) {
            const aaa = $('#emp-out-money-tb')
                .children()
                .length;
            console.log("ggggggggg   " + aaa);
            let sumBo = 0;
            let sumGita = 0;
            let sumSae = 0;
            for (let i = 0; i < 4; i++) {
                const ttrr = $('#emp-out-money-tb').children()[i];
                const ttdd = $(ttrr)
                    .children()
                    .next()
                    .next()
                    .next()
                    .next()
                    .next()
                    .next()
                    .next()
                    .next()
                    .children()[0];
                const inpp = $(ttdd).val();
                sumBo = sumBo + parseInt(inpp.replaceAll(',', ''));
            }

            for (let i = 4; i < aaa; i++) {
                const ttrr = $('#emp-out-money-tb').children()[i];
                const ttdd1 = $(ttrr)
                    .children()
                    .next()
                    .next()
                    .next()
                    .next()
                    .next()
                    .next()[0];
                const ttdd2 = $(ttrr)
                    .children()
                    .next()
                    .next()
                    .next()
                    .next()
                    .next()
                    .next()
                    .next()
                    .next();
                console.log("llll  " + $(ttdd1).text());

                switch ($(ttdd1).text()) {
                    case "기타":
                        const inpp1 = $(ttdd2).text();
                        sumGita = sumGita + parseInt(inpp1.replaceAll(',', ''));
                        break;
                    case "세금":
                        const inpp2 = $(ttdd2).text();
                        sumSae = sumSae + parseInt(inpp2.replaceAll(',', ''));
                        break;
                }
                console.log("sumGita   " + sumGita);
                console.log("sumSae   " + sumSae);
            }
            $('#out-sadea').text(AddComma(sumBo));
            $('#out-gitaM').text(AddComma(sumGita));
            $('#out-saeM').text(AddComma(sumSae));

            resolve();
        })
    }
    function sumIN(result) {
        return new Promise(function (resolve, reject) {

            let base = ($('#in-baseM').val()).replaceAll(',', '');
            let oper = ($('#in-operM').text()).replaceAll(',', '');
            let go = ($('#in-goM').text()).replaceAll(',', '');
            let gisu = ($('#in-gisuM').text()).replaceAll(',', '');
            let gita = ($('#in-gitaM').text()).replaceAll(',', '');

            if (!base) {
                base = 0;
            }
            if (!oper) {
                oper = 0;
            }
            if (!go) {
                go = 0;
            }
            if (!gisu) {
                gisu = 0;
            }
            if (!gita) {
                gita = 0;
            }

            const inAll = parseInt(base) + parseInt(oper) + parseInt(go) + parseInt(gisu) +
                    parseInt(gita);

            $('#in-inAllM').text(AddComma(inAll));
            resolve();
        })
    }
    function sumOut(result) {
        return new Promise(function (resolve, reject) {

            let sadea = ($('#out-sadea').text()).replaceAll(',', '');
            let gita = ($('#out-gitaM').text()).replaceAll(',', '');
            let sae = ($('#out-saeM').text()).replaceAll(',', '');

            if (!sadea) {
                sadea = 0;
            }
            if (!gita) {
                gita = 0;
            }
            if (!sae) {
                sae = 0;
            }

            const outAll = parseInt(sadea) + parseInt(gita) + parseInt(sae);

            $('#out-outAllM').text(AddComma(outAll));
            resolve();
        })
    }
    function sumAll(result) {
        return new Promise(function (resolve, reject) {

            let inM = ($('#in-inAllM').text()).replaceAll(',', '');
            let outM = ($('#out-outAllM').text()).replaceAll(',', '');

            if (!inM) {
                inM = 0;
            }
            if (!outM) {
                outM = 0;
            }

            const All = parseInt(inM) - parseInt(outM);

            $('#AllM').text(AddComma(All));
            resolve();
        })
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

            const iiidddddd = $('#emp-iidd').val();
            const carcarcar = $(cccc)
                .parent()
                .next()
                .text();
            const typetype = $(cccc)
                .parent()
                .next()
                .next()
                .text();
            const opnumnumnum = $(cccc)
                .parent()
                .next()
                .next()
                .next()
                .text();
            const opnononono = $(cccc)
                .parent()
                .next()
                .next()
                .next()
                .next()
                .text();
            const daydayday = $(cccc)
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
                .text();
            updateOper(
                iiidddddd,
                carcarcar,
                opnumnumnum,
                typetype,
                opnononono,
                daydayday,
                2
            );
        }
    } else {
        for (let i = 0; i < aaaa.length; i++) {
            const bbbb = $(aaaa[i]);
            const cccc = $(bbbb.children().children());
            $(cccc).prop("checked", false);
            chInDay(cccc);

            const iiidddddd = $('#emp-iidd').val();
            const carcarcar = $(cccc)
                .parent()
                .next()
                .text();
            const typetype = $(cccc)
                .parent()
                .next()
                .next()
                .text();
            const opnumnumnum = $(cccc)
                .parent()
                .next()
                .next()
                .next()
                .text();
            const opnononono = $(cccc)
                .parent()
                .next()
                .next()
                .next()
                .next()
                .text();
            updateOper(iiidddddd, carcarcar, opnumnumnum, typetype, opnononono, null, 1);
        }
    }
    sumAllpro();
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
        httmll += '<td class="tdRight">' + AddComma(conttt4) + '</td>';
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
    sumAllpro();
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
    sumAllpro();
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
        httmll += '<td class="tdRight">' + AddComma(conttt4) + '</td>';
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
    sumAllpro();
}

$(document).on('click', '#insert-outM', function () {
    insertOutM();
});

function delTbOutM() {
    if (confirm('공제내역을 모두 삭제하겠습니까?')) {
        const aaa = $('#emp-out-money-tb')
            .children()
            .length - 4;
        for (let i = 0; i < aaa; i++) {
            $('#emp-out-money-tb')
                .children()[4]
                .remove();
        }
    }
    sumAllpro();
}

function delTb(params) {
    delt().then(sum);
    function delt(result) {
        return new Promise(function (resolve, reject) {
            $(params)
                .parent()
                .remove();
            resolve();
        })
    }
    function sum(result) {
        return new Promise(function (resolve, reject) {
            sumAllpro();
        })
    }
}