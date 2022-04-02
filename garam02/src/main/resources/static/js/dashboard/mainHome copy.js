$(document).ready(function () {
    cardVeEmpMake();
});

function cardVeEmpMake() {
    let cntVe1 = [];
    let cntVe2 = [];
    let cntVe3 = [];
    let cntVe4 = [];

    let cntEmp1 = [];
    let cntEmp2 = [];
    let cntEmp3 = [];
    let cntEmp4 = [];

    for (let i = 0; i < dbCompa.length; i++) {
        cntVe2[i] = 0;
        cntVe3[i] = 0;
        cntVe4[i] = 0;
        for (let j = 0; j < dbVe.length; j++) {
            if (dbCompa[i].company == dbVe[j].company) {
                if (dbVe[j].trash == 1) {
                    switch (dbVe[j].bus) {
                        case '대형':
                            ++cntVe2[i];
                            break;
                        case '중형':
                            ++cntVe3[i];
                            break;
                        case '우등':
                            ++cntVe4[i];
                            break;
                    }
                }
            }
        }
        cntEmp2[i] = 0;
        cntEmp3[i] = 0;
        cntEmp4[i] = 0;
        for (let k = 0; k < dbEmp.length; k++) {
            if (dbCompa[i].company == dbEmp[k].company) {
                if (dbEmp[k].trash == 1) {
                    switch (dbEmp[k].kind) {
                        case '회사':
                            ++cntEmp2[i];
                            break;
                        case '개인':
                            ++cntEmp3[i];
                            break;
                        case '예비':
                            ++cntEmp4[i];
                            break;
                    }
                }
            }
        }
    }

    for (let i = 0; i < dbCompa.length; i++) {
        cntVe1[i] = 0;
        cntEmp1[i] = 0;
        cntVe1[i] = cntVe2[i] + cntVe3[i] + cntVe4[i];
        cntEmp1[i] = cntEmp2[i] + cntEmp3[i] + cntEmp4[i];
    }

    let htmlsVe = '';

    htmlsVe += '<div class="home-main-item-222">';
    htmlsVe += '<i class="fas fa-bus"></i>';
    htmlsVe += '</div>';
    for (let i = 0; i < dbCompa.length; i++) {
        htmlsVe += '<div class="home-main-item-222">';
        htmlsVe += '<span class="home-main-item-222-span">' + dbCompa[i].company + '</span>';
        htmlsVe += '<span class="home-main-item-222-span">' + cntVe1[i] + '</span>';
        htmlsVe += '<span class="home-main-item-222-span"><span data-bs-toggle="tooltip" data-bs-p' +
                'lacement="left" title="대형">' + cntVe2[i] + '</span><span>/</span><span data-bs' +
                '-toggle="tooltip" data-bs-placement="left" title="중형">' + cntVe3[i] + '</span>' +
                '<span>/</span><span data-bs-toggle="tooltip" data-bs-placement="left" title="우' +
                '등">' + cntVe4[i] + '</span></span>';
        htmlsVe += '</div>';
    }
    htmlsVe += '</div>';

    let htmlsEmp = '';
    htmlsEmp += '<div class="home-main-item-222">';
    htmlsEmp += '<i class="fas fa-user-tie"></i>';
    htmlsEmp += '</div>';
    for (let i = 0; i < dbCompa.length; i++) {
        htmlsEmp += '<div class="home-main-item-222">';
        htmlsEmp += '<span class="home-main-item-222-span">' + dbCompa[i].company + '</span>';
        htmlsEmp += '<span class="home-main-item-222-span">' + cntEmp1[i] + '</span>';
        htmlsEmp += '<span class="home-main-item-222-span"><span data-bs-toggle="tooltip" data-bs-p' +
                'lacement="left" title="회사">' + cntEmp2[i] + '</span><span>/</span><span data-b' +
                's-toggle="tooltip" data-bs-placement="left" title="개인">' + cntEmp3[i] + '</spa' +
                'n><span>/</span><span data-bs-toggle="tooltip" data-bs-placement="left" title=' +
                '"예비">' + cntEmp4[i] + '</span></span>';
        htmlsEmp += '</div>';
    }
    htmlsEmp += '</div>';

    $('#card-ve').html(htmlsVe);
    $('#card-emp').html(htmlsEmp);
}

