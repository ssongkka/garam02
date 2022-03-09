$(document).ready(function () {
    getRegularInfo();
});

function getTrHtmls() {
    const htmls = `<tr>
    <td>
        <button class="btn" onclick="delTr(this)">
            <i class="far fa-times-circle"></i>
        </button>
    </td>
    <td>
        1
    </td>
    <td><input
        class="form-control input-sm rgip upclas"
        onfocus="this.select()"
        autocomplete="off"
        type="text"
        placeholder="노선명 입력"></td>
    <td>
        <select class="form-control input-sm rgip upclasse">
            <option value="대형" label="대형"></option>
            <option value="중형" label="중형"></option>
            <option value="우등" label="우등"></option>
            <option value="기타" label="기타"></option>
        </select>
    </td>
    <td>
        <select class="form-control input-sm rgip upclasse">
            <option value="0" label="0 회"></option>
            <option value="1" label="1 회"></option>
            <option value="2" label="2 회"></option>
            <option value="3" label="3 회"></option>
            <option value="4" label="4 회"></option>
            <option value="5" label="5 회"></option>
            <option value="6" label="6 회"></option>
            <option value="7" label="7 회"></option>
            <option value="8" label="8 회"></option>
            <option value="9" label="9 회"></option>
            <option value="10" label="10 회"></option>
        </select>
    </td>
    <td>
        <select class="form-control input-sm rgip upclasse">
            <option value="0" label="0 회"></option>
            <option value="1" label="1 회"></option>
            <option value="2" label="2 회"></option>
            <option value="3" label="3 회"></option>
            <option value="4" label="4 회"></option>
            <option value="5" label="5 회"></option>
            <option value="6" label="6 회"></option>
            <option value="7" label="7 회"></option>
            <option value="8" label="8 회"></option>
            <option value="9" label="9 회"></option>
            <option value="10" label="10 회"></option>
        </select>
    </td>
    <td>
        <select class="form-control input-sm rgip upclasse">
            <option value="0" label="미정"></option>
            <option value="1" label="월고정"></option>
            <option value="2" label="운행횟수"></option>
        </select>
    </td>
    <td><input
        class="form-control input-sm upclas"
        onfocus="this.select()"
        autocomplete="off"
        type="text"
        data-type="currency"
        placeholder="금액입력"></td>
    <td><input
        class="form-control input-sm upclas"
        onfocus="this.select()"
        autocomplete="off"
        type="text"
        data-type="currency"
        placeholder="금액입력"></td>
    <td><input
        class="form-control input-sm rgip upclas"
        onfocus="this.select()"
        autocomplete="off"
        type="text"
        list="car-info"
        placeholder="차량번호">
    </td>
    <td>
        <button class="btn btn1 btn-success">
            <i class="fas fa-list-ul"></i>
        </button>
    </td>
    <td>
    <button class="btn btn1 btn-default" onclick="up(this)">
            <i class="far fa-arrow-alt-circle-up"></i>
    </button>
    </td>
    <td>
    <button class="btn btn1 btn-default" onclick="down(this)">
            <i class="far fa-arrow-alt-circle-down"></i>
    </button>
    </td>
</tr>`
    return htmls;
}

$(document).on('click', '#md-rgCh', function () {
    const wh = confirm("정기운행 정보로 돌아가시겠습니까?\n\n저장되지 않은 정보는 사라집니다.");
    if (wh) {
        window.open('/regular', '정기운행정보');
    }
});

$(document).on('click', '#insertPlus', function () {
    LoadingWithMask()
        .then(insertRegularDe)
        .then(getRegular)
        .then(getRegularDeAll)
        .then(chNum)
        .then(updateRegularDeOrder)
        .then(closeLoadingWithMask);
    chNum();
});

