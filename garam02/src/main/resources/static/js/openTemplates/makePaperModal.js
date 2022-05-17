$(document).ready(function () {});

$(document).on('click', '#btnContPaper', function () {
    $('#modalPaper0').modal('hide');
    $('#modalPaper1').modal('show');
});

$(document).on('click', '#btnAlloPaper', function () {

    modalPaper2Show1().then(modalPaper2Show2);

    function modalPaper2Show1() {
        return new Promise(function (resolve, reject) {
            LoadingWithMask()
                .then(setPapperAllo1)
                .then(setPapperAllo2)
                .then(setEnd)
                .then(closeLoadingWithMask);

            function setEnd() {
                return new Promise(function (resolve, reject) {
                    $('input:checkbox[name=paperCh]').prop('checked', true);

                    $('#selCompa').val(dbuser.company);

                    $('#modalPaper0').modal('hide');
                    resolve();
                })
            }
            resolve();
        })
    }
    function modalPaper2Show2() {
        return new Promise(function (resolve, reject) {
            $('#modalPaper2').modal('show');
            resolve();
        })
    }

});

$(document).on('click', '.btnUp', function () {
    const aaa = $(this).parent();
    const aaa1 = $(aaa).parent();

    const bbb = $(aaa1).prev();

    setUp().then(setOrder);

    function setUp() {
        return new Promise(function (resolve, reject) {
            $(bbb).before(aaa1);
            resolve()
        })
    }
});

$(document).on('click', '.btnDown', function () {
    const aaa = $(this).parent();
    const aaa1 = $(aaa).parent();

    const bbb = $(aaa1).next();

    setUp().then(setOrder);

    function setUp() {
        return new Promise(function (resolve, reject) {
            $(bbb).after(aaa1);
            resolve()
        })
    }
});

function setOrder() {
    return new Promise(function (resolve, reject) {
        const aaa = $('#tb-paper2').children();

        for (let i = 0; i < aaa.length; i++) {
            const bbb = $(aaa[i]).children()[0];
            $(bbb).text(i + 1);
        }
        resolve();
    })
}

function setPapperAllo1() {
    return new Promise(function (resolve, reject) {
        const url = "/papper/papperAllo1";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const params = {
            "ctmno": $('#paperCtm').val(),
            "stday": $('#paperDay').val()
        };

        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            caches: false,
            dataType: "json",
            data: JSON.stringify(params),

            success: function (r) {
                console.log(r);

                let tmpArr = new Array();

                let tmpRsvtArr = new Array();

                let htmls = ``;

                for (let i = 0; i < r.length; i++) {
                    tmpArr.push(r[i].rsvt);

                    htmls += `
                <div class="paper2-allo-item">
                    <div class="papperTitleRsvt">
                    <h4>
                    <i class="fas fa-map-marker-alt"></i>` +
                            r[i].desty +
                            `</h4>
                    <input type="checkbox" name="papperRsvtCh" checked>
                    </div>
                    <div>
                        <input type="hidden" value="` +
                            r[i].rsvt +
                            `">
                        <input type="hidden" value="` + r[i].num +
                            `">
                        <table class="table table-striped table-bordered">
                            <colgroup>
                                <col width="5%">
                                <col width="20%">
                                <col width="15%">
                                <col width="15%">
                                <col width="21%">
                                <col width="8%">
                                <col width="8%">
                                <col width="8%">
                            </colgroup>
                            <thead>
                                <th>#</th>
                                <th>차량번호</th>
                                <th>운행승무원</th>
                                <th>서류</th>
                                <th>비고</th>
                                <th>서류1</th>
                                <th>서류2</th>
                                <th>서류3</th>
                            </thead>
                            <tbody name="papperTb">`;

                    for (let k = 0; k < r[i].num; k++) {
                        htmls += `
                    <tr>
                        <td>
                            <input type="hidden" value="` +
                                r[i].rsvt +
                                `">
                            <input type="hidden" value="` + (k + 1) +
                                `">
                            <input type="hidden" value="">
                            <input type="hidden" value="">
                            <input type="hidden" value="">
                            ` +
                                (k + 1) +
                                `
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td><input type="text" class="form-control" value=""></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>`;
                    }

                    htmls += ` </tbody>
                        </table>
                    </div>
                </div>`;
                }

                $('#paper2-allo').html(htmls);
                resolve(tmpArr);
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    })
}

function setPapperAllo2(result) {
    return new Promise(function (resolve, reject) {
        const url = "/papper/papperAllo2";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        let params = new Array();

        for (let i = 0; i < result.length; i++) {
            const asd = {
                "rsvt": result[i]
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
                console.log(r);

                $('tbody[name="papperTb"]').each(function () {
                    const aaa = $(this).children();
                    for (let k = 0; k < aaa.length; k++) {

                        const bbb = $(aaa[k]).children()[0];
                        const bbb1 = $(bbb).children()[0];
                        const rsvtttt = $(bbb1).val();

                        const ccc = $(bbb).children()[1];
                        const numbersss = $(ccc).val();

                        console.log(rsvtttt);

                        const iconOk = '<i class="fa-solid fa-check" style="color: darkgreen;"></i>';
                        const iconNo = '<i class="fa-solid fa-xmark" style="color: darkred;"></i>';

                        for (let i = 0; i < r.length; i++) {
                            if (rsvtttt == r[i].rsvt && numbersss == r[i].operno) {
                                const asd = $(aaa[k]).children()[1];
                                $(asd).text(r[i].vehicle);

                                let ididid = '';
                                if (r[i].id) {
                                    for (let l = 0; l < dbEmp.length; l++) {
                                        if (r[i].id == dbEmp[l].id) {
                                            ididid = dbEmp[l].name;
                                        }
                                    }
                                }

                                const asd1 = $(aaa[k]).children()[2];
                                $(asd1).text(ididid);

                                let jukman = '';
                                if (r[i].jukd) {
                                    for (let l = 0; l < dbEmp.length; l++) {
                                        if (r[i].jukd == dbEmp[l].id) {
                                            jukman = dbEmp[l].name;
                                        }
                                    }
                                }

                                const asd11 = $(aaa[k]).children()[3];
                                $(asd11).text(jukman);

                                const asdd11 = $(aaa[k]).children()[4];
                                const asdd111 = $(asdd11).children()[0];
                                $(asdd111).val(r[i].opermemo);

                                const asd111 = $(aaa[k]).children()[5];
                                if (r[i].reg) {
                                    $(asd111).html(iconOk);
                                } else {
                                    $(asd111).html(iconNo);
                                }

                                const asd1111 = $(aaa[k]).children()[6];
                                if (r[i].insu) {
                                    $(asd1111).html(iconOk);
                                } else {
                                    $(asd1111).html(iconNo);
                                }

                                const asd11111 = $(aaa[k]).children()[7];
                                if (r[i].juk) {
                                    $(asd11111).html(iconOk);
                                } else {
                                    $(asd11111).html(iconNo);
                                }

                            }
                        }

                    }
                });
            }
        });

        $('#rsvttt').val();

        resolve();

    })
}

