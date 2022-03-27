const good = '1px solid #ccc';
const bad = '2px solid rgba(255, 0, 0, 0.5)';

var myModalInsert = new bootstrap.Modal(
    document.getElementById('modal-insert')
);

var myModalFile = new bootstrap.Modal(document.getElementById('modal-file'));

var myModalReg = new bootstrap.Modal(document.getElementById('modal-reg'));
var myModalInsu = new bootstrap.Modal(document.getElementById('modal-insu'));

var myModalJuk = new bootstrap.Modal(document.getElementById('modal-juk'));

$(document).ready(function () {
    LoadingWithMask()
        .then(getVeAll)
        .then(closeLoadingWithMask);
});

$('#sel-ve-1').change(function () {
    const idVal = $('#sel-ve-1').val();
    const iidd = $('#sel-ve-1 option')
        .filter(function () {
            return this.value == idVal;
        })
        .data('id');
    $('#sel-emp-1').val(iidd);
});
$('#sel-ve-2').change(function () {
    const idVal = $('#sel-ve-2').val();
    const iidd = $('#sel-ve-2 option')
        .filter(function () {
            return this.value == idVal;
        })
        .data('id');
    $('#sel-emp-2').val(iidd);
});
$('#sel-ve-3').change(function () {
    const idVal = $('#sel-ve-3').val();
    const iidd = $('#sel-ve-3 option')
        .filter(function () {
            return this.value == idVal;
        })
        .data('id');
    $('#sel-emp-3').val(iidd);
});
$('#sel-ve-4').change(function () {
    const idVal = $('#sel-ve-4').val();
    const iidd = $('#sel-ve-4 option')
        .filter(function () {
            return this.value == idVal;
        })
        .data('id');
    $('#sel-emp-4').val(iidd);
});
$('#sel-ve-5').change(function () {
    const idVal = $('#sel-ve-5').val();
    const iidd = $('#sel-ve-5 option')
        .filter(function () {
            return this.value == idVal;
        })
        .data('id');
    $('#sel-emp-5').val(iidd);
});

$(document).on('click', '#show-aside', function () {
    // if ($('#show-aside-hd').val() > 0) {     $('.nomal-aside').attr('class','');
    // $('#show-aside-hd').val(0); } else {     $('.nomal-aside') .css('width',
    // '70%')         .css('margin-top', '5rem'); $('#show-aside-hd').val(1); }
    let navbar = document.querySelector('.nomal-aside');
    navbar
        .classList
        .toggle('active');
});

