const good = '1px solid #ccc';
const bad = '2px solid rgba(255, 0, 0, 0.5)';

$(document).ready(function () {
    getEmpAll();
});

function getEmpAll(name) {
    const url = "/emp/empAll";
    const headers = {
        "Content-Type": "application/json",
        "X-HTTP-Method-Override": "POST"
    };

    const params = {
        "name": name
    };

    $.ajax({
        url: url,
        type: "POST",
        headers: headers,
        dataType: "json",
        data: JSON.stringify(params),

        success: function (r) {
            let htmls = '';
            let htmlsCompa = '';
            let htmlsSolo = '';
            let htmlsYeb = '';
            let htmlsOutman = '';

            let cnt = 0;
            let cntCompa = 0;
            let cntSolo = 0;
            let cntYeb = 0;
            let cntOutman = 0;

            for (let i = 0; i < r.length; i++) {
                if (r[i].trash == 1) {
                    cnt++;

                    htmls += '<tr id="' + r[i].id + 'cut" onclick="getEmpInfo(this.id)" style="cursor:pointe' +
                            'r;">';
                    htmls += '<td>'
                    htmls += '<span>'
                    htmls += r[i].name;
                    htmls += '</span>'
                    htmls += '</td>'
                    if (r[i].vehicle) {
                        htmls += '<td>'
                        htmls += '<span>'
                        htmls += r[i]
                            .vehicle
                            .substring(r[i].vehicle.length - 4);
                        htmls += '</span>'
                        htmls += '</td>'
                    } else {
                        htmls += '<td>'
                        htmls += '<span>'
                        htmls += '</span>'
                        htmls += '</td>'
                    }
                    if (r[i].kind) {
                        htmls += '<td>'
                        htmls += '<span>'
                        htmls += r[i].kind;
                        htmls += '</span>'
                        htmls += '</td>'
                    } else {
                        htmls += '<td>'
                        htmls += '<span>'
                        htmls += '</span>'
                        htmls += '</td>'
                    }

                    if (r[i].birthday) {
                        htmls += '<td>'
                        htmls += '<span>'
                        htmls += r[i].birthday;
                        htmls += '</span>'
                        htmls += '</td>'
                    } else {
                        htmls += '<td>'
                        htmls += '<span>'
                        htmls += '</span>'
                        htmls += '</td>'
                    }
                    if (r[i].age) {
                        htmls += '<td>'
                        htmls += '<span>'
                        htmls += r[i].age;
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
                    htmls += '</tr>'
                }
                if (r[i].trash == 0) {
                    cntOutman++;

                    htmlsOutman += '<tr id="' + r[i].id + 'cutOutman" onclick="getEmpInfo(this.id)" style="cursor:' +
                            'pointer;">';
                    htmlsOutman += '<td>'
                    htmlsOutman += '<span>'
                    htmlsOutman += r[i].name;
                    htmlsOutman += '</span>'
                    htmlsOutman += '</td>'
                    if (r[i].kind) {
                        htmlsOutman += '<td>'
                        htmlsOutman += '<span>'
                        htmlsOutman += r[i].kind;
                        htmlsOutman += '</span>'
                        htmlsOutman += '</td>'
                    } else {
                        htmlsOutman += '<td>'
                        htmlsOutman += '<span>'
                        htmlsOutman += '</span>'
                        htmlsOutman += '</td>'
                    }
                    if (r[i].birthday) {
                        htmlsOutman += '<td>'
                        htmlsOutman += '<span>'
                        htmlsOutman += r[i].birthday;
                        htmlsOutman += '</span>'
                        htmlsOutman += '</td>'
                    } else {
                        htmlsOutman += '<td>'
                        htmlsOutman += '<span>'
                        htmlsOutman += '</span>'
                        htmlsOutman += '</td>'
                    }
                    if (r[i].age) {
                        htmlsOutman += '<td>'
                        htmlsOutman += '<span>'
                        htmlsOutman += r[i].age;
                        htmlsOutman += '</span>'
                        htmlsOutman += '</td>'
                    } else {
                        htmlsOutman += '<td>'
                        htmlsOutman += '<span>'
                        htmlsOutman += '</span>'
                        htmlsOutman += '</td>'
                    }
                    htmlsOutman += '</tr>'
                }

                if (r[i].kind == '회사' && r[i].trash == 1) {
                    cntCompa++;

                    htmlsCompa += '<tr id="' + r[i].id + 'cutCompa" onclick="getEmpInfo(this.id)" style="cursor:p' +
                            'ointer;">';
                    htmlsCompa += '<td>'
                    htmlsCompa += '<span>'
                    htmlsCompa += r[i].name;
                    htmlsCompa += '</span>'
                    htmlsCompa += '</td>'
                    if (r[i].vehicle) {
                        htmlsCompa += '<td>'
                        htmlsCompa += '<span>'
                        htmlsCompa += r[i]
                            .vehicle
                            .substring(r[i].vehicle.length - 4);
                        htmlsCompa += '</span>'
                        htmlsCompa += '</td>'
                    } else {
                        htmlsCompa += '<td>'
                        htmlsCompa += '<span>'
                        htmlsCompa += '</span>'
                        htmlsCompa += '</td>'
                    }
                    if (r[i].kind) {
                        htmlsCompa += '<td>'
                        htmlsCompa += '<span>'
                        htmlsCompa += r[i].kind;
                        htmlsCompa += '</span>'
                        htmlsCompa += '</td>'
                    } else {
                        htmlsCompa += '<td>'
                        htmlsCompa += '<span>'
                        htmlsCompa += '</span>'
                        htmlsCompa += '</td>'
                    }
                    if (r[i].birthday) {
                        htmlsCompa += '<td>'
                        htmlsCompa += '<span>'
                        htmlsCompa += r[i].birthday;
                        htmlsCompa += '</span>'
                        htmlsCompa += '</td>'
                    } else {
                        htmlsCompa += '<td>'
                        htmlsCompa += '<span>'
                        htmlsCompa += '</span>'
                        htmlsCompa += '</td>'
                    }
                    if (r[i].age) {
                        htmlsCompa += '<td>'
                        htmlsCompa += '<span>'
                        htmlsCompa += r[i].age;
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
                    htmlsCompa += '</tr>'
                }
                if (r[i].kind == '개인' && r[i].trash == 1) {
                    cntSolo++;

                    htmlsSolo += '<tr id="' + r[i].id + 'cutSolo" onclick="getEmpInfo(this.id)" style="cursor:po' +
                            'inter;">';
                    htmlsSolo += '<td>'
                    htmlsSolo += '<span>'
                    htmlsSolo += r[i].name;
                    htmlsSolo += '</span>'
                    htmlsSolo += '</td>'
                    if (r[i].vehicle) {
                        htmlsSolo += '<td>'
                        htmlsSolo += '<span>'
                        htmlsSolo += r[i]
                            .vehicle
                            .substring(r[i].vehicle.length - 4);
                        htmlsSolo += '</span>'
                        htmlsSolo += '</td>'
                    } else {
                        htmlsSolo += '<td>'
                        htmlsSolo += '<span>'
                        htmlsSolo += '</span>'
                        htmlsSolo += '</td>'
                    }
                    if (r[i].kind) {
                        htmlsSolo += '<td>'
                        htmlsSolo += '<span>'
                        htmlsSolo += r[i].kind;
                        htmlsSolo += '</span>'
                        htmlsSolo += '</td>'
                    } else {
                        htmlsSolo += '<td>'
                        htmlsSolo += '<span>'
                        htmlsSolo += '</span>'
                        htmlsSolo += '</td>'
                    }
                    if (r[i].birthday) {
                        htmlsSolo += '<td>'
                        htmlsSolo += '<span>'
                        htmlsSolo += r[i].birthday;
                        htmlsSolo += '</span>'
                        htmlsSolo += '</td>'
                    } else {
                        htmlsSolo += '<td>'
                        htmlsSolo += '<span>'
                        htmlsSolo += '</span>'
                        htmlsSolo += '</td>'
                    }
                    if (r[i].age) {
                        htmlsSolo += '<td>'
                        htmlsSolo += '<span>'
                        htmlsSolo += r[i].age;
                        htmlsSolo += '</span>'
                        htmlsSolo += '</td>'
                    } else {
                        htmlsSolo += '<td>'
                        htmlsSolo += '<span>'
                        htmlsSolo += '</span>'
                        htmlsSolo += '</td>'
                    }
                    if (r[i].bus) {
                        htmlsSolo += '<td>'
                        htmlsSolo += '<span>'
                        htmlsSolo += r[i].bus;
                        htmlsSolo += '</span>'
                        htmlsSolo += '</td>'
                    } else {
                        htmlsSolo += '<td>'
                        htmlsSolo += '<span>'
                        htmlsSolo += '</span>'
                        htmlsSolo += '</td>'
                    }
                    htmlsSolo += '</tr>'
                }
                if (r[i].kind == '예비' && r[i].trash == 1) {
                    cntYeb++;

                    htmlsYeb += '<tr id="' + r[i].id + 'cutYeb" onclick="getEmpInfo(this.id)" style="cursor:poi' +
                            'nter;">';
                    htmlsYeb += '<td>'
                    htmlsYeb += '<span>'
                    htmlsYeb += r[i].name;
                    htmlsYeb += '</span>'
                    htmlsYeb += '</td>'
                    if (r[i].kind) {
                        htmlsYeb += '<td>'
                        htmlsYeb += '<span>'
                        htmlsYeb += r[i].kind;
                        htmlsYeb += '</span>'
                        htmlsYeb += '</td>'
                    } else {
                        htmlsYeb += '<td>'
                        htmlsYeb += '<span>'
                        htmlsYeb += '</span>'
                        htmlsYeb += '</td>'
                    }
                    if (r[i].birthday) {
                        htmlsYeb += '<td>'
                        htmlsYeb += '<span>'
                        htmlsYeb += r[i].birthday;
                        htmlsYeb += '</span>'
                        htmlsYeb += '</td>'
                    } else {
                        htmlsYeb += '<td>'
                        htmlsYeb += '<span>'
                        htmlsYeb += '</span>'
                        htmlsYeb += '</td>'
                    }
                    if (r[i].age) {
                        htmlsYeb += '<td>'
                        htmlsYeb += '<span>'
                        htmlsYeb += r[i].age;
                        htmlsYeb += '</span>'
                        htmlsYeb += '</td>'
                    } else {
                        htmlsYeb += '<td>'
                        htmlsYeb += '<span>'
                        htmlsYeb += '</span>'
                        htmlsYeb += '</td>'
                    }
                    htmlsYeb += '</tr>'
                }
            }
            $('#emp-tb-all').html(htmls);
            $('#emp-tb-compa').html(htmlsCompa);
            $('#emp-tb-solo').html(htmlsSolo);
            $('#emp-tb-yeb').html(htmlsYeb);
            $('#emp-tb-outman').html(htmlsOutman);

            $('#bgAll').text(cnt);
            $('#bgCompa').text(cntCompa);
            $('#bgSolo').text(cntSolo);
            $('#bgYeb').text(cntYeb);
            $('#bgOutman').text(cntOutman);
        }
    })
}

function getEmpInfo(id) {
    return new Promise(function (resolve, reject) {

        tbChoice(id);

        const url = "/emp/empdetail";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const params = {
            "id": id.split('cut')[0]
        };

        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            dataType: "json",
            data: JSON.stringify(params),

            success: function (r) {
                if (r[0].id) {
                    $('#emp00').val(r[0].id);
                } else {
                    $('#emp01').val('');
                }

                if (r[0].company) {
                    $('#emp01').html('<span>' + r[0].company + '</span>');
                } else {
                    $('#emp01').html('<span></span>');
                }

                if (r[0].kind) {
                    $('#emp02').html('<span>' + r[0].kind + '</span>');
                } else {
                    $('#emp02').html('<span></span>');
                }
                if (r[0].name) {
                    $('#emp03').html('<span>' + r[0].name + '</span>');
                } else {
                    $('#emp03').html('<span></span>');
                }
                if (r[0].vehicle) {
                    $('#emp04').html('<span>' + r[0].vehicle + '</span>');
                } else {
                    $('#emp04').html('<span></span>');
                }
                if (r[0].birthday) {
                    $('#emp05').html(
                        '<span>' + r[0].birthday + '(' + r[0].age + ')</span><input type="hidden" id="e' +
                        'mp05-1" value="' + r[0].birthday + '">'
                    );
                    $('#emp05-1').val(r[0].birthday);
                } else {
                    $('#emp05').html('<span></span><input type="hidden" id="emp05-1" value="">');
                    $('#emp05-1').val('');
                }
                if (r[0].gender) {
                    $('#emp06').html('<span>' + r[0].gender + '</span>');
                } else {
                    $('#emp06').html('<span></span>');
                }
                if (r[0].phone1) {
                    $('#emp07').html('<span>' + r[0].phone1 + '</span>');
                } else {
                    $('#emp07').html('<span></span>');
                }
                if (r[0].phone2) {
                    $('#emp09').html('<span>' + r[0].phone2 + '</span>');
                } else {
                    $('#emp09').html('<span></span>');
                }
                if (r[0].address) {
                    $('#emp11').html('<span>' + r[0].address + '</span>');
                } else {
                    $('#emp11').html('<span></span>');
                }
                if (r[0].garage) {
                    $('#emp12').html('<span>' + r[0].garage + '</span>');
                } else {
                    $('#emp12').html('<span></span>');
                }
                if (r[0].joind) {
                    $('#emp13').html(
                        '<span>' + r[0].joind + '(' + r[0].joindDay + ')</span><input type="hidden" id=' +
                        '"emp13-1" value="' + r[0].joind + '">'
                    );
                } else {
                    $('#emp13').html('<span></span><input type="hidden" id="emp13-1" value="">');
                }

                if (r[0].endd) {
                    $('#emp14').html(
                        '<span>' + r[0].endd + '</span><input type="hidden" id="emp14-1" value="' + r[0].endd +
                        '">'
                    );
                } else {
                    $('#emp14').html('<span></span><input type="hidden" id="emp14-1" value="">');
                }
                if (r[0].drvl) {
                    $('#emp15').html('<span>' + r[0].drvl + '</span>');
                } else {
                    $('#emp15').html('<span></span>');
                }
                if (r[0].busl) {
                    $('#emp16').html('<span>' + r[0].busl + '</span>');
                } else {
                    $('#emp16').html('<span></span>');
                }
                if (r[0].bosum) {
                    $('#emp17').html(
                        '<span>' + r[0].bosum + '(' + r[0].bobuj + ')</span><input type="hidden" id="em' +
                        'p17-1" value="' + r[0].bosum + '"><input type="hidden" id="emp17-2" value="' +
                        r[0].bobuj + '">'
                    );
                } else {
                    $('#emp17').html(
                        '<span></span><input type="hidden" id="emp17-1" value=""><input type="hidden" i' +
                        'd="emp17-2" value="">'
                    );
                }
                if (r[0].bank) {
                    $('#emp18').html(
                        '<span>' + r[0].bank + '&nbsp;' + r[0].gye + '&nbsp;' + r[0].gyename + '</span>' +
                        '<input type="hidden" id="emp18-1" value="' + r[0].bank + '"><input type="hidde' +
                        'n" id="emp18-2" value="' + r[0].gye + '"><input type="hidden" id="emp18-3" val' +
                        'ue="' + r[0].gyename + '">'
                    );
                } else {
                    $('#emp18').html('<span></span>');
                }

                if (r[0].memo) {
                    $('#emp19').html('<span>' + r[0].memo + '</span>');
                } else {
                    $('#emp19').html('<span></span>');
                }

                if (r[0].basem) {
                    $('#emp20').val(r[0].basem);
                } else {
                    $('#emp20').val('');
                }
                if (r[0].kukm) {
                    $('#emp21').val(r[0].kukm);
                } else {
                    $('#emp21').val('');
                }
                if (r[0].gunm) {
                    $('#emp22').val(r[0].gunm);
                } else {
                    $('#emp22').val('');
                }
                if (r[0].gom) {
                    $('#emp23').val(r[0].gom);
                } else {
                    $('#emp23').val('');
                }
                if (r[0].sanm) {
                    $('#emp24').val(r[0].sanm);
                } else {
                    $('#emp24').val('');
                }

                if (r[0].img) {
                    updateImg(empFolder + 'img/' + r[0].img, 'empPic');
                    $('#empPic-a').attr('href', empFolder + 'img/' + r[0].img);
                } else {
                    $('#empPic').attr('src', 'img/employee/emp.png');
                    $('#empPic-a').attr('href', 'img/employee/emp.png');
                }
            }
        })
    });
}

