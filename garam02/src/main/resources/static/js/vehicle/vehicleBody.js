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
            let htmls = '';
            for (let i = 0; i < r.length; i++) {
                htmls += '<tr id="' + r[i].carNumber + '" onclick="getVeInfo(this.id)" style="cursor:poi' +
                        'nter;">';
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
            $('#ve-tb').html(htmls);
        }
    })
}

function getVeInfo(carNumber) {
    return new Promise(function (resolve, reject) {
        const url = "/ve/vedetail";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };
        const params = {
            "carNumber": carNumber
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
    $('#modal-insert').modal('show')
    $('#myModalLabel').text('차량 정보 수정');
    setVeCh();
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

    if ($('#ve06').children().text() != String.fromCharCode(160)) {
        $('#carn').val($('#ve06').children().text());
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
    $('#vecarn').val('');

    $('#vehicle-1').val('');
    $('#vehicle-2').val('');
    $('#vehicle-3').val('');
    $('#vehicle-4').val('');

    $('#owner').val('미정');
    $('#id').val('미정');
    $('#bus').val('대형');
    $('#brand').val('');
    $('#vename').val('');
    $('#grade').val('');
    $('#carnumber').val('');
    $('#regist').val('');
    $('#expire').val('');
    $('#num').val('');
    $('#fuel').val('경유');
    $('#price').val('');
    $('#color').val('');

    $('#special').val('');
}

$(document).on('click', '#btn-insert', function () {
    if ($('#vecarn').val().length > 0) {
        insertVe(1);
    } else {
        insertVe(0);
    }
});

function insertVe(tp) {
    insertPic();
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
        return new
        Promise(function (resolve, reject) {

            const ve1 = $('#vehicle-1').val();
            const ve2 = $('#vehicle-2').val();
            const ve3 = $('#vehicle-3').val();
            const ve4 = $('#vehicle-4').val();

            const vehicle = ve1 + ve2 + ve3 + ve4;
            console.log(vehicle);

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

            const url = "/emp/empInsert";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            console.log("asdddd  " + result);
            console.log("asdddd  " + tp);
            if (result == 1) {} else if (result == 2) {} else {
                const params = {
                    "tp": tp,
                    "id": result,
                    "company": $('#company').val(),
                    "kind": $('#kind').val(),
                    "joind": $('#joind').val(),
                    "endd": $('#endd').val(),
                    "name": $('#name').val(),
                    "gender": $('#gender').val(),
                    "birthday": $('#birthday').val(),
                    "phone1": $('#phone1').val(),
                    "phone2": $('#phone2').val(),
                    "address": $('#address').val(),
                    "garage": $('#garage').val(),
                    "bosum": $('#bosum').val(),
                    "bobuj": $('#bobuj').val(),
                    "drvl": $('#drvl').val(),
                    "busl": $('#busl').val(),
                    "memo": $('#memo').val(),
                    "bank": $('#bank').val(),
                    "gye": $('#gye').val(),
                    "gyename": $('#gyename').val(),
                    "basem": $('#basem').val(),
                    "kukm": $('#kukm').val(),
                    "gunm": $('#gunm').val(),
                    "gom": $('#gom').val(),
                    "sanm": $('#sanm').val(),
                    "img": $('#imgSelector').val()
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
                            refleshMsg("인사 정보 수정 완료");
                        } else {
                            refleshMsg("신규 인사 정보 입력 완료");
                        }
                    }
                })
            }
        });
    }
}