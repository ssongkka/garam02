$(document).ready(function () {
    $("#operO").attr("disabled", true);
    $("#operO").val(opt[0].oper * 100);

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

    $('#printbtn').hide();

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
        $('#yearmonthsMoney1').val(fff.split('-')[0] + '-' + fff.split('-')[1]);
        $('#yearmonthsMoney2').val(fff.split('-')[0] + '-' + fff.split('-')[1]);
        $('#yearmonthsMoney1').attr(
            'max',
            fff1.split('-')[0] + '-' + fff1.split('-')[1]
        );
        $('#yearmonthsMoney2').attr(
            'max',
            fff1.split('-')[0] + '-' + fff1.split('-')[1]
        );
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

$(document).on('click', '#oper3-tab', function () {
    var myOffcanvas = document.getElementById('oper3')
    var bsOffcanvas = new bootstrap.Offcanvas(myOffcanvas)

    bsOffcanvas.show();
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
        const ch = confirm("급여 월을 변경하시겠습니까?\n\n저장되지 않은 정보는 사라집니다.");
        if (ch) {
            setYearMonthUp('#yearmonthsMoney2');
            $('#yearmonthsMoney1').val($('#yearmonthsMoney2').val());
            // getEmpMoneyListCompa($('#emp-iidd').val());
            getEmpMoneyListCompa();
        }
    } else {
        alert("급여 지급 월을 확인해주세요.");
    }
});

$(document).on('click', '#fnDownMonth2', function () {
    const ch = confirm("급여 월을 변경하시겠습니까?\n\n저장되지 않은 정보는 사라집니다.");
    if (ch) {
        setYearMonthDown('#yearmonthsMoney2');
        $('#yearmonthsMoney1').val($('#yearmonthsMoney2').val());
        getEmpMoneyListCompa();
    }
});

$(document).on('change', '#yearmonthsMoney2', function () {
    const ch = confirm("급여 월을 변경하시겠습니까?\n\n저장되지 않은 정보는 사라집니다.");
    if (ch) {
        $('#yearmonthsMoney1').val($('#yearmonthsMoney2').val());
        // getEmpMoneyListCompa($('#emp-iidd').val());
        getEmpMoneyListCompa();
    }
});

function unclkName() {
    $("#operO").attr("disabled", true);

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

    $("#fnDownMonth1").attr("disabled", false);
    $("#fnUpMonth1").attr("disabled", false);
    $("#fnDownMonth2").attr("disabled", false);
    $("#fnUpMonth2").attr("disabled", false);

    $("#yearmonthsMoney1").attr("disabled", false);
    $("#yearmonthsMoney2").attr("disabled", false);

    $('#inForm')[0].reset();
    $('#outForm')[0].reset();

    $('#noSave').hide();
    $('#yesSave').hide();
    $('#printbtn').show();
}

function clkName() {
    $("#operO").removeAttr("disabled");

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

    $('#noSave').show();
    $('#yesSave').show();
    $('#printbtn').hide();

    $('#inForm')[0].reset();
    $('#outForm')[0].reset();
}

$(document).on('change', '#in-baseM', function () {
    sumAllpro();
});
$(document).on('change', '#kukmM', function () {
    sumAllpro();
});
$(document).on('change', '#gunmM', function () {
    sumAllpro();
});
$(document).on('change', '#gomM', function () {
    sumAllpro();
});
$(document).on('change', '#sanmM', function () {
    sumAllpro();
});
$(document).on('change', '#operO', function () {
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
    )
    checkChAll();
}

function chTrNot() {
    alert("급여마감된 운행정보는 수정 할 수 없습니다.");
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
}

function updateOper(id, car, opernum, opertype, operno, day, trash) {
    upSql().then(setSumm);

    function upSql() {
        return new Promise(function (resolve, reject) {
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
                    resolve(r);
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }
    function setSumm(result) {
        return new Promise(function (resolve, reject) {
            if (result > 0) {
                sumAllpro();
            }
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

            if (!$(cccc).prop('disabled')) {

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
        }
    } else {
        for (let i = 0; i < aaaa.length; i++) {
            const bbbb = $(aaaa[i]);
            const cccc = $(bbbb.children().children());

            if (!$(cccc).prop('disabled')) {

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
    }
});

$(document).on('keydown', '.input-M', function (eInner) {
    const tabi = $(this).attr('tabindex');
    const getYM = $('#yearmonthsMoney2').val();
    const nowMonth = new Date(getYM.split('-')[0], getYM.split('-')[1] - 1, 1);

    const oneMonthAgo = new Date(nowMonth.setMonth(nowMonth.getMonth() + 1));

    const yesterday = new Date(oneMonthAgo.setDate(oneMonthAgo.getDate() - 1));

    const endday = toStringByFormatting(yesterday); // 어제

    const lastD = endday.split('-')[2];
    var keyValue = eInner.which;
    if (keyValue == 13) {
        switch (tabi) {
            case "1":

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
        if (!$('#inp-cont1').val()) {
            st += '공제날짜';
            alert("지급날짜를 입력해주세요.");
            $('#inp-cont1').focus();
        }
        if (!$('#inp-cont3').val()) {
            alert("지급내용을 입력해주세요.");
            $('#inp-cont3').focus();
        }
        if (!$('#inp-cont4').val()) {
            alert("지급금액을 입력해주세요.");
            $('#inp-cont4').focus();
        }
    }
    sumAllpro();
}

$(document).on('click', '#insert-inM', function () {
    insertInM();
});

function setNum() {
    $('#emp-in-money-tb')
        .children()
        .length;
    const ininin = $('#emp-in-money-tb').children();
    for (let i = 0; i < ininin.length; i++) {
        const tttt = $(ininin[i]).children();
        $(tttt[4]).text(i + 1);
    }
    const outout = $('#emp-out-money-tb').children();
    $('#emp-out-money-tb')

    for (let i = 0; i < outout.length; i++) {
        const tttt1 = $(outout[i]).children();
        $(tttt1[4]).text(i + 1);
    }
}

function delTbInM() {
    if ($('#emp-sal').val() < 1) {
        if (confirm('지급내역을 모두 삭제하겠습니까?')) {
            $('#emp-in-money-tb')
                .children()
                .remove();
        }
        sumAllpro();
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
        httmll += '<td class="tdRight">' + AddComma(conttt4) + '</td>';
        httmll += '<td class="cuor-p" onclick="delTb(this)">';
        httmll += '<i class="fas fa-minus-square"></i>';
        httmll += '</td>';
        httmll += '</tr>';

        $('#emp-out-money-tb').append(httmll);
    } else {
        if (!$('#inp-cont11').val()) {
            st += '공제날짜';
            alert("공제날짜를 입력해주세요.");
            $('#inp-cont11').focus();
        }
        if (!$('#inp-cont13').val()) {
            alert("공제내용을 입력해주세요.");
            $('#inp-cont13').focus();
        }
        if (!$('#inp-cont14').val()) {
            alert("공제금액을 입력해주세요.");
            $('#inp-cont14').focus();
        }
    }
    sumAllpro();
}

$(document).on('click', '#insert-outM', function () {
    insertOutM();
});

function delTbOutM() {
    if ($('#emp-sal').val() < 1) {
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
    setNum();
}

$(document).on('click', '#noSave', function () {
    saveSalary(1);
});
$(document).on('click', '#yesSave', function () {
    const ok = confirm("급여 마감하시겠습니까?\n\n마감된 급여내역은 수정 할 수 없습니다.");
    if (ok) {
        saveSalary(0);

        $('#noSave').hide();
        $('#yesSave').hide();
        $('#printbtn').show();
    }
});

function saveSalary(sepa) {

    if (sepa > 0) {
        LoadingWithMask()
            .then(delInMg)
            .then(saveInM)
            .then(delOutMg)
            .then(saveOutM)
            .then(choiceEmp)
    } else {
        LoadingWithMask()
            .then(delInMg)
            .then(saveInM)
            .then(delOutMg)
            .then(saveOutM)
            .then(upOper)
            .then(insertAllM)
            .then(choiceEmp)
    }

    function insertAllM(params) {
        return new Promise(function (resolve, reject) {
            const url = "/emp/insertAllM";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const per = $('#operO').val() / 100;
            const opercnt = $('#in-operC')
                .text()
                .split('건')[0];
            const opermoney = $('#in-operM')
                .text()
                .replaceAll(',', '');
            const inm = $('#in-inAllM')
                .text()
                .replaceAll(',', '');
            const outm = $('#out-outAllM')
                .text()
                .replaceAll(',', '');

            const empin = user.position + ' ' + user.name;

            const params = {
                "id": $('#emp-iidd').val(),
                "date": $('#yearmonthsMoney2').val(),
                "per": per,
                "opercnt": opercnt,
                "opermoney": opermoney,
                "inm": inm,
                "outm": outm,
                "empin": empin
            };
            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                dataType: "json",
                data: JSON.stringify(params),
                success: function (r) {
                    if (r > 0) {
                        alert("급여내역 마감완료");
                    } else if (r == 0) {
                        alert("급여내역 입력 실패!\n\n시스템을 확인해주세요.")
                    } else if (r == -1) {
                        alert("급여내역 입력 실패!\n\n데이터베이스 처리 과정에 문제가 발생하였습니다.")
                    } else if (r == -2) {
                        alert("급여내역 입력 실패!\n\n시스템을 확인해주세요.")
                    }
                    location.reload();
                }
            })
        })
    }

    function upOper(result) {
        return new Promise(function (resolve, reject) {
            const url = "/emp/empOperUp2";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "operid": $('#emp-iidd').val(),
                "operconfirm": $('#yearmonthsMoney2').val()
            };
            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                dataType: "json",
                data: JSON.stringify(params),
                success: function (r) {
                    resolve();
                }
            })
        })
    }

    function delInMg() {
        return new Promise(function (resolve, reject) {
            const url = "/emp/empInMDel";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };
            const params = {
                "id": $('#emp-iidd').val(),
                "sday": $('#yearmonthsMoney2').val()
            };
            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                dataType: "json",
                data: JSON.stringify(params),
                success: function (r) {
                    resolve(r);
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }
    function saveInM(result) {
        return new Promise(function (resolve, reject) {

            let params = new Array();

            const ddday = {
                "id": $('#emp-iidd').val(),
                "sday": $('#yearmonthsMoney2').val(),
                "separation": '기본급',
                "date": $('#yearmonthsMoney2').val() + '-01',
                "contents": '기본급',
                "money": ($('#in-baseM').val()).replaceAll(',', ''),
                "strash": sepa
            };
            params.push(ddday);
            const size = $('#emp-in-money-tb')
                .children()
                .length;

            for (let i = 0; i < size; i++) {
                const ttrr = $('#emp-in-money-tb').children()[i];
                const ttdd = $(ttrr).children();

                let day = '';

                if (($(ttdd[5]).text()).split('일')[0].length == 1) {
                    day = $('#yearmonthsMoney2').val() + '-0' + (
                        $(ttdd[5]).text()
                    ).split('일')[0];
                } else {
                    day = $('#yearmonthsMoney2').val() + '-' + (
                        $(ttdd[5]).text()
                    ).split('일')[0];
                }

                const asd = {
                    "id": $('#emp-iidd').val(),
                    "sday": $('#yearmonthsMoney2').val(),
                    "separation": $(ttdd[6]).text(),
                    "date": day,
                    "contents": $(ttdd[7]).text(),
                    "money": $(ttdd[8])
                        .text()
                        .replaceAll(',', ''),
                    "strash": sepa
                };
                params.push(asd);
            }

            const url = "/emp/insertInM";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };
            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                dataType: "json",
                data: JSON.stringify(params),
                success: function (r) {
                    console.log(r);
                    resolve(r);
                }
            });

        })
    }
    function delOutMg(result) {
        return new Promise(function (resolve, reject) {
            const url = "/emp/empOutMDel";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };
            const params = {
                "id": $('#emp-iidd').val(),
                "sday": $('#yearmonthsMoney2').val()
            };
            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                dataType: "json",
                data: JSON.stringify(params),
                success: function (r) {
                    resolve(r);
                }
            })
        })
    }
    function saveOutM(result) {
        return new Promise(function (resolve, reject) {

            let params = new Array();

            const size = $('#emp-out-money-tb')
                .children()
                .length;

            for (let i = 0; i < size; i++) {
                const ttrr = $('#emp-out-money-tb').children()[i];
                const ttdd = $(ttrr).children();

                let day = '';

                if (($(ttdd[5]).text()).split('일')[0].length == 1) {
                    day = $('#yearmonthsMoney2').val() + '-0' + (
                        $(ttdd[5]).text()
                    ).split('일')[0];
                } else {
                    day = $('#yearmonthsMoney2').val() + '-' + (
                        $(ttdd[5]).text()
                    ).split('일')[0];

                }

                let mon = 0;

                if ($(ttdd[8]).text()) {
                    mon = $(ttdd[8])
                        .text()
                        .replaceAll(',', '');
                } else {
                    mon = $(ttdd[8])
                        .children()
                        .val()
                        .replaceAll(',', '');
                }

                const asd = {
                    "id": $('#emp-iidd').val(),
                    "sday": $('#yearmonthsMoney2').val(),
                    "separation": $(ttdd[6]).text(),
                    "date": day,
                    "contents": $(ttdd[7]).text(),
                    "money": mon,
                    "strash": sepa
                };
                params.push(asd);
            }

            const url = "/emp/insertOutM";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };
            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                dataType: "json",
                data: JSON.stringify(params),
                success: function (r) {
                    resolve(r);
                }
            });
        })
    }
}
function choiceEmp() {
    return new Promise(function (resolve, reject) {
        getEmpInfo($('#emp-iidd').val() + 'cut');
    })
}

