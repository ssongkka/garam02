function makeModalIl(dday, cctono) {

    LoadingWithMask()
        .then(getAllo1)
        .then(closeLoadingWithMask);

    function getAllo1() {
        return new Promise(function (resolve, reject) {
            const url = "/allo/selAllo2fir";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "ctmno": cctono,
                "stday": dday
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

                    let tell = `연락처 없음`;
                    let tell1 = ``;
                    if (r[0].ctmtel1) {
                        tell = r[0].ctmtel1;
                        tell1 = r[0]
                            .ctmtel1
                            .replaceAll('-', '');
                        const aaa = `<a href="tel:` + tell1 + `">` + tell + `<a>`;
                        $('#alloMdctoTel').html(aaa);
                    } else {
                        $('#alloMdctoTel').text(tell);
                    }

                    let addd = ``;
                    if (r[0].ctmaddress) {
                        addd = r[0].ctmaddress;
                    }

                    $('#alloMdctmNo').text(r[0].ctmno);
                    $('#alloMdctoName').text(r[0].ctmname);
                    $('#alloMdctoAdd').text(addd);

                    let htmls = ``;
                    for (let i = 0; i < r.length; i++) {

                        let stt = '미정';
                        if (r[i].stt) {
                            stt = r[i].stt;
                        }

                        let edt = '/미정';
                        if (r[i].endt) {
                            edt = '/' + r[i].endt;
                        }

                        let buss = ``;
                        switch (r[i].bus) {
                            case '대형':
                                buss = `big45`
                                break;
                            case '중형':
                                buss = `big25`
                                break;
                            case '우등':
                                buss = `big28`
                                break;
                        }

                        htmls += `
                        <div class="alloCont-item">
                            <table class="table">
                                <colgroup></colgroup>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div class="allTitle">
                                                <div class="allTitle-item allTitle-desty">` +
                                r[i].desty +
                                `</div>
                                                <div class="allTitle-item allTitle-busnum ` +
                                buss + `">` + r[i].bus + ' ' + r[i].num +
                                `</div>
                                                <div class="allTitle-item allTitle-conm">` +
                                AddComma(r[i].conm) + '(' + AddComma(r[i].numm) + ')' +
                                `</div>
                                                <div class="allTitle-item allTitle-cont">` +
                                r[i].cont +
                                `</div>
                                                <div class="allTitle-item allTitle-rps">` +
                                r[i].rsvpstp +
                                `</div>
                                                <div class="allTitle-item allTitle-stt">` +
                                stt + edt +
                                `</div>
                                                <div class="allTitle-item allTitle-Ch">
                                                    <button class="btn card-song btnAlloCh">
                                                        <i class="fa-solid fa-pen-to-square"></i>
                                                    </button>
                                                </div>
                                                <div class="allTitle-item allTitle-atM">
                                                    <input
                                                        type="text"
                                                        data-type="currency"
                                                        class="allo alloAllM"
                                                        onfocus="this.select()"
                                                        value="0">
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="alloAllo">`;

                        for (let k = 0; k < r[i].num; k++) {

                            let numm = '';
                            if (k < 9) {
                                numm = `0` + (k + 1);
                            } else {
                                numm = (k + 1);
                            }

                            htmls += `
                        <div class="input-group">
                            <div class="input-group-text alloNumClk">` +
                                    numm +
                                    `</div>
                            <input type="text" class="form-control" list="car-info" name="veAlloName">
                            <input type="hidden" value="` +
                                    r[i].rsvt +
                                    `">
                            <input type="hidden" value="` + dday +
                                    `">
                            <input type="hidden" value="` + r[i].dayst +
                                    `">
                            <input type="hidden" value="` + r[i].operno +
                                    `">
                            <input type="hidden" value="` + r[i].opercom +
                                    `">
                            <input type="hidden" value="` + r[i].opercar +
                                    `">
                            <input type="hidden" value="` + r[i].operid +
                                    `">
                            <input type="hidden" value="` + r[i].atlm +
                                    `">
                            <input type="hidden" value="` + r[i].opertype +
                                    `">
                            <input type="hidden" value="` + r[i].operconfirm +
                                    `">
                            <input type="hidden" value="` + r[i].opertrash +
                                    `">
                        </div>`;
                        }

                        htmls += `
                        </div>
                        </div>
                    </div>`;
                    }

                    $('#alloContMd').html(htmls);
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

    $('#modalAllo2').modal('show');
}