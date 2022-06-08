$(document).ready(function () {
    const now = new Date();
    const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
    const fff = toStringByFormatting(oneMonthAgo);

    const nownownows = toStringByFormatting(now);
    const nowMonth = new Date(
        nownownows.split('-')[0],
        nownownows.split('-')[1] - 1,
        1
    );

    const oneMonthAgo1 = new Date(nowMonth.setMonth(nowMonth.getMonth() + 1));
    const fff1 = toStringByFormatting(oneMonthAgo1);
    $('#staticMonth').val(fff.split('-')[0] + '-' + fff.split('-')[1]);
    $('#staticMonth').attr('max', fff1.split('-')[0] + '-' + fff1.split('-')[1]);

    getVeAllCompa();
});

$(document).on('change', '#staticMonth', function () {
    getVeAllCompa();
});

$(document).on('click', '#fnDownMonthStatic', function () {
    setYearMonthDown('#staticMonth');
    getVeAllCompa();
});

$(document).on('click', '#fnUpMonthStatic', function () {
    setYearMonthUp('#staticMonth');
    getVeAllCompa();
});

function setYearMonthUp(params) {
    const getYM = $(params).val();
    const nowMonth = new Date(getYM.split('-')[0], getYM.split('-')[1] - 1, 1);

    const oneMonthAgo = new Date(nowMonth.setMonth(nowMonth.getMonth() + 1));
    const fff = toStringByFormatting(oneMonthAgo);
    $(params).val(fff.split('-')[0] + '-' + fff.split('-')[1]);
}

function setYearMonthDown(params) {
    const getYM = $(params).val();
    const nowMonth = new Date(getYM.split('-')[0], getYM.split('-')[1] - 1, 1);

    const oneMonthAgo = new Date(nowMonth.setMonth(nowMonth.getMonth() - 1));
    const fff = toStringByFormatting(oneMonthAgo);
    $(params).val(fff.split('-')[0] + '-' + fff.split('-')[1]);
}