function delTr(params) {
    checkDelgo().then(chNum);
    function checkDelgo() {
        return new Promise(function (resolve, reject) {
            const ttrr = $(params).parents()[1];
            const ttrr1 = $(ttrr).children()[2];
            const ttrr2 = $(ttrr1).children();

            const wh = confirm(
                "'" + $(ttrr2).val() + "'노선정보를 삭제하시겠습니까?\n\n'" + $(ttrr2).val() + "'노선의 상세정보(코스" +
                "등)도 삭제됩니다."
            );

            if (wh) {
                const ii = $($(ttrr).children()[10]).children();
                delRegularDe($(ii).attr('id'), 0);
                resolve();
            }
        })
    }
}

function chNum() {
    return new Promise(function (resolve, reject) {
        const size = $('#rgch-tbb')
            .children()
            .length;
        for (let i = 0; i < size; i++) {
            const aaa = $('#rgch-tbb').children()[i];
            const bbb = $(aaa).children()[1];
            $(bbb).text(i + 1);
            const ccc = $(aaa).children()[0];
            const ccc1 = $(ccc).children();
            const ddd = $(aaa).children()[11];
            const ddd1 = $(ddd).children();
            const eee = $(aaa).children()[12];
            const eee1 = $(eee).children();

            if (size > 1) {
                $(ccc1).attr("disabled", false);
                $(ddd1).attr("disabled", false);
                $(eee1).attr("disabled", false);
            } else {
                $(ccc1).attr("disabled", true);
                $(ddd1).attr("disabled", true);
                $(eee1).attr("disabled", true);
            }
        }
        resolve();
    })
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
                $('#rgcompa').html(r[0].regcompany);
                $('#rgadd').text(r[0].regaddress);
                $('#rgper').text(r[0].regstartd + ' ~ ' + r[0].regendd);
                $('#rgname').text(r[0].regperson);
                $('#rgtel').text(r[0].regphone);
                $('#rgtel').attr('href', 'tel:' + r[0].regphone);
                $('#rgnum').text(r[0].regnum + '대');
                $('#rgcon').text(r[0].regcontract);
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

        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            dataType: "json",
            data: JSON.stringify(params),
            success: function (r) {
                $('#rgch-tbb')
                    .children()
                    .remove();
                if (r.length > 0) {

                    for (let i = 0; i < r.length; i++) {

                        switch (r[i].rdtrash) {
                            case 1:
                                $('#rgch-tbb').append(getTrHtmls());
                                $("input[data-type='currency']").bind('keyup keydown', function () {
                                    inputNumberFormat(this);
                                });
                                break;
                            case 2:
                                break;
                        }
                    }

                    let cnt1 = 0;
                    let cnt2 = 0;

                    let cntTab1 = 1;

                    for (let k = 0; k < r.length; k++) {
                        switch (r[k].rdtrash) {
                            case 1:
                                const tmp = $('#rgch-tbb').children()[cnt1++];

                                const aa = $($(tmp).children()[2]).children();
                                const bb = $($(tmp).children()[3]).children();
                                const cc = $($(tmp).children()[4]).children();
                                const dd = $($(tmp).children()[5]).children();
                                const ee = $($(tmp).children()[6]).children();
                                const ff = $($(tmp).children()[7]).children();
                                const gg = $($(tmp).children()[8]).children();
                                const hh = $($(tmp).children()[9]).children();
                                const ii = $($(tmp).children()[10]).children();

                                $(aa).attr('tabindex', cntTab1++);
                                $(bb).attr('tabindex', cntTab1++);
                                $(cc).attr('tabindex', cntTab1++);
                                $(dd).attr('tabindex', cntTab1++);
                                $(ee).attr('tabindex', cntTab1++);
                                $(ff).attr('tabindex', cntTab1++);
                                $(gg).attr('tabindex', cntTab1++);
                                $(hh).attr('tabindex', cntTab1++);
                                $(ii).attr('tabindex', cntTab1++);

                                if (r[k].rdname) {
                                    $(aa).val(r[k].rdname);
                                }
                                if (r[k].rdbus) {
                                    $(bb).val(r[k].rdbus);
                                }
                                if (r[k].rdgonum) {
                                    $(cc).val(r[k].rdgonum);
                                }
                                if (r[k].rdoutnum) {
                                    $(dd).val(r[k].rdoutnum);
                                }
                                if (r[k].rdconn) {
                                    $(ee).val(r[k].rdconn);
                                }
                                if (r[k].rdmoney) {
                                    $(ff).val(AddComma(r[k].rdmoney));
                                }
                                if (r[k].rdaltm) {
                                    $(gg).val(AddComma(r[k].rdaltm));
                                }
                                if (r[k].idvehicle) {
                                    if (isNaN((r[k].idvehicle).substring((r[k].idvehicle).length - 4))) {
                                        $(hh).val(r[k].idvehicle);
                                    } else {
                                        $(hh).val((r[k].idvehicle).substring((r[k].idvehicle).length - 4));
                                    }
                                }
                                if (r[k].codenum) {
                                    $(ii).attr('id', r[k].codenum);
                                    $(ii).attr('onclick', 'getRecou(this.id)');
                                }
                                break;
                            case 2:

                                break;
                        }
                    }
                } else {}
                resolve();
            }
        })
    });
}

