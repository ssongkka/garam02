$(document).ready(function () {
    cardVeEmpMake();
});

function scrollYHome(param) {
    var id = param;
    var location = $(id)
        .offset()
        .top;
    window.scrollTo({
        top: location - 350,
        behavior: 'smooth'
    });
}

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
                'lacement="top" title="대형">' + cntVe2[i] + '</span><span>/</span><span data-bs-' +
                'toggle="tooltip" data-bs-placement="top" title="중형">' + cntVe3[i] + '</span><s' +
                'pan>/</span><span data-bs-toggle="tooltip" data-bs-placement="top" title="우등">' +
                cntVe4[i] + '</span></span>';
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
                'lacement="top" title="회사">' + cntEmp2[i] + '</span><span>/</span><span data-bs' +
                '-toggle="tooltip" data-bs-placement="top" title="개인">' + cntEmp3[i] + '</span>' +
                '<span>/</span><span data-bs-toggle="tooltip" data-bs-placement="top" title="예비' +
                '">' + cntEmp4[i] + '</span></span>';
        htmlsEmp += '</div>';
    }
    htmlsEmp += '</div>';

    $('#card-ve').html(htmlsVe);
    $('#card-emp').html(htmlsEmp);
    var tooltipTriggerList = []
        .slice
        .call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })
}

