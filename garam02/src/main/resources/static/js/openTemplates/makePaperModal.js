$(document).ready(function () {
    $('#selCompa').val(dbuser.company);
});

$(document).on('click', '#btnContPaper', function () {

    $(document).on('show.bs.modal', '#modalPaper1', function () {
        $('#modalPaper0').modal('hide');
    })
    $('#modalPaper1').modal('show');
});

$(document).on('click', '#btnAlloPaper', function () {
    $(document).on('show.bs.modal', '#modalPaper2', function () {
        LoadingWithMask()
            .then(setPapperAllo1)
            .then(setPapperAllo2)
            .then(closeLoadingWithMask);

        $('#modalPaper0').modal('hide');
    })
    $('#modalPaper2').modal('show');
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
            "stday": $('#paperDay').val(),
            "endday": $('#paperDay').val()
        };

        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            dataType: "json",
            data: JSON.stringify(params),

            success: function (r) {
                let tmpArr = new Array();

                let htmls = ``;

                for (let i = 0; i < r.length; i++) {
                    tmpArr.push(r[i].rsvt);

                    htmls += `
                <div class="paper2-allo-item">
                    <div>
                        <h4>
                            <i class="fas fa-map-marker-alt"></i>` +
                            r[i].desty +
                            `</h4>
                    </div>
                    <div>
                        <input type="hidden" value="` +
                            r[i].rsvt +
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
                            <tbody></tbody>
                        </table>
                    </div>
                </div>`;
                }
                $('#paper2-allo').html(htmls);
                resolve(tmpArr);
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

        let tmpRsvt = '';

        for (let k = 0; k < result.length; k++) {

            if (k < 1) {
                tmpRsvt += result[k];
            } else {
                tmpRsvt += '/////' + result[k];
            }

            const params = {
                "rsvt": result[k]
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

                        let ve = '';
                        let na = '';
                        let add = '';
                        let cna = '';
                        let memoo = '';

                        if (r[i].vehicle) {
                            ve = r[i].vehicle;
                        }
                        if (r[i].name) {
                            na = r[i].name;
                        }
                        if (r[i].ctmaddress) {
                            add = r[i].ctmaddress;
                        }
                        if (r[i].ctmname) {
                            cna = r[i].ctmname;
                        }
                        if (r[i].opermemo) {
                            memoo = r[i].opermemo;
                        }

                        const iconOk = '<i class="fa-solid fa-check" style="color: darkgreen;"></i>';
                        const iconNo = '<i class="fa-solid fa-xmark" style="color: darkred;"></i>';

                        let reg = '';
                        let insu = '';
                        let juk = '';

                        if (r[i].ctmemail) {
                            reg = iconOk;
                        } else {
                            reg = iconNo;
                        }

                        if (r[i].ctmfax) {
                            insu = iconOk;
                        } else {
                            insu = iconNo;
                        }

                        if (r[i].ctmcompanum) {
                            juk = iconOk;
                        } else {
                            juk = iconNo;
                        }

                        htmls += `
                <tr>
                    <td class="thNone">` + r[i].opercar +
                                `</td>
                    <td class="thNone">` + r[i].operid +
                                `</td>
                    <td class="thNone">` + cna +
                                `</td>
                    <td>` + (i + 1) +
                                `</td>
                    <td>` + ve +
                                `</td>
                    <td>` + na +
                                `</td>
                    <td>` + add +
                                `</td>
                    <td>
                        <input type="text" class="form-control" value="` +
                                memoo +
                                `">
                    </td>
                    <td>` + reg +
                                `</td>
                    <td>` + insu +
                                `</td>
                    <td>` + juk +
                                `</td>
                </tr>`
                    }

                    const aaa = $('#paper2-allo').children();

                    for (let j = 0; j < aaa.length; j++) {
                        const aaa1 = $(aaa[j]).children();
                        const aaa2 = $(aaa1[1]).children()[0];
                        const aaa3 = $(aaa2).val();

                        if (result[k] == aaa3) {
                            const bbb = $(aaa2).next();
                            const bbb1 = $(bbb).children()[2];
                            $(bbb1).html(htmls);
                        }
                    }
                }
            })
        }
        $('#rsvttt').val(tmpRsvt);
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

        console.log("aaa.length  " + aaa.length);

        for (let i = 0; i < aaa.length; i++) {

            const bbb = $(aaa[i]).children()[1];
            const bbb1 = $(bbb).children()[1];
            const bbb2 = $(bbb1).children()[2];
            const bbb4 = $(bbb2).children();

            console.log(bbb2);

            const bbb3 = $(bbb).children()[0];

            const rsvttt = $(bbb3).val();

            for (let k = 0; k < bbb4.length; k++) {
                const ccc = $(bbb4[k]).children();

                const carnnn = $(ccc[0]).text();
                const iidd = $(ccc[1]).text();

                const tmpp = $(ccc[7]).children();
                const memmo = $(tmpp).val();

                console.log("rsvttt   " + rsvttt);
                console.log("carnnn   " + carnnn);
                console.log("iidd   " + iidd);
                console.log("memmo   " + memmo);
                console.log("day   " + $('#paperDay').val());

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
            dataType: "json",
            data: JSON.stringify(params),
            success: function (r) {
                if (r > -1) {
                    resolve();
                } else {
                    closeLoadingWithMask();
                }
            }
        })
    })
}