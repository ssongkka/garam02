$(document).ready(function () {
    $('#info-limit').hide();
    var now_D = new Date();

    var nowMonth = new Date(now_D.getFullYear(), now_D.getMonth(), 1);
    var nowDay = new Date(now_D.getFullYear(), now_D.getMonth(), now_D.getDate());

    var id = setCalendar(nowMonth, nowDay);
    setCalWhite(id);
    getEmpList(0, 20);
    getVEList(0, 20);
    getInfoList(0, 6);
});

$(document).on('click', '#btnYesD', function () {

    var now_D = new Date();

    var nowMonth = new Date(now_D.getFullYear(), now_D.getMonth(), 1);
    var nowDay = new Date(now_D.getFullYear(), now_D.getMonth(), now_D.getDate());
    var day = new Date(nowDay.setDate(nowDay.getDate() - 1));

    var id = setCalendar(nowMonth, day);

    setCalWhite(id);
});

$(document).on('click', '#btnToD', function () {

    var now_D = new Date();

    var nowMonth = new Date(now_D.getFullYear(), now_D.getMonth(), 1);
    var nowDay = new Date(now_D.getFullYear(), now_D.getMonth(), now_D.getDate());

    var id = setCalendar(nowMonth, nowDay);

    setCalWhite(id);
});

$(document).on('click', '#btnTomD', function () {

    var now_D = new Date();

    var nowMonth = new Date(now_D.getFullYear(), now_D.getMonth(), 1);
    var nowDay = new Date(now_D.getFullYear(), now_D.getMonth(), now_D.getDate());
    var day = new Date(nowDay.setDate(nowDay.getDate() + 1));

    var id = setCalendar(nowMonth, day);

    setCalWhite(id);
});

$(document).on('click', '#fnDownMonth', function () {

    var now_D = fn_get_Year_Month();

    var downMonth = new Date(now_D.setMonth(now_D.getMonth() - 1));

    setCalendar(downMonth, null);
});

$(document).on('click', '#fnUpMonth', function () {

    var now_D = fn_get_Year_Month();

    var upMonth = new Date(now_D.setMonth(now_D.getMonth() + 1));

    setCalendar(upMonth, null);
});

function fn_contentEmp(id) {
    var url = "/dashEmp/getEmpContents"
    var paramData = {
        "id": id
    };

    var htmls = "";

    $.ajax({
        type: 'POST',
        url: url,
        data: paramData,

        success: function (r) {

            if (r.length < 1) {
                htmls = '<div>없음</div>';
            } else {
                htmls = '<div class="emp-card-main card-song"><div class="emp-card-item"><div class="ca' +
                        'rd1"><div class="card1-item">2</div><div class="card1-item">이름</div><div class' +
                        '="card1-item">' + r[0].name + '</div><div class="card1-item">생년월일</div><div cl' +
                        'ass="card1-item">' + r[0].birthday + '</div><div class="card1-item">소속</div><d' +
                        'iv class="card1-item">' + r[0].company + '</div><div class="card1-item">구분</di' +
                        'v><div class="card1-item">' + r[0].kind + '</div><div class="card1-item">연락처</' +
                        'div><div class="card1-item">' + r[0].phone1 + '</div><div class="card1-item">비' +
                        '상연락처</div><div class="card1-item">' + r[0].phone2 + '</div><div class="card1-i' +
                        'tem">입사일</div><div class="card1-item">' + r[0].joind + '</div><div class="card' +
                        '1-item">퇴사일</div><div class="card1-item">' + r[0].endD + '</div><div class="ca' +
                        'rd1-item">주소</div><div class="card1-item card1-item-ex" >' + r[0].address + '<' +
                        '/div><div class="card1-item">차고지</div><div class="card1-item card1-item-ex">' +
                        r[0].garage + '</div></div></div></div>'
            }
            $("#modal-body-emp").html(htmls);
        }
    })
}

