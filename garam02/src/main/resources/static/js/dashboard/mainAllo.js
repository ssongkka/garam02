$(document).ready(function () {
    $('#onewayBtn').hide();
});

$(document).on('keydown', 'input', function (eInner) {
    var keyValue = eInner.which; //enter key
    if (keyValue == 37 || keyValue == 39 || keyValue == 27 || keyValue == 8) {
        var tabindex = $(this).attr('tabindex');
        if (keyValue == 39) { //down arrow 40
            tabindex++;
            $('[tabindex=' + tabindex + ']').focus();
        } else if (keyValue == 37) { //up arrow 38
            tabindex--;
            $('[tabindex=' + tabindex + ']').focus();
        } else if (keyValue == 27 || keyValue == 8) {
            $(this).val('');
            $(this)
                .next()
                .val('');
        }
    }
});

$(document).on('keydown', '.ve-car', function (eInner) {
    var keyValue = eInner.which;
    if (keyValue == 13) {
        var val = $(this).val();
        var carnum = $('#car-info option')
            .filter(function () {
                return this.value == val;
            })
            .data('value');
        var carowner = $('#car-info option')
            .filter(function () {
                return this.value == val;
            })
            .data('owner');
        $(this)
            .next()
            .val(carnum);
        $(this)
            .next()
            .next()
            .val(carowner);
        console.log(carnum);
        console.log(carowner);
        const iidd = '#' + $(this).attr('id');

        ve02(carnum).then(ve03);

        function ve02(para) {
            return new Promise(function (resolve, reject) {
                console.log($(iidd).val() == $(iidd).next().val());
                if ($(iidd).val() == $(iidd).next().val()) {
                    $(iidd)
                        .next()
                        .next()
                        .next()
                        .val('타회사');
                    $(iidd)
                        .next()
                        .next()
                        .next()
                        .next()
                        .val('타회사');

                    if ($(iidd).val() && $(iidd).next().next().next().val() && $(iidd).next().next().next().next().next().val()) {}

                    $(iidd)
                        .next()
                        .next()
                        .next()
                        .next()
                        .next()
                        .focus();
                } else {
                    const url = "/ve/veId";
                    const headers = {
                        "Content-Type": "application/json",
                        "X-HTTP-Method-Override": "POST"
                    };
                    const params = {
                        "carNumber": para
                    };

                    $.ajax({
                        url: url,
                        type: "POST",
                        headers: headers,
                        dataType: "json",
                        data: JSON.stringify(params),
                        success: function (r) {
                            if (r.length > 0) {
                                $(iidd)
                                    .next()
                                    .next()
                                    .next()
                                    .val(r[0].name);
                                $(iidd)
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .val(r[0].id);

                                if ($(iidd).val() && $(iidd).next().next().next().val() && $(iidd).next().next().next().next().next().val()) {
                                    if (!$(iidd).next().val()) {
                                        alert("차량정보없음\n\n차량번호를 확인해주세요.");
                                    } else if (!$(iidd).next().next().next().val()) {
                                        alert("승무원정보없음\n\n승무원을 확인해주세요.");

                                    } else {}
                                } else {}

                                $(iidd)
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .focus();
                            } else {
                                alert("차량정보없음\n\n차량번호를 확인해주세요.");
                                $(iidd).val('');
                                $(iidd)
                                    .next()
                                    .val('');
                                $(iidd)
                                    .next()
                                    .next()
                                    .val('');
                            }
                        }
                    });
                }
            })
        }

        function ve03() {
            return new Promise(function (resolve, reject) {
                const url = "/ve/veId";
                const headers = {
                    "Content-Type": "application/json",
                    "X-HTTP-Method-Override": "POST"
                };
                const params = {
                    "carNumber": para
                };

                $.ajax({
                    url: url,
                    type: "POST",
                    headers: headers,
                    dataType: "json",
                    data: JSON.stringify(params),
                    success: function (r) {
                        if (r.length > 0) {
                            console.log(r[0].name);
                            $(iidd)
                                .next()
                                .next()
                                .next()
                                .val(r[0].name);
                            $(iidd)
                                .next()
                                .next()
                                .next()
                                .next()
                                .val(r[0].id);
                            $(iidd)
                                .next()
                                .next()
                                .next()
                                .next()
                                .next()
                                .focus();
                        } else {}
                    }
                });
            })
        }
    }
});
$(document).on('keydown', '.ve-car-one', function (eInner) {
    var keyValue = eInner.which;
    if (keyValue == 13) {
        var val = $(this).val();
        var carnum = $('#car-info option')
            .filter(function () {
                return this.value == val;
            })
            .data('value');
        var carowner = $('#car-info option')
            .filter(function () {
                return this.value == val;
            })
            .data('owner');
        $(this)
            .next()
            .val(carnum);
        $(this)
            .next()
            .next()
            .val(carowner);
        console.log(carnum);
        console.log(carowner);
        const iidd = '#' + $(this).attr('id');

        ve02(carnum).then(ve03);

        function ve02(para) {
            return new Promise(function (resolve, reject) {
                console.log($(iidd).val() == $(iidd).next().val());
                if ($(iidd).val() == $(iidd).next().val()) {
                    $(iidd)
                        .next()
                        .next()
                        .next()
                        .val('타회사');
                    $(iidd)
                        .next()
                        .next()
                        .next()
                        .next()
                        .val('타회사');

                    if ($(iidd).val() && $(iidd).next().next().next().val() && $(iidd).next().next().next().next().next().val()) {}

                    $(iidd)
                        .next()
                        .next()
                        .next()
                        .next()
                        .next()
                        .focus();
                } else {
                    const url = "/ve/veId";
                    const headers = {
                        "Content-Type": "application/json",
                        "X-HTTP-Method-Override": "POST"
                    };
                    const params = {
                        "carNumber": para
                    };

                    $.ajax({
                        url: url,
                        type: "POST",
                        headers: headers,
                        dataType: "json",
                        data: JSON.stringify(params),
                        success: function (r) {
                            if (r.length > 0) {
                                $(iidd)
                                    .next()
                                    .next()
                                    .next()
                                    .val(r[0].name);
                                $(iidd)
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .val(r[0].id);

                                if ($(iidd).val() && $(iidd).next().next().next().val() && $(iidd).next().next().next().next().next().val()) {
                                    if (!$(iidd).next().val()) {
                                        alert("차량정보없음\n\n차량번호를 확인해주세요.");
                                    } else if (!$(iidd).next().next().next().val()) {
                                        alert("승무원정보없음\n\n승무원을 확인해주세요.");

                                    } else {
                                        alert("오키바리");
                                    }
                                } else {}

                                $(iidd)
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .focus();
                            } else {
                                alert("차량정보없음\n\n차량번호를 확인해주세요.");
                                $(iidd).val('');
                                $(iidd)
                                    .next()
                                    .val('');
                                $(iidd)
                                    .next()
                                    .next()
                                    .val('');
                            }
                        }
                    });
                }
            })
        }

        function ve03() {
            return new Promise(function (resolve, reject) {
                const url = "/ve/veId";
                const headers = {
                    "Content-Type": "application/json",
                    "X-HTTP-Method-Override": "POST"
                };
                const params = {
                    "carNumber": para
                };

                $.ajax({
                    url: url,
                    type: "POST",
                    headers: headers,
                    dataType: "json",
                    data: JSON.stringify(params),
                    success: function (r) {
                        if (r.length > 0) {
                            console.log(r[0].name);
                            $(iidd)
                                .next()
                                .next()
                                .next()
                                .val(r[0].name);
                            $(iidd)
                                .next()
                                .next()
                                .next()
                                .next()
                                .val(r[0].id);
                            $(iidd)
                                .next()
                                .next()
                                .next()
                                .next()
                                .next()
                                .focus();
                        } else {}
                    }
                });
            })
        }
    }
});

