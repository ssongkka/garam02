$(document).on('click', '.aaadcascasca', function () {

    const aaa = $(this)
        .parent()
        .prev()
        .prev()
        .prev()
        .prev()
        .children();
    const realinsucontNum = $(aaa[0]).val();
    const insuSepaNum = $(aaa[1]).val();

    const carN = $('#ve00').val();

    const bbb = $('#ve02').children()[0];
    const canNumNUm = $(bbb).text();

    LoadingWithMask()
        .then(makeSepaInsu)
        .then(showMdInsucont)
        .then(closeLoadingWithMask);

    function makeSepaInsu() {
        return new Promise(function (resolve, reject) {
            $('#insuContName').val('');
            $('#insuStDay').val('');
            $('#insuEndDay').val('');
            $('#insuNum').val('');
            $('#inputZip').val('0');

            $('#insuCont-insert').hide();

            const aaa = $('#tbinsu').children();

            let htmls = ``;

            for (let k = 0; k < aaa.length; k++) {
                const aaa1 = $(aaa[k]).children()[5];
                const aaa11 = $(aaa1).children();

                if (realinsucontNum == $(aaa11[0]).val()) {
                    const bbb = $(aaa[k]).children()[1];
                    const bbb1 = $(bbb).text();

                    const ccc = $(aaa[k]).children()[2];
                    const ccc1 = $(ccc).text();

                    const ddd = $(aaa[k]).children()[3];
                    const ddd1 = $(ddd).text();

                    const eee = $(aaa[k]).children()[4];
                    const eee1 = $(eee).text();

                    $('#insuContName').val(realinsucontNum);
                    $('#insuStDay').val(ccc1);
                    $('#insuEndDay').val(ddd1);
                    // $('#insuNum').val(aaa.length);
                    $('#inputZip').val(AddComma(eee1));

                    const fff = $($(aaa[k]).children()[6]).text();
                    const fff1 = $($(aaa[k]).children()[7]).text();
                    const fff2 = $($(aaa[k]).children()[8]).text();

                    const insusepaTrash = $(aaa11[2]).val();

                    const insusepanumnum = $(aaa11[1]).val();

                    let trashHtml = ``;

                    switch (parseInt(insusepaTrash)) {
                        case 1:
                            trashHtml = `
                        <td>
                        </td>`;
                            break;
                        case 2:
                            trashHtml = `
                        <td class="table-success">
                        완료
                        </td>`;
                            break;
                    }

                    let bangHtml = ``;

                    switch (fff1) {
                        case "미정":
                            bangHtml = `
                    <option value="미정" selected>미정</option>
                    <option value="입금">입금</option>
                    <option value="카드">카드</option>`;
                            break;
                        case "입금":
                            bangHtml = `
                    <option value="미정">미정</option>
                    <option value="입금" selected>입금</option>
                    <option value="카드">카드</option>`;
                            break;
                        case "카드":
                            bangHtml = `
                    <option value="미정">미정</option>
                    <option value="입금">입금</option>
                    <option value="카드" selected>카드</option>`;
                            break;
                    }

                    htmls += `
                <tr>
                    <td>1회
                        <input type="hidden" value="` +
                            insusepanumnum +
                            `">
                    </td>
                    <td><input type="date" class="form-control" value="` +
                            fff +
                            `"></td>
                    <td>
                        <select class="form-select">
                            ` +
                            bangHtml +
                            `
                        </select>
                    </td>
                    <td>
                        <input type="text" class="form-control inInsuSepa" value="` +
                            fff2 +
                            `" data-type="currency">
                    </td>
                    ` +
                            trashHtml + `
                </tr>`;

                }
            }
            for (let k = 0; k < aaa.length; k++) {
                const aaa1 = $(aaa[k]).children()[0];
                const aaa11 = $(aaa1).children();

                if (realinsucontNum == $(aaa11[0]).val()) {

                    const fff = $($(aaa[k]).children()[1]).text();
                    const fff1 = $($(aaa[k]).children()[2]).text();
                    const fff2 = $($(aaa[k]).children()[3]).text();

                    const insusepaTrash = $(aaa11[2]).val();

                    const insusepanumnum = $(aaa11[1]).val();

                    let trashHtml = ``;

                    switch (parseInt(insusepaTrash)) {
                        case 1:
                            trashHtml = `
                        <td>
                        </td>`;
                            break;
                        case 2:
                            trashHtml = `
                        <td class="table-success">
                        완료
                        </td>`;
                            break;
                    }

                    let bangHtml = ``;

                    switch (fff1) {
                        case "미정":
                            bangHtml = `
                    <option value="미정" selected>미정</option>
                    <option value="입금">입금</option>
                    <option value="카드">카드</option>`;
                            break;
                        case "입금":
                            bangHtml = `
                    <option value="미정">미정</option>
                    <option value="입금" selected>입금</option>
                    <option value="카드">카드</option>`;
                            break;
                        case "카드":
                            bangHtml = `
                    <option value="미정">미정</option>
                    <option value="입금">입금</option>
                    <option value="카드" selected>카드</option>`;
                            break;
                    }

                    htmls += `
                <tr>
                    <td>` + $(aaa1)
                        .text()
                        .trim() +
                                `회
                        <input type="hidden" value="` +
                                insusepanumnum +
                                `">
                    </td>
                    <td><input type="date" class="form-control" value="` +
                                fff +
                                `"></td>
                    <td>
                        <select class="form-select">
                            ` +
                                bangHtml +
                                `
                        </select>
                    </td>
                    <td>
                        <input type="text" class="form-control inInsuSepa" value="` +
                                fff2 +
                                `" data-type="currency">
                    </td>
                    ` +
                                trashHtml + `
                </tr>`;

                }
            }

            $('#tb-md-insucont').html(htmls);
            $("input[data-type='currency']").bind('keyup keydown', function () {
                inputNumberFormat(this);
            });

            resolve();
        })
    }
});

