$(document).ready(function () {});

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
        }
        scrollY();
    }
});

function scrollY() {
    var id = '#' + $(':focus').attr('id');
    var location = $(id)
        .offset()
        .top;
    window.scrollTo({
        top: location - 350,
        behavior: 'smooth'
    });
}

function checkAllo(iidd) {
    if ($(iidd).val() && $(iidd).next().val() && $(iidd).next().next().val() && $(iidd).next().next().next().val() && $(iidd).next().next().next().next().val() && $(iidd).next().next().next().next().next().val()) {
        return true;
    } else {
        return false;
    }
}

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
        const iidd = '#' + $(this).attr('id');
        console.log("rrrrr " + iidd);

        ve02(carnum);

        function ve02(para) {
            return new Promise(function (resolve, reject) {
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

                    if (checkAllo(iidd)) {}

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

                                if (checkAllo(iidd)) {
                                    insertOper(iidd, 1);
                                } else {
                                    const tbi = $(iidd).attr('tabindex');
                                    $('[tabindex=' + (
                                        parseInt(tbi) + 1
                                    ) + ']').focus();
                                }

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
    } else if (keyValue == 27 || keyValue == 8) {
        $(this).val('');
        $(this)
            .next()
            .val('');
        $(this)
            .next()
            .next()
            .val('');
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
        const iidd = '#' + $(this).attr('id');

        ve02(carnum);

        function ve02(para) {
            return new Promise(function (resolve, reject) {
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

                    if (checkAllo(iidd)) {}

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

                                if (checkAllo(iidd)) {
                                    insertOperOne(iidd, 1);
                                } else {
                                    const tbi = $(iidd).attr('tabindex');
                                    console.log("aaaaa  " + tbi);
                                    console.log("aaaaa  " + (
                                        parseInt(tbi) + 1
                                    ));
                                    $('[tabindex=' + (
                                        parseInt(tbi) + 1
                                    ) + ']').focus();
                                }

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
    } else if (keyValue == 27 || keyValue == 8) {
        $(this).val('');
        $(this)
            .next()
            .val('');
        $(this)
            .next()
            .next()
            .val('');
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
        const iidd = '#' + $(this).attr('id');
        $(this)
            .next()
            .val(id);
        if (checkAllo('#' + $(iidd).prev().prev().prev().attr('id'))) {
            insertOper(iidd, 2);
        } else {
            const tbi = $(iidd)
                .prev()
                .attr('tabindex');
            $('[tabindex=' + (
                parseInt(tbi) + 1
            ) + ']').focus();
        }
    } else if (keyValue == 27 || keyValue == 8) {
        $(this).val('');
        $(this)
            .next()
            .val('');
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
        const iidd = '#' + $(this).attr('id');
        $(this)
            .next()
            .val(id);
        if (checkAllo('#' + $(iidd).prev().prev().prev().attr('id'))) {
            insertOperOne(iidd, 2);
        } else {
            const tbi = $(iidd)
                .prev()
                .attr('tabindex');
            $('[tabindex=' + (
                parseInt(tbi) + 1
            ) + ']').focus();
        }
    } else if (keyValue == 27 || keyValue == 8) {
        $(this).val('');
        $(this)
            .next()
            .val('');
    }
});

$(document).on('keydown', '.ve-m', function (eInner) {
    var keyValue = eInner.which;
    if (keyValue == 13) {
        const iidd = '#' + $(this).attr('id');
        console.log(
            checkAllo('#' + $(iidd).prev().prev().prev().prev().prev().attr('id'))
        );
        if (checkAllo('#' + $(iidd).prev().prev().prev().prev().prev().attr('id'))) {
            insertOper(iidd, 3);
        } else {
            const tbi = $(iidd).attr('tabindex');
            console.log(tbi);
            console.log(parseInt(tbi) + 1);
            $('[tabindex=' + (
                parseInt(tbi) + 1
            ) + ']').focus();
        }
    } else if (keyValue == 27 || keyValue == 8) {
        $(this).val('');
    }
});

$(document).on('keydown', '.ve-m-one', function (eInner) {
    var keyValue = eInner.which;
    if (keyValue == 13) {
        const iidd = '#' + $(this).attr('id');
        if ($(iidd).prev().prev().prev().prev().prev().attr('id')) {
            if (!$(iidd).prev().prev().prev().val()) {
                alert("차량정보없음\n\n차량번호를 확인해주세요.");
            } else if (!$(iidd).prev().val()) {
                alert("승무원정보없음\n\n승무원을 확인해주세요.");

            } else {
                insertOperOne(iidd, 3);
            }
        }
    } else if (keyValue == 27 || keyValue == 8) {
        $(this).val('');
    }
});

function insertOper(id, num) {
    return new Promise(function (resolve, reject) {
        LoadingWithMask();
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

        let conpaCheck = 0;
        for (let k = 0; k < dbCompa.length; k++) {
            if (dbCompa[k].company == compaIn) {
                conpaCheck++;
            }
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

        const tod = $($(id).parent().parent().parent().prev().prev().children()[6]).val();
        const ed = $($(id).parent().parent().parent().prev().prev().children()[7]).val();
        const numM = $($(id).parent().parent().parent().prev().prev().children()[8]).val();

        let params = new Array();
        const beetween = betweenDateNum(tod, ed);

        for (let i = 0; i < beetween; i++) {

            let date = new Date(tod);

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
                if (r.length > 0) {
                    $(id)
                        .parent()
                        .prev()
                        .prev()
                        .val(r[0].opernum);
                    let tabnum = '';
                    if ($(id).attr('tabindex') != '-1') {
                        tabnum = $(id).attr('tabindex');
                    } else {
                        tabnum = $(id)
                            .prev()
                            .prev()
                            .prev()
                            .attr('tabindex');
                    }
                    if (conpaCheck > 0) {
                        $(id)
                            .parent()
                            .attr('class', 'stWay1');
                    } else {
                        if (empIn == '타회사') {
                            $(id)
                                .parent()
                                .attr('class', 'stWay3');
                        } else {
                            $(id)
                                .parent()
                                .attr('class', 'stWay2');
                        }
                    }
                    closeLoadingWithMask();
                    $('[tabindex=' + (
                        parseInt(tabnum) + 1
                    ) + ']').focus();
                    scrollY();
                } else if (r[0].opernum == 0) {
                    alert("배차정보 입력 실패!\n\n시스템을 확인해주세요.")
                } else if (r[0].opernum == -1) {
                    alert("배차정보 입력 실패!\n\n데이터베이스 처리 과정에 문제가 발생하였습니다.")
                } else if (r[0].opernum == -2) {
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

        let conpaCheck = 0;
        for (let k = 0; k < dbCompa.length; k++) {
            if (dbCompa[k].company == compaIn) {
                conpaCheck++;
            }
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

        let params = new Array();
        const beetween = betweenDateNum(tod, ed);

        for (let i = 0; i < beetween; i++) {

            let date = new Date(tod);

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
                "opertype": hoho
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
                if (r.length > 0) {
                    console.log("ddddd   " + r[0].opernum);
                    $(id)
                        .parent()
                        .prev()
                        .prev()
                        .val(r[0].opernum);
                    let tabnum = '';
                    if ($(id).attr('tabindex') != '-1') {
                        tabnum = $(id).attr('tabindex');
                    } else {
                        tabnum = $(id)
                            .prev()
                            .prev()
                            .prev()
                            .attr('tabindex');
                    }

                    if (conpaCheck > 0) {
                        $(id)
                            .parent()
                            .attr('class', 'stWay1');
                    } else {
                        if (empIn == '타회사') {
                            $(id)
                                .parent()
                                .attr('class', 'stWay3');
                        } else {
                            $(id)
                                .parent()
                                .attr('class', 'stWay2');
                        }
                    }
                    closeLoadingWithMask();
                    $('[tabindex=' + (
                        parseInt(tabnum) + 1
                    ) + ']').focus();
                    scrollY();
                } else if (r[0].opernum == 0) {
                    alert("배차정보 입력 실패!\n\n시스템을 확인해주세요.")
                } else if (r[0].opernum == -1) {
                    alert("배차정보 입력 실패!\n\n데이터베이스 처리 과정에 문제가 발생하였습니다.")
                } else if (r[0].opernum == -2) {
                    alert("배차정보 입력 실패!\n\n시스템을 확인해주세요.")
                }
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        });
    })
}

function mdOneWay(val) {
    console.log("aasdfasdf   " + val);
    const iidd = '#' + val;
    console.log("aasdfasdf   " + iidd);

    const opernum = $(iidd)
        .parent()
        .prev()
        .prev()
        .val();

    const tod = $($(iidd).parent().parent().parent().prev().prev().children()[6]).val();
    console.log("aasdfasdf   " + tod);
    const url = "/allo/oneway";
    const headers = {
        "Content-Type": "application/json",
        "X-HTTP-Method-Override": "POST"
    };

    const params = {
        "opernum": opernum,
        "operday": tod,
        "opertrash": 1
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

                const tod = $($(iidd).parent().parent().parent().prev().prev().children()[6]).val();
                const ed = $($(iidd).parent().parent().parent().prev().prev().children()[7]).val();
                const numM = $($(iidd).parent().parent().parent().prev().prev().children()[8]).val();

                $('#btn-hoho').val(hoCha);
                $('#btn-rsvt').val(rsvt);
                $('#btn-opernum').val(opernum);
                $('#btn-tod').val(tod);
                $('#btn-ed').val(ed);

                let htmls = '';
                let cnt = 500;

                $('#btn-size').val(r.length + 1);

                let mmm;
                for (let i = 0; i < r.length; i++) {
                    htmls += '<div class="allo-allo-item col-xs-12 col-lg-4" style="width: 100%;">';
                    htmls += '<input type="hidden" value="' + rsvt + '">';
                    htmls += '<input type="hidden" value="' + opernum + '">';
                    htmls += '<input type="hidden" value="' + tod + '">';
                    htmls += '<input type="hidden" value="' + ed + '">';
                    htmls += '<input type="hidden" value="' + numM + '">';

                    let cnt = 0;
                    for (let j = 0; j < dbCompa.length; j++) {
                        console.log(dbCompa[j].company == r[i].opercom);
                        if (dbCompa[j].company == r[i].opercom) {
                            cnt++;
                        }
                    }
                    if (cnt > 0) {
                        htmls += '<div class="stWay1" id="st-st-' + (
                            i + 1
                        ) + '">';
                    } else {
                        if (r[i].name == '타회사') {
                            htmls += '<div class="stWay3" id="st-st-' + (
                                i + 1
                            ) + '">';
                        } else {
                            htmls += '<div class="stWay2" id="st-st-' + (
                                i + 1
                            ) + '">';
                        }
                    }
                    htmls += '<span style="margin: 0 3rem;">' + (
                        i + 1
                    ) + '</span>'

                    let ve = '';
                    if (r[i].vehicle) {
                        if (r[i].name == '타회사') {
                            ve = r[i].vehicle;
                        } else {
                            ve = r[i]
                                .vehicle
                                .substring(r[i].vehicle.length - 4);
                        }
                    }

                    if (r[i].opertype == 1) {
                        htmls += '<input autocomplete="off" type="text" class="ve-car-one" list="car-info" tabin' +
                                'dex="' + (
                            ++cnt
                        ) + '" placeholder="' + (
                            i + 1
                        ) + '호차" id="' + (
                            i + 100
                        ) + 'car" style="font-weight: 600; letter-spacing: 0.3rem;background: transpare' +
                                'nt;" value="' + ve + '" disabled>';
                        htmls += '<input type="hidden" value="' + r[i].opercar + '" disabled>';
                        htmls += '<input type="hidden" value="' + r[i].opercom + '" disabled>';
                        htmls += '<input autocomplete="off" type="text" class="ve-emp-one" id="' + (
                            i + 100
                        ) + 'emp" list="per-info" tabindex="-1" placeholder="승무원" value="' + r[i].name +
                                '" style="background: transparent;" disabled>';
                        htmls += '<input type="hidden" value="' + r[i].operid + '" disabled>';
                        htmls += '<input autocomplete="off" type="text" class="ve-m-one" id="' + (
                            i + 100
                        ) + 'm" onfocus="this.select()" data-type="currency" tabindex="' + (
                            ++cnt
                        ) + '" placeholder="배차금액" value="' + AddComma(r[i].atlm) + '" style="background' +
                                ': transparent;" disabled>';
                    } else {
                        htmls += '<input type="text" class="ve-car-one" list="car-info" tabindex="' + (
                            ++cnt
                        ) + '" placeholder="' + (
                            i + 1
                        ) + '호차" id="' + (
                            i + 100
                        ) + 'car" style="font-weight: 600; letter-spacing: 0.3rem;" value="' + ve +
                                '">';
                        htmls += '<input type="hidden" value="' + r[i].opercar + '">';
                        htmls += '<input type="hidden" value="' + r[i].opercom + '">';
                        htmls += '<input type="text" class="ve-emp-one" id="' + (
                            i + 100
                        ) + 'emp" list="per-info" tabindex="-1" placeholder="승무원" value="' + r[i].name +
                                '">';
                        htmls += '<input type="hidden" value="' + r[i].operid + '">';
                        htmls += '<input type="text" class="ve-m-one" id="' + (
                            i + 100
                        ) + 'm" onfocus="this.select()" data-type="currency" tabindex="' + (
                            ++cnt
                        ) + '" placeholder="배차금액" value="' + AddComma(r[i].atlm) + '">';
                    }
                    if (i > 0) {
                        htmls += '<button class="onebtn" role="button" onclick="delOne(this.id)" id="bt-' + (
                            i + 100
                        ) + '"><i class="fas fa-times"></i>';
                    } else {
                        htmls += '<button class="onebtn" role="button" id="bt-' + (
                            i + 100
                        ) + '" style="opacity: 0;" disabled><i class="fas fa-times"></i>';
                    }

                    htmls += '</div>';
                    htmls += '</div>';
                }

                $('#md-one-bd').html(htmls);

                $("input[data-type='currency']").bind('keyup keydown', function () {
                    inputNumberFormat(this);
                });
                $('[data-toggle="tooltip"]').tooltip({
                    container: "body",
                    delay: {
                        "show": 0,
                        "hide": 111000
                    }
                });
                $('.tooltip-right').tooltip({
                    placement: 'right',
                    viewport: {
                        selector: 'body',
                        padding: 2
                    }
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

$(document).on('click', '#btn-one-plus-close', function () {
    $('#modal-one').modal('hide');
    setCalWhite($('.dash-cal-con-item-t').attr('id'));
});

function plusOneWay(num) {
    console.log("cnt   " + num);

    if (num <= 5) {
        let cnt = (2 * num) - 1;
        console.log("cnt   " + cnt);

        let htmls = '';

        htmls += '<div class="allo-allo-item col-xs-12 col-lg-4" style="width: 100%;">';
        htmls += '<input type="hidden" value="' + $('#btn-rsvt').val() + '">';
        htmls += '<input type="hidden" value="' + $('#btn-opernum').val() + '">';
        htmls += '<input type="hidden" value="' + $('#btn-tod').val() + '">';
        htmls += '<input type="hidden" value="' + $('#btn-ed').val() + '">';
        htmls += '<input type="hidden" value="' + $('#btn-ed').val() + '">';
        htmls += '<div class="stWay" id="st-st-' + num + '">';
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
        $('[data-toggle="tooltip"]').tooltip({
            container: "body",
            delay: {
                "show": 0,
                "hide": 111000
            }
        });
        $('.tooltip-right').tooltip({
            placement: 'right',
            viewport: {
                selector: 'body',
                padding: 2
            }
        });
    } else {
        alert("편도 운행은 5회까지만 추가 할 수 있습니다.");
    }

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
                    let htmls = '';
                    let htmls2 = '';
                    let htmls3 = '';
                    if (r.length > 0) {
                        let ctmseqArr = new Array();

                        for (let i = 0; i < r.length; i++) {
                            ctmseqArr[i] = r[i].ctmseq;

                            let tteell1 = '';
                            let tteell2 = '';
                            let ddetail = '';

                            if (r[i].ctmtel1) {
                                tteell1 = '<span><a href="tel:' + r[i].ctmtel1 + '">' + r[i].ctmtel1 + '</a></s' +
                                        'pan>';
                            } else {
                                tteell1 = '<span>연락처 없음</span>';
                            }
                            if (r[i].ctmtel2) {
                                tteell2 = '<span><a href="tel:' + r[i].ctmtel2 + '">' + r[i].ctmtel2 + '</a></s' +
                                        'pan>';
                            }
                            if (r[i].ctmdetail) {
                                ddetail = '<span>' + r[i].ctmdetail + '</span>';
                            }
                            switch (r[i].ctmsepa) {

                                case 0:
                                    htmls += '<div class="card allo-card">';
                                    htmls += '<input type="hidden" id="rvctm' + (
                                        i + 1
                                    ) + '" value="' + r[i].ctmseq + '">';
                                    htmls += '<input type="hidden" id="rvctmsepa' + (
                                        i + 1
                                    ) + '" value="' + r[i].ctmsepa + '">';
                                    htmls += '<div class="ctm-ttt"><div class="ctm-ttt-item"><i class="fas fa-user-check" st' +
                                            'yle="letter-spacing: 0.3rem;">' + r[i].ctmname + '</i></div>';
                                    // htmls += '<div class="ctm-ttt-item">'; htmls += r[i].ctmname; htmls +=
                                    // '</div>';
                                    htmls += '<div class="ctm-ttt-item">';
                                    htmls += tteell1;
                                    htmls += '</div>';
                                    htmls += '<div class="ctm-ttt-item">';
                                    htmls += tteell2;
                                    htmls += '</div>';
                                    htmls += '<div class="ctm-ttt-item">';
                                    htmls += ddetail;
                                    htmls += '</div>';
                                    htmls += '<div class="ctm-ttt-item">';
                                    htmls += '<button class="btn btn-default allo-detail-item-1" data-toggle="tooltip" data-' +
                                            'placement="left" title="일괄 입금내역 입력"><i class="fas fa-won-sign"></i></button>';
                                    htmls += '</div>';
                                    htmls += '</div>';
                                    htmls += '<div class="rv" id="rv' + r[i].ctmseq + '">';
                                    htmls += '</div>';
                                    htmls += '</div>';

                                    break;
                                case 1:
                                    htmls2 += '<div class="card allo-card">';
                                    htmls2 += '<input type="hidden" id="rvctm' + (
                                        i + 1
                                    ) + '" value="' + r[i].ctmseq + '">';
                                    htmls2 += '<input type="hidden" id="rvctmsepa' + (
                                        i + 1
                                    ) + '" value="' + r[i].ctmsepa + '">';
                                    htmls2 += '<div class="ctm-ttt"><div class="ctm-ttt-item"><i class="fas fa-school" style=' +
                                            '"letter-spacing: 0.3rem;">' + r[i].ctmname + '</i></div>';
                                    // htmls += '<div class="ctm-ttt-item">'; htmls += r[i].ctmname; htmls +=
                                    // '</div>';
                                    htmls2 += '<div class="ctm-ttt-item">';
                                    htmls2 += tteell1;
                                    htmls2 += '</div>';
                                    htmls2 += '<div class="ctm-ttt-item">';
                                    htmls2 += tteell2;
                                    htmls2 += '</div>';
                                    htmls2 += '<div class="ctm-ttt-item">';
                                    htmls2 += ddetail;
                                    htmls2 += '</div>';
                                    htmls2 += '<div class="ctm-ttt-item">';
                                    htmls2 += '<button class="btn btn-default allo-detail-item-1" data-toggle="tooltip" data-' +
                                            'placement="left" title="일괄 입금내역 입력"><i class="fas fa-won-sign"></i></button>';
                                    htmls2 += '</div>';
                                    htmls2 += '</div>';
                                    htmls2 += '<div class="rv" id="rv' + r[i].ctmseq + '">';
                                    htmls2 += '</div>';
                                    htmls2 += '</div>';

                                    break;
                                case 2:
                                    htmls3 += '<div class="card allo-card">';
                                    htmls3 += '<input type="hidden" id="rvctm' + (
                                        i + 1
                                    ) + '" value="' + r[i].ctmseq + '">';
                                    htmls3 += '<input type="hidden" id="rvctmsepa' + (
                                        i + 1
                                    ) + '" value="' + r[i].ctmsepa + '">';
                                    htmls3 += '<div class="ctm-ttt"><div class="ctm-ttt-item"><i class="fas fa-file-signature' +
                                            '" style="letter-spacing: 0.3rem;">' + r[i].ctmname + '</i></div>';
                                    // htmls += '<div class="ctm-ttt-item">'; htmls += r[i].ctmname; htmls +=
                                    // '</div>';
                                    htmls3 += '<div class="ctm-ttt-item">';
                                    htmls3 += tteell1;
                                    htmls3 += '</div>';
                                    htmls3 += '<div class="ctm-ttt-item">';
                                    htmls3 += tteell2;
                                    htmls3 += '</div>';
                                    htmls3 += '<div class="ctm-ttt-item">';
                                    htmls3 += ddetail;
                                    htmls3 += '</div>';
                                    htmls3 += '<div class="ctm-ttt-item">';
                                    htmls3 += '<button class="btn btn-default allo-detail-item-1" data-toggle="tooltip" data-' +
                                            'placement="left" title="일괄 입금내역 입력"><i class="fas fa-won-sign"></i></button>';
                                    htmls3 += '</div>';
                                    htmls3 += '</div>';
                                    htmls3 += '<div class="rv" id="rv' + r[i].ctmseq + '">';
                                    htmls3 += '</div>';
                                    htmls3 += '</div>';

                                    break;
                            }
                        }
                        resolve(ctmseqArr);
                    } else {
                        resolve(0);
                    }

                    const cont = '금일 운행정보 없음';
                    let contcc = '';
                    if (htmls) {
                        $('#allocont1').html(htmls);
                        contcc += "'일반'"
                    }
                    if (htmls2) {
                        $('#allocont2').html(htmls2);
                        if (contcc) {
                            contcc += ", '학생단체'";
                        } else {
                            contcc += "'학생단체'";
                        }
                    }
                    if (htmls3) {
                        $('#allocont3').html(htmls3);
                        if (contcc) {
                            contcc += ", '거래처'";
                        } else {
                            contcc += "'거래처'";
                        }
                    }

                    if (contcc) {
                        contcc += ' 운행을 확인해주세요.';
                    }

                    if (!htmls) {
                        if (contcc) {
                            $('#allocont1').html(
                                '<div class="card-song no-allo"><img src="/img/busstop.png" style="width: 100px' +
                                ';"><p>' + cont + '</p><p><mark>' + contcc + '</mark></p></div>'
                            );
                        } else {
                            $('#allocont1').html(
                                '<div class="card-song no-allo"><img src="/img/busstop.png" style="width: 100px' +
                                ';"><p>' + cont + '</p></div>'
                            );
                        }
                    }
                    if (!htmls2) {
                        if (contcc) {
                            $('#allocont2').html(
                                '<div class="card-song no-allo"><img src="/img/busstop.png" style="width: 100px' +
                                ';"><p>' + cont + '</p><p><mark>' + contcc + '</mark></p></div>'
                            );
                        } else {
                            $('#allocont2').html(
                                '<div class="card-song no-allo"><img src="/img/busstop.png" style="width: 100px' +
                                ';"><p>' + cont + '</p></div>'
                            );
                        }
                    }
                    if (!htmls3) {
                        if (contcc) {
                            $('#allocont3').html(
                                '<div class="card-song no-allo"><img src="/img/busstop.png" style="width: 100px' +
                                ';"><p>' + cont + '</p><p><mark>' + contcc + '</mark></p></div>'
                            );
                        } else {
                            $('#allocont3').html(
                                '<div class="card-song no-allo"><img src="/img/busstop.png" style="width: 100px' +
                                ';"><p>' + cont + '</p></div>'
                            );
                        }
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
                        let cnt0 = 0;
                        let cnt00 = 0;
                        let cnt01 = 0;
                        let cnt02 = 0;

                        let tbi1 = 0;
                        let tbi2 = 100;
                        let tbi3 = 200;
                        let tbi4 = 300;

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
                            switch (r[i].ctmsepa) {
                                case 0:
                                    cnt00 = cnt00 + parseInt(r[i].num);
                                    cnt0 = cnt0 + parseInt(r[i].num);
                                    break;
                                case 1:
                                    cnt01 = cnt01 + parseInt(r[i].num);
                                    cnt0 = cnt0 + parseInt(r[i].num);
                                    break;
                                case 2:
                                    cnt02 = cnt02 + parseInt(r[i].num);
                                    cnt0 = cnt0 + parseInt(r[i].num);
                                    break;
                            }

                            let htmls = '';

                            htmls += '<div class="card allo-card-in">';
                            htmls += '<input type="hidden" id="oprsvtseq-' + r[i].rsvtseq + '" value="' + r[i].rsvt +
                                    '">';
                            htmls += '<div class="allo-detail">';
                            htmls += '<div class="allo-detail-item">';
                            htmls += '<blockquote>';
                            htmls += '<p style="letter-spacing: 0.2rem; font-weight: 600; font-size: 1.5rem;" ><mark' +
                                    '><i class="fas fa-map-marker-alt">&nbsp;&nbsp;</i>' + r[i].desty + '<em style=' +
                                    '"letter-spacing: 0.3rem;">' + suk + '</em></mark></p>';
                            htmls += '</blockquote>';
                            htmls += '</div>';
                            htmls += '<div class="allo-detail-item">';
                            htmls += '<small><mark><i class="fas fa-bus">&nbsp;</i>' + r[i].bus + '</mark>&nbsp;&nbs' +
                                    'p;<span class="badge">' + r[i].num + '</span></small>';
                            htmls += '</div>';
                            htmls += '<div class="allo-detail-item">';
                            htmls += '<small><i class="fas fa-map-pin">&nbsp;</i>' + r[i].rsvpstp + '</small>';
                            htmls += '</div>';
                            htmls += '<div class="allo-detail-item">';
                            htmls += '<small><i class="far fa-clock">&nbsp;</i>' + r[i].stt + '&nbsp;&#47;&nbsp;' + r[i].endt +
                                    '</small>';
                            htmls += '</div>';
                            htmls += '<div class="allo-detail-item">';

                            htmls += '<small>&#8361;' + AddComma(r[i].conm) + '(' + (
                                AddComma(r[i].numm)
                            ) + ')</small> ';
                            htmls += '<small>' + r[i].cont + '</small> ';
                            htmls += '</div>';
                            htmls += '<div class="allo-detail-item">';
                            htmls += '<button class="btn btn-default allo-detail-item-1" id="btn-1-' + r[i].rsvtseq +
                                    '-' + i + '" onclick="getRsvt(this.id)"><i class="fas fa-pencil-alt"></i></butt' +
                                    'on>';
                            htmls += '<button class="btn btn-default allo-detail-item-2" id="btn-2-' + r[i].rsvtseq +
                                    '-' + i + '" onclick="getRsvtM(this.id)"><i class="fas fa-won-sign"></i></butto' +
                                    'n>';
                            htmls += '</div>';
                            const aaa = $('.dash-cal-con-item-t')
                                .children()
                                .children()[1];
                            const tod = $(aaa).val();
                            // const tttod = tod + Math.floor(Math.random() * 1000);
                            htmls += '<input type="hidden" value="' + tod + '">';
                            htmls += '<input type="hidden" value="' + r[i].endday + '">';
                            htmls += '<input type="hidden" value="' + r[i].numm + '">';
                            htmls += '</div>';
                            htmls += '<hr>';
                            htmls += '<div class="allo-allo form-group">';

                            for (let k = 0; k < r[i].num; k++) {
                                let tbi = 0;
                                let tbii = 0;
                                switch (r[i].ctmsepa) {
                                    case 0:
                                        tbi = tbi1++;
                                        tbii = tbi1++;
                                        break;
                                    case 1:
                                        tbi = tbi2++;
                                        tbii = tbi2++;
                                        break;
                                    case 2:
                                        tbi = tbi3++;
                                        tbii = tbi3++;
                                        break;
                                }
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

                                cnt++;

                                if (suk.length > 0) {
                                    htmls += '<button class="onebtn tooltip-right" role="button" id="bt-' + (
                                        cnt - 1
                                    ) + '" data-toggle="tooltip" data-placement="left" title="숙박 운행은 편도 운행이 가능하지 않습' +
                                            '니다."><i class="fas fa-ban"></i></button>';
                                } else {
                                    htmls += '<button class="onebtn" role="button" onclick="mdOneWay(this.id)" id="bt-' + (
                                        cnt - 1
                                    ) + '"><i class="far fa-list-alt"></i></button>';
                                }

                                htmls += '<input autocomplete="off" type="text" class="ve-car" list="car-info" tabindex=' +
                                        '"' + (
                                    tbi
                                ) + '" placeholder="' + (
                                    k + 1
                                ) + '호차" id="' + cnt +
                                        'car" style="font-weight: 600; letter-spacing: 0.3rem;">';
                                htmls += '<input type="hidden" id="" value="0">';
                                htmls += '<input type="hidden" id="" value="0">';
                                htmls += '<input autocomplete="off" type="text" class="ve-emp" id="' + cnt + 'emp" list=' +
                                        '"per-info" tabindex="-1" placeholder="승무원">';
                                htmls += '<input type="hidden" id="" value="0">';
                                htmls += '<input autocomplete="off" type="text" class="ve-m" id="' + cnt + 'm" onfocus="' +
                                        'this.select()" data-type="currency" tabindex="' + (
                                    tbii
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
                            $('[data-toggle="tooltip"]').tooltip({
                                container: "body",
                                delay: {
                                    "show": 0,
                                    "hide": 111000
                                }
                            });
                            $('.tooltip-right').tooltip({
                                placement: 'right',
                                viewport: {
                                    selector: 'body',
                                    padding: 2
                                }
                            });
                        }
                        // if (cnt0 > 0) {     $('#bdggg').attr('class', 'badge badge1'); } if (cnt00 >
                        // 0) {     $('#bdg1').attr('class', 'badge badge1'); } if (cnt01 > 0) {
                        // $('#bdg2').attr('class', 'badge badge1'); } if (cnt02 > 0) {
                        // $('#bdg3').attr('class', 'badge badge1'); }
                        $('#bdggg').text(cnt0);
                        $('#bdg1').text(cnt00);
                        $('#bdg2').text(cnt01);
                        $('#bdg3').text(cnt02);
                        resolve(rst);
                    }
                })
            } else {
                $('#bdggg').text(0);
                $('#bdg1').text(0);
                $('#bdg2').text(0);
                $('#bdg3').text(0);
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
                    "endday": day,
                    "opertrash": 1
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
                                let cnt = 0;
                                for (let j = 0; j < dbCompa.length; j++) {
                                    if (dbCompa[j].company == r[i].opercom) {
                                        cnt++;
                                    }
                                }

                                if (cnt > 0) {
                                    $(stid).attr('class', 'stWay1');
                                } else {
                                    if (r[i].name == '타회사') {
                                        $(stid).attr('class', 'stWay3');
                                    } else {
                                        $(stid).attr('class', 'stWay2');
                                    }
                                }

                                if (r[i].vehicle) {
                                    if (r[i].name == '타회사') {
                                        $(stid)
                                            .children()
                                            .first()
                                            .next()
                                            .val(r[i].vehicle);
                                    } else {
                                        $(stid)
                                            .children()
                                            .first()
                                            .next()
                                            .val(r[i].vehicle.substring(r[i].vehicle.length - 4));
                                    }
                                } else {}

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
                            } else {
                                $(stid)
                                    .children()
                                    .first()
                                    .attr('class', 'onebtn1');
                            }
                        }
                    }
                })

            } else {}
            $('[tabindex=0]').focus();
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
    LoadingWithMask();
    const opernum = $('#' + id)
        .parent()
        .prev()
        .prev()
        .val();

    const hoCha = $('#' + id)
        .parent()
        .attr('id')
        .split('-')[2];

    const tod = $(
        $('#' + id).parent().parent().parent().prev().prev().children()[6]
    ).val();
    const ed = $(
        $('#' + id).parent().parent().parent().prev().prev().children()[7]
    ).val();

    let params = new Array();
    const beetween = betweenDateNum(tod, ed);

    for (let i = 0; i < beetween; i++) {

        let date = new Date(tod);

        const ddd = toStringByFormatting(date.addDays(i));
        for (let l = 0; l < 5; l++) {
            const asd = {
                "opernum": opernum,
                "operday": ddd,
                "operno": hoCha,
                "opertype": l
            };
            params.push(asd);
        }
    }

    const url = "/allo/del";
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
            closeLoadingWithMask();
            setCalWhite($('.dash-cal-con-item-t').attr('id'));
        }
    })
}