function getVeAll(vehicle) {
    return new Promise(function (resolve, reject) {
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
                        htmls += '<span class="tr-ve">'
                        htmls += r[i].vehicle2;
                        htmls += '</span>'
                        htmls += '</td>'
                        if (r[i].name) {
                            htmls += '<td>'
                            htmls += '<span class="tr-emp">'
                            htmls += r[i].name;
                            htmls += '</span>'
                            htmls += '</td>'
                        } else {
                            htmls += '<td>'
                            htmls += '<span>'
                            htmls += '</span>'
                            htmls += '</td>'
                        }
                        if (r[i].owner) {
                            htmls += '<td class="">'
                            htmls += '<span>'
                            htmls += r[i].owner;
                            htmls += '</span>'
                            htmls += '</td>'
                        } else {
                            htmls += '<td class="">'
                            htmls += '<span>'
                            htmls += '</span>'
                            htmls += '</td>'
                        }
                        if (r[i].bus) {
                            htmls += '<td>'
                            htmls += '<span>'
                            htmls += r[i].num;
                            htmls += '인승</span>'
                            htmls += '</td>'
                        } else {
                            htmls += '<td>'
                            htmls += '<span>'
                            htmls += '</span>'
                            htmls += '</td>'
                        }
                        if (r[i].regist) {
                            htmls += '<td class="">'
                            htmls += '<span>'
                            htmls += r[i].regist;
                            htmls += '</span>'
                            htmls += '</td>'
                        } else {
                            htmls += '<td class="">'
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
                        htmlsEnd += '<span class="tr-ve">'
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
                            htmlsEnd += r[i].num;
                            htmlsEnd += '인승</span>'
                            htmlsEnd += '</td>'
                        } else {
                            htmlsEnd += '<td>'
                            htmlsEnd += '<span>'
                            htmlsEnd += '</span>'
                            htmlsEnd += '</td>'
                        }
                        if (r[i].regist) {
                            htmlsEnd += '<td class="">'
                            htmlsEnd += '<span>'
                            htmlsEnd += r[i].regist;
                            htmlsEnd += '</span>'
                            htmlsEnd += '</td>'
                        } else {
                            htmlsEnd += '<td class="">'
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
                        htmlsDae += '<span class="tr-ve">'
                        htmlsDae += r[i].vehicle2;
                        htmlsDae += '</span>'
                        htmlsDae += '</td>'
                        if (r[i].name) {
                            htmlsDae += '<td>'
                            htmlsDae += '<span class="tr-emp">'
                            htmlsDae += r[i].name;
                            htmlsDae += '</span>'
                            htmlsDae += '</td>'
                        } else {
                            htmlsDae += '<td>'
                            htmlsDae += '<span>'
                            htmlsDae += '</span>'
                            htmlsDae += '</td>'
                        }
                        if (r[i].owner) {
                            htmlsDae += '<td class="">'
                            htmlsDae += '<span>'
                            htmlsDae += r[i].owner;
                            htmlsDae += '</span>'
                            htmlsDae += '</td>'
                        } else {
                            htmlsDae += '<td class="">'
                            htmlsDae += '<span>'
                            htmlsDae += '</span>'
                            htmlsDae += '</td>'
                        }
                        if (r[i].bus) {
                            htmlsDae += '<td>'
                            htmlsDae += '<span>'
                            htmlsDae += r[i].num;
                            htmlsDae += '인승</span>'
                            htmlsDae += '</td>'
                        } else {
                            htmlsDae += '<td>'
                            htmlsDae += '<span>'
                            htmlsDae += '</span>'
                            htmlsDae += '</td>'
                        }
                        if (r[i].regist) {
                            htmlsDae += '<td class="">'
                            htmlsDae += '<span>'
                            htmlsDae += r[i].regist;
                            htmlsDae += '</span>'
                            htmlsDae += '</td>'
                        } else {
                            htmlsDae += '<td class="">'
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
                        htmlsJung += '<span class="tr-ve">'
                        htmlsJung += r[i].vehicle2;
                        htmlsJung += '</span>'
                        htmlsJung += '</td>'
                        if (r[i].name) {
                            htmlsJung += '<td>'
                            htmlsJung += '<span class="tr-emp">'
                            htmlsJung += r[i].name;
                            htmlsJung += '</span>'
                            htmlsJung += '</td>'
                        } else {
                            htmlsJung += '<td>'
                            htmlsJung += '<span>'
                            htmlsJung += '</span>'
                            htmlsJung += '</td>'
                        }
                        if (r[i].owner) {
                            htmlsJung += '<td class="">'
                            htmlsJung += '<span>'
                            htmlsJung += r[i].owner;
                            htmlsJung += '</span>'
                            htmlsJung += '</td>'
                        } else {
                            htmlsJung += '<td class="">'
                            htmlsJung += '<span>'
                            htmlsJung += '</span>'
                            htmlsJung += '</td>'
                        }
                        if (r[i].bus) {
                            htmlsJung += '<td>'
                            htmlsJung += '<span>'
                            htmlsJung += r[i].num;
                            htmlsJung += '인승</span>'
                            htmlsJung += '</td>'
                        } else {
                            htmlsJung += '<td>'
                            htmlsJung += '<span>'
                            htmlsJung += '</span>'
                            htmlsJung += '</td>'
                        }
                        if (r[i].regist) {
                            htmlsJung += '<td class="">'
                            htmlsJung += '<span>'
                            htmlsJung += r[i].regist;
                            htmlsJung += '</span>'
                            htmlsJung += '</td>'
                        } else {
                            htmlsJung += '<td class="">'
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
                        htmlsUdong += '<span class="tr-ve">'
                        htmlsUdong += r[i].vehicle2;
                        htmlsUdong += '</span>'
                        htmlsUdong += '</td>'
                        if (r[i].name) {
                            htmlsUdong += '<td>'
                            htmlsUdong += '<span class="tr-emp">'
                            htmlsUdong += r[i].name;
                            htmlsUdong += '</span>'
                            htmlsUdong += '</td>'
                        } else {
                            htmlsUdong += '<td>'
                            htmlsUdong += '<span>'
                            htmlsUdong += '</span>'
                            htmlsUdong += '</td>'
                        }
                        if (r[i].owner) {
                            htmlsUdong += '<td class="">'
                            htmlsUdong += '<span>'
                            htmlsUdong += r[i].owner;
                            htmlsUdong += '</span>'
                            htmlsUdong += '</td>'
                        } else {
                            htmlsUdong += '<td class="">'
                            htmlsUdong += '<span>'
                            htmlsUdong += '</span>'
                            htmlsUdong += '</td>'
                        }
                        if (r[i].bus) {
                            htmlsUdong += '<td>'
                            htmlsUdong += '<span>'
                            htmlsUdong += r[i].num;
                            htmlsUdong += '인승</span>'
                            htmlsUdong += '</td>'
                        } else {
                            htmlsUdong += '<td>'
                            htmlsUdong += '<span>'
                            htmlsUdong += '</span>'
                            htmlsUdong += '</td>'
                        }
                        if (r[i].regist) {
                            htmlsUdong += '<td class="">'
                            htmlsUdong += '<span>'
                            htmlsUdong += r[i].regist;
                            htmlsUdong += '</span>'
                            htmlsUdong += '</td>'
                        } else {
                            htmlsUdong += '<td class="">'
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
                        htmlsCompa += '<span class="tr-ve">'
                        htmlsCompa += r[i].vehicle2;
                        htmlsCompa += '</span>'
                        htmlsCompa += '</td>'
                        if (r[i].name) {
                            htmlsCompa += '<td>'
                            htmlsCompa += '<span class="tr-emp">'
                            htmlsCompa += r[i].name;
                            htmlsCompa += '</span>'
                            htmlsCompa += '</td>'
                        } else {
                            htmlsCompa += '<td>'
                            htmlsCompa += '<span>'
                            htmlsCompa += '</span>'
                            htmlsCompa += '</td>'
                        }
                        if (r[i].owner) {
                            htmlsCompa += '<td class="">'
                            htmlsCompa += '<span>'
                            htmlsCompa += r[i].owner;
                            htmlsCompa += '</span>'
                            htmlsCompa += '</td>'
                        } else {
                            htmlsCompa += '<td class="">'
                            htmlsCompa += '<span>'
                            htmlsCompa += '</span>'
                            htmlsCompa += '</td>'
                        }
                        if (r[i].bus) {
                            htmlsCompa += '<td>'
                            htmlsCompa += '<span>'
                            htmlsCompa += r[i].num;
                            htmlsCompa += '인승</span>'
                            htmlsCompa += '</td>'
                        } else {
                            htmlsCompa += '<td>'
                            htmlsCompa += '<span>'
                            htmlsCompa += '</span>'
                            htmlsCompa += '</td>'
                        }
                        if (r[i].regist) {
                            htmlsCompa += '<td class="">'
                            htmlsCompa += '<span>'
                            htmlsCompa += r[i].regist;
                            htmlsCompa += '</span>'
                            htmlsCompa += '</td>'
                        } else {
                            htmlsCompa += '<td class="">'
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
                        htmlsGae += '<span class="tr-ve">'
                        htmlsGae += r[i].vehicle2;
                        htmlsGae += '</span>'
                        htmlsGae += '</td>'
                        if (r[i].name) {
                            htmlsGae += '<td>'
                            htmlsGae += '<span class="tr-emp">'
                            htmlsGae += r[i].name;
                            htmlsGae += '</span>'
                            htmlsGae += '</td>'
                        } else {
                            htmlsGae += '<td>'
                            htmlsGae += '<span>'
                            htmlsGae += '</span>'
                            htmlsGae += '</td>'
                        }
                        if (r[i].owner) {
                            htmlsGae += '<td class="">'
                            htmlsGae += '<span>'
                            htmlsGae += r[i].owner;
                            htmlsGae += '</span>'
                            htmlsGae += '</td>'
                        } else {
                            htmlsGae += '<td class="">'
                            htmlsGae += '<span>'
                            htmlsGae += '</span>'
                            htmlsGae += '</td>'
                        }
                        if (r[i].bus) {
                            htmlsGae += '<td>'
                            htmlsGae += '<span>'
                            htmlsGae += r[i].num;
                            htmlsGae += '인승</span>'
                            htmlsGae += '</td>'
                        } else {
                            htmlsGae += '<td>'
                            htmlsGae += '<span>'
                            htmlsGae += '</span>'
                            htmlsGae += '</td>'
                        }
                        if (r[i].regist) {
                            htmlsGae += '<td class="">'
                            htmlsGae += '<span>'
                            htmlsGae += r[i].regist;
                            htmlsGae += '</span>'
                            htmlsGae += '</td>'
                        } else {
                            htmlsGae += '<td class="">'
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
                resolve();
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    })
}

function getVeInfo(carNumber) {
    LoadingWithMask()
        .then(get)
        .then(closeLoadingWithMask);

    function get(result) {
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
                    console.log("헤이요");
                    $('#ve00').val(r[0].carNumber);

                    const veLen = r[0].vehicle.length - 4;
                    const ve1 = r[0]
                        .vehicle
                        .substring(veLen);
                    const ve2 = r[0]
                        .vehicle
                        .substring(0, veLen);

                    $('#ve01').html('<span>' + ve2 + '</span>');
                    $('#ve02').html('<span>' + r[0].vehicle + '</span>');

                    if (r[0].bus) {
                        $('#ve03').html('<span>' + r[0].bus + '(' + r[0].num + '인승)</span>');
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
                        const sp = r[0]
                            .special
                            .split('\n');

                        let spec = '';

                        for (let i = 0; i < sp.length; i++) {
                            spec += '<p>' + sp[i] + '</p>'
                        }
                        $('#ve15').html('<span>' + r[0].special + '</span>');
                    } else {
                        $('#ve15').html('<span>&nbsp;</span>');
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
                        updateImg(veFolder + 'img/' + r[0].img1, 've16');
                        $('#ve16-1').attr('href', veFolder + 'img/' + r[0].img1);
                    } else {
                        $('#ve16').attr('src', 'img/vehicle/bus1.png');
                        $('#ve16-1').attr('href', 'img/vehicle/bus1.png');
                    }
                    if (r[0].img2) {
                        updateImg(veFolder + 'img/' + r[0].img2, 've17');
                        $('#ve17-1').attr('href', veFolder + 'img/' + r[0].img2);
                    } else {
                        $('#ve17').attr('src', 'img/vehicle/bus2.png');
                        $('#ve17-1').attr('href', 'img/vehicle/bus2.png');
                    }
                    if (r[0].img3) {
                        updateImg(veFolder + 'img/' + r[0].img3, 've18');
                        $('#ve18-1').attr('href', veFolder + 'img/' + r[0].img3);
                    } else {
                        $('#ve18').attr('src', 'img/vehicle/bus3.png');
                        $('#ve18-1').attr('href', 'img/vehicle/bus3.png');
                    }

                    if (r[0].reg) {
                        $('#ve21').html(
                            '<button class="btn btn-outline-success tct-item-btn" role="button" id="btn-reg' +
                            '">' + r[0].regd + '<i class="bi bi-filetype-pdf"></i></button>'
                        );
                        $('#ve21-1').val(r[0].reg);
                    } else {
                        $('#ve21').html(
                            '<button class="btn btn-outline-secondary tct-item-btn" role="button" id="btn-r' +
                            'eg">없&nbsp;음</button>'
                        );
                        $('#ve21-1').val('');
                    }

                    if (r[0].insu) {
                        $('#ve22').html(
                            '<button class="btn btn-outline-success tct-item-btn" role="button" id="btn-ins' +
                            'u">' + r[0].insud + '<i class="bi bi-filetype-pdf"></i></button>'
                        );
                        $('#ve22-1').val(r[0].insu);
                    } else {
                        $('#ve22').html(
                            '<button class="btn btn-outline-secondary tct-item-btn" role="button" id="btn-i' +
                            'nsu">없&nbsp;음</button>'
                        );
                        $('#ve22-1').val('');
                    }
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
            resolve();
        });
    }
}

$(document).on('keyup', 'input', function (eInner) {
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
        // $('#modal-insert').modal({backdrop: 'static', keyboard: false});
        myModalInsert.show()
        $('#modal-insert-mh').text('차량 정보 수정');
        setVeCh();
    } else {
        alert('수정 할 차량을 선택해주세요.');
    }
});

$(document).on('click', '#md-New', function () {
    // $('#modal-insert').modal({backdrop: 'static', keyboard: false});
    myModalInsert.show()
    $('#modal-insert-mh').text('차량 정보 신규 입력');
    setEmpClr();
});

$(document).on('click', '#md-File', function () {
    // $('#modal-file').modal({backdrop: 'static', keyboard: false});
    myModalFile.show()
    $('#modal-file-mh').text('차량명세서 생성');
});

$(document).on('click', '#md-Juk', function () {
    // $('#modal-juk').modal({backdrop: 'static', keyboard: false});
    myModalJuk.show();
    $('#juk-frame').attr('src', veFolder + 'choice.pdf');
    $('#juk-selector').val('');
    $('#modal-juk-mh').text('교통안전정보 통보서 입력');
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

    $("#carn").attr("disabled", true);
    if (dbCompa.length > 1) {
        $("#vehicle-1").attr("disabled", false);
        $("#vehicle-2").attr("disabled", false);
        $("#vehicle-3").attr("disabled", false);
        $("#vehicle-4").attr("disabled", false);
        $("#company").attr("disabled", false);
    } else {
        $("#vehicle-1").attr("disabled", true);
        $("#vehicle-2").attr("disabled", true);
        $("#vehicle-3").attr("disabled", true);
        $("#vehicle-4").attr("disabled", true);
        $("#company").attr("disabled", true);
    }

    if ($('#ve00').val()) {
        $('#vecarn').val($('#ve00').val());
    } else {
        $('#vecarn').val('');
    }

    const ve = $('#ve02')
        .children()
        .text();

    const ve1 = ve.substring(0, 2);
    const ve2 = ve.substring(2, 4);
    const ve3 = ve.substring(4, 5);
    const ve4 = ve.substring(5);

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

    const iiddddd = $('#ve04').children();
    const iiddddd2 = $(iiddddd[0]).text();

    if (iiddddd2 != String.fromCharCode(160)) {
        $('#id').val(iiddddd2);
    } else {
        $('#id').val('미정');
    };

    if ($('#ve03').children().text() != String.fromCharCode(160)) {
        const buss = ($('#ve03').children().text()).substring(0, 2);
        const numm = ($('#ve03').children().text())
            .substring(2)
            .replaceAll('(', '')
            .replaceAll(')', '')
            .replaceAll('인승', '');
        $('#bus').val(buss);
        $('#num').val(numm);
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

    $("#vehicle-1").attr("disabled", false);
    $("#vehicle-2").attr("disabled", false);
    $("#vehicle-3").attr("disabled", false);
    $("#vehicle-4").attr("disabled", false);
    $("#company").attr("disabled", false);
    $("#carn").attr("disabled", false);

    $('#vecarn').val('');

    $('#ve-pic-pre1').attr('src', 'img/vehicle/bus1.png');
    $('#ve-pic-pre2').attr('src', 'img/vehicle/bus2.png');
    $('#ve-pic-pre3').attr('src', 'img/vehicle/bus3.png');
    $('#imgSelector1').val('');
    $('#imgSelector2').val('');
    $('#imgSelector3').val('');

    $("#vehicle-1 option:eq(0)").prop("selected", true);
    $("#vehicle-2 option:eq(0)").prop("selected", true);
    $("#vehicle-3 option:eq(0)").prop("selected", true);
    $('#vehicle-4').val('');

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
                    console.log("rrr뭐냐   " + r)
                    resolve(r);
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
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

            const ownerVal = $('#owner').val();
            const owner = $('#owner option')
                .filter(function () {
                    return this.value == ownerVal;
                })
                .data('value');

            const idVal = $('#id').val();
            const id = $('#id option')
                .filter(function () {
                    return this.value == idVal;
                })
                .data('value');

            const compaVal = $('#company').val();
            const compa = $('#company option')
                .filter(function () {
                    return this.value == compaVal;
                })
                .data('value');

            if (msg.length > 0) {
                alert(msg);
            } else {
                if (result == 1) {} else if (result == 2) {} else {
                    const url = "/ve/veInsert";
                    const headers = {
                        "Content-Type": "application/json",
                        "X-HTTP-Method-Override": "POST"
                    };

                    const ccaarrnn = result.split('이미지')[0];
                    const mg1 = result.split('이미지')[1];
                    const mg2 = result.split('이미지')[2];
                    const mg3 = result.split('이미지')[3];

                    let iimmgg1 = '';
                    let iimmgg2 = '';
                    let iimmgg3 = '';

                    if (mg1 == '1') {
                        iimmgg1 = ccaarrnn + '_1.PNG'
                    }
                    if (mg2 == '1') {
                        iimmgg2 = ccaarrnn + '_2.PNG'
                    }
                    if (mg3 == '1') {
                        iimmgg3 = ccaarrnn + '_3.PNG'
                    }

                    const params = {
                        "tp": tp,
                        "carNumber": ccaarrnn,
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
                        "special": $('#special').val(),
                        "img1": iimmgg1,
                        "img2": iimmgg2,
                        "img3": iimmgg3
                    };
                    $.ajax({
                        url: url,
                        type: "POST",
                        headers: headers,
                        dataType: "json",
                        data: JSON.stringify(params),
                        success: function (r) {
                            if (tp > 0) {
                                refleshMsg("인사 정보 수정 완료 ");
                            } else {
                                refleshMsg("신규 인사 정보 입력 완료 ");
                            }
                        },
                        error: (jqXHR) => {
                            loginSession(jqXHR.status);
                        }
                    });
                }
            }
        });
    }
}

$(document).on('click', '#btn-excel-d', function () {
    alert(
        "'" + $('#compa-file').val() + "'의 차량명세서\nEXCEL 파일이 다운로드 됩니다.\n\n다운로드 완료 후 '다운로" +
        "드 폴더'를 확인해주세요."
    );
    $('#down-form').attr('action', '/vehicle/excelDown');
    $('#down-form').submit();
    myModalFile.hide();
    // $('#modal-file').modal('hide');
});

$(document).on('click', '#btn-pdf-d', function () {
    alert(
        "'" + $('#compa-file').val() + "'의 차량명세서\nPDF 파일이 다운로드 됩니다.\n\n다운로드 완료 후 '다운로드 " +
        "폴더'를 확인해주세요."
    );
    $('#down-form').attr('action', '/vehicle/pdfDown');
    $('#down-form').submit();
    myModalFile.hide();
});

$(document).on('click', '#btn-reg', function () {
    // $('#modal-reg').modal({backdrop: 'static', keyboard: false});
    myModalReg.show();
    $('#modal-reg-mh').text(
        '  ' + $('#ve02').children().text() + ' 자동차등록증 조회 및 입력'
    );
    setReg();
});

$(document).on('click', '#btn-insu', function () {
    // $('#modal-insu').modal({backdrop: 'static', keyboard: false});
    myModalInsu.show();
    $('#modal-insu-mh').text(
        '  ' + $('#ve02').children().text() + ' 보험가입증명서 조회 및 입력'
    );
    setInsu();
});

function setReg() {
    $('#regcarn').val($('#ve00').val());

    if ($('#ve21-1').val()) {
        updateImg(veFolder + 'reg/' + $('#ve21-1').val(), 'reg-frame');
    } else {
        $('#reg-frame').attr('src', veFolder + "choice.pdf");
    }
}

function setInsu() {
    $('#insucarn').val($('#ve00').val());

    if ($('#ve22-1').val()) {
        updateImg(veFolder + 'insu/' + $('#ve22-1').val(), 'insu-frame');
    } else {
        $('#insu-frame').attr('src', veFolder + "choice.pdf");
    }
}

$('#reg-selector').change(function () {
    setPdfFromFile(this, '#reg-frame', '#reg-selector')
});

$('#insu-selector').change(function () {
    setPdfFromFile(this, '#insu-frame', '#insu-selector')
});

$('#juk-selector').change(function () {
    setPdfFromFile(this, '#juk-frame', '#juk-selector')
});

$(document).on('click', '#reg-insert', function () {
    if ($('#reg-selector').val()) {
        LoadingWithMask();
        var form = $('#form-reg')[0];
        var data = new FormData(form);

        const url = "/ve/veInsertRegPdf";
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
                closeLoadingWithMask();
                switch (r) {
                    case 1:
                        refleshMsg("자동차등록증 수정 완료");
                        break;
                    case 0:
                        refleshMsg("자동차등록증 수정 실패!\n\n다시 시도해 주세요.");
                        break;
                    case 2:
                        refleshMsg("자동차등록증 수정 실패!\n\n파일 확인 후 다시 시도해 주세요.");
                        break;

                    default:
                        break;
                }
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    } else {
        alert("선택된 파일이없습니다.\n\n수정(저장)할 파일을 선택해주세요.");
    }
});

$(document).on('click', '#insu-insert', function () {

    if ($('#insu-selector').val()) {
        LoadingWithMask();
        var form = $('#form-insu')[0];
        var data = new FormData(form);

        console.log($('#insu-selector').val());

        const url = "/ve/veInsertInsuPdf";
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
                closeLoadingWithMask();
                switch (r) {
                    case 1:
                        refleshMsg("보험가입증명서 수정 완료");
                        break;
                    case 0:
                        refleshMsg("보험가입증명서 수정 실패!\n\n다시 시도해 주세요.");
                        break;
                    case 2:
                        refleshMsg("보험가입증명서 수정 실패!\n\n파일 확인 후 다시 시도해 주세요.");
                        break;

                    default:
                        break;
                }
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    } else {
        alert("선택된 파일이없습니다.\n\n수정(저장)할 파일을 선택해주세요.");
    }
});
$(document).on('click', '#juk-insert', function () {

    if ($('#insu-selector').val()) {
        LoadingWithMask();
        var form = $('#form-juk')[0];
        var data = new FormData(form);

        console.log($('#insu-selector').val());

        const url = "/ve/veInsertJukPdf";
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
                closeLoadingWithMask();
                switch (r) {
                    case 1:
                        refleshMsg("보험가입증명서 수정 완료");
                        break;
                    case 0:
                        refleshMsg("보험가입증명서 수정 실패!\n\n다시 시도해 주세요.");
                        break;
                    case 2:
                        refleshMsg("보험가입증명서 수정 실패!\n\n파일 확인 후 다시 시도해 주세요.");
                        break;

                    default:
                        break;
                }
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    } else {
        alert("선택된 파일이없습니다.\n\n수정(저장)할 파일을 선택해주세요.");
    }
});

$(document).on('change', '#company', function () {
    $('#owner').val($('#company').val());
});
