$(document).ready(function () {
    $("#searchPeStRsvt").attr("disabled", true);
    $("#searchPeEdRsvt").attr("disabled", true);
});

function getRsvtListIl() {
    return new Promise(function (resolve, reject) {
        const day = $('#yearMonthDay').val();

        const url = "/allo/rsvt";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const params = {
            "stday": day,
            "endday": day,
            "rsvttrash": 1
        };

        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            dataType: "json",
            data: JSON.stringify(params),

            success: function (r) {

                let cnt = 0;
                for (let i = 0; i < r.length; i++) {
                    cnt = cnt + parseInt(r[i].num);
                }

                $('#bdggg').text(cnt);

                makeTableRsvt(r);
                resolve();
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    })
}

function getRsvtListMonth(result) {
    return new Promise(function (resolve, reject) {
        let stD = new Date($("#yearMonth").val() + '-01');
        const stttD = new Date($("#yearMonth").val() + '-01');

        stD = new Date(stD.setMonth(stD.getMonth() + 1));

        stD = new Date(stD.getFullYear(), stD.getMonth(), 1);
        stD = new Date(stD.setDate(stD.getDate() - 1));

        const url = "/allo/rsvtmonth";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const params = {
            "stday": toStringByFormatting(stttD),
            "endday": toStringByFormatting(stD)
        };

        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            dataType: "json",
            data: JSON.stringify(params),

            success: function (r) {
                makeTableRsvt(r);
                resolve();
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    })
}

$(document).on('click', '#radioRsvt1', function () {
    LoadingWithMask()
        .then(getRsvtListIl)
        .then(closeLoadingWithMask);
});

$(document).on('click', '#radioRsvt2', function () {
    LoadingWithMask()
        .then(getRsvtListMonth)
        .then(closeLoadingWithMask);
});

$(document).on('click', '#searchChRsvt', function () {
    const idChk = $("#searchChRsvt").is(":checked");
    if (idChk) {
        $("#searchPeStRsvt").attr("disabled", true);
        $("#searchPeEdRsvt").attr("disabled", true);
    } else {
        let stD = new Date($("#yearMonth").val() + '-01');
        const stttD = new Date($("#yearMonth").val() + '-01');

        stD = new Date(stD.setMonth(stD.getMonth() + 1));

        stD = new Date(stD.getFullYear(), stD.getMonth(), 1);
        stD = new Date(stD.setDate(stD.getDate() - 1));

        $("#searchPeStRsvt").val(toStringByFormatting(stttD));
        $("#searchPeEdRsvt").val(toStringByFormatting(stD));

        $("#searchPeStRsvt").attr("disabled", false);
        $("#searchPeEdRsvt").attr("disabled", false);
    }
});

$(document).on('change', '#searchSepaRsvt', function () {
    const val = $(this).val();

    switch (val) {
        case '0':
        case '2':
        case '3':
            $('.home2-searchText').css('display', 'flex');
            $('.home2-searchDate').hide();
            break;

        case '1':
            $('.home2-searchText').hide();
            $('.home2-searchDate').css('display', 'flex');
            break;
    }

    $("#searchTextRsvt").val('');
    $("#searchDateRsvt").val('');
});

$(document).on('keyup', '#searchTextRsvt', function (eInner) {
    var keyValue = eInner.which;
    if (keyValue == 13) {
        getSeachRsvtList($('#searchTextRsvt').val());
    }
});

$(document).on('keyup', '#searchDateRsvt', function (eInner) {
    var keyValue = eInner.which;
    if (keyValue == 13) {
        getSeachRsvtList($('#searchDateRsvt').val());
    }
});

$(document).on('click', '.searIconRsvt', function () {
    const aaa = $(this).prev();
    const bbb = $(aaa).val();

    getSeachRsvtList(bbb);
});

function getSeachRsvtList(texts) {
    $('#radioRsvt3').prop('checked', true);

    LoadingWithMask()
        .then(search1)
        .then(closeLoadingWithMask);

    function search1() {
        return new Promise(function (resolve, reject) {

            if (texts) {

                const url = "/allo/rsvtsearch";
                const headers = {
                    "Content-Type": "application/json",
                    "X-HTTP-Method-Override": "POST"
                };

                let params = {};

                const idChk = $("#searchChRsvt").is(":checked");

                switch ($('#searchSepaRsvt').val()) {
                    case '0':
                        if (idChk) {
                            params = {
                                "ctmname": $('#searchTextRsvt').val()
                            };
                        } else {
                            params = {
                                "ctmname": $('#searchTextRsvt').val(),
                                "stday": $('#searchPeStRsvt').val(),
                                "endday": $('#searchPeEdRsvt').val()
                            };
                        }
                        break;
                    case '1':
                        if (idChk) {
                            params = {
                                "stday": $('#searchDateRsvt').val()
                            };
                        } else {
                            params = {
                                "stday": $('#searchDateRsvt').val()
                            };
                        }
                        break;
                    case '2':
                        if (idChk) {
                            params = {
                                "desty": $('#searchTextRsvt').val()
                            };
                        } else {
                            params = {
                                "desty": $('#searchTextRsvt').val(),
                                "stday": $('#searchPeStRsvt').val(),
                                "endday": $('#searchPeEdRsvt').val()
                            };
                        }
                        break;
                    case '3':
                        if (idChk) {
                            params = {
                                "rsvpstp": $('#searchTextRsvt').val()
                            };
                        } else {
                            params = {
                                "rsvpstp": $('#searchTextRsvt').val(),
                                "stday": $('#searchPeStRsvt').val(),
                                "endday": $('#searchPeEdRsvt').val()
                            };
                        }
                        break;

                }

                $.ajax({
                    url: url,
                    type: "POST",
                    headers: headers,
                    dataType: "json",
                    data: JSON.stringify(params),

                    success: function (r) {
                        makeTableRsvt(r);
                        resolve();
                    }
                })
            } else {
                alert("검색어를 입력해주세요.");
            }
        })
    }
}

function makeTableRsvt(r) {
    let htmls = ``;

    if (r.length > 0) {

        for (let i = 0; i < r.length; i++) {

            let stttt = ''
            if (r[i].stt) {
                stttt = r[i].stt;
            }

            let eddday = '';
            if (r[i].stday != r[i].endday) {
                eddday = r[i].endday;
            }

            htmls += `
<tr class="rsvtChohome">
    <td>` + r[i].stday +
                    `
    <input type="hidden" value="` + r[i].stday +
                    `">
    <input type="hidden" value="` + r[i].rsvt +
                    `">
    <input type="hidden" value="` + r[i].ctmno +
                    `">
    </td>
    <td>` + eddday + `</td>
    <td>` + r[i].ctmname +
                    `</td>
    <td>` + r[i].desty + `</td>
    <td>` + r[i].bus +
                    `</td>
    <td>` + r[i].num + `</td>
    <td>` + r[i].cont +
                    `</td>
    <td class="tdRight">` + AddComma(r[i].conm) +
                    `</td>
    <td class="tdRight">` + AddComma(r[i].numm) +
                    `</td>
    <td class="tdRight"> ` + AddComma(r[i].opertrash) +
                    `</td>
    <td>` + r[i].rsvpstp + `</td>
    <td>` + stttt +
                    `</td>
</tr>`;
        }
        $('#home2-tb-il').html(htmls);
    } else {
        htmls = `
        <tr>
        <th colspan="12">예약정보없음</th>
        </tr>`;
        $('#home2-tb-il').html(htmls);
    }
}

$(document).on('click', '.rsvtChohome', function () {

    const aaa = $(this).children()[0];

    const dayday = $(aaa).children()[0];
    const dayday1 = $(dayday).val();

    const rsvt = $(aaa).children()[1];
    const rsvt1 = $(rsvt).val();

    const ddddd = new Date(dayday1);

    $('#modalRsvtOperLabel').text(dayday1 + ' ' + getDayOfWeek(ddddd.getDay()));
    $('#RsvtOperDay').val(dayday1);

    getMenuRsvt(rsvt1, 0);
});