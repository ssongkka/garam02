$(document).on('click', '#newLoanCont', function () {
    const carN = $('#ve00').val();

    const bbb = $('#ve02').children()[0];
    const canNumNUm = $(bbb).text();

    $('#loanCarNum').val(carN);
    $('#loancontNum').val('');

    $('#modal-loanCont-mh').text(canNumNUm + "  신규 대출정보 입력");

    $('#loanCont-insert').show();
    $('#loanCont-del').hide();

    $('#loanbank').attr("disabled", false);
    $('#loanmoney').attr("disabled", false);
    $('#loanmonthm').attr("disabled", false);
    $('#loanStDay').attr("disabled", false);
    $('#loanEndDay').attr("disabled", false);
    $('#loanPeri').attr("disabled", false);
    $('#loanday').attr("disabled", false);
    $('#tbloansepaNum').attr("disabled", false);

    $('.loanShow').hide();

    $('#loanbank').val('');
    $('#loanmoney').val('0');
    $('#loanmonthm').val('0');
    $('#loanStDay').val('');
    $('#loanEndDay').val('');
    $('#loanPeri').val('');
    $('#loanday').val('');

    $('#modal-loanCont').modal('show');
});

$(document).on('click', '.trChoLoan', function () {
    const aaa = $(this).children()[0];
    const aaa1 = $(aaa).children()[0];

    const loanNoo = $(aaa1).val();

    makeModalLoanCont(loanNoo);
});

