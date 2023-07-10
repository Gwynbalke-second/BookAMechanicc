"use strict"; !function (e) {
    e(".eg-swal-av3").on("click", function (e) {
        var id = $(this).data("employee-id"); // Get the employee ID from the data attribute
        Swal.fire({ title: "Are you sure?", text: "You won't be able to revert this!", icon: "warning", showCancelButton: !0, confirmButtonText: "Yes, delete it!" })
            .then(function (result) {
                if (result.value) {
                    // Send AJAX request to the delete controller method
                    $.ajax({
                        url: "/Admin/DeleteCustomer/" + id, // Replace "/User/DeleteUser" with the actual URL of your delete controller method
                        type: "POST",
                        success: function (response) {
                            Swal.fire("Deleted!", "Customer Deleted!", "success");
                            // Optionally, you can perform additional actions upon successful deletion
                            location.reload();
                        },
                        error: function (xhr, status, error) {
                            // Handle the error as needed
                            Swal.fire("Error", error, "error");
                        }
                    });
                }
            }),
            e.preventDefault()

  
    })
}((NioApp, jQuery));