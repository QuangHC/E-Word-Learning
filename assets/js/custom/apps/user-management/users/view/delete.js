$(function () {
    // Delete word
    var handleDeleteRows = () => {
        // Select all delete buttons
        const deleteButtons = $('[data-kt-delete="delete_row"]');
        deleteButtons.each(function (index, d) {
            // Delete button on click
            d.addEventListener('click', function (e) {
                e.preventDefault();
                // Get user name
                const eleName = $('.us-name').text();
                // SweetAlert2 pop up --- official docs reference: https://sweetalert2.github.io/
                Swal.fire({
                    text: "Are you sure you want to delete " + eleName + "?",
                    icon: "warning",
                    showCancelButton: true,
                    buttonsStyling: false,
                    confirmButtonText: "Yes, delete!",
                    cancelButtonText: "No, cancel",
                    customClass: {
                        confirmButton: "btn fw-bold btn-danger",
                        cancelButton: "btn fw-bold btn-active-light-primary"
                    }
                }).then(function (result) {
                    if (result.value) {
                        Swal.fire({
                            text: "You have deleted " + eleName + "!.",
                            icon: "success",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn fw-bold btn-primary",
                            }
                        }).then(function () {
                            var form = $('.delete-user form');
                            var inputElement = $('input[name="user_deleted"]');
                            var user_id = $('.account_id').text();
                            inputElement.val(user_id + "");
                            // Submit form
                            form.submit();
                        });
                    } else if (result.dismiss === 'cancel') {
                        Swal.fire({
                            text: topicName + " was not deleted.",
                            icon: "error",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn fw-bold btn-primary",
                            }
                        });
                    }
                });
            });
        });
    }
    handleDeleteRows();
});