function delOne(param) {
    const id = '#' + param;

    const nextnext = $(id)
        .parent()
        .attr('id');

    let stid = '#st-st-' + (
        parseInt(nextnext.split('-')[2]) + 1
    );

    if ($(stid).attr('id')) {
        alert("다음 운행 부터 삭제해주세요.");
    } else {
        let hoho = $(id)
            .prev()
            .prev()
            .prev()
            .prev()
            .prev()
            .prev()
            .prev()
            .text();

        const opernum = $('#btn-opernum').val();
        const hoCha = $('#btn-hoho').val();
        const tod = $('#btn-tod').val();
        const ed = $('#btn-ed').val();

        // console.log('tod  ' + tod); console.log('ed  ' + ed);

        let params = new Array();
        const beetween = betweenDateNum(tod, ed);

        for (let i = 0; i < beetween; i++) {
            let date = new Date(tod);

            const ddd = toStringByFormatting(date.addDays(i));
            const asd = {
                "opernum": opernum,
                "operday": ddd,
                "operno": hoCha,
                "opertype": hoho
            };
            params.push(asd);

            console.log('opernum  ' + opernum);
            console.log('호차  ' + hoCha);
            console.log('opertype  ' + hoho);
            console.log('operday  ' + ddd);
        }

        const url = "/allo/del";
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
                    let size = $('#btn-size').val();
                    $('#btn-size').val(--size);
                    $('#' + param)
                        .parent()
                        .parent()
                        .remove();
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
        })
    }
}

