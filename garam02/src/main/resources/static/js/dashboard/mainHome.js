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

function makeMainBigCal(nowD, day) {
    LoadingWithMask()
        .then(setMainCalendar)
        .then(setBigCalendarHol)
        .then(plus1)
        .then(plus2)
        .then(plus3)
        .then(getCalRsvt1)
        .then(getCalRsvt2)
        .then(closeLoadingWithMask);

    let arrDays = new Array();
    let arrSukCnt = new Array();
    let arrIlCnt = new Array();

    let arrSukCnt45 = new Array();
    let arrSukCnt25 = new Array();
    let arrSukCnt28 = new Array();
    function setMainCalendar(result) {
        return new Promise(function (resolve, reject) {
            const aaa = new Date($("#yearMonth").val());

            const check = aaa.getMonth();
            let stD = getCalStD(aaa);

            const daysted = new Array;

            for (var i = 0; i < 42; i++) {
                let a = 0;
                if (i > 0) {
                    a = 1;
                }

                stD = new Date(stD.setDate(stD.getDate() + a));

                arrDays.push(toStringByFormatting(stD));

                let colorDay = '';
                let colorNoday = '1';

                if (check == stD.getMonth()) {
                    if (stD.getDay() == 6) {
                        colorDay = '#4B89DC';
                    } else if (stD.getDay() == 0) {
                        colorDay = '#CF2F11';
                    }
                    colorNoday = '1';
                } else {
                    if (stD.getDay() == 6) {
                        colorDay = '#6fa0e3';
                    } else if (stD.getDay() == 0) {
                        colorDay = '#f0674f"';
                    } else {
                        colorDay = '#8390A2';
                    }
                    colorNoday = '1';
                }

                const trNum = Math.floor(i / 7);
                let tdNum = i % Math.floor(parseInt(trNum) * 7);

                if (i < 7) {
                    tdNum = i;
                }

                const aaa = $('#tbMainCal').children()[trNum];
                const bbb = $(aaa).children()[tdNum];

                $(bbb).css('opacity', colorNoday);

                const bbb1 = $(bbb).children()[0];
                const bbb2 = $(bbb1).children()[1];
                const bbb3 = $(bbb2).children()[0];
                const bbb31 = $(bbb2).children()[1];

                const bbb4 = $(bbb1).children()[0];

                $(bbb4).val(toStringByFormatting(stD));

                if (toStringByFormatting(new Date()) == $(bbb4).val()) {
                    $(bbb).addClass('tdMainCal');
                } else {
                    $(bbb).removeClass('tdMainCal');
                }

                $(bbb3).text(stD.getDate());
                $(bbb3).css('color', colorDay);

                $(bbb31).text('');

                if (i == 0) {
                    daysted.push(toStringByFormatting(stD));
                }
                if (i == 41) {
                    daysted.push(toStringByFormatting(stD));
                }
            }
            resolve(daysted);
        });
    }

    function setBigCalendarHol(result) {
        return new Promise(function (resolve, reject) {
            const url = "/calendar/event";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };
            const params = {
                "stD": result[0],
                "endD": result[1]
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                dataType: "json",
                data: JSON.stringify(params),
                success: function (r) {
                    for (let i = 0; i < r.length; i++) {
                        if (r[i].holiday) {
                            for (let k = 0; k < 42; k++) {
                                const trNum = Math.floor(k / 7);
                                let tdNum = k % Math.floor(parseInt(trNum) * 7);

                                if (k < 7) {
                                    tdNum = k;
                                }

                                const aaa = $('#tbMainCal').children()[trNum];
                                const bbb = $(aaa).children()[tdNum];

                                const bbb1 = $(bbb).children()[0];

                                const bbb4 = $(bbb1).children()[0];
                                const bbb2 = $(bbb1).children()[1];
                                const bbb3 = $(bbb2).children()[1];
                                const bbb5 = $(bbb2).children()[0];

                                if ($(bbb4).val() == r[i].solarcal) {
                                    $(bbb5).css('color', '#CF2F11');
                                    $(bbb3).text(r[i].holiday);
                                }
                            }
                        }
                    }
                    resolve(result);
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            });
        })
    }

    function plus1(result) {
        return new Promise(function (resolve, reject) {
            const url = "/home/homeCal3";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "stday": result[0],
                "endday": result[1]
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {

                    for (let k = 0; k < arrDays.length; k++) {
                        let tmpCnt = 0;

                        let tmpCnt45 = 0;
                        let tmpCnt25 = 0;
                        let tmpCnt28 = 0;

                        const calDay = parseInt(
                            arrDays[k].split('-')[0] + arrDays[k].split('-')[1] + arrDays[k].split('-')[2]
                        );

                        for (let i = 0; i < r.length; i++) {
                            const reaStlDay = parseInt(
                                r[i].stday.split('-')[0] + r[i].stday.split('-')[1] + r[i].stday.split('-')[2]
                            );
                            const reaEdlDay = parseInt(
                                r[i].endday.split('-')[0] + r[i].endday.split('-')[1] + r[i].endday.split('-')[2]
                            );

                            if (calDay >= reaStlDay && calDay <= reaEdlDay) {
                                tmpCnt++;

                                switch (r[i].bus) {
                                    case '대형':
                                        tmpCnt45 = tmpCnt45 + parseInt(r[i].ctmtel1);
                                        break;
                                    case '중형':
                                        tmpCnt25 = tmpCnt25 + parseInt(r[i].ctmtel2);
                                        break;
                                    case '우등':
                                        tmpCnt28 = tmpCnt28 + parseInt(r[i].ctmemail);
                                        break;

                                    default:
                                        break;
                                }

                            }
                        }
                        arrSukCnt.push(tmpCnt);

                        arrSukCnt45.push(tmpCnt45);
                        arrSukCnt25.push(tmpCnt25);
                        arrSukCnt28.push(tmpCnt28);
                    }
                    console.log(arrSukCnt);

                    console.log(arrSukCnt45);
                    console.log(arrSukCnt25);
                    console.log(arrSukCnt28);
                    resolve(result);
                }
            })
        })
    }
    function plus2(result) {
        return new Promise(function (resolve, reject) {
            const url = "/home/homeCal4";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "stday": result[0],
                "endday": result[1]
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {

                    for (let k = 0; k < arrDays.length; k++) {
                        let tmpCnt = 0;
                        for (let i = 0; i < r.length; i++) {
                            if (arrDays[k] == r[i].stday) {
                                tmpCnt++;
                            }
                        }
                        arrIlCnt.push(tmpCnt);
                    }
                    resolve(result);
                }
            })
        })
    }
    function plus3(result) {
        return new Promise(function (resolve, reject) {
            let tmpArr = new Array();
            for (let i = 0; i < 42; i++) {
                tmpArr.push(parseInt(arrSukCnt[i]) + parseInt(arrIlCnt[i]));
            }

            let tr01 = 0;
            let tr02 = 0;
            let tr03 = 0;
            let tr04 = 0;
            let tr05 = 0;
            let tr06 = 0;

            for (let i = 0; i < 7; i++) {
                if (tr01 < tmpArr[i]) {
                    tr01 = tmpArr[i];
                }
            }

            for (let i = 7; i < 14; i++) {
                if (tr02 < tmpArr[i]) {
                    tr02 = tmpArr[i];
                }
            }

            for (let i = 14; i < 21; i++) {
                if (tr03 < tmpArr[i]) {
                    tr03 = tmpArr[i];
                }
            }

            for (let i = 21; i < 28; i++) {
                if (tr04 < tmpArr[i]) {
                    tr04 = tmpArr[i];
                }
            }

            for (let i = 28; i < 35; i++) {
                if (tr05 < tmpArr[i]) {
                    tr05 = tmpArr[i];
                }
            }

            for (let i = 35; i < 42; i++) {
                if (tr06 < tmpArr[i]) {
                    tr06 = tmpArr[i];
                }
            }

            let inHtml1 = ``;
            let inHtml2 = ``;
            let inHtml3 = ``;
            let inHtml4 = ``;
            let inHtml5 = ``;
            let inHtml6 = ``;

            for (let i = 0; i < tr01; i++) {
                inHtml1 += `
                <div class="mainCaltd-middle">
                    <div class="mainCaltd-middle-item"></div>
                    <div class="maincaltd-middle-itemb">&nbsp;</div>
                    <input type="hidden">
                    <input type="hidden">
                    <input type="hidden">
                </div>`;
            }

            for (let i = 0; i < tr02; i++) {
                inHtml2 += `
                <div class="mainCaltd-middle">
                    <div class="mainCaltd-middle-item"></div>
                    <div class="maincaltd-middle-itemb">&nbsp;</div>
                    <input type="hidden">
                    <input type="hidden">
                    <input type="hidden">
                </div>`;
            }

            for (let i = 0; i < tr03; i++) {
                inHtml3 += `
                <div class="mainCaltd-middle">
                    <div class="mainCaltd-middle-item"></div>
                    <div class="maincaltd-middle-itemb">&nbsp;</div>
                    <input type="hidden">
                    <input type="hidden">
                    <input type="hidden">
                </div>`;
            }

            for (let i = 0; i < tr04; i++) {
                inHtml4 += `
                <div class="mainCaltd-middle">
                    <div class="mainCaltd-middle-item"></div>
                    <div class="maincaltd-middle-itemb">&nbsp;</div>
                    <input type="hidden">
                    <input type="hidden">
                    <input type="hidden">
                </div>`;
            }

            for (let i = 0; i < tr05; i++) {
                inHtml5 += `
                <div class="mainCaltd-middle">
                    <div class="mainCaltd-middle-item"></div>
                    <div class="maincaltd-middle-itemb">&nbsp;</div>
                    <input type="hidden">
                    <input type="hidden">
                    <input type="hidden">
                </div>`;
            }

            for (let i = 0; i < tr06; i++) {
                inHtml6 += `
                <div class="mainCaltd-middle">
                    <div class="mainCaltd-middle-item"></div>
                    <div class="maincaltd-middle-itemb">&nbsp;</div>
                    <input type="hidden">
                    <input type="hidden">
                    <input type="hidden">
                </div>`;
            }

            $('#calMid1').html(inHtml1);
            $('#calMid2').html(inHtml1);
            $('#calMid3').html(inHtml1);
            $('#calMid4').html(inHtml1);
            $('#calMid5').html(inHtml1);
            $('#calMid6').html(inHtml1);
            $('#calMid7').html(inHtml1);

            $('#calMid8').html(inHtml2);
            $('#calMid9').html(inHtml2);
            $('#calMid10').html(inHtml2);
            $('#calMid11').html(inHtml2);
            $('#calMid12').html(inHtml2);
            $('#calMid13').html(inHtml2);
            $('#calMid14').html(inHtml2);

            $('#calMid15').html(inHtml3);
            $('#calMid16').html(inHtml3);
            $('#calMid17').html(inHtml3);
            $('#calMid18').html(inHtml3);
            $('#calMid19').html(inHtml3);
            $('#calMid20').html(inHtml3);
            $('#calMid21').html(inHtml3);

            $('#calMid22').html(inHtml4);
            $('#calMid23').html(inHtml4);
            $('#calMid24').html(inHtml4);
            $('#calMid25').html(inHtml4);
            $('#calMid26').html(inHtml4);
            $('#calMid27').html(inHtml4);
            $('#calMid28').html(inHtml4);

            $('#calMid29').html(inHtml5);
            $('#calMid30').html(inHtml5);
            $('#calMid31').html(inHtml5);
            $('#calMid32').html(inHtml5);
            $('#calMid33').html(inHtml5);
            $('#calMid34').html(inHtml5);
            $('#calMid35').html(inHtml5);

            $('#calMid36').html(inHtml6);
            $('#calMid37').html(inHtml6);
            $('#calMid38').html(inHtml6);
            $('#calMid39').html(inHtml6);
            $('#calMid40').html(inHtml6);
            $('#calMid41').html(inHtml6);
            $('#calMid42').html(inHtml6);

            $('#calMid1')
                .next()
                .html(``);
            $('#calMid2')
                .next()
                .html(``);
            $('#calMid3')
                .next()
                .html(``);
            $('#calMid4')
                .next()
                .html(``);
            $('#calMid5')
                .next()
                .html(``);
            $('#calMid6')
                .next()
                .html(``);
            $('#calMid7')
                .next()
                .html(``);

            $('#calMid8')
                .next()
                .html(``);
            $('#calMid9')
                .next()
                .html(``);
            $('#calMid10')
                .next()
                .html(``);
            $('#calMid11')
                .next()
                .html(``);
            $('#calMid12')
                .next()
                .html(``);
            $('#calMid13')
                .next()
                .html(``);
            $('#calMid14')
                .next()
                .html(``);

            $('#calMid15')
                .next()
                .html(``);
            $('#calMid16')
                .next()
                .html(``);
            $('#calMid17')
                .next()
                .html(``);
            $('#calMid18')
                .next()
                .html(``);
            $('#calMid19')
                .next()
                .html(``);
            $('#calMid20')
                .next()
                .html(``);
            $('#calMid21')
                .next()
                .html(``);

            $('#calMid22')
                .next()
                .html(``);
            $('#calMid23')
                .next()
                .html(``);
            $('#calMid24')
                .next()
                .html(``);
            $('#calMid25')
                .next()
                .html(``);
            $('#calMid26')
                .next()
                .html(``);
            $('#calMid27')
                .next()
                .html(``);
            $('#calMid28')
                .next()
                .html(``);

            $('#calMid29')
                .next()
                .html(``);
            $('#calMid30')
                .next()
                .html(``);
            $('#calMid31')
                .next()
                .html(``);
            $('#calMid32')
                .next()
                .html(``);
            $('#calMid33')
                .next()
                .html(``);
            $('#calMid34')
                .next()
                .html(``);
            $('#calMid35')
                .next()
                .html(``);

            $('#calMid36')
                .next()
                .html(``);
            $('#calMid37')
                .next()
                .html(``);
            $('#calMid38')
                .next()
                .html(``);
            $('#calMid39')
                .next()
                .html(``);
            $('#calMid40')
                .next()
                .html(``);
            $('#calMid41')
                .next()
                .html(``);
            $('#calMid42')
                .next()
                .html(``);
            resolve(result);
        })
    }

    function getCalRsvt1(result) {
        return new Promise(function (resolve, reject) {
            const url = "/home/homeCal1";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "stday": result[0],
                "endday": result[1]
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {
                    if (r.length > 0) {
                        for (let i = 0; i < r.length; i++) {
                            const beet = betweenDateNum(r[i].stday, r[i].endday);

                            let cntChild = 0;
                            let saveDom = new Array();
                            let arrTmpDay = new Array();
                            let dayWeek = '';
                            for (let k = 0; k < beet; k++) {
                                let dayyyy = new Date(r[i].stday);
                                dayyyy = new Date(dayyyy.setDate(dayyyy.getDate() + k));

                                for (let j = 0; j < 42; j++) {
                                    const trNum = Math.floor(j / 7);
                                    let tdNum = j % Math.floor(parseInt(trNum) * 7);

                                    if (j < 7) {
                                        tdNum = j;
                                    }

                                    const aaa = $('#tbMainCal').children()[trNum];
                                    const bbb = $(aaa).children()[tdNum];

                                    const bbb1 = $(bbb).children()[0];
                                    const bbb4 = $(bbb1).children()[0];

                                    if (toStringByFormatting(dayyyy) == $(bbb4).val()) {
                                        const iiddd = '#calMid' + (
                                            j + 1
                                        )

                                        const ccc = $(bbb1).children()[2];

                                        const ccc1 = $(iiddd).children();

                                        let qwer = '';

                                        switch (r[i].ctmsepa) {
                                            case 0:
                                                qwer += `<span class="spNum1">` + r[i].desty + `</span>`;
                                                break;
                                            case 1:
                                                qwer += `<span class="spNum1">` + r[i].ctmname + `</span>`;
                                                break;
                                            case 2:
                                                qwer += `<span class="spNum1">` + r[i].desty + `</span>`;
                                                break;
                                            default:
                                                break;
                                        }

                                        if (r[i].ctmtel1 > 0) {
                                            qwer += `<span class="spNum2 big45">` + r[i].ctmtel1 + `</span>`;
                                        }
                                        if (r[i].ctmtel2 > 0) {
                                            qwer += `<span class="spNum2 big25">` + r[i].ctmtel2 + `</span>`;
                                        }
                                        if (r[i].ctmemail > 0) {
                                            qwer += `<span class="spNum2 big28">` + r[i].ctmemail + `</span>`;
                                        }

                                        let qwer1 = '';

                                        switch (r[i].ctmsepa) {
                                            case 0:
                                                qwer1 += `<span class="spNum1">` + r[i].desty + `</span>`;
                                                break;
                                            case 1:
                                                qwer1 += `<span class="spNum1">` + r[i].ctmname + `</span>`;
                                                break;
                                            case 2:
                                                qwer1 += `<span class="spNum1">` + r[i].desty + `</span>`;
                                                break;
                                            default:
                                                break;
                                        }

                                        if (k == 0) {
                                            for (let j2 = 0; j2 < ccc1.length; j2++) {
                                                const chch = $(ccc1[j2]).children()[0];
                                                const dayval = $(ccc1[j2]).children()[2];
                                                const ctmval = $(ccc1[j2]).children()[3];
                                                const sepaa = $(ccc1[j2]).children()[4];
                                                const texttt = $(chch).text();

                                                if ($(ctmval).val() == r[i].rsvt) {
                                                    break;
                                                }

                                                if (!texttt) {
                                                    $(chch).html(qwer);
                                                    $(dayval).val(r[i].stday);
                                                    $(ctmval).val(r[i].rsvt);
                                                    $(sepaa).val(1);
                                                    saveDom.push(chch);
                                                    cntChild = j2;
                                                    dayWeek += dayyyy.getDay();
                                                    break;
                                                }
                                            }
                                        } else {
                                            const chch = $(ccc1[cntChild]).children()[0];
                                            const dayval = $(ccc1[cntChild]).children()[2];
                                            const ctmval = $(ccc1[cntChild]).children()[3];
                                            const sepaa = $(ccc1[cntChild]).children()[4];
                                            $(chch).html(qwer1);
                                            $(dayval).val(r[i].stday);
                                            $(ctmval).val(r[i].rsvt);
                                            $(sepaa).val(1);
                                            if (dayyyy.getDay() == 1) {
                                                arrTmpDay.push(dayWeek);
                                                dayWeek = '1';
                                                saveDom.push(chch);
                                            } else {
                                                $(chch).css('color', 'transparent');
                                                dayWeek += dayyyy.getDay();
                                            }
                                        }
                                    }
                                }
                            }
                            arrTmpDay.push(dayWeek);

                            for (let l = 0; l < saveDom.length; l++) {
                                let rrem = 0;
                                for (let l3 = 1; l3 < arrTmpDay[l].split('').length; l3++) {
                                    rrem = rrem + getTdSize(parseInt(arrTmpDay[l].split('')[l3]));
                                }
                                $(saveDom[l]).attr('class', 'mainCaltd-middle-item middle-suk');
                                $(saveDom[l]).css('right', (rrem * -1) + "px");

                                if (saveDom.length > 1) {
                                    if (l == saveDom.length - 1) {
                                        $(saveDom[l]).css('margin-left', '0')
                                        $(saveDom[l]).css('margin-right', '0.3rem')
                                        $(saveDom[l]).css('border-radius', '0 3px 3px 0')
                                    } else if (l == 0) {
                                        $(saveDom[l]).css('margin-left', '0.3rem')
                                        $(saveDom[l]).css('margin-right', '0')
                                        $(saveDom[l]).css('border-radius', '3px 0 0 3px')
                                    } else {
                                        $(saveDom[l]).css('margin-left', '0')
                                        $(saveDom[l]).css('margin-right', '0')
                                        $(saveDom[l]).css('border-radius', '0')
                                    }
                                }
                            }
                        }
                    }
                    resolve(result);
                }
            })
        })
    }

    function getCalRsvt2(result) {
        return new Promise(function (resolve, reject) {
            const url = "/home/homeCal2";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "stday": result[0],
                "endday": result[1]
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {
                    if (r.length) {
                        console.log(r);

                        for (let i = 0; i < r.length; i++) {
                            let number = 0;
                            for (let k = 0; k < arrDays.length; k++) {
                                if (r[i].stday == arrDays[k]) {
                                    number = parseInt(k) + 1;
                                }
                            }

                            const iiddd = '#calMid' + (
                                number
                            );

                            const ccc1 = $(iiddd).children();

                            let qwer = '';

                            switch (r[i].ctmsepa) {
                                case 0:
                                    qwer += `<span class="spNum1">` + r[i].ctmname + `</span>`;
                                    break;
                                case 1:
                                    qwer += `<span class="spNum1">` + r[i].ctmname + `</span>`;
                                    break;
                                case 2:
                                    qwer += `<span class="spNum1">` + r[i].ctmname + `</span>`;
                                    break;
                                default:
                                    break;
                            }

                            if (r[i].ctmtel1 > 0) {
                                qwer += `<span class="spNum2 big45">` + r[i].ctmtel1 + `</span>`;
                            }
                            if (r[i].ctmtel2 > 0) {
                                qwer += `<span class="spNum2 big25">` + r[i].ctmtel2 + `</span>`;
                            }
                            if (r[i].ctmemail > 0) {
                                qwer += `<span class="spNum2 big28">` + r[i].ctmemail + `</span>`;
                            }

                            if (r[i].stday == '2019-08-14') {
                                console.log("qwer  " + qwer);
                            }

                            for (let j2 = 0; j2 < ccc1.length; j2++) {
                                const chch = $(ccc1[j2]).children()[0];
                                const dayval = $(ccc1[j2]).children()[2];
                                const ctmval = $(ccc1[j2]).children()[3];
                                const sepaa = $(ccc1[j2]).children()[4];
                                const texttt = $(chch).text();

                                if ($(ctmval).val() == r[i].ctmno) {
                                    let qqqq = ``;
                                    if (r[i].ctmtel1 > 0) {
                                        qqqq += `<span class="spNum2 big45">` + r[i].ctmtel1 + `</span>`;
                                    }
                                    if (r[i].ctmtel2 > 0) {
                                        qqqq += `<span class="spNum2 big25">` + r[i].ctmtel2 + `</span>`;
                                    }
                                    if (r[i].ctmemail > 0) {
                                        qqqq += `<span class="spNum2 big28">` + r[i].ctmemail + `</span>`;
                                    }
                                    $(chch).append(qqqq);
                                    break;
                                } else {
                                    if (!texttt) {
                                        $(chch).addClass('middle-il');
                                        $(chch).html(qwer);
                                        $(dayval).val(r[i].stday);
                                        $(ctmval).val(r[i].ctmno);
                                        $(sepaa).val(0);
                                        break;
                                    }
                                }
                            }
                        }

                        for (let k = 0; k < arrDays.length; k++) {
                            let bus45Cnt = 0;
                            let bus25Cnt = 0;
                            let bus28Cnt = 0;
                            for (let i = 0; i < r.length; i++) {
                                if (r[i].stday == arrDays[k]) {
                                    if (r[i].ctmtel1 > 0) {
                                        bus45Cnt = bus45Cnt + parseInt(r[i].ctmtel1);
                                    }
                                    if (r[i].ctmtel2 > 0) {
                                        bus25Cnt = bus25Cnt + parseInt(r[i].ctmtel2);
                                    }
                                    if (r[i].ctmemail > 0) {
                                        bus28Cnt = bus28Cnt + parseInt(r[i].ctmemail);
                                    }
                                }
                            }

                            bus45Cnt = bus45Cnt + parseInt(arrSukCnt45[k]);
                            bus25Cnt = bus25Cnt + parseInt(arrSukCnt25[k]);
                            bus28Cnt = bus28Cnt + parseInt(arrSukCnt28[k]);

                            let htmll45 = ``;
                            let htmll25 = ``;
                            let htmll28 = ``;

                            if (bus45Cnt > 0) {
                                htmll45 = `<span class="big45">` + bus45Cnt + `</span>`;
                            } else {
                                htmll45 = `<span class="">   </span>`;
                            }

                            if (bus25Cnt > 0) {
                                htmll25 = `<span class="big25">` + bus25Cnt + `</span>`;
                            } else {
                                htmll25 = `<span class="">   </span>`;
                            }

                            if (bus28Cnt > 0) {
                                htmll28 = `<span class="big28">` + bus28Cnt + `</span>`;
                            } else {
                                htmll28 = `<span class="">   </span>`;
                            }

                            const htmll = htmll45 + htmll25 + htmll28;

                            const iiddd = '#calMid' + (
                                parseInt(k) + 1
                            );

                            const aaa = $(iiddd).next();

                            $(aaa).html(htmll);
                        }
                    }
                    resolve();
                }
            })
        })
    }

    function getCalRsvt2123123(result) {
        return new Promise(function (resolve, reject) {
            const url = "/home/homeCal2";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            for (let l = 0; l < 42; l++) {
                let stD = new Date(result[0]);
                stD = new Date(stD.setDate(stD.getDate() + l));

                const params = {
                    "stday": toStringByFormatting(stD)
                };

                $.ajax({
                    url: url,
                    type: "POST",
                    headers: headers,
                    dataType: "json",
                    data: JSON.stringify(params),

                    success: function (r) {
                        let arrTmpCtmno = new Array();

                        for (let i = 0; i < r.length; i++) {
                            arrTmpCtmno.push(r[i].ctmno);
                        }

                        const uniqueCtm = [...new Set(arrTmpCtmno)];
                        let dayArrTmp = new Array();
                        let ctoNameArrTmp = new Array();
                        let bus45ArrTmp = new Array();
                        let bus25ArrTmp = new Array();
                        let bus28ArrTmp = new Array();
                        let sepaArrTmp = new Array();
                        let destyArrTmp = new Array();

                        for (let k = 0; k < uniqueCtm.length; k++) {
                            let cnt45 = 0;
                            let cnt25 = 0;
                            let cnt28 = 0;
                            let cDay = '';
                            let cName = '';
                            let cSepa = '';
                            let ddesty = '';
                            for (let i = 0; i < r.length; i++) {
                                if (r[i].ctmno == uniqueCtm[k]) {
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
                                    cDay = r[i].stday;
                                    cName = r[i].ctmname;
                                    cSepa = r[i].ctmsepa;

                                    ddesty += r[i].desty;
                                }
                            }
                            dayArrTmp.push(cDay);
                            ctoNameArrTmp.push(cName);
                            bus45ArrTmp.push(cnt45);
                            bus25ArrTmp.push(cnt25);
                            bus28ArrTmp.push(cnt28);
                            sepaArrTmp.push(cSepa);
                            destyArrTmp.push(ddesty);
                        }

                        for (let i = 0; i < uniqueCtm.length; i++) {
                            const trNum = Math.floor(l / 7);
                            let tdNum = l % Math.floor(parseInt(trNum) * 7);

                            if (l < 7) {
                                tdNum = l;
                            }

                            const aaa = $('#tbMainCal').children()[trNum];
                            const bbb = $(aaa).children()[tdNum];

                            const bbb1 = $(bbb).children()[0];
                            const bbb4 = $(bbb1).children()[0];

                            if (toStringByFormatting(stD) == $(bbb4).val()) {
                                const ccc = $(bbb1).children()[2];
                                const ccc1 = $(ccc).children();

                                let qwer = '';

                                switch (sepaArrTmp[i]) {
                                    case 0:
                                        qwer += `<span class="spNum1">` + ctoNameArrTmp[i] + `</span>`;
                                        break;
                                    case 1:
                                        qwer += `<span class="spNum1">` + ctoNameArrTmp[i] + `</span>`;
                                        break;
                                    case 2:
                                        qwer += `<span class="spNum1">` + ctoNameArrTmp[i] + `</span>`;
                                        break;
                                    default:
                                        break;
                                }

                                if (bus45ArrTmp[i] > 0) {
                                    qwer += `<span class="spNum2 big45">` + bus45ArrTmp[i] + `</span>`;
                                }
                                if (bus25ArrTmp[i] > 0) {
                                    qwer += `<span class="spNum2 big25">` + bus25ArrTmp[i] + `</span>`;
                                }
                                if (bus28ArrTmp[i] > 0) {
                                    qwer += `<span class="spNum2 big28">` + bus28ArrTmp[i] + `</span>`;
                                }

                                for (let j2 = 0; j2 < ccc1.length; j2++) {
                                    const chch = $(ccc1[j2]).children()[0];
                                    const dayval = $(ccc1[j2]).children()[2];
                                    const ctmval = $(ccc1[j2]).children()[3];
                                    const sepaa = $(ccc1[j2]).children()[4];
                                    const texttt = $(chch).text();
                                    if (!texttt) {
                                        $(chch).html(qwer);
                                        $(dayval).val(r[i].stday);
                                        $(ctmval).val(r[i].rsvt);
                                        $(sepaa).val(1);
                                        break;
                                    }
                                }
                            }
                        }
                    }
                });
                if (l == 41) {}
                resolve();
            }
        })
    }
}

