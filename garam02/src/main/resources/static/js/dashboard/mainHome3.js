$(document).ready(function () {
    $("#searchPeStOper").attr("disabled", true);
    $("#searchPeEdOper").attr("disabled", true);
});

function getOperListIl() {
    return new Promise(function (resolve, reject) {
        const day = $('#yearMonthDay').val();

        const url = "/allo/operil";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const params = {
            "operday": day,
            "rsvttrash": 1
        };

        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            dataType: "json",
            data: JSON.stringify(params),

            success: function (r) {

                console.log(r);

                let htmls = ``;

                for (let i = 0; i < r.length; i++) {

                    let suk = '';
                    if (r[i].stday != r[i].endday) {
                        suk = betweenDate(r[i].stday, day, r[i].endday);
                    }

                    let destyyy = r[i].desty + suk;

                    let stttt = ''
                    if (r[i].stt) {
                        stttt = r[i].stt;
                    }

                    let carcar = '';
                    if (r[i].vehicle) {
                        if (isNaN((r[i].vehicle).substring((r[i].vehicle).length - 4))) {
                            carcar = r[i]
                                .vehicle
                                .replaceAll('고속', '')
                                .replaceAll('관광', '')
                                .replaceAll('여행사', '')
                                .replaceAll('(주)', '');
                        } else {
                            carcar = (r[i].vehicle).substring((r[i].vehicle).length - 4);
                        }
                    }

                    htmls += `
                <tr>
                    <td>` + r[i].operday +
                            `
                        <input type="hidden" value="` + r[i].operday +
                            `">
                        <input type="hidden" value="` + r[i].rsvt +
                            `">
                        <input type="hidden" value="` + r[i].ctmno +
                            `">
                        <input type="hidden" value="` + r[i].operseq +
                            `">
                        <input type="hidden" value="` + r[i].opernum +
                            `">
                        <input type="hidden" value="` + r[i].opercar +
                            `">
                        <input type="hidden" value="` + r[i].operid +
                            `">
                        <input type="hidden" value="` + r[i].opercom +
                            `">
                    </td>
                    <td>` + r[i].ctmname +
                            `</td>
                    <td>` + destyyy +
                            `</td>
                    <td class="tdCho">` + carcar +
                            `</td>
                    <td class="tdCho">` + r[i].name +
                            `</td>
                    <td class="tdRight tdCho">` + AddComma(r[i].atlm) +
                            `</td>
                    <td class="tdRight">` + AddComma(r[i].numm) +
                            `</td>
                    <td>` + r[i].num +
                            `</td>
                    <td>` + r[i].rsvpstp +
                            `</td>
                    <td>` + stttt +
                            `</td>
                </tr>`;
                }
                $('#home3-tb-il').html(htmls);
                resolve();
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    })
}

function getOperListMonth(result) {
    return new Promise(function (resolve, reject) {
        let stD = new Date($("#yearMonth").val() + '-01');
        const stttD = new Date($("#yearMonth").val() + '-01');

        stD = new Date(stD.setMonth(stD.getMonth() + 1));

        stD = new Date(stD.getFullYear(), stD.getMonth(), 1);
        stD = new Date(stD.setDate(stD.getDate() - 1));

        const url = "/allo/opermonth";
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

                console.log(r);

                let htmls = ``;

                for (let i = 0; i < r.length; i++) {

                    let suk = '';
                    if (r[i].stday != r[i].endday) {
                        suk = betweenDate(r[i].stday, r[i].operday, r[i].endday);
                    }

                    let destyyy = r[i].desty + suk;

                    let stttt = ''
                    if (r[i].stt) {
                        stttt = r[i].stt;
                    }

                    let carcar = '';
                    if (r[i].vehicle) {
                        if (isNaN((r[i].vehicle).substring((r[i].vehicle).length - 4))) {
                            carcar = r[i]
                                .vehicle
                                .replaceAll('고속', '')
                                .replaceAll('관광', '')
                                .replaceAll('여행사', '')
                                .replaceAll('(주)', '');
                        } else {
                            carcar = (r[i].vehicle).substring((r[i].vehicle).length - 4);
                        }
                    }

                    htmls += `
            <tr>
                <td>` + r[i].operday +
                            `
                    <input type="hidden" value="` + r[i].operday +
                            `">
                    <input type="hidden" value="` + r[i].rsvt +
                            `">
                    <input type="hidden" value="` + r[i].ctmno +
                            `">
                    <input type="hidden" value="` + r[i].operseq +
                            `">
                    <input type="hidden" value="` + r[i].opernum +
                            `">
                    <input type="hidden" value="` + r[i].opercar +
                            `">
                    <input type="hidden" value="` + r[i].operid +
                            `">
                    <input type="hidden" value="` + r[i].opercom +
                            `">
                </td>
                <td>` + r[i].ctmname +
                            `</td>
                <td>` + destyyy +
                            `</td>
                <td class="tdCho">` + carcar +
                            `</td>
                <td class="tdCho">` + r[i].name +
                            `</td>
                <td class="tdRight tdCho">` + AddComma(r[i].atlm) +
                            `</td>
                <td class="tdRight">` + AddComma(r[i].numm) +
                            `</td>
                <td>` + r[i].num +
                            `</td>
                <td>` + r[i].rsvpstp +
                            `</td>
                <td>` + stttt +
                            `</td>
            </tr>`;
                }
                $('#home3-tb-il').html(htmls);
                resolve();
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    })
}

$(document).on('click', '#radioOper1', function () {
    LoadingWithMask()
        .then(getOperListIl)
        .then(closeLoadingWithMask);
});

$(document).on('click', '#radioOper2', function () {
    LoadingWithMask()
        .then(getOperListMonth)
        .then(closeLoadingWithMask);
});

$(document).on('click', '#searchChOper', function () {
    const idChk = $("#searchChOper").is(":checked");
    if (idChk) {
        $("#searchPeStOper").attr("disabled", true);
        $("#searchPeEdOper").attr("disabled", true);
    } else {
        let stD = new Date($("#yearMonth").val() + '-01');
        const stttD = new Date($("#yearMonth").val() + '-01');

        stD = new Date(stD.setMonth(stD.getMonth() + 1));

        stD = new Date(stD.getFullYear(), stD.getMonth(), 1);
        stD = new Date(stD.setDate(stD.getDate() - 1));

        $("#searchPeStOper").val(toStringByFormatting(stttD));
        $("#searchPeEdOper").val(toStringByFormatting(stD));

        $("#searchPeStOper").attr("disabled", false);
        $("#searchPeEdOper").attr("disabled", false);
    }
});

$(document).on('change', '#searchSepaOper', function () {
    const val = $(this).val();

    switch (val) {
        case '0':
        case '2':
        case '3':
            $('.home3-searchText').css('display', 'flex');
            $('.home3-searchDate').hide();
            $('.home3-searchVe').hide();
            $('.home3-searchPe').hide();
            $('.home3-searchM').hide();
            break;

        case '1':
            $('.home3-searchText').hide();
            $('.home3-searchDate').css('display', 'flex');
            $('.home3-searchVe').hide();
            $('.home3-searchPe').hide();
            $('.home3-searchM').hide();
            break;

        case '4':
            $('.home3-searchText').hide();
            $('.home3-searchDate').hide();
            $('.home3-searchVe').css('display', 'flex');
            $('.home3-searchPe').hide();
            $('.home3-searchM').hide();
            break;

        case '5':
            $('.home3-searchText').hide();
            $('.home3-searchDate').hide();
            $('.home3-searchVe').hide();
            $('.home3-searchPe').css('display', 'flex');
            $('.home3-searchM').hide();
            break;

        case '6':
            $('.home3-searchText').hide();
            $('.home3-searchDate').hide();
            $('.home3-searchVe').hide();
            $('.home3-searchPe').hide();
            $('.home3-searchM').css('display', 'flex');
            break;
    }

    $('#searchTextOper').val('');
    $('#searchDateOper').val('');
    $('#searchVeOper').val('');
    $('#searchPerOper').val('');
    $('#searchMOper').val('');
});

$(document).on('keyup', '#searchTextOper', function (eInner) {
    var keyValue = eInner.which;
    if (keyValue == 13) {
        getSeachOperList($('#searchTextOper').val());
    }
});

$(document).on('keyup', '#searchDateOper', function (eInner) {
    var keyValue = eInner.which;
    if (keyValue == 13) {
        getSeachOperList($('#searchDateOper').val());
    }
});

$(document).on('keyup', '#searchVeOper', function (eInner) {
    var keyValue = eInner.which;
    if (keyValue == 13) {
        getSeachOperList($('#searchVeOper').val());
    }
});

$(document).on('keyup', '#searchPerOper', function (eInner) {
    var keyValue = eInner.which;
    if (keyValue == 13) {
        getSeachOperList($('#searchPerOper').val());
    }
});

$(document).on('keyup', '#searchMOper', function (eInner) {
    var keyValue = eInner.which;
    if (keyValue == 13) {
        getSeachOperList($('#searchMOper').val());
    }
});

$(document).on('click', '.searIconOper', function () {
    const aaa = $(this).prev();
    const bbb = $(aaa).val();

    getSeachOperList(bbb);
});

function getSeachOperList(texts) {

    $('#radioOper3').prop('checked', true);

    LoadingWithMask()
        .then(searchOper1)
        .then(closeLoadingWithMask);

    function searchOper1() {
        return new Promise(function (resolve, reject) {

            if (texts) {

                const url = "/allo/opersearch";
                const headers = {
                    "Content-Type": "application/json",
                    "X-HTTP-Method-Override": "POST"
                };

                let params = {};

                const idChk = $("#searchChOper").is(":checked");

                console.log($('#searchSepaOper').val());

                switch ($('#searchSepaOper').val()) {
                    case '0':
                        if (idChk) {
                            params = {
                                "ctmname": $('#searchTextOper').val()
                            };
                        } else {
                            params = {
                                "ctmname": $('#searchTextOper').val(),
                                "stday": $('#searchPeStOper').val(),
                                "endday": $('#searchPeEdOper').val()
                            };
                        }
                        break;
                    case '1':
                        if (idChk) {
                            params = {
                                "stday": $('#searchDateOper').val()
                            };
                        } else {
                            params = {
                                "stday": $('#searchDateOper').val()
                            };
                        }
                        break;
                    case '2':
                        if (idChk) {
                            params = {
                                "desty": $('#searchTextOper').val()
                            };
                        } else {
                            params = {
                                "desty": $('#searchTextOper').val(),
                                "stday": $('#searchPeStOper').val(),
                                "endday": $('#searchPeEdOper').val()
                            };
                        }
                        break;
                    case '3':
                        if (idChk) {
                            params = {
                                "rsvpstp": $('#searchTextOper').val()
                            };
                        } else {
                            params = {
                                "rsvpstp": $('#searchTextOper').val(),
                                "stday": $('#searchPeStOper').val(),
                                "endday": $('#searchPeEdOper').val()
                            };
                        }
                        break;
                    case '4':
                        var val = $('#searchVeOper').val();
                        var carnum = $('#car-info option')
                            .filter(function () {
                                return this.value == val;
                            })
                            .data('value');

                        if (idChk) {
                            params = {
                                "opercar": carnum
                            };
                        } else {
                            params = {
                                "opercar": carnum,
                                "stday": $('#searchPeStOper').val(),
                                "endday": $('#searchPeEdOper').val()
                            };
                        }
                        break;
                    case '5':
                        var val = $('#searchPerOper').val();
                        var pernum = $('#per-info option')
                            .filter(function () {
                                return this.value == val;
                            })
                            .data('value');

                        if (idChk) {
                            params = {
                                "operid": pernum
                            };
                        } else {
                            params = {
                                "operid": pernum,
                                "stday": $('#searchPeStOper').val(),
                                "endday": $('#searchPeEdOper').val()
                            };
                        }
                        break;

                    case '6':
                        const moneys = $('#searchMOper')
                            .val()
                            .replaceAll(',', '');

                        if (idChk) {
                            params = {
                                "atlm": moneys
                            };
                        } else {
                            params = {
                                "atlm": moneys,
                                "stday": $('#searchPeStOper').val(),
                                "endday": $('#searchPeEdOper').val()
                            };
                        }
                        break;

                }

                console.log(params);
                $.ajax({
                    url: url,
                    type: "POST",
                    headers: headers,
                    dataType: "json",
                    data: JSON.stringify(params),

                    success: function (r) {

                        if (r.length > 0) {
                            let htmls = ``;

                            for (let i = 0; i < r.length; i++) {

                                let suk = '';
                                if (r[i].stday != r[i].endday) {
                                    suk = betweenDate(r[i].stday, r[i].operday, r[i].endday);
                                }

                                let destyyy = r[i].desty + suk;

                                let stttt = ''
                                if (r[i].stt) {
                                    stttt = r[i].stt;
                                }

                                let carcar = '';
                                if (r[i].vehicle) {
                                    if (isNaN((r[i].vehicle).substring((r[i].vehicle).length - 4))) {
                                        carcar = r[i]
                                            .vehicle
                                            .replaceAll('고속', '')
                                            .replaceAll('관광', '')
                                            .replaceAll('여행사', '')
                                            .replaceAll('(주)', '');
                                    } else {
                                        carcar = (r[i].vehicle).substring((r[i].vehicle).length - 4);
                                    }
                                }

                                htmls += `
                        <tr>
                            <td>` + r[i].operday +
                                        `
                                <input type="hidden" value="` + r[i].operday +
                                        `">
                                <input type="hidden" value="` + r[i].rsvt +
                                        `">
                                <input type="hidden" value="` + r[i].ctmno +
                                        `">
                                <input type="hidden" value="` + r[i].operseq +
                                        `">
                                <input type="hidden" value="` + r[i].opernum +
                                        `">
                                <input type="hidden" value="` + r[i].opercar +
                                        `">
                                <input type="hidden" value="` + r[i].operid +
                                        `">
                                <input type="hidden" value="` + r[i].opercom +
                                        `">
                            </td>
                            <td>` + r[i].ctmname +
                                        `</td>
                            <td>` + destyyy +
                                        `</td>
                            <td class="tdCho">` + carcar +
                                        `</td>
                            <td class="tdCho">` + r[i].name +
                                        `</td>
                            <td class="tdRight tdCho">` + AddComma(
                                    r[i].atlm
                                ) +
                                        `</td>
                            <td class="tdRight">` + AddComma(r[i].numm) +
                                        `</td>
                            <td>` + r[i].num +
                                        `</td>
                            <td>` + r[i].rsvpstp +
                                        `</td>
                            <td>` + stttt +
                                        `</td>
                        </tr>`;
                            }
                            $('#home3-tb-il').html(htmls);
                        } else {
                            htmls = `
                            <tr>
                            <th colspan="10">예약정보없음</th>
                            </tr>`;
                            $('#home3-tb-il').html(htmls);

                            alert("검색결과 없음");
                        }
                        resolve();
                    }
                })

            } else {
                alert("검색어를 입력해주세요.");
            }
        })
    }
}