function getEmpList(page, listSize) {
    var url = "/dashEmpList/getEmpList";
    var headers = {
        "Content-Type": "application/json",
        "X-HTTP-Method-Override": "POST"
    };

    var paramData = JSON.stringify({"num1Int": page, "num2Int": listSize});

    var html = "";

    $.ajax({
        url: url,
        headers: headers,
        type: 'POST',
        data: paramData,
        dataType: 'json',

        success: function (r) {
            if (r.length < 1) {
                html = '<tr><td colspan="5" align="center">데이터가 없습니다.</td></tr>'
            } else {
                for (var i = 0; i < r.length; i++) {
                    html += '<tr style="cursor: pointer; color: #blue;"data-toggle="modal" data-target="#mo' +
                            'dal-emp"onClick="fn_contentEmp(\'' + r[i].id + '\')">'
                    html += '<td align="center">' + r[i].name + '</td>';
                    html += '<td align="center">' + r[i].phone1 + '</td></tr>';
                }
            }
            $("#tbEmp").html(html);
            var rangesize = 6;
            var url = "/dashEmpList/getEmpListCnt";
            var fns = "getEmpList";
            var idd = "paginationBoxEmp";

            getPaging(page, listSize, rangesize, url, fns, idd);
        }
    });
}

function fn_contentVE(car_number) {
    var url = "/dashVE/getVEContents"
    var paramData = {
        "car_number": car_number
    };

    var htmls = "";

    $.ajax({
        type: 'POST',
        url: url,
        data: paramData,

        success: function (r) {

            if (r.length < 1) {
                htmls = '<div>없음</div>';
            } else {
                htmls = '<div class="emp-card-main card-song"><div class="emp-card-item"><div class="ca' +
                        'rd1"><div class="card1-item">2</div><div class="card1-item">이름</div><div class' +
                        '="card1-item">' + r[0].vehicle + '</div><div class="card1-item">생년월일</div><div' +
                        ' class="card1-item">' + r[0].company + '</div><div class="card1-item">소속</div>' +
                        '<div class="card1-item">' + r[0].owner + '</div><div class="card1-item">구분</di' +
                        'v><div class="card1-item">' + r[0].bus + '</div><div class="card1-item">연락처</d' +
                        'iv><div class="card1-item">' + r[0].brand + '</div><div class="card1-item">비상연' +
                        '락처</div><div class="card1-item">' + r[0].name + '</div><div class="card1-item"' +
                        '>입사일</div><div class="card1-item">' + r[0].grade + '</div><div class="card1-it' +
                        'em">퇴사일</div><div class="card1-item">' + r[0].fuel + '</div><div class="card1-' +
                        'item">주소</div><div class="card1-item card1-item-ex" >' + r[0].num + '</div><di' +
                        'v class="card1-item">차고지</div><div class="card1-item card1-item-ex">' + r[0].color +
                        '</div></div></div></div>'
            }
            $("#modal-body-ve").html(htmls);
        }
    })
}

function getVEList(page, listSize) {
    var url = "/dashVEList/getVEList";
    var headers = {
        "Content-Type": "application/json",
        "X-HTTP-Method-Override": "POST"
    };

    var paramData = JSON.stringify({"num1Int": page, "num2Int": listSize});

    var html = "";

    $.ajax({
        url: url,
        headers: headers,
        type: 'POST',
        data: paramData,
        dataType: 'json',

        success: function (r) {
            if (r.length < 1) {
                html = '<tr><td colspan="5" align="center">데이터가 없습니다.</td></tr>'
            } else {
                for (var i = 0; i < r.length; i++) {
                    html += '<tr style="cursor: pointer; color: #blue;"data-toggle="modal" data-target="#mo' +
                            'dal-VE"onClick="fn_contentVE(\'' + r[i].car_number + '\')">'
                    html += '<td align="center">' + r[i].vehicle + '</td>';
                    html += '<td align="center">' + r[i].grade + '</td></tr>';

                    // htmlP += '<div id="paginationBox">'; 								htmlP += '<ul class="pagination
                    // pagination-sm">';

                }
            }
            $("#tbVE").html(html);

            var rangesize = 6;
            var url = "/dashVEList/getVEListCnt";
            var fns = "getVEList";
            var idd = "paginationBoxVE";

            getPaging(page, listSize, rangesize, url, fns, idd);
        }
    });
}

