$(document).ready(function () {});

function getManage(list) {

    setManageTable().then(sumRsvtM);

    function setManageTable() {
        return new Promise(function (resolve, reject) {
            let arrTmpCtm = new Array();
            for (let i = 0; i < list.length; i++) {
                if ($('#yearMonthDay').val() == list[i].stday) {
                    arrTmpCtm.push(list[i].ctmno);
                }
            }

            const uniqueCtm = [...new Set(arrTmpCtm)];

            let arrCnt = new Array();
            let arrCnt1 = new Array();
            let arrMoney = new Array();
            let arrDesty = new Array();
            let arrName = new Array();

            let arrSepa = new Array();
            let arrDay = new Array();

            let arrSumRsvt = new Array();

            for (let k = 0; k < uniqueCtm.length; k++) {
                let contRsvt = 0;
                let contNum = 0;
                let contMoney = 0;
                let contDesty = new Array();
                let contName = '';

                let contSepa = '';
                let contDay = '';

                let sumRsvt = new Array();

                for (let i = 0; i < list.length; i++) {
                    if (list[i].ctmno == uniqueCtm[k]) {
                        contRsvt++;
                        contNum = contNum + parseInt(list[i].num);
                        contMoney = contMoney + parseInt(list[i].conm);
                        contDesty.push(list[i].desty);
                        contName = list[i].ctmname;

                        contSepa = list[i].ctmsepa;
                        contDay = list[i].stday;

                        sumRsvt.push(list[i].rsvt);
                    }
                }

                const uniqueTmp = [...new Set(contDesty)];

                let tmpD = '';
                for (let j = 0; j < uniqueTmp.length; j++) {
                    if (j < 1) {
                        tmpD += uniqueTmp[j];
                    } else {
                        tmpD += ", " + uniqueTmp[j];
                    }
                }

                arrCnt.push(contRsvt);
                arrCnt1.push(contNum);
                arrMoney.push(contMoney);
                arrDesty.push(tmpD);
                arrName.push(contName);

                arrSepa.push(contSepa);
                arrDay.push(contDay);

                arrSumRsvt.push(sumRsvt);
            }

            let ilHtml = ``;
            let hakHtml = ``;
            let guHtml = ``;

            let cntIl = 0;
            let cntHak = 0;
            let cntGu = 0;

            for (let i = 0; i < uniqueCtm.length; i++) {
                switch (arrSepa[i]) {
                    case 0:
                        ilHtml += `
                    <tr>
                        <td class="thNone">` +
                                uniqueCtm[i] +
                                `</td>
                        <td class="thNone">` + arrDay[i] +
                                `</td>
                        <td class="thNone">` + arrSepa[i] +
                                `</td>
                        <td>` + (++cntIl) +
                                `</td>
                        <td>` + arrName[i] +
                                `</td>
                        <td>` + arrCnt[i] + '건' +
                                `</td>
                        <td>` + arrCnt1[i] + '대' +
                                `</td>
                        <td style="text-align: left; padding-left: 2rem;">` +
                                arrDesty[i] +
                                `</td>
                        <td class="tdRight">` + AddComma(arrMoney[i]) +
                                `</td>
                        <td class="tdRight" id="inMMM` + i +
                                `"></td>
                        <td class="tdRight" id="janMMM` + i +
                                `"></td>
                        <td> <a class="manageMore"><i class="fa-solid fa-magnifying-glass-plus"></i></a></td>
                    </tr>`
                        break;

                    case 1:
                        hakHtml += `
                    <tr>
                        <td class="thNone">` +
                                uniqueCtm[i] +
                                `</td>
                        <td class="thNone">` + arrDay[i] +
                                `</td>
                        <td class="thNone">` + arrSepa[i] +
                                `</td>
                        <td>` + (++cntHak) +
                                `</td>
                        <td>` + arrName[i] +
                                `</td>
                        <td>` + arrCnt[i] + '건' +
                                `</td>
                        <td>` + arrCnt1[i] + '대' +
                                `</td>
                        <td style="text-align: left; padding-left: 2rem;">` +
                                arrDesty[i] +
                                `</td>
                        <td class="tdRight">` + AddComma(arrMoney[i]) +
                                `</td>
                        <td class="tdRight" id="inMMM` + i +
                                `"></td>
                        <td class="tdRight" id="janMMM` + i +
                                `"></td>
                        <td> <a class="manageMore"><i class="fa-solid fa-magnifying-glass-plus"></i></a></td>
                    </tr>`
                        break;

                    case 2:
                        guHtml += `
                    <tr>
                        <td class="thNone">` +
                                uniqueCtm[i] +
                                `</td>
                        <td class="thNone">` + arrDay[i] +
                                `</td>
                        <td class="thNone">` + arrSepa[i] +
                                `</td>
                        <td>` + (++cntGu) +
                                `</td>
                        <td>` + arrName[i] +
                                `</td>
                        <td>` + arrCnt[i] + '건' +
                                `</td>
                        <td>` + arrCnt1[i] + '대' +
                                `</td>
                        <td style="text-align: left; padding-left: 2rem;">` +
                                arrDesty[i] +
                                `</td>
                        <td class="tdRight">` + AddComma(arrMoney[i]) +
                                `</td>
                        <td class="tdRight" id="inMMM` + i +
                                `"></td>
                        <td class="tdRight" id="janMMM` + i +
                                `"></td>
                        <td><a class="manageMore"><i class="fa-solid fa-magnifying-glass-plus"></i></a></td>
                    </tr>`
                        break;
                }
            }

            if (cntIl < 1) {
                ilHtml = `<tr><td colspan="12">예약 정보 없음</td></tr>`
            }
            if (cntHak < 1) {
                hakHtml = `<tr><td colspan="12">예약 정보 없음</td></tr>`
            }
            if (cntGu < 1) {
                guHtml = `<tr><td colspan="12">예약 정보 없음</td></tr>`
            }

            $('#tb-ilManage').html(ilHtml);
            $('#tb-hakManage').html(hakHtml);
            $('#tb-guManage').html(guHtml);

            resolve(arrSumRsvt);
        })
    }
    function sumRsvtM(result) {
        return new Promise(function (resolve, reject) {
            const url = "/manage/selectSumRsvtMoney";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };
            for (let i = 0; i < result.length; i++) {
                let cntM = 0;

                let params = new Array();

                for (let k = 0; k < result[i].length; k++) {
                    const asd = {
                        "rsvt": result[i][k]
                    };
                    params.push(asd);
                }

                $.ajax({
                    url: url,
                    type: "POST",
                    headers: headers,
                    dataType: "json",
                    data: JSON.stringify(params),
                    async: false,

                    success: function (r) {
                        const idIN = '#inMMM' + i;
                        const idJan = '#janMMM' + i;

                        const aaa = $(idIN).prev();
                        const operMM = $(aaa)
                            .text()
                            .replaceAll(',', '');

                        $(idIN).text(AddComma(r[0].moneymoney));
                        $(idJan).text(AddComma(parseInt(operMM) - parseInt(r[0].moneymoney)));
                    }
                })
            }
            resolve();
        })
    }
}

$(document).on('click', '.manageMore', function () {
    const aaa = $(this)
        .parent()
        .prev()
        .prev()
        .prev()
        .prev()
        .prev()
        .prev()
        .prev()
        .prev()
        .prev()
        .prev()
        .prev();

    const tmpCtmno = $(aaa).text();

    $(document).on('show.bs.modal', '#modalRsvtMoney', function () {
        $('#manageCtmno').val(tmpCtmno);

        const dayyy = $('#yearMonthDay').val() + ' ' + getDayOfWeek(
            new Date($('#yearMonthDay').val()).getDay()
        );

        $('#manageTitle').text(dayyy);

        LoadingWithMask()
            .then(getManageMD1)
            .then(getManageMD2)
            .then(getManageMD3)
            .then(closeLoadingWithMask);

    });
    $('#modalRsvtMoney').modal('show');
});