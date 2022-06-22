$(document).ready(function () {
    makeNoManage()
});

function makeNoManage() {

    LoadingWithMask()
        .then(getNoManage)
        .then(closeLoadingWithMask);

    function getNoManage() {
        return new Promise(function (resolve, reject) {
            const url = "/nomanage/selnom";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {};

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                caches: false,
                dataType: "json",
                data: JSON.stringify(params),

                success: function (r) {
                    console.log(r);

                    let arrTmpCtmNo = new Array();
                    for (let i = 0; i < r.length; i++) {
                        arrTmpCtmNo.push(r[i].ctmno);
                    }

                    const uniqueCtmNo = [...new Set(arrTmpCtmNo)];

                    let tmpArrName = new Array();
                    let tmpArrTel = new Array();
                    let tmpArrSepa = new Array();

                    for (let k = 0; k < uniqueCtmNo.length; k++) {
                        for (let i = 0; i < r.length; i++) {
                            if (r[i].ctmno == uniqueCtmNo[k]) {
                                tmpArrName.push(r[i].ctmname);
                                tmpArrTel.push(r[i].ctmtel1);
                                tmpArrSepa.push(r[i].ctmsepa);
                                break;
                            }
                        }
                    }

                    let sumAll = 0;
                    let sumIl = 0;
                    let sumHak = 0;
                    let sumGu = 0;

                    let htmlsIl = ``;
                    let htmlsHak = ``;
                    let htmlsGu = ``;

                    let cntIl = 0;
                    let cntHak = 0;
                    let cntGu = 0;

                    for (let k = 0; k < uniqueCtmNo.length; k++) {

                        let htmlsTb = ``;
                        let cntRsvt = 0;
                        let sumRsvt = 0;

                        for (let i = 0; i < r.length; i++) {
                            if (r[i].ctmno == uniqueCtmNo[k]) {

                                cntRsvt++;

                                let edd = '';
                                if (r[i].endday && r[i].stday != r[i].endday) {
                                    edd = r[i].endday
                                }

                                let desttt = '';
                                if (r[i].desty) {
                                    desttt = r[i].desty
                                }

                                let busss = '';
                                if (r[i].bus) {
                                    busss = r[i].bus
                                }

                                let nummm = '';
                                if (r[i].num) {
                                    nummm = r[i].num
                                }

                                let conttt = '';
                                if (r[i].cont) {
                                    conttt = r[i].cont
                                }

                                let conmmm = 0;
                                if (r[i].conm) {
                                    conmmm = r[i].conm
                                }

                                let rsvpstppp = '';
                                if (r[i].rsvpstp) {
                                    rsvpstppp = r[i].rsvpstp
                                }

                                htmlsTb += `
                            <tr class="mainNoManageMore">
                                <td class="">` +
                                        cntRsvt +
                                        `</td>
                                <td class="">` + r[i].stday +
                                        `</td>
                                <td class="">` + edd +
                                        `</td>
                                <td class="">` + desttt +
                                        `</td>
                                <td class="">` + busss +
                                        `</td>
                                <td class="">` + nummm +
                                        `</td>
                                <td class="">` + conttt +
                                        `</td>
                                <td class="tdRight">` + AddComma(conmmm) +
                                        `</td>
                                <td class="tdRight">` + AddComma(
                                    r[i].id1
                                ) +
                                        `</td>
                                <td class="tdRight">` + AddComma(
                                    r[i].id2
                                ) +
                                        `</td>
                                <td class="">` + rsvpstppp +
                                        `</td>
                            </tr>`;
                                sumRsvt = sumRsvt + parseInt(r[i].id2);
                            }
                        }

                        sumAll = sumAll + parseInt(sumRsvt);

                        switch (parseInt(tmpArrSepa[k])) {
                            case 0:
                                cntIl++;

                                sumIl = sumIl + parseInt(sumRsvt);

                                let csssss2 = 'trBorder';
                                if (cntIl < 2) {
                                    csssss2 = 'trBorder1';
                                }

                                let cccssss = '';
                                if (cntIl % 2 != 0) {
                                    cccssss = ' style="background-color: #0000000d;"';
                                }

                                htmlsIl += `
                            <div class="accordion-item">
                                <div class="accordion-header" id="noManageIlHeading` +
                                        cntIl +
                                        `">
                                    <button
                                        class="accordion-button collapsed noManage-nav-btn"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#noManageIlcollapse` +
                                        cntIl +
                                        `"
                                        aria-expanded="false"
                                        aria-controls="noManageIlcollapse` +
                                        cntIl +
                                        `">
                                        <table class="table-hover noManageTable">
                                                <colgroup>
                                                    <col width="20%"/>
                                                    <col width="5%"/>
                                                    <col width="10%"/>
                                                    <col width="79%"/>
                                                </colgroup>
                                                <tbody>
                                                        <tr class="` +
                                        csssss2 +
                                        `">
                                                        <td class="tdBorder1"` +
                                        cccssss + `>` + tmpArrName[k] +
                                        `</td>
                                                        <td class="tdBorder2 tdRight"` +
                                        cccssss + `>` + cntRsvt +
                                        `건</td>
                                                        <td class="tdBorder2 tdRight"` +
                                        cccssss + `>` + AddComma(sumRsvt) +
                                        `</td>
                                                        <td class="tdBorder2"` +
                                        cccssss + `>` + tmpArrTel[k] +
                                        `</td>
                                                        </tr>
                                                </tbody>
                                            </table>
                                    </button>
                                </div>
                                <div
                                    id="noManageIlcollapse` +
                                        cntIl +
                                        `"
                                    class="accordion-collapse collapse"
                                    aria-labelledby="noManageIlHeading` +
                                        cntIl +
                                        `">
                                    <div class="accordion-body NoManageacco-body">
                                        <table class="table table-striped table-bordered noManageTableIn">
                                            <colgroup>
                                                <col width="4%"/>
                                                <col width="8%"/>
                                                <col width="8%"/>
                                                <col width="auto"/>
                                                <col width="5%"/>
                                                <col width="5%"/>
                                                <col width="6%"/>
                                                <col width="10%"/>
                                                <col width="10%"/>
                                                <col width="10%"/>
                                                <col width="auto"/>
                                            </colgroup>
                                            <thead class="table-light">
                                                <tr>
                                                    <th class="">#</th>
                                                    <th class="">출발일</th>
                                                    <th class="">도착일</th>
                                                    <th class="">목적지</th>
                                                    <th class="sortStr">차량</th>
                                                    <th class="">대수</th>
                                                    <th class="">부가세</th>
                                                    <th class="">계약금액</th>
                                                    <th class="">입금액</th>
                                                    <th class="">잔금</th>
                                                    <th class="">출발장소</th>
                                                </tr>
                                            </thead>
                                            <tbody>` +
                                        htmlsTb +
                                        `</tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>`
                                break;
                            case 1:
                                cntHak++;

                                sumHak = sumHak + parseInt(sumRsvt);

                                let csssss1 = 'trBorder';
                                if (cntHak < 2) {
                                    csssss1 = 'trBorder1';
                                }

                                let cccssss1 = '';
                                if (cntHak % 2 != 0) {
                                    cccssss1 = ' style="background-color: #0000000d;"';
                                }

                                htmlsHak += `
                            <div class="accordion-item">
                                <div class="accordion-header" id="noManageHakHeading` +
                                        cntHak +
                                        `">
                                    <button
                                        class="accordion-button collapsed noManage-nav-btn"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#noManageHakcollapse` +
                                        cntHak +
                                        `"
                                        aria-expanded="false"
                                        aria-controls="noManageHakcollapse` +
                                        cntHak +
                                        `">
                                            <table class="table-hover noManageTable">
                                                <colgroup>
                                                    <col width="20%"/>
                                                    <col width="5%"/>
                                                    <col width="10%"/>
                                                    <col width="79%"/>
                                                </colgroup>
                                                <tbody>
                                                        <tr class="` +
                                        csssss1 +
                                        `">
                                                        <td class="tdBorder1"` +
                                        cccssss1 + `>` + tmpArrName[k] +
                                        `</td>
                                                        <td class="tdBorder2 tdRight"` +
                                        cccssss1 + `>` + cntRsvt +
                                        `건</td>
                                                        <td class="tdBorder2 tdRight"` +
                                        cccssss1 + `>` + AddComma(sumRsvt) +
                                        `</td>
                                                        <td class="tdBorder2"` +
                                        cccssss1 + `>` + tmpArrTel[k] +
                                        `</td>
                                                        </tr>
                                                </tbody>
                                            </table>
                                    </button>
                                </div>
                                <div
                                    id="noManageHakcollapse` +
                                        cntHak +
                                        `"
                                    class="accordion-collapse collapse"
                                    aria-labelledby="noManageHakHeading` +
                                        cntHak +
                                        `">
                                    <div class="accordion-body NoManageacco-body">
                                        <table class="table table-striped table-bordered noManageTableIn">
                                            <colgroup>
                                                <col width="4%"/>
                                                <col width="8%"/>
                                                <col width="8%"/>
                                                <col width="auto"/>
                                                <col width="5%"/>
                                                <col width="5%"/>
                                                <col width="6%"/>
                                                <col width="10%"/>
                                                <col width="10%"/>
                                                <col width="10%"/>
                                                <col width="auto"/>
                                            </colgroup>
                                            <thead class="table-light">
                                                <tr>
                                                    <th class="">#</th>
                                                    <th class="">출발일</th>
                                                    <th class="">도착일</th>
                                                    <th class="">목적지</th>
                                                    <th class="sortStr">차량</th>
                                                    <th class="">대수</th>
                                                    <th class="">부가세</th>
                                                    <th class="">계약금액</th>
                                                    <th class="">입금액</th>
                                                    <th class="">잔금</th>
                                                    <th class="">출발장소</th>
                                                </tr>
                                            </thead>
                                            <tbody>` +
                                        htmlsTb +
                                        `</tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>`
                                break;

                            case 2:
                                cntGu++;

                                sumGu = sumGu + parseInt(sumRsvt);

                                let csssss = 'trBorder';
                                if (cntGu < 2) {
                                    csssss = 'trBorder1';
                                }

                                let cccssss2 = '';
                                if (cntGu % 2 != 0) {
                                    cccssss2 = ' style="background-color: #0000000d;"';
                                }

                                htmlsGu += `
                            <div class="accordion-item">
                                <div class="accordion-header" id="noManageGuHeading` +
                                        cntGu +
                                        `">
                                    <button
                                        class="accordion-button collapsed noManage-nav-btn"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#noManageGucollapse` +
                                        cntGu +
                                        `"
                                        aria-expanded="false"
                                        aria-controls="noManageGucollapse` +
                                        cntGu +
                                        `">
                                        <table class="table-hover noManageTable">
                                                <colgroup>
                                                    <col width="20%"/>
                                                    <col width="5%"/>
                                                    <col width="10%"/>
                                                    <col width="79%"/>
                                                </colgroup>
                                                <tbody>
                                                        <tr class="` +
                                        csssss +
                                        `">
                                                        <td class="tdBorder1"` +
                                        cccssss2 + `>` + tmpArrName[k] +
                                        `</td>
                                                        <td class="tdBorder2 tdRight"` +
                                        cccssss2 + `>` + cntRsvt +
                                        `건</td>
                                                        <td class="tdBorder2 tdRight"` +
                                        cccssss2 + `>` + AddComma(sumRsvt) +
                                        `</td>
                                                        <td class="tdBorder2"` +
                                        cccssss2 + `>` + tmpArrTel[k] +
                                        `</td>
                                                        </tr>
                                                </tbody>
                                            </table>
                                    </button>
                                </div>
                                <div
                                    id="noManageGucollapse` +
                                        cntGu +
                                        `"
                                    class="accordion-collapse collapse"
                                    aria-labelledby="noManageGuHeading` +
                                        cntGu +
                                        `">
                                    <div class="accordion-body NoManageacco-body">
                                        <table class="table table-striped table-bordered noManageTableIn">
                                            <colgroup>
                                                <col width="4%"/>
                                                <col width="8%"/>
                                                <col width="8%"/>
                                                <col width="auto"/>
                                                <col width="5%"/>
                                                <col width="5%"/>
                                                <col width="6%"/>
                                                <col width="10%"/>
                                                <col width="10%"/>
                                                <col width="10%"/>
                                                <col width="auto"/>
                                            </colgroup>
                                            <thead class="table-light">
                                                <tr>
                                                    <th class="sortNum">#</th>
                                                    <th class="sortNum">출발일</th>
                                                    <th class="sortStr">도착일</th>
                                                    <th class="sortStr">목적지</th>
                                                    <th class="sortStr">차량</th>
                                                    <th class="sortNum">대수</th>
                                                    <th class="sortStr">부가세</th>
                                                    <th class="sortNum">계약금액</th>
                                                    <th class="sortNum">입금액</th>
                                                    <th class="sortNum">잔금</th>
                                                    <th class="sortStr">출발장소</th>
                                                </tr>
                                            </thead>
                                            <tbody>` +
                                        htmlsTb +
                                        `</tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>`
                                break;

                            default:
                                break;
                        }
                    }

                    $('#noManageTitle1').text(AddComma(sumAll));
                    $('#noManageTitle2').text(AddComma(sumIl));
                    $('#noManageTitle3').text(AddComma(sumHak));
                    $('#noManageTitle4').text(AddComma(sumGu));

                    $('#accoIl').html(htmlsIl);
                    $('#accoHak').html(htmlsHak);
                    $('#accoGu').html(htmlsGu);

                    resolve();
                },
                error: (jqXHR) => {
                    loginSession(jqXHR.status);
                }
            })
        })
    }
}