function getInfoList(page, listSize) {
    var url = "/dashInfoList/getInfoList";
    var headers = {
        "Content-Type": "application/json",
        "X-HTTP-Method-Override": "POST"
    };

    var paramData = JSON.stringify({"num1Int": page, "num2Int": listSize});

    var html = "";

    $.ajax({
        url: url,
        headers: headers,
        type: 'POST',
        data: paramData,
        dataType: 'json',

        success: function (r) {
            if (r.length < 1) {
                html = '<tr><td colspan="5" align="center">데이터가 없습니다.</td></tr>'
            } else {
                for (var i = 0; i < r.length; i++) {
                    var calTimeIn = getCalTime(r[i].insert_date);
                    var calTimeEnd = getCalTime(r[i].date_end);
                    var calTimeCom = getCal(r[i].date_com);
                    var cName = 'dash-collapse-' + (
                        i + 1
                    );

                    var infoNum = 'info-num' + (
                        i + 1
                    );

                    html += '<tr> <td>'
                    html += '<input type="hidden" id="' + infoNum + '" value="' + r[i].no + '">';

                    var dashCollapse = 'dash-collapse-01' + (
                        i + 1
                    );

                    html += '<div class="dash-info" data-toggle="collapse" href="#' + cName + '" aria-expan' +
                            'ded="true" aria-controls="' + dashCollapse + '">';
                    html += '<div class="dash-info-item">';

                    var str_Img = "";
                    if (r[i].date_com != null) {
                        str_Img = '<img src="/resources/common/img/comp.png" width="15px" height="15px" alt="">';
                    } else {
                        if (r[i].grade > 0) {
                            str_Img = '<img src="/resources/common/img/neu.png" width="15px" height="15px" alt="">';
                        }

                        var ndate = new Date();

                        var tmpM = "";
                        if (ndate.getMonth() + 1 < 10) {
                            tmpM = "0" + (
                                ndate.getMonth() + 1
                            );
                        } else {
                            tmpM = ndate.getMonth() + 1;
                        }

                        var tmpD = "";
                        if (ndate.getDate() < 10) {
                            tmpD = "0" + ndate.getDate();
                        } else {
                            tmpD = ndate.getDate();
                        }

                        var tmpH = "";
                        if (ndate.getHours() < 10) {
                            tmpH = "0" + ndate.getHours();
                        } else {
                            tmpH = ndate.getHours();
                        }

                        var tmpMi = "";
                        if (ndate.getMinutes() < 10) {
                            tmpMi = "0" + ndate.getMinutes();
                        } else {
                            tmpMi = ndate.getMinutes();
                        }

                        var nDate = ndate.getFullYear() + '-' + tmpM + '-' + tmpD + ' ' + tmpH + ':' +
                                tmpMi + ':00';

                        if (r[i].date_end < nDate) {
                            str_Img = '<img src="/resources/common/img/stop.png" width="15px" height="15px" alt="">';
                        }
                    }
                    html += str_Img;
                    html += '</div>';
                    html += '<div class="dash-info-item">' + r[i].title + '</div>';
                    html += '<div class="dash-info-item">' + r[i].name + '</div>';

                    if (r[i].date_end == null || r[i].date_end == "") {
                        html += '<div class="dash-info-item"><i class="las la-history"></i>기한 없음</div>';
                    } else {
                        html += '<div class="dash-info-item"><i class="las la-history"></i>' +
                                calTimeEnd + '</div>';

                    }
                    html += '<div class="dash-info-item">' + calTimeIn + '</div>';
                    html += '</div>';

                    var colla = 'collapse-' + (
                        i + 1
                    );

                    html += '<div id="' + cName + '" class="panel-collapse collapse ' + colla + '" role="ta' +
                            'bpanel"><br><div class="collapse-line">';
                    var dashCollapseTitlec = 'dash-collapse-titlec';
                    var dashCollapseTitle = 'dash-collapse-' + (
                        i + 1
                    ) + '-title';
                    html += '<div class="' + dashCollapseTitlec + '" id="' +
                            dashCollapseTitle + '"><i class="far fa-bookmark"></i>' + r[i].title +
                            '</div>';

                    var dashCollapseName = 'dash-collapse-' + (
                        i + 1
                    ) + '-name';
                    var dashCollapseCount = 'dash-collapse-' + (
                        i + 1
                    ) + '-count';
                    var dashCollapseChoc = 'dash-collapse-choc';
                    html += '<div><span class="' + dashCollapseChoc + '" id="' +
                            dashCollapseName + '">' + calTimeIn + '</span> <span class="' +
                            dashCollapseChoc + '" id="' + dashCollapseCount + '">' + r[i].name + '</span></' +
                            'div>';
                    var dashCollapseGrade = 'dash-collapse-' + (
                        i + 1
                    ) + '-grade';
                    var dashCollapseEnd = 'dash-collapse-' + (
                        i + 1
                    ) + '-end';
                    var dashCollapseChocc = 'dash-collapse-chocc';

                    var ggrad = '';
                    if (r[i].grade > 0) {
                        ggrad = '<i class="fas fa-exclamation-triangle"></i>중요';
                    }

                    html += '<div><span class="' + dashCollapseChocc + '" id="' +
                            dashCollapseGrade + '">' + ggrad + '</span> <span class="' +
                            dashCollapseChocc + '" id="' + dashCollapseEnd + '">';
                    if (r[i].date_end == null || r[i].date_end == "") {
                        html += '<i class="las la-history"></i>기한 없음';
                    } else {
                        html += '<i class="las la-history"></i>' + calTimeEnd + '까지';
                    }
                    html += '</span></div>';

                    var dashCollapseBodyc = 'dash-collapse-bodyc';
                    var dashCollapseBody = 'dash-collapse-' + (
                        i + 1
                    ) + '-body';
                    html += '<div class="' + dashCollapseBodyc + '" id="' + dashCollapseBody + '">' + r[i].contents +
                            '</div>';

                    html += '</div>';
                    html += '</div></div>';
                    html += '</tr> </td>';
                }
            }
            $("#tbInfo").html(html);

            var rangesize = 6;
            var url = "/dashInfoList/getInfoListCnt";
            var fns = "getInfoList";
            var idd = "paginationBoxInfo";

            getPaging(page, listSize, rangesize, url, fns, idd);
        }
    });
}

