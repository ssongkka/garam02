$(document).on('click', '#md-rgNew', function () {
    $('#user-plus').hide();
    $('#userPlus').attr(
        'class',
        'fas fa-plus-circle BaseButton--skinGray size_default col-xs-12 plus-btn'
    );

    $('#modal-rginsert').modal({backdrop: 'static', keyboard: false});
});

$(document).on('click', '#btnUserPlus', function () {
    if ($('#user-plus').is(":visible")) {
        $('#user-plus').hide();
        $('#userPlus').attr(
            'class',
            'fas fa-plus-circle BaseButton--skinGray size_default col-xs-12 plus-btn'
        );
        $('#userPlus').attr('title', '고객정보 지우기');
    } else {
        $('#user-plus').show();
        $('#userPlus').attr(
            'class',
            'fas fa-minus-circle BaseButton--skinGray size_default col-xs-12 plus-btn'
        );
        $('#userPlus').attr('title', '닫기');
    }
});

$(document).on('click', '#eraser', function () {

    if (confirm('입력 내용을 지우시겠습니까?')) {
        $('#ctmno').val('');

        $('#ctmname').val('');
        $('#ctmtel1').text('');
        $('#ctmstp').text('');
        $('#ctmdetail').text('');
        $('#ctmtel2').text('');
        $('#ctmfax').text('');
        $('#ctmaddress').text('');
        $('#ctmemail').text('');
        $('#ctmcompanum').text('');
        $('#ctmhomepage').text('');
        $('#ctmhomepage').attr('href', '');

        const aaa = document.getElementsByClassName('dash-cal-con-item-t');
        const bbb = aaa[0].getElementsByTagName('div')[0];
        const ccc = bbb.childNodes[1];
        const ddd = ccc.value;

        $('#rsvt').val('');

        $('#stday').val(ddd);
        $('#endday').val(ddd);

        $('#stt').val('08:30');
        $('#endt').val('08:30');

        $('#bus').val('대형');
        $('#num').val('1');

        $('#rsvpstp').val('');
        $('#desty').val('');
        $('#rsvtdetail').val('');
        $('#cont').val('포함');
        $('#conm').val('');

        $('#daynight').text('');

        $('html').scrollTop(0);

        $("#ctmname").focus();
    }
});

$("#ctmname").change(function () {

    var val = $('#ctmname').val();
    var idNum = $('#name-cho option')
        .filter(function () {
            return this.value == val;
        })
        .data('value');

    const url = "/customer/name";
    const headers = {
        "Content-Type": "application/json",
        "X-HTTP-Method-Override": "POST"
    };

    const params = {
        "ctmno": idNum
    };

    $.ajax({
        url: url,
        type: "POST",
        headers: headers,
        dataType: "json",
        data: JSON.stringify(params),
        success: function (r) {
            if (r.length > 0) {
                $('#ctmno').val('');
                $('#radio0').prop('checked', true);
                $('#ctmtel1').text('');
                $('#ctmstp').text('');
                $('#ctmdetail').text('');
                $('#ctmtel2').text('');
                $('#ctmfax').text('');
                $('#ctmaddress').text('');
                $('#ctmemail').text('');
                $('#ctmcompanum').text('');
                $('#ctmhomepage').text('');
                $('#ctmhomepage').attr('href', '');

                $('#ctmtrash').val(1);
                $('#ctmno').val(r[0].ctmno);

                if (r[0].ctmsepa === 0) {
                    $('#radio0').prop('checked', true);
                } else if (r[0].ctmsepa === 1) {
                    $('#radio1').prop('checked', true);
                } else if (r[0].ctmsepa === 2) {
                    $('#radio2').prop('checked', true);
                };

                if (r[0].ctmtel1) {
                    $('#ctmtel1').text(r[0].ctmtel1);
                }
                if (r[0].ctmstp) {
                    $('#ctmstp').text(r[0].ctmstp);
                    $('#rsvpstp').text($('#ctmstp').val());
                }
                if (r[0].ctmdetail) {
                    $('#ctmdetail').text(r[0].ctmdetail);
                }
                if (r[0].ctmtel2) {
                    $('#ctmtel2').text(r[0].ctmtel2);
                }
                if (r[0].ctmfax) {
                    $('#ctmfax').text(r[0].ctmfax);
                }
                if (r[0].ctmaddress) {
                    $('#ctmaddress').text(r[0].ctmaddress);
                }
                if (r[0].ctmemail) {
                    $('#ctmemail').text(r[0].ctmemail);
                }
                if (r[0].ctmcompanum) {
                    $('#ctmcompanum').text(r[0].ctmcompanum);
                }
                if (r[0].ctmhomepage) {
                    $('#ctmhomepage').text(r[0].ctmhomepage);
                    $('#ctmhomepage').attr('href', r[0].ctmhomepage);
                }
            } else {
                alert("고객정보가 없습니다.\n\n고객정보를 입력해주세요.")
                $("#ctmname").focus();
            }
        },
        error: (jqXHR) => {
            loginSession(jqXHR.status);
        }
    });
});

