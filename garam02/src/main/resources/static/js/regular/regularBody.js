$(document).ready(function () {
    getRegularAll();
});

$(document).on('click', '#btn-x', function () {
    getRegularAll();
    $('#reg-search').val('');
});

$(document).on('keydown', 'input', function (eInner) {
    if ($('#reg-search').is(":focus")) {
        var keyValue = eInner.which; //enter key
        if (keyValue == 27) {
            getRegularAll();
            $('#reg-search').val('');
        }
    }
});

function getRegularInfo(params) {
    setConnum(params)
        .then(getRegular)
        .then(getRegularDeAll);
    function setConnum(idd) {
        return new Promise(function (resolve, reject) {
            $('#rgconum').val(idd);
            console.log($('#rgconum').val());
            resolve();
        })
    }
}

function getRegularDeInfo(params) {
    setCodenum(params)
        .then(getRegularDe)
        .then(getRegularCource);
    function setCodenum(idd) {
        return new Promise(function (resolve, reject) {
            $('#regcodenum').val(idd);
            console.log($('#regcodenum').val());
            resolve();
        })
    }
}

function getRegularAll(name) {
    return new Promise(function (resolve, reject) {

        const url = "/reg/regRegular";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const params = {
            "regcompany": name
        };

        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            dataType: "json",
            data: JSON.stringify(params),
            success: function (r) {
                let htmls1 = '';
                let htmls2 = '';
                let cnt1 = 0;
                let cnt2 = 0;
                for (let i = 0; i < r.length; i++) {
                    switch (r[i].regtrash) {
                        case 1:
                            cnt1++;
                            htmls1 += '<tr id="' + r[i].conum + '" onclick="getRegularInfo(this.id)" style="cursor:po' +
                                    'inter">';
                            htmls1 += '<td>';
                            htmls1 += r[i].regcompany;
                            htmls1 += '</td>';
                            htmls1 += '<td>';
                            htmls1 += r[i].regnum;
                            htmls1 += '대</td>';
                            htmls1 += '<td>';
                            htmls1 += r[i].regperson;
                            htmls1 += '</td>';
                            htmls1 += '</tr>'
                            break;
                        case 2:
                            cnt2++;
                            htmls2 += '<tr id="' + r[i].conum + '" onclick="getRegularInfo(this.id)" style="cursor:po' +
                                    'inter">';
                            htmls2 += '<td>';
                            htmls2 += r[i].regcompany;
                            htmls2 += '</td>';
                            htmls2 += '<td>';
                            htmls2 += r[i].regendd;
                            htmls2 += '</td>';
                            htmls2 += '</tr>'
                            break;
                    }
                }
                $('#rg-tb-com-go').html(htmls1);
                $('#rg-tb-com-end').html(htmls2);
                $('#bggo').text(cnt1);
                $('#bgend').text(cnt2);
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    });
}
function getRegular(result) {
    return new Promise(function (resolve, reject) {

        const url = "/reg/regRegularInfo";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const params = {
            "conum": $('#rgconum').val()
        };

        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            dataType: "json",
            data: JSON.stringify(params),
            success: function (r) {
                $('#rgcompa').html(
                    r[0].regcompany + '<small id="rgadd">' + r[0].regaddress + '</small>'
                );
                $('#rgadd').text(r[0].regaddress);
                $('#rgper').text(r[0].regstartd + ' ~ ' + r[0].regendd);
                $('#rgname').text(r[0].regperson);
                $('#rgtel').text(r[0].regphone);
                $('#rgtel').attr('href', 'tel:' + r[0].regphone);
                $('#rgnum').text(r[0].regnum + '대');
                $('#rgcon').text(r[0].regcontract);
                $('#rgmoney').html(
                    '<span>&#8361;</span><span>' + r[0].regmoney + '</span>'
                );
                resolve();
            }
        })
    });
}

function getRegularDeAll(result) {
    return new Promise(function (resolve, reject) {

        const url = "/reg/regRegularde";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const params = {
            "conum": $('#rgconum').val()
        };

        console.log(params);

        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            dataType: "json",
            data: JSON.stringify(params),
            success: function (r) {
                let htmls = '';
                for (let i = 0; i < r.length; i++) {
                    htmls += '<tr id="' + r[i].codenum + '" onclick="getRegularDeInfo(this.id)" style="curso' +
                            'r:pointer">';
                    htmls += '<td>';
                    htmls += (i + 1);
                    htmls += '</td>';
                    htmls += '<td>';
                    htmls += r[i].rdname;
                    htmls += '</td>';
                    htmls += '<td>';
                    htmls += r[i].rdbus;
                    htmls += '</td>';
                    htmls += '<td>';
                    htmls += r[i].rdgonum;
                    htmls += '회</td>';
                    htmls += '<td>';
                    htmls += r[i].rdoutnum;
                    htmls += '회</td>';
                    if (r[i].id) {
                        htmls += '<td>';
                        htmls += r[i].id;
                        htmls += '</td>';
                    } else {
                        htmls += '<td>';
                        htmls += '';
                        htmls += '</td>';
                    }
                    htmls += '</tr>'
                }
                $('#rg-tb-de').html(htmls);
                resolve();
            },
            error: (jqXHR) => {
                loginSession(jqXHR.status);
            }
        })
    });
}

function getRegularDe(result) {
    return new Promise(function (resolve, reject) {

        const url = "/reg/regRegulardeinfo";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const params = {
            "codenum": $('#regcodenum').val()
        };

        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            dataType: "json",
            data: JSON.stringify(params),
            success: function (r) {
                $('#rdname').text(r[0].rdname);
                $('#rdbus').text(r[0].rdbus);
                $('#rddow').text(r[0].rddow);

                if (r[0].id) {
                    $('#rdid').text(r[0].id);
                } else {
                    $('#rdid').text('');
                }
                // $('#rdidtel').text(r[0].regnum);
                if (r[0].rdmoney) {
                    $('#rdmoney').text(AddComma(r[0].rdmoney));
                } else {
                    $('#rdmoney').text(0);
                }

                if (r[0].rdaltm) {
                    $('#rdaltm').text(AddComma(r[0].rdaltm));
                } else {
                    $('#rdaltm').text(0);
                }
                resolve();
            }
        })
    });
}

function getRegularCource(result) {
    return new Promise(function (resolve, reject) {

        const url = "/reg/regRegularcourse";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        const params = {
            "codenum": $('#regcodenum').val()
        };

        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            dataType: "json",
            data: JSON.stringify(params),
            success: function (r) {
                let htmls = '';
                for (let i = 0; i < r.length; i++) {
                    htmls += '<tr>';
                    htmls += '<td>';
                    htmls += (i + 1);
                    htmls += '</td>';
                    htmls += '<td>'
                    htmls += r[i].rcsepa;
                    htmls += '</td>'
                    htmls += '<td>'
                    htmls += r[i].rct;
                    htmls += '</td>'
                    htmls += '<td>'
                    htmls += r[i].rcstp;
                    htmls += '</td>'
                    htmls += '<td>'
                    htmls += r[i].rcsepa;
                    htmls += '</td>'
                    htmls += '</tr>'
                }
                console.log('asdads  ' + htmls);
                $('#rg-tb-rc').html(htmls);
                resolve();
            }
        })
    });
}