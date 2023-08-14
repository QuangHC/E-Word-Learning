$(function () {
    var element;
    var submitButton;
    var cancelButton;
    var closeButton;
    var form;
    var modal;

    // Set value for form
    var setValueForm = function () {
        var data = $('#kt_question_view_details .text-gray-600');
        $('[name="id"]').val($(data[0]).text());
        $('[name="content"]').val($(data[1]).text());
        $('[name="answer"]').val($(data[2]).text());
        $('[name="explanation"]').val($(data[3]).text());
        $('[name="option1"]').val($(data[4]).text());
        $('[name="option2"]').val($(data[5]).text());
        $('[name="option3"]').val($(data[6]).text());
        $('[name="option4"]').val($(data[7]).text());
    }

    // Init form inputs
    var handleForm = function () {
        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        validator = FormValidation.formValidation(
            form,
            {
                fields: {
                    'content': {
                        validators: {
                            notEmpty: {
                                message: 'Content is required'
                            }
                        }
                    },
                    'answer': {
                        validators: {
                            notEmpty: {
                                message: 'Answer is required'
                            }
                        }
                    },
                    'option1': {
                        validators: {
                            notEmpty: {
                                message: 'Option 1 is required'
                            }
                        }
                    },
                    'option2': {
                        validators: {
                            notEmpty: {
                                message: 'Option 2 is required'
                            }
                        }
                    },
                    'option3': {
                        validators: {
                            notEmpty: {
                                message: 'Option 3 is required'
                            }
                        }
                    },
                    'option4': {
                        validators: {
                            notEmpty: {
                                message: 'Option 4 is required'
                            }
                        }
                    },
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: '.fv-row',
                        eleInvalidClass: '',
                        eleValidClass: ''
                    })
                }
            }
        );

        // Action buttons
        submitButton.addEventListener('click', function (e) {
            e.preventDefault();

            // Validate form before submit
            if (validator) {
                validator.validate().then(function (status) {
                    console.log('validated!');

                    if (status == 'Valid') {
                        submitButton.setAttribute('data-kt-indicator', 'on');

                        // Disable submit button whilst loading
                        submitButton.disabled = true;

                        setTimeout(function () {
                            submitButton.removeAttribute('data-kt-indicator');

                            Swal.fire({
                                text: "Form has been successfully submitted!",
                                icon: "success",
                                buttonsStyling: false,
                                confirmButtonText: "Ok, got it!",
                                customClass: {
                                    confirmButton: "btn btn-primary"
                                }
                            }).then(function (result) {
                                if (result.isConfirmed) {
                                    // Hide modal
                                    modal.hide();

                                    // Enable submit button after loading
                                    submitButton.disabled = false;

                                    form.submit(); // Submit form

                                    //form.reset(); // Reset form
                                }
                            });
                        }, 2000);
                    } else {
                        Swal.fire({
                            text: "Sorry, looks like there are some errors detected, please try again.",
                            icon: "error",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn btn-primary"
                            }
                        });
                    }
                });
            }
        });

        cancelButton.addEventListener('click', function (e) {
            e.preventDefault();

            Swal.fire({
                text: "Are you sure you would like to cancel?",
                icon: "warning",
                showCancelButton: true,
                buttonsStyling: false,
                confirmButtonText: "Yes, cancel it!",
                cancelButtonText: "No, return",
                customClass: {
                    confirmButton: "btn btn-primary",
                    cancelButton: "btn btn-active-light"
                }
            }).then(function (result) {
                if (result.value) {
                    form.reset(); // Reset form	
                    modal.hide(); // Hide modal				
                } else if (result.dismiss === 'cancel') {
                    Swal.fire({
                        text: "Your form has not been cancelled!.",
                        icon: "error",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn btn-primary",
                        }
                    });
                }
            });
        });

        closeButton.addEventListener('click', function (e) {
            e.preventDefault();
            Swal.fire({
                text: "Are you sure you would like to cancel?",
                icon: "warning",
                showCancelButton: true,
                buttonsStyling: false,
                confirmButtonText: "Yes, cancel it!",
                cancelButtonText: "No, return",
                customClass: {
                    confirmButton: "btn btn-primary",
                    cancelButton: "btn btn-active-light"
                }
            }).then(function (result) {
                if (result.value) {
                    form.reset(); // Reset form	
                    modal.hide(); // Hide modal				
                } else if (result.dismiss === 'cancel') {
                    Swal.fire({
                        text: "Your form has not been cancelled!.",
                        icon: "error",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn btn-primary",
                        }
                    });
                }
            });
        })
    }

    setValueForm();

    element = document.querySelector('#kt_modal_update_question');
    modal = new bootstrap.Modal(element);

    form = element.querySelector('#kt_modal_update_question_form');
    submitButton = form.querySelector('#kt_modal_update_question_submit');
    cancelButton = form.querySelector('#kt_modal_update_question_cancel');
    closeButton = element.querySelector('#kt_modal_update_question_close');

    handleForm();
});