$(document).on('click', '#ername', function () {
    ernm();
});

$(document).on('keydown', 'input', function (eInner) {
    if ($('#ctmname').is(":focus")) {
        var keyValue = eInner.which; //enter key
        if (keyValue == 8 || keyValue == 27 || keyValue == 46) {
            ernm();
        }
    }
});

function ernm() {
    $('#radio0').prop('checked', true);
    $('#ctmno').val('');
    $('#ctmtrash').val(2);

    $('#ctmname').val('');
    $('#ctmtel1').text('');
    $('#ctmstp').text('');
    $('#ctmdetail').text('');
    $('#ctmtel2').text('');
    $('#ctmfax').text('');
    $('#ctmaddress').text('');
    $('#ctmhomepage').text('');
    $('#ctmhomepage').attr('href', '');
}

$(document).on('change', '#chsame', function () {
    if ($('#chsame').is(':checked')) {
        if ($('#ctmno').val().length > 0) {
            $('#regcompany').val($('#ctmname').val());
            $('#regaddress').val($('#ctmaddress').text());
            $('#regphone').val($('#ctmtel1').text());
        } else {
            $('#chsame').prop('checked', false);
            alert("거래처 정보를 먼저 불러와 주세요.");
        }
    } else {
        $('#regcompany').val('');
        $('#regaddress').val('');
        $('#regphone').val('');
    }
});

$(document).on('click', '#btn-rginsert', function () {
    if ($('#ctmno').val().length < 1) {
        alert("거래처를 입력해주세요.");
        $('#ctmname').focus();
        return;
    }
    if (!$('#regcompany').val()) {
        alert("회사이름을 입력해주세요.");
        $('#regcompany').focus();
        return;
    }
    if (!$('#regaddress').val()) {
        alert("회사주소를 입력해주세요.");
        $('#regaddress').focus();
        return;
    }
    if (!$('#regperson').val()) {
        alert("담당자 또는 담당부서를 입력해주세요.");
        $('#regperson').focus();
        return;
    }
    if (!$('#regphone').val()) {
        alert("담당 연락처를 입력해주세요.");
        $('#regphone').focus();
        return;
    }
    if (!$('#regstartd').val()) {
        alert("계약시작일을 입력해주세요.");
        $('#regstartd').focus();
        return;
    }
    if (!$('#chsame').is(':checked') && !$('#regendd').val()) {
        alert("계약 종료일을 입력해주세요.\n\n계약 종료일이 없으면 '계약기간없음'에 체크해주세요.");
        $('#regendd').focus();
        return;
    }
    if (!$('#regcontract').val()) {
        alert("계약형태를 입력해주세요.");
        $('#regcontract').focus();
        return;
    }
    formReg.submit();
});
$(document).on('change', '#regstartd', function () {
    const tmpd = ($("#regstartd").val()).split('-');
    console.log(tmpd);

    let date = new Date(tmpd[0], parseInt(tmpd[1]) - 1, tmpd[2]);
    date.setFullYear(date.getFullYear() + 1);
    date.setDate(date.getDate() - 1);

    $("#regendd").val(toStringByFormatting(date));
    dateInput();
});

$(document).on('change', '#noPeriod', function () {
    if ($('#noPeriod').is(':checked')) {
        $("#regendd").val('');
        $("#daynight").text('');
        $("#regendd").attr("disabled", true);
    } else {
        $("#regendd").attr("disabled", false);
    }
});

$(document).on('change', '#regendd', function () {
    dateInput();
});

function dateInput() {
    const origin = $("#regendd").val();
    const std = $("#regstartd").val();
    const edd = $("#regendd").val();

    const beet = betweenDateNum(std, edd);

    const yyy = parseInt(beet / 365);
    const mmm = parseInt((beet % 365) / 30);
    const ddd = parseInt(((beet % 365) % 30));

    let rtn = '';

    if (yyy > 0) {
        rtn += yyy + '년';
    }
    if (mmm > 0) {
        rtn += mmm + '개월';
    }
    if (ddd > 0) {
        rtn += ddd + '일';
    }

    if (beet > 1) {
        $("#daynight").text(rtn);
        $("#daynight").css('color', 'blue');
    } else {
        $("#endday").val(origin);
        $("#daynight").text('  도착일을 확인해주세요!!!');
        $("#daynight").css('color', 'red');
    }
}