function getRsvt(id) {
    console.log('getRsvt   ' + id);
    const iidd = '#' + id;
    const rsvt = $(iidd)
        .parent()
        .parent()
        .prev()
        .val();

    console.log('getRsvt   ' + rsvt);

    $('#md-rsvtNum').val(rsvt);

    const url = "/allo/chRSVT";
    const headers = {
        "Content-Type": "application/json",
        "X-HTTP-Method-Override": "POST"
    };
    const params = {
        "rsvt": rsvt
    };

    $.ajax({
        url: url,
        type: "POST",
        headers: headers,
        dataType: "json",
        data: JSON.stringify(params),
        success: function (r) {
            console.log("good  " + r);
            console.log("good  " + r.length);
            console.log("good  " + r[0].rsvt);

            $('#stday-1').val(r[0].stday);
            $('#endday-1').val(r[0].endday);
            $('#bus-1').val(r[0].bus);
            $('#num-1').val(r[0].num);
            $('#stt-1').val(r[0].stt);
            $('#endt-1').val(r[0].endt);
            $('#rsvpstp-1').val(r[0].rsvpstp);
            $('#desty-1').val(r[0].desty);
            $('#rsvtdetail-1').val(r[0].rsvtdetail);
            $('#cont-1').val(r[0].cont);
            $('#conm-1').val(AddComma(r[0].conm));
            $('#numm-1').val(r[0].numm);
            chDateInput();
        }
    });

    $('#modal-rsvt').modal('show');
}

