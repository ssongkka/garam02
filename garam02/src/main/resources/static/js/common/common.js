class dateUtil {
    isSameDay(target1, target2) {
        return target1.getFullYear() === target2.getFullYear() && target1.getMonth() === target2.getMonth() && target1.getDate() === target2.getDate();
    }
}

const empFolder = 'http://192.168.35.29:8000/list/HDD2/src/emp/';
const veFolder = 'http://192.168.35.29:8000/list/HDD2/src/ve/';

const tableCh = '#337ab7';

$(document).ready(function () {

    $('input').attr('autocomplete', 'off');
});

var tooltipTriggerList = []
    .slice
    .call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})

function LoadingWithMask(param) {
    return new Promise(function (resolve, reject) {

        //화면의 높이와 너비를 구합니다.
        var maskHeight = $(document).height();
        var maskWidth = window.document.body.clientWidth;

        //화면에 출력할 마스크를 설정해줍니다.

        mask = `<div id='mask'>
        <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        style="margin: auto; background: none; display: block; shape-rendering: auto;"
        width="100px"
        height="100px"
        viewbox="0 0 100 100"
        preserveaspectratio="xMidYMid">
        <circle cx="84" cy="50" r="10" fill="#f05125">
            <animate
                attributename="r"
                repeatcount="indefinite"
                dur="0.4166666666666667s"
                calcmode="spline"
                keytimes="0;1"
                values="10;0"
                keysplines="0 0.5 0.5 1"
                begin="0s"/>
            <animate
                attributename="fill"
                repeatcount="indefinite"
                dur="1.6666666666666667s"
                calcmode="discrete"
                keytimes="0;0.25;0.5;0.75;1"
                values="#f05125;#32a0da;#7fbb42;#fdb813;#f05125"
                begin="0s"/>
        </circle>
        <circle cx="16" cy="50" r="10" fill="#f05125">
            <animate
                attributename="r"
                repeatcount="indefinite"
                dur="1.6666666666666667s"
                calcmode="spline"
                keytimes="0;0.25;0.5;0.75;1"
                values="0;0;10;10;10"
                keysplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                begin="0s"/>
            <animate
                attributename="cx"
                repeatcount="indefinite"
                dur="1.6666666666666667s"
                calcmode="spline"
                keytimes="0;0.25;0.5;0.75;1"
                values="16;16;16;50;84"
                keysplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                begin="0s"/>
        </circle>
        <circle cx="50" cy="50" r="10" fill="#fdb813">
            <animate
                attributename="r"
                repeatcount="indefinite"
                dur="1.6666666666666667s"
                calcmode="spline"
                keytimes="0;0.25;0.5;0.75;1"
                values="0;0;10;10;10"
                keysplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                begin="-0.4166666666666667s"/>
            <animate
                attributename="cx"
                repeatcount="indefinite"
                dur="1.6666666666666667s"
                calcmode="spline"
                keytimes="0;0.25;0.5;0.75;1"
                values="16;16;16;50;84"
                keysplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                begin="-0.4166666666666667s"/>
        </circle>
        <circle cx="84" cy="50" r="10" fill="#7fbb42">
            <animate
                attributename="r"
                repeatcount="indefinite"
                dur="1.6666666666666667s"
                calcmode="spline"
                keytimes="0;0.25;0.5;0.75;1"
                values="0;0;10;10;10"
                keysplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                begin="-0.8333333333333334s"/>
            <animate
                attributename="cx"
                repeatcount="indefinite"
                dur="1.6666666666666667s"
                calcmode="spline"
                keytimes="0;0.25;0.5;0.75;1"
                values="16;16;16;50;84"
                keysplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                begin="-0.8333333333333334s"/>
        </circle>
        <circle cx="16" cy="50" r="10" fill="#32a0da">
            <animate
                attributename="r"
                repeatcount="indefinite"
                dur="1.6666666666666667s"
                calcmode="spline"
                keytimes="0;0.25;0.5;0.75;1"
                values="0;0;10;10;10"
                keysplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                begin="-1.25s"/>
            <animate
                attributename="cx"
                repeatcount="indefinite"
                dur="1.6666666666666667s"
                calcmode="spline"
                keytimes="0;0.25;0.5;0.75;1"
                values="16;16;16;50;84"
                keysplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                begin="-1.25s"/>
        </circle>
        <!-- [ldio] generated by https://loading.io/ -->
    </svg>
    </div>`;

        //화면에 레이어 추가
        $('body').append(mask);
        // .append(loadingImg) 마스크의 높이와 너비를 화면 것으로 만들어 전체 화면을 채웁니다.
        $('#mask').css({'width': '100%', 'height': '100%'});

        //마스크 표시
        $('#mask').show();
        //로딩중 이미지 표시 $('#loadingImg').show();
        resolve(param);
    })
}