function getRsvtList(r, day) {
    let htmlsHome = '';
    let htmlsSchool = '';
    let htmlsaccount = '';

    let cntHome = 0;
    let cntSchool = 0;
    let cntaccount = 0;

    let cntAll = 0;

    let cnt01 = 1;
    let cnt02 = 1;

    let cntArr = new Array();
    for (let i = 0; i < r.length; i++) {
        cntAll = cntAll + r[i].num;
        let suk = '';
        if (r[i].stday != r[i].endday) {
            suk = betweenDate(r[i].stday, day, r[i].endday);
        }
        switch (r[i].ctmsepa) {
            case 0:
                cntHome = cntHome + r[i].num;
                htmlsHome += '<tr>';
                htmlsHome += '<td>';
                htmlsHome += r[i].ctmname;
                htmlsHome += '</td>';

                htmlsHome += '<td style="text-align: left; padding-left: 2rem;">';
                htmlsHome += r[i].desty + suk;
                htmlsHome += '</td>';

                htmlsHome += '<td>';
                htmlsHome += r[i].bus;
                htmlsHome += '</td>';

                htmlsHome += '<td>';
                htmlsHome += r[i].num;
                htmlsHome += '</td>';

                htmlsHome += '<td style="text-align: right; padding-right: 2rem;">';
                htmlsHome += AddComma(r[i].conm);
                htmlsHome += '</td>';

                htmlsHome += '<td style="text-align: left; padding-left: 2rem;">';
                htmlsHome += r[i].rsvpstp;
                htmlsHome += '</td>';

                htmlsHome += '<td>';
                htmlsHome += r[i].stt;
                htmlsHome += '</td>';
                htmlsHome += '</tr>';
                // htmlsHome += '<tr class=""><td colspan="7">awfafafwf</td></tr>';
                break;
            case 1:
                cntSchool = cntSchool + r[i].num;

                if (i == 0 || cnt01 == 1) {
                    htmlsSchool += '<tr style="background: #F9F9F9;">';
                    htmlsSchool += '<td id="td' + cnt01 + '">';
                    htmlsSchool += r[i].ctmname;
                    htmlsSchool += '</td>';

                    htmlsSchool += '<td>';
                    htmlsSchool += r[i].bus;
                    htmlsSchool += '</td>';
                    cnt01++;
                } else {
                    if (r[i - 1].ctmno == r[i].ctmno) {
                        if ((cnt01 - 1) % 2 == 0) {
                            htmlsSchool += '<tr style="background: #FFFFFF;">';
                        } else {
                            htmlsSchool += '<tr style="background: #F9F9F9;">';
                        }
                        htmlsSchool += '<td>';
                        htmlsSchool += r[i].bus;
                        htmlsSchool += '</td>';

                        cnt02++;
                    } else {
                        if (cnt01 % 2 == 0) {
                            htmlsSchool += '<tr style="background: #FFFFFF;">';
                        } else {
                            htmlsSchool += '<tr style="background: #F9F9F9;">';
                        }

                        const idd = 'td' + cnt01;

                        htmlsSchool += '<td id="' + idd + '">';
                        htmlsSchool += r[i].ctmname;
                        htmlsSchool += '</td>';

                        htmlsSchool += '<td>';
                        htmlsSchool += r[i].bus;
                        htmlsSchool += '</td>';

                        cnt01++;

                        cntArr.push(cnt02);
                        cnt02 = 1;
                    }
                }

                htmlsSchool += '<td>';
                htmlsSchool += r[i].num;
                htmlsSchool += '</td>';

                htmlsSchool += '<td style="text-align: left; padding-left: 2rem;">';
                htmlsSchool += r[i].desty + suk;
                htmlsSchool += '</td>';

                htmlsSchool += '<td style="text-align: left; padding-left: 2rem;">';
                htmlsSchool += r[i].rsvpstp;
                htmlsSchool += '</td>';

                htmlsSchool += '<td>';
                htmlsSchool += r[i].stt;
                htmlsSchool += '</td>';

                htmlsSchool += '<td style="text-align: right; padding-right: 2rem;">';
                htmlsSchool += AddComma(r[i].conm);
                htmlsSchool += '</td>';
                htmlsSchool += '</tr>';
                break;
            case 2:
                cntaccount = cntaccount + r[i].num;
                htmlsaccount += '<tr>';
                htmlsaccount += '<td>';
                htmlsaccount += r[i].ctmname;
                htmlsaccount += '</td>';

                htmlsaccount += '<td style="text-align: left; padding-left: 2rem;">';
                htmlsaccount += r[i].desty + suk;
                htmlsaccount += '</td>';

                htmlsaccount += '<td>';
                htmlsaccount += r[i].bus;
                htmlsaccount += '</td>';

                htmlsaccount += '<td>';
                htmlsaccount += r[i].num;
                htmlsaccount += '</td>';

                htmlsaccount += '<td>';
                htmlsaccount += AddComma(r[i].conm);
                htmlsaccount += '</td>';

                htmlsaccount += '<td style="text-align: left; padding-left: 2rem;">';
                htmlsaccount += r[i].rsvpstp;
                htmlsaccount += '</td>';

                htmlsaccount += '<td style="text-align: right; padding-right: 2rem;">';
                htmlsaccount += r[i].stt;
                htmlsaccount += '</td>';
                htmlsaccount += '</tr>';
                break;
            default:
                break;
        }
    }

    $('#all-title').html(
        '<span>운행정보&nbsp;</span><span class="badge">' + cntAll + '</span>'
    );
    $('#normal-title').html(
        '일반&nbsp;<span class="badge">' + cntHome + '</span>'
    );
    $('#school-title').html(
        '학생단체&nbsp;<span class="badge">' + cntSchool + '</span>'
    );
    $('#account-title').html(
        '거래처&nbsp;<span class="badge">' + cntaccount + '</span>'
    );
    $('#go-title').html('정기운행&nbsp;<span class="badge">' + 0 + '</span>');

    const noRsvt = '<tr><td colspan="7">운행 정보 없음</td></tr>';

    if (htmlsHome) {
        $('#home-tb-normal').html(htmlsHome);
    } else {
        $('#home-tb-normal').html(noRsvt);
    }

    if (htmlsSchool) {
        cntArr.push(cnt02);
        $('#home-tb-school').html(htmlsSchool);
        for (let i = 0; i < cntArr.length; i++) {
            const idd = '#td' + (
                i + 1
            );
            $(idd).attr('rowspan', cntArr[i]);
        }
    } else {
        $('#home-tb-school').html(noRsvt);
    }
    if (htmlsaccount) {
        $('#home-tb-account').html(htmlsaccount);
    } else {
        $('#home-tb-account').html(noRsvt);
    }
}

