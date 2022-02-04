const calen_Rsvt = new cal();

$(document).ready(function () {
    $("#ctmname").focus();

    $('#user-plus').hide();
    $('#userPlus').attr(
        'class',
        'fas fa-plus-circle BaseButton--skinGray size_default col-xs-12 plus-btn'
    );
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
            if (r[0] != null) {
                $('#ctmno').val('');
                $('#radio0').prop('checked', true);
                $('#ctmtel1').val('');
                $('#ctmstp').val('');
                $('#ctmdetail').val('');
                $('#ctmtel2').val('');
                $('#ctmfax').val('');
                $('#ctmaddress').val('');
                $('#ctmhomepage').val('');

                $('#ctmtrash').val(1);
                $('#ctmno').val(r[0].ctmno);

                if (r[0].ctmsepa === 0) {
                    $('#radio0').prop('checked', true);
                } else if (r[0].ctmsepa === 1) {
                    $('#radio1').prop('checked', true);
                } else if (r[0].ctmsepa === 2) {
                    $('#radio2').prop('checked', true);
                };

                $('#ctmtel1').val(r[0].ctmtel1);
                $('#ctmstp').val(r[0].ctmstp);
                $('#rsvpstp').val($('#ctmstp').val());
                $('#ctmdetail').val(r[0].ctmdetail);
                $('#ctmtel2').val(r[0].ctmtel2);
                $('#ctmfax').val(r[0].ctmfax);
                $('#ctmaddress').val(r[0].ctmaddress);
                $('#ctmhomepage').val(r[0].ctmhomepage);
            } else {
                $('#ctmno').val('0');
                $('#ctmtrash').val(2);
            }
        },
        error: (jqXHR) => {
            loginSession(jqXHR.status);
        }
    });
});

$(document).on('change', '#stday', function () {
    $("#endday").val($("#stday").val())
    $("#daynight").text('(당일)');
});

$(document).on('change', '#endday', function () {
    const origin = $("#endday").val();
    const std = new Date($("#stday").val());
    const edd = new Date($("#endday").val());

    var dateDiff = Math.ceil((edd.getTime() - std.getTime()) / (1000 * 3600 * 24));

    if (dateDiff === 0) {
        $("#daynight").text(' (당일)');
        $("#daynight").css('color', 'blue');
    } else if (dateDiff > 0) {
        const day = '(' + dateDiff + '박' + (
            dateDiff + 1
        ) + '일)';
        $("#daynight").text(day);
        $("#daynight").css('color', 'blue');
    } else {
        $("#endday").val(origin);
        $("#daynight").text('  도착일을 확인해주세요!!!');
        $("#daynight").css('color', 'red');
    }
});

$(document).on('click', '#eraser', function () {

    if (confirm('입력 내용을 지우시겠습니까?')) {
        $('#ctmno').val('0');

        $('#ctmname').val('');
        $('#ctmtel1').val('');
        $('#ctmstp').val('');
        $('#ctmdetail').val('');
        $('#ctmtel2').val('');
        $('#ctmfax').val('');
        $('#ctmaddress').val('');
        $('#ctmhomepage').val('');

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
    $('#ctmtel1').val('');
    $('#ctmstp').val('');
    $('#ctmdetail').val('');
    $('#ctmtel2').val('');
    $('#ctmfax').val('');
    $('#ctmaddress').val('');
    $('#ctmhomepage').val('');
}

$(document).on('click', '#insert-rsvt', function () {

    $('#conm').val($('#conm').val().replaceAll(',', ''));

    formRsvt.submit();
});
$(document).on('click', '#many-insert', function () {
    // var w = 800; var h = 900; var xPos = (document.body.offsetWidth) - w; xPos +=
    // window.screenLeft; var yPos = 10;

    window.open('/dashboard/rsvtMany', 'ot');
});
