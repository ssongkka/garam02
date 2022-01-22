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
                const veLen = r[0].vehicle.length - 4;

                const ve1 = r[0]
                    .vehicle
                    .substring(veLen);
                const ve2 = r[0]
                    .vehicle
                    .substring(0, veLen);

                console.log(veLen);
                console.log(ve1);
                console.log(ve2);
                console.log("하이요");

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
                } else {
                    $('#ve16').attr('src', 'img/vehicle/bus1.png');
                }
                if (r[0].img2) {
                    $('#ve17').attr('src', veFolder + r[0].img2);
                } else {
                    $('#ve17').attr('src', 'img/vehicle/bus2.png');
                }
                if (r[0].img3) {
                    $('#ve18').attr('src', veFolder + r[0].img3);
                } else {
                    $('#ve18').attr('src', 'img/vehicle/bus3.png');
                }
                if (r[0].color) {
                    $('#ve14').attr(
                        'style',
                        'background: ' + r[0].color + '; color: rgba(0, 0, 0, 0);border-radius: 3px;'
                    );
                } else {
                    $('#ve14').attr(
                        'style',
                        'background: rgba(0, 0, 0, 0); color: rgba(0, 0, 0, 0);border-radius: 3px;'
                    );
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
});

$(document).on('click', '#md-New', function () {
    $('#modal-insert').modal('show')
});