function getRsvtList(r, day) {
    let htmlsHome = '';
    let htmlsSchool = '';
    let htmlsaccount = '';

    let cntHome = 0;
    let cntSchool = 0;
    let cntaccount = 0;

    let cntAll = 0;

    let cnt11 = 1;
    let cnt12 = 1;

    let cnt21 = 1;
    let cnt22 = 1;

    let cnt31 = 1;
    let cnt32 = 1;

    let cntArr = new Array();
    let cntArr2 = new Array();
    let cntArr3 = new Array();

    let contColor = 0;
    for (let i = 0; i < r.length; i++) {
        cntAll = cntAll + r[i].num;
        let suk = '';
        if (r[i].stday != r[i].endday) {
            suk = betweenDate(r[i].stday, day, r[i].endday);
        }
        switch (r[i].ctmsepa) {
            case 0:
                cntHome = cntHome + r[i].num;
                ++contColor

                const idd1 = 'td' + cnt11;

                if (i == 0 || cnt11 == 1) {
                    htmlsHome += '<tr style="cursor: pointer; background: #0000000d;" id="tr-home-' + idd1 +
                            '-' + i + '" onclick="showDetailSch(this.id)">';
                    htmlsHome += '<td id="td' + cnt11 + '-hhh">';
                    htmlsHome += r[i].ctmname;
                    htmlsHome += '</td>';

                    htmlsHome += '<td style="text-align: left; padding-left: 2rem;">';
                    htmlsHome += r[i].desty + suk;
                    htmlsHome += '</td>';
                    cnt11++;
                } else {
                    if (r[i - 1].ctmno == r[i].ctmno) {
                        if ((cnt11 - 1) % 2 == 0) {
                            htmlsHome += '<tr style="cursor: pointer; background: #FFFFFF;" id="tr-home-td' + (
                                cnt11 - 1
                            ) + '-' + i + '" onclick="showDetailSch(this.id)">';
                        } else {
                            htmlsHome += '<tr style="cursor: pointer; background: #0000000d;" id="tr-home-td' + (
                                cnt11 - 1
                            ) + '-' + i + '" onclick="showDetailSch(this.id)">';
                        }
                        htmlsHome += '<td style="text-align: left; padding-left: 2rem;">';
                        htmlsHome += r[i].desty + suk;
                        htmlsHome += '</td>';

                        cnt12++;

                    } else {
                        if (cnt11 % 2 == 0) {
                            htmlsHome += '<tr style="cursor: pointer; background: #FFFFFF;" id="tr-home-' + idd1 + '-' +
                                    i + '" onclick="showDetailSch(this.id)">';
                        } else {
                            htmlsHome += '<tr style="cursor: pointer; background: #0000000d;" id="tr-home-' + idd1 +
                                    '-' + i + '" onclick="showDetailSch(this.id)">';
                        }

                        htmlsHome += '<td id="td' + cnt11 + '-hhh">';
                        htmlsHome += r[i].ctmname;
                        htmlsHome += '</td>';

                        htmlsHome += '<td style="text-align: left; padding-left: 2rem;">';
                        htmlsHome += r[i].desty + suk;
                        htmlsHome += '</td>';

                        cnt11++;

                        cntArr.push(cnt12);
                        cnt12 = 1;
                    }
                }

                htmlsHome += '<td>';
                htmlsHome += r[i].bus;
                htmlsHome += '</td>';

                htmlsHome += '<td>';
                htmlsHome += r[i].num;
                htmlsHome += '</td>';

                htmlsHome += '<td class="tdRight">';
                htmlsHome += AddComma(r[i].conm);
                htmlsHome += '</td>';

                htmlsHome += '<td class="">';
                htmlsHome += r[i].rsvpstp;
                htmlsHome += '</td>';

                htmlsHome += '<td class="">';
                if (r[i].stt) {
                    htmlsHome += r[i].stt;
                } else {
                    htmlsHome += '';
                }
                htmlsHome += '</td>';
                htmlsHome += '</tr>';
                htmlsHome += '<tr class="hide-tr" id="tr-home' + i + '"><td colspan="6">'

                htmlsHome += '<div class="det">';
                htmlsHome += '<div class="det-item">';
                htmlsHome += '<blockquote>';
                htmlsHome += '<span class="fst-t">배차현황</span>';
                htmlsHome += '<span class="det-bae ">3507</span>';
                htmlsHome += '<span class="det-bae ">3507</span>';
                htmlsHome += '<span class="det-bae ">3507</span>';
                htmlsHome += '<span class="det-bae ">3507</span>';
                htmlsHome += '<span class="det-bae ">3507</span>';
                htmlsHome += '<span class="det-bae ">3507</span>';
                htmlsHome += '<span class="det-bae ">3507</span>';
                htmlsHome += '<span class="det-bae ">3507</span>';
                htmlsHome += '<span class="det-bae ">3507</span>';
                htmlsHome += '<span class="det-bae ">3507</span>';
                htmlsHome += '<span class="det-bae ">3507</span>';
                htmlsHome += '<span class="det-bae ">3507</span>';
                htmlsHome += '<span class="det-bae ">3507</span>';
                htmlsHome += '</blockquote>';
                htmlsHome += '</div>';
                htmlsHome += '<div class="det-item">';
                htmlsHome += '<blockquote>';
                htmlsHome += '<span class="fst-t">운행상세</span>';
                htmlsHome += '<span class="det-bae ">aegfagfaawawfawawfafawffwffawf</span>';
                htmlsHome += '</blockquote>';
                htmlsHome += '</div>';
                htmlsHome += '<div class="det-item">';
                htmlsHome += '<blockquote>';
                htmlsHome += '<span class="fst-t">입금현황</span>';
                htmlsHome += '<span class="det-bae ">100,000</span>';
                htmlsHome += '</blockquote>';
                htmlsHome += '</div>';
                htmlsHome += '<div class="det-item">';
                htmlsHome += '<blockquote>';
                htmlsHome += '<span class="fst-t">입력일</span>';
                htmlsHome += '<span class="det-bae ">2022-02-04</span>';
                htmlsHome += '<span class="fst-t">수정일</span>';
                htmlsHome += '<span class="det-bae ">2022-02-04</span>';
                htmlsHome += '</blockquote>';
                htmlsHome += '</div>';
                htmlsHome += '<div class="det-item">';
                htmlsHome += '<blockquote>';
                htmlsHome += '<span class="fst-t">담당자</span>';
                htmlsHome += '<span class="det-bae ">홍길동</span>';
                htmlsHome += '</blockquote>';
                htmlsHome += '</div>';
                htmlsHome += '</div>';

                htmlsHome += '</td></tr>';
                break;
            case 1:
                cntSchool = cntSchool + r[i].num;
                const idd2 = 'td' + cnt21;

                if (i == 0 || cnt21 == 1) {
                    htmlsSchool += '<tr style="cursor: pointer; background: #0000000d;" id="tr-sch-' + idd2 + '-' +
                            i + '" onclick="showDetailSch(this.id)">';
                    htmlsSchool += '<td id="td' + cnt21 + '-sss">';
                    htmlsSchool += r[i].ctmname;
                    htmlsSchool += '</td>';

                    htmlsSchool += '<td style="text-align: left; padding-left: 2rem;">';
                    htmlsSchool += r[i].desty + suk;
                    htmlsSchool += '</td>';
                    cnt21++;
                } else {
                    if (r[i - 1].ctmno == r[i].ctmno) {
                        if ((cnt21 - 1) % 2 == 0) {
                            htmlsSchool += '<tr style="cursor: pointer; background: #FFFFFF;" id="tr-sch-td' + (
                                cnt21 - 1
                            ) + '-' + i + '" onclick="showDetailSch(this.id)">';
                        } else {
                            htmlsSchool += '<tr style="cursor: pointer; background: #0000000d;" id="tr-sch-td' + (
                                cnt21 - 1
                            ) + '-' + i + '" onclick="showDetailSch(this.id)">';
                        }
                        htmlsSchool += '<td style="text-align: left; padding-left: 2rem;">';
                        htmlsSchool += r[i].desty + suk;
                        htmlsSchool += '</td>';

                        cnt22++;
                    } else {
                        if (cnt21 % 2 == 0) {
                            htmlsSchool += '<tr style="cursor: pointer; background: #FFFFFF;" id="tr-sch-' + idd2 + '-' + i +
                                    '" onclick="showDetailSch(this.id)">';
                        } else {
                            htmlsSchool += '<tr style="cursor: pointer; background: #0000000d;" id="tr-sch-' + idd2 + '-' +
                                    i + '" onclick="showDetailSch(this.id)">';
                        }

                        htmlsSchool += '<td id="td' + cnt21 + '-sss">';
                        htmlsSchool += r[i].ctmname;
                        htmlsSchool += '</td>';

                        htmlsSchool += '<td style="text-align: left; padding-left: 2rem;">';
                        htmlsSchool += r[i].desty + suk;
                        htmlsSchool += '</td>';

                        cnt21++;

                        cntArr2.push(cnt22);
                        cnt22 = 1;
                    }
                }

                htmlsSchool += '<td>';
                htmlsSchool += r[i].bus;
                htmlsSchool += '</td>';

                htmlsSchool += '<td>';
                htmlsSchool += r[i].num;
                htmlsSchool += '</td>';

                htmlsSchool += '<td class="">';
                if (r[i].stt) {
                    htmlsSchool += r[i].stt;
                } else {
                    htmlsSchool += '';
                }
                htmlsSchool += '</td>';

                htmlsSchool += '<td class="">';
                htmlsSchool += r[i].rsvpstp;
                htmlsSchool += '</td>';

                htmlsSchool += '<td class="tdRight">';
                htmlsSchool += AddComma(r[i].conm);
                htmlsSchool += '</td>';
                htmlsSchool += '</tr>';
                htmlsSchool += '<tr style ="display:none;" id="tr-sch' + i + '"><td colspan="6">awfafafwf</td>' +
                        '</tr>';
                break;
            case 2:
                cntaccount = cntaccount + r[i].num;
                const idd3 = 'td' + cnt21;

                if (i == 0 || cnt31 == 1) {
                    htmlsaccount += '<tr style="cursor: pointer; background: #0000000d;" id="tr-acc-' + idd3 + '-' +
                            i + '" onclick="showDetailSch(this.id)">';
                    htmlsaccount += '<td id="td' + cnt31 + '-aaa">';
                    htmlsaccount += r[i].ctmname;
                    htmlsaccount += '</td>';

                    htmlsaccount += '<td style="text-align: left; padding-left: 2rem;">';
                    htmlsaccount += r[i].desty + suk;
                    htmlsaccount += '</td>';
                    cnt31++;
                } else {
                    if (r[i - 1].ctmno == r[i].ctmno) {
                        if ((cnt31 - 1) % 2 == 0) {
                            htmlsaccount += '<tr style="cursor: pointer; background: #FFFFFF;" id="tr-acc-td' + (
                                cnt31 - 1
                            ) + '-' + i + '" onclick="showDetailSch(this.id)">';
                        } else {
                            htmlsaccount += '<tr style="cursor: pointer; background: #0000000d;" id="tr-acc-td' + (
                                cnt31 - 1
                            ) + '-' + i + '" onclick="showDetailSch(this.id)">';
                        }
                        htmlsaccount += '<td style="text-align: left; padding-left: 2rem;">';
                        htmlsaccount += r[i].desty + suk;
                        htmlsaccount += '</td>';

                        cnt32++;
                    } else {
                        if (cnt31 % 2 == 0) {
                            htmlsaccount += '<tr style="cursor: pointer; background: #FFFFFF;" id="tr-acc-' + idd3 + '-' + i +
                                    '" onclick="showDetailSch(this.id)">';
                        } else {
                            htmlsaccount += '<tr style="cursor: pointer; background: #0000000d;" id="tr-acc-' + idd3 + '-' +
                                    i + '" onclick="showDetailSch(this.id)">';
                        }

                        htmlsaccount += '<td id="td' + cnt31 + '-aaa">';
                        htmlsaccount += r[i].ctmname;
                        htmlsaccount += '</td>';

                        htmlsaccount += '<td style="text-align: left; padding-left: 2rem;">';
                        htmlsaccount += r[i].desty + suk;
                        htmlsaccount += '</td>';

                        cnt31++;

                        cntArr3.push(cnt32);
                        cnt32 = 1;
                    }
                }

                htmlsaccount += '<td>';
                htmlsaccount += r[i].bus;
                htmlsaccount += '</td>';

                htmlsaccount += '<td>';
                htmlsaccount += r[i].num;
                htmlsaccount += '</td>';

                htmlsaccount += '<td class="tdRight">';
                htmlsaccount += AddComma(r[i].conm);
                htmlsaccount += '</td>';

                htmlsaccount += '<td class="">';
                htmlsaccount += r[i].rsvpstp;
                htmlsaccount += '</td>';

                htmlsaccount += '<td class="">';
                if (r[i].stt) {
                    htmlsaccount += r[i].stt;
                } else {
                    htmlsaccount += '';
                }
                htmlsaccount += '</td>';
                htmlsaccount += '</tr>';
                htmlsaccount += '<tr style ="display:none;" id="tr-acc' + i + '"><td colspan="6">awfafafwf</td>' +
                        '</tr>';
                break;
        }
    }

    $('#all-title').html(
        '<span>운행정보&nbsp;</span><span class="badge bg-secondary">' + cntAll +
        '</span>'
    );
    $('#normal-title').html(
        '일반&nbsp;<span class="badge bg-secondary">' + cntHome + '</span>'
    );
    $('#school-title').html(
        '학생단체&nbsp;<span class="badge bg-secondary">' + cntSchool + '</span>'
    );
    $('#account-title').html(
        '거래처&nbsp;<span class="badge bg-secondary">' + cntaccount + '</span>'
    );
    $('#go-title').html(
        '정기운행&nbsp;<span class="badge bg-secondary">' + 0 + '</span>'
    );

    const noRsvt = '<tr><td colspan="7">운행 정보 없음</td></tr>';
    const noRsvt1 = '<tr><td colspan="12">예약 정보 없음</td></tr>';

    if (htmlsHome) {
        cntArr.push(cnt12);
        $('#home-tb-normal').html(htmlsHome);
        for (let i = 0; i < cntArr.length; i++) {
            const idd = '#td' + (
                i + 1
            ) + '-hhh';
            if (i == cntArr.length - 1) {
                $(idd).attr('rowspan', 100);
            } else {
                $(idd).attr('rowspan', cntArr[i]);
            }
            // $(idd).attr('rowspan', cntArr[i]);
        }
    } else {
        $('#home-tb-normal').html(noRsvt);
        $('#tb-ilManage').html(noRsvt1);
    }

    if (htmlsSchool) {
        cntArr2.push(cnt12);
        $('#home-tb-school').html(htmlsSchool);
        for (let i = 0; i < cntArr2.length; i++) {
            const idd = '#td' + (
                i + 1
            ) + '-sss';
            if (i == cntArr2.length - 1) {
                $(idd).attr('rowspan', 100);
            } else {
                $(idd).attr('rowspan', cntArr2[i]);
            }
        }
    } else {
        $('#home-tb-school').html(noRsvt);
        $('#tb-hakManage').html(noRsvt1);
    }

    if (htmlsaccount) {
        cntArr3.push(cnt22);
        $('#home-tb-account').html(htmlsaccount);
        for (let i = 0; i < cntArr3.length; i++) {
            const idd = '#td' + (
                i + 1
            ) + '-aaa';
            if (i == cntArr3.length - 1) {
                $(idd).attr('rowspan', 100);
            } else {
                $(idd).attr('rowspan', cntArr3[i]);
            }
        }
    } else {
        $('#home-tb-account').html(noRsvt);
        $('#tb-guManage').html(noRsvt1);
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
        "endday": day,
        "rsvttrash": 1
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
        }
    });
}