function setEmpRegDays() {
    return new Promise(function (resolve, reject) {

        const ddd = new Date($("#yearmonthsMoney1").val());
        const dddP = ddd.setMonth(ddd.getMonth() + 1);

        let eee = new Date(ddd);
        eee = eee.setDate(eee.getDate() - 1);

        const dday1 = toStringByFormatting(new Date(eee));

        const endDay = dday1.split('-')[2];

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
                const tmpd = new Date($("#yearmonthsMoney1").val()).setDate(
                    new Date($("#yearmonthsMoney1").val()).getDate() + cont
                );
                dow = new Date(tmpd).getDay();

                let nnn = '';
                if (cont < 9) {
                    nnn = '0' + ++cont;
                } else {
                    nnn = ++cont;
                }

                const thisDD = toStringByFormatting(new Date(tmpd));
                const stDD = $('#stDD').text();
                const edDD = $('#edDD').text();

                const stDDDnum = parseInt(stDD.split('-')[0] + stDD.split('-')[1] + stDD.split(
                    '-'
                )[2]);
                const edDDDDnum = parseInt(
                    edDD.split('-')[0] + edDD.split('-')[1] + edDD.split(
                        '-'
                    )[2]
                );
                const thisDDDDDnum = parseInt(
                    thisDD.split('-')[0] + thisDD.split('-')[1] + thisDD.split('-')[2]
                );

                const tmpNowDd = toStringByFormatting(new Date());
                const nowDayday = parseInt(
                    tmpNowDd.split('-')[0] + tmpNowDd.split('-')[1] + tmpNowDd.split('-')[2]
                );

                const tmpShowd = toStringByFormatting(new Date(tmpd));
                const showDayday = parseInt(
                    tmpShowd.split('-')[0] + tmpShowd.split('-')[1] + tmpShowd.split('-')[2]
                );

                function getDDD() {
                    switch (dow) {
                        case 0:
                            htmlsday1 += '<th style="color: #CF2F11;">' + (
                                nnn
                            ) + '일</th>';
                            htmlsday2 += '<th style="color: #CF2F11;">' + getDayOfWeek(dow) + '</th>';
                            htmlsday3 += '<th style="color: #CF2F11;">' + toStringByFormatting(
                                new Date(tmpd)
                            ) + '</th>';
                            htmlsday4 += '<th style="color: #CF2F11;">' + dow + '</th>';
                            break;
                        case 6:
                            htmlsday1 += '<th style="color: #4B89DC;">' + (
                                nnn
                            ) + '일</th>';
                            htmlsday2 += '<th style="color: #4B89DC;">' + getDayOfWeek(dow) + '</th>';
                            htmlsday3 += '<th style="color: #4B89DC;">' + toStringByFormatting(
                                new Date(tmpd)
                            ) + '</th>';
                            htmlsday4 += '<th style="color: #4B89DC;">' + dow + '</th>';
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
                }
                function getNoDDD() {
                    switch (dow) {
                        case 0:
                            htmlsday1 += '<th style="color: #CF2F11; opacity: 0.3;">' + (
                                nnn
                            ) + '일</th>';
                            htmlsday2 += '<th style="color: #CF2F11; opacity: 0.3;">' + getDayOfWeek(dow) + '</th>';
                            htmlsday3 += '<th style="color: #CF2F11; opacity: 0.3;"></th>';
                            htmlsday4 += '<th style="color: #CF2F11; opacity: 0.3;"></th>';
                            break;
                        case 6:
                            htmlsday1 += '<th style="color: #4B89DC; opacity: 0.3;">' + (
                                nnn
                            ) + '일</th>';
                            htmlsday2 += '<th style="color: #4B89DC; opacity: 0.3;">' + getDayOfWeek(dow) + '</th>';
                            htmlsday3 += '<th style="color: #4B89DC; opacity: 0.3;"></th>';
                            htmlsday4 += '<th style="color: #4B89DC; opacity: 0.3;"></th>';
                            break;
                        default:
                            htmlsday1 += '<th style="opacity: 0.3;">' + (
                                nnn
                            ) + '일</th>';
                            htmlsday2 += '<th style="opacity: 0.3;">' + getDayOfWeek(dow) + '</th>';
                            htmlsday3 += '<th style="opacity: 0.3;"></th>';
                            htmlsday4 += '<th style="opacity: 0.3;"></th>';
                            break;
                    }
                }

                if (nowDayday >= showDayday) {
                    if ($('#rgconum').val()) {
                        if ($('#edDD').text()) {
                            if (stDDDnum <= thisDDDDDnum && thisDDDDDnum <= edDDDDnum) {
                                getDDD();
                            } else {
                                getNoDDD();
                            }
                        } else {
                            if (stDDDnum <= thisDDDDDnum) {
                                getDDD();
                            } else {
                                getNoDDD();
                            }
                        }
                    } else {
                        getDDD();
                    }
                } else {
                    getNoDDD();
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

        $('#tbAllo').html('');
        $('#thDays').html(htmls);
        resolve();
    })
}