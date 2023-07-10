var Data = null;
$(document).ready(function () {
    loadData();
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
    $(".dept .select2").on("change", function (e) {
        $('#ddl-emp').prop("disabled", false);
        $('#chk-emp').prop('disabled', false);
        $('#chk-emp').prop('checked', false);
    });
    $('#chk-dept').on('click', function () {

        if ($('#chk-dept').is(':checked')) {
            $("#ddl-dept").prop("disabled", true);
            $('#ddl-emp').prop("disabled", true);
            $('#chk-emp').prop('disabled', true);
            $('#chk-emp').prop('checked', true);

            $.toast().reset('all');
            $("body").removeAttr('class');
            $.toast({
                heading: 'Info',
                text: 'All Employee from All Departments Selected.',
                position: 'top-right',
                loaderBg: '#fec107',
                icon: 'info',
                hideAfter: 3000,
                stack: 6
            });



        } else {
            $("#ddl-dept").prop("disabled", false);
            $('#ddl-emp').prop("disabled", false);
            $('#chk-emp').prop('disabled', false);
            $('#chk-emp').prop('checked', false);
        }
    });

    $('#chk-emp').on('click', function () {

        if ($(".dept .select2 option:selected").val() < 0) {

            $.toast().reset('all');
            $("body").removeAttr('class');
            $('#chk-emp').prop('checked', false);
            $.toast({
                heading: 'Alert',
                text: 'Please Select Department first',
                position: 'top-right',
                loaderBg: '#fec107',
                icon: 'warning',
                hideAfter: 3000,
                stack: 6
            });

        } else {
            if ($('#chk-emp').is(':checked')) {
                $('#ddl-emp').prop("disabled", true);

                $.toast().reset('all');
                $("body").removeAttr('class');
                $.toast({
                    heading: 'Info',
                    text: 'All Employee from ' + $(".dept .select2 option:selected").text() + ' Selected.',
                    position: 'top-right',
                    loaderBg: '#fec107',
                    icon: 'info',
                    hideAfter: 3000,
                    stack: 6
                });

            } else {

                $('#ddl-emp').prop("disabled", false);

            }
        }
    });


    $('#submit').on('click', function () {

        var AttendanceReport = $('#url').data('attendance');
        var TimeIn = $(".timeIn").val();
        var TimeOut = $(".timeOut").val();
        var EmployeeID = $(".emp .select2 option:selected").val();
        var DepartmentID = "";

        console.log(TimeIn, TimeOut);

     



        var print = $('#Report').data('print-data');
        var logPrint = $('#Report').data('print-log-data');
        $.ajax({
            url: print,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ TimeIn: TimeIn, EmployeeID: EmployeeID, TimeOut: TimeOut }),
            success: function (result) {
                $.toast({
                    heading: 'Suc',
                    text: 'All Employee from ' + $(".dept .select2 option:selected").text() + ' Selected.',
                    position: 'top-right',
                    loaderBg: '#fec107',
                    icon: 'info',
                    hideAfter: 3000,
                    stack: 6
                });
                console.log(result);
                var win = window.open(logPrint);
                win.focus();
            },
            error: function (response) {
                console.log(response.responseText);
                $.toast({
                    heading: 'fail',
                    text: response,
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

function loadData() {
    var GetData = $('#Report').data('get-s-data');
    $.get(GetData)
        .done(function (response) {
            Data = response;
            $('#ddl-dept')
                .append($("<option></option>")
                    .attr("value", -1)
                    .text('--Select Department--'));
            $.each(Data.Department, function (index, department) {
                $('#ddl-dept')
                    .append($("<option></option>")
                        .attr("value", department.ID)
                        .text(department.Name)).trigger('change');;
            });

            $('#ddl-leave')
                .append($("<option></option>")
                    .attr("value", -1)
                    .text('--Select Leave--'));
            $.each(Data.Leave, function (index, leave) {
                $('#ddl-leave')
                    .append($("<option></option>")
                        .attr("value", leave.ID)
                        .text(leave.Type)).trigger('change');;
            });
            $('#ddl-emp')
                .append($("<option></option>")
                    .attr("value", -1)
                    .text('--Select Employee--'));
            $("#ddl-dept").change(function () {
                loadEmployee($(this).val());
            });

        });

}




function loadEmployee(DepartmentID) {
    $('#ddl-emp')
        .find('option')
        .remove();
    $('#ddl-emp')
        .append($("<option></option>")
            .attr("value", -1)
            .text('--Select Employee--'));
    $.each(Data.Employee, function (index, employee) {
        if (employee['Dept_ID'] == DepartmentID) {

            $('#ddl-emp').append(new Option(employee.Name, employee.ID, false, false));
        }
    });
}