$(document).on('keydown', '.ve-emp', function (eInner) {
    var keyValue = eInner.which;
    if (keyValue == 13) {
        var val = $(this).val();
        var id = $('#per-info option')
            .filter(function () {
                return this.value == val;
            })
            .data('value');
        $(this)
            .next()
            .val(id);
        console.log(id);
        const iidd = '#' + $(this).attr('id');
        console.log();
        $(this)
            .next()
            .val(id);

        if ($(iidd).val() && $(iidd).prev().prev().prev().val() && $(iidd).next().next().val()) {
            if (!$(iidd).prev().val()) {
                alert("차량정보없음\n\n차량번호를 확인해주세요.");
            } else if (!$(iidd).next().val()) {
                alert("승무원정보없음\n\n승무원을 확인해주세요.");

            } else {}
        }
    }
});

$(document).on('keydown', '.ve-emp-one', function (eInner) {
    var keyValue = eInner.which;
    if (keyValue == 13) {
        var val = $(this).val();
        var id = $('#per-info option')
            .filter(function () {
                return this.value == val;
            })
            .data('value');
        $(this)
            .next()
            .val(id);
        console.log(id);
        const iidd = '#' + $(this).attr('id');
        console.log();
        $(this)
            .next()
            .val(id);

        if ($(iidd).val() && $(iidd).prev().prev().prev().val() && $(iidd).next().next().val()) {
            if (!$(iidd).prev().val()) {
                alert("차량정보없음\n\n차량번호를 확인해주세요.");
            } else if (!$(iidd).next().val()) {
                alert("승무원정보없음\n\n승무원을 확인해주세요.");

            } else {}
        }
    }
});

