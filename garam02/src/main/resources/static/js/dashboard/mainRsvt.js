const calen_Rsvt = new cal();

$(document).ready(function () {
    $("#ctmname").focus();

    $('#user-plus').hide();
    $('#userPlus').attr('class', 'btnCustomerCh');

    showPlusBtn();
    hidePlusDetail();

    dateInput();
});

function setStEdDay(day) {
    $('#stday').val(day);
    $('#endday').val(day);
}

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

$(document).on('click', '#inNew', function () {
    if ($('#ctmlseqqq').val() && $('#ctmlseqqq').val() != 'new') {
        LoadingWithMask($('#ctmlseqqq').val())
            .then(insertRsvt)
            .then(closeLoadingWithMask);
    } else if ($('#ctmlseqqq').val() == 'new') {
        LoadingWithMask()
            .then(insertCtm)
            .then(insertRsvt)
            .then(closeLoadingWithMask);
        function insertCtm(result) {
            return new Promise(function (resolve, reject) {
                const sepa = $('input[name=ctmsepaIn]:checked').val();

                const url = "/rsvt/insertctm";
                const headers = {
                    "Content-Type": "application/json",
                    "X-HTTP-Method-Override": "POST"
                };

                const params = {
                    "ctmno": $('#ctmnoIn').val(),
                    "ctmsepa": sepa,
                    "ctmname": $('#ctmnameIn').val(),
                    "ctmaddress": $('#ctmaddressIn').val(),
                    "ctmtel1": $('#ctmtel1In').val(),
                    "ctmtel2": $('#ctmtel2In').val(),
                    "ctmemail": $('#ctmemailIn').val(),
                    "ctmfax": $('#ctmfaxIn').val(),
                    "ctmcompanum": $('#ctmcompanumIn').val(),
                    "ctmhomepage": $('#ctmhomepageIn').val(),
                    "ctmstp": $('#ctmstpIn').val(),
                    "ctmdetail": $('#ctmdetailIn').val()
                };

                $.ajax({
                    url: url,
                    type: "POST",
                    headers: headers,
                    dataType: "json",
                    data: JSON.stringify(params),

                    success: function (r) {
                        if (r[0].ctmtrash != -1) {
                            resolve(r[0].ctmno);
                        } else {
                            alert("고객정보 저장 실패!\n\n시스템을 확인해주세요.")
                            closeLoadingWithMask();
                        }
                    }
                })
            })
        }
    } else {
        alert("입력할 고객정보를 선택해주세요.");
    }
});

$(document).on('click', '#insert-rsvt', function () {
    LoadingWithMask()
        .then(insertCtm)
        .then(insertRsvt)
        .then(closeLoadingWithMask);
})

function insertRsvt(result) {
    return new Promise(function (resolve, reject) {
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
        const url = "/rsvt/rsvtregister";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const params = {
            "ctmno": result,
            "empin": $('#empin').val(),
            "stday": $('#stday').val(),
            "endday": $('#endday').val(),
            "bus": $('#bus').val(),
            "num": $('#num').val(),
            "desty": $('#desty').val(),
            "rsvpstp": $('#rsvpstp').val(),
            "stt": $('#stt').val(),
            "endt": $('#endt').val(),
            "rsvtdetail": $('#rsvtdetail').val(),
            "cont": $('#cont').val(),
            "conm": $('#conm').val(),
            "numm": $('#numm').val(),
            "confirm": null
        };

        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            dataType: "json",
            data: JSON.stringify(params),

            success: function (r) {
                if (r > 0) {
                    alert("예약정보 저장");
                } else if (r == -1) {
                    alert("예약정보 저장 실패!\n\n데이터베이스 처리 과정에 문제가 발생하였습니다.")
                } else if (r == -2) {
                    alert("예약정보 저장 실패!\n\n시스템을 확인해주세요.")
                }
                resolve();
            }
        })
    })
}

function insertRsvt1(result) {
    return new Promise(function (resolve, reject) {

        const url = "/rsvt/rsvtregister";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const params = {
            "ctmno": result,
            "empin": $('#empin').val(),
            "stday": $('#stday').val(),
            "endday": $('#endday').val(),
            "bus": $('#bus').val(),
            "num": $('#num').val(),
            "desty": $('#desty').val(),
            "rsvpstp": $('#rsvpstp').val(),
            "stt": $('#stt').val(),
            "endt": $('#endt').val(),
            "rsvtdetail": $('#rsvtdetail').val(),
            "cont": $('#cont').val(),
            "conm": $('#conm').val(),
            "numm": $('#numm').val(),
            "confirm": null
        };

        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            dataType: "json",
            data: JSON.stringify(params),

            success: function (r) {
                if (r > 0) {
                    alert("예약정보 저장");
                } else if (r == -1) {
                    alert("예약정보 저장 실패!\n\n데이터베이스 처리 과정에 문제가 발생하였습니다.")
                } else if (r == -2) {
                    alert("예약정보 저장 실패!\n\n시스템을 확인해주세요.")
                }
                resolve();
            }
        })
    })
}

$(document).on('click', '#many-insert', function () {
    // var w = 800; var h = 900; var xPos = (document.body.offsetWidth) - w; xPos +=
    // window.screenLeft; var yPos = 10;

    window.open('/dashboard/rsvtMany', 'ot');
});

$(document).on('click', '#customerInsertMo', function () {
    // var myModal = new bootstrap.Modal(document.getElementById('customerModal'));
    // myModal.show(); myModal.handleUpdate(); $('#modalName').focus();

    const aaa = $('#offCustomer').css('visibility');

    if (aaa == 'hidden') {
        offCustomerOffcanvas.show();
    } else {
        offCustomerOffcanvas.hide();
    }

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
