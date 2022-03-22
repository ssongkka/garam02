function getEmpMoneyListCompa() {
    LoadingWithMask()
        .then(getEmpOperCnt)
        .then(getEmpOper)
        .then(setEmpRegDays)
        .then(getEmpRegOper)
        .then(getEmpRegOper1)
        .then(getAllMList)
        .then(getEmpInMList)
        .then(getEmpOutMList)
        .then(getEmpBaseM)
        .then(setCheckBox)
        .then(operMSet)
        .then(sumInList)
        .then(sumOutList)
        .then(sumIN)
        .then(sumOut)
        .then(sumAll333)
        .then(closeLoadingWithMask);
}

function getEmpOperListCompa() {
    LoadingWithMask()
        .then(getEmpOperCnt)
        .then(getEmpOper)
        .then(setEmpRegDays)
        .then(getEmpRegOper)
        .then(getEmpRegOper1)
        .then(setCheckBox)
        .then(operMSet)
        .then(sumInList)
        .then(sumOutList)
        .then(sumIN)
        .then(sumOut)
        .then(sumAll333)
        .then(closeLoadingWithMask);
}

function getEmpOperCnt() {
    return new Promise(function (resolve, reject) {

        const arrDay = getStDEnD($('#yearmonthsMoney1').val());

        const url = "/emp/empOperCnt";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };
        const params = {
            "stday": arrDay[0],
            "endday": arrDay[1],
            "operid": $('#emp-iidd').val()
        };
        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            dataType: "json",
            data: JSON.stringify(params),
            success: function (r) {
                const map = new Map();

                for (let i = 0; i < r.length; i++) {
                    map.set(r[i].opernum, r[i].cnt);
                }
                resolve(map);
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    });
}