$(document).on('keydown', '.ve-m', function (eInner) {
    var keyValue = eInner.which;
    if (keyValue == 13) {
        const iidd = '#' + $(this).attr('id');
        if ($(iidd).val() && $(iidd).prev().prev().val() && $(iidd).prev().prev().prev().prev().val()) {
            if (!$(iidd).prev().prev().prev().val()) {
                alert("차량정보없음\n\n차량번호를 확인해주세요.");
            } else if (!$(iidd).prev().val()) {
                alert("승무원정보없음\n\n승무원을 확인해주세요.");

            } else {
                insertOper(iidd, 3);
            }
        }
    }
});

$(document).on('keydown', '.ve-m-one', function (eInner) {
    var keyValue = eInner.which;
    if (keyValue == 13) {
        const iidd = '#' + $(this).attr('id');
        if ($(iidd).val() && $(iidd).prev().prev().val() && $(iidd).prev().prev().prev().prev().val()) {
            if (!$(iidd).prev().prev().prev().val()) {
                alert("차량정보없음\n\n차량번호를 확인해주세요.");
            } else if (!$(iidd).prev().val()) {
                alert("승무원정보없음\n\n승무원을 확인해주세요.");

            } else {
                insertOperOne(iidd, 3);
            }
        }
    }
});

