$(document).on('click', '.alloNumClk', function () {

    $('#mdOneHCton').val($('#alloMdctmNo').val());
    $('#mdOneHOper').val();
    $('#mdOneHDay').val($('#alloMdDay').val());

    const aaa = $(this)
        .next()
        .next()
        .next();
    const aaa1 = $(aaa).val();

    const ccc = $(this)
        .next()
        .next()
        .next()
        .next();
    const tod = $(ccc).val();

    if (aaa1) {
        LoadingWithMask()
            .then(shoMdOne2)
            .then(showMD2)
            .then(closeLoadingWithMask);
    } else {
        alert("배차를 먼저해주세요.");
    }

    function shoMdOne2(result) {
        return new Promise(function (resolve, reject) {

            const url = "/allo/oneway";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "opernum": aaa1,
                "operday": tod
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

                    $('#mdOneTr2').css('display', 'none')
                    $('#mdOneTr3').css('display', 'none')
                    $('#mdOneTr4').css('display', 'none')
                    $('#mdOneTr5').css('display', 'none')

                    $('#mdOneTr1').attr('class', '');
                    $('#mdOneTr2').attr('class', '');
                    $('#mdOneTr3').attr('class', '');
                    $('#mdOneTr4').attr('class', '');
                    $('#mdOneTr5').attr('class', '');

                    let veh = '';
                    let veCnt = 0;
                    for (let k = 0; k < dbVe.length; k++) {
                        if (r[0].opercar == dbVe[k].carnumber) {
                            veh = dbVe[k]
                                .vehicle
                                .substring(dbVe[k].vehicle.length - 4);
                            veCnt++;

                            let cntCom = 0;
                            for (let l = 0; l < dbCompa.length; l++) {
                                if (r[0].opercom == dbCompa[l].company) {
                                    $('#mdOneTr1').addClass('allo1');
                                    cntCom++;
                                }
                            }

                            if (cntCom < 1) {
                                $('#mdOneTr1').addClass('allo2');
                            }
                        }
                    }

                    if (veCnt < 1) {
                        $('#mdOneTr1').addClass('allo3');
                        veh = r[0].opercar;
                    }

                    $('#mdOneTd1').val(r[0].operseq);
                    $('#mdOneTd2').text(r[0].opertype);
                    $('#mdOneTd3').val(r[0].opercar);
                    $('#mdOneTd3')
                        .next()
                        .text(veh);
                    $('#mdOneTd4').val(r[0].operid);
                    $('#mdOneTd5').val(AddComma(r[0].atlm));

                    if (r.length > 1) {
                        let veh = '';
                        let veCnt = 0;
                        for (let k = 0; k < dbVe.length; k++) {
                            if (r[1].opercar == dbVe[k].carnumber) {
                                veh = dbVe[k]
                                    .vehicle
                                    .substring(dbVe[k].vehicle.length - 4);
                                veCnt++;

                                let cntCom = 0;
                                for (let l = 0; l < dbCompa.length; l++) {
                                    if (r[1].opercom == dbCompa[l].company) {
                                        $('#mdOneTr2').addClass('allo1');
                                        cntCom++;
                                    }
                                }

                                if (cntCom < 1) {
                                    $('#mdOneTr2').addClass('allo2');
                                }
                            }
                        }

                        if (veCnt < 1) {
                            veh = r[1].opercar;
                            $('#mdOneTr2').addClass('allo3');
                        }

                        $('#mdOneTd21').val(r[1].operseq);
                        $('#mdOneTd22').text(r[1].opertype);
                        $('#mdOneTd23').val(veh);
                        $('#mdOneTd23')
                            .next()
                            .text(r[1].vehicle.substring(r[1].vehicle.length - 4));
                        $('#mdOneTd24').val(r[1].operid);
                        $('#mdOneTd25').val(AddComma(r[1].atlm));

                        $('#mdOneTr2').css('display', 'table-row');
                        $('#mdOneTrDel2').html(
                            `<a class="mdOneDel">
                                <i class="fa-solid fa-x" style="font-size: 1rem; color: var(--text-grey);"></i>
                            </a>`
                        );
                    }

                    if (r.length > 2) {
                        let veh = '';
                        let veCnt = 0;
                        for (let k = 0; k < dbVe.length; k++) {
                            if (r[2].opercar == dbVe[k].carnumber) {
                                veh = dbVe[k]
                                    .vehicle
                                    .substring(dbVe[k].vehicle.length - 4);
                                veCnt++;

                                let cntCom = 0;
                                for (let l = 0; l < dbCompa.length; l++) {
                                    if (r[2].opercom == dbCompa[l].company) {
                                        $('#mdOneTr3').addClass('allo1');
                                        cntCom++;
                                    }
                                }

                                if (cntCom < 1) {
                                    $('#mdOneTr3').addClass('allo2');
                                }
                            }
                        }

                        if (veCnt < 1) {
                            $('#mdOneTr3').addClass('allo3');
                            veh = r[2].opercar;
                        }

                        $('#mdOneTd31').val(r[2].operseq);
                        $('#mdOneTd32').text(r[2].opertype);
                        $('#mdOneTd33').val(veh);
                        $('#mdOneTd33')
                            .next()
                            .text(r[2].vehicle.substring(r[2].vehicle.length - 4));
                        $('#mdOneTd34').val(r[2].operid);
                        $('#mdOneTd35').val(AddComma(r[2].atlm));

                        $('#mdOneTr3').css('display', 'table-row');
                        $('#mdOneTrDel3').html(
                            `<a class="mdOneDel">
                                <i class="fa-solid fa-x" style="font-size: 1rem; color: var(--text-grey);"></i>
                            </a>`
                        );
                        $('#mdOneTrDel2').html(``);
                    }

                    if (r.length > 3) {
                        let veh = '';
                        let veCnt = 0;
                        for (let k = 0; k < dbVe.length; k++) {
                            if (r[3].opercar == dbVe[k].carnumber) {
                                veh = dbVe[k]
                                    .vehicle
                                    .substring(dbVe[k].vehicle.length - 4);
                                veCnt++;

                                let cntCom = 0;
                                for (let l = 0; l < dbCompa.length; l++) {
                                    if (r[3].opercom == dbCompa[l].company) {
                                        $('#mdOneTr4').addClass('allo1');
                                        cntCom++;
                                    }
                                }

                                if (cntCom < 1) {
                                    $('#mdOneTr4').addClass('allo2');
                                }
                            }
                        }

                        if (veCnt < 1) {
                            $('#mdOneTr4').addClass('allo3');
                            veh = r[3].opercar;
                        }

                        $('#mdOneTd41').val(r[3].operseq);
                        $('#mdOneTd42').text(r[3].opertype);
                        $('#mdOneTd43').val(veh);
                        $('#mdOneTd43')
                            .next()
                            .text(r[3].vehicle.substring(r[3].vehicle.length - 4));
                        $('#mdOneTd44').val(r[3].operid);
                        $('#mdOneTd45').val(AddComma(r[3].atlm));

                        $('#mdOneTr4').css('display', 'table-row');
                        $('#mdOneTrDel4').html(
                            `<a class="mdOneDel">
                                <i class="fa-solid fa-x" style="font-size: 1rem; color: var(--text-grey);"></i>
                            </a>`
                        );
                        $('#mdOneTrDel3').html(``);
                    }

                    if (r.length > 4) {
                        let veh = '';
                        let veCnt = 0;
                        for (let k = 0; k < dbVe.length; k++) {
                            if (r[4].opercar == dbVe[k].carnumber) {
                                veh = dbVe[k]
                                    .vehicle
                                    .substring(dbVe[k].vehicle.length - 4);
                                veCnt++;

                                let cntCom = 0;
                                for (let l = 0; l < dbCompa.length; l++) {
                                    if (r[4].opercom == dbCompa[l].company) {
                                        $('#mdOneTr5').addClass('allo1');
                                        cntCom++;
                                    }
                                }

                                if (cntCom < 1) {
                                    $('#mdOneTr5').addClass('allo2');
                                }
                            }
                        }

                        if (veCnt < 1) {
                            $('#mdOneTr5').addClass('allo3');
                            veh = r[4].opercar;
                        }

                        $('#mdOneTd51').val(r[4].operseq);
                        $('#mdOneTd52').text(r[4].opertype);
                        $('#mdOneTd53').val(veh);
                        $('#mdOneTd53')
                            .next()
                            .text(r[4].vehicle.substring(r[4].vehicle.length - 4));
                        $('#mdOneTd54').val(r[4].operid);
                        $('#mdOneTd55').val(AddComma(r[4].atlm));

                        $('#mdOneTr5').css('display', 'table-row');
                        $('#mdOneTrDel5').html(
                            `<a class="mdOneDel">
                                <i class="fa-solid fa-x" style="font-size: 1rem; color: var(--text-grey);"></i>
                            </a>`
                        );
                        $('#mdOneTrDel4').html(``);
                    }

                    resolve();
                }
            })
        })
    }

    function showMD2() {
        return new Promise(function (resolve, reject) {
            $('#modalAllo2').modal('hide');

            $('#modal-one').modal('show');

            resolve();
        })
    }
});

