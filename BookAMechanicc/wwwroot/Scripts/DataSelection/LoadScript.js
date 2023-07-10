$(document).ready(function () {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    $('.input-daterange-datepicker').val(today + " " + "-" + " " + today);

    $('.input-daterange-datepicker').daterangepicker({
        buttonClasses: ['btn', 'btn-sm'],
        applyClass: 'btn-info',
        cancelClass: 'btn-default'
    });

    $('#submitNew').on('click', function () {

        var DateRange = $('#daterange').val();
        console.log(DateRange);
        //var print = $('#Report').data('print-data');
        //var logPrint = $('#Report').data('print-log-data');
        $.ajax({
            url: "/Home/Submit",
            type: "POST",
            contentType: "application/json",
            data: '{"tb":"' + DateRange + '"}',
            dataType: "JSON",
            success: function (result) {
                $.toast({
                    heading: 'Suc',
                    text: 'All Record from ' + DateRange + ' Selected',
                    position: 'top-right',
                    loaderBg: '#fec107',
                    icon: 'info',
                    hideAfter: 3000,
                    stack: 6
                });
                console.log(result);
                var win = window.open("/Home/DetailPrint");
                win.focus();
            },
            error: function (response) {
                console.log(response.responseText);
                $.toast({
                    heading: 'fail',
                    text: "No Data Exists For This Date",
                    position: 'top-right',
                    loaderBg: '#fec107',
                    icon: 'info',
                    hideAfter: 3000,
                    stack: 6
                });
            }
        });
    });
});