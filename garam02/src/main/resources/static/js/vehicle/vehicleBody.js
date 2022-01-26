const good = '1px solid #ccc';
const bad = '2px solid rgba(255, 0, 0, 0.5)';

$(document).ready(function () {
    getVeAll();
});

function getVeAll(vehicle) {
    const url = "/ve/veAll";
    const headers = {
        "Content-Type": "application/json",
        "X-HTTP-Method-Override": "POST"
    };

    const params = {
        "vehicle": vehicle
    };

    $.ajax({
        url: url,
        type: "POST",
        headers: headers,
        dataType: "json",
        data: JSON.stringify(params),

        success: function (r) {

            let cnt = 0;
            let cntEnd = 0;
            let cntDae = 0;
            let cntJung = 0;
            let cntUdong = 0;
            let cntCompa = 0;
            let cntGae = 0;

            let htmls = '';
            let htmlsEnd = '';
            let htmlsDae = '';
            let htmlsJung = '';
            let htmlsUdong = '';
            let htmlsCompa = '';
            let htmlsGae = '';
            for (let i = 0; i < r.length; i++) {
                if (r[i].trash == 1) {
                    cnt++;
                    htmls += '<tr id="' + r[i].carNumber + 'cut" onclick="getVeInfo(this.id)" style="cursor:' +
                            'pointer;">';
                    htmls += '<td>'
                    htmls += '<span>'
                    htmls += r[i].vehicle2;
                    htmls += '</span>'
                    htmls += '</td>'
                    if (r[i].owner) {
                        htmls += '<td>'
                        htmls += '<span>'
                        htmls += r[i].owner;
                        htmls += '</span>'
                        htmls += '</td>'
                    } else {
                        htmls += '<td>'
                        htmls += '<span>'
                        htmls += '</span>'
                        htmls += '</td>'
                    }
                    if (r[i].bus) {
                        htmls += '<td>'
                        htmls += '<span>'
                        htmls += r[i].bus;
                        htmls += '</span>'
                        htmls += '</td>'
                    } else {
                        htmls += '<td>'
                        htmls += '<span>'
                        htmls += '</span>'
                        htmls += '</td>'
                    }
                    if (r[i].regist) {
                        htmls += '<td>'
                        htmls += '<span>'
                        htmls += r[i].regist;
                        htmls += '</span>'
                        htmls += '</td>'
                    } else {
                        htmls += '<td>'
                        htmls += '<span>'
                        htmls += '</span>'
                        htmls += '</td>'
                    }
                    if (r[i].name) {
                        htmls += '<td>'
                        htmls += '<span>'
                        htmls += r[i].name;
                        htmls += '</span>'
                        htmls += '</td>'
                    } else {
                        htmls += '<td>'
                        htmls += '<span>'
                        htmls += '</span>'
                        htmls += '</td>'
                    }
                    htmls += '</tr>'
                }
                if (r[i].trash == 0) {
                    cntEnd++;
                    htmlsEnd += '<tr id="' + r[i].carNumber + 'cutEnd" onclick="getVeInfo(this.id)" style="curs' +
                            'or:pointer;">';
                    htmlsEnd += '<td>'
                    htmlsEnd += '<span>'
                    htmlsEnd += r[i].vehicle2;
                    htmlsEnd += '</span>'
                    htmlsEnd += '</td>'
                    if (r[i].owner) {
                        htmlsEnd += '<td>'
                        htmlsEnd += '<span>'
                        htmlsEnd += r[i].owner;
                        htmlsEnd += '</span>'
                        htmlsEnd += '</td>'
                    } else {
                        htmlsEnd += '<td>'
                        htmlsEnd += '<span>'
                        htmlsEnd += '</span>'
                        htmlsEnd += '</td>'
                    }
                    if (r[i].bus) {
                        htmlsEnd += '<td>'
                        htmlsEnd += '<span>'
                        htmlsEnd += r[i].bus;
                        htmlsEnd += '</span>'
                        htmlsEnd += '</td>'
                    } else {
                        htmlsEnd += '<td>'
                        htmlsEnd += '<span>'
                        htmlsEnd += '</span>'
                        htmlsEnd += '</td>'
                    }
                    if (r[i].regist) {
                        htmlsEnd += '<td>'
                        htmlsEnd += '<span>'
                        htmlsEnd += r[i].regist;
                        htmlsEnd += '</span>'
                        htmlsEnd += '</td>'
                    } else {
                        htmlsEnd += '<td>'
                        htmlsEnd += '<span>'
                        htmlsEnd += '</span>'
                        htmlsEnd += '</td>'
                    }
                    if (r[i].name) {
                        htmlsEnd += '<td>'
                        htmlsEnd += '<span>'
                        htmlsEnd += r[i].name;
                        htmlsEnd += '</span>'
                        htmlsEnd += '</td>'
                    } else {
                        htmlsEnd += '<td>'
                        htmlsEnd += '<span>'
                        htmlsEnd += '</span>'
                        htmlsEnd += '</td>'
                    }
                    htmlsEnd += '</tr>'
                }
                if (r[i].bus == '대형' && r[i].trash == 1) {
                    cntDae++;
                    htmlsDae += '<tr id="' + r[i].carNumber + 'cutDae" onclick="getVeInfo(this.id)" style="curs' +
                            'or:pointer;">';
                    htmlsDae += '<td>'
                    htmlsDae += '<span>'
                    htmlsDae += r[i].vehicle2;
                    htmlsDae += '</span>'
                    htmlsDae += '</td>'
                    if (r[i].owner) {
                        htmlsDae += '<td>'
                        htmlsDae += '<span>'
                        htmlsDae += r[i].owner;
                        htmlsDae += '</span>'
                        htmlsDae += '</td>'
                    } else {
                        htmlsDae += '<td>'
                        htmlsDae += '<span>'
                        htmlsDae += '</span>'
                        htmlsDae += '</td>'
                    }
                    if (r[i].bus) {
                        htmlsDae += '<td>'
                        htmlsDae += '<span>'
                        htmlsDae += r[i].bus;
                        htmlsDae += '</span>'
                        htmlsDae += '</td>'
                    } else {
                        htmlsDae += '<td>'
                        htmlsDae += '<span>'
                        htmlsDae += '</span>'
                        htmlsDae += '</td>'
                    }
                    if (r[i].regist) {
                        htmlsDae += '<td>'
                        htmlsDae += '<span>'
                        htmlsDae += r[i].regist;
                        htmlsDae += '</span>'
                        htmlsDae += '</td>'
                    } else {
                        htmlsDae += '<td>'
                        htmlsDae += '<span>'
                        htmlsDae += '</span>'
                        htmlsDae += '</td>'
                    }
                    if (r[i].name) {
                        htmlsDae += '<td>'
                        htmlsDae += '<span>'
                        htmlsDae += r[i].name;
                        htmlsDae += '</span>'
                        htmlsDae += '</td>'
                    } else {
                        htmlsDae += '<td>'
                        htmlsDae += '<span>'
                        htmlsDae += '</span>'
                        htmlsDae += '</td>'
                    }
                    htmlsDae += '</tr>'
                }
                if (r[i].bus == '중형' && r[i].trash == 1) {
                    cntJung++;
                    htmlsJung += '<tr id="' + r[i].carNumber + 'cutJung" onclick="getVeInfo(this.id)" style="cur' +
                            'sor:pointer;">';
                    htmlsJung += '<td>'
                    htmlsJung += '<span>'
                    htmlsJung += r[i].vehicle2;
                    htmlsJung += '</span>'
                    htmlsJung += '</td>'
                    if (r[i].owner) {
                        htmlsJung += '<td>'
                        htmlsJung += '<span>'
                        htmlsJung += r[i].owner;
                        htmlsJung += '</span>'
                        htmlsJung += '</td>'
                    } else {
                        htmlsJung += '<td>'
                        htmlsJung += '<span>'
                        htmlsJung += '</span>'
                        htmlsJung += '</td>'
                    }
                    if (r[i].bus) {
                        htmlsJung += '<td>'
                        htmlsJung += '<span>'
                        htmlsJung += r[i].bus;
                        htmlsJung += '</span>'
                        htmlsJung += '</td>'
                    } else {
                        htmlsJung += '<td>'
                        htmlsJung += '<span>'
                        htmlsJung += '</span>'
                        htmlsJung += '</td>'
                    }
                    if (r[i].regist) {
                        htmlsJung += '<td>'
                        htmlsJung += '<span>'
                        htmlsJung += r[i].regist;
                        htmlsJung += '</span>'
                        htmlsJung += '</td>'
                    } else {
                        htmlsJung += '<td>'
                        htmlsJung += '<span>'
                        htmlsJung += '</span>'
                        htmlsJung += '</td>'
                    }
                    if (r[i].name) {
                        htmlsJung += '<td>'
                        htmlsJung += '<span>'
                        htmlsJung += r[i].name;
                        htmlsJung += '</span>'
                        htmlsJung += '</td>'
                    } else {
                        htmlsJung += '<td>'
                        htmlsJung += '<span>'
                        htmlsJung += '</span>'
                        htmlsJung += '</td>'
                    }
                    htmlsJung += '</tr>'
                }
                if (r[i].bus == '우등' && r[i].trash == 1) {
                    cntUdong++;
                    htmlsUdong += '<tr id="' + r[i].carNumber + 'cutUdong" onclick="getVeInfo(this.id)" style="cu' +
                            'rsor:pointer;">';
                    htmlsUdong += '<td>'
                    htmlsUdong += '<span>'
                    htmlsUdong += r[i].vehicle2;
                    htmlsUdong += '</span>'
                    htmlsUdong += '</td>'
                    if (r[i].owner) {
                        htmlsUdong += '<td>'
                        htmlsUdong += '<span>'
                        htmlsUdong += r[i].owner;
                        htmlsUdong += '</span>'
                        htmlsUdong += '</td>'
                    } else {
                        htmlsUdong += '<td>'
                        htmlsUdong += '<span>'
                        htmlsUdong += '</span>'
                        htmlsUdong += '</td>'
                    }
                    if (r[i].bus) {
                        htmlsUdong += '<td>'
                        htmlsUdong += '<span>'
                        htmlsUdong += r[i].bus;
                        htmlsUdong += '</span>'
                        htmlsUdong += '</td>'
                    } else {
                        htmlsUdong += '<td>'
                        htmlsUdong += '<span>'
                        htmlsUdong += '</span>'
                        htmlsUdong += '</td>'
                    }
                    if (r[i].regist) {
                        htmlsUdong += '<td>'
                        htmlsUdong += '<span>'
                        htmlsUdong += r[i].regist;
                        htmlsUdong += '</span>'
                        htmlsUdong += '</td>'
                    } else {
                        htmlsUdong += '<td>'
                        htmlsUdong += '<span>'
                        htmlsUdong += '</span>'
                        htmlsUdong += '</td>'
                    }
                    if (r[i].name) {
                        htmlsUdong += '<td>'
                        htmlsUdong += '<span>'
                        htmlsUdong += r[i].name;
                        htmlsUdong += '</span>'
                        htmlsUdong += '</td>'
                    } else {
                        htmlsUdong += '<td>'
                        htmlsUdong += '<span>'
                        htmlsUdong += '</span>'
                        htmlsUdong += '</td>'
                    }
                    htmlsUdong += '</tr>'
                }
                if (r[i].company == r[i].owner && r[i].trash == 1) {
                    cntCompa++;
                    htmlsCompa += '<tr id="' + r[i].carNumber + 'cutCompa" onclick="getVeInfo(this.id)" style="cu' +
                            'rsor:pointer;">';
                    htmlsCompa += '<td>'
                    htmlsCompa += '<span>'
                    htmlsCompa += r[i].vehicle2;
                    htmlsCompa += '</span>'
                    htmlsCompa += '</td>'
                    if (r[i].owner) {
                        htmlsCompa += '<td>'
                        htmlsCompa += '<span>'
                        htmlsCompa += r[i].owner;
                        htmlsCompa += '</span>'
                        htmlsCompa += '</td>'
                    } else {
                        htmlsCompa += '<td>'
                        htmlsCompa += '<span>'
                        htmlsCompa += '</span>'
                        htmlsCompa += '</td>'
                    }
                    if (r[i].bus) {
                        htmlsCompa += '<td>'
                        htmlsCompa += '<span>'
                        htmlsCompa += r[i].bus;
                        htmlsCompa += '</span>'
                        htmlsCompa += '</td>'
                    } else {
                        htmlsCompa += '<td>'
                        htmlsCompa += '<span>'
                        htmlsCompa += '</span>'
                        htmlsCompa += '</td>'
                    }
                    if (r[i].regist) {
                        htmlsCompa += '<td>'
                        htmlsCompa += '<span>'
                        htmlsCompa += r[i].regist;
                        htmlsCompa += '</span>'
                        htmlsCompa += '</td>'
                    } else {
                        htmlsCompa += '<td>'
                        htmlsCompa += '<span>'
                        htmlsCompa += '</span>'
                        htmlsCompa += '</td>'
                    }
                    if (r[i].name) {
                        htmlsCompa += '<td>'
                        htmlsCompa += '<span>'
                        htmlsCompa += r[i].name;
                        htmlsCompa += '</span>'
                        htmlsCompa += '</td>'
                    } else {
                        htmlsCompa += '<td>'
                        htmlsCompa += '<span>'
                        htmlsCompa += '</span>'
                        htmlsCompa += '</td>'
                    }
                    htmlsCompa += '</tr>'
                }
                if (r[i].company != r[i].owner && r[i].trash == 1) {

                    cntGae++;
                    htmlsGae += '<tr id="' + r[i].carNumber + 'cutGae" onclick="getVeInfo(this.id)" style="curs' +
                            'or:pointer;">';
                    htmlsGae += '<td>'
                    htmlsGae += '<span>'
                    htmlsGae += r[i].vehicle2;
                    htmlsGae += '</span>'
                    htmlsGae += '</td>'
                    if (r[i].owner) {
                        htmlsGae += '<td>'
                        htmlsGae += '<span>'
                        htmlsGae += r[i].owner;
                        htmlsGae += '</span>'
                        htmlsGae += '</td>'
                    } else {
                        htmlsGae += '<td>'
                        htmlsGae += '<span>'
                        htmlsGae += '</span>'
                        htmlsGae += '</td>'
                    }
                    if (r[i].bus) {
                        htmlsGae += '<td>'
                        htmlsGae += '<span>'
                        htmlsGae += r[i].bus;
                        htmlsGae += '</span>'
                        htmlsGae += '</td>'
                    } else {
                        htmlsGae += '<td>'
                        htmlsGae += '<span>'
                        htmlsGae += '</span>'
                        htmlsGae += '</td>'
                    }
                    if (r[i].regist) {
                        htmlsGae += '<td>'
                        htmlsGae += '<span>'
                        htmlsGae += r[i].regist;
                        htmlsGae += '</span>'
                        htmlsGae += '</td>'
                    } else {
                        htmlsGae += '<td>'
                        htmlsGae += '<span>'
                        htmlsGae += '</span>'
                        htmlsGae += '</td>'
                    }
                    if (r[i].name) {
                        htmlsGae += '<td>'
                        htmlsGae += '<span>'
                        htmlsGae += r[i].name;
                        htmlsGae += '</span>'
                        htmlsGae += '</td>'
                    } else {
                        htmlsGae += '<td>'
                        htmlsGae += '<span>'
                        htmlsGae += '</span>'
                        htmlsGae += '</td>'
                    }
                    htmlsGae += '</tr>'
                }
            }

            $('#ve-tb-all').html(htmls);
            $('#ve-tb-dae').html(htmlsDae);
            $('#ve-tb-jung').html(htmlsJung);
            $('#ve-tb-udong').html(htmlsUdong);
            $('#ve-tb-compa').html(htmlsCompa);
            $('#ve-tb-gae').html(htmlsGae);
            $('#ve-tb-end').html(htmlsEnd);

            $('#bgAll').html(cnt);
            $('#bgDae').html(cntDae);
            $('#bgJung').html(cntJung);
            $('#bgUdong').html(cntUdong);
            $('#bgCompa').html(cntCompa);
            $('#bgGae').html(cntGae);
            $('#bgEnd').html(cntEnd);
        }
    })
}