function getMidCnt(day, i) {
    const url = "/home/weekDash";
    const headers = {
        "Content-Type": "application/json",
        "X-HTTP-Method-Override": "POST"
    };

    const params = {
        "stday": day,
        "endday": day
    };

    $.ajax({
        url: url,
        type: "POST",
        headers: headers,
        dataType: "json",
        data: JSON.stringify(params),

        success: function (r) {
            const idd = '#dash-week-';
            let cnt45 = 0;
            let cnt25 = 0;
            let cnt28 = 0;

            for (let i = 0; i < r.length; i++) {
                switch (r[i].bus) {
                    case '대형':
                        cnt45 = cnt45 + r[i].num;
                        break;
                    case '중형':
                        cnt25 = cnt25 + r[i].num;
                        break;
                    case '우등':
                        cnt28 = cnt28 + r[i].num;
                        break;
                }
            }

            const rtn = cnt45 + ' / ' + cnt25 + ' / ' + cnt28;

            $(idd + (i + 1) + '4').html('<h5>' + rtn + '</h5>');

            if (i == 0) {
                $('#numday1').text('대형 ' + cnt45 + '대');
                $('#numday2').text('중형 ' + cnt25 + '대');
                $('#numday3').text('우등 ' + cnt28 + '대');
            }
        }
    });
}

$(document).on('click', '#goEmp', function () {
    // var w = 800; var h = 900; var xPos = (document.body.offsetWidth) - w; xPos +=
    // window.screenLeft; var yPos = 10;

    window.open('/employee', '인사 정보')
});

$(document).on('click', '#goVe', function () {
    // var w = 800; var h = 900; var xPos = (document.body.offsetWidth) - w; xPos +=
    // window.screenLeft; var yPos = 10;

    window.open('/vehicle', '차량 정보');
});