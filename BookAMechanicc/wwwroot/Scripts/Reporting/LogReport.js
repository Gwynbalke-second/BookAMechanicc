$(document).ready(function () {
$("#submit").click(function () {
    var listOfEmployee = [];
    var dateRange = $('#reservation').val();
    $('#startDate').text("");
    $('#endDate').text("");
    rptData = null;
    if ($("#chkDept").prop("checked")) {
        //foreach Department
        $.each(Data.Employee, function (index, employee) {
            var emp = {};
            emp['ID'] = employee.ID;
            emp['Dept_ID'] = employee.Dept_ID;
            emp['Dept_Name'] = employee.Dept_Name;
            emp['Per_Name'] = employee.Per_Name;
            emp['Per_Code'] = employee.Per_Code;
            emp['Custom_1'] = employee.Custom_1;
            listOfEmployee.push(emp);
        });
    } else {
        //for Selected Department
        var deptID = $('#ddl-dept').val();
        if (deptID != -1) {
            if ($("#chkEmp").prop("checked")) {
                $.each(Data.Employee, function (index, employee) {
                    if (employee['Dept_ID'] == deptID) {
                        var emp = {};
                        emp['ID'] = employee.ID;
                        emp['Dept_ID'] = employee.Dept_ID;
                        emp['Dept_Name'] = employee.Dept_Name;
                        emp['Per_Name'] = employee.Per_Name;
                        emp['Per_Code'] = employee.Per_Code;
                        emp['Custom_1'] = employee.Custom_1;
                        listOfEmployee.push(emp);
                    }
                });
                //for Selected Department All Empl
            } else {
                //for Both Selected
                var empID = $('#ddl-dept').val();
                $.each(Data.Employee, function (index, employee) {
                    if (employee['ID'] == deptID) {
                        var emp = {};
                        emp['ID'] = employee.ID;
                        emp['Dept_ID'] = employee.Dept_ID;
                        emp['Dept_Name'] = employee.Dept_Name;
                        emp['Per_Name'] = employee.Per_Name;
                        emp['Per_Code'] = employee.Per_Code;
                        emp['Custom_1'] = employee.Custom_1;
                        listOfEmployee.push(emp);
                    }
                });
            }
        }
    }

    if (listOfEmployee.length > 0) {
        //var rptDataCall = $('#Report').data('get-pr-log-data');

        //$.ajax({
        //    url: rptDataCall,
        //    type: "POST",
        //    contentType: "application/json",
        //    data: JSON.stringify({ selectedEmp: listOfEmployee,DateRange: dateRange }),
        //    success: function (result) {
        //        rptData = result;
        //        render();
        //    },
        //    error: function (response) {
        //        toastr.error('Fail To Prepare Data..', "Warning!");
        //    }
        //});

        var print = $('#Report').data('print-data');
        $.ajax({
            url: print,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ DepartmentID: DepartmentID, EmployeeID: EmployeeID, DateRange: DateRange }),
            success: function (result) {
                var win = window.open($('#Report').data('print-log-data'));
                win.focus();
                //window.location = $('#Report').data('print-log-data');
            },
            error: function (response) {
                toastr.error('Fail To Prepare Data..', "Warning!");
            }
        });
    }
    });
});