function getVeInfo(carNumber) {
    return new Promise(function (resolve, reject) {

        tbChoice(carNumber);

        const url = "/ve/vedetail";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };
        const params = {
            "carNumber": carNumber.split('cut')[0]
        };
        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            dataType: "json",
            data: JSON.stringify(params),
            success: function (r) {
                $('#ve00').val(r[0].carNumber);

                const veLen = r[0].vehicle.length - 4;
                const ve1 = r[0]
                    .vehicle
                    .substring(veLen);
                const ve2 = r[0]
                    .vehicle
                    .substring(0, veLen);

                $('#ve01').html('<span>' + ve2 + '</span>');
                $('#ve02').html('<span>' + ve1 + '</span>');

                if (r[0].bus) {
                    $('#ve03').html('<span>' + r[0].bus + '</span>');
                } else {
                    $('#ve03').html('<span>&nbsp;</span>');
                }
                if (r[0].name) {
                    $('#ve04').html('<span>' + r[0].name + '</span>');
                } else {
                    $('#ve04').html('<span>&nbsp;</span>');
                }
                if (r[0].company) {
                    $('#ve20').html('<span>' + r[0].company + '</span>');
                } else {
                    $('#ve20').html('<span>&nbsp;</span>');
                }
                if (r[0].owner) {
                    $('#ve05').html('<span>' + r[0].owner + '</span>');
                } else {
                    $('#ve05').html('<span>&nbsp;</span>');
                }
                if (r[0].brand) {
                    $('#ve06').html('<span>' + r[0].brand + '</span>');
                } else {
                    $('#ve06').html('<span>&nbsp;</span>');
                }
                if (r[0].vename) {
                    $('#ve07').html('<span>' + r[0].vename + '</span>');
                } else {
                    $('#ve07').html('<span>&nbsp;</span>');
                }
                if (r[0].grade) {
                    $('#ve08').html('<span>' + r[0].grade + '</span>');
                } else {
                    $('#ve08').html('<span>&nbsp;</span>');
                }
                if (r[0].num) {
                    $('#ve09').html('<span>' + r[0].num + '인승</span>');
                } else {
                    $('#ve09').html('<span>&nbsp;</span>');
                }
                if (r[0].fuel) {
                    $('#ve10').html('<span>' + r[0].fuel + '</span>');
                } else {
                    $('#ve10').html('<span>&nbsp;</span>');
                }
                if (r[0].regist) {
                    $('#ve11').html('<span>' + r[0].regist + '</span>');
                } else {
                    $('#ve11').html('<span>&nbsp;</span>');
                }
                if (r[0].expire) {
                    $('#ve12').html('<span>' + r[0].expire + '</span>');
                } else {
                    $('#ve12').html('<span>&nbsp;</span>');
                }
                if (r[0].carn) {
                    $('#ve19').html('<span>' + r[0].carn + '</span>');
                } else {
                    $('#ve19').html('<span>&nbsp;</span>');
                }
                if (r[0].price) {
                    $('#ve13').html('<span>&#8361;' + AddComma(r[0].price) + '</span>');
                } else {
                    $('#ve13').html('<span>&nbsp;</span>');
                }
                if (r[0].special) {
                    $('#ve15').html('<span>' + r[0].special + '</span>');
                } else {
                    $('#ve15').html('<span>&nbsp;</span>');
                }
                if (r[0].img1) {
                    $('#ve16').attr('src', veFolder + r[0].img1);
                    $('#ve16-1').attr('href', veFolder + r[0].img1);
                } else {
                    $('#ve16').attr('src', 'img/vehicle/bus1.png');
                    $('#ve16-1').attr('href', 'img/vehicle/bus1.png');
                }
                if (r[0].img2) {
                    $('#ve17').attr('src', veFolder + r[0].img2);
                    $('#ve17-1').attr('href', veFolder + r[0].img2);
                } else {
                    $('#ve17').attr('src', 'img/vehicle/bus2.png');
                    $('#ve17-1').attr('href', 'img/vehicle/bus2.png');
                }
                if (r[0].img3) {
                    $('#ve18').attr('src', veFolder + r[0].img3);
                    $('#ve18-1').attr('href', veFolder + r[0].img3);
                } else {
                    $('#ve18').attr('src', 'img/vehicle/bus3.png');
                    $('#ve18-1').attr('href', 'img/vehicle/bus3.png');
                }
                if (r[0].color) {
                    $('#ve14').attr(
                        'style',
                        'background: ' + r[0].color + '; color: rgba(0, 0, 0, 0);border-radius: 3px;'
                    );
                    $('#ve14-1').val(r[0].color);
                } else {
                    $('#ve14').attr(
                        'style',
                        'background: rgba(0, 0, 0, 0); color: rgba(0, 0, 0, 0);border-radius: 3px;'
                    );
                    $('#ve14-1').val('');
                }

                if (r[0].img1) {
                    updateImg(veFolder + r[0].img1, 've16');
                    $('#ve16-1').attr('href', veFolder + r[0].img1);
                } else {
                    $('#ve16').attr('src', 'img/vehicle/bus1.png');
                    $('#ve16-1').attr('href', 'img/vehicle/bus1.png');
                }
                if (r[0].img2) {
                    updateImg(veFolder + r[0].img2, 've17');
                    $('#ve17-1').attr('href', veFolder + r[0].img2);
                } else {
                    $('#ve17').attr('src', 'img/vehicle/bus2.png');
                    $('#ve17-1').attr('href', 'img/vehicle/bus2.png');
                }
                if (r[0].img3) {
                    updateImg(veFolder + r[0].img3, 've18');
                    $('#ve18-1').attr('href', veFolder + r[0].img3);
                } else {
                    $('#ve18').attr('src', 'img/vehicle/bus3.png');
                    $('#ve18-1').attr('href', 'img/vehicle/bus3.png');
                }
            }
        })
    });
}