function makeModalLoanCont(loanNo, cho) {

    if (cho) {
        LoadingWithMask()
            .then(makeLoan)
            .then(makeLoanSepa)
            .then(closeLoadingWithMask);
    } else {
        LoadingWithMask()
            .then(makeLoan)
            .then(makeLoanSepa)
            .then(showMdLoancont)
            .then(closeLoadingWithMask);
    }

    function makeLoan() {
        return new Promise(function (resolve, reject) {
            const url = "/ve/veLoanNo";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "loanno": loanNo
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {
                    $('#loanCont-insert').hide();
                    $('#loanCont-del').show();

                    if (r.length > 0) {
                        $('.loanShow').show();

                        $('#loanbank').attr("disabled", true);
                        $('#loanmoney').attr("disabled", true);
                        $('#loanmonthm').attr("disabled", true);
                        $('#loanStDay').attr("disabled", true);
                        $('#loanEndDay').attr("disabled", true);
                        $('#loanPeri').attr("disabled", true);
                        $('#loanday').attr("disabled", true);
                        $('#tbloansepaNum').attr("disabled", true);

                        $('#inputLoanMonetInsert').val(AddComma(r[0].loanmonth));

                        let countttt = 0;
                        if (r[0].jukseq) {
                            countttt = parseInt(r[0].jukseq) + 1 + '회차';
                        } else {
                            countttt = '1회차';
                        }

                        $('#tbloansepaNum').text(countttt);
                        $('#loanbank').val(r[0].loanbank);
                        $('#loanmoney').val(AddComma(r[0].loan));
                        $('#loanmonthm').val(AddComma(r[0].loanmonth));
                        $('#loanStDay').val(r[0].loandatestart);
                        $('#loanEndDay').val(r[0].loandateend);
                        $('#loanPeri').val(r[0].loanperiod);
                        $('#loanday').val(r[0].loandayloan);

                        let hab = 0;
                        let countt = 0;
                        let janm = 0;

                        if (r[0].price) {
                            hab = AddComma(r[0].price);
                            countt = r[0].jukseq + '회';
                            janm = AddComma(parseInt(r[0].loan) - parseInt(r[0].price));
                        } else {
                            hab = 0;
                            countt = '1회';
                            janm = AddComma(parseInt(r[0].loan));
                        }
                        $('#loanAllmoney').val(hab);
                        $('#loancontLabel').text(countt);
                        $('#loanjanM').val(janm);

                        resolve(r[0].loanno);
                    }
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

    function makeLoanSepa(result) {
        return new Promise(function (resolve, reject) {
            const url = "/ve/veLoansepa";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "loanno": loanNo
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {
                    let htmls = ``;
                    for (let i = 0; i < r.length; i++) {
                        htmls += `
                    <tr>
                        <td>
                        ` +
                                r[i].loansepatime +
                                `
                            <input type="hidden" value="` + r[i].loansepano +
                                `">
                        </td>
                        <td><input type="date" class="form-control" value="` +
                                r[i].loansepaday +
                                `"></td>
                        <td><input
                            type="text"
                            class="form-control inLoanSepaInput"
                            data-type="currency"
                            value="` +
                                AddComma(r[i].loansepamoney) +
                                `"
                            onfocus="this.select()"></td>
                    </tr>`;
                    }
                    $('#tb-md-loancont').html(htmls);
                    $("input[data-type='currency']").bind('keyup keydown', function () {
                        inputNumberFormat(this);
                    });

                    resolve(result);
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

    function showMdLoancont(result) {
        return new Promise(function (resolve, reject) {
            const carN = $('#ve00').val();

            const bbb = $('#ve02').children()[0];
            const canNumNUm = $(bbb).text();

            $('#loanCarNum').val(carN);
            $('#loancontNum').val(result);

            $('#modal-loanCont-mh').text(canNumNUm + "  대출정보");

            $('#inputLoanDayInsert').val(toStringByFormatting(new Date()));

            $('#modal-loanCont').modal('show');
            resolve();
        })
    }
}

$(document).on('keyup', '#inputLoanMonetInsert', function (eInner) {
    var keyValue = eInner.which; //enter key
    if (keyValue == 13) {

        const aaa = $(this)
            .parent()
            .parent();

        const aaa1 = $(aaa).children()[0];
        const aaa11 = $(aaa1).children()[0];

        const loansepaNUm = $(aaa11).val();

        if (!$('#inputLoanDayInsert').val()) {
            alert('납부일을 입력해주세요.');
            $('#inputLoanDayInsert').focus();
            closeLoadingWithMask();
            return;
        }
        if (!$('#inputLoanMonetInsert').val()) {
            alert('납부금액을 입력해주세요.');
            $('#inputLoanMonetInsert').focus();
            closeLoadingWithMask();
            return;
        }

        LoadingWithMask().then(insertLoanSepa);

        function insertLoanSepa(result) {
            return new Promise(function (resolve, reject) {
                const url = "/ve/veinsertLoanSepa";
                const headers = {
                    "Content-Type": "application/json",
                    "X-HTTP-Method-Override": "POST"
                };

                const params = {
                    "loanno": $('#loancontNum').val(),
                    "loansepaday": $('#inputLoanDayInsert').val(),
                    "loansepamoney": $('#inputLoanMonetInsert')
                        .val()
                        .replaceAll(',', ''),
                    "loansepatime": $('#tbloansepaNum')
                        .text()
                        .replaceAll('회차', '')
                };

                $.ajax({
                    url: url,
                    type: "POST",
                    headers: headers,
                    dataType: "json",
                    data: JSON.stringify(params),

                    success: function (r) {
                        const janSum = parseInt($('#loanjanM').val().replaceAll(',', '')) - parseInt(
                            $('#inputLoanMonetInsert').val().replaceAll(',', '')
                        );
                        if (janSum == 0 || (janSum < 10000)) {
                            updateLoanTheEnd()
                                .then(makeReLoan)
                                .then(closeLoadingWithMask);
                        } else {
                            makeReLoan().then(closeLoadingWithMask);
                        }
                        resolve();
                    },
                    error: (jqXHR) => {
                        loginSession(jqXHR.status);
                    }
                })
            })
        }

        function updateLoanTheEnd(result) {
            return new Promise(function (resolve, reject) {
                const url = "/ve/veupdateLoan";
                const headers = {
                    "Content-Type": "application/json",
                    "X-HTTP-Method-Override": "POST"
                };

                const params = {
                    "loanno": $('#loancontNum').val(),
                    "loantrash": 2
                };

                $.ajax({
                    url: url,
                    type: "POST",
                    headers: headers,
                    dataType: "json",
                    data: JSON.stringify(params),

                    success: function (r) {
                        resolve();
                    },
                    error: (jqXHR) => {
                        loginSession(jqXHR.status);
                    }
                })
            })
        }

        function makeReLoan() {
            return new Promise(function (resolve, reject) {
                makeModalLoanCont($('#loancontNum').val(), 1);
                resolve();
            })
        }
    }
});

$(document).on('click', '#loanCont-insert', function () {

    LoadingWithMask()
        .then(insertLoan)
        .then(closeLoadingWithMask);

    function insertLoan() {
        return new Promise(function (resolve, reject) {

            if (!$('#loanbank').val()) {
                alert('대출처를 입력해주세요.');
                $('#loanbank').focus();
                closeLoadingWithMask();
                return;
            }
            if (parseInt($('#loanmoney').val().replaceAll(',', '')) < 1) {
                alert('대출금액을 입력해주세요.');
                $('#loanmoney').focus();
                closeLoadingWithMask();
                return;
            }
            if (parseInt($('#loanmonthm').val().replaceAll(',', '')) < 1) {
                alert('월납입금을 입력해주세요.');
                $('#loanmonthm').focus();
                closeLoadingWithMask();
                return;
            }
            if (!$('#loanStDay').val()) {
                alert('대출일을 입력해주세요.');
                $('#loanStDay').focus();
                closeLoadingWithMask();
                return;
            }
            if (!$('#loanEndDay').val()) {
                alert('만기일을 입력해주세요.');
                $('#loanEndDay').focus();
                closeLoadingWithMask();
                return;
            }
            if (!$('#loanPeri').val()) {
                alert('대출기간을 입력해주세요.');
                $('#loanPeri').focus();
                closeLoadingWithMask();
                return;
            }
            if (!$('#loanday').val()) {
                alert('기산일을 입력해주세요.');
                $('#loanday').focus();
                closeLoadingWithMask();
                return;
            }

            const url = "/ve/veinsertLoan";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "loan": $('#loanmoney')
                    .val()
                    .replaceAll(',', ''),
                "carnumber": $('#loanCarNum').val(),
                "loanmonth": $('#loanmonthm')
                    .val()
                    .replaceAll(',', ''),
                "loandatestart": $('#loanStDay').val(),
                "loandateend": $('#loanEndDay').val(),
                "loanperiod": $('#loanPeri').val(),
                "loandayloan": $('#loanday').val(),
                "loanbank": $('#loanbank').val()
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {
                    if (r > 0) {
                        alert("대출정보 입력");
                        $('#modal-loanCont').modal('hide');
                        makeLoan();
                        resolve();
                    } else if (r == 0) {
                        alert("대출정보 입력 실패!\n\n시스템을 확인해주세요.")
                        location.reload();
                    } else if (r == -1) {
                        alert("대출정보 입력 실패!\n\n데이터베이스 처리 과정에 문제가 발생하였습니다.")
                        location.reload();
                    } else if (r == -2) {
                        alert("대출정보 입력 실패!\n\n시스템을 확인해주세요.")
                        location.reload();
                    }
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
            resolve();
        })
    }
});

$(document).on('keyup', '.inLoanSepaInput', function (eInner) {
    var keyValue = eInner.which; //enter key
    if (keyValue == 13) {
        const aaa = $(this)
            .parent()
            .parent();

        const aaa1 = $(aaa).children()[0];
        const aaa11 = $(aaa1).children()[0];

        const loansepaNUm = $(aaa11).val();

        const loanSepaMoney = $(this)
            .val()
            .replaceAll(',', '');

        const bbb = $(this)
            .parent()
            .prev()
            .children()[0];

        const loansepaDDD = $(bbb).val();

        if (!$(bbb).val()) {
            alert('납부일을 입력해주세요.');
            $(bbb).focus();
            closeLoadingWithMask();
            return;
        }
        if (!$(this).val()) {
            alert('납부금액을 입력해주세요.');
            $(this).focus();
            closeLoadingWithMask();
            return;
        }

        if (parseInt(loanSepaMoney) > 0) {
            LoadingWithMask()
                .then(updateSepaMoney)
                .then(checkLoanSum);
        } else {
            LoadingWithMask()
                .then(delLoanSepa)
                .then(checkLoanSum);
        }

        function updateSepaMoney(result) {
            return new Promise(function (resolve, reject) {
                const url = "/ve/veupdateLoanSepa";
                const headers = {
                    "Content-Type": "application/json",
                    "X-HTTP-Method-Override": "POST"
                };

                const params = {
                    "loansepaday": loansepaDDD,
                    "loansepamoney": loanSepaMoney,
                    "loansepano": loansepaNUm
                };

                $.ajax({
                    url: url,
                    type: "POST",
                    headers: headers,
                    dataType: "json",
                    data: JSON.stringify(params),

                    success: function (r) {
                        makeModalLoanCont($('#loancontNum').val(), 1);

                        resolve();
                    },
                    error: (jqXHR) => {
                        loginSession(jqXHR.status);
                    }
                })
                resolve();
            })
        }

        function delLoanSepa(result) {
            return new Promise(function (resolve, reject) {
                const url = "/ve/vedelLoanSepa";
                const headers = {
                    "Content-Type": "application/json",
                    "X-HTTP-Method-Override": "POST"
                };

                const params = {
                    "loansepano": loansepaNUm
                };

                $.ajax({
                    url: url,
                    type: "POST",
                    headers: headers,
                    dataType: "json",
                    data: JSON.stringify(params),

                    success: function (r) {
                        makeModalLoanCont($('#loancontNum').val(), 1);

                        const janSum = parseInt($('#loanjanM').val().replaceAll(',', '')) - parseInt(
                            loanSepaMoney
                        );

                        if (janSum > 0) {
                            updateLoanTheEndEnd().then(closeLoadingWithMask);
                        } else {
                            closeLoadingWithMask();
                        }

                        resolve();
                    },
                    error: (jqXHR) => {
                        loginSession(jqXHR.status);
                    }
                })
                resolve();
            })
        }

        function checkLoanSum() {
            return new Promise(function (resolve, reject) {
                const url = "/ve/veLoanNo";
                const headers = {
                    "Content-Type": "application/json",
                    "X-HTTP-Method-Override": "POST"
                };

                const params = {
                    "loanno": $('#loancontNum').val()
                };

                $.ajax({
                    url: url,
                    type: "POST",
                    headers: headers,
                    dataType: "json",
                    data: JSON.stringify(params),

                    success: function (r) {
                        $('#loanCont-insert').hide();
                        $('#loanCont-del').show();

                        if (r.length > 0) {
                            const summ = parseInt(r[0].loan) - parseInt(r[0].price);

                            console.log("summ   " + summ);

                            if (summ <= 10000) {
                                updateLoanTheEndEnd(2).then(closeLoadingWithMask);
                            } else {
                                updateLoanTheEndEnd(1).then(closeLoadingWithMask);
                            }
                        }
                    },
                    error: (jqXHR) => {
                        loginSession(jqXHR.status);
                    }
                })
            })
        }

        function updateLoanTheEndEnd(result) {
            return new Promise(function (resolve, reject) {
                const url = "/ve/veupdateLoan";
                const headers = {
                    "Content-Type": "application/json",
                    "X-HTTP-Method-Override": "POST"
                };

                const params = {
                    "loanno": $('#loancontNum').val(),
                    "loantrash": result
                };

                $.ajax({
                    url: url,
                    type: "POST",
                    headers: headers,
                    dataType: "json",
                    data: JSON.stringify(params),

                    success: function (r) {
                        resolve();
                    },
                    error: (jqXHR) => {
                        loginSession(jqXHR.status);
                    }
                })
            })
        }
    }
});

$(document).on('click', '#loanCont-del', function () {
    const con = confirm("대출정보를 삭제하시겠습니까?\n\n납부내역도 모두 삭제됩니다.");

    if (con) {

        LoadingWithMask()
            .then(delLoan)
            .then(closeLoadingWithMask);

        function delLoan() {
            return new Promise(function (resolve, reject) {
                const url = "/ve/vedelLoan";
                const headers = {
                    "Content-Type": "application/json",
                    "X-HTTP-Method-Override": "POST"
                };

                const params = {
                    "loanno": $('#loancontNum').val()
                };

                $.ajax({
                    url: url,
                    type: "POST",
                    headers: headers,
                    dataType: "json",
                    data: JSON.stringify(params),

                    success: function (r) {
                        if (r > 0) {
                            alert("대출정보 삭제");
                            $('#modal-loanCont').modal('hide');
                            makeLoan();
                            resolve();
                        } else if (r == -1) {
                            alert("대출정보 삭제 실패!\n\n데이터베이스 처리 과정에 문제가 발생하였습니다.")
                            location.reload();
                        } else if (r == -2) {
                            alert("대출정보 삭제 실패!\n\n시스템을 확인해주세요.")
                            location.reload();
                        }
                    },
                    error: (jqXHR) => {
                        loginSession(jqXHR.status);
                    }
                })
                resolve();
            })
        }
    }
});

$(document).on('click', '#loanContX', function () {

    LoadingWithMask()
        .then(st1)
        .then(st2)
        .then(closeLoadingWithMask);

    function st1() {
        return new Promise(function (resolve, reject) {
            makeLoan();
            resolve();
        })
    }
    function st2() {
        return new Promise(function (resolve, reject) {
            $('#modal-loanCont').modal('hide');
            resolve();
        })
    }
});

$(document).on('click', '#loanContBtn', function () {

    LoadingWithMask()
        .then(st1)
        .then(st2)
        .then(closeLoadingWithMask);

    function st1() {
        return new Promise(function (resolve, reject) {
            makeLoan();
            resolve();
        })
    }
    function st2() {
        return new Promise(function (resolve, reject) {
            $('#modal-loanCont').modal('hide');
            resolve();
        })
    }
});