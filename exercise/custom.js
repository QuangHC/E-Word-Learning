$(function () {
    let selectedData = null;
    let remainingItems = $('#main_list li').length;
    $('#remainingText').text(`${remainingItems} items remaining`);
   

    // Function để lấy giá trị của data-question-index và nội dung của thẻ li khi được click
    function getQuestionIndexAndText(item) {
        const questionIndex = $(item).data('question-index');
        const listItemText = $(item).text();
        return [questionIndex, listItemText];
    }

    // Lặp qua từng phần tử và thêm sự kiện click cho main_list
    $('#main_list li').on('click', function () {
        // // Lấy giá trị của data-question-index và nội dung của thẻ li khi được click
        // selectedData = getQuestionIndexAndText(this);
        if ($(this).hasClass('selecting')) {
            selectedData = null;
            $(this).removeClass('selecting');
            $('#questions .card').css('background-color', '#fff');
        } else {
            selectedData = getQuestionIndexAndText(this);
            $('.selecting').removeClass('selecting');
            $(this).addClass('selecting');
            $('#questions .card').css('background-color', '#DEDEDE');
        }

    });

    // Lặp qua từng phần tử và thêm sự kiện click cho gapfield-list
    $('.gapfield-list li').on('click', function () {
        prevQuestionIndex = $(this).data('question-index');
        iconEle = $(this).next('i');
        console.log(prevQuestionIndex);
        // Kiểm tra nếu đã có thông tin được chọn từ main_list
        if (selectedData) {
            const [questionIndex, listItemText] = selectedData;

            if (prevQuestionIndex != '-1') {
                $(`#main_list li[data-question-index="${prevQuestionIndex}"]`).removeClass('hidden');
            }

            // Gán nội dung của thẻ li đã chọn vào phần tử trong gapfield-list
            $(this).text(listItemText).data('question-index', questionIndex);

            // Giảm số lượng phần tử còn lại
            const selectedItem = $(`#main_list li[data-question-index="${questionIndex}"]`);
            selectedItem.addClass('hidden');
            $('#questions .card').css('background-color', '#fff');
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
            selectedData = null;
        } else {
            if (prevQuestionIndex != '-1') {
                $(`#main_list li[data-question-index="${prevQuestionIndex}"]`).removeClass('hidden');
                $(this).text('').data('question-index', '-1').removeClass('correct incorrect');
            }
        }

        $('#remainingText').text(`${countRemainingItems()} items remaining`);
        if (countRemainingItems() < remainingItems) {
            $('.action .btn.btn-success').removeClass('disabled');
        } else {
            $('.action .btn.btn-success').addClass('disabled');
        }
        if (countRemainingItems() === 0) {
            $('#remainingText').text('All items have been filled');
        }
    });

    $('[data-bs-target="#modal1"]').on('click', function () {
        $('#modal1 .modal-body p').text(`Answered questions: ${remainingItems - countRemainingItems()} out of ${remainingItems}. Do you want to finish?`);
        $('ul#main_list li').addClass('disable');
    });

    $('[data-bs-target="#modal2"]').on('click', function () {
        const totalCorrectAnswers = countCorrectAnswers();
        const percentage = (totalCorrectAnswers / remainingItems * 100).toFixed(2); // Lấy 2 chữ số sau dấu thập phân
        $('#modal2 .modal-body p').text(`Total score: ${totalCorrectAnswers} out of ${remainingItems} (${percentage}%)`);
        $('li.list-group-item.btn.btn-light.incorrect').css('background-color', '#FAC8C1    ');
        $('li.list-group-item.btn.btn-light.correct').css('background-color', '#B7E9BF');
        $('i.hidden').removeClass('hidden');
        $('.action .btn.btn-info').removeClass('hidden');
        $('.action .btn.btn-danger').removeClass('disabled');
        $('.action .btn.btn-success').addClass('disabled');
        $('#questions li.list-group-item.btn.btn-light').addClass('disable');
        $('#close1').click();
    }); 

    // Dem so luong item con lai trong main_list khong co thuoc tinh hidden
    function countRemainingItems() {
        const hiddenItem = $('#main_list li.list-group-item.btn.hidden').length;
        console.log(hiddenItem);
        return remainingItems - hiddenItem;
    }

    // Count number of correct answers
    function countCorrectAnswers() {
        const correctAnswers = $('.gapfield-list li.correct').length;
        return correctAnswers;
    }

    $('.action .btn.btn-info').on('click', function () {
        reset();
        if ($('span.answer').hasClass('hidden')) {
            $('span.answer').removeClass('hidden');
            $('#questions li.list-group-item.btn.btn-light').addClass('bg-info');
            $('#questions li.list-group-item.btn.btn-light').addClass('text-info');
        } else {
            $('span.answer').addClass('hidden').removeClass('bg-info');
            $('#questions li.list-group-item.btn.btn-light').removeClass('bg-info');
            $('#questions li.list-group-item.btn.btn-light').removeClass('text-info');
            $('.check-icon').removeClass('hidden');
        }
    });

    $('.action .btn.btn-danger').on('click', function () {
        reset();
        if ($('span.answer').not('.hidden')) {
            $('.action .btn.btn-info').click();
        }
        $('#questions li.list-group-item.btn.btn-light').removeClass('disable');
        $('.action .btn.btn-danger').addClass('disabled');
        $('.action .btn.btn-info').addClass('hidden');
        $('.gapfield-list li').text('').data('question-index', '-1').removeClass('correct incorrect');
        $('#questions li.list-group-item.btn.btn-light').css('background-color', '#fff');
        $('ul#main_list li').removeClass('disable');
        $('.check-icon').removeClass('fa-check fa-xmark');
    });

    function reset() {
        $('#main_list li').removeClass('hidden');
        $('#remainingText').text(`${remainingItems} items remaining`);
        $('i.hidden').removeClass('hidden');
        $('.action .btn.btn-success').addClass('disabled');
        $('.check-icon').addClass('hidden');
    };
});
