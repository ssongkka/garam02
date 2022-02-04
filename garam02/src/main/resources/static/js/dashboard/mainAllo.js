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

                    if ($(iidd).val() && $(iidd).next().next().next().val() && $(iidd).next().next().next().next().next().val()) {
                        alert("오키바리");
                    }

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

            } else {
                alert("오키바리");
            }
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
                alert("오키바리");
                insertOper(iidd, 3);
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
        let opernum = $(id)
            .parent()
            .prev()
            .val();
        const hoCha = $(id)
            .parent()
            .attr('id')
            .split('-')[2];

        const tod = $($(id).parent().parent().parent().prev().prev().children()[4]).val();
        const ed = $($(id).parent().parent().parent().prev().prev().children()[5]).val();
        const numM = $($(id).parent().parent().parent().prev().prev().children()[6]).val();

        console.log('rsvt  ' + rsvt);
        console.log('opernum  ' + opernum);
        console.log('호차  ' + hoCha);
        console.log('veIn  ' + veIn);
        console.log('compaIn  ' + compaIn);
        console.log('empIn  ' + empIn);
        console.log('mIn  ' + mIn);
        console.log('tod  ' + tod);
        console.log('ed  ' + ed);
        console.log('numM  ' + numM);

        // const url = "/ve/veId"; const headers = {     "Content-Type":
        // "application/json",     "X-HTTP-Method-Override": "POST" }; const params = {
        // "carNumber": para }; $.ajax({     url: url,     type: "POST",     headers:
        // headers,     dataType: "json",     data: JSON.stringify(params),     success:
        // function (r) {} });
    })
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
                        $('#onewayBtn').show();
                        resolve(ctmseqArr);
                    } else {
                        const cont = '금일 운행정보 없음';
                        $('#allocont').html(
                            '<div class="card-song no-allo"><img src="/img/busstop.png" style="width: 100px' +
                            ';">' + cont + '</div>'
                        );
                        $('#onewayBtn').hide();
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
                                    AddComma(r[i].conm / r[i].num)
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
                                htmls += '<div class="stWay" id="st-' + r[i].rsvtseq + '-' + (
                                    k + 1
                                ) + '">';
                                htmls += '<input type="text" class="ve-car" list="car-info" tabindex="' + (
                                    ++cnt
                                ) + '" placeholder="' + (
                                    k + 1
                                ) + '호차" id="' + cnt +
                                        'car" style="font-weight: 600; letter-spacing: 0.3rem;">';
                                htmls += '<input type="hidden" id="" value="0">';
                                htmls += '<input type="hidden" id="" value="0">';
                                htmls += '<input type="text" class="ve-emp"id="' + cnt + 'emp" list="per-info" tabindex=' +
                                        '"-1" placeholder="승무원">';
                                htmls += '<input type="hidden" id="" value="0">';
                                htmls += '<input type="text" class="ve-m" id="' + cnt + 'm" onfocus="this.select()" data' +
                                        '-type="currency" tabindex="' + (
                                    ++cnt
                                ) + '" placeholder="배차금액">';
                                htmls += '</div>';
                                htmls += ' <div class="edway" style="display: none;" id="ed-' + r[i].rsvtseq + '-' + (
                                    k + 1
                                ) + '">';
                                htmls += '<input type="text" list="car-info" tabindex="-1" placeholder="편도">';
                                htmls += '<input type="hidden" id="" value="0">';
                                htmls += '<input type="text" list="per-info" tabindex="-1" placeholder="승무원">';
                                htmls += '<input type="hidden" id="" value="0">';
                                htmls += '<input type="text" id="atlmed" data-type="currency" tabindex="-1" placeholder=' +
                                        '"배차금액">';
                                htmls += '<input type="hidden" name="" id="" tabindex="-1">';
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
                            var stid = '#st-' + r[i].rsvtseq + '-' + r[i].operno;
                            if (r[i].opertype === 0) {
                                $(stid)
                                    .children()
                                    .first()
                                    .val(r[i].vehicle);
                                $(stid)
                                    .children()
                                    .first()
                                    .next()
                                    .val(r[i].opercar);
                                $(stid)
                                    .children()
                                    .first()
                                    .next()
                                    .next()
                                    .val(r[i].opercom);
                                $(stid)
                                    .children()
                                    .first()
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
                                    .val(r[i].operid);
                                $(stid)
                                    .children()
                                    .first()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .next()
                                    .val(AddComma(r[i].atlm));
                            } else {
                                var edid = '#ed-' + r[i].rsvtseq + '-' + r[i].operno;
                                switch (r[i].opertype) {
                                    case 1:
                                        $(stid)
                                            .children()
                                            .first()
                                            .val(r[i].vehicle);
                                        $(stid)
                                            .children()
                                            .first()
                                            .next()
                                            .val(r[i].opercar);
                                        $(stid)
                                            .children()
                                            .first()
                                            .next()
                                            .next()
                                            .val(r[i].opercom);
                                        $(stid)
                                            .children()
                                            .first()
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
                                            .val(r[i].operid);
                                        $(stid)
                                            .children()
                                            .first()
                                            .next()
                                            .next()
                                            .next()
                                            .next()
                                            .next()
                                            .val(AddComma(r[i].atlm));
                                        break;

                                    case 2:
                                        $(edid)
                                            .children()
                                            .first()
                                            .val(r[i].vehicle);
                                        $(edid)
                                            .children()
                                            .first()
                                            .next()
                                            .val(r[i].opercar);
                                        $(edid)
                                            .children()
                                            .first()
                                            .next()
                                            .next()
                                            .val(r[i].opercom);
                                        $(edid)
                                            .children()
                                            .first()
                                            .next()
                                            .next()
                                            .next()
                                            .val(r[i].name);
                                        $(edid)
                                            .children()
                                            .first()
                                            .next()
                                            .next()
                                            .next()
                                            .next()
                                            .val(r[i].operid);
                                        $(edid)
                                            .children()
                                            .first()
                                            .next()
                                            .next()
                                            .next()
                                            .next()
                                            .next()
                                            .val(AddComma(r[i].atlm));
                                        break;

                                    default:
                                        break;
                                }
                            }
                        }
                    }
                })

            } else {}
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

$(document).on('click', '#onewayBtn', function () {
    if ($('.edway').is(":visible")) {
        $('.edway').hide();
    } else {
        $('.edway').show();
    }
});