function getRegularInfo() {
    LoadingWithMask()
        .then(getRegular)
        .then(getRegularDeAll)
        .then(chNum)
        .then(closeLoadingWithMask);
}

function up(params) {
    LoadingWithMask()
        .then(setOrup)
        .then(chNum)
        .then(updateRegularDeOrder)
        .then(getRegular)
        .then(getRegularDeAll)
        .then(chNum)
        .then(closeLoadingWithMask);

    function setOrup(result) {
        return new Promise(function (resolve, reject) {
            const ttrr = $(params).parents()[1];
            const ttrr1 = $(ttrr).prev()[0];
            $(ttrr1).before($(ttrr));
            resolve();
        })
    }
}
function down(params) {
    LoadingWithMask()
        .then(setOrdown)
        .then(chNum)
        .then(updateRegularDeOrder)
        .then(getRegular)
        .then(getRegularDeAll)
        .then(chNum)
        .then(closeLoadingWithMask);
    function setOrdown(result) {
        return new Promise(function (resolve, reject) {
            const ttrr = $(params).parents()[1];
            const ttrr1 = $(ttrr).next()[0];
            $(ttrr1).after($(ttrr));
            resolve();
        })
    }
}

function updateRegularDeOrder(result) {
    return new Promise(function (resolve, reject) {
        const size = $('#rgch-tbb')
            .children()
            .length;

        let params = new Array();

        for (let i = 0; i < size; i++) {

            const aaa = $('#rgch-tbb').children()[i];
            const bbb = $(aaa).children()[1];
            const ii = $(aaa).children()[10];
            const ii1 = $(ii).children();

            const asd = {
                "codenum": $(ii1).attr('id'),
                "rdnum": $(bbb).text()
            };
            params.push(asd);
        }

        const url = "/reg/updateRegulardetailOrder";
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "POST"
        };

        console.log("parapara   " + params);

        $.ajax({
            url: url,
            type: "POST",
            headers: headers,
            dataType: "json",
            data: JSON.stringify(params),
            success: function (r) {
                if (r == 0) {
                    alert("노선정보 수정 실패!\n\n시스템을 확인해주세요.")
                    getRegularInfo();
                } else if (r == -1) {
                    alert("노선정보 수정 실패!\n\n데이터베이스 처리 과정에 문제가 발생하였습니다.")
                    getRegularInfo();
                } else if (r == -2) {
                    alert("노선정보 수정 실패!\n\n시스템을 확인해주세요.")
                    getRegularInfo();
                }
                resolve();
            }
        })
    });
}

function insertRegularDe(result) {
    return new Promise(function (resolve, reject) {
        const size = $('#rgch-tbb')
            .children()
            .length;

        const url = "/reg/regularDetailRegister";
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
                if (r == 0) {
                    alert("노선정보 입력 실패!\n\n시스템을 확인해주세요.")
                } else if (r == -1) {
                    alert("노선정보 입력 실패!\n\n데이터베이스 처리 과정에 문제가 발생하였습니다.")
                } else if (r == -2) {
                    alert("노선정보 입력 실패!\n\n시스템을 확인해주세요.")
                }
                resolve();
            }
        })
    });
}

