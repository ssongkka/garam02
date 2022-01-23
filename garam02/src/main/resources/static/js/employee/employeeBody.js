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
            for (let i = 0; i < r.length; i++) {
                htmls += '<tr id="' + r[i].id +
                        '" onclick="getEmpInfo(this.id)" style="cursor:pointer;">';
                htmls += '<td>'
                htmls += '<span>'
                htmls += r[i].name;
                htmls += '</span>'
                htmls += '</td>'
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
                if (r[i].vehicle) {
                    htmls += '<td>'
                    htmls += '<span>'
                    htmls += r[i].vehicle;
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
            $('#emp-tb').html(htmls);
        }
    })
}

function getEmpInfo(id) {
    return new Promise(function (resolve, reject) {
        const url = "/emp/empdetail";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const params = {
            "id": id
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
                    '<span>' + r[0].endd + '(' + r[0].endd + ')</span><input type="hidden" id="emp1' +
                            '4-1" value="' + r[0].endd + '">'
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
                    updateImg(empFolder + r[0].img, 'empPic');
                    $('#empPic-a').attr('href', empFolder + r[0].img);
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
    $('#id').val('');
    $('#name').val('');
    $('#birthday').val('');
    $('#gender').val('');
    $('#company').val('');
    $('#kind').val('');
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
    $('#bobuj').val('');

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
        return new
        Promise(function (resolve, reject) {
            const url = "/emp/empInsert";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            if (result == 1) {
                alert("사진 파일 확인 후 다른 파일로 다시 업로드해주세요.");
            } else if (result == 2) {
                alert("인터넷 연결 상태를 확인해주세요.\n반복적으로 이 메세지가 발생하면 담당자에게 문의해주세요.");
            } else {
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
                    "img": result + '.png'
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

$(document).on('click', '#empPic', function () {
    console.log("요요 사진사진사진");
});