$(document).on('keydown', 'input', function (eInner) {
    if ($('#ve-search').is(":focus")) {
        var keyValue = eInner.which; //enter key
        if (keyValue == 27) {
            getVeAll();
            $('#ve-search').val('');
        }
    }
});

$(document).on('click', '#btn-x', function () {
    getVeAll();
    $('#ve-search').val('');
});

$(document).on('click', '#md-Ch', function () {
    if ($('#ve00').val()) {
        $('#modal-insert').modal('show')
        $('#myModalLabel').text('차량 정보 수정');
        setVeCh();
    } else {
        alert('수정 할 차량을 선택해주세요.');
    }
});

$(document).on('click', '#md-New', function () {
    $('#modal-insert').modal('show')
    $('#myModalLabel').text('차량 정보 신규 입력');
    setEmpClr();
});

$('#imgSelector1').change(function () {
    setImageFromFile(this, '#ve-pic-pre1', '#imgSelector1')
});
$('#imgSelector2').change(function () {
    setImageFromFile(this, '#ve-pic-pre2', '#imgSelector2')
});
$('#imgSelector3').change(function () {
    setImageFromFile(this, '#ve-pic-pre3', '#imgSelector3')
});

function setVeCh() {
    setBorder();
    if ($('#ve00').val()) {
        $('#vecarn').val($('#ve00').val());
    } else {
        $('#vecarn').val('');
    }

    const ve = $('#ve01')
        .children()
        .text();

    const ve1 = ve.substring(0, 2);
    const ve2 = ve.substring(2, 4);
    const ve3 = ve.substring(4);
    const ve4 = $('#ve02')
        .children()
        .text();

    $('#vehicle-1').val(ve1);
    $('#vehicle-2').val(ve2);
    $('#vehicle-3').val(ve3);
    $('#vehicle-4').val(ve4);

    if ($('#ve20').children().text() != String.fromCharCode(160)) {
        $('#company').val($('#ve20').children().text());
    } else {
        $('#company').val('');
    };

    if ($('#ve05').children().text() != String.fromCharCode(160)) {
        $('#owner').val($('#ve05').children().text());
    } else {
        $('#owner').val('미정');
    };

    if ($('#ve04').children().text() != String.fromCharCode(160)) {
        $('#id').val($('#ve04').children().text());
    } else {
        $('#id').val('미정');
    };

    if ($('#ve03').children().text() != String.fromCharCode(160)) {
        $('#bus').val($('#ve03').children().text());
    } else {
        $('#bus').val('대형');
    };

    if ($('#ve06').children().text() != String.fromCharCode(160)) {
        $('#brand').val($('#ve06').children().text());
    } else {
        $('#brand').val('');
    };

    if ($('#ve07').children().text() != String.fromCharCode(160)) {
        $('#vename').val($('#ve07').children().text());
    } else {
        $('#vename').val('');
    };

    if ($('#ve08').children().text() != String.fromCharCode(160)) {
        $('#grade').val($('#ve08').children().text());
    } else {
        $('#grade').val('');
    };

    if ($('#ve19').children().text() != String.fromCharCode(160)) {
        $('#carn').val($('#ve19').children().text());
    } else {
        $('#carn').val('');
    };

    if ($('#ve11').children().text() != String.fromCharCode(160)) {
        $('#regist').val($('#ve11').children().text());
    } else {
        $('#regist').val('');
    };

    if ($('#ve12').children().text() != String.fromCharCode(160)) {
        $('#expire').val($('#ve12').children().text());
    } else {
        $('#expire').val('');
    };

    if ($('#ve09').children().text() != String.fromCharCode(160)) {
        $('#num').val($('#ve09').children().text().split('인승')[0]);
    } else {
        $('#num').val('');
    };

    if ($('#ve10').children().text() != String.fromCharCode(160)) {
        $('#fuel').val($('#ve10').children().text());
    } else {
        $('#fuel').val('경유');
    };

    if ($('#ve13').children().text() != String.fromCharCode(160)) {
        $('#price').val($('#ve13').children().text().substring(1));
    } else {
        $('#price').val('');
    };

    if ($('#ve14-1').val()) {
        $('#color').val($('#ve14-1').val());
    } else {
        $('#color').val('');
    };

    if ($('#ve15').children().text() != String.fromCharCode(160)) {
        $('#special').val($('#ve15').children().text());
    } else {
        $('#special').val('');
    };

    $('#ve-pic-pre1').attr('src', $('#ve16').attr('src'));
    $('#ve-pic-pre2').attr('src', $('#ve17').attr('src'));
    $('#ve-pic-pre3').attr('src', $('#ve18').attr('src'));
}