function getVeAllCompa() {

    LoadingWithMask()
        .then(getVeAllCompaSql)
        .then(setChart1)
        .then(closeLoadingWithMask);

    function getVeAllCompaSql() {
        return new Promise(function (resolve, reject) {
            const url = "/adrst/selveallcomp";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            let tmpArrDay = getStDEnD($('#staticMonth').val());

            const params = {
                "fuel": $('#staticMonth').val(),
                "inday": tmpArrDay[0],
                "outday": tmpArrDay[1]
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {

                    let htmls = ``;

                    let arrTmp = new Array();
                    let arrTmpCar = new Array();
                    let arrTmpAllIn = new Array();
                    let arrTmpAllOut = new Array();
                    let arrTmpAll = new Array();

                    let sum1 = 0;
                    let sum2 = 0;
                    let sum3 = 0;
                    let sum4 = 0;
                    let sum5 = 0;
                    let sum6 = 0;
                    let sum7 = 0;
                    let sum8 = 0;
                    let sum9 = 0;
                    let sum10 = 0;
                    let sum11 = 0;
                    let sum12 = 0;
                    let sum13 = 0;
                    let sum14 = 0;

                    let sum15 = 0;
                    let sum16 = 0;
                    let sum17 = 0;

                    let cntGas = 0;

                    for (let i = 0; i < r.length; i++) {

                        let chM = 0;

                        let allIn = 0;
                        let allOut = 0;

                        let sss = 0;
                        if (r[i].special) {
                            allIn = allIn + parseInt(r[i].special);
                            sss = AddComma(r[i].special);
                        }

                        let iii1 = 0;
                        if (r[i].img1) {
                            chM = chM + parseInt(r[i].img1.split('.')[0]);
                            allIn = allIn + parseInt(r[i].img1.split('.')[0]);
                            iii1 = AddComma(r[i].img1.split('.')[0]);
                        }

                        let iii2 = 0;
                        if (r[i].img2) {
                            chM = chM + parseInt(r[i].img2.split('.')[0]);
                            allIn = allIn + parseInt(r[i].img2.split('.')[0]);
                            iii2 = AddComma(r[i].img2.split('.')[0]);
                        }

                        let iii3 = 0;
                        if (r[i].img3) {
                            chM = chM + parseInt(r[i].img3.split('.')[0]);
                            allIn = allIn + parseInt(r[i].img3.split('.')[0]);
                            iii3 = AddComma(r[i].img3.split('.')[0]);
                        }

                        let iidd1 = 0;
                        if (r[i].id1) {
                            allOut = allOut + parseInt(r[i].id1);
                            iidd1 = AddComma(r[i].id1);
                        }

                        let iidd2 = 0;
                        if (r[i].id2) {
                            allOut = allOut + parseInt(r[i].id2);
                            iidd2 = AddComma(r[i].id2);
                        }

                        let iidd3 = 0;
                        if (r[i].id3) {
                            iidd3 = r[i].id3;
                        }

                        let iidd4 = 0;
                        if (r[i].id4) {
                            allOut = allOut + parseInt(r[i].id4);
                            iidd4 = AddComma(r[i].id4);
                        }

                        let iidd5 = 0;
                        if (r[i].id5) {
                            allOut = allOut + parseInt(r[i].id5);
                            iidd5 = AddComma(r[i].id5);
                        }

                        let iidd6 = 0;
                        if (r[i].ve1) {
                            allOut = allOut + parseInt(r[i].ve1);
                            iidd6 = AddComma(r[i].ve1);
                        }

                        let iidd7 = 0;
                        if (r[i].ve2) {
                            allOut = allOut + parseInt(r[i].ve2);
                            iidd7 = AddComma(r[i].ve2);
                        }

                        if (r[i].brand || chM > 0 || r[i].id1) {

                            arrTmpCar.push(r[i].vehicle2);
                            arrTmpAllIn.push(allIn);
                            arrTmpAllOut.push(allOut);
                            arrTmpAll.push(parseInt(allIn) - parseInt(allOut));

                            let cssAll = '';
                            if (parseInt(allIn) - parseInt(allOut) < 0) {
                                cssAll = ' style="color: rgb(207, 47, 17);"';
                            }

                            htmls += `
                    <tr>
                        <td class="carTd">` + r[i].vehicle2 +
                                    `</td>
                        <td class="inTd">` + sss +
                                    `</td>
                        <td class="inTd">` + r[i].regd +
                                    `</td>
                        <td class="inTd">` + iii1 +
                                    `</td>
                        <td class="inTd">` + r[i].insud +
                                    `</td>
                        <td class="inTd">` + iii2 +
                                    `</td>
                        <td class="inTd">` + r[i].jukd +
                                    `</td>
                        <td class="inTd">` + iii3 +
                                    `</td>
                        <td class="outTd">` + iidd1 +
                                    `</td>
                        <td class="outTd">` + iidd2 +
                                    `</td>
                        <td class="outTd">` + iidd4 +
                                    `</td>
                        <td class="outTd">` + iidd5 +
                                    `</td>
                        <td class="outTd">` + iidd6 +
                                    `</td>
                        <td class="outTd">` + iidd7 +
                                    `</td>
                        <td style="text-align: center;" class="gasTd">` +
                                    iidd3 +
                                    `</td>
                        <td class="inTd">` + AddComma(allIn) +
                                    `</td>
                        <td class="outTd">` + AddComma(allOut) +
                                    `</td>
                        <td class="allTd"` + cssAll + `>` +
                                    AddComma(parseInt(allIn) - parseInt(allOut)) +
                                    `</td>
                    </tr>`;

                            sum1 = sum1 + parseInt(String(sss).replaceAll(',', ''));
                            sum2 = sum2 + parseInt(String(iii1).replaceAll(',', ''));
                            sum3 = sum3 + parseInt(String(iii2).replaceAll(',', ''));
                            sum4 = sum4 + parseInt(String(iii3).replaceAll(',', ''));
                            sum5 = sum5 + parseInt(String(iidd1).replaceAll(',', ''));
                            sum6 = sum6 + parseInt(String(iidd2).replaceAll(',', ''));
                            sum7 = sum7 + parseFloat(iidd3);
                            cntGas++;
                            sum8 = sum8 + parseInt(String(iidd4).replaceAll(',', ''));
                            sum9 = sum9 + parseInt(String(iidd5).replaceAll(',', ''));
                            sum10 = sum10 + parseInt(String(iidd6).replaceAll(',', ''));
                            sum11 = sum11 + parseInt(String(iidd7).replaceAll(',', ''));
                            sum12 = sum12 + parseInt(String(allIn).replaceAll(',', ''));
                            sum13 = sum13 + parseInt(String(allOut).replaceAll(',', ''));
                            sum14 = sum14 + parseInt(parseInt(allIn) - parseInt(allOut));

                            sum15 = sum15 + parseInt(r[i].regd);
                            sum16 = sum16 + parseInt(r[i].insud);
                            sum17 = sum17 + parseInt(r[i].jukd);
                        }
                    }

                    const htmlsF = `
                    <tr>
                        <td class="carTd">합 계</td>
                        <td class="inTd">` +
                            AddComma(sum1) +
                            `</td>
                        <td class="inTd">` + AddComma(sum15) +
                            `</td>
                        <td class="inTd">` + AddComma(sum2) +
                            `</td>
                        <td class="inTd">` + AddComma(sum16) +
                            `</td>
                        <td class="inTd">` + AddComma(sum3) +
                            `</td>
                        <td class="inTd">` + AddComma(sum17) +
                            `</td>
                        <td class="inTd">` + AddComma(sum4) +
                            `</td>
                        <td class="outTd">` + AddComma(sum5) +
                            `</td>
                        <td class="outTd">` + AddComma(sum6) +
                            `</td>
                        <td class="outTd">` + AddComma(sum8) +
                            `</td>
                        <td class="outTd">` + AddComma(sum9) +
                            `</td>
                        <td class="outTd">` + AddComma(sum10) +
                            `</td>
                        <td class="outTd">` + AddComma(sum11) +
                            `</td>
                        <td style="text-align: center;" class="gasTd">` +
                            (sum7 / cntGas).toFixed(2) +
                            `</td>
                        <td class="inTd">` + AddComma(sum12) +
                            `</td>
                        <td class="outTd">` + AddComma(sum13) +
                            `</td>
                        <td class="allTd">` + AddComma(sum14) +
                            `</td>
                    </tr>`;

                    $('#tbVeAllCompa').html(htmls);
                    $('#tfVeAllCompa').html(htmlsF);

                    $('#chartVeAllCompaDiv').html(
                        `<canvas id="chartVeAllCompa" height="300"></canvas>`
                    );

                    arrTmp.push(arrTmpCar);
                    arrTmp.push(arrTmpAllIn);
                    arrTmp.push(arrTmpAllOut);
                    arrTmp.push(arrTmpAll);

                    resolve(arrTmp);
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

    function setChart1(result) {
        return new Promise(function (resolve, reject) {
            const data = {
                labels: result[0],
                datasets: [
                    {
                        type: 'bar',
                        label: '총 수익',
                        backgroundColor: 'rgba(68, 114, 196, 1)',
                        borderColor: 'rgb(68, 114, 196)',
                        // barPercentage: 0.5, barThickness: 6, maxBarThickness: 8, minBarLength: 2,
                        data: result[1]
                    }, {
                        type: 'bar',
                        label: '총 비용',
                        backgroundColor: 'rgb(237, 125, 49, 1)',
                        borderColor: 'rgb(237, 125, 49)',
                        // barPercentage: 0.5, barThickness: 6, maxBarThickness: 8, minBarLength: 2,
                        data: result[2]
                    }, {
                        type: 'bar',
                        label: '이익',
                        backgroundColor: 'rgb(112, 173, 71)',
                        borderColor: 'rgb(112, 173, 71)',
                        // barPercentage: 0.5, barThickness: 6, maxBarThickness: 8, minBarLength: 2,
                        data: result[3]
                    }
                ]
            };

            const config = {
                data: data,
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            };

            const myChart = new Chart($('#chartVeAllCompa'), config);
            resolve();
        })
    }
}