function closeLoadingWithMask() {
    return new Promise(function (resolve, reject) {
        $('#mask').hide();
        $('#mask').remove();
        resolve();
    })
}

function leftPad(value) {
    if (value >= 10) {
        return value;
    }
    return `0${value}`;
}

function toStringByFormatting(source, delimiter = '-') {
    const year = source.getFullYear();
    const month = leftPad(source.getMonth() + 1);
    const day = leftPad(source.getDate());
    return [year, month, day].join(delimiter);
}

function betweenDate(sday, nday, eday) {
    var date_arr1 = sday.split("-");
    var date_arr2 = nday.split("-");
    var date_arr3 = eday.split("-");

    var stDate = new Date(date_arr1[0], date_arr1[1] - 1, date_arr1[2]);
    var nDate = new Date(date_arr2[0], date_arr2[1] - 1, date_arr2[2]);
    var endDate = new Date(date_arr3[0], date_arr3[1] - 1, date_arr3[2]);

    var btMs1 = endDate.getTime() - stDate.getTime();
    var btMs2 = nDate.getTime() - stDate.getTime();

    var bak = btMs1 / (1000 * 60 * 60 * 24);
    var il = bak + 1;
    var bet = '';

    if (sday == nday) {
        bet = '출발';
    } else if (nday == eday) {
        bet = '도착';
    } else {
        bet = (btMs2 / (1000 * 60 * 60 * 24)) + 1 + '일';
    }

    const rtn = '(' + bak + '박' + il + '일/' + bet + ')';

    return rtn;
}

function betweenDateNum(sday, eday) {
    var date_arr1 = sday.split("-");
    var date_arr3 = eday.split("-");

    var stDate = new Date(date_arr1[0], date_arr1[1] - 1, date_arr1[2]);
    var endDate = new Date(date_arr3[0], date_arr3[1] - 1, date_arr3[2]);

    var btMs1 = endDate.getTime() - stDate.getTime();

    var bak = btMs1 / (1000 * 60 * 60 * 24);
    var il = bak + 1;

    if (bak < 0) {
        return bak;
    } else {
        return il;
    }
}

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function resize(obj) {
    obj.style.height = "1px";
    obj.style.height = (12 + obj.scrollHeight) + "px";
}

function getCalTime(calTime) {
    if (calTime != null) {
        var tmp_Cal = calTime.substring(0, 10);
        var tmp_Time = calTime.substring(11, 15);

        var tmp_Arr_Cal = tmp_Cal.split("-");
        var tmp_Arr_Time = tmp_Time.split(":");

        var cal = tmp_Arr_Cal[0] + "." + tmp_Arr_Cal[1] + "." + tmp_Arr_Cal[2] + ".";
        var time = "";
        if (tmp_Arr_Time[1] < 10) {
            time = tmp_Arr_Time[0] + ":0" + tmp_Arr_Time[1];
        } else {
            time = tmp_Arr_Time[0] + ":" + tmp_Arr_Time[1];
        }

        return cal + " " + time;
    } else {
        return "없음";
    }
}
function getCal(cal) {
    if (cal != null) {
        var tmp_Arr_Cal = cal.split("-");

        var cal1 = tmp_Arr_Cal[0] + "년" + tmp_Arr_Cal[1] + "월" + tmp_Arr_Cal[2] + "일";

        return cal1;
    } else {
        return "진행 중";
    }
}

function getCalTimeInputJSP(calTime) {

    var tmpArr = calTime.split(' ');
    var tmpDate = tmpArr[0];
    var tmpTime = tmpArr[1];

    var rtn = tmpDate + "T" + tmpTime;

    console.log("ttrrtter   " + rtn);

    return rtn;
}