function insertOper(id, num) {
    return new Promise(function (resolve, reject) {
        let veIn = '';
        let compaIn = '';
        let empIn = '';
        let mIn = '';

        switch (num) {
            case 1:
                veIn = $(id)
                    .next()
                    .val();
                compaIn = $(id)
                    .next()
                    .next()
                    .val();
                empIn = $(id)
                    .next()
                    .next()
                    .next()
                    .next()
                    .val();
                mIn = $(id)
                    .next()
                    .next()
                    .next()
                    .next()
                    .next()
                    .val()
                    .replaceAll(',', '');
                break;
            case 2:
                veIn = $(id)
                    .prev()
                    .prev()
                    .val();
                compaIn = $(id)
                    .prev()
                    .val();
                empIn = $(id)
                    .next()
                    .val();
                mIn = $(id)
                    .next()
                    .next()
                    .val()
                    .replaceAll(',', '');
                break;
            case 3:
                veIn = $(id)
                    .prev()
                    .prev()
                    .prev()
                    .prev()
                    .val();
                compaIn = $(id)
                    .prev()
                    .prev()
                    .prev()
                    .val();
                empIn = $(id)
                    .prev()
                    .val();
                mIn = $(id)
                    .val()
                    .replaceAll(',', '');
                break;

            default:
                break;
        }

        const rsvt = $(id)
            .parent()
            .parent()
            .parent()
            .prev()
            .prev()
            .prev()
            .val();
        const operseq = $(id)
            .parent()
            .prev()
            .val();
        const opernum = $(id)
            .parent()
            .prev()
            .prev()
            .val();
        const hoCha = $(id)
            .parent()
            .attr('id')
            .split('-')[2];

        console.log("1번  " + operseq);
        console.log("2번  " + opernum);

        const tod = $($(id).parent().parent().parent().prev().prev().children()[4]).val();
        const ed = $($(id).parent().parent().parent().prev().prev().children()[5]).val();
        const numM = $($(id).parent().parent().parent().prev().prev().children()[6]).val();

        let params = new Array();
        const beetween = betweenDateNum(tod, ed);

        for (let i = 0; i < beetween; i++) {

            let date = new Date(tod);

            console.log(date.addDays(i));

            const ddd = toStringByFormatting(date.addDays(i));

            const asd = {
                "opernum": opernum,
                "rsvt": rsvt,
                "operday": ddd,
                "operno": hoCha,
                "opercom": compaIn,
                "opercar": veIn,
                "operid": empIn,
                "atlm": mIn,
                "opertype": "1"
            };
            params.push(asd);
        }

        const url = "/allo/insert";
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
                if (r > 0) {
                    const tabnum = $(id).attr('tabindex');
                    $('#allo-num').val(parseInt(tabnum) + 1);
                    setCalWhite($('.dash-cal-con-item-t').attr('id'));
                } else if (r == 0) {
                    alert("배차정보 입력 실패!\n\n시스템을 확인해주세요.")
                } else if (r == -1) {
                    alert("배차정보 입력 실패!\n\n데이터베이스 처리 과정에 문제가 발생하였습니다.")
                } else if (r == -2) {
                    alert("배차정보 입력 실패!\n\n시스템을 확인해주세요.")
                }
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        });
    })
}
function insertOperOne(id, num) {
    return new Promise(function (resolve, reject) {
        let veIn = '';
        let compaIn = '';
        let empIn = '';
        let mIn = '';
        let hoho = '';

        switch (num) {
            case 1:
                hoho = $(id)
                    .prev()
                    .text();
                veIn = $(id)
                    .next()
                    .val();
                compaIn = $(id)
                    .next()
                    .next()
                    .val();
                empIn = $(id)
                    .next()
                    .next()
                    .next()
                    .next()
                    .val();
                mIn = $(id)
                    .next()
                    .next()
                    .next()
                    .next()
                    .next()
                    .val()
                    .replaceAll(',', '');
                break;
            case 2:
                hoho = $(id)
                    .prev()
                    .prev()
                    .prev()
                    .prev()
                    .text();
                veIn = $(id)
                    .prev()
                    .prev()
                    .val();
                compaIn = $(id)
                    .prev()
                    .val();
                empIn = $(id)
                    .next()
                    .val();
                mIn = $(id)
                    .next()
                    .next()
                    .val()
                    .replaceAll(',', '');
                break;
            case 3:
                hoho = $(id)
                    .prev()
                    .prev()
                    .prev()
                    .prev()
                    .prev()
                    .prev()
                    .text();
                veIn = $(id)
                    .prev()
                    .prev()
                    .prev()
                    .prev()
                    .val();
                compaIn = $(id)
                    .prev()
                    .prev()
                    .prev()
                    .val();
                empIn = $(id)
                    .prev()
                    .val();
                mIn = $(id)
                    .val()
                    .replaceAll(',', '');
                break;

            default:
                break;
        }

        const rsvt = $('#btn-rsvt').val();
        const opernum = $('#btn-opernum').val();
        const hoCha = $('#btn-hoho').val();
        const tod = $('#btn-tod').val();
        const ed = $('#btn-ed').val();

        console.log('rsvt  ' + rsvt);
        console.log('opernum  ' + opernum);
        console.log('호차  ' + hoCha);
        console.log('hoho  ' + hoho);
        console.log('veIn  ' + veIn);
        console.log('compaIn  ' + compaIn);
        console.log('empIn  ' + empIn);
        console.log('mIn  ' + mIn);
        console.log('tod  ' + tod);
        console.log('ed  ' + ed);

    })
}

