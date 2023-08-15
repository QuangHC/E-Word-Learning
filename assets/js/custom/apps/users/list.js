$(function () {
    // Define variables
    const table = document.querySelector('#kt_words_table');

    // Private functions
    var initTopicList = function () {
        // Set date data order
        const tableRows = table.querySelectorAll('tbody tr');

        tableRows.forEach(row => {
            const dateRow = row.querySelectorAll('td');
            const realDate = moment(dateRow[5].innerHTML, "DD MMM YYYY, LT").format(); // select date from 5th column in table
            dateRow[5].setAttribute('data-order', realDate);
        });

        // Init datatable --- more info on datatables: https://datatables.net/manual/
        datatable = $(table).DataTable({
            "info": false,
            'order': [],
            'columnDefs': [
                { orderable: false, targets: 0 }, // Disable ordering on column 0 (checkbox)
                { orderable: false, targets: 6 }, // Disable ordering on column 6 (actions)
            ]
        });

        // Re-init functions on every table re-draw -- more info: https://datatables.net/reference/event/draw
        datatable.on('draw', function () {
            initToggleToolbar();
            handleDeleteRows();
            toggleToolbars();
        });
    }

    // Search Datatable --- official docs reference: https://datatables.net/reference/api/search()
    var handleSearchDatatable = () => {
        const filterSearch = document.querySelector('[data-kt-word-table-filter="search"]');
        filterSearch.addEventListener('keyup', function (e) {
            datatable.search(e.target.value).draw();
        });
    }

    // Delete words
    var handleDeleteRows = () => {
        // Select all delete buttons
        const deleteButtons = $('[data-kt-word-table-filter="delete_row"]');
        deleteButtons.each(function (index, d) {
            // Delete button on click
            d.addEventListener('click', function (e) {
                e.preventDefault();

                // Select parent row
                const parent = e.target.closest('tr');

                // Get word name
                const eleName = parent.querySelectorAll('td')[1].innerText;
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
                            // Change input value to delete
                            // var formElement = $('table tbody')
                            var formElement = $('.card-toolbar form')
                            // console.log(formElement); 
                            // console.log("value: " + parent.querySelectorAll('td input[type="checkbox"]')[0].value + "");
                            var inputElement = $('input[name="word_deleted"]');
                            inputElement.val(parent.querySelectorAll('td input[type="checkbox"]')[0].value + "");
                            // Submit form
                            formElement.submit();
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

    // Header checkbox on click event
    const headerCheckbox = $('table [type="checkbox"]')[0]; 
    headerCheckbox.addEventListener('click', function () {
        // Select all checkboxes
        const checkboxes = $('table tbody [type="checkbox"]');
        checkboxes.each(function (index, c) {
            // Check only checkboxes that are not disabled
            if (!c.disabled) {
                c.checked = headerCheckbox.checked;
            }
        });
    });

    // Init toggle toolbar
    var initToggleToolbar = () => {
        // Toggle selected action toolbar
        // Select all checkboxes
        const checkboxes = $('table [type="checkbox"]');

        // Select elements
        const deleteSelected = document.querySelector('[data-kt-word-table-select="delete_selected"]');

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
            // SweetAlert2 pop up --- official docs reference: https://sweetalert2.github.io/
            Swal.fire({
                text: "Are you sure you want to delete selected words?",
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
                        text: "You have deleted all selected words!.",
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
                        var inputElement = $('input[name="list_word_deleted"]');
                        var value_check = [];
                        checkboxes.each(function (index, c) {
                            if (c.checked && index != 0) {
                                parent = c.closest('tr');
                                value_check.push(parent.querySelectorAll('td input[type="checkbox"]')[0].value);
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
                        text: "Selected words was not deleted.",
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
        const toolbarBase = document.querySelector('[data-kt-word-table-toolbar="base"]');
        const toolbarSelected = document.querySelector('[data-kt-word-table-toolbar="selected"]');
        const selectedCount = document.querySelector('[data-kt-word-table-select="selected_count"]');

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
        console.log(count);
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

    initTopicList();
    handleSearchDatatable();
    handleDeleteRows();
    initToggleToolbar();
});