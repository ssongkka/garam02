$(document).ready(function () {});

$(document).on('click', '#md-gas', function () {

    const now = new Date();
    const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
    const fff = toStringByFormatting(oneMonthAgo);

    $('#yearMonthgas').val(fff.split('-')[0] + '-' + fff.split('-')[1]);

    makeGas();

});

$(document).on('click', '#fnUpMonthgas', function () {
    const now = new Date($('#yearMonthgas').val());
    const oneMonthAgo = new Date(now.setMonth(now.getMonth() + 1));
    const fff = toStringByFormatting(oneMonthAgo);

    $('#yearMonthgas').val(fff.split('-')[0] + '-' + fff.split('-')[1]);

    makeGas();
});

$(document).on('click', '#fnDownMonthgas', function () {
    const now = new Date($('#yearMonthgas').val());
    const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
    const fff = toStringByFormatting(oneMonthAgo);

    $('#yearMonthgas').val(fff.split('-')[0] + '-' + fff.split('-')[1]);

    makeGas();
});

$(document).on('change', '#yearMonthgas', function () {
    makeGas();
});

function makeGas(cho) {
    $('#gasTb').html(``);

    if (cho) {
        LoadingWithMask()
            .then(getGasmonth)
            .then(closeLoadingWithMask);
    } else {
        LoadingWithMask()
            .then(getGasmonth)
            .then(getGasVe)
            .then(showGasModal)
            .then(closeLoadingWithMask);
    }

    function getGasVe(result) {
        return new Promise(function (resolve, reject) {
            const url = "/ve/veselgas";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const dayyyy = $('#yearMonthgas').val() + '-01';

            const params = {
                "inday": dayyyy,
                "outday": dayyyy
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {

                    for (let i = 0; i < r.length; i++) {
                        if (result.indexOf(r[i].carnumber) < 0) {
                            for (let m = 0; m < dbCompa.length; m++) {
                                if (r[i].owner == dbCompa[m].company) {
                                    let veName = '';

                                    for (let l = 0; l < dbVe.length; l++) {
                                        if (r[i].carnumber == dbVe[l].carnumber) {
                                            veName = dbVe[l].vehicle2;
                                        }
                                    }

                                    result += `
                        <tr>
                            <td>` + veName +
                                            `
                                <input type="hidden" value="">
                                <input type="hidden" value="` +
                                            r[i].carnumber +
                                            `">
                            </td>
                            <td>
                                <div class="input-group">
                                    <input type="text" class="form-control" data-type="currency" value="">
                                    <span class="input-group-text">Km</span>
                                </div>
                            </td>
                            <td>
                                <div class="input-group">
                                    <input type="text" class="form-control" data-type="currency" value="">
                                    <span class="input-group-text">L</span>
                                </div>
                            </td>
                            <td>
                                <div class="input-group">
                                    <input type="text" class="form-control inGasSepa" data-type="currency" value="">
                                    <span class="input-group-text">원</span>
                                </div>
                            </td>
                            <td class="tdRight">
                                <div class="input-group">
                                    <span class="spanGas"></span>
                                    <span class="input-group-text">Km/L</span>
                                </div>
                            </td>
                            <td class="tdRight">
                                <div class="input-group">
                                    <span class="spanGas"></span>
                                    <span class="input-group-text">원/Km</span>
                                </div>
                            </td>
                        </tr>`;
                                }
                            }
                        }
                    }

                    $('#gasTb').html(result);

                    $("input[data-type='currency']").bind('keyup keydown', function () {
                        inputNumberFormat(this);
                    });

                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

    function getGasmonth(result) {
        return new Promise(function (resolve, reject) {
            const url = "/ve/veselgasmonth";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "vegasyearmonth": $('#yearMonthgas').val()
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

                        let veName = '';

                        for (let l = 0; l < dbVe.length; l++) {
                            if (r[i].carnumber == dbVe[l].carnumber) {
                                veName = dbVe[l].vehicle2;
                            }
                        }

                        htmls += `
                    <tr>
                        <td>` + veName +
                                `
                            <input type="hidden" value="` + r[i].vegasseq +
                                `">
                            <input type="hidden" value="` + r[i].carnumber +
                                `">
                        </td>
                        <td>
                            <div class="input-group">
                                <input type="text" class="form-control" data-type="currency" value="` +
                                AddComma(r[i].km) +
                                `">
                                <span class="input-group-text">Km</span>
                            </div>
                        </td>
                        <td>
                            <div class="input-group">
                                <input type="text" class="form-control" data-type="currency" value="` +
                                AddComma(r[i].liter) +
                                `">
                                <span class="input-group-text">L</span>
                            </div>
                        </td>
                        <td>
                            <div class="input-group">
                                <input type="text" class="form-control inGasSepa" data-type="currency" value="` +
                                AddComma(r[i].vegasmoney) +
                                `">
                                <span class="input-group-text">원</span>
                            </div>
                        </td>
                        <td class="tdRight">
                            <div class="input-group">
                                <span class="spanGas">` +
                                AddComma(r[i].kml) +
                                `</span>
                                <span class="input-group-text">Km/L</span>
                            </div>
                        </td>
                        <td class="tdRight">
                            <div class="input-group">
                                <span class="spanGas">` +
                                AddComma(r[i].wonkm) +
                                `</span>
                                <span class="input-group-text">원/Km</span>
                            </div>
                        </td>
                    </tr>`;
                    }
                    resolve(htmls);
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }

    function showGasModal() {
        return new Promise(function (resolve, reject) {
            $('#modal-gasCont').modal('show');
            resolve();
        })
    }
}

$(document).on('keyup', '.inGasSepa', function (eInner) {
    var keyValue = eInner.which;
    if (keyValue == 13) {
        const aaa = $(this)
            .parent()
            .parent()
            .parent();
        const aaa1 = $(aaa).children();

        const bbb = $(aaa1[0]).children()[1];

        const ccc = $(aaa1[1]).children();
        const ccc1 = $(ccc).children()[0];

        const ddd = $(aaa1[2]).children();
        const ddd1 = $(ddd).children()[0];

        const cannn = $(bbb)
            .val()
            .replaceAll(',', '');
        const distan = $(ccc1)
            .val()
            .replaceAll(',', '');
        const gasL = $(ddd1)
            .val()
            .replaceAll(',', '');

        const gasM = $(this)
            .val()
            .replaceAll(',', '');

        const kmL = round2(distan / gasL);
        const wonKm = Math.round(gasM / distan);

        const ggg = $(aaa1[4]).children();
        const ggg1 = $(ggg).children()[0];

        const fff = $(aaa1[5]).children();
        const fff1 = $(fff).children()[0];

        $(ggg1).text(kmL);
        $(fff1).text(wonKm);
    }
});

$(document).on('click', '#gasContBtn', function () {
    closeGasModal();
});

$(document).on('click', '#gasContX', function () {
    closeGasModal();
});

function closeGasModal() {
    $('#modal-gasCont').modal('hide');
    location.reload();
}