function mdOneWay(val) {

    const iidd = '#' + val;

    const opernum = $(iidd)
        .parent()
        .prev()
        .prev()
        .val();

    const tod = $($(iidd).parent().parent().parent().prev().prev().children()[4]).val();

    const url = "/allo/oneway";
    const headers = {
        "Content-Type": "application/json",
        "X-HTTP-Method-Override": "POST"
    };

    const params = {
        "opernum": opernum,
        "operday": tod
    };

    $.ajax({
        url: url,
        type: "POST",
        headers: headers,
        dataType: "json",
        data: JSON.stringify(params),

        success: function (r) {

            if (r.length > 0) {
                $('#modal-one').modal('show')
                const rsvt = $(iidd)
                    .parent()
                    .parent()
                    .parent()
                    .prev()
                    .prev()
                    .prev()
                    .val();
                const operseq = $(iidd)
                    .parent()
                    .prev()
                    .val();
                const hoCha = $(iidd)
                    .parent()
                    .attr('id')
                    .split('-')[2];

                const tod = $($(iidd).parent().parent().parent().prev().prev().children()[4]).val();
                const ed = $($(iidd).parent().parent().parent().prev().prev().children()[5]).val();
                const numM = $($(iidd).parent().parent().parent().prev().prev().children()[6]).val();

                $('#btn-hoho').val(hoCha);
                $('#btn-rsvt').val(rsvt);
                $('#btn-opernum').val(opernum);
                $('#btn-tod').val(tod);
                $('#btn-ed').val(ed);

                let htmls = '';
                let cnt = 100;

                $('#btn-size').val(r.length + 1);

                let mmm;
                for (let i = 0; i < r.length; i++) {
                    htmls += '<div class="allo-allo-item col-xs-12 col-lg-4" style="width: 100%;">';
                    htmls += '<input type="hidden" value="' + rsvt + '">';
                    htmls += '<input type="hidden" value="' + opernum + '">';
                    htmls += '<input type="hidden" value="' + tod + '">';
                    htmls += '<input type="hidden" value="' + ed + '">';
                    htmls += '<input type="hidden" value="' + numM + '">';
                    htmls += '<div class="stWay" id="st-st-' + hoCha + '">';
                    htmls += '<span style="margin: 0 3rem;">' + (
                        i + 1
                    ) + '</span>'
                    if (i > 0) {
                        htmls += '<input type="text" class="ve-car-one" list="car-info" tabindex="' + (
                            ++cnt
                        ) + '" placeholder="' + (
                            i + 1
                        ) + '호차" id="' + cnt + 'car" style="font-weight: 600; letter-spacing: 0.3rem;" ' +
                                'value="' + r[i].vehicle + '">';
                        htmls += '<input type="hidden" value="' + r[i].opercar + '">';
                        htmls += '<input type="hidden" value="' + r[i].opercom + '">';
                        htmls += '<input type="text" class="ve-emp-one" id="' + cnt + 'emp" list="per-info" tabi' +
                                'ndex="-1" placeholder="승무원" value="' + r[i].name + '">';
                        htmls += '<input type="hidden" value="' + r[i].operid + '">';
                        htmls += '<input type="text" class="ve-m-one" id="' + cnt + 'm" onfocus="this.select()" ' +
                                'data-type="currency" tabindex="' + (
                            ++cnt
                        ) + '" placeholder="배차금액" value="' + AddComma(r[i].atlm) + '">';
                    } else {
                        htmls += '<input type="text" class="ve-car-one" list="car-info" tabindex="' + (
                            ++cnt
                        ) + '" placeholder="' + (
                            i + 1
                        ) + '호차" id="' + cnt + 'car" style="font-weight: 600; letter-spacing: 0.3rem;ba' +
                                'ckground: transparent;" value="' + r[i].vehicle + '" disabled>';
                        htmls += '<input type="hidden" value="' + r[i].opercar + '" disabled>';
                        htmls += '<input type="hidden" value="' + r[i].opercom + '" disabled>';
                        htmls += '<input type="text" class="ve-emp-one" id="' + cnt + 'emp" list="per-info" tabi' +
                                'ndex="-1" placeholder="승무원" value="' + r[i].name + '" style="background: trans' +
                                'parent;" disabled>';
                        htmls += '<input type="hidden" value="' + r[i].operid + '" disabled>';
                        htmls += '<input type="text" class="ve-m-one" id="' + cnt + 'm" onfocus="this.select()" ' +
                                'data-type="currency" tabindex="' + (
                            ++cnt
                        ) + '" placeholder="배차금액" value="' + AddComma(r[i].atlm) + '" style="background' +
                                ': transparent;" disabled>';
                    }
                    if (i > 0) {
                        htmls += '<button class="onebtn" role="button" onclick="delOne(this.id)" id="bt-' + (
                            cnt + 200
                        ) + '"><i class="fas fa-times"></i>';
                    } else {
                        htmls += '<button class="onebtn" role="button" id="bt-' + (
                            cnt + 200
                        ) + '" style="opacity: 0;" disabled><i class="fas fa-times"></i>';
                    }

                    htmls += '</div>';
                    htmls += '</div>';
                }

                console.log("afawawf   " + htmls);
                $('#md-one-bd').html(htmls);

                $("input[data-type='currency']").bind('keyup keydown', function () {
                    inputNumberFormat(this);
                });

            } else {
                alert('첫번째 운행 할 차량을 먼저 배차해주세요.');
            }

        }
    })
}

$(document).on('click', '#btn-one-plus', function () {
    plusOneWay($('#btn-size').val());
    let size = $('#btn-size').val();
    $('#btn-size').val(++size);
});

