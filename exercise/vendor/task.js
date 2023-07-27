$(function () {
    let selectedData_0 = null;
    let remainingItems_0 = document.getElementsByClassName("question").length;
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

        
        
    });

});
