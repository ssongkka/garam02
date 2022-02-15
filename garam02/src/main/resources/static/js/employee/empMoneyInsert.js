$(document).ready(function () {

    const nownownow = toStringByFormatting(new Date());

    if (nownownow.split('-')[2] >= 1 && nownownow.split('-')[2] <= 10) {
        const now = new Date();
        const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
        const fff = toStringByFormatting(oneMonthAgo);
        $('#yearmonthsMoney1').val(fff.split('-')[0] + '-' + fff.split('-')[1]);
    } else {
        $('#yearmonthsMoney1').val(
            nownownow.split('-')[0] + '-' + nownownow.split('-')[1]
        );
    }
});

$(document).on('click', '#fnUpMonth1', function () {
    const getYM = $('#yearmonthsMoney1').val();
    const nowMonth = new Date(getYM.split('-')[0], getYM.split('-')[1] - 1, 1);

    const oneMonthAgo = new Date(nowMonth.setMonth(nowMonth.getMonth() + 1));
    const fff = toStringByFormatting(oneMonthAgo);
    $('#yearmonthsMoney1').val(fff.split('-')[0] + '-' + fff.split('-')[1]);
    getEmpOperListCompa($('#emp-iidd').val());
});

$(document).on('click', '#fnDownMonth1', function () {
    const getYM = $('#yearmonthsMoney1').val();
    const nowMonth = new Date(getYM.split('-')[0], getYM.split('-')[1] - 1, 1);

    const oneMonthAgo = new Date(nowMonth.setMonth(nowMonth.getMonth() - 1));
    const fff = toStringByFormatting(oneMonthAgo);
    $('#yearmonthsMoney1').val(fff.split('-')[0] + '-' + fff.split('-')[1]);
    getEmpOperListCompa($('#emp-iidd').val());
});

$(document).on('change', '#yearmonthsMoney1', function () {
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
                                htmls += '<td><input type="checkbox" id="mCh-' + i + '" onclick="chCh(this.id)"></td>';
                                htmls += '<td class="hideTh">' + r[i].rsvtseq + '</td>';
                                htmls += '<td class="hideTh">' + r[i].operseq + '</td>';
                                htmls += '<td class="hideTh">' + r[i].opernum + '</td>';
                                htmls += '<td class="hideTh">' + r[i].rsvt + '</td>';
                                htmls += '<td>' + (
                                    cnt
                                ) + '</td>';
                                htmls += '<td>' + r[i].operday + '</td>';
                                htmls += '<td>' + r[i].desty + '</td>';
                                htmls += '<td>편도</td>';
                                htmls += '<td>' + r[i].ctmname + '</td>';
                                htmls += '<td>' + AddComma(r[i].atlm) + '</td>';
                                htmls += '</tr>';
                            } else {
                                if (r[i].opernum != check) {
                                    cnt++;
                                    htmls += '<tr id="mTr-' + i + '" onclick="chTr(this.id)">';
                                    htmls += '<td><input type="checkbox" id="mCh-' + i + '" onclick="chCh(this.id)"></td>';
                                    htmls += '<td class="hideTh">' + r[i].rsvtseq + '</td>';
                                    htmls += '<td class="hideTh">' + r[i].operseq + '</td>';
                                    htmls += '<td class="hideTh">' + r[i].opernum + '</td>';
                                    htmls += '<td class="hideTh">' + r[i].rsvt + '</td>';
                                    htmls += '<td>' + (
                                        cnt
                                    ) + '</td>';
                                    htmls += '<td>' + r[i].operday + '</td>';
                                    htmls += '<td>' + r[i].desty + '</td>';
                                    htmls += '<td>' + (
                                        result.get(r[i].opernum) - 1
                                    ) + '박 ' + result.get(r[i].opernum) + '일</td>';
                                    htmls += '<td>' + r[i].ctmname + '</td>';
                                    htmls += '<td>' + AddComma(r[i].atlm) + '</td>';
                                    htmls += '</tr>';
                                }
                            }
                        } else {

                            if (r[i].opertype > 1) {
                                cnt++;
                                htmls += '<tr id="mTr-' + i + '" onclick="chTr(this.id)">';
                                htmls += '<td><input type="checkbox" id="mCh-' + i + '" onclick="chCh(this.id)"></td>';
                                htmls += '<td class="hideTh">' + r[i].rsvtseq + '</td>';
                                htmls += '<td class="hideTh">' + r[i].operseq + '</td>';
                                htmls += '<td class="hideTh">' + r[i].opernum + '</td>';
                                htmls += '<td class="hideTh">' + r[i].rsvt + '</td>';
                                htmls += '<td>' + (
                                    cnt
                                ) + '</td>';
                                htmls += '<td>' + r[i].operday + '</td>';
                                htmls += '<td>' + r[i].desty + '</td>';
                                htmls += '<td>편도</td>';
                                htmls += '<td>' + r[i].ctmname + '</td>';
                                htmls += '<td>' + AddComma(r[i].atlm) + '</td>';
                                htmls += '</tr>';
                            } else {
                                cnt++;
                                htmls += '<tr id="mTr-' + i + '" onclick="chTr(this.id)">';
                                htmls += '<td><input type="checkbox" id="mCh-' + i + '" onclick="chCh(this.id)"></td>';
                                htmls += '<td class="hideTh">' + r[i].rsvtseq + '</td>';
                                htmls += '<td class="hideTh">' + r[i].operseq + '</td>';
                                htmls += '<td class="hideTh">' + r[i].opernum + '</td>';
                                htmls += '<td class="hideTh">' + r[i].rsvt + '</td>';
                                htmls += '<td>' + (
                                    cnt
                                ) + '</td>';
                                htmls += '<td>' + r[i].operday + '</td>';
                                htmls += '<td>' + r[i].desty + '</td>';
                                htmls += '<td>당일</td>';
                                htmls += '<td>' + r[i].ctmname + '</td>';
                                htmls += '<td>' + AddComma(r[i].atlm) + '</td>';
                                htmls += '</tr>';
                            }
                        }
                        check = r[i].opernum;
                    }
                    $('#emp-oper-money-tb').html(htmls);
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        });
    }
}

function chTr(id) {
    console.log(id);
    const iidd = '#' + id;
    const asd = $(iidd)
        .children()
        .children()
        .attr('id');
    console.log(asd);
    const iiiddd = '#' + asd;

    if ($(iiiddd).is(':checked')) {
        $(iiiddd).prop("checked", false);
    } else {
        $(iiiddd).prop("checked", true);
    }
}
function chCh(id) {
    console.log(id);
    const iidd = '#' + id;

    if ($(iidd).is(':checked')) {
        $(iidd).prop("checked", false);
    } else {
        $(iidd).prop("checked", true);
    }
}