$(document).on('click', '.choInsu', function () {

    const aaa = $(this)
        .parent()
        .prev()
        .prev()
        .prev()
        .prev()
        .children();
    const realinsucontNum = $(aaa[0]).val();

    $('#insuCont-insert').hide();

    makeModalInsuCont(realinsucontNum);

});

function makeModalInsuCont(insucontNum, cho) {

    if (cho) {
        LoadingWithMask()
            .then(getInsu)
            .then(getInsuSepa)
            .then(closeLoadingWithMask);
    } else {
        LoadingWithMask()
            .then(getInsu)
            .then(getInsuSepa)
            .then(showMdInsucont)
            .then(closeLoadingWithMask);
    }

    function getInsu() {
        return new Promise(function (resolve, reject) {
            const url = "/ve/veInsunum";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "insuno": insucontNum
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {
                    $('#insuContName').val(r[0].insuno);
                    $('#insuStDay').val(r[0].insudatestart);
                    $('#insuEndDay').val(r[0].insudateend);
                    $('#insuNum').val(r[0].insutime);
                    $('#inputZip').val(AddComma(r[0].insumoney));

                    resolve(insucontNum);
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

    function getInsuSepa(result) {
        return new Promise(function (resolve, reject) {
            const url = "/ve/veInsusepanum";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "insuno": result
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
                        let trashHtml = ``;

                        switch (parseInt(r[i].insusepatrash)) {
                            case 1:
                                trashHtml = `
                        <td>
                        </td>`;
                                break;
                            case 2:
                                trashHtml = `
                        <td class="table-success">
                        완료
                        </td>`;
                                break;
                        }

                        let bangHtml = ``;

                        switch (r[i].insusepapayment) {
                            case "미정":
                                bangHtml = `
                    <option value="미정" selected>미정</option>
                    <option value="입금">입금</option>
                    <option value="카드">카드</option>`;
                                break;
                            case "입금":
                                bangHtml = `
                    <option value="미정">미정</option>
                    <option value="입금" selected>입금</option>
                    <option value="카드">카드</option>`;
                                break;
                            case "카드":
                                bangHtml = `
                    <option value="미정">미정</option>
                    <option value="입금">입금</option>
                    <option value="카드" selected>카드</option>`;
                                break;
                        }

                        htmls += `
                <tr>
                    <td>` + (i + 1) +
                                `회
                        <input type="hidden" value="` + r[i].insusepano +
                                `">
                    </td>
                    <td><input type="date" class="form-control" value="` +
                                r[i].insusepaday +
                                `"></td>
                    <td>
                        <select class="form-select">
                            ` +
                                bangHtml +
                                `
                        </select>
                    </td>
                    <td>
                        <input type="text" class="form-control inInsuSepa" onfocus="this.select()" value="` +
                                AddComma(r[i].insusepamoney) +
                                `" data-type="currency">
                    </td>
                    ` +
                                trashHtml + `
                </tr>`;
                    }
                    $('#tb-md-insucont').html(htmls);
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

    function showMdInsucont(result) {
        return new Promise(function (resolve, reject) {

            const carN = $('#ve00').val();

            const bbb = $('#ve02').children()[0];
            const canNumNUm = $(bbb).text();

            $('#insuCarNum').val(carN);
            $('#insucontNum').val(result);
            $('#modal-insuCont-mh').text(canNumNUm + "  보험정보");

            $('#insuContName').attr("disabled", true);
            $('#insuStDay').attr("disabled", true);
            $('#insuEndDay').attr("disabled", true);
            $('#insuNum').attr("disabled", true);
            $('#inputZip').attr("disabled", true);

            $('#modal-insuCont').modal('show');
            resolve();
        })
    }

}

$(document).on('click', '#newInsuCont', function () {

    const carN = $('#ve00').val();

    const bbb = $('#ve02').children()[0];
    const canNumNUm = $(bbb).text();

    $('#insuCarNum').val(carN);
    $('#insucontNum').val('');
    $('#modal-insuCont-mh').text(canNumNUm + "  신규 보험정보 입력");

    $('#insuContName').val('');
    $('#insuStDay').val('');
    $('#insuEndDay').val('');
    $('#insuNum').val('1');
    $('#inputZip').val('0');

    $('#insuContName').attr("disabled", false);
    $('#insuStDay').attr("disabled", false);
    $('#insuEndDay').attr("disabled", false);
    $('#insuNum').attr("disabled", false);
    $('#inputZip').attr("disabled", false);

    $('#tb-md-insucont').html(
        ` <tr>
    <td>1회
        <input type="hidden" value="">
    </td>
    <td><input type="date" class="form-control"></td>
    <td>
        <select class="form-select">
            <option value="입금">미정</option>
            <option value="입금">입금</option>
            <option value="카드">카드</option>
        </select>
    </td>
    <td>
        <input type="text" class="form-control" value="" data-type="currency">
    </td>
    <td></td>
</tr>`
    );
    $("input[data-type='currency']").bind('keyup keydown', function () {
        inputNumberFormat(this);
    });

    $('#insuCont-insert').show();

    $('#modal-insuCont').modal('show');
});

$(document).on('change', '#insuStDay', function () {
    const tmpd = ($("#insuStDay").val()).split('-');

    let date = new Date(tmpd[0], parseInt(tmpd[1]) - 1, tmpd[2]);
    date.setFullYear(date.getFullYear() + 1);
    date.setDate(date.getDate() - 1);

    $("#insuEndDay").val(toStringByFormatting(date));
});

$(document).on('change', '#insuNum', function () {

    const timeNum = $('#insuNum').val();

    let htmls = ``;

    for (let i = 0; i < parseInt(timeNum); i++) {
        htmls += `                                    
    <tr>
        <td>` + (i + 1) + '회' +
                `
            <input type="hidden" value="">
        </td>
        <td><input type="date" class="form-control"></td>
        <td>
            <select class="form-select">
                <option value="미정">미정</option>
                <option value="입금">입금</option>
                <option value="카드">카드</option>
            </select>
        </td>
        <td>
            <input type="text" class="form-control" value="" data-type="currency">
        </td>
        <td>
        </td>
    </tr>`;
    }

    $('#tb-md-insucont').html(htmls);
    $("input[data-type='currency']").bind('keyup keydown', function () {
        inputNumberFormat(this);
    });
});

$(document).on('keyup', '.inInsuSepa', function (eInner) {
    var keyValue = eInner.which; //enter key
    if (keyValue == 13) {
        const aaa = $(this)
            .parent()
            .parent()
            .children();

        const bbb = $(aaa[0]).children()[0];
        const bbb1 = $(aaa[1]).children()[0];
        const bbb11 = $(aaa[2]).children()[0];
        const bbb111 = $(aaa[3]).children()[0];

        const insuSepaNum = $(bbb).val();
        const insuSepaDay = $(bbb1).val();
        const insuSepaSepa = $(bbb11).val();
        const insuSepaMoney = $(bbb111)
            .val()
            .replaceAll(',', '');

        if (!$(bbb1).val()) {
            alert('날짜를 입력해주세요.');
            $(bbb1).focus();
            return;
        }

        if (!$(bbb11).val()) {
            alert('수납방법을 입력해주세요.');
            $(bbb11).focus();
            return;
        }

        if (!$(bbb111).val()) {
            alert('금액을 입력해주세요.');
            $(bbb111).focus();
            return;
        }

        LoadingWithMask()
            .then(updateInsuSepa)
            .then(closeLoadingWithMask);

        function updateInsuSepa() {
            return new Promise(function (resolve, reject) {
                const url = "/ve/veinsusepaM";
                const headers = {
                    "Content-Type": "application/json",
                    "X-HTTP-Method-Override": "POST"
                };

                const params = {
                    "insusepaday": insuSepaDay,
                    "insusepapayment": insuSepaSepa,
                    "insusepamoney": insuSepaMoney,
                    "insusepano": insuSepaNum
                };

                $.ajax({
                    url: url,
                    type: "POST",
                    headers: headers,
                    caches: false,
                dataType: "json",
                    data: JSON.stringify(params),

                    success: function (r) {
                        makeModalInsuCont($('#insucontNum').val(), 1);
                        makeInsu();
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

$(document).on('click', '#insuCont-insert', function () {

    LoadingWithMask()
        .then(insertInsu)
        .then(insertInsuSepa)
        .then(closeLoadingWithMask);

    function insertInsu(result) {
        return new Promise(function (resolve, reject) {

            if (!$('#insuContName').val()) {
                alert('계약번호를 입력해주세요.');
                $('#insuContName').focus();
                closeLoadingWithMask();
                return;
            }

            if (!$('#insuStDay').val()) {
                alert('공제시작일을 입력해주세요.');
                $('#insuStDay').focus();
                closeLoadingWithMask();
                return;
            }

            if (!$('#insuEndDay').val()) {
                alert('공제종료일을 입력해주세요.');
                $('#insuEndDay').focus();
                closeLoadingWithMask();
                return;
            }

            if (!$('#insuNum').val()) {
                alert('분할횟수를 입력해주세요.');
                $('#insuNum').focus();
                closeLoadingWithMask();
                return;
            }

            if (!$('#inputZip').val() || parseInt($('#inputZip').val()) < 1) {
                alert('총분담금을 입력해주세요.');
                $('#inputZip').focus();
                closeLoadingWithMask();
                return;
            }

            const url = "/ve/veinsertinsu";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "insuno": $('#insuContName').val(),
                "carnumber": $('#ve00').val(),
                "insudatestart": $('#insuStDay').val(),
                "insudateend": $('#insuEndDay').val(),
                "insutime": $('#insuNum').val(),
                "insumoney": $('#inputZip')
                    .val()
                    .replaceAll(',', '')
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),
                success: function (r) {
                    resolve($('#insuContName').val());
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

    function insertInsuSepa(result) {
        return new Promise(function (resolve, reject) {
            const url = "/ve/veinsertinsusepa";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            let params = new Array();

            const aaa = $('#tb-md-insucont').children();

            for (let i = 0; i < aaa.length; i++) {
                const bbb = $(aaa[i]).children()[0];
                const bbb1 = $(aaa[i]).children()[1];
                const bbb11 = $(aaa[i]).children()[2];
                const bbb111 = $(aaa[i]).children()[3];

                const ccc = $(bbb)
                    .text()
                    .replaceAll('회', '');
                const ccc1 = $(bbb1).children();
                const ccc11 = $(bbb11).children();
                const ccc111 = $(bbb111).children();

                if (!$(ccc1).val()) {
                    alert('수납예정일을 입력해주세요.');
                    $(ccc1).focus();
                    closeLoadingWithMask();
                    return;
                }

                if (!$(ccc111).val()) {
                    alert('수납액을 입력해주세요.');
                    $(ccc111).focus();
                    closeLoadingWithMask();
                    return;
                }

                const asd = {
                    "insuno": result,
                    "insusepapayment": $(ccc11).val(),
                    "insusepamoney": $(ccc111)
                        .val()
                        .replaceAll(',', ''),
                    "insusepaday": $(ccc1).val(),
                    "insusepatime": ccc
                };
                params.push(asd);
            }

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),
                success: function (r) {
                    if (r > 0) {
                        alert("보험정보 입력");
                        $('#modal-insuCont').modal('hide');
                        makeInsu();
                        resolve();
                    } else if (r == 0) {
                        alert("보험정보 입력 실패!\n\n시스템을 확인해주세요.")
                        location.reload();
                    } else if (r == -1) {
                        alert("보험정보 입력 실패!\n\n데이터베이스 처리 과정에 문제가 발생하였습니다.")
                        location.reload();
                    } else if (r == -2) {
                        alert("보험정보 입력 실패!\n\n시스템을 확인해주세요.")
                        location.reload();
                    }
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

});

$(document).on('click', '#insuCont-del', function () {
    const aaa = confirm("보험정보를 완전삭제하시겠습니까?");

    if (aaa) {

        LoadingWithMask()
            .then(delInsu)
            .then(closeLoadingWithMask);

        function delInsu() {
            return new Promise(function (resolve, reject) {
                const url = "/ve/vedelinsu";
                const headers = {
                    "Content-Type": "application/json",
                    "X-HTTP-Method-Override": "POST"
                };

                const params = {
                    "insuno": $('#insuContName').val()
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
                            alert("보험정보 삭제");
                            $('#modal-insuCont').modal('hide');
                            makeInsu();
                            resolve();
                        } else if (r == 0) {
                            alert("보험정보 삭제 실패!\n\n시스템을 확인해주세요.")
                            location.reload();
                        } else if (r == -1) {
                            alert("보험정보 삭제 실패!\n\n데이터베이스 처리 과정에 문제가 발생하였습니다.")
                            location.reload();
                        } else if (r == -2) {
                            alert("보험정보 삭제 실패!\n\n시스템을 확인해주세요.")
                            location.reload();
                        }
                    },
                    error: (jqXHR) => {
                        loginSession(jqXHR.status);
                    }
                })
            })
        }
    }
});