function setEmpClr() {
    setBorder();
    $('#vecarn').val('');

    $("#vehicle-1 option:eq(0)").prop("selected", true);
    $("#vehicle-2 option:eq(0)").prop("selected", true);
    $("#vehicle-3 option:eq(0)").prop("selected", true);
    $('#vehicle-4').val('0000');

    $("#company option:eq(0)").prop("selected", true);

    $("#owner option:eq(0)").prop("selected", true);
    $("#id option:eq(0)").prop("selected", true);

    $("#bus option:eq(0)").prop("selected", true);
    $('#brand').val('');
    $('#vename').val('');
    $('#grade').val('');
    $('#carn').val('');
    $('#regist').val('');
    $('#expire').val('');
    $('#num').val('');
    $("#fuel option:eq(0)").prop("selected", true);
    $('#price').val('');
    $('#color').val('');

    $('#special').val('');
}

function setBorder() {
    $('#vehicle-1').css('border', good);
    $('#vehicle-2').css('border', good);
    $('#vehicle-3').css('border', good);
    $('#vehicle-4').css('border', good);
    $('#brand').css('border', good);
    $('#vename').css('border', good);
    $('#grade').css('border', good);
    $('#carn').css('border', good);
    $('#regist').css('border', good);
    $('#expire').css('border', good);
    $('#num').css('border', good);
}