function plusOneWay(num) {

    let cnt = (2 * num) - 1;

    let htmls = '';

    htmls += '<div class="allo-allo-item col-xs-12 col-lg-4" style="width: 100%;">';
    htmls += '<input type="hidden" value="' + $('#btn-rsvt').val() + '">';
    htmls += '<input type="hidden" value="' + $('#btn-opernum').val() + '">';
    htmls += '<input type="hidden" value="' + $('#btn-tod').val() + '">';
    htmls += '<input type="hidden" value="' + $('#btn-ed').val() + '">';
    htmls += '<input type="hidden" value="' + $('#btn-ed').val() + '">';
    htmls += '<div class="stWay" id="st-st-' + $('#btn-hoho').val() + '">';
    htmls += '<span style="margin: 0 3rem;">' + (
        num
    ) + '</span>'
    htmls += '<input type="text" class="ve-car-one" list="car-info" tabindex="' + (
        cnt + 100
    ) + '" placeholder="' + (
        num
    ) + '번째 운행" id="' + (
        num + 100
    ) + 'car" style="font-weight: 600; letter-spacing: 0.3rem;" value="">';
    htmls += '<input type="hidden" value="">';
    htmls += '<input type="hidden" value="">';
    htmls += '<input type="text" class="ve-emp-one" id="' + (
        num + 100
    ) + 'emp" list="per-info" tabindex="-1" placeholder="승무원" value="">';
    htmls += '<input type="hidden" value="">';
    htmls += '<input type="text" class="ve-m-one" id="' + (
        parseInt(cnt) + 100
    ) + 'm" onfocus="this.select()" data-type="currency" tabindex="' + (
        ++cnt + 100
    ) + '" placeholder="배차금액" value="">';
    htmls += '<button class="onebtn" role="button" onclick="delOne(this.id)" id="bt-' + (
        num + 100
    ) + '"><i class="fas fa-times"></i>';
    htmls += '</div>';
    htmls += '</div>';

    $('#md-one-bd').append(htmls);

    $("input[data-type='currency']").bind('keyup keydown', function () {
        inputNumberFormat(this);
    });
}

function delOne(param) {

    if (!$('#' + param).prev().val() && !$('#' + param).prev().prev().prev().val() && !$(
        '#' + param
    ).prev().prev().prev().prev().prev().prev().val()) {
        let size = $('#btn-size').val();
        $('#btn-size').val(--size);
        $('#' + param)
            .parent()
            .parent()
            .remove();
    } else {}

}

