var Data = null;
var DataEmp = null;

$(document).ready(function () {
    if ($('.custom').length > 0) {
        loadData();
    }
    else if ($('.course').length > 0) {
        loadDataDept();
    }
    else if ($('.sqn').length > 0) {
        loadDataSqn();
    }   
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
        $('#chk-cad').prop('disabled', false);
        $('#chk-cad').prop('checked', false);
    });
    $('#chk-cad').on('click', function () {

        if ($('#chk-cad').is(':checked'))
        {
            $("#ddl-emp").prop("disabled", true);
            $.toast().reset('all');
            $("body").removeAttr('class');
            $.toast({
                heading: 'Info',
                text: 'All Cadets Selected.',
                position: 'top-right',
                loaderBg: '#fec107',
                icon: 'info',
                hideAfter: 3000,
                stack: 6
            });
        }
        else
        {
            $("#ddl-emp").prop("disabled", false);
            $('#ddl-emp').prop("disabled", false);
            $('#chk-cad').prop('disabled', false);
            $('#chk-cad').prop('checked', false);
        }
    });
    $('#chk-sqn').on('click', function () {

        if ($('#chk-sqn').is(':checked'))
        {
            $("#ddl-dept").prop("disabled", true);
            $.toast().reset('all');
            $("body").removeAttr('class');
            $.toast({
                heading: 'Info',
                text: 'All Squadrons Selected.',
                position: 'top-right',
                loaderBg: '#fec107',
                icon: 'info',
                hideAfter: 3000,
                stack: 6
            });
        }
        else
        {
            $("#ddl-dept").prop("disabled", false);
            $('#ddl-emp').prop("disabled", false);
            $('#chk-cad').prop('disabled', false);
            $('#chk-cad').prop('checked', false);
        }
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
    $('#chk-cor').on('click', function () {

        if ($('#chk-cor').is(':checked')) {
            $("#ddl-emp").prop("disabled", true);
            $('#ddl-emp').prop("disabled", true);
            $('#chk-emp').prop('disabled', true);
            $('#chk-emp').prop('checked', true);

            $.toast().reset('all');
            $("body").removeAttr('class');
            $.toast({
                heading: 'Info',
                text: 'All Courses Selected.',
                position: 'top-right',
                loaderBg: '#fec107',
                icon: 'info',
                hideAfter: 3000,
                stack: 6
            });
        }
        else {
            $("#ddl-emp").prop("disabled", false);
            $('#ddl-emp').prop("disabled", false);
            $('#chk-cor').prop('disabled', false);
            $('#chk-cor').prop('checked', false);
        }
    });
    $('#submitCourse').on('click', function () {
    var DepartmentID = $(".dept .select2 option:selected").val();
    var EmployeeID = $(".emp .select2 option:selected").val();
    var Locations = $(".loc .select2 option:selected").val();
    var DateRange = $('#daterange').val();

        if ($('#chk-cad').is(':checked'))
        {
            EmployeeID = -1;
        }
    console.log(DateRange);
   
    $.ajax({
        url: "/Home/Submit",
        type: "POST",
        contentType: "application/json",
        data: '{"tb":"' + DateRange + '","selectedEmp":"' + EmployeeID + '","selectedDept":"' + DepartmentID + '","selectedLoc":"' + Locations + '"}',
        dataType:"JSON",
        success: function (result)
        {
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
        error: function (response)
        {
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
    $('#submitMonth').on('click', function () {
        var DepartmentID = $(".dept .select2 option:selected").val();
        var EmployeeID = $(".emp .select2 option:selected").val();
        var Locations = $(".loc .select2 option:selected").val();
        var DateRange = $('#daterange').val();

        if ($('#chk-cad').is(':checked')) {
            EmployeeID = -1;
        }
        console.log(DateRange);

        $.ajax({
            url: "/Home/Submit",
            type: "POST",
            contentType: "application/json",
            data: '{"tb":"' + DateRange + '","selectedEmp":"' + EmployeeID + '","selectedDept":"' + DepartmentID + '","selectedLoc":"' + Locations + '"}',
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
                var win = window.open("/Home/MonthlyPrint");
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
    $('#submitInout').on('click', function () {
        var DepartmentID = $(".dept .select2 option:selected").val();
        var EmployeeID = $(".course .select2 option:selected").val();
        var Locations = $(".loc .select2 option:selected").val();
        var DateRange = $('#daterange').val();

        if ($('#chk-sqn').is(':checked')) {
            DepartmentID = -1;
        }
        if ($('#chk-cor').is(':checked')) {
            EmployeeID = -1;
        }
        console.log(DateRange);

        $.ajax({
            url: "/Home/SubmitCustom",
            type: "POST",
            contentType: "application/json",
            data: '{"tb":"' + DateRange + '","selectedEmp":"' + EmployeeID + '","selectedDept":"' + DepartmentID + '","selectedLoc":"' + Locations + '"}',
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
                var win = window.open("/Home/InoutPrint");
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
    $('#submitPerforma').on('click', function () {
        var DepartmentID = $(".dept .select2 option:selected").val();
        var EmployeeID = $(".course .select2 option:selected").val();
        var Locations = $(".loc .select2 option:selected").val();
        var DateRange = $('#daterange').val();
        var timeS = $('#timeS').val();
        var timeO = $('#timeO').val();

        if ($('#chk-sqn').is(':checked')) {
            DepartmentID = -1;
        }
        if ($('#chk-cor').is(':checked')) {
            EmployeeID = -1;
        }
        console.log(DateRange);

        $.ajax({
            url: "/Home/SubmitPerforma",
            type: "POST",
            contentType: "application/json",
            data: '{"tb":"' + DateRange + '","selectedEmp":"' + EmployeeID + '","selectedDept":"' + DepartmentID + '","selectedLoc":"' + Locations + '","selectedTimeS":"' + timeS + '","selectedTimeO":"' + timeO + '"}',
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
                var win = window.open("/Home/PerformaPrint");
                win.focus();
            },
            error: function (response) {
                console.log(response.responseText);
                $.toast({
                    heading: 'fail',
                    text: "No Data Exists For This Date/Time",
                    position: 'top-right',
                    loaderBg: '#fec107',
                    icon: 'info',
                    hideAfter: 3000,
                    stack: 6
                });
            }
        });
    });
    $('#submitDaily').on('click', function () {
        var DepartmentID = $(".dept .select2 option:selected").val();
        var EmployeeID = $(".emp .select2 option:selected").val();
        var Locations = $(".loc .select2 option:selected").val();
        var DateRange = $('#daterange').val();

        if ($('#chk-cad').is(':checked')) {
            EmployeeID = -1;
        }
        console.log(DateRange);

        $.ajax({
            url: "/Home/SubmitSqn",
            type: "POST",
            contentType: "application/json",
            data: '{"tb":"' + DateRange + '","selectedEmp":"' + EmployeeID + '","selectedDept":"' + DepartmentID + '","selectedLoc":"' + Locations + '"}',
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
                var win = window.open("/Home/DailyPrint");
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
    $('#submitLate').on('click', function () {
        var DepartmentID = $(".dept .select2 option:selected").val();
        var EmployeeID = $(".course .select2 option:selected").val();
        var Locations = $(".loc .select2 option:selected").val();
        var DateRange = $('#daterange').val();

        if ($('#chk-sqn').is(':checked')) {
            DepartmentID = -1;
        }
        if ($('#chk-cor').is(':checked')) {
            EmployeeID = -1;
        }
        console.log(DateRange);

        $.ajax({
            url: "/Home/SubmitLate",
            type: "POST",
            contentType: "application/json",
            data: '{"tb":"' + DateRange + '","selectedEmp":"' + EmployeeID + '","selectedDept":"' + DepartmentID + '","selectedLoc":"' + Locations + '"}',
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
                var win = window.open("/Home/LateArrivalPrint");
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
    $('#submitEarly').on('click', function () {
        var DepartmentID = $(".dept .select2 option:selected").val();
        var EmployeeID = $(".course .select2 option:selected").val();
        var Locations = $(".loc .select2 option:selected").val();
        var DateRange = $('#daterange').val();

        if ($('#chk-sqn').is(':checked')) {
            DepartmentID = -1;
        }
        if ($('#chk-cor').is(':checked')) {
            EmployeeID = -1;
        }
        console.log(DateRange);

        $.ajax({
            url: "/Home/SubmitEarly",
            type: "POST",
            contentType: "application/json",
            data: '{"tb":"' + DateRange + '","selectedEmp":"' + EmployeeID + '","selectedDept":"' + DepartmentID + '","selectedLoc":"' + Locations + '"}',
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
                var win = window.open("/Home/EarlyDeparturePrint");
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
    $('#submitStaff').on('click', function () {

        var DepartmentID = $(".dept .select2 option:selected").val();
        var EmployeeID = $(".course .select2 option:selected").val();
        var Locations = $(".loc .select2 option:selected").val();
        var DateRange = $('#daterange').val();

        if ($('#chk-sqn').is(':checked')) {
            DepartmentID = -1;
        }
        if ($('#chk-cor').is(':checked')) {
            EmployeeID = -1;
        }
        console.log(DateRange);

        $.ajax({
            url: "/Home/SubmitStaff",
            type: "POST",
            contentType: "application/json",
            data: '{"tb":"' + DateRange + '","selectedEmp":"' + EmployeeID + '","selectedDept":"' + DepartmentID + '","selectedLoc":"' + Locations + '"}',
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
                var win = window.open("/Home/StaffPrint");
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
    $('#submitAbsent').on('click', function () {

        var DepartmentID = $(".dept .select2 option:selected").val();
        var EmployeeID = $(".course .select2 option:selected").val();
        var Locations = $(".loc .select2 option:selected").val();
        var DateRange = $('#daterange').val();

        if ($('#chk-sqn').is(':checked')) {
            DepartmentID = -1;
        }
        if ($('#chk-cor').is(':checked')) {
            EmployeeID = -1;
        }
        console.log(DateRange);

        $.ajax({
            url: "/Home/SubmitAbsent",
            type: "POST",
            contentType: "application/json",
            data: '{"tb":"' + DateRange + '","selectedEmp":"' + EmployeeID + '","selectedDept":"' + DepartmentID + '","selectedLoc":"' + Locations + '"}',
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
                var win = window.open("/Home/AbsentPrint");
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

function loadData() {
    var GetData = "/Home/GetData";
    var GetEmpData = "/Home/GetDataSqn";
    $.get(GetEmpData).done(function (response)
    {
        DataEmp = response;
        $('#ddl-dept')
            .append($("<option></option>")
                .attr("value", -1)
                .text('--Select Squadron--'));
        $.each(DataEmp, function (index, squadron) {
            $('#ddl-dept')
                .append($("<option></option>")
                    .attr("value", squadron)
                    .text(squadron));;
        });
    });
    $.get(GetData)
        .done(function (response)
        {
            Data = response;
            
                $('#ddl-emp')
                    .append($("<option></option>")
                        .attr("value", -1)
                        .text('--Select Course--'));
                $.each(Data, function (index, department) {
                    $('#ddl-emp')
                        .append($("<option></option>")
                            .attr("value", department)
                            .text(department));;
                });
           
        });
}

function loadDataDept() {
    var GetData = "/Home/GetData";
    var GetEmpData = "/Home/GetEmpData";   
    $.get(GetEmpData).done(function (response) { DataEmp = response; });
   /* $.get(P_person).done(function (response) { DataPerson = response; });*/
    //$.get(GetLocData).done(function (response) {
    //    DataLoc = response;
    //    $('#ddl-Location')
    //        .append($("<option></option>")
    //            .attr("value", -1)
    //            .text('--Select Location--'));
    //    $('#ddl-Location')
    //        .append($("<option></option>")
    //            .attr("value", 'KIOSK')
    //            .text('KIOSK')).trigger('change');
    //    $.each(DataLoc, function (index, location) {
    //        $('#ddl-Location')
    //            .append($("<option></option>")
    //                .attr("value", location)
    //                .text(location)).trigger('change');;
    //    });
    //});
    $.get(GetData)
        .done(function (response) {
            Data = response;
            $('#ddl-dept')
                .append($("<option></option>")
                    .attr("value", -1)
                    .text('--Select Course--'));
            $.each(Data, function (index, department) {
                $('#ddl-dept')
                    .append($("<option></option>")
                        .attr("value", department)
                        .text(department)).trigger('change');;
            });
            if ($('.vehicle').length > 0) {
                $('#ddl-emp')
                    .append($("<option></option>")
                        .attr("value", -1)
                        .text('--Select Vehicle--'));
            }
            else
            {
                $('#ddl-emp')
                    .append($("<option></option>")
                        .attr("value", -1)
                        .text('--Select Cadet--'));
            }
            
            $("#ddl-dept").change(function () {
                loadEmployee($(this).val());
            });
 });
}

function loadDataSqn() {
    var GetData = "/Home/GetDataSqn";
    var GetEmpData = "/Home/GetEmpData";   
    $.get(GetEmpData).done(function (response) { DataEmp = response; });
  
    $.get(GetData)
        .done(function (response) {
            Data = response;
            $('#ddl-dept')
                .append($("<option></option>")
                    .attr("value", -1)
                    .text('--Select Squadron--'));
            $.each(Data, function (index, department) {
                $('#ddl-dept')
                    .append($("<option></option>")
                        .attr("value", department)
                        .text(department)).trigger('change');;
            });
            if ($('.vehicle').length > 0) {
                $('#ddl-emp')
                    .append($("<option></option>")
                        .attr("value", -1)
                        .text('--Select Vehicle--'));
            }
            else
            {
                $('#ddl-emp')
                    .append($("<option></option>")
                        .attr("value", -1)
                        .text('--Select Cadet--'));
            }
            
            $("#ddl-dept").change(function () {
                loadEmployee($(this).val());
            });
 });
}

function loadEmployee(DepartmentID) {
    $('#ddl-emp')
        .find('option')
        .remove();

    if ($('.vehicle').length > 0)
    {
        $('#ddl-emp')
            .append($("<option></option>")
                .attr("value", -1)
                .text('--Select Vehicle--'));

        $.each(DataEmp, function (index, employee) {
            if (employee.Department == DepartmentID) {
                $.each(DataPerson, function (index, vehicle) {
                    if (employee.Code == vehicle.id_no) {
                        $('#ddl-emp').append(new Option(vehicle.id_name, employee.ID, false, false));
                    }
                });
            }
        });
    }
    else if ($('.sqn').length > 0)
    {
        $('#ddl-emp')
            .append($("<option></option>")
                .attr("value", -1)
                .text('--Select Cadet--'));

        $.each(DataEmp, function (index, employee) {
            if (employee.Sqn == DepartmentID) {
                $('#ddl-emp').append(new Option(employee.Name, employee.PakNo, false, false));
            }
        });
    }
    else
    {
        $('#ddl-emp')
            .append($("<option></option>")
                .attr("value", -1)
                .text('--Select Cadet--'));

        $.each(DataEmp, function (index, employee) {
            if (employee.Course == DepartmentID) {
                $('#ddl-emp').append(new Option(employee.Name, employee.PakNo, false, false));
            }
        });
    }
}

