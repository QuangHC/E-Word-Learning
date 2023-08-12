$(function () {
    console.log('topics custom js');
    // Delete topics
    var handleDeleteRows = () => {
        // Select all delete buttons
        const deleteButtons = $('[data-kt-customer-table-filter="delete_row"]');
        console.log(deleteButtons.length);
        deleteButtons.each(function (index, d) {
            // Delete button on click
            console.log(d);
            d.addEventListener('click', function (e) {
                e.preventDefault();

                // Select parent row
                const parent = e.target.closest('tr');

                // Get topic name
                const topicName = parent.querySelectorAll('td')[2].innerText;


                // SweetAlert2 pop up --- official docs reference: https://sweetalert2.github.io/
                Swal.fire({
                    text: "Are you sure you want to delete " + topicName + "?",
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
                            text: "You have deleted " + topicName + "!.",
                            icon: "success",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn fw-bold btn-primary",
                            }
                        }).then(function () {
                            // Change input value to delete
                            var formElement = $('tbody form')
                            var inputElement = $('input[name="topic_deleted"]');
                            inputElement.val(parent.querySelectorAll('td')[1].innerText + "");
                            // Submit form
                            formElement.submit();
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
    // Init toggle toolbar
    var initToggleToolbar = () => {
        // Toggle selected action toolbar
        // Select all checkboxes
        const checkboxes = $('table [type="checkbox"]');

        // Select elements
        const deleteSelected = document.querySelector('[data-kt-customer-table-select="delete_selected"]');

        // Toggle delete selected toolbar
        checkboxes.each(function (index, c) {
            // Checkbox on click event
            c.addEventListener('click', function () {
                setTimeout(function () {
                    toggleToolbars();
                }, 50);
            });
        });

        // Deleted selected rows
        deleteSelected.addEventListener('click', function () {
            console.log('delete selected');
            // SweetAlert2 pop up --- official docs reference: https://sweetalert2.github.io/
            Swal.fire({
                text: "Are you sure you want to delete selected topics?",
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
                        text: "You have deleted all selected topics!.",
                        icon: "success",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn fw-bold btn-primary",
                        }
                    }).then(function () {
                        // Remove all selected customers
                        // Change input value to delete
                        var formElement = $('.card-toolbar form')
                        var inputElement = $('input[name="list_topic_deleted"]');
                        var val = "";
                        var value_check = [];
                        checkboxes.each(function (index, c) {
                            if (c.checked && index != 0) {
                                // datatable.row($(c.closest('tbody tr'))).remove().draw();
                                parent = c.closest('tr');
                                // val += parent.querySelectorAll('td')[1].innerText + "_";
                                value_check.push(parent.querySelectorAll('td')[1].innerText);
                                // inputElement.val(val);
                            }
                        });
                        inputElement.val(value_check.join("_"));
                        // Remove header checked box
                        const headerCheckbox = $('table [type="checkbox"]')[0];
                        headerCheckbox.checked = false;
                        // Submit form
                        formElement.submit();
                    });
                } else if (result.dismiss === 'cancel') {
                    Swal.fire({
                        text: "Selected topics was not deleted.",
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
    }

    // Toggle toolbars
    const toggleToolbars = () => {
        // Define variables
        const toolbarBase = document.querySelector('[data-kt-customer-table-toolbar="base"]');
        const toolbarSelected = document.querySelector('[data-kt-customer-table-toolbar="selected"]');
        const selectedCount = document.querySelector('[data-kt-customer-table-select="selected_count"]');

        // Select refreshed checkbox DOM elements 
        const allCheckboxes = $('table tbody [type="checkbox"]');

        // Detect checkboxes state & count
        let checkedState = false;
        let count = 0;

        // Count checked boxes
        allCheckboxes.each(function (index, c) {
            if (c.checked) {
                checkedState = true;
                count++;
            }
        });

        // Toggle toolbars
        if (checkedState) {
            selectedCount.innerHTML = count;
            toolbarBase.classList.add('d-none');
            toolbarSelected.classList.remove('d-none');
        } else {
            toolbarBase.classList.remove('d-none');
            toolbarSelected.classList.add('d-none');
        }
    }

    initToggleToolbar();
});