$(document).on('click', '.mainNoManageMore', function () {
    // const aaa = $(this).children()[0]; const aaa1 = $(aaa).children()[0]; const
    // tmpCtmno = $(aaa1).val(); $('#manageCtmno').val(tmpCtmno); const dayyy =
    // $('#yearMonthDay').val() + ' ' + getDayOfWeek(     new
    // Date($('#yearMonthDay').val()).getDay() ); $('#manageTitle').text(dayyy);
    // LoadingWithMask()     .then(getManageMD1)     .then(getManageMD2)
    // .then(getManageMD3)     .then(mangeShow1)     .then(closeLoadingWithMask);
    // function mangeShow1() {     return new Promise(function (resolve, reject) {
    // $('#modalRsvtMoney').modal('show');         resolve();     }) }
});

function getNoManageMD1() {
    return new Promise(function (resolve, reject) {
        const url = "/allo/customer";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const params = {
            "stday": $("#yearMonthDay").val(),
            "endday": $("#yearMonthDay").val(),
            "rsvttrash": 1
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

                if (r.length > 0) {
                    for (let i = 0; i < r.length; i++) {
                        if ($('#manageCtmno').val() == r[i].ctmno) {
                            $('#rmCtmName').text(r[i].ctmname);
                            $('#rmCtmTel').text(r[i].ctmtel1);
                        }
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

function getNoManageMD2() {
    return new Promise(function (resolve, reject) {
        const url = "/allo/rsvt";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const params = {
            "stday": $("#yearMonthDay").val(),
            "endday": $("#yearMonthDay").val(),
            "rsvttrash": 1,
            "stt": 'stt'
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

                if (r.length > 0) {
                    let cnt = 0;
                    let cntM = 0;

                    for (let i = 0; i < r.length; i++) {
                        if ($('#manageCtmno').val() == r[i].ctmno) {
                            cnt++;
                            cntM = cntM + r[i].conm;

                            htmls += `
                    <div class="rsvtMoney-item">
                        <input type="hidden" value="` +
                                    r[i].rsvt +
                                    `">
                        <div class="rsvtMoney-rsvt card-song">
                            <div class="rsvtMoney-rsvt-item1">
                                <div class="rsvtMoney-desy">
                                    <i class="fas fa-map-marker-alt"></i>
                                    <span>` +
                                    r[i].desty +
                                    `</span>           
                                    <span class="rsvtMoney-etc">` +
                                    r[i].num + '대' +
                                    `</span></div>
                                <div class="rsvtMoney-conm1">
                                    <i class="fa-solid fa-won-sign"></i>
                                    <span>` +
                                    AddComma(r[i].conm) +
                                    `</span></div>
                                <div class="rsvtMoney-conm2">
                                    <span>` +
                                    r[i].cont +
                                    `</span></div>
                                <div class="dropdown rsvtMoney-allo">
                                <button
                                    class="btn btn-light dropdown-toggle card-song ddBtn"
                                    type="button"
                                    id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    운행차량
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                </ul>
                            </div>
                            </div>
                            <div class="rsvtMoney-rsvt-item2">
                                <table class="table table-striped table-sm">
                                    <colgroup>
                                        <col width="5%">
                                        <col width="11%">
                                        <col width="10%">
                                        <col width="20%">
                                        <col width="15%">
                                        <col width="13%">
                                        <col width="13%">
                                        <col width="13%">
                                    </colgroup>
                                    <thead>
                                        <th class="thNone"></th>
                                        <th>#</th>
                                        <th>담당자</th>
                                        <th>입금일</th>
                                        <th>입금</th>
                                        <th>메모</th>
                                        <th>잔금</th>
                                        <th>입금액</th>
                                        <th>잔액</th>
                                    </thead>
                                    <tbody></tbody>
                                    <tfoot></tfoot>
                                </table>
                            </div>
                        </div>
                    </div>`;
                        }
                    }

                    $('#ctmGun').text(cnt + '건');
                    $('#ctmAllM').text(AddComma(cntM));

                    $('#rsvtMoneyRsvt').html(htmls);
                }
                resolve();
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    })
}

function getNoManageMD3(result) {
    return new Promise(function (resolve, reject) {
        const url = "/allo/oper";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const params = {
            "stday": $("#yearMonthDay").val(),
            "endday": $("#yearMonthDay").val()
        };

        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            caches: false,
            dataType: "json",
            data: JSON.stringify(params),

            success: function (r) {

                const aaa = $('#rsvtMoneyRsvt').children();

                for (let k = 0; k < aaa.length; k++) {
                    const aaa1 = $(aaa[k]).children()[0];
                    const rsvtt = $(aaa1).val();

                    getNoManageMD4(rsvtt);

                    let htmls = ``;
                    const aaa11 = $(aaa[k]).children()[1];
                    const bbb = $(aaa11).children()[0];
                    const bbb1 = $(bbb).children()[3];
                    const bbb11 = $(bbb1).children()[1];

                    for (let i = 0; i < r.length; i++) {
                        if (rsvtt == r[i].rsvt) {

                            let veee = parseInt(r[i].vehicle.substring(r[i].vehicle.length - 4));
                            if (isNaN(veee)) {
                                veee = r[i].vehicle;
                            }

                            htmls += `
                        <li>
                            <span class="">` +
                                    veee +
                                    `</span>
                        </li>`;
                        }
                    }

                    $(bbb11).html(htmls);
                }
                resolve();
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    })
}

function getNoManageMD4(para) {
    return new Promise(function (resolve, reject) {
        const url = "/manage/selRsvtMoney";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const params = {
            "rsvt": para
        };

        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            caches: false,
            dataType: "json",
            data: JSON.stringify(params),

            success: function (r) {

                let htmlsTb = ``;

                const nowD = toStringByFormatting(new Date());

                const aaa = $('#rsvtMoneyRsvt').children();
                for (let k = 0; k < aaa.length; k++) {

                    const aaa1 = $(aaa[k]).children()[0];
                    const mdrsvtt = $(aaa1).val();

                    const bbb = $(aaa[k]).children()[1];
                    const bbb1 = $(bbb).children()[1];
                    const bbb11 = $(bbb1).children()[0];
                    const bbb111 = $(bbb11).children()[2];
                    const bbb1111 = $(bbb11).children()[3];

                    const ccc = $(bbb).children()[0];
                    const ccc1 = $(ccc).children()[1];
                    const ccc11 = $(ccc1).children()[1];
                    const momoney = $(ccc11).text();

                    if (mdrsvtt == para) {

                        let inmoney = 0;
                        let jan = 0;

                        let ifCheck = 0;

                        if (r.length > 0) {
                            ifCheck++;
                            let janM = momoney.replaceAll(',', '');
                            let cntNumber = 0;
                            for (let i = 0; i < r.length; i++) {
                                const mmmmm = parseInt(janM) - parseInt(r[i].moneymoney);

                                let compaList = ``;
                                for (let l = 0; l < dbCompa.length; l++) {
                                    if (r[i].moneytong != '기타') {
                                        if (dbCompa[l].company == r[i].moneytong) {
                                            compaList += ` <option value="` + dbCompa[l].company + `" label="` + dbCompa[l].company +
                                                    `" selected="selected"></option>`;
                                        } else {
                                            compaList += ` <option value="` + dbCompa[l].company + `" label="` + dbCompa[l].company +
                                                    `"></option>`;
                                        }
                                    } else {
                                        compaList += ` <option value="` + dbCompa[l].company + `" label="` + dbCompa[l].company +
                                                `"></option>`;
                                    }
                                }

                                if (r[i].moneytong == '기타') {
                                    compaList += `<option value="기타" label="기타" selected="selected"></option>`
                                } else {
                                    compaList += `<option value="기타" label="기타"></option>`
                                }

                                htmlsTb += `
                                <tr>
                                    <td class="thNone">` +
                                        r[i].rsvtmoneyseq +
                                        `</td>
                                    <td>` + (i + 1) +
                                        `</td>
                                    <td>` + r[i].moneyuser +
                                        `</td>
                                    <td><input class="form-control" type="date" value="` +
                                        r[i].moneyday +
                                        `"></td>
                                    <td>
                                        <select class="form-select">
                                            ` +
                                        compaList +
                                        `
                                        </select>
                                    </td>
                                    <td><input type="text" class="form-control" value="` +
                                        r[i].moneymemo +
                                        `"></td>
                                    <td class="tdRight">` +
                                        AddComma(janM) +
                                        `</td>
                                    <td><input type="text" class="form-control inputManage" data-type="currency" value="` +
                                        AddComma(r[i].moneymoney) +
                                        `"></td>
                                    <td class="tdRight">` +
                                        `<span>` + AddComma(mmmmm) + `</span>` +
                                        `</td>
                                </tr>`
                                janM = mmmmm;
                                cntNumber = (i + 1);

                                inmoney = inmoney + parseInt(r[i].moneymoney);
                                jan = parseInt(mmmmm);
                            }

                            if (janM > 0) {
                                const nowD = toStringByFormatting(new Date());

                                let compaList = ``;
                                for (let i = 0; i < dbCompa.length; i++) {
                                    if (dbCompa[i].company == dbuser.company) {
                                        compaList += ` <option value="` + dbCompa[i].company + `" label="` + dbCompa[i].company +
                                                `" selected="selected"></option>`;
                                    } else {
                                        compaList += ` <option value="` + dbCompa[i].company + `" label="` + dbCompa[i].company +
                                                `"></option>`;
                                    }
                                }

                                htmlsTb += `
                            <tr>
                                <td class="thNone"></td>
                                <td>` +
                                        (cntNumber + 1) +
                                        `</td>
                                <td>` + dbuser.name +
                                        `</td>
                                <td><input class="form-control" type="date" value="` +
                                        nowD +
                                        `"></td>
                                <td>
                                    <select class="form-select">
                                        ` +
                                        compaList +
                                        `
                                        <option value="기타" label="기타"></option>
                                    </select>
                                </td>
                                <td><input type="text" class="form-control"></td>
                                <td class="tdRight">` +
                                        AddComma(janM) +
                                        `</td>
                                <td><input type="text" class="form-control inputManage" data-type="currency"></td>
                                <td class="tdRight"></td>
                            </tr>`;
                            }
                        } else {
                            let compaList = ``;
                            for (let i = 0; i < dbCompa.length; i++) {
                                if (dbCompa[i].company == dbuser.company) {
                                    compaList += ` <option value="` + dbCompa[i].company + `" label="` + dbCompa[i].company +
                                            `" selected="selected"></option>`;
                                } else {
                                    compaList += ` <option value="` + dbCompa[i].company + `" label="` + dbCompa[i].company +
                                            `"></option>`;
                                }
                            }

                            htmlsTb += `
                            <tr>
                                <td class="thNone"></td>
                                <td>1</td>
                                <td>` +
                                    dbuser.name +
                                    `</td>
                                <td><input class="form-control" type="date" value="` +
                                    nowD +
                                    `"></td>
                                <td>
                                    <select class="form-select">
                                        ` +
                                    compaList +
                                    `
                                        <option value="기타" label="기타"></option>
                                    </select>
                                </td>
                                <td><input type="text" class="form-control"></td>
                                <td class="tdRight">` +
                                    momoney +
                                    `</td>
                                <td><input type="text" class="form-control inputManage" data-type="currency"></td>
                                <td class="tdRight"></td>
                            </tr>`
                        }

                        let jjaaan = '';
                        let jjaaan1 = '';

                        if (ifCheck > 0) {
                            if (jan == 0) {
                                jjaaan = `<span class="badge bg-success bgbg"><i class="fa-solid fa-check"></i>완료</span>`;
                            }
                            jjaaan1 = AddComma(jan);
                        } else {
                            jjaaan1 = momoney;
                        }

                        let htmlFoot = `
                    <tr>
                        <td colspan="5"></td>
                        <td style="text-align: right;">` +
                                jjaaan1 +
                                `</td>
                        <td style="text-align: right; padding-right: 1rem;">` +
                                AddComma(inmoney) +
                                `</td>
                        <td style="text-align: right;">` + jjaaan +
                                `</td>
                    </tr>`;

                        $(bbb111).html(htmlsTb);
                        $(bbb1111).html(htmlFoot);
                        $("input[data-type='currency']").bind('keyup keydown', function () {
                            inputNumberFormat(this);
                        });
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