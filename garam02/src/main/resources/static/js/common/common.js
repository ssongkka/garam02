class dateUtil {
    isSameDay(target1, target2) {
        return target1.getFullYear() === target2.getFullYear() && target1.getMonth() === target2.getMonth() && target1.getDate() === target2.getDate();
    }
}

const empFolder = 'http://192.168.35.136:8000/list/HDD2/src/img/emp/';
const veFolder = 'http://192.168.35.136:8000/list/HDD2/src/img/ve/';

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

    var stDate = new Date(date_arr1[0], date_arr1[1], date_arr1[2]);
    var nDate = new Date(date_arr2[0], date_arr2[1], date_arr2[2]);
    var endDate = new Date(date_arr3[0], date_arr3[1], date_arr3[2]);

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

    console.log("일수 차이는?? " + rtn);
    return rtn;
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

// Jquery Dependency

$("input[data-type='currency']").on({
    keyup: function () {
        formatCurrency($(this));
    },
    blur: function () {
        formatCurrency($(this), "blur");
    }
});

function formatNumber(n) {
    // format number 1000000 to 1,234,567
    return n
        .replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function formatCurrency(input, blur) {
    // appends $ to value, validates decimal side and puts cursor back in right
    // position. get input value
    var input_val = input.val();

    // don't validate empty input
    if (input_val === "") {
        return;
    }

    // original length
    var original_len = input_val.length;

    // initial caret position
    var caret_pos = input.prop("selectionStart");

    // check for decimal
    if (input_val.indexOf(".") >= 0) {

        // get position of first decimal this prevents multiple decimals from being
        // entered
        var decimal_pos = input_val.indexOf(".");

        // split number by decimal point
        var left_side = input_val.substring(0, decimal_pos);
        var right_side = input_val.substring(decimal_pos);

        // add commas to left side of number
        left_side = formatNumber(left_side);

        // validate right side
        right_side = formatNumber(right_side);

        // On blur make sure 2 numbers after decimal
        if (blur === "blur") {
            right_side += "00";
        }

        // Limit decimal to only 2 digits
        right_side = right_side.substring(0, 2);

        // join number by .
        input_val = left_side + "." + right_side;

    } else {
        // no decimal entered add commas to number remove all non-digits
        input_val = formatNumber(input_val);
        input_val = input_val;
    }

    // send updated string to input
    input.val(input_val);

    // put caret back in the right position
    var updated_len = input_val.length;
    caret_pos = updated_len - original_len + caret_pos;
    input[0].setSelectionRange(caret_pos, caret_pos);
}

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

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
        if (imgName == 'png' || imgName == 'jpg' || imgName == 'bmp' || imgName == 'gif') {
            var reader = new FileReader();
            reader.onload = function (e) {
                $(expression).attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        } else {
            alert("이미지 파일이 아닙니다.\n'png', 'jpg', 'bmp', 'gif' 형식의 파일을 선택해 주세요.");
            $(expression).attr('src', 'img/employee/emp.png');
            $(id).val('');
        }
    } else {
        $(expression).attr('src', 'img/employee/emp.png');
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

function loginSession() {
    alert(
        "로그인 제한 시간이 만료되었습니다.\n\n로그인 후 10분동안 아무작업이 없으면 자동으로 로그아웃됩니다.\n다시 로그인해주세요."
    );
    location.reload();
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