$(window).on('resize', function () {
    let delay = 300;
    let timer = null;
    clearTimeout(timer);
    timer = setTimeout(function () {
        makeMainBigCal();
    }, delay);
});

function getTdSize(params) {
    switch (params) {
        case 1:
            const size1 = document.querySelector('#Td1');
            return parseFloat(size1.getBoundingClientRect().width);
            break;
        case 2:
            const size2 = document.querySelector('#Td2');
            return parseFloat(size2.getBoundingClientRect().width);
            break;
        case 3:
            const size3 = document.querySelector('#Td3');
            return parseFloat(size3.getBoundingClientRect().width);
            break;
        case 4:
            const size4 = document.querySelector('#Td4');
            return parseFloat(size4.getBoundingClientRect().width);
            break;
        case 5:
            const size5 = document.querySelector('#Td5');
            return parseFloat(size5.getBoundingClientRect().width);
            break;
        case 6:
            const size6 = document.querySelector('#Td6');
            return parseFloat(size6.getBoundingClientRect().width);
            break;
        case 0:
            const size0 = document.querySelector('#Td0');
            return parseFloat(size0.getBoundingClientRect().width);
            break;

    }

}

$(document).on('click', '.middle-suk', function () {
    console.log("하하이이요요");
});

$(document).ready(function () {
    $(".mainCalTable tbody tr td .mainCaltd-top .mainCaltd-top-hol").mouseover(
        function () {
            $(this)
                .parent()
                .parent()
                .parent()
                .addClass('tdHovers');
        }
    );
    $(".mainCalTable tbody tr td .mainCaltd-top .mainCaltd-top-hol").mouseout(
        function () {
            $(this)
                .parent()
                .parent()
                .parent()
                .removeClass('tdHovers');
        }
    );
});

$(document).ready(function () {
    $(".mainCalTable tbody tr td .mainCaltd-top .mainCaltd-top-day").mouseover(
        function () {
            $(this)
                .parent()
                .parent()
                .parent()
                .addClass('tdHovers');
        }
    );
    $(".mainCalTable tbody tr td .mainCaltd-top .mainCaltd-top-day").mouseout(
        function () {
            $(this)
                .parent()
                .parent()
                .parent()
                .removeClass('tdHovers');
        }
    );
});

$(document).on('click', '.mainCaltd-top-hol', function () {
    const aaa = $(this)
        .parent()
        .next();

    const getidd = $(aaa).attr('id');
    const getidd1 = getidd.split('calMid');

    const realNum = getidd1[1];

    const iiddddd = 'dash-cal-con-item' + realNum;

    setCalWhite(iiddddd);
});
$(document).on('click', '.mainCaltd-top-day', function () {
    const aaa = $(this)
        .parent()
        .next();

    const getidd = $(aaa).attr('id');
    const getidd1 = getidd.split('calMid');

    const realNum = getidd1[1];

    const iiddddd = 'dash-cal-con-item' + realNum;

    setCalWhite(iiddddd);
});