function getAlloList(day) {
    getCustomer()
        .then(getRsvt)
        .then(getOper);

    function getCustomer() {
        return new Promise(function (resolve, reject) {
            const url = "/allo/customer";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "stday": day,
                "endday": day
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {

                    if (r.length > 0) {
                        let ctmseqArr = new Array();
                        let htmls = '';
                        for (let i = 0; i < r.length; i++) {
                            ctmseqArr[i] = r[i].ctmseq;

                            htmls += '<div class="card allo-card">';

                            htmls += '<input type="hidden" id="rvctm' + (
                                i + 1
                            ) + '" value="' + r[i].ctmseq + '">';
                            htmls += '<input type="hidden" id="rvctmsepa' + (
                                i + 1
                            ) + '" value="' + r[i].ctmsepa + '">';
                            switch (r[i].ctmsepa) {
                                case 0:
                                    htmls += '<div><h4><mark><i class="fas fa-user-check">&nbsp;&nbsp;' + r[i].ctmname + '</' +
                                            'i></mark><small><a href="tel:' + r[i].ctmtel1 + '">' + r[i].ctmtel1 + '</a></s' +
                                            'mall></h4></div>';

                                    break;
                                case 1:
                                    htmls += '<div><h4><mark><i class="fas fa-school">&nbsp;&nbsp;' + r[i].ctmname + '</i></' +
                                            'mark><small><a href="tel:' + r[i].ctmtel1 + '">' + r[i].ctmtel1 + '</a></small' +
                                            '></h4></div>';

                                    break;
                                case 2:
                                    htmls += '<div><h4><mark><i class="fas fa-file-signature">&nbsp;&nbsp;' + r[i].ctmname +
                                            '</i></mark><small><a href="tel:' + r[i].ctmtel1 + '">' + r[i].ctmtel1 + '</a><' +
                                            '/small><small><a href="tel:' + r[i].ctmtel2 + '">' + r[i].ctmtel2 + '</a></sma' +
                                            'll><small>' + r[i].ctmdetail + '</small></h4></div>';

                                    break;
                                default:
                                    break;
                            }

                            htmls += '<hr>';
                            htmls += '<div class="rv" id="rv' + r[i].ctmseq + '">';
                            htmls += '</div>';
                            htmls += '</div>';
                        }
                        $('#allocont').html(htmls);
                        resolve(ctmseqArr);
                    } else {
                        const cont = '금일 운행정보 없음';
                        $('#allocont').html(
                            '<div class="card-song no-allo"><img src="/img/busstop.png" style="width: 100px' +
                            ';">' + cont + '</div>'
                        );
                        resolve(0);
                    }

                }
            })
        });
    }
    function getRsvt(result) {
        return new Promise(function (resolve, reject) {

            if (result != 0) {
                const url = "/allo/rsvt";
                const headers = {
                    "Content-Type": "application/json",
                    "X-HTTP-Method-Override": "POST"
                };

                const params = {
                    "stday": day,
                    "endday": day
                };

                $.ajax({
                    url: url,
                    type: "POST",
                    headers: headers,
                    dataType: "json",
                    data: JSON.stringify(params),

                    success: function (r) {
                        getRsvtList(r, day);
                        let rst = new Array();

                        let ctmseqHtml = new Array();
                        for (let index = 0; index < result.length; index++) {
                            ctmseqHtml[index] = '';
                        }

                        let cnt = 0;
                        for (let i = 0; i < r.length; i++) {
                            let suk = '';
                            if (r[i].stday != r[i].endday) {
                                suk = betweenDate(r[i].stday, day, r[i].endday);
                            }

                            rst[i] = r[i].rsvt;

                            let htmls = '';

                            htmls += '<div class="card allo-card-in">';
                            htmls += '<input type="hidden" id="oprsvtseq-' + r[i].rsvtseq + '" value="' + r[i].rsvt +
                                    '">';
                            htmls += '<div class="allo-detail">';
                            htmls += '<div class="allo-detail-item">';
                            htmls += '<blockquote>';
                            htmls += '<p>' + r[i].desty + suk + '</p>';
                            htmls += '</blockquote>';
                            htmls += '</div>';
                            htmls += '<div class="allo-detail-item">';
                            htmls += '<small>' + r[i].rsvpstp + '</small>';
                            htmls += '</div>';
                            htmls += '<div class="allo-detail-item">';
                            htmls += '<small>' + r[i].stt + '&nbsp;&#47;&nbsp;' + r[i].endt + '</small>';
                            htmls += '</div>';
                            htmls += '<div class="allo-detail-item">';

                            if (r[i].num > 1) {
                                htmls += '<small>&#8361;' + AddComma(r[i].conm) + '(' + (
                                    AddComma(r[i].numm)
                                ) + ')</small> ';
                            } else {
                                htmls += '<small>&#8361;' + AddComma(r[i].conm) + '</small> ';
                            }
                            htmls += '<small>' + r[i].cont + '</small> ';
                            htmls += '</div>';
                            const aaa = $('.dash-cal-con-item-t')
                                .children()
                                .children()[1];
                            const tod = $(aaa).val()
                            htmls += '<input type="hidden" value="' + tod + '">';
                            htmls += '<input type="hidden" value="' + r[i].endday + '">';
                            htmls += '<input type="hidden" value="' + r[i].numm + '">';
                            htmls += '</div>';
                            htmls += '<hr>';
                            htmls += '<div class="allo-allo form-group">';

                            for (let k = 0; k < r[i].num; k++) {
                                htmls += '<div class="allo-allo-item col-xs-12 col-lg-4">';
                                htmls += ' <input type="hidden" id="' + r[i].rsvtseq + '-' + (
                                    k + 1
                                ) + '">';
                                htmls += ' <input type="hidden" id="' + r[i].rsvtseq + '-' + (
                                    k + 1
                                ) + '-op">';
                                htmls += '<div class="stWay" id="st-' + r[i].rsvtseq + '-' + (
                                    k + 1
                                ) + '">';
                                htmls += '<button class="onebtn" role="button" onclick="mdOneWay(this.id)" id="bt-' + (
                                    cnt - 1
                                ) + '"><i class="far fa-list-alt"></i></button>';
                                htmls += '<input type="text" class="ve-car" list="car-info" tabindex="' + (
                                    ++cnt
                                ) + '" placeholder="' + (
                                    k + 1
                                ) + '호차" id="' + cnt +
                                        'car" style="font-weight: 600; letter-spacing: 0.3rem;">';
                                htmls += '<input type="hidden" id="" value="0">';
                                htmls += '<input type="hidden" id="" value="0">';
                                htmls += '<input type="text" class="ve-emp" id="' + cnt + 'emp" list="per-info" tabindex' +
                                        '="-1" placeholder="승무원">';
                                htmls += '<input type="hidden" id="" value="0">';
                                htmls += '<input type="text" class="ve-m" id="' + cnt + 'm" onfocus="this.select()" data' +
                                        '-type="currency" tabindex="' + (
                                    ++cnt
                                ) + '" placeholder="배차금액">';
                                htmls += '<button class="onebtn" role="button" onclick="delAllo(this.id)" id="btx-' + (
                                    cnt - 1
                                ) + '" style="background: transparent; color:gray;"><i class="fas fa-times"></i' +
                                        '></button>';
                                htmls += '</div>';
                                htmls += '</div>';
                            }
                            htmls += '</div>';
                            htmls += '</div>';

                            for (let j = 0; j < result.length; j++) {
                                if (r[i].ctmseq == result[j]) {
                                    ctmseqHtml[j] += htmls;
                                }
                            }
                        }
                        for (let j = 0; j < ctmseqHtml.length; j++) {
                            $('#rv' + result[j]).html(ctmseqHtml[j]);
                            $("input[data-type='currency']").bind('keyup keydown', function () {
                                inputNumberFormat(this);
                            });
                        }
                        resolve(rst);
                    }
                })
            } else {
                getRsvtList(0);
                resolve(0);
            }
        });
    }
    function getOper(result) {
        return new Promise(function (resolve, reject) {

            if (result != 0) {
                const url = "/allo/oper";
                const headers = {
                    "Content-Type": "application/json",
                    "X-HTTP-Method-Override": "POST"
                };

                const params = {
                    "stday": day,
                    "endday": day
                };

                $.ajax({
                    url: url,
                    type: "POST",
                    headers: headers,
                    dataType: "json",
                    data: JSON.stringify(params),

                    success: function (r) {
                        for (let i = 0; i < r.length; i++) {
                            $('#' + r[i].rsvtseq + '-' + r[i].operno).val(r[i].opernum);
                            $('#' + r[i].rsvtseq + '-' + r[i].operno + '-op').val(r[i].operseq);
                            var stid = '#st-' + r[i].rsvtseq + '-' + r[i].operno;
                            if (r[i].opertype == 1) {
                                $(stid).attr('class', 'stWay1');
                                console.log($(stid).attr('class'));
                                $(stid)
                                    .children()
                                    .first()
                                    .next()
                                    .val(r[i].vehicle);
                                $(stid)
                                    .children()
                                    .first()
                                    .next()
                                    .next()
                                    .val(r[i].opercar);
                                $(stid)
                                    .children()
                                    .first()
                                    .next()
                                    .next()
                                    .next()
                                    .val(r[i].opercom);
                                $(stid)
                                    .children()
                                    .first()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .val(r[i].name);
                                $(stid)
                                    .children()
                                    .first()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .val(r[i].operid);
                                $(stid)
                                    .children()
                                    .first()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .val(AddComma(r[i].atlm));
                            }
                        }
                    }
                })

            } else {}
            $('[tabindex=' + $('#allo-num').val() + ']').focus();
            $('#allo-num').val(1);
        });
    }

    function keydown_Arr() {
        $('input').on('keydown', function (eInner) {
            var keyValue = eInner.which; //enter key
            if (keyValue == 37 || keyValue == 39 || keyValue == 27 || keyValue == 8) {
                var tabindex = $(this).attr('tabindex');
                if (keyValue == 39) { //down arrow 40
                    tabindex++;
                } else if (keyValue == 37) { //up arrow 38
                    tabindex--;
                } else if (keyValue == 27 || keyValue == 8) {
                    $(this).val('');
                }
                $('[tabindex=' + tabindex + ']').focus();
            }
        });
    }
}

function delAllo(id) {
    const opernum = $('#' + id)
        .parent()
        .prev()
        .prev()
        .val();

    const hoCha = $('#' + id)
        .parent()
        .attr('id')
        .split('-')[2];

    console.log(opernum);

    const url = "/allo/del";
    const headers = {
        "Content-Type": "application/json",
        "X-HTTP-Method-Override": "POST"
    };

    const params = {
        "operno": hoCha,
        "opertype": 1,
        "opernum": opernum
    };

    $.ajax({
        url: url,
        type: "POST",
        headers: headers,
        dataType: "json",
        data: JSON.stringify(params),

        success: function (r) {
            setCalWhite($('.dash-cal-con-item-t').attr('id'));;
        }
    })
}