$(document).on('keydown', '.upclas', function (eInner) {
    var keyValue = eInner.which;
    if (keyValue == 13) {
        updateRegularDe(this);
    }
})

$(document).on('change', '.upclasse', function () {
    updateRegularDe(this);
});

function updateRegularDe(papa) {
    LoadingWithMask()
        .then(upupgogo)
        .then(getRegular)
        .then(getRegularDeAll)
        .then(chNum)
        .then(closeLoadingWithMask);
    function upupgogo(result) {
        const tmp = $(papa)
            .parents()
            .parents()[0];
        const jj = $(tmp).children()[1];
        const jj1 = $(jj);
        const aa = $(tmp).children()[2];
        const aa1 = $(aa).children();
        const bb = $(tmp).children()[3];
        const bb1 = $(bb).children();
        const cc = $(tmp).children()[4];
        const cc1 = $(cc).children();
        const dd = $(tmp).children()[5];
        const dd1 = $(dd).children();
        const ee = $(tmp).children()[6];
        const ee1 = $(ee).children();
        const ff = $(tmp).children()[7];
        const ff1 = $(ff).children();
        const gg = $(tmp).children()[8];
        const gg1 = $(gg).children();
        const hh = $(tmp).children()[9];
        const hh1 = $(hh).children();
        const ii = $(tmp).children()[10];
        const ii1 = $(ii).children();

        var val = $(hh1).val();
        var carnum = $('#car-info option')
            .filter(function () {
                return this.value == val;
            })
            .data('value');

        return new Promise(function (resolve, reject) {
            const url = "/reg/updateRegulardetail";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "codenum": $(ii1).attr('id'),
                "rdnum": $(jj).text(),
                "rdname": $(aa1).val(),
                "rdbus": $(bb1).val(),
                "rdgonum": $(cc1).val(),
                "rdoutnum": $(dd1).val(),
                "rdconn": $(ee1).val(),
                "rdmoney": ($(ff1).val()).replace(',', ''),
                "rdaltm": ($(gg1).val()).replace(',', ''),
                "opercar": carnum,
                "rdtrash": 1
            };

            console.log(params);
            console.log(" $(jj)   " + $(jj).text());

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                dataType: "json",
                data: JSON.stringify(params),
                success: function (r) {
                    if (r == 0) {
                        alert("배차정보 입력 실패!\n\n시스템을 확인해주세요.")
                    } else if (r == -1) {
                        alert("배차정보 입력 실패!\n\n데이터베이스 처리 과정에 문제가 발생하였습니다.")
                    } else if (r == -2) {
                        alert("배차정보 입력 실패!\n\n시스템을 확인해주세요.")
                    }
                    resolve();
                }
            })
        });
    }
}

function delRegularDe(code, trash) {

    LoadingWithMask()
        .then(gogodel)
        .then(getRegular)
        .then(getRegularDeAll)
        .then(chNum)
        .then(closeLoadingWithMask);
    function gogodel(result) {
        return new Promise(function (resolve, reject) {

            const url = "/reg/regularDetaildel";
            const headers = {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "POST"
            };

            const params = {
                "codenum": code,
                "rdtrash": trash
            };

            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                dataType: "json",
                data: JSON.stringify(params),
                success: function (r) {
                    if (r == 0) {
                        alert("노선정보 삭제 실패!\n\n시스템을 확인해주세요.")
                    } else if (r == -1) {
                        alert("노선정보 삭제 실패!\n\n데이터베이스 처리 과정에 문제가 발생하였습니다.")
                    } else if (r == -2) {
                        alert("노선정보 삭제 실패!\n\n시스템을 확인해주세요.")
                    }
                    resolve();
                }
            })
        });
    }
}

function getRecou(params) {
    $('#regModal').modal({backdrop: 'static', keyboard: false});
}