$(document).on('click', '#btn-one-plus2', function () {

    if ($('#mdOneTr2').css('display') == 'none') {
        $('#mdOneTr2').css('display', 'table-row');
        $('#mdOneTrDel2').html(
            `<a class="mdOneDel">
                <i class="fa-solid fa-x" style="font-size: 1rem; color: var(--text-grey);"></i>
            </a>`
        );
        return;
    }

    if ($('#mdOneTr3').css('display') == 'none') {
        $('#mdOneTr3').css('display', 'table-row');
        $('#mdOneTrDel3').html(
            `<a class="mdOneDel">
                <i class="fa-solid fa-x" style="font-size: 1rem; color: var(--text-grey);"></i>
            </a>`
        );
        $('#mdOneTrDel2').html(``);
        return;
    }

    if ($('#mdOneTr4').css('display') == 'none') {
        $('#mdOneTr4').css('display', 'table-row');
        $('#mdOneTrDel4').html(
            `<a class="mdOneDel">
                <i class="fa-solid fa-x" style="font-size: 1rem; color: var(--text-grey);"></i>
            </a>`
        );
        $('#mdOneTrDel3').html(``);
        return;
    }

    if ($('#mdOneTr5').css('display') == 'none') {
        $('#mdOneTr5').css('display', 'table-row');
        $('#mdOneTrDel5').html(
            `<a class="mdOneDel">
                <i class="fa-solid fa-x" style="font-size: 1rem; color: var(--text-grey);"></i>
            </a>`
        );
        $('#mdOneTrDel4').html(``);
        return;
    }

});