$(document).on('click', '#btn-insert', function () {
    if ($('#vecarn').val().length > 0) {
        insertVe(1);
    } else {
        insertVe(0);
    }
});

function insertVe(tp) {
    insertPic().then(insertContent);
    function insertPic() {
        return new Promise(function (resolve, reject) {
            var form = $('#ve-form')[0];
            var data = new FormData(form);

            const url = "/ve/veInsertPic";
            $.ajax({
                type: "POST",
                enctype: 'multipart/form-data',
                url: url,
                data: data,
                processData: false,
                contentType: false,
                cache: false,
                timeout: 600000,
                success: function (r) {
                    console.log(r);
                    resolve(r);
                }
            })
        });
    }

    function insertContent(result) {
        return new Promise(function (resolve, reject) {
            let msg = '';

            let ve1 = '';
            let ve2 = '';
            let ve3 = '';
            let ve4 = '';

            let vehicle = '';

            if ($('#vehicle-1').val()) {
                ve1 = $('#vehicle-1').val();
                $('#vehicle-1').css('border', good);
            } else {
                if (msg.length > 0) {
                    msg += '\n - 차량번호1';
                } else {
                    msg = '*필수입력사항을 기입해주세요.';
                    msg += '\n\n - 차량번호1';
                }
                $('#vehicle-1').css('border', bad);
            }
            if ($('#vehicle-2').val()) {
                ve2 = $('#vehicle-2').val();
                $('#vehicle-2').css('border', good);
            } else {
                if (msg.length > 0) {
                    msg += '\n - 차량번호2';
                } else {
                    msg = '*필수입력사항을 기입해주세요.';
                    msg += '\n\n - 차량번호2';
                }
                $('#vehicle-2').css('border', bad);
            }
            if ($('#vehicle-3').val()) {
                ve3 = $('#vehicle-3').val();
                $('#vehicle-3').css('border', good);
            } else {
                if (msg.length > 0) {
                    msg += '\n - 차량번호3';
                } else {
                    msg = '*필수입력사항을 기입해주세요.';
                    msg += '\n\n - 차량번호3';
                }
                $('#vehicle-3').css('border', bad);
            }
            if ($('#vehicle-4').val()) {
                ve4 = $('#vehicle-4').val();
                $('#vehicle-4').css('border', good);
            } else {
                if (msg.length > 0) {
                    msg += '\n - 차량번호4';
                } else {
                    msg = '*필수입력사항을 기입해주세요.';
                    msg += '\n\n - 차량번호4';
                }
                $('#vehicle-4').css('border', bad);
            }

            if ($('#brand').val()) {
                $('#brand').css('border', good);
            } else {
                if (msg.length > 0) {
                    msg += '\n\n - 제조사';
                } else {
                    msg = '*필수입력사항을 기입해주세요.';
                    msg += '\n\n - 제조사';
                }
                $('#brand').css('border', bad);
            }

            if ($('#vename').val()) {
                $('#vename').css('border', good);
            } else {
                if (msg.length > 0) {
                    msg += '\n\n - 차명';
                } else {
                    msg = '*필수입력사항을 기입해주세요.';
                    msg += '\n\n - 차명';
                }
                $('#vename').css('border', bad);
            }

            if ($('#grade').val()) {
                $('#grade').css('border', good);
            } else {
                if (msg.length > 0) {
                    msg += '\n\n - 등급';
                } else {
                    msg = '*필수입력사항을 기입해주세요.';
                    msg += '\n\n - 등급';
                }
                $('#grade').css('border', bad);
            }

            if ($('#carn').val()) {
                $('#carn').css('border', good);
            } else {
                if (msg.length > 0) {
                    msg += '\n\n - 차대번호';
                } else {
                    msg = '*필수입력사항을 기입해주세요.';
                    msg += '\n\n - 차대번호';
                }
                $('#carn').css('border', bad);
            }

            if ($('#regist').val()) {
                $('#regist').css('border', good);
            } else {
                if (msg.length > 0) {
                    msg += '\n\n - 차량등록일';
                } else {
                    msg = '*필수입력사항을 기입해주세요.';
                    msg += '\n\n - 차량등록일';
                }
                $('#regist').css('border', bad);
            }

            if ($('#expire').val()) {
                $('#expire').css('border', good);
            } else {
                if (msg.length > 0) {
                    msg += '\n\n - 차량만료일';
                } else {
                    msg = '*필수입력사항을 기입해주세요.';
                    msg += '\n\n - 차량만료일';
                }
                $('#expire').css('border', bad);
            }

            if ($('#num').val()) {
                $('#num').css('border', good);
            } else {
                if (msg.length > 0) {
                    msg += '\n\n - 승차인원';
                } else {
                    msg = '*필수입력사항을 기입해주세요.';
                    msg += '\n\n - 승차인원';
                }
                $('#num').css('border', bad);
            }

            vehicle = ve1 + ve2 + ve3 + ve4;

            console.log(vehicle);
            console.log(msg);

            const ownerVal = $('#owner').val();
            const owner = $('#owner option')
                .filter(function () {
                    return this.value == ownerVal;
                })
                .data('value');

            console.log(ownerVal);
            console.log(owner);

            const idVal = $('#id').val();
            const id = $('#id option')
                .filter(function () {
                    return this.value == idVal;
                })
                .data('value');

            console.log(idVal);
            console.log(id);

            const compaVal = $('#company').val();
            const compa = $('#company option')
                .filter(function () {
                    return this.value == compaVal;
                })
                .data('value');

            console.log("asdddd  " + result);
            console.log("asdddd  " + tp);

            if (msg.length > 0) {
                alert(msg);
            } else {
                if (result == 1) {} else if (result == 2) {} else {
                    const url = "/ve/veInsert";
                    const headers = {
                        "Content-Type": "application/json",
                        "X-HTTP-Method-Override": "POST"
                    };

                    const params = {
                        "tp": tp,
                        "carNumber": result,
                        "vehicle": vehicle,
                        "company": compa,
                        "owner": owner,
                        "id": id,
                        "bus": $('#bus').val(),
                        "brand": $('#brand').val(),
                        "vename": $('#vename').val(),
                        "grade": $('#grade').val(),
                        "fuel": $('#fuel').val(),
                        "num": $('#num').val(),
                        "color": $('#color').val(),
                        "carn": $('#carn').val(),
                        "regist": $('#regist').val(),
                        "expire": $('#expire').val(),
                        "price": $('#price')
                            .val()
                            .replaceAll(',', ''),
                        "special": $('#special').val()
                    };
                    $.ajax({
                        url: url,
                        type: "POST",
                        headers: headers,
                        dataType: "json",
                        data: JSON.stringify(params),
                        success: function (r) {
                            console.log("결과는!?   " + r);
                            if (tp > 0) {
                                refleshMsg("인사 정보 수정 완료 ");
                            } else {
                                refleshMsg("신규 인사 정보 입력 완료 ");
                            }
                        }
                    });
                }
            }
        });
    }
}