function getEmpOper(result) {
    return new Promise(function (resolve, reject) {

        const arrDay = getStDEnD($('#yearmonthsMoney1').val());

        const url = "/emp/empOper";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };
        const params = {
            "stday": arrDay[0],
            "endday": arrDay[1],
            "operid": $('#emp-iidd').val()
        };
        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            dataType: "json",
            data: JSON.stringify(params),
            success: function (r) {

                let cnt = 0;
                let check = '';
                let htmls = '';
                if (r.length > 0) {

                    for (let i = 0; i < r.length; i++) {
                        switch (r[i].opertrash) {
                            case 0:
                                if (result.get(r[i].opernum) > 1) {
                                    if (r[i].opertype > 1) {
                                        cnt++;
                                        htmls += '<tr id="mTr-' + i + '" onclick="chTrNot()">';
                                        htmls += '<td><input type="checkbox" class="mCH" id="mCh-' + i + '" onclick="chCh(this.i' +
                                                'd)" checked="checked" disabled="disabled"></td>';
                                        htmls += '<td class="hideTh">' + r[i].opercar + '</td>';
                                        htmls += '<td class="hideTh">' + r[i].opertype + '</td>';
                                        htmls += '<td class="hideTh">' + r[i].opernum + '</td>';
                                        htmls += '<td class="hideTh">' + r[i].operno + '</td>';
                                        htmls += '<td>' + (
                                            cnt
                                        ) + '</td>';
                                        htmls += '<td>' + r[i]
                                            .operday
                                            .split('-')[2] + '일</td>';
                                        htmls += '<td>' + r[i].desty + '</td>';
                                        htmls += '<td class="tdRight">' + AddComma(r[i].atlm) + '</td>';
                                        htmls += '<td>편도</td>';
                                        htmls += '<td>' + r[i].ctmname + '</td>';
                                        if (r[i].operconfirm) {
                                            htmls += '<td>' + r[i].operconfirm + '</td>';
                                        } else {
                                            htmls += '<td></td>';
                                        }
                                        htmls += '</tr>';
                                    } else {
                                        if (r[i].opernum != check) {
                                            cnt++;
                                            htmls += '<tr id="mTr-' + i + '" onclick="chTrNot()">';
                                            htmls += '<td><input type="checkbox" class="mCH" id="mCh-' + i + '" onclick="chCh(this.i' +
                                                    'd)" checked="checked" disabled="disabled"></td>';
                                            htmls += '<td class="hideTh">' + r[i].opercar + '</td>';
                                            htmls += '<td class="hideTh">' + r[i].opertype + '</td>';
                                            htmls += '<td class="hideTh">' + r[i].opernum + '</td>';
                                            htmls += '<td class="hideTh">' + r[i].operno + '</td>';
                                            htmls += '<td>' + (
                                                cnt
                                            ) + '</td>';
                                            htmls += '<td>' + r[i]
                                                .operday
                                                .split('-')[2] + '일</td>';
                                            htmls += '<td>' + r[i].desty + '</td>';
                                            htmls += '<td class="tdRight">' + AddComma(r[i].atlm) + '</td>';
                                            htmls += '<td>' + result.get(r[i].opernum) + '일</td>';
                                            htmls += '<td>' + r[i].ctmname + '</td>';
                                            if (r[i].operconfirm) {
                                                htmls += '<td>' + r[i].operconfirm + '</td>';
                                            } else {
                                                htmls += '<td></td>';
                                            }
                                            htmls += '</tr>';
                                        }
                                    }
                                } else {
                                    if (r[i].opertype > 1) {
                                        cnt++;
                                        htmls += '<tr id="mTr-' + i + '" onclick="chTrNot()">';
                                        htmls += '<td><input type="checkbox" class="mCH" id="mCh-' + i + '" onclick="chCh(this.i' +
                                                'd)" checked="checked" disabled="disabled"></td>';
                                        htmls += '<td class="hideTh">' + r[i].opercar + '</td>';
                                        htmls += '<td class="hideTh">' + r[i].opertype + '</td>';
                                        htmls += '<td class="hideTh">' + r[i].opernum + '</td>';
                                        htmls += '<td class="hideTh">' + r[i].operno + '</td>';
                                        htmls += '<td>' + (
                                            cnt
                                        ) + '</td>';
                                        htmls += '<td>' + r[i]
                                            .operday
                                            .split('-')[2] + '일</td>';
                                        htmls += '<td>' + r[i].desty + '</td>';
                                        htmls += '<td class="tdRight">' + AddComma(r[i].atlm) + '</td>';
                                        htmls += '<td>편도</td>';
                                        htmls += '<td>' + r[i].ctmname + '</td>';
                                        if (r[i].operconfirm) {
                                            htmls += '<td>' + r[i].operconfirm + '</td>';
                                        } else {
                                            htmls += '<td></td>';
                                        }
                                        htmls += '</tr>';
                                    } else {
                                        cnt++;
                                        htmls += '<tr id="mTr-' + i + '" onclick="chTrNot()">';
                                        htmls += '<td><input type="checkbox" class="mCH" id="mCh-' + i + '" onclick="chCh(this.i' +
                                                'd)" checked="checked" disabled="disabled"></td>';
                                        htmls += '<td class="hideTh">' + r[i].opercar + '</td>';
                                        htmls += '<td class="hideTh">' + r[i].opertype + '</td>';
                                        htmls += '<td class="hideTh">' + r[i].opernum + '</td>';
                                        htmls += '<td class="hideTh">' + r[i].operno + '</td>';
                                        htmls += '<td>' + (
                                            cnt
                                        ) + '</td>';
                                        htmls += '<td>' + r[i]
                                            .operday
                                            .split('-')[2] + '일</td>';
                                        htmls += '<td>' + r[i].desty + '</td>';
                                        htmls += '<td class="tdRight">' + AddComma(r[i].atlm) + '</td>';
                                        htmls += '<td>당일</td>';
                                        htmls += '<td>' + r[i].ctmname + '</td>';
                                        if (r[i].operconfirm) {
                                            htmls += '<td>' + r[i].operconfirm + '</td>';
                                        } else {
                                            htmls += '<td></td>';
                                        }
                                        htmls += '</tr>';
                                    }
                                }
                                break;
                            case 1:
                                if (result.get(r[i].opernum) > 1) {
                                    if (r[i].opertype > 1) {
                                        cnt++;
                                        htmls += '<tr id="mTr-' + i + '" onclick="chTr(this.id)">';
                                        htmls += '<td><input type="checkbox" class="mCH" id="mCh-' + i + '" onclick="chCh(this.i' +
                                                'd)"></td>';
                                        htmls += '<td class="hideTh">' + r[i].opercar + '</td>';
                                        htmls += '<td class="hideTh">' + r[i].opertype + '</td>';
                                        htmls += '<td class="hideTh">' + r[i].opernum + '</td>';
                                        htmls += '<td class="hideTh">' + r[i].operno + '</td>';
                                        htmls += '<td>' + (
                                            cnt
                                        ) + '</td>';
                                        htmls += '<td>' + r[i]
                                            .operday
                                            .split('-')[2] + '일</td>';
                                        htmls += '<td>' + r[i].desty + '</td>';
                                        htmls += '<td class="tdRight">' + AddComma(r[i].atlm) + '</td>';
                                        htmls += '<td>편도</td>';
                                        htmls += '<td>' + r[i].ctmname + '</td>';
                                        if (r[i].operconfirm) {
                                            htmls += '<td>' + r[i].operconfirm + '</td>';
                                        } else {
                                            htmls += '<td></td>';
                                        }
                                        htmls += '</tr>';
                                    } else {
                                        if (r[i].opernum != check) {
                                            cnt++;
                                            htmls += '<tr id="mTr-' + i + '" onclick="chTr(this.id)">';
                                            htmls += '<td><input type="checkbox" class="mCH" id="mCh-' + i + '" onclick="chCh(this.i' +
                                                    'd)"></td>';
                                            htmls += '<td class="hideTh">' + r[i].opercar + '</td>';
                                            htmls += '<td class="hideTh">' + r[i].opertype + '</td>';
                                            htmls += '<td class="hideTh">' + r[i].opernum + '</td>';
                                            htmls += '<td class="hideTh">' + r[i].operno + '</td>';
                                            htmls += '<td>' + (
                                                cnt
                                            ) + '</td>';
                                            htmls += '<td>' + r[i]
                                                .operday
                                                .split('-')[2] + '일</td>';
                                            htmls += '<td>' + r[i].desty + '</td>';
                                            htmls += '<td class="tdRight">' + AddComma(r[i].atlm) + '</td>';
                                            htmls += '<td>' + result.get(r[i].opernum) + '일</td>';
                                            htmls += '<td>' + r[i].ctmname + '</td>';
                                            if (r[i].operconfirm) {
                                                htmls += '<td>' + r[i].operconfirm + '</td>';
                                            } else {
                                                htmls += '<td></td>';
                                            }
                                            htmls += '</tr>';
                                        }
                                    }
                                } else {

                                    if (r[i].opertype > 1) {
                                        cnt++;
                                        htmls += '<tr id="mTr-' + i + '" onclick="chTr(this.id)">';
                                        htmls += '<td><input type="checkbox" class="mCH" id="mCh-' + i + '" onclick="chCh(this.i' +
                                                'd)"></td>';
                                        htmls += '<td class="hideTh">' + r[i].opercar + '</td>';
                                        htmls += '<td class="hideTh">' + r[i].opertype + '</td>';
                                        htmls += '<td class="hideTh">' + r[i].opernum + '</td>';
                                        htmls += '<td class="hideTh">' + r[i].operno + '</td>';
                                        htmls += '<td>' + (
                                            cnt
                                        ) + '</td>';
                                        htmls += '<td>' + r[i]
                                            .operday
                                            .split('-')[2] + '일</td>';
                                        htmls += '<td>' + r[i].desty + '</td>';
                                        htmls += '<td class="tdRight">' + AddComma(r[i].atlm) + '</td>';
                                        htmls += '<td>편도</td>';
                                        htmls += '<td>' + r[i].ctmname + '</td>';
                                        if (r[i].operconfirm) {
                                            htmls += '<td>' + r[i].operconfirm + '</td>';
                                        } else {
                                            htmls += '<td></td>';
                                        }
                                        htmls += '</tr>';
                                    } else {
                                        cnt++;
                                        htmls += '<tr id="mTr-' + i + '" onclick="chTr(this.id)">';
                                        htmls += '<td><input type="checkbox" class="mCH" id="mCh-' + i + '" onclick="chCh(this.i' +
                                                'd)"></td>';
                                        htmls += '<td class="hideTh">' + r[i].opercar + '</td>';
                                        htmls += '<td class="hideTh">' + r[i].opertype + '</td>';
                                        htmls += '<td class="hideTh">' + r[i].opernum + '</td>';
                                        htmls += '<td class="hideTh">' + r[i].operno + '</td>';
                                        htmls += '<td>' + (
                                            cnt
                                        ) + '</td>';
                                        htmls += '<td>' + r[i]
                                            .operday
                                            .split('-')[2] + '일</td>';
                                        htmls += '<td>' + r[i].desty + '</td>';
                                        htmls += '<td class="tdRight">' + AddComma(r[i].atlm) + '</td>';
                                        htmls += '<td>당일</td>';
                                        htmls += '<td>' + r[i].ctmname + '</td>';
                                        if (r[i].operconfirm) {
                                            htmls += '<td>' + r[i].operconfirm + '</td>';
                                        } else {
                                            htmls += '<td></td>';
                                        }
                                        htmls += '</tr>';
                                    }
                                }
                                break;
                            case 2:
                                if (result.get(r[i].opernum) > 1) {
                                    if (r[i].opertype > 1) {
                                        cnt++;
                                        htmls += '<tr id="mTr-' + i + '" onclick="chTr(this.id)">';
                                        htmls += '<td><input type="checkbox" class="mCH" id="mCh-' + i + '" onclick="chCh(this.i' +
                                                'd)" checked="checked"></td>';
                                        htmls += '<td class="hideTh">' + r[i].opercar + '</td>';
                                        htmls += '<td class="hideTh">' + r[i].opertype + '</td>';
                                        htmls += '<td class="hideTh">' + r[i].opernum + '</td>';
                                        htmls += '<td class="hideTh">' + r[i].operno + '</td>';
                                        htmls += '<td>' + (
                                            cnt
                                        ) + '</td>';
                                        htmls += '<td>' + r[i]
                                            .operday
                                            .split('-')[2] + '일</td>';
                                        htmls += '<td>' + r[i].desty + '</td>';
                                        htmls += '<td class="tdRight">' + AddComma(r[i].atlm) + '</td>';
                                        htmls += '<td>편도</td>';
                                        htmls += '<td>' + r[i].ctmname + '</td>';
                                        if (r[i].operconfirm) {
                                            htmls += '<td>' + r[i].operconfirm + '</td>';
                                        } else {
                                            htmls += '<td></td>';
                                        }
                                        htmls += '</tr>';
                                    } else {
                                        if (r[i].opernum != check) {
                                            cnt++;
                                            htmls += '<tr id="mTr-' + i + '" onclick="chTr(this.id)">';
                                            htmls += '<td><input type="checkbox" class="mCH" id="mCh-' + i + '" onclick="chCh(this.i' +
                                                    'd)" checked="checked"></td>';
                                            htmls += '<td class="hideTh">' + r[i].opercar + '</td>';
                                            htmls += '<td class="hideTh">' + r[i].opertype + '</td>';
                                            htmls += '<td class="hideTh">' + r[i].opernum + '</td>';
                                            htmls += '<td class="hideTh">' + r[i].operno + '</td>';
                                            htmls += '<td>' + (
                                                cnt
                                            ) + '</td>';
                                            htmls += '<td>' + r[i]
                                                .operday
                                                .split('-')[2] + '일</td>';
                                            htmls += '<td>' + r[i].desty + '</td>';
                                            htmls += '<td class="tdRight">' + AddComma(r[i].atlm) + '</td>';
                                            htmls += '<td>' + result.get(r[i].opernum) + '일</td>';
                                            htmls += '<td>' + r[i].ctmname + '</td>';
                                            if (r[i].operconfirm) {
                                                htmls += '<td>' + r[i].operconfirm + '</td>';
                                            } else {
                                                htmls += '<td></td>';
                                            }
                                            htmls += '</tr>';
                                        }
                                    }
                                } else {

                                    if (r[i].opertype > 1) {
                                        cnt++;
                                        htmls += '<tr id="mTr-' + i + '" onclick="chTr(this.id)">';
                                        htmls += '<td><input type="checkbox" class="mCH" id="mCh-' + i + '" onclick="chCh(this.i' +
                                                'd)" checked="checked"></td>';
                                        htmls += '<td class="hideTh">' + r[i].opercar + '</td>';
                                        htmls += '<td class="hideTh">' + r[i].opertype + '</td>';
                                        htmls += '<td class="hideTh">' + r[i].opernum + '</td>';
                                        htmls += '<td class="hideTh">' + r[i].operno + '</td>';
                                        htmls += '<td>' + (
                                            cnt
                                        ) + '</td>';
                                        htmls += '<td>' + r[i]
                                            .operday
                                            .split('-')[2] + '일</td>';
                                        htmls += '<td>' + r[i].desty + '</td>';
                                        htmls += '<td class="tdRight">' + AddComma(r[i].atlm) + '</td>';
                                        htmls += '<td>편도</td>';
                                        htmls += '<td>' + r[i].ctmname + '</td>';
                                        if (r[i].operconfirm) {
                                            htmls += '<td>' + r[i].operconfirm + '</td>';
                                        } else {
                                            htmls += '<td></td>';
                                        }
                                        htmls += '</tr>';
                                    } else {
                                        cnt++;
                                        htmls += '<tr id="mTr-' + i + '" onclick="chTr(this.id)">';
                                        htmls += '<td><input type="checkbox" class="mCH" id="mCh-' + i + '" onclick="chCh(this.i' +
                                                'd)" checked="checked"></td>';
                                        htmls += '<td class="hideTh">' + r[i].opercar + '</td>';
                                        htmls += '<td class="hideTh">' + r[i].opertype + '</td>';
                                        htmls += '<td class="hideTh">' + r[i].opernum + '</td>';
                                        htmls += '<td class="hideTh">' + r[i].operno + '</td>';
                                        htmls += '<td>' + (
                                            cnt
                                        ) + '</td>';
                                        htmls += '<td>' + r[i]
                                            .operday
                                            .split('-')[2] + '일</td>';
                                        htmls += '<td>' + r[i].desty + '</td>';
                                        htmls += '<td class="tdRight">' + AddComma(r[i].atlm) + '</td>';
                                        htmls += '<td>당일</td>';
                                        htmls += '<td>' + r[i].ctmname + '</td>';
                                        if (r[i].operconfirm) {
                                            htmls += '<td>' + r[i].operconfirm + '</td>';
                                        } else {
                                            htmls += '<td></td>';
                                        }
                                        htmls += '</tr>';
                                    }
                                }
                                break;
                        }
                        check = r[i].opernum;
                    }
                } else {
                    htmls = `<tr><td colspan="12">운행정보없음</td></tr>`;
                }
                $('#emp-oper-money-tb').html(htmls);
                $('#bgoper1').text(cnt);
                checkChAll();
                resolve();
            }
        })
    });
}

