$(document).on('click', '#btnContPaper', function () {
    $(document).on('show.bs.modal', '#modalPaper1', function () {
        $('#modalPaper0').modal('hide');
    })
    $('#modalPaper1').modal('show');
});

$(document).on('click', '#btnAlloPaper', function () {
    $(document).on('show.bs.modal', '#modalPaper2', function () {
        $('#modalPaper0').modal('hide');
    })
    $('#modalPaper2').modal('show');
});