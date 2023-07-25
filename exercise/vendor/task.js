$(function () {
    let selectedData_0 = null;
    let remainingItems_0 = $('#main_list_0 li').length;
    $('#remainingText_0').text(`${remainingItems_0} items remaining`);
   

    // Function để lấy giá trị của data-question-index và nội dung của thẻ li khi được click
    function getQuestionIndexAndText(item) {
        const questionIndex = $(item).data('question-index');
        const listItemText = $(item).html();
        return [questionIndex, listItemText];
    }

    // Lặp qua từng phần tử và thêm sự kiện click cho main_list
    $('#main_list_0 li').on('click', function () {
        // // Lấy giá trị của data-question-index và nội dung của thẻ li khi được click
        // selectedData = getQuestionIndexAndText(this);
        if ($(this).hasClass('selecting')) {
            selectedData_0 = null;
            $(this).removeClass('selecting');
            // $('#answer-task li.list-group-item.btn.btn-light').css('background-color', '#fff');
        } else {
            selectedData_0 = getQuestionIndexAndText(this);
            $('.selecting').removeClass('selecting');
            $(this).addClass('selecting');
            // $('#answer-task li.list-group-item.btn.btn-light').css('background-color', '#DEDEDE');
        }

    });

    // Lặp qua từng phần tử và thêm sự kiện click cho gapfield-list
    $('.gapfield-list-0 li').on('click', function () {
        prevQuestionIndex = $(this).data('question-index');
        iconEle = $(this).next('i');
        console.log(prevQuestionIndex);
        // Kiểm tra nếu đã có thông tin được chọn từ main_list
        if (selectedData_0) {
            const [questionIndex, listItemText] = selectedData_0;

            if (prevQuestionIndex != '-1') {
                $(`#main_list_0 li[data-question-index="${prevQuestionIndex}"]`).removeClass('hidden');
            }

            // Gán nội dung của thẻ li đã chọn vào phần tử trong gapfield-list
            $(this).html(listItemText).data('question-index', questionIndex);

            // Giảm số lượng phần tử còn lại
            const selectedItem = $(`#main_list_0 li[data-question-index="${questionIndex}"]`);
            selectedItem.addClass('hidden');
            $('.selecting').removeClass('selecting');

            if (questionIndex === $(this).data('answer-index')) {
                // Nếu data-question-index của thẻ li trong main_list và gapfield-list giống nhau thì thêm class correct
                $(this).addClass('correct').removeClass('incorrect not-filled');
                iconEle.removeClass('fa-xmark').addClass('fa-solid fa-check');
            } else {
                // Nếu data-question-index của thẻ li trong main_list và gapfield-list khác nhau thì thêm class incorrect
                $(this).addClass('incorrect').removeClass('correct not-filled');
                iconEle.removeClass('fa-check').addClass('fa-solid fa-xmark');
            }

            // Reset selectedData sau khi đã sử dụng
            selectedData_0 = null;
        } else {
            if (prevQuestionIndex != '-1') {
                $(`#main_list_0 li[data-question-index="${prevQuestionIndex}"]`).removeClass('hidden');
                $(this).text('').data('question-index', '-1').removeClass('correct incorrect');
            }
        }

        $('#remainingText_0').text(`${countRemainingItems()} items remaining`);
        if (countRemainingItems() < remainingItems_0) {
            $('.action .btn.btn-success').removeClass('disabled');
        } else {
            $('.action .btn.btn-success').addClass('disabled');
        }
        if (countRemainingItems() === 0) {
            $('#remainingText_0').text('All items have been filled');
        }
    });

    // $('[data-bs-target="#modal"]').on('click', function () {
    //     $('#modal .modal-body p').text(`Answered questions: ${remainingItems_0 - countRemainingItems()} out of ${remainingItems_0}. Do you want to finish?`);
    //     $('ul#main_list_0 li').addClass('disable');
    // });

    // $('[data-bs-target="#modal0"]').on('click', function () {
    //     const totalCorrectAnswers = countCorrectAnswers();
    //     const percentage = (totalCorrectAnswers / remainingItems_0 * 100).toFixed(2); // Lấy 2 chữ số sau dấu thập phân
    //     $('#modal0 .modal-body p').text(`Total score: ${totalCorrectAnswers} out of ${remainingItems_0} (${percentage}%)`);
    //     $('li.list-group-item.btn.btn-light.incorrect').css('background-color', '#FAC8C1    ');
    //     $('li.list-group-item.btn.btn-light.correct').css('background-color', '#B7E9BF');
    //     $('i.hidden').removeClass('hidden');
    //     $('.action .btn.btn-danger').removeClass('disabled');
    //     $('.action .btn.btn-success').addClass('disabled');
    //     $('#answer-task li.list-group-item.btn.btn-light').addClass('disable');
    //     $('#close0').click();
    // }); 
    
    // Dem so luong item con lai trong main_list khong co thuoc tinh hidden
    function countRemainingItems() {
        const hiddenItem = $('#main_list_0 li.list-group-item.btn.hidden').length;
        console.log(hiddenItem);
        return remainingItems_0 - hiddenItem;
    }

    $('.action .btn.btn-danger').on('click', function () {
        reset();
        if ($('span.answer').not('.hidden')) {
            $('.action .btn.btn-info').click();
        }
        $('#answer-task li.list-group-item.btn.btn-light').removeClass('disable');
        $('.action .btn.btn-danger').addClass('disabled');
        $('.gapfield-list-0 li').text('').data('question-index', '-1').removeClass('correct incorrect');
        $('#answer-task li.list-group-item.btn.btn-light').css('background-color', '#FFFFFF');
        $('ul#main_list_0 li').removeClass('disable');
        $('.check-icon').removeClass('fa-check fa-xmark');
    });

    function reset() {
        $('#main_list_0 li').removeClass('hidden');
        $('#remainingText_0').text(`${remainingItems_0} items remaining`);
        $('i.hidden').removeClass('hidden');
        $('.action .btn.btn-success').addClass('disabled');
        $('.check-icon').addClass('hidden');
    };

});