function getPaging(page, listSize, rangesize, url, fns, idd) {
    var headers = {
        "Content-Type": "application/json",
        "X-HTTP-Method-Override": "POST"
    };

    var html = "";

    $.ajax({
        url: url,
        headers: headers,
        type: 'POST',

        success: function (r) {
            const pagecla = new pageCla(page, r, listSize, rangesize);
            html += '<div><nav><ul class="pagination pagination-sm">';
            if (pagecla.prEv) {
                html += '<li class="page-item">';
                html += '<a class="page-link" href="#" onClick="';
                html += '">';
                html += '<span aria-hidden="true">&laquo;</span>';
                html += '</a></li>';
            }

            for (var i = pagecla.startPage; i <= pagecla.endPage; i++) {
                html += '<li class="page-item ';
                if (pagecla.paGe == i) {
                    html += ' active';
                } else {
                    html += '';
                }

                html += '" style="cursor: pointer;"><a class="page-link" onClick="';
                html += fns + '(' + (
                    (i - 1) * pagecla.listSize
                ) + ',' + pagecla.listSize + ')';
                html += '">' + i + '</a></li>';
            }

            if (pagecla.neXt) {
                html += '<li class="page-item"><a class="page-link" href="#" onClick="';
                html += '"><span aria-hidden="true">&raquo;</span></a></li>';
            }
            html += '</ul></nav></div>'
            var iidd = "#" + idd;
            $(iidd).html(html);
        }
    });
}

$('#check2-info').change(function () {
    var imChecked = $(this).is(":checked");

    if (imChecked) {
        $('#info-limit').hide();
    } else {
        $('#info-limit').show();
    }
});

function showModalInfo(num) {
    var title = $('#dash-collapse-' + num + '-title').text();
    var stD = getCalTimeInput($('#dash-collapse-' + num + '-name').text());
    var grade = $('#dash-collapse-' + num + '-grade').text();
    var endD = $('#dash-collapse-' + num + '-end').text();
    var cont = $('#dash-collapse-' + num + '-body').text();

    $('#title-info').val(title);
    $('#date-info').val(stD);
    $('#cont-info').html('<div>' + cont + '</div>');
}

$(document).on('click', '#new-info', function () {
    var w = 800;
    var h = 900;

    var xPos = (document.body.offsetWidth) - w;
    xPos += window.screenLeft;
    var yPos = 10;

    window.open(
        '/infomation',
        'ot',
        "width=" + w + ", height=" + h + ", left=" + xPos + ", top=" + yPos + ", menuba" +
                "r=yes, status=yes, titlebar=yes, resizable=no"
    );
});