$(document).on('click', '#mdOneTrDel2', function () {
    delOneWay2(this, 2);
});
$(document).on('click', '#mdOneTrDel3', function () {
    delOneWay2(this, 3);
});
$(document).on('click', '#mdOneTrDel4', function () {
    delOneWay2(this, 4);
});
$(document).on('click', '#mdOneTrDel5', function () {
    delOneWay2(this, 5);
});

function delOneWay2(doms, num) {
    const aaa = $(doms).parent();
    const aaa1 = $(aaa).children()[0];
    const aaa11 = $(aaa1).children()[0];

    const operSeq = $(aaa11).val();

    if (operSeq) {} else {
        const iiddd = '#mdOneTrDel' + (
            num - 1
        );

        $(iiddd).html(
            `<a class="mdOneDel">
                <i class="fa-solid fa-x" style="font-size: 1rem; color: var(--text-grey);"></i>
            </a>`
        );

        const iiddd2 = '#mdOneTr' + (
            num
        );

        $(iiddd2).css('display', 'none');
    }
}

$(document).on('click', '#modal-oneX2', function () {
    makeModalIl($('#mdOneHDay').val(), $('#mdOneHCton').val());
    $('#modal-one').modal('hide');
});

$(document).on('click', '#modal-oneEnd2', function () {
    makeModalIl($('#mdOneHDay').val(), $('#mdOneHCton').val());
    $('#modal-one').modal('hide');
});