$(document).on('click', '#btn-rsvt-insert', function () {

    $('#conm-1').val($('#conm-1').val().replaceAll(',', ''));
    switch ($('#conm-1').val()) {
        case '포함':
            $('#numm-1').val(Math.floor(($('#conm-1').val() / 1.1) / $('#num-1').val()));
            break;
        case '카드':
            $('#numm-1').val(
                Math.floor(($('#conm-1').val() / optCard) / $('#num-1').val())
            );
            break;
        default:
            $('#numm-1').val(Math.floor($('#conm-1').val() / $('#num-1').val()));
            break;
    }

    let rtn = '';

    if (!$('#stday-1').val()) {
        rtn += '출발일'
    }
    if (!$('#endday-1').val()) {
        if (rtn) {
            rtn += ', 도착일'
        } else {
            rtn += '도착일'
        }
    }

    if (rtn) {
        alert(rtn + '을 입력해주세요.');
    } else {
        const url = "/allo/updateRsvt";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const params = {
            "stday": $('#stday-1').val(),
            "endday": $('#endday-1').val(),
            "bus": $('#bus-1').val(),
            "num": $('#num-1').val(),
            "stt": $('#stt-1').val(),
            "endt": $('#endt-1').val(),
            "rsvpstp": $('#rsvpstp-1').val(),
            "desty": $('#desty-1').val(),
            "rsvtdetail": $('#rsvtdetail-1').val(),
            "cont": $('#cont-1').val(),
            "conm": $('#conm-1').val(),
            "numm": $('#numm-1').val(),
            "rsvt": $('#md-rsvtNum').val()
        };
        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            dataType: "json",
            data: JSON.stringify(params),
            success: function (r) {
                if (r > 0) {
                    alert("운행정보가 수정되었습니다.\n\n배차정보를 다시 입력해주세요.");
                    $('#modal-rsvt').modal('hide');
                    setCalWhite($('.dash-cal-con-item-t').attr('id'));
                } else if (r == 0) {
                    alert("운행정보 수정 실패!\n\n시스템을 확인해주세요.")
                } else if (r == -1) {
                    alert("운행정보 수정 실패!\n\n데이터베이스 처리 과정에 문제가 발생하였습니다.")
                } else if (r == -2) {
                    alert("운행정보 수정 실패!\n\n시스템을 확인해주세요.")
                }
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        });
    }
});