$(document).on('click', '#btnPapperMake', function () {

    const ch = confirm("배차 서류 PDF 파일이 다운로드하시겠습니까?\n\n다운로드 완료 후 '다운로드 폴더'를 확인해주세요.");

    if (ch) {
        LoadingWithMask()
            .then(insertMemo)
            .then(makePapper)
            .then(closeLoadingWithMask);
    }
});

function makePapper() {
    return new Promise(function (resolve, reject) {

        let tmpArr = '';

        const aaa = $('#tb-paper2').children();

        for (let i = 0; i < aaa.length; i++) {
            const bbb = $(aaa[i]).children();
            const bbb1 = $(bbb[0]).text();

            const bbb2 = $(bbb[1]).children();;
            const bbb22 = $(bbb2).is(':checked');

            const numm = bbb1;

            if (bbb22) {
                tmpArr += $(bbb2).val();
            }
        }

        $('#paperCh').val(tmpArr);
        $('#companyyy').val($('#selCompa').val());

        $('#formPapper').submit();

        resolve();
    })
}

function insertMemo() {
    return new Promise(function (resolve, reject) {
        const url = "/papper/insertMemo";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        let params = new Array();

        const aaa = $('#paper2-allo').children();

        for (let i = 0; i < aaa.length; i++) {

            const bbb = $(aaa[i]).children()[1];
            const bbb1 = $(bbb).children()[1];
            const bbb2 = $(bbb1).children()[2];
            const bbb4 = $(bbb2).children();

            const bbb3 = $(bbb).children()[0];

            const rsvttt = $(bbb3).val();

            for (let k = 0; k < bbb4.length; k++) {
                const ccc = $(bbb4[k]).children();

                const carnnn = $(ccc[0]).text();
                const iidd = $(ccc[1]).text();

                const tmpp = $(ccc[7]).children();
                const memmo = $(tmpp).val();

                const asd = {
                    "opercar": carnnn,
                    "operid": iidd,
                    "rsvt": rsvttt,
                    "operday": $('#paperDay').val(),
                    "opermemo": memmo
                };

                params.push(asd);
            }
        }

        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            caches: false,
            dataType: "json",
            data: JSON.stringify(params),
            success: function (r) {
                if (r > -1) {
                    resolve();
                } else {
                    closeLoadingWithMask();
                }
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    })
}