function getCalTimeInputJSPtoDB(calTime) {

    var rtn_Date = calTime.substring(0, 10);
    var rtn_Time = calTime.substring(11);

    console.log("qqwdqdwdd   " + rtn_Date + ' ' + rtn_Time);

    return rtn_Date + ' ' + rtn_Time;
}

// Jquery Dependency 키를 누르거나 떼었을때 이벤트 발생
$("input[data-type='currency']").bind('keyup keydown', function () {
    inputNumberFormat(this);
});

//입력한 문자열 전달
function inputNumberFormat(obj) {
    obj.value = comma(uncomma(obj.value));
}

//콤마찍기
function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

//콤마풀기
function uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, '');
}

//숫자만 리턴(저장할때) alert(cf_getNumberOnly('1,2./3g')); -> 123 return
function cf_getNumberOnly(str) {
    var len = str.length;
    var sReturn = "";

    for (var i = 0; i < len; i++) {
        if ((str.charAt(i) >= "0") && (str.charAt(i) <= "9")) {
            sReturn += str.charAt(i);
        }
    }
    return sReturn;
}

function numberOnly(e) {
    e.value = e
        .value
        .replace(/[^0-9.]/g, '')
        .replace(/(\..*)\./g, '$1');
};

function AddComma(num) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num
        .toString()
        .replace(regexp, ',');
}

function fnNullCheck(str) {
    var newStr = str;

    console.log(str);

    if (newStr == null || newStr == "" || newStr == undefined || newStr == "undefined") {
        return 0;
    } else {
        return 1;
    }
}

function setImageFromFile(input, expression, id) {
    const aaa = $(id)
        .val()
        .split('\\');
    const bbb = aaa[aaa.length - 1].split('.');
    const imgName = bbb[1];
    if (input.files && input.files[0]) {
        console.log(input.files);
        console.log(input.files[0]);
        var reader = new FileReader();
        reader.onload = function (e) {
            $(expression).attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    } else {
        $(expression).attr('src', 'img/employee/emp.png');
    }
}

function setPdfFromFile(input, expression, id) {
    const aaa = $(id)
        .val()
        .split('\\');
    const bbb = aaa[aaa.length - 1].split('.');
    const imgName = bbb[1];
    if (input.files && input.files[0]) {
        console.log(input.files);
        console.log(input.files[0]);
        var reader = new FileReader();
        reader.onload = function (e) {
            $(expression).attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    } else {
        $(expression).attr('src', veFolder + 'choice.pdf');
    }
}

/**
 * Sorts a HTML table.
 *
 * @param {HTMLTableElement} table The table to sort
 * @param {number} column The index of the column to sort
 * @param {boolean} asc Determines if the sorting will be in ascending
 */
function sortTableByColumn(table, column, asc = true) {

    const tbClass = $(table)
        .attr('class')
        .split(' ')
        .includes('table-sortable');

    if (tbClass) {

        const dirModifier = asc
            ? 1
            : -1;
        const tBody = table.tBodies[0];
        const rows = Array.from(tBody.querySelectorAll("tr"));

        // Sort each row
        const sortedRows = rows.sort((a, b) => {
            const aColText = a
                .querySelector(`td:nth-child(${column + 1})`)
                .textContent
                .trim();
            const bColText = b
                .querySelector(`td:nth-child(${column + 1})`)
                .textContent
                .trim();

            return aColText > bColText
                ? (1 * dirModifier)
                : (-1 * dirModifier);
        });

        // Remove all existing TRs from the table
        while (tBody.firstChild) {
            tBody.removeChild(tBody.firstChild);
        }

        // Re-add the newly sorted rows
        tBody.append(...sortedRows);

        // Remember how the column is currently sorted
        table
            .querySelectorAll("th")
            .forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
        table
            .querySelector(`th:nth-child(${column + 1})`)
            .classList
            .toggle("th-sort-asc", asc);
        table
            .querySelector(`th:nth-child(${column + 1})`)
            .classList
            .toggle("th-sort-desc", !asc);
    }
}
function sortTableByColumn111(table, column, asc = true) {
    const dirModifier = asc
        ? 1
        : -1;
    const tBody = table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll("tr"));

    // Sort each row
    const sortedRows = rows.sort((a, b) => {
        const aColText = a
            .querySelector(`td:nth-child(${column + 1})`)
            .textContent
            .trim();
        const bColText = b
            .querySelector(`td:nth-child(${column + 1})`)
            .textContent
            .trim();

        return aColText > bColText
            ? (1 * dirModifier)
            : (-1 * dirModifier);
    });

    // Remove all existing TRs from the table
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }

    // Re-add the newly sorted rows
    tBody.append(...sortedRows);

    // Remember how the column is currently sorted
    table
        .querySelectorAll("th")
        .forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
    table
        .querySelector(`th:nth-child(${column + 1})`)
        .classList
        .toggle("th-sort-asc", asc);
    table
        .querySelector(`th:nth-child(${column + 1})`)
        .classList
        .toggle("th-sort-desc", !asc);
}

