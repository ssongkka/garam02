$(document).on('click', '.choInsu', function () {

    const aaa = $(this)
        .parent()
        .prev()
        .prev()
        .prev()
        .prev()
        .children();
    const insuNum = $(aaa[0]).val();
    const insuSepaNum = $(aaa[1]).val();

    const carN = $('#ve00').val();

    const bbb = $('#ve02').children()[0];
    const canNumNUm = $(bbb).text();



    $('#insuCarNum').val(carN);
    $('#modal-insuCont-mh').text(canNumNUm + "  보험정보");

    $('#modal-insuCont').modal('show');
});

$(document).on('click', '#newInsuCont', function () {

    const carN = $('#ve00').val();

    const bbb = $('#ve02').children()[0];
    const canNumNUm = $(bbb).text();

    $('#insuCarNum').val(carN);
    $('#modal-insuCont-mh').text(canNumNUm + "  신규 보험정보 입력");

    $('#modal-insuCont').modal('show');
});