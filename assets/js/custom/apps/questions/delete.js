$(function () {
    // Delete word
    var handleDeleteRows = () => {
        // Select all delete buttons
        const deleteButtons = $('[data-kt-delete="delete_row"]');
        deleteButtons.each(function (index, d) {
            // Delete button on click
            d.addEventListener('click', function (e) {
                e.preventDefault();
                // Get word name
                const eleName = $('.question-content').text();
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
                            var form = $('.d-flex.fs-4.py-3 form');
                            var inputElement = $('input[name="question_deleted"]');
                            var question_id = $('.py-5.fs-6 .question_id').text();
                            inputElement.val(question_id);
                            // Submit form
                            form.submit();
                        });
                    } else if (result.dismiss === 'cancel') {
                        Swal.fire({
                            text: eleName + " was not deleted.",
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