$(document).on('click', '#btn-x', function () {
    getEmpAll();
    $('#emp-search').val('');
});

$(document).on('keydown', 'input', function (eInner) {
    if ($('#emp-search').is(":focus")) {
        var keyValue = eInner.which; //enter key
        if (keyValue == 27) {
            getEmpAll();
            $('#emp-search').val('');
        }
    }
});

$('#imgSelector').change(function () {
    setImageFromFile(this, '#emp-pic-pre', '#imgSelector')
    console.log("dasdadwad  " + $('#imgSelector').val());
});

$(document).on('click', '#md-Ch', function () {
    $('#modal-insert').modal('show')
    setEmpCh();
});
$(document).on('click', '#md-New', function () {
    $('#modal-insert').modal('show')
    setEmpClr();
});

function setEmpCh() {
    setBorder();

    if ($('#emp00').val()) {
        $('#id').val($('#emp00').val());
        $('#empid').val($('#emp00').val());
    } else {
        $('#id').val('');
        $('#empid').val('');
    }

    $('#emp-pic-pre').attr('src', $('#empPic').attr('src'));

    $('#name').val($('#emp03').children().text());
    $('#birthday').val($('#emp05-1').val());
    $('#gender').val($('#emp06').children().text());
    $('#company').val($('#emp01').children().text());
    $('#kind').val($('#emp02').children().text());
    $('#phone1').val($('#emp07').children().text());
    $('#phone2').val($('#emp09').children().text());

    $('#address').val($('#emp11').children().text());
    $('#garage').val($('#emp12').children().text());

    if ($('#emp13-1').val()) {
        $('#joind').val($('#emp13-1').val());
    } else {
        $('#joind').val('');
    }

    if ($('#emp14-1').val()) {
        $('#endd').val($('#emp14-1').val());
    } else {
        $('#endd').val('');
    }

    $('#drvl').val($('#emp15').children().text());
    $('#busl').val($('#emp16').children().text());
    $('#bosum').val($('#emp17-1').val());
    $('#bobuj').val($('#emp17-2').val());

    $('#bank').val($('#emp18-1').val());
    $('#gye').val($('#emp18-2').val());
    $('#gyename').val($('#emp18-3').val());

    $('#memo').val($('#emp19').children().text());

    $('#basem').val($('#emp20').val());
    $('#kukm').val($('#emp21').val());
    $('#gunm').val($('#emp22').val());
    $('#gom').val($('#emp23').val());
    $('#sanm').val($('#emp24').val());
}

