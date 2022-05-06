$(document).ready(function () {
    $('#appGiDate').val(toStringByFormatting(new Date()));
    $('#appGiDate').attr('max', toStringByFormatting(new Date()));

    $('#appGiLineN1').attr('disabled', true);
    $('#appGiLineN2').attr('disabled', true);
    $('#appGiLineN3').attr('disabled', true);
    $('#appGiLineN4').attr('disabled', true);

    $('#appGiLineC1').attr('disabled', true);
    $('#appGiLineC2').attr('disabled', true);
    $('#appGiLineC3').attr('disabled', true);
    $('#appGiLineC4').attr('disabled', true);

    $('#appGiHelp').attr('disabled', true);
    $('#appGiCham').attr('disabled', true);
});

$(document).on('change', '#appGiPaper', function () {
    getGiPaper();
});
$(document).on('change', '#appGiDate', function () {
    if ($('#appGiPaper').val()) {
        LoadingWithMask()
            .then(setApprTitle)
            .then(closeLoadingWithMask);
    }
});

function getGiPaper() {

    LoadingWithMask()
        .then(getPaperLine)
        .then(getPaperHelp)
        .then(setApprTitle)
    if ($('#appGiPaper').val()) {
        getUpEmp()
            .then(getUpVe)
            .then(getUpAcc)
            .then(getUpSal)
            .then(getUpRsvtMoney)
            .then(getUpRsvt)
            .then(getUpInsu)
            .then(getUpInsuSepa)
            .then(getUpInsuLoan)
            .then(getUpInsuLoanSepa)
            .then(getUpInsuInspec)
            .then(getUpInsuMaint)
            .then(closeLoadingWithMask);
    } else {
        $('.apprUp').hide();
        closeLoadingWithMask();
    }

    function getPaperLine() {
        return new Promise(function (resolve, reject) {
            const url = "/appr/paperline";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "approvalpapername": $('#appGiPaper').val()
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {

                    $('#appGiLineC1').attr('disabled', true);
                    $('#appGiLineC2').attr('disabled', true);
                    $('#appGiLineC3').attr('disabled', true);
                    $('#appGiLineC4').attr('disabled', true);

                    $('#appGiLineP1').text('');
                    $('#appGiLineN1').val('');

                    $('#appGiLineP2').text('');
                    $('#appGiLineN2').val('');

                    $('#appGiLineP3').text('');
                    $('#appGiLineN3').val('');

                    $('#appGiLineP4').text('');
                    $('#appGiLineN4').val('');

                    for (let i = 0; i < r.length; i++) {
                        switch (parseInt(r[i].approvalpaperlineorder)) {
                            case 1:
                                $('#appGiLineP1').text(r[i].position);
                                $('#appGiLineN1').val(r[i].id);

                                // $('#appGiLineN1').attr('disabled', false);
                                $('#appGiLineC1').attr('disabled', false);
                                break;
                            case 2:
                                $('#appGiLineP2').text(r[i].position);
                                $('#appGiLineN2').val(r[i].id);

                                // $('#appGiLineN2').attr('disabled', false);
                                $('#appGiLineC2').attr('disabled', false);
                                break;
                            case 3:
                                $('#appGiLineP3').text(r[i].position);
                                $('#appGiLineN3').val(r[i].id);

                                // $('#appGiLineN3').attr('disabled', false);
                                $('#appGiLineC3').attr('disabled', false);
                                break;
                            case 4:
                                $('#appGiLineP4').text(r[i].position);
                                $('#appGiLineN4').val(r[i].id);

                                // $('#appGiLineN4').attr('disabled', false);
                                $('#appGiLineC4').attr('disabled', false);
                                break;
                        }
                    }
                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }
    function getPaperHelp() {
        return new Promise(function (resolve, reject) {
            const url = "/appr/paperhelp";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "approvalpapername": $('#appGiPaper').val()
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

                    for (let i = 0; i < r.length; i++) {

                        if (dbuser.id != r[i].id) {
                            htmls += `
                        <div class="clHelpCham-item">
                            <div>` +
                                    r[i].position + ' ' + r[i].name +
                                    `</div>
                            <div>
                            </div>
                        </div>`
                            // htmls += ` <div class="clHelpCham-item">     <div>` +
                            // r[i].approvalpaperhelpposition + ' ' + r[i].approvalpaperhelpname + `</div>
                            // <div>         <a disalbe>             <i class="fa-solid fa-xmark"></i> </a>
                            // </div> </div>`
                        }
                    }

                    $('#spHelp').html(htmls);

                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }
    function getUpEmp() {
        return new Promise(function (resolve, reject) {
            const url = "/appr/paperupemp";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "company": dbuser.company
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {
                    if (r.length > 0) {
                        $('#apprUpEmp').show();

                        let htmls = ``;
                        for (let i = 0; i < r.length; i++) {

                            let veveve = '';
                            if (r[i].vehicle) {
                                veveve = r[i]
                                    .vehicle
                                    .substring(r[i].vehicle.length - 4);
                            }
                            htmls += `
                        <tr>
                            <td>
                            <input type="checkbox" name="apprUpEmpN">
                            <input type="hidden" value="` +
                                    r[i].id +
                                    `">
                            </td>
                            <td>` + (
                                i + 1
                            ) +
                                    `</td>
                            <td>` + r[i].name +
                                    `</td>
                            <td>` + veveve +
                                    `</td>
                            <td>` + r[i].birthday +
                                    `</td>
                            <td>` + r[i].age +
                                    `</td>
                            <td>` + r[i].joind +
                                    `</td>
                            <td>` + r[i].company +
                                    `</td>
                        </tr>`;
                        }
                        $('#apprUpEmpTB').html(htmls);

                    } else {
                        $('#apprUpEmpTB').html(``);
                        $('#apprUpEmp').hide();
                    }
                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

    function getUpVe() {
        return new Promise(function (resolve, reject) {
            const url = "/appr/paperupve";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "company": dbuser.company
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {
                    if (r.length > 0) {
                        $('#apprUpVe').show();

                        let htmls = ``;
                        for (let i = 0; i < r.length; i++) {

                            let nameee = '';
                            if (r[i].name) {
                                nameee = r[i].name;
                            }

                            htmls += `
                        <tr>
                            <td>
                            <input type="checkbox" name="apprUpVeN">
                            <input type="hidden" value="` +
                                    r[i].carnumber +
                                    `">
                            </td>
                            <td>` + (
                                i + 1
                            ) +
                                    `</td>
                            <td>` + r[i]
                                .vehicle
                                .substring(r[i].vehicle.length - 4) +
                                            `</td>
                            <td>` + nameee +
                                            `</td>
                            <td>` + r[i]
                                .inspecplace +
                                            `</td>
                            <td>` + r[i]
                                .brand +
                                            `</td>
                            <td>` + r[i]
                                .grade +
                                            `</td>
                            <td>` + r[i]
                                .num +
                                            `명</td>
                            <td>` + r[i]
                                .regist +
                                        `</td>
                        </tr>`;

                        }
                        $('#apprUpVeTB').html(htmls);

                    } else {
                        $('#apprUpVeTB').html(``);
                        $('#apprUpVe').hide();
                    }
                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

    function getUpAcc() {
        return new Promise(function (resolve, reject) {
            const url = "/appr/paperupacc";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "company": dbuser.company
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {
                    $('#apprUpAcc').show();

                    if (r.length > 0) {
                        let htmls = ``;
                        for (let i = 0; i < r.length; i++) {

                            let nameee = '';
                            if (r[i].name) {
                                nameee = r[i].name;
                            }

                            htmls += `
                        <tr>
                            <td>
                            <input type="checkbox" name="apprUpAccN">
                            <input type="hidden" value="` +
                                    r[i].veaccseq +
                                    `">
                            <input type="hidden" value="` + r[i].veacccont +
                                    `">
                            </td>
                            <td>` + (
                                i + 1
                            ) +
                                    `</td>
                            <td>` + r[i]
                                .vehicle
                                .substring(r[i].vehicle.length - 4) +
                                            `</td>
                            <td>` + nameee +
                                            `</td>
                            <td>` + r[i]
                                .veaccdate + ' ' + r[i]
                                .veacctime +
                                        `</td>
                        </tr>`;
                        }

                        $('#apprUpAccTB').html(htmls);

                    } else {
                        $('#apprUpAccTB').html(``);
                        $('#apprUpAcc').hide();
                    }
                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

    function getUpSal() {
        return new Promise(function (resolve, reject) {
            const url = "/appr/paperupsal";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "company": dbuser.company
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {
                    if (r.length > 0) {
                        $('#apprUpSal').show();

                        let htmls = ``;
                        for (let i = 0; i < r.length; i++) {

                            let nameee = '';
                            if (r[i].name) {
                                nameee = r[i].name;
                            }

                            htmls += `
                        <tr>
                            <td>
                            <input type="checkbox" name="apprUpSalN">
                            <input type="hidden" value="` +
                                    r[i].salno +
                                    `">
                            </td>
                            <td>` + (
                                i + 1
                            ) +
                                    `</td>
                            <td>` + r[i].date +
                                    `</td>
                            <td>` + nameee +
                                    `</td>
                            <td>` + r[i]
                                .vehicle
                                .substring(r[i].vehicle.length - 4) +
                                        `</td>
                            <td>` + AddComma(
                                parseInt(r[i].inm) - parseInt(r[i].outm)
                            ) +
                                    `</td>
                            <td>` + AddComma(parseInt(r[i].inm)) +
                                    `</td>
                            <td>` + AddComma(parseInt(r[i].outm)) +
                                    `</td>
                        </tr>`;
                        }

                        $('#apprUpSalTB').html(htmls);
                    } else {
                        $('#apprUpSalTB').html(``);
                        $('#apprUpSal').hide();
                    }
                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

    function getUpRsvtMoney() {
        return new Promise(function (resolve, reject) {
            const url = "/appr/paperuprsvtmoney";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "opercar": dbuser.id
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {
                    if (r.length > 0) {
                        $('#apprUpRsvtMoney').show();

                        let htmls = ``;
                        for (let i = 0; i < r.length; i++) {

                            let nameee = '';
                            if (r[i].name) {
                                nameee = r[i].name;
                            }

                            htmls += `
                        <tr>
                            <td>
                            <input type="checkbox" name="apprUpRsvtMoneyN">
                            <input type="hidden" value="` +
                                    r[i].operno +
                                    `">
                            </td>
                            <td>` + (
                                i + 1
                            ) +
                                    `</td>
                            <td>` + r[i].opermemo +
                                    `</td>
                            <td>` + r[i].stday +
                                    `</td>
                            <td class="tdRight">` + AddComma(r[i].atlm) +
                                    `</td>
                            <td class="tdLeft">` + r[i].opercom +
                                    `</td>
                            <td>` + r[i].cont +
                                    `</td>
                            <td class="tdRight">` + AddComma(
                                parseInt(r[i].conm)
                            ) +
                                    `</td>
                            <td class="tdRight">` + AddComma(
                                parseInt(r[i].opertype)
                            ) + `</td>
                        </tr>`;
                        }

                        $('#apprUpRsvtMoneyTB').html(htmls);
                    } else {
                        $('#apprUpRsvtMoneyTB').html(``);
                        $('#apprUpRsvtMoney').hide();
                    }
                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

    function getUpRsvt() {
        return new Promise(function (resolve, reject) {
            const url = "/appr/paperuprsvt";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "opercar": dbuser.id
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {
                    if (r.length > 0) {
                        $('#apprUpRsvt').show();

                        let htmls = ``;
                        for (let i = 0; i < r.length; i++) {

                            let bakk = '';
                            if (betweenDateNum(r[i].stday, r[i].endday) > 1) {
                                bakk
                            }

                            htmls += `
                        <tr>
                            <td>
                            <input type="checkbox" name="apprUpRsvtN">
                            <input type="hidden" value="` +
                                    r[i].rsvt +
                                    `">
                            </td>
                            <td>` + (
                                i + 1
                            ) +
                                    `</td>
                            <td>` + r[i].opermemo +
                                    `</td>
                            <td>` + r[i].stday +
                                    `</td>
                            <td>` + betweenDateNum(
                                r[i].stday,
                                r[i].endday
                            ) +
                                    `일</td>
                            <td class="tdLeft">` + r[i].desty +
                                    `</td>
                            <td>` + r[i].bus +
                                    `</td>
                            <td>` + r[i].num +
                                    `</td>
                            <td>` + r[i].cont +
                                    `</td>
                            <td class="tdRight">` + AddComma(
                                parseInt(r[i].conm)
                            ) + `</td>
                        </tr>`;
                        }

                        $('#apprUpRsvtTB').html(htmls);
                    } else {
                        $('#apprUpRsvtTB').html(``);
                        $('#apprUpRsvt').hide();
                    }
                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

    function getUpInsu() {
        return new Promise(function (resolve, reject) {
            const url = "/appr/paperupinsu";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "company": dbuser.company
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {
                    if (r.length > 0) {
                        $('#apprUpInsu').show();

                        let htmls = ``;
                        for (let i = 0; i < r.length; i++) {

                            let nameee = '';
                            if (r[i].name) {
                                nameee = r[i].name;
                            }

                            htmls += `
                        <tr>
                            <td>
                            <input type="checkbox" name="apprUpInsuN">
                            <input type="hidden" value="` +
                                    r[i].insuno +
                                    `">
                            </td>
                            <td>` + (
                                i + 1
                            ) +
                                    `</td>
                            <td>` + r[i]
                                .vehicle
                                .substring(r[i].vehicle.length - 4) +
                                            `</td>
                            <td>` + r[i]
                                .insudatestart +
                                            `</td>
                            <td>` + r[i]
                                .insudateend +
                                            `</td>
                            <td>` + r[i]
                                .insutime +
                                        `회</td>
                            <td class="tdRight">` + AddComma(
                                r[i].insumoney
                            ) + `</td>
                        </tr>`;
                        }

                        $('#apprUpInsuTB').html(htmls);
                    } else {
                        $('#apprUpInsuTB').html(``);
                        $('#apprUpInsu').hide();
                    }
                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

    function getUpInsuSepa() {
        return new Promise(function (resolve, reject) {
            const url = "/appr/paperupinsusepa";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "company": dbuser.company
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {
                    if (r.length > 0) {
                        $('#apprUpInsuSepa').show();

                        let htmls = ``;
                        for (let i = 0; i < r.length; i++) {

                            let nameee = '';
                            if (r[i].name) {
                                nameee = r[i].name;
                            }

                            htmls += `
                        <tr>
                            <td>
                            <input type="checkbox" name="apprUpInsuSepaN">
                            <input type="hidden" value="` +
                                    r[i].insusepano +
                                    `">
                            </td>
                            <td>` + (
                                i + 1
                            ) +
                                    `</td>
                            <td>` + r[i]
                                .vehicle
                                .substring(r[i].vehicle.length - 4) +
                                            `</td>
                            <td>` + r[i]
                                .insusepaday +
                                            `</td>
                            <td>` + r[i]
                                .insusepapayment +
                                            `</td>
                            <td>` + r[i]
                                .insusepatime + ' / ' + r[i]
                                .insutime +
                                        `회</td>
                            <td class="tdRight">` + AddComma(
                                r[i].insusepamoney
                            ) + `</td>
                        </tr>`;
                        }

                        $('#apprUpInsuSepaTB').html(htmls);
                    } else {
                        $('#apprUpInsuSepaTB').html(``);
                        $('#apprUpInsuSepa').hide();
                    }
                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

    function getUpInsuLoan() {
        return new Promise(function (resolve, reject) {
            const url = "/appr/paperuploan";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "company": dbuser.company
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {
                    if (r.length > 0) {
                        $('#apprUpLoan').show();

                        let htmls = ``;
                        for (let i = 0; i < r.length; i++) {

                            let nameee = '';
                            if (r[i].name) {
                                nameee = r[i].name;
                            }

                            htmls += `
                        <tr>
                            <td>
                            <input type="checkbox" name="apprUpLoanN">
                            <input type="hidden" value="` +
                                    r[i].loanno +
                                    `">
                            </td>
                            <td>` + (
                                i + 1
                            ) +
                                    `</td>
                            <td>` + r[i]
                                .vehicle
                                .substring(r[i].vehicle.length - 4) +
                                            `</td>
                            <td>` + r[i]
                                .loanbank +
                                            `</td>
                            <td class="tdRight">` + AddComma(r[i].loan) +
                                            `</td>
                            <td class="tdRight">` + AddComma(
                                    r[i].loanmonth
                                ) +
                                        `</td>
                            <td>` + r[i]
                                .loandatestart +
                                            `</td>
                            <td>` + r[i]
                                .loandateend +
                                            `</td>
                            <td>` + r[i]
                                .loanperiod +
                                            `개월</td>
                            <td>` + r[i]
                                .loandayloan +
                                        `일</td>
                        </tr>`;
                        }

                        $('#apprUpLoanTB').html(htmls);
                    } else {
                        $('#apprUpLoanTB').html(``);
                        $('#apprUpLoan').hide();
                    }
                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

    function getUpInsuLoanSepa() {
        return new Promise(function (resolve, reject) {
            const url = "/appr/paperuploansepa";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "company": dbuser.company
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {
                    if (r.length > 0) {
                        $('#apprUpLoanSepa').show();

                        let htmls = ``;
                        for (let i = 0; i < r.length; i++) {

                            let nameee = '';
                            if (r[i].name) {
                                nameee = r[i].name;
                            }

                            htmls += `
                        <tr>
                            <td>
                            <input type="checkbox" name="apprUpLoanSepaN">
                            <input type="hidden" value="` +
                                    r[i].loansepano +
                                    `">
                            </td>
                            <td>` + (
                                i + 1
                            ) +
                                    `</td>
                            <td>` + r[i]
                                .vehicle
                                .substring(r[i].vehicle.length - 4) +
                                            `</td>
                            <td>` + r[i]
                                .loansepamonth +
                                            `</td>
                            <td>` + r[i]
                                .loansepaday +
                                            `</td>
                            <td>` + r[i]
                                .loansepatime +
                                        `회</td>
                            <td class="tdRight">` + AddComma(
                                r[i].loansepamoney
                            ) +
                                    `</td>
                            <td class="tdRight">` + AddComma(
                                r[i].veaccmoney
                            ) +
                                    `</td>
                            <td class="tdRight">` + AddComma(
                                r[i].veacctrash
                            ) + `</td>
                        </tr>`;
                        }

                        $('#apprUpLoanSepaTB').html(htmls);
                    } else {
                        $('#apprUpLoanSepaTB').html(``);
                        $('#apprUpLoanSepa').hide();
                    }
                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

    function getUpInsuInspec() {
        return new Promise(function (resolve, reject) {
            const url = "/appr/paperupinspec";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "company": dbuser.company
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {
                    if (r.length > 0) {
                        $('#apprUpInspec').show();

                        let htmls = ``;
                        for (let i = 0; i < r.length; i++) {

                            let nameee = '';
                            if (r[i].name) {
                                nameee = r[i].name;
                            }

                            htmls += `
                        <tr>
                            <td>
                            <input type="checkbox" name="apprUpInspecN">
                            <input type="hidden" value="` +
                                    r[i].inspecseq +
                                    `">
                            </td>
                            <td>` + (
                                i + 1
                            ) +
                                    `</td>
                            <td>` + r[i]
                                .vehicle
                                .substring(r[i].vehicle.length - 4) +
                                            `</td>
                            <td>` + r[i]
                                .inspecdatestart +
                                            `</td>
                            <td>` + r[i]
                                .inspecdateend +
                                            `</td>
                            <td>` + r[i]
                                .inspecdate +
                                            `</td>
                            <td>` + r[i]
                                .inspecplace +
                                            `</td>
                            <td class="tdRight">` + AddComma(
                                    r[i].inspecdistance
                                ) +
                                        `Km</td>
                            <td>` + r[i]
                                .inspecsepa +
                                        `</td>
                        </tr>`;
                        }

                        $('#apprUpInspecTB').html(htmls);
                    } else {
                        $('#apprUpInspecTB').html(``);
                        $('#apprUpInspec').hide();
                    }
                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

    function getUpInsuMaint() {
        return new Promise(function (resolve, reject) {
            const url = "/appr/paperupmaint";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "company": dbuser.company
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {
                    if (r.length > 0) {
                        $('#apprUpMainte').show();

                        let htmls = ``;
                        for (let i = 0; i < r.length; i++) {

                            let nameee = '';
                            if (r[i].name) {
                                nameee = r[i].name;
                            }

                            htmls += `
                        <tr>
                            <td>
                            <input type="checkbox" name="apprUpMainteN">
                            <input type="hidden" value="` +
                                    r[i].vemaintenanceseq +
                                    `">
                            </td>
                            <td>` + (
                                i + 1
                            ) +
                                    `</td>
                            <td>` + r[i]
                                .vehicle
                                .substring(r[i].vehicle.length - 4) +
                                            `</td>
                            <td>` + r[i]
                                .vemaintenancedate +
                                            `</td>
                            <td>` + r[i]
                                .vemaintenancekind +
                                            `</td>
                            <td>` + r[i]
                                .vemaintenancecontents +
                                            `</td>
                            <td>` + r[i]
                                .vemaintenancenum +
                                            `</td>
                            <td>` + r[i]
                                .vemaintenancecompany +
                                        `</td>
                            <td class="tdRight">` + AddComma(
                                r[i].vemaintenancemoney
                            ) + `</td>
                        </tr>`;
                        }

                        $('#apprUpMainteTB').html(htmls);
                    } else {
                        $('#apprUpMainteTB').html(``);
                        $('#apprUpMainte').hide();
                    }
                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }
}

function setApprTitle() {
    return new Promise(function (resolve, reject) {

        if ($('#appGiPaper').val()) {
            const dayyyyy = $('#appGiDate')
                .val()
                .split('-')[0] + '.' + $('#appGiDate')
                .val()
                .split('-')[1] + '.' + $('#appGiDate')
                .val()
                .split('-')[2] + '.';

            const aaa = $('#appGiPaper').val() + '(' + dayyyyy + ')';
            $('#apprTitle').html(aaa);
        } else {
            $('#apprTitle').html(``);
        }

        resolve();
    })
}

function setJonghabINM(inM) {
    let realINM = $('#jonghabINM')
        .text()
        .replaceAll(',', '');

    if ($('#jonghabINM').text()) {
        realINM = $('#jonghabINM')
            .text()
            .replaceAll(',', '');
    } else {
        realINM = 0;
    }

    console.log(AddComma(parseInt(realINM)));
    console.log(AddComma(parseInt(inM)));

    $('#jonghabINM').text(AddComma(parseInt(realINM) + parseInt(inM)));

    sumJonghabM();
}

function setJonghabOUTM(outM) {
    let realOUTM = $('#jonghabOUTM')
        .text()
        .replaceAll(',', '');

    if ($('#jonghabOUTM').text()) {
        realOUTM = $('#jonghabOUTM')
            .text()
            .replaceAll(',', '');
    } else {
        realOUTM = 0;
    }

    $('#jonghabOUTM').text(AddComma(parseInt(realOUTM) + parseInt(outM)));

    sumJonghabM();
}

function sumJonghabM() {
    const inM = $('#jonghabINM')
        .text()
        .replaceAll(',', '');
    const outM = $('#jonghabOUTM')
        .text()
        .replaceAll(',', '');

    $('#jonghabALLM').text(AddComma(parseInt(inM) - parseInt(outM)));

    if (AddComma(parseInt(inM) - parseInt(outM)) > 0) {
        $('#jonghabALLM').css('color', '#0D6EFD');
    } else {
        $('#jonghabALLM').css('color', '#D73038');
    }
}

$(document).on('click', '#apprUpEmpAllCh', function () {
    if (this.checked) {
        $('input:checkbox[name="apprUpEmpN"]').each(function () {
            this.checked = true;
        });
    } else {
        $('input:checkbox[name="apprUpEmpN"]').each(function () {
            this.checked = false;
        });
    }
});

$(document).on('click', 'input:checkbox[name="apprUpEmpN"]', function () {
    $('#apprUpEmpAllCh').attr(
        'checked',
        $('input:checkbox[name="apprUpEmpN"]').length == $('input:checkbox[name="apprUpEmpN"]:checked').length
    );
});

$(document).on('click', '#btnapprUpEmp', function () {
    $('#apprUpEmpAllCh').attr('disabled', true);
    $('#btnapprUpEmp').attr('disabled', true);

    let htmls = ``;
    let cnt = 0;

    $('input:checkbox[name="apprUpEmpN"]').each(function () {
        $(this).attr('disabled', true);

        if (this.checked) {
            const bbb = $(this)
                .parent()
                .parent();

            const ccc = $(bbb).children();

            const name = $(ccc[2]).text();
            const ve = $(ccc[3]).text();
            const birth = $(ccc[4]).text();
            const birth2 = $(ccc[5]).text();
            const inDay = $(ccc[6]).text();
            const sosok = $(ccc[7]).text();

            htmls += `
        <tr>
            <td>` + (++cnt) +
                    `</td>
            <td>` + name +
                    `</td>
            <td>` + ve + `</td>
            <td>` + birth +
                    `</td>
            <td>` + birth2 +
                    `</td>
            <td>` + inDay +
                    `</td>
            <td>` + sosok + `</td>
        </tr>`;
        }
    });
    $('#apprEmp').show();
    $('#apprEmpTB').html(htmls);

    $('#apprSumCountEmp').show();
    $('#jonghabEMP').text(cnt + '명');

    console.log($('#asdddd').html());
});

$(document).on('click', '#clearApprEmp', function () {
    $('#apprUpEmpAllCh').attr('disabled', false);
    $('#btnapprUpEmp').attr('disabled', false);

    $('input:checkbox[name="apprUpEmpN"]').each(function () {
        $(this).attr('disabled', false);
    });
    $('#apprEmp').hide();
    $('#apprEmpTB').html(``);

    $('#apprSumCountEmp').hide();
    $('#jonghabEMP').text('');
});

$(document).on('click', '#apprUpVeAllCh', function () {
    if (this.checked) {
        $('input:checkbox[name="apprUpVeN"]').each(function () {
            this.checked = true;
        });
    } else {
        $('input:checkbox[name="apprUpVeN"]').each(function () {
            this.checked = false;
        });
    }
});

$(document).on('click', 'input:checkbox[name="apprUpVeN"]', function () {
    $('#apprUpVeAllCh').attr(
        'checked',
        $('input:checkbox[name="apprUpVeN"]').length == $('input:checkbox[name="apprUpVeN"]:checked').length
    );
});

$(document).on('click', '#btnapprUpVe', function () {
    $('#apprUpVeAllCh').attr('disabled', true);
    $('#btnapprUpVe').attr('disabled', true);

    let htmls = ``;
    let cnt = 0;

    $('input:checkbox[name="apprUpVeN"]').each(function () {
        $(this).attr('disabled', true);

        if (this.checked) {
            const bbb = $(this)
                .parent()
                .parent();

            const ccc = $(bbb).children();

            const ve = $(ccc[2]).text();
            const name = $(ccc[3]).text();
            const sosok = $(ccc[4]).text();
            const brand = $(ccc[5]).text();
            const grade = $(ccc[6]).text();
            const numSaram = $(ccc[7]).text();
            const regd = $(ccc[8]).text();

            htmls += `
        <tr>
            <td>` + (++cnt) +
                    `</td>
            <td>` + ve + `</td>
            <td>` + name +
                    `</td>
            <td>` + sosok +
                    `</td>
            <td>` + brand +
                    `</td>
            <td>` + grade +
                    `</td>
            <td>` + numSaram +
                    `</td>
            <td>` + regd + `</td>
        </tr>`;
        }
    });
    $('#apprVe').show();
    $('#apprVeTB').html(htmls);

    $('#apprSumCountVe').show();
    $('#jonghabVE').text(cnt + '대');
});

$(document).on('click', '#clearApprVe', function () {
    $('#apprUpVeAllCh').attr('disabled', false);
    $('#btnapprUpVe').attr('disabled', false);

    $('input:checkbox[name="apprUpVeN"]').each(function () {
        $(this).attr('disabled', false);
    });
    $('#apprVe').hide();
    $('#apprVeTB').html(``);

    $('#apprSumCountVe').hide();
    $('#jonghabVE').text('');
});

$(document).on('click', '#apprUpAccAllCh', function () {
    if (this.checked) {
        $('input:checkbox[name="apprUpAccN"]').each(function () {
            this.checked = true;
        });
    } else {
        $('input:checkbox[name="apprUpAccN"]').each(function () {
            this.checked = false;
        });
    }
});

$(document).on('click', 'input:checkbox[name="apprUpAccN"]', function () {
    $('#apprUpAccAllCh').attr(
        'checked',
        $('input:checkbox[name="apprUpAccN"]').length == $('input:checkbox[name="apprUpAccN"]:checked').length
    );
});

$(document).on('click', '#btnapprUpAcc', function () {
    $('#apprUpAccAllCh').attr('disabled', true);
    $('#btnapprUpAcc').attr('disabled', true);

    let htmls = ``;
    let cnt = 0;

    $('input:checkbox[name="apprUpAccN"]').each(function () {
        $(this).attr('disabled', true);

        if (this.checked) {
            const bbb = $(this)
                .parent()
                .parent();

            const ccc = $(bbb).children();

            const ve = $(ccc[2]).text();
            const name = $(ccc[3]).text();
            const datetimee = $(ccc[4]).text();

            const eee = $(this)
                .next()
                .next();
            const accCont = $(eee).val();

            const tr222 = `
            <tr>
                <td class="tdLeft" style="padding: 1rem;" colspan="4">` +
                    accCont + `</td>
            </tr>`;

            htmls += `
        <tr>
            <td>` + (++cnt) +
                    `</td>
            <td>` + ve + `</td>
            <td>` + name +
                    `</td>
            <td>` + datetimee + `</td>
        </tr>` + tr222;
        }
    });
    $('#apprAcc').show();
    $('#apprAccTB').html(htmls);
});

$(document).on('click', '#clearApprAcc', function () {
    $('#apprUpAccAllCh').attr('disabled', false);
    $('#btnapprUpAcc').attr('disabled', false);

    $('input:checkbox[name="apprUpAccN"]').each(function () {
        $(this).attr('disabled', false);
    });
    $('#apprAcc').hide();
    $('#apprAccTB').html(``);
});

$(document).on('click', '#apprUpRsvtMoneyAllCh', function () {
    if (this.checked) {
        $('input:checkbox[name="apprUpRsvtMoneyN"]').each(function () {
            this.checked = true;
        });
    } else {
        $('input:checkbox[name="apprUpRsvtMoneyN"]').each(function () {
            this.checked = false;
        });
    }
});

$(document).on(
    'click',
    'input:checkbox[name="apprUpRsvtMoneyN"]',
    function () {
        $('#apprUpRsvtMoneyAllCh').attr(
            'checked',
            $('input:checkbox[name="apprUpRsvtMoneyN"]').length == $('input:checkbox[name="apprUpRsvtMoneyN"]:checked').length
        );
    }
);

$(document).on('click', '#btnapprUpRsvtMoney', function () {
    $('#apprUpRsvtMoneyAllCh').attr('disabled', true);
    $('#btnapprUpRsvtMoney').attr('disabled', true);

    let htmls = ``;
    let cnt = 0;

    let cntInMMM = 0;

    $('input:checkbox[name="apprUpRsvtMoneyN"]').each(function () {
        $(this).attr('disabled', true);

        if (this.checked) {
            const bbb = $(this)
                .parent()
                .parent();

            const ccc = $(bbb).children();

            const custom = $(ccc[2]).text();
            const stday = $(ccc[3]).text();
            const imMM = $(ccc[4]).text();
            const memomo = $(ccc[5]).text();
            const conttt = $(ccc[6]).text();
            const contM = $(ccc[7]).text();
            const janM = $(ccc[8]).text();

            htmls += `
        <tr>
            <td>` + (++cnt) +
                    `</td>
            <td>` + custom +
                    `</td>
            <td>` + stday +
                    `</td>
            <td class="tdRight">` + AddComma(imMM) +
                    `</td>
            <td>` + memomo +
                    `</td>
            <td>` + conttt +
                    `</td>
            <td class="tdRight">` + AddComma(contM) +
                    `</td>
            <td class="tdRight">` + AddComma(janM) +
                    `</td>
        </tr>`;

            cntInMMM = cntInMMM + parseInt(imMM.replaceAll(',', ''));
        }
    });
    $('#apprRsvtMoney').show();
    $('#apprRsvtMoneyTB').html(htmls);

    $('#apprRsvtMoneyFTCnt').text(cnt + '건');
    $('#apprRsvtMoneyFTInM').text(AddComma(cntInMMM));

    setJonghabINM(cntInMMM);
});

$(document).on('click', '#clearApprRsvtMoney', function () {
    setJonghabINM(
        -1 * parseInt($('#apprRsvtMoneyFTInM').text().replaceAll(',', ''))
    );

    $('#apprUpRsvtMoneyAllCh').attr('disabled', false);
    $('#btnapprUpRsvtMoney').attr('disabled', false);

    $('input:checkbox[name="apprUpRsvtMoneyN"]').each(function () {
        $(this).attr('disabled', false);
    });
    $('#apprRsvtMoney').hide();
    $('#apprRsvtMoneyTB').html(``);

    $('#apprRsvtMoneyFTCnt').text(``);
    $('#apprRsvtMoneyFTInM').text(``);
});

$(document).on('click', '#apprUpRsvtAllCh', function () {
    if (this.checked) {
        $('input:checkbox[name="apprUpRsvtN"]').each(function () {
            this.checked = true;
        });
    } else {
        $('input:checkbox[name="apprUpRsvtN"]').each(function () {
            this.checked = false;
        });
    }
});

$(document).on('click', 'input:checkbox[name="apprUpRsvtN"]', function () {
    $('#apprUpRsvtAllCh').attr(
        'checked',
        $('input:checkbox[name="apprUpRsvtN"]').length == $('input:checkbox[name="apprUpRsvtN"]:checked').length
    );
});

$(document).on('click', '#btnapprUpRsvt', function () {
    $('#apprUpRsvtAllCh').attr('disabled', true);
    $('#btnapprUpRsvt').attr('disabled', true);

    let htmls = ``;
    let htmlsF = ``;
    let cnt = 0;

    let cntInBus = 0;
    let cntInMMM = 0;

    $('input:checkbox[name="apprUpRsvtN"]').each(function () {
        $(this).attr('disabled', true);

        if (this.checked) {
            const bbb = $(this)
                .parent()
                .parent();

            const ccc = $(bbb).children();

            const custom = $(ccc[2]).text();
            const stday = $(ccc[3]).text();
            const dayyss = $(ccc[4]).text();
            const destyy = $(ccc[5]).text();
            const buss = $(ccc[6]).text();
            const bumm = $(ccc[7]).text();
            const con = $(ccc[8]).text();
            const conMM = $(ccc[9]).text();

            htmls += `
        <tr>
            <td>` + (++cnt) +
                    `</td>
            <td>` + custom +
                    `</td>
            <td>` + stday +
                    `</td>
            <td>` + dayyss +
                    `</td>
            <td>` + destyy +
                    `</td>
            <td>` + buss +
                    `</td>
            <td>` + bumm +
                    `</td>
            <td>` + con +
                    `</td>
            <td class="tdRight">` + AddComma(conMM) +
                    `</td>
        </tr>`;

            cntInBus = cntInBus + parseInt(bumm.replaceAll(',', ''));
            cntInMMM = cntInMMM + parseInt(conMM.replaceAll(',', ''));
        }
    });
    $('#apprRsvt').show();
    $('#apprRsvtTB').html(htmls);

    $('#apprRsvtFTCnt').text(cnt + '건');
    $('#apprRsvtFTBUS').text(cntInBus + '대');
    $('#apprRsvtFTAllM').text(AddComma(cntInMMM));
});

$(document).on('click', '#clearApprRsvt', function () {
    $('#apprUpRsvtAllCh').attr('disabled', false);
    $('#btnapprUpRsvt').attr('disabled', false);

    $('input:checkbox[name="apprUpRsvtN"]').each(function () {
        $(this).attr('disabled', false);
    });
    $('#apprRsvt').hide();
    $('#apprRsvtTB').html(``);

    $('#apprRsvtFTCnt').text(``);
    $('#apprRsvtFTBUS').text(``);
    $('#apprRsvtFTAllM').text(``);
});

$(document).on('click', '#apprUpInsuAllCh', function () {
    if (this.checked) {
        $('input:checkbox[name="apprUpInsuN"]').each(function () {
            this.checked = true;
        });
    } else {
        $('input:checkbox[name="apprUpInsuN"]').each(function () {
            this.checked = false;
        });
    }
});

$(document).on('click', 'input:checkbox[name="apprUpInsuN"]', function () {
    $('#apprUpInsuAllCh').attr(
        'checked',
        $('input:checkbox[name="apprUpInsuN"]').length == $('input:checkbox[name="apprUpInsuN"]:checked').length
    );
});

$(document).on('click', '#btnapprUpInsu', function () {
    $('#apprUpInsuAllCh').attr('disabled', true);
    $('#btnapprUpInsu').attr('disabled', true);

    let htmls = ``;
    let cnt = 0;

    $('input:checkbox[name="apprUpInsuN"]').each(function () {
        $(this).attr('disabled', true);

        if (this.checked) {
            const bbb = $(this)
                .parent()
                .parent();

            const ccc = $(bbb).children();

            const ve = $(ccc[2]).text();
            const stday = $(ccc[3]).text();
            const enddd = $(ccc[4]).text();
            const timeee = $(ccc[5]).text();
            const moneyyy = $(ccc[6]).text();

            htmls += `
        <tr>
            <td>` + (++cnt) +
                    `</td>
            <td>` + ve + `</td>
            <td>` + stday +
                    `</td>
            <td>` + enddd +
                    `</td>
            <td>` + timeee +
                    `</td>
            <td class="tdRight">` + AddComma(moneyyy) +
                    `</td>
        </tr>`;
        }
    });
    $('#apprInsu').show();
    $('#apprInsuTB').html(htmls);
});

$(document).on('click', '#clearApprInsu', function () {
    $('#apprUpInsuAllCh').attr('disabled', false);
    $('#btnapprUpInsu').attr('disabled', false);

    $('input:checkbox[name="apprUpInsuN"]').each(function () {
        $(this).attr('disabled', false);
    });
    $('#apprInsu').hide();
    $('#apprInsuTB').html(``);
});

$(document).on('click', '#apprUpInsuSepaAllCh', function () {
    if (this.checked) {
        $('input:checkbox[name="apprUpInsuSepaN"]').each(function () {
            this.checked = true;
        });
    } else {
        $('input:checkbox[name="apprUpInsuSepaN"]').each(function () {
            this.checked = false;
        });
    }
});

$(document).on('click', 'input:checkbox[name="apprUpInsuSepaN"]', function () {
    $('#apprUpInsuSepaAllCh').attr(
        'checked',
        $('input:checkbox[name="apprUpInsuSepaN"]').length == $('input:checkbox[name="apprUpInsuSepaN"]:checked').length
    );
});

$(document).on('click', '#btnapprUpInsuSepa', function () {
    $('#apprUpInsuSepaAllCh').attr('disabled', true);
    $('#btnapprUpInsuSepa').attr('disabled', true);

    let htmls = ``;
    let cnt = 0;

    let cntMMM = 0;

    $('input:checkbox[name="apprUpInsuSepaN"]').each(function () {
        $(this).attr('disabled', true);

        if (this.checked) {
            const bbb = $(this)
                .parent()
                .parent();

            const ccc = $(bbb).children();

            const ve = $(ccc[2]).text();
            const stday = $(ccc[3]).text();
            const bangg = $(ccc[4]).text();
            const timeee = $(ccc[5]).text();
            const moneyyy = $(ccc[6]).text();

            htmls += `
        <tr>
            <td>` + (++cnt) +
                    `</td>
            <td>` + ve + `</td>
            <td>` + stday +
                    `</td>
            <td>` + bangg +
                    `</td>
            <td>` + timeee +
                    `</td>
            <td class="tdRight">` + AddComma(moneyyy) +
                    `</td>
        </tr>`;

            cntMMM = cntMMM + parseInt(moneyyy.replaceAll(',', ''));
        }
    });
    $('#apprInsuSepa').show();
    $('#apprInsuSepaTB').html(htmls);

    $('#apprInsuSepaFTCnt').text(cnt + '건');
    $('#apprInsuSepaFTAllM').text(AddComma(cntMMM));

    setJonghabOUTM(cntMMM);
});

$(document).on('click', '#clearApprInsuSepa', function () {

    setJonghabOUTM(
        -1 * parseInt($('#apprInsuSepaFTAllM').text().replaceAll(',', ''))
    );

    $('#apprUpInsuSepaAllCh').attr('disabled', false);
    $('#btnapprUpInsuSepa').attr('disabled', false);

    $('input:checkbox[name="apprUpInsuSepaN"]').each(function () {
        $(this).attr('disabled', false);
    });
    $('#apprInsuSepa').hide();
    $('#apprInsuSepaTB').html(``);

    $('#apprInsuSepaFTCnt').text('');
    $('#apprInsuSepaFTAllM').text('');
});

$(document).on('click', '#apprUpLoanAllCh', function () {
    if (this.checked) {
        $('input:checkbox[name="apprUpLoanN"]').each(function () {
            this.checked = true;
        });
    } else {
        $('input:checkbox[name="apprUpLoanN"]').each(function () {
            this.checked = false;
        });
    }
});

$(document).on('click', 'input:checkbox[name="apprUpLoanN"]', function () {
    $('#apprUpLoanAllCh').attr(
        'checked',
        $('input:checkbox[name="apprUpLoanN"]').length == $('input:checkbox[name="apprUpLoanN"]:checked').length
    );
});

$(document).on('click', '#btnapprUpLoan', function () {
    $('#apprUpLoanAllCh').attr('disabled', true);
    $('#btnapprUpLoan').attr('disabled', true);

    let htmls = ``;
    let cnt = 0;

    $('input:checkbox[name="apprUpLoanN"]').each(function () {
        $(this).attr('disabled', true);

        if (this.checked) {
            const bbb = $(this)
                .parent()
                .parent();

            const ccc = $(bbb).children();

            const ve = $(ccc[2]).text();
            const bank = $(ccc[3]).text();
            const allLoan = $(ccc[4]).text();
            const monthLoan = $(ccc[5]).text();
            const loanDay = $(ccc[6]).text();
            const endLoan = $(ccc[7]).text();
            const peri = $(ccc[8]).text();
            const laondayyy = $(ccc[9]).text();

            htmls += `
        <tr>
            <td>` + (++cnt) +
                    `</td>
            <td>` + ve + `</td>
            <td>` + bank +
                    `</td>
            <td class="tdRight">` + AddComma(allLoan) +
                    `</td>
            <td class="tdRight">` + AddComma(monthLoan) +
                    `</td>
            <td>` + loanDay +
                    `</td>
            <td>` + endLoan +
                    `</td>
            <td>` + peri +
                    `</td>
            <td>` + laondayyy + `</td>
        </tr>`;
        }
    });
    $('#apprLoan').show();
    $('#apprLoanTB').html(htmls);
});

$(document).on('click', '#clearApprLoan', function () {
    $('#apprUpLoanAllCh').attr('disabled', false);
    $('#btnapprUpLoan').attr('disabled', false);

    $('input:checkbox[name="apprUpLoanN"]').each(function () {
        $(this).attr('disabled', false);
    });
    $('#apprLoan').hide();
    $('#apprLoanTB').html(``);
});

$(document).on('click', '#apprUpLoanSepaAllCh', function () {
    if (this.checked) {
        $('input:checkbox[name="apprUpLoanSepaN"]').each(function () {
            this.checked = true;
        });
    } else {
        $('input:checkbox[name="apprUpLoanSepaN"]').each(function () {
            this.checked = false;
        });
    }
});

$(document).on('click', 'input:checkbox[name="apprUpLoanSepaN"]', function () {
    $('#apprUpLoanSepaAllCh').attr(
        'checked',
        $('input:checkbox[name="apprUpLoanSepaN"]').length == $('input:checkbox[name="apprUpLoanSepaN"]:checked').length
    );
});

$(document).on('click', '#btnapprUpLoanSepa', function () {
    $('#apprUpLoanSepaAllCh').attr('disabled', true);
    $('#btnapprUpLoanSepa').attr('disabled', true);

    let htmls = ``;
    let cnt = 0;

    let cntMMM = 0;

    $('input:checkbox[name="apprUpLoanSepaN"]').each(function () {
        $(this).attr('disabled', true);

        if (this.checked) {
            const bbb = $(this)
                .parent()
                .parent();

            const ccc = $(bbb).children();

            const ve = $(ccc[2]).text();
            const dayyy = $(ccc[3]).text();
            const timemonth = $(ccc[4]).text();
            const time = $(ccc[5]).text();
            const moneyyy = $(ccc[6]).text();
            const allMoney = $(ccc[7]).text();
            const janm = $(ccc[8]).text();

            htmls += `
        <tr>
            <td>` + (++cnt) +
                    `</td>
            <td>` + ve + `</td>
            <td>` + dayyy +
                    `</td>
            <td>` + timemonth +
                    `</td>
            <td>` + time +
                    `</td>
            <td class="tdRight">` + AddComma(moneyyy) +
                    `</td>
            <td class="tdRight">` + AddComma(allMoney) +
                    `</td>
            <td class="tdRight">` + AddComma(janm) +
                    `</td>
        </tr>`;

            cntMMM = cntMMM + parseInt(moneyyy.replaceAll(',', ''));
        }
    });
    $('#apprLoanSepa').show();
    $('#apprLoanSepaTB').html(htmls);

    $('#apprLoanSepaFTCnt').text(cnt + '건');
    $('#apprLoanSepaFTAllM').text(AddComma(cntMMM));

    setJonghabOUTM(cntMMM);
});

$(document).on('click', '#clearApprLoanSepa', function () {
    setJonghabOUTM(
        -1 * parseInt($('#apprLoanSepaFTAllM').text().replaceAll(',', ''))
    );

    $('#apprUpLoanSepaAllCh').attr('disabled', false);
    $('#btnapprUpLoanSepa').attr('disabled', false);

    $('input:checkbox[name="apprUpLoanSepaN"]').each(function () {
        $(this).attr('disabled', false);
    });
    $('#apprLoanSepa').hide();
    $('#apprLoanSepaTB').html(``);

    $('#apprLoanSepaFTCnt').text('');
    $('#apprLoanSepaFTAllM').text('');
});

$(document).on('click', '#apprUpInspecAllCh', function () {
    if (this.checked) {
        $('input:checkbox[name="apprUpInspecN"]').each(function () {
            this.checked = true;
        });
    } else {
        $('input:checkbox[name="apprUpInspecN"]').each(function () {
            this.checked = false;
        });
    }
});

$(document).on('click', 'input:checkbox[name="apprUpInspecN"]', function () {
    $('#apprUpInspecAllCh').attr(
        'checked',
        $('input:checkbox[name="apprUpInspecN"]').length == $('input:checkbox[name="apprUpInspecN"]:checked').length
    );
});

$(document).on('click', '#btnapprUpInspec', function () {
    $('#apprUpInspecAllCh').attr('disabled', true);
    $('#btnapprUpInspec').attr('disabled', true);

    let htmls = ``;
    let cnt = 0;

    $('input:checkbox[name="apprUpInspecN"]').each(function () {
        $(this).attr('disabled', true);

        if (this.checked) {
            const bbb = $(this)
                .parent()
                .parent();

            const ccc = $(bbb).children();

            const ve = $(ccc[2]).text();
            const stddd = $(ccc[3]).text();
            const edddd = $(ccc[4]).text();
            const dayyyy = $(ccc[5]).text();
            const placeee = $(ccc[6]).text();
            const kmkmkm = $(ccc[7]).text();
            const inssepa = $(ccc[8]).text();

            htmls += `
        <tr>
            <td>` + (++cnt) +
                    `</td>
            <td>` + ve + `</td>
            <td>` + stddd +
                    `</td>
            <td>` + edddd +
                    `</td>
            <td>` + dayyyy +
                    `</td>
            <td>` + placeee +
                    `</td>
            <td>` + kmkmkm +
                    `</td>
            <td>` + inssepa + `</td>
        </tr>`;

        }
    });
    $('#apprInspec').show();
    $('#apprInspecTB').html(htmls);
});

$(document).on('click', '#clearApprInspec', function () {
    $('#apprUpInspecAllCh').attr('disabled', false);
    $('#btnapprUpInspec').attr('disabled', false);

    $('input:checkbox[name="apprUpInspecN"]').each(function () {
        $(this).attr('disabled', false);
    });
    $('#apprInspec').hide();
    $('#apprInspecTB').html(``);
});

$(document).on('click', '#apprUpMainteAllCh', function () {
    if (this.checked) {
        $('input:checkbox[name="apprUpMainteN"]').each(function () {
            this.checked = true;
        });
    } else {
        $('input:checkbox[name="apprUpMainteN"]').each(function () {
            this.checked = false;
        });
    }
});

$(document).on('click', 'input:checkbox[name="apprUpMainteN"]', function () {
    $('#apprUpMainteAllCh').attr(
        'checked',
        $('input:checkbox[name="apprUpMainteN"]').length == $('input:checkbox[name="apprUpMainteN"]:checked').length
    );
});

$(document).on('click', '#btnapprUpMainte', function () {
    $('#apprUpMainteAllCh').attr('disabled', true);
    $('#btnapprUpMainte').attr('disabled', true);

    let htmls = ``;
    let cnt = 0;

    let cntMMM = 0;

    $('input:checkbox[name="apprUpMainteN"]').each(function () {
        $(this).attr('disabled', true);

        if (this.checked) {
            const bbb = $(this)
                .parent()
                .parent();

            const ccc = $(bbb).children();

            const ve = $(ccc[2]).text();
            const dayyy = $(ccc[3]).text();
            const sayou = $(ccc[4]).text();
            const macont = $(ccc[5]).text();
            const nummm = $(ccc[6]).text();
            const placee = $(ccc[7]).text();
            const moneyyy = $(ccc[8]).text();

            htmls += `
        <tr>
            <td>` + (++cnt) +
                    `</td>
            <td>` + ve + `</td>
            <td>` + dayyy +
                    `</td>
            <td>` + sayou +
                    `</td>
            <td>` + macont +
                    `</td>
            <td>` + nummm +
                    `</td>
            <td>` + placee +
                    `</td>
            <td class="tdRight">` + AddComma(moneyyy) +
                    `</td>
        </tr>`;

            cntMMM = cntMMM + parseInt(moneyyy.replaceAll(',', ''));
        }
    });
    $('#apprMainte').show();
    $('#apprMainteTB').html(htmls);

    $('#apprMainteFTCnt').text(cnt + '건');
    $('#apprMainteFTAllM').text(AddComma(cntMMM));

    setJonghabOUTM(cntMMM);
});

$(document).on('click', '#clearApprMainte', function () {
    setJonghabOUTM(
        -1 * parseInt($('#apprMainteFTAllM').text().replaceAll(',', ''))
    );

    $('#apprUpMainteAllCh').attr('disabled', false);
    $('#btnapprUpMainte').attr('disabled', false);

    $('input:checkbox[name="apprUpMainteN"]').each(function () {
        $(this).attr('disabled', false);
    });
    $('#apprMainte').hide();
    $('#apprMainteTB').html(``);

    $('#apprMainteFTCnt').text('');
    $('#apprMainteFTAllM').text('');
});