function getEmpRegOper(result) {
    return new Promise(function (resolve, reject) {

        const arrDay = getStDEnD($('#yearmonthsMoney1').val());

        const url = "/emp/empRegOper";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };
        const params = {
            "regoperid": $('#emp-iidd').val(),
            "regstartd": arrDay[0],
            "regendd": arrDay[1]
        };
        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            dataType: "json",
            data: JSON.stringify(params),
            success: function (r) {
                let goodArr = new Array();
                for (let i = 0; i < r.length; i++) {
                    let tmpArr = new Array();
                    tmpArr.push(r[i].conum);
                    tmpArr.push(r[i].codenum);
                    goodArr.push(getEmpRegOperCour(tmpArr));
                }
                resolve(goodArr);
            }
        })
    })
}
function getEmpRegOper1(result) {
    return new Promise(function (resolve, reject) {
        console.log(result);
        const arrDay = getStDEnD($('#yearmonthsMoney1').val());

        const url = "/emp/empRegOper2";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };
        const params = {
            "regoperid": $('#emp-iidd').val(),
            "regstartd": arrDay[0],
            "regendd": arrDay[1]
        };
        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            dataType: "json",
            data: JSON.stringify(params),
            success: function (r) {
                let htmlRegOper = '';
                if (r.length > 0) {

                    let arrTmpConum = new Array();
                    for (let i = 0; i < r.length; i++) {
                        arrTmpConum.push(r[i].conum);
                    }

                    const uniqueConum = [...new Set(arrTmpConum)];

                    for (let k = 0; k < uniqueConum.length; k++) {

                        let coNa = '';
                        let coAdd = '';
                        let coNosun = '';
                        for (let i = 0; i < r.length; i++) {
                            if (uniqueConum[k] == r[i].conum) {
                                coNa = r[i].regcompany;
                                coAdd = r[i].regaddress;

                                break;
                            }
                        }
                        for (let l = 0; l < result.length; l++) {
                            for (let p = 0; p < r.length; p++) {
                                if (r[p].codenum == result[l][0][1]) {
                                    coNosun = r[p].rdname;
                                }
                            }
                            let tmpThHtml = `<tr><td class="trRegEmp" colspan="32" style="
                            text-align: left;
                        "><span>` +
                                    coNa + `</span><span>` + coNosun + `</span></td></tr>`;
                            let tmpTdHtml = '';
                            for (let l2 = 0; l2 < result[l].length; l2++) {
                                if (uniqueConum[k] == result[l][l2][0]) {
                                    tmpTdHtml += `<tr>`;
                                    tmpTdHtml += `<td>`;

                                    switch (result[l][l2][3]) {
                                        case 1:
                                            tmpTdHtml += `출근`;
                                            break;
                                        case 2:
                                            tmpTdHtml += `퇴근`;
                                            break;
                                    }
                                    tmpTdHtml += `</td>`;

                                    const aaa = $('#thDays').children()[2];
                                    const aaa1 = $(aaa).children();

                                    for (let i2 = 0; i2 < 31; i2++) {
                                        let car = '';
                                        const dday = $(aaa1[i2]).text();
                                        for (let i = 0; i < r.length; i++) {
                                            if (dday == r[i].regoperday && result[l][l2][0] == r[i].conum && result[l][l2][1] == r[i].codenum && result[l][l2][2] == r[i].regoperno) {
                                                car = (r[i].idvehicle).substring((r[i].idvehicle).length - 4);
                                            }
                                        }
                                        tmpTdHtml += `<td>`;
                                        tmpTdHtml += car;
                                        tmpTdHtml += `</td>`;
                                    }
                                    tmpTdHtml += `</tr>`;
                                } else {
                                    tmpThHtml = ``;
                                }
                            }
                            htmlRegOper += tmpThHtml + tmpTdHtml;
                        }
                    }
                } else {
                    htmlRegOper = `
                    <tr>
                        <td colspan="32">
                        정기운행 정보없음
                        </td>
                    </tr>`;
                }
                $('#tbAllo').html(htmlRegOper);
                resolve();
            }
        })
    })
}
function getEmpRegOperCour(arrTmp) {
    const url = "/emp/empRegOper1";
    const headers = {
        "Content-Type": "application/json",
        "X-HTTP-Method-Override": "POST"
    };
    const params = {
        "conum": arrTmp[0],
        "codenum": arrTmp[1]
    };
    let tmpArr = new Array();
    $.ajax({
        url: url,
        type: "POST",
        headers: headers,
        dataType: "json",
        data: JSON.stringify(params),
        async: false,
        success: function (r) {
            for (let i = 0; i < r.length; i++) {
                let ttmmppArr = new Array();
                ttmmppArr.push(r[i].conum);
                ttmmppArr.push(r[i].codenum);
                ttmmppArr.push(r[i].goutnum);
                ttmmppArr.push(r[i].rcsepa);

                tmpArr.push(ttmmppArr);
            }
        }
    })
    return tmpArr;
}

