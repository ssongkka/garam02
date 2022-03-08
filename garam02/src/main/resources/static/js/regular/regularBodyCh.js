$(document).ready(function () {});

$(document).on('click', '#md-rgCh', function () {
    const wh = confirm("정기운행 정보로 돌아가시겠습니까?\n\n저장되지 않은 정보는 사라집니다.");
    if (wh) {
        window.open('/regular', '정기운행정보');
    }
});