$(document).on('click', '#btn-rsvt-close', function () {
    $('#modal-rsvt').modal('hide');
    setCalWhite($('.dash-cal-con-item-t').attr('id'));
});

$(document).on('click', '#btn-rsvt-cancle', function () {
    const url = "/allo/cancleRsvt";
    const headers = {
        "Content-Type": "application/json",
        "X-HTTP-Method-Override": "POST"
    };

    const params = {
        "rsvt": $('#md-rsvtNum').val()
    };
    $.ajax({
        url: url,
        type: "POST",
        headers: headers,
        dataType: "json",
        data: JSON.stringify(params),
        success: function (r) {
            if (r > 0) {
                alert("예약정보 및 해당 예약의 배차가 취소되었습니다.");
                $('#modal-rsvt').modal('hide');
                setCalWhite($('.dash-cal-con-item-t').attr('id'));
            } else if (r == 0) {
                alert("예약정보가 취소 실패!\n\n시스템을 확인해주세요.")
            } else if (r == -1) {
                alert("예약정보가 취소 실패!\n\n데이터베이스 처리 과정에 문제가 발생하였습니다.")
            } else if (r == -2) {
                alert("예약정보가 취소 실패!\n\n시스템을 확인해주세요.")
            }
        },
        error: (jqXHR) => {
            loginSession(jqXHR.status);
        }
    });
});
$(document).on('click', '#btn-rsvt-del', function () {
    const url = "/allo/delRsvt";
    const headers = {
        "Content-Type": "application/json",
        "X-HTTP-Method-Override": "POST"
    };

    const params = {
        "rsvt": $('#md-rsvtNum').val()
    };
    $.ajax({
        url: url,
        type: "POST",
        headers: headers,
        dataType: "json",
        data: JSON.stringify(params),
        success: function (r) {
            if (r > 0) {
                alert("예약정보 및 해당 예약의 배차가 삭제되었습니다.");
                $('#modal-rsvt').modal('hide');
                setCalWhite($('.dash-cal-con-item-t').attr('id'));
            } else if (r == 0) {
                alert("예약정보가 삭제 실패!\n\n시스템을 확인해주세요.")
            } else if (r == -1) {
                alert("예약정보가 삭제 실패!\n\n데이터베이스 처리 과정에 문제가 발생하였습니다.")
            } else if (r == -2) {
                alert("예약정보가 삭제 실패!\n\n시스템을 확인해주세요.")
            }
        },
        error: (jqXHR) => {
            loginSession(jqXHR.status);
        }
    });
});

$(document).on('change', '#stday-1', function () {
    $("#endday-1").val($("#stday-1").val())
    chDateInput();
});

$(document).on('change', '#endday-1', function () {
    chDateInput();
});

function chDateInput() {
    const origin = $("#endday-1").val();
    const std = $("#stday-1").val();
    const edd = $("#endday-1").val();

    console.log("adsw  " + std);
    console.log("adsw  " + edd);

    const beet = betweenDateNum(std, edd);

    console.log("adsw  " + beet);

    if (beet > 1) {
        $("#daynight-1").text(' (' + (
            beet - 1
        ) + '박' + beet + '일)');
        $("#daynight-1").css('color', 'blue');
    } else if (beet == 1) {
        $("#daynight-1").text(' (당일)');
        $("#daynight-1").css('color', 'blue');
    } else {
        $("#endday-1").val(origin);
        $("#daynight-1").text('  도착일을 확인해주세요!!!');
        $("#daynight-1").css('color', 'red');
    }
}