function getAllMList(result) {
    return new Promise(function (resolve, reject) {
        const url = "/emp/empAllMList";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };
        const params = {
            "id": $('#emp-iidd').val(),
            "date": $('#yearmonthsMoney2').val()
        };
        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            dataType: "json",
            data: JSON.stringify(params),
            success: function (r) {
                if (r.length > 0) {
                    $('#operO').val(r[0].per * 100);
                    $('#emp-sal').val(1);
                    resolve();
                } else {
                    $('#operO').val(opt[0].oper * 100);
                    $('#emp-sal').val(0);
                    resolve();
                }
            }
        })
    })
}
function getEmpInMList(result) {
    return new Promise(function (resolve, reject) {
        $('#emp-in-money-tb')
            .children()
            .remove();

        const url = "/emp/empInMList";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };
        const params = {
            "id": $('#emp-iidd').val(),
            "sday": $('#yearmonthsMoney2').val()
        };
        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            dataType: "json",
            data: JSON.stringify(params),
            success: function (r) {
                if (r.length > 0) {
                    let httmlll = '';
                    let cnt = 0;
                    for (let i = 0; i < r.length; i++) {
                        if (r[i].separation == '기본급') {
                            $('#in-baseM').val(AddComma(r[i].money));
                            switch (r[i].strash) {
                                case 0:
                                    $("#in-baseM").attr("disabled", true);
                                    break;
                                case 1:
                                    $("#in-baseM").removeAttr("disabled");
                                    break;
                            }
                        } else {
                            let ddd = '';
                            if ((r[i].date).split('-')[2].substring('0', '1') == '0') {
                                ddd = (r[i].date)
                                    .split('-')[2]
                                    .substring('1');
                            } else {
                                ddd = (r[i].date).split('-')[2];
                            }
                            httmlll += '<tr>';
                            httmlll += '<td class="hideTh"></td>';
                            httmlll += '<td class="hideTh"></td>';
                            httmlll += '<td class="hideTh"></td>';
                            httmlll += '<td class="hideTh"></td>';
                            httmlll += '<td>' + (
                                ++cnt
                            ) + '</td>';
                            httmlll += '<td>' + ddd + '일</td>';
                            httmlll += '<td>' + r[i].separation + '</td>';
                            httmlll += '<td>' + r[i].contents + '</td>';
                            httmlll += '<td class="tdRight">' + AddComma(r[i].money) + '</td>';

                            switch (r[i].strash) {
                                case 0:
                                    httmlll += '<td>';
                                    httmlll += '</td>';
                                    httmlll += '</tr>';
                                    break;
                                case 1:
                                    httmlll += '<td class="cuor-p" onclick="delTb(this)">';
                                    httmlll += '<i class="fas fa-minus-square"></i>';
                                    httmlll += '</td>';
                                    httmlll += '</tr>';
                                    break;
                            }
                        }
                    }
                    $('#emp-in-money-tb').append(httmlll);
                    resolve(1);
                } else {
                    resolve(0);
                }
            }
        })
    })
}
function getEmpOutMList(result) {
    return new Promise(function (resolve, reject) {
        $('#emp-out-money-tb')
            .children()
            .remove();

        const url = "/emp/empOutMList";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };
        const params = {
            "id": $('#emp-iidd').val(),
            "sday": $('#yearmonthsMoney2').val()
        };

        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            dataType: "json",
            data: JSON.stringify(params),
            success: function (r) {
                if (r.length > 0) {
                    let httmll = '';
                    let cnt = 0;
                    for (let i = 0; i < r.length; i++) {
                        let ddd = '';
                        if ((r[i].date).split('-')[2].substring('0', '1') == '0') {
                            ddd = (r[i].date)
                                .split('-')[2]
                                .substring('1');
                        } else {
                            ddd = (r[i].date).split('-')[2];
                        }

                        httmll += '<tr>';
                        httmll += '<td class="hideTh"></td>';
                        httmll += '<td class="hideTh"></td>';
                        httmll += '<td class="hideTh"></td>';
                        httmll += '<td class="hideTh"></td>';
                        httmll += '<td>' + (
                            ++cnt
                        ) + '</td>';
                        httmll += '<td>' + ddd + '일</td>';
                        httmll += '<td>' + r[i].separation + '</td>';
                        httmll += '<td>' + r[i].contents + '</td>';

                        switch (r[i].contents) {
                            case '국민연금':
                                httmll += '<td><input type="text" class="moneyinput" data-type="currency" id="kukmM" onfo' +
                                        'cus="this.select()" value="' + AddComma(r[i].money) + '"></td>';
                                httmll += '<td>';
                                httmll += '</td>';
                                httmll += '</tr>';
                                break;
                            case '건강보험':
                                httmll += '<td><input type="text" class="moneyinput" data-type="currency" id="gunmM" onfo' +
                                        'cus="this.select()" value="' + AddComma(r[i].money) + '"></td>';
                                httmll += '<td>';
                                httmll += '</td>';
                                httmll += '</tr>';
                                break;
                            case '고용보험':
                                httmll += '<td><input type="text" class="moneyinput" data-type="currency" id="gomM" onfoc' +
                                        'us="this.select()" value="' + AddComma(r[i].money) + '"></td>';
                                httmll += '<td>';
                                httmll += '</td>';
                                httmll += '</tr>';
                                break;
                            case '산재보험':
                                httmll += '<td><input type="text" class="moneyinput" data-type="currency" id="sanmM" onfo' +
                                        'cus="this.select()" value="' + AddComma(r[i].money) + '"></td>';
                                httmll += '<td>';
                                httmll += '</td>';
                                httmll += '</tr>';
                                break;
                            default:
                                httmll += '<td class="tdRight">' + AddComma(r[i].money) + '</td>';
                                switch (r[i].strash) {
                                    case 0:
                                        httmll += '<td>';
                                        httmll += '</td>';
                                        httmll += '</tr>';
                                        break;
                                    case 1:
                                        httmll += '<td class="cuor-p" onclick="delTb(this)">';
                                        httmll += '<i class="fas fa-minus-square"></i>';
                                        httmll += '</td>';
                                        httmll += '</tr>';
                                        break;
                                }
                                break;
                        }
                    }
                    $('#emp-out-money-tb').append(httmll);
                    $("input[data-type='currency']").bind('keyup keydown', function () {
                        inputNumberFormat(this);
                    });
                    let rtn1 = [result, 1]
                    resolve(rtn1);
                } else {
                    let rtn2 = [result, 0]
                    resolve(rtn2);
                }
            }
        })
    })
}
function getEmpBaseM(result) {
    return new Promise(function (resolve, reject) {

        const url = "/emp/empBaseMoney";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };
        const params = {
            "id": $('#emp-iidd').val()
        };

        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            dataType: "json",
            data: JSON.stringify(params),
            success: function (r) {

                if (parseInt(result[0]) < 1) {
                    if (r[0].basem) {
                        $('#in-baseM').val(AddComma(r[0].basem));
                    } else {
                        $('#in-baseM').val(0);
                    }
                }

                if (parseInt(result[1]) < 1) {
                    let htmls = '';
                    htmls += '<tr>';
                    htmls += ' <td class="hideTh"></td>';
                    htmls += ' <td class="hideTh"></td>';
                    htmls += ' <td class="hideTh"></td>';
                    htmls += ' <td class="hideTh"></td>';
                    htmls += '<td>1</td>';
                    htmls += '<td>1일</td>';
                    htmls += '<td>보험료</td>';
                    htmls += '<td>국민연금</td>';
                    htmls += '<td><input type="text" class="moneyinput" data-type="currency" id="kukmM" onfo' +
                            'cus="this.select()" value="' + AddComma(r[0].kukm) + '"></td>';
                    htmls += '<td></td>';
                    htmls += '</tr>';
                    htmls += '<tr>';
                    htmls += ' <td class="hideTh"></td>';
                    htmls += ' <td class="hideTh"></td>';
                    htmls += ' <td class="hideTh"></td>';
                    htmls += ' <td class="hideTh"></td>';
                    htmls += '<td>2</td>';
                    htmls += '<td>1일</td>';
                    htmls += '<td>보험료</td>';
                    htmls += '<td>건강보험</td>';
                    htmls += '<td><input type="text" class="moneyinput" data-type="currency" id="gunmM" onfo' +
                            'cus="this.select()" value="' + AddComma(r[0].gunm) + '"></td>';
                    htmls += '<td></td>';
                    htmls += '</tr>';
                    htmls += '<tr>';
                    htmls += ' <td class="hideTh"></td>';
                    htmls += ' <td class="hideTh"></td>';
                    htmls += ' <td class="hideTh"></td>';
                    htmls += ' <td class="hideTh"></td>';
                    htmls += '<td>3</td>';
                    htmls += '<td>1일</td>';
                    htmls += '<td>보험료</td>';
                    htmls += '<td>고용보험</td>';
                    htmls += '<td><input type="text" class="moneyinput" data-type="currency" id="gomM" onfoc' +
                            'us="this.select()" value="' + AddComma(r[0].gom) + '"></td>';
                    htmls += '<td></td>';
                    htmls += '</tr>';
                    htmls += '<tr>';
                    htmls += ' <td class="hideTh"></td>';
                    htmls += ' <td class="hideTh"></td>';
                    htmls += ' <td class="hideTh"></td>';
                    htmls += ' <td class="hideTh"></td>';
                    htmls += '<td>4</td>';
                    htmls += '<td>1일</td>';
                    htmls += '<td>보험료</td>';
                    htmls += '<td>산재보험</td>';
                    htmls += '<td><input type="text" class="moneyinput" data-type="currency" id="sanmM" onfo' +
                            'cus="this.select()" value="' + AddComma(r[0].sanm) + '"></td>';
                    htmls += '<td></td>';
                    htmls += '</tr>';
                    $('#emp-out-money-tb').append(htmls);
                    $("input[data-type='currency']").bind('keyup keydown', function () {
                        inputNumberFormat(this);
                    });
                }
                resolve();
            }
        })
    })
}
function setCheckBox(result) {
    return new Promise(function (resolve, reject) {
        const aaaa = $('#mCh-All')
            .parent()
            .parent()
            .parent()
            .next()
            .children();

        if ($('#emp-sal').val() > 0) {
            $('#mCh-All').attr("disabled", true);
            for (let i = 0; i < aaaa.length; i++) {
                const bbbb = $(aaaa[i]);
                const cccc = $(bbbb.children().children());
                $(bbbb).attr('onclick', 'chTrNot()');
                $(cccc).attr("disabled", true);
            }
            unclkName();
        } else {
            $('#mCh-All').attr("disabled", false);
            clkName();
        }
        resolve();
    })
}
function sumAll222(result) {
    return new Promise(function (resolve, reject) {
        sumAllpro();
    })
}