$(document).on('click', 'aside', function () {});

$(document).on('click', '#goEmp', function () {
    // var w = 800; var h = 900; var xPos = (document.body.offsetWidth) - w; xPos +=
    // window.screenLeft; var yPos = 10;

    window.open('/employee', '인사정보')
});

$(document).on('click', '#goVe', function () {
    // var w = 800; var h = 900; var xPos = (document.body.offsetWidth) - w; xPos +=
    // window.screenLeft; var yPos = 10;

    window.open('/vehicle', '차량정보');
});

$(document).on('click', '#goRe', function () {
    // var w = 800; var h = 900; var xPos = (document.body.offsetWidth) - w; xPos +=
    // window.screenLeft; var yPos = 10;

    window.open('/regular', '정기운행정보');
});

$(document).on('click', '#goCustomer', function () {
    // var w = 800; var h = 900; var xPos = (document.body.offsetWidth) - w; xPos +=
    // window.screenLeft; var yPos = 10;

    window.open('/customers', '고객정보');
});

function showDetail(id) {
    const iidd = '#tr-' + id.split('-')[1] + id.split('-')[3];

    if ($(iidd).css("display") == "none") {
        $(iidd).show();
    } else {
        $(iidd).hide();
    }
}

function showDetailSch(id) {
    const iidd = '#tr-' + id.split('-')[1] + id.split('-')[3];
    let iiiddd = '';
    switch (id.split('-')[1]) {
        case 'home':
            iiiddd = '#' + id.split('-')[2] + '-hhh';
            break;
        case 'sch':
            iiiddd = '#' + id.split('-')[2] + '-sss';
            break;
        case 'acc':
            iiiddd = '#' + id.split('-')[2] + '-aaa';
            break;
    }

    const rowSize = $(iiiddd).attr('rowspan');

    if ($(iidd).css("display") == "none") {
        const upsize = parseInt(rowSize) + 1;
        $(iiiddd).attr('rowspan', upsize);
        $(iidd).show();
        scrollYHome(iidd);
    } else {
        const upsize = parseInt(rowSize) - 1;
        $(iiiddd).attr('rowspan', upsize);
        $(iidd).hide();
    }
}

$(document).on('click', '.deail-form-item', function () {

    const check = $(this).text();

    if (check.includes('내정보')) {} else if (check.includes('설정')) {} else if (check.includes('관리자')) {

        location.href = '/admin';

    } else if (check.includes('로그아웃')) {

        const ch = confirm("로그아웃하시겠습니까?\n\n저장하지않은 정보는 삭제됩니다.");
        if (ch) {
            location.href = '/logout';
        }

    };
});