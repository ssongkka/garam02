$(document).ready(function () {});

$(document).on('change', '#scheGong', function () {
    if ($('input:checkbox[id="scheGong"]').is(":checked")) {
        $('#scheDay').attr('disabled', true);
        $('#scheTime').attr('disabled', true);
        $('#scheAllDay').attr('disabled', true);
    } else {
        $('#scheDay').attr('disabled', false);
        $('#scheTime').attr('disabled', false);
        $('#scheAllDay').attr('disabled', false);
    }
});

$(document).on('change', '#scheAllDay', function () {
    if ($('input:checkbox[id="scheAllDay"]').is(":checked")) {
        $('#scheTime').attr('disabled', true);
    } else {
        $('#scheTime').attr('disabled', false);
    }
});

$(document).on('click', '.cal2Detail', function () {

    const aaa = $(this)
        .parent()
        .parent()
        .prev();
    const thisDayyy = $(aaa).val();

    $('#scheAllDay').attr('checked', true);
    $('#scheTime').attr('disabled', true);

    $('#scheDay').val(thisDayyy);
    $('#scheTime').val('12:00');
    $('#scheTitle').val('');
    $('#scheEvent').val('');

    $('#sche-del').hide();
    $('#sche-insert').text('입 력');

    $('#modalScheNo').val('');

    $('#modalScheC').modal('show');

});

$(document).on('click', '.middle-event', function () {

    const bbb = $(this).children()[1];
    console.log(bbb);
    const eventSeq = $(bbb).val();

    console.log();

    LoadingWithMask()
        .then(getCalEvent)
        .then(showScheMD)
        .then(closeLoadingWithMask);

    function getCalEvent() {
        return new Promise(function (resolve, reject) {
            const url = "/home4/weekseleventseq";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "caleventseq": eventSeq
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {
                    $('#modalScheNo').val(r[0].caleventseq);

                    $('#scheDay').attr('disabled', false);
                    $('#scheTime').attr('disabled', false);

                    if (!r[0].caleventday) {
                        $('#scheGong').attr('checked', true);
                    }

                    if (r[0].caleventday && !r[0].caleventtime) {
                        $('#scheAllDay').attr('checked', true);
                    }

                    if (r[0].caleventgrade > 0) {
                        $('#scheGrade').attr('checked', true);
                    }

                    if (r[0].caleventday) {
                        $('#scheDay').val(r[0].caleventday);
                    } else {
                        $('#scheDay').val('');
                        $('#scheDay').attr('disabled', true);
                    }

                    if (r[0].caleventtime) {
                        $('#scheTime').val(r[0].caleventtime);
                    } else {
                        $('#scheTime').val('');
                        $('#scheTime').attr('disabled', true);
                    }

                    $('#scheTitle').val(r[0].caleventtitle);
                    $('#scheEvent').val(r[0].caleventevent);

                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

    function showScheMD() {
        return new Promise(function (resolve, reject) {
            $('#sche-del').show();
            $('#sche-insert').text('수 정');

            $('#modalScheC').modal('show');
            resolve();
        })
    }

});

$(document).on('click', '#sche-insert', function () {

    if ($('input:checkbox[id="scheGong"]').is(":checked")) {} else if ($('input:checkbox[id="scheAllDay"]').is(":checked")) {
        if (!$('#scheDay').val()) {
            alert('날짜를 입력해주세요.');
            $('#scheDay').focus();
            return;
        }
    } else {
        if (!$('#scheDay').val()) {
            alert('날짜를 입력해주세요.');
            $('#scheDay').focus();
            return;
        }
        if (!$('#scheTime').val()) {
            alert('시간을 입력해주세요.');
            $('#scheTime').focus();
            return;
        }
    }

    if (!$('#scheTitle').val()) {
        alert('제목을 입력해주세요.');
        $('#scheTitle').focus();
        return;
    }
    if (!$('#scheEvent').val()) {
        alert('내용을 입력해주세요.');
        $('#scheEvent').focus();
        return;
    }

    LoadingWithMask()
        .then(inupEvent)
        .then(closeLoadingWithMask);

    function inupEvent() {
        return new Promise(function (resolve, reject) {
            const url = "/home4/weekinsertevent";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            let calevNo = null;
            let calevGrade = 0;
            let calevDay = $('#scheDay').val();
            let calevTime = $('#scheTime').val();

            if ($('#modalScheNo').val()) {
                calevNo = $('#modalScheNo').val();
            }

            if ($('input:checkbox[id="scheGrade"]').is(":checked")) {
                calevGrade = 1;
            }

            if ($('input:checkbox[id="scheGong"]').is(":checked")) {
                calevDay = null;
                calevTime = null;
            }

            if ($('input:checkbox[id="scheAllDay"]').is(":checked")) {
                calevTime = null;
            }

            const params = {
                "caleventseq": calevNo,
                "caleventday": calevDay,
                "caleventgrade": calevGrade,
                "caleventtime": calevTime,
                "caleventtitle": $('#scheTitle').val(),
                "caleventevent": $('#scheEvent').val()
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {
                    if (r > 0) {
                        alert("일정 저장");
                        $('#modalScheC').modal('hide');
                        makeMain2BigCal();
                        resolve();
                    } else if (r == -1) {
                        alert("일정 저장 실패!\n\n데이터베이스 처리 과정에 문제가 발생하였습니다.")
                        location.reload();
                    } else if (r == -2) {
                        alert("일정 저장 실패!\n\n시스템을 확인해주세요.")
                        location.reload();
                    }
                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }
});

$(document).on('click', '#sche-del', function () {

    const confr = confirm("일정을 삭제하시겠습니까?");

    if (confr) {
        LoadingWithMask()
            .then(delCalEvent)
            .then(closeLoadingWithMask);
    }

    function delCalEvent() {
        return new Promise(function (resolve, reject) {
            const url = "/home4/weekdelevent";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "caleventseq": $('#modalScheNo').val()
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {
                    if (r > 0) {
                        alert("일정 삭제 완료");
                        $('#modalScheC').modal('hide');
                        makeMain2BigCal();
                        resolve();
                    } else if (r == -1) {
                        alert("일정 삭제 실패!\n\n데이터베이스 처리 과정에 문제가 발생하였습니다.")
                        location.reload();
                    } else if (r == -2) {
                        alert("일정 삭제 실패!\n\n시스템을 확인해주세요.")
                        location.reload();
                    }
                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }
});