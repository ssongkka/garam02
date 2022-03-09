const calen_Rsvt = new cal();

$(document).ready(function () {
    $("#ctmname").focus();

    $('#user-plus').hide();
    $('#userPlus').attr(
        'class',
        'fas fa-plus-circle BaseButton--skinGray size_default col-xs-12 plus-btn'
    );

    dateInput();
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

function setStEdDay(day) {
    $('#stday').val(day);
    $('#endday').val(day);
}

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

$(document).on('change', '#stday', function () {
    $("#endday").val($("#stday").val())
    dateInput();
});

$(document).on('change', '#endday', function () {
    dateInput();
});

function dateInput() {
    const origin = $("#endday").val();
    const std = $("#stday").val();
    const edd = $("#endday").val();

    const beet = betweenDateNum(std, edd);

    if (beet > 1) {
        $("#daynight").text(' (' + (
            beet - 1
        ) + '박' + beet + '일)');
        $("#daynight").css('color', 'blue');
    } else if (beet == 1) {
        $("#daynight").text(' (당일)');
        $("#daynight").css('color', 'blue');
    } else {
        $("#endday").val(origin);
        $("#daynight").text('  도착일을 확인해주세요!!!');
        $("#daynight").css('color', 'red');
    }
}

$(document).on('click', '#eraser', function () {

    if (confirm('입력 내용을 지우시겠습니까?')) {
        $('#ctmno').val('0');

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
    $('#ctmno').val('0');
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

$(document).on('click', '#insert-rsvt', function () {

    $('#conm').val($('#conm').val().replaceAll(',', ''));
    switch ($('#cont').val()) {
        case '포함':
            $('#numm').val(Math.floor(($('#conm').val() / 1.1) / $('#num').val()));
            break;
        case '카드':
            $('#numm').val(Math.floor(($('#conm').val() / optCard) / $('#num').val()));
            break;
        default:
            $('#numm').val(Math.floor($('#conm').val() / $('#num').val()));
            break;
    }
    if ($('#ctmname').val() && $('#ctmtel1').text()) {
        formRsvt.submit();
    } else {
        alert("고객정보를 입력해주세요.\n\n고객이름과 연락처는 꼭 입력하셔야합니다.");
    }
});
$(document).on('click', '#many-insert', function () {
    // var w = 800; var h = 900; var xPos = (document.body.offsetWidth) - w; xPos +=
    // window.screenLeft; var yPos = 10;

    window.open('/dashboard/rsvtMany', 'ot');
});

$(document).on('click', '#customerInsertMo', function () {
    $('#customerModal').modal({backdrop: 'static', keyboard: false});
    $('#modalName').focus();
});
$(document).on('click', '#btn-custom-modal', function () {

    const url = "/rsvtmany/insertctm";
    const headers = {
        "Content-Type": "application/json",
        "X-HTTP-Method-Override": "POST"
    };
    console.log($('[name=ctmsepa]').val());
    const params = {
        "ctmsepa": $('[name=ctmsepa]').val(),
        "ctmname": $('[name=ctmname]').val(),
        "ctmaddress": $('[name=ctmaddress]').val(),
        "ctmstp": $('[name=ctmstp]').val(),
        "ctmtel1": $('[name=ctmtel1]').val(),
        "ctmtel2": $('[name=ctmtel2]').val(),
        "ctmemail": $('[name=ctmemail]').val(),
        "ctmfax": $('[name=ctmfax]').val(),
        "ctmcompanum": $('[name=ctmcompanum]').val(),
        "ctmhomepage": $('[name=ctmhomepage]').val(),
        "ctmdetail": $('[name=ctmdetail]').val(),
        "ctmtrash": 1
    };

    $.ajax({
        url: url,
        type: "POST",
        headers: headers,
        dataType: "json",
        data: JSON.stringify(params),
        success: function (r) {
            alert(r)
        }
    });
});