document
    .querySelectorAll(".table-sortable th")
    .forEach(headerCell => {
        headerCell.addEventListener("click", () => {
            const tableElement = headerCell.parentElement.parentElement.parentElement;
            const headerIndex = Array
                .prototype
                .indexOf
                .call(headerCell.parentElement.children, headerCell);
            const currentIsAscending = headerCell
                .classList
                .contains("th-sort-asc");

            sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
        });
    });

function loginSession(status) {
    if (status === 403) {
        location.reload();
        alert(
            "로그인 제한 시간이 만료되었습니다.\n\n로그인 후 10분동안 아무작업이 없으면 자동으로 로그아웃됩니다.\n다시 로그인해주세요."
        );
    } else {}
}

function refleshMsg(msg) {
    alert(msg);
    location.reload();
}

function updateImg(source, id) {
    const timestamp = (new Date()).getTime();
    const newUrl = source + '?_=' + timestamp;

    $('#' + id).attr('src', newUrl);
    setTimeout(updateImg, 1000);
}

function tbChoice(id) {
    $('td').css('background', 'none');
    $('td').css('color', 'black');

    $('#' + id)
        .children('td')
        .css('background', 'var(--main-color)');
    $('#' + id)
        .children('td')
        .css('color', 'white');
}
function tbChoiceThis(param) {
    $('td').css('background', 'none');
    $('td').css('color', 'black');

    $(param)
        .children('td')
        .css('background', 'var(--main-color)');
    $(param)
        .children('td')
        .css('color', 'white');
}

function tbChoiceSe(id) {
    $('#' + id)
        .parents()
        .children('tr')
        .children('td')
        .css('background', 'none');
    $('#' + id)
        .parents()
        .children('tr')
        .children('td')
        .css('color', 'black');

    $('#' + id)
        .children('td')
        .css('background', 'var(--main-color)');
    $('#' + id)
        .children('td')
        .css('color', 'white');
}

//숫자만남기고제거
function onlynumberic(event) {
    event.target.value = event
        .target
        .value
        .replace(/[^0-9]/g, "");
}

function getDayOfWeek(num) {
    let rtn = "";

    switch (num) {
        case 1:
            rtn = "월요일";
            return rtn;
        case 2:
            rtn = "화요일";
            return rtn;
        case 3:
            rtn = "수요일";
            return rtn;
        case 4:
            rtn = "목요일";
            return rtn;
        case 5:
            rtn = "금요일";
            return rtn;
        case 6:
            rtn = "토요일";
            return rtn;
        default:
            rtn = "일요일";
            return rtn;
    }
}

function getStDEnD(params) {
    const getYM = params;
    const nowMonth = new Date(getYM.split('-')[0], getYM.split('-')[1] - 1, 1);

    const oneMonthAgo = new Date(nowMonth.setMonth(nowMonth.getMonth() + 1));

    const yesterday = new Date(oneMonthAgo.setDate(oneMonthAgo.getDate() - 1));

    const stday = toStringByFormatting(
        new Date(oneMonthAgo.getFullYear(), oneMonthAgo.getMonth(), 1)
    );
    const endday = toStringByFormatting(yesterday);

    let returnArr = new Array();

    returnArr.push(stday);
    returnArr.push(endday);

    return returnArr;
}

function showPlusBtn() {
    $('#cusPbtn').show();
}
function hidePlusBtn() {
    $('#cusPbtn').hide();
}
function showPlusDetail() {
    $('.cusP').show();
}
function hidePlusDetail() {
    $('.cusP').hide();
}