function setEmpClr() {
    setBorder();

    $('#id').val('');

    $('#emp-pic-pre').attr('src', 'img/employee/emp.png');

    $('#name').val('');
    $('#birthday').val('');
    $("#gender option:eq(0)").prop("selected", true);
    $("#company option:eq(0)").prop("selected", true);
    $("#kind option:eq(0)").prop("selected", true);
    $('#phone1').val('');
    $('#phone2').val('');

    $('#address').val('');
    $('#garage').val('');

    const now = toStringByFormatting(new Date());
    $('#joind').val(now);
    $('#endd').val('');

    $('#drvl').val('');
    $('#busl').val('');
    $('#bosum').val('');
    $("#bobuj option:eq(0)").prop("selected", true);

    $('#bank').val('');
    $('#gye').val('');
    $('#gyename').val('');

    $('#memo').val('');

    $('#basem').val(0);
    $('#kukm').val(0);
    $('#gunm').val(0);
    $('#gom').val(0);
    $('#sanm').val(0);
}
function setBorder() {
    $('#name').css('border', good);
}

$(document).on('click', '#btn-insert', function () {
    if ($('#id').val().length > 0) {
        insertEmp(1);
    } else {
        insertEmp(0);
    }
});

function insertEmp(tp) {
    insertPic().then(insertContent);

    function insertPic() {
        return new Promise(function (resolve, reject) {
            var form = $('#emp-form')[0];
            // Create an FormData object
            var data = new FormData(form);

            const url = "/emp/empInsertPic";
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

            if ($('#name').val()) {
                ve1 = $('#name').val();
                $('#name').css('border', good);
            } else {
                msg = '*필수입력사항을 기입해주세요.';
                msg += '\n\n - 승무원 이름';
                $('#name').css('border', bad);
            }

            if (msg.length > 0) {
                alert(msg);
            } else {
                if (result == 1) {
                    alert("사진 파일 확인 후 다른 파일로 다시 업로드해주세요.");
                } else if (result == 2) {
                    alert("인터넷 연결 상태를 확인해주세요.\n반복적으로 이 메세지가 발생하면 담당자에게 문의해주세요.");
                } else {
                    if ($('#endd').val()) {
                        console.log("asdasd  " + $('#endd').val());
                        if (confirm(
                            $('#name').val() + " 승무원을 퇴사 처리하시겠습니까?\n\n('퇴사일'을 입력하면 해당 승무원은 퇴사 처리됩니다.)"
                        )) {
                            insert(result);
                        }
                    } else {
                        insert(result);
                    }
                }
            }
        });
    }
    function insert(id) {
        const url = "/emp/empInsert";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const iidd = id.split('이미지')[0];
        const iimmgg = id.split('이미지')[1];
        let inimg = '';

        if (iimmgg == '1') {
            inimg = iidd + '.PNG';
        }
        const params = {
            "tp": tp,
            "id": iidd,
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
            "img": inimg
        };
        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            dataType: "json",
            data: JSON.stringify(params),
            success: function (r) {
                if (tp > 0) {
                    refleshMsg("인사 정보 수정 완료");
                } else {
                    refleshMsg("신규 인사 정보 입력 완료");
                }
            }
        });
    }
}

$(document).on('click', '#empPic', function () {
    console.log("요요 사진사진사진");
});