$(function () {
    // begin::Overview scripts
    let overview_selectedData = null;
    let overview_total_question = $('#main_list li').length;
    let overview_remaining_question = overview_total_question;
    changeRemaingAndDisplayFinish('.overview');

    // Function để lấy giá trị của data-question-index và nội dung của thẻ li khi được click
    function getQuestionIndexAndText(item) {
        const questionIndex = $(item).data('question-index');
        const listItemText = $(item).text();
        return [questionIndex, listItemText];
    }

    // Lặp qua từng phần tử và thêm sự kiện click cho main_list
    $('#main_list li').on('click', function () {
        // Lấy giá trị của data-question-index và nội dung của thẻ li khi được click
        // overview_selectedData = getQuestionIndexAndText(this);
        if ($(this).hasClass('selecting')) {
            overview_selectedData = null;
            $(this).removeClass('selecting');
            $('#questions .card').css('background-color', '#fff');
        } else {
            overview_selectedData = getQuestionIndexAndText(this);
            $('.selecting').removeClass('selecting');
            $(this).addClass('selecting');
            $('#questions .card').css('background-color', '#DEDEDE');
        }
    });

    // Lặp qua từng phần tử và thêm sự kiện click cho gapfield-list
    $('.gapfield-list li').on('click', function () {
        prevQuestionIndex = $(this).data('question-index');
        iconEle = $(this).next('i');
        // Kiểm tra nếu đã có thông tin được chọn từ main_list
        if (overview_selectedData) {
            const [questionIndex, listItemText] = overview_selectedData;

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

            // Reset overview_selectedData sau khi đã sử dụng
            overview_selectedData = null;
        } else {
            if (prevQuestionIndex != '-1') {
                $(`#main_list li[data-question-index="${prevQuestionIndex}"]`).removeClass('hidden');
                $(this).text('').data('question-index', '-1').removeClass('correct incorrect');
            }
        }
        changeRemaingAndDisplayFinish('.overview');
    });

    $(`[data-bs-target="#modal1"]`).on('click', function () {
        console.log('click finish in overview');
        cor_ans = countCorrectAnswers('.overview');
        // changeTextModalOK('.overview', cor_ans, overview_total_question);
        $('#modal1 .modal-body p').text(`Answered questions: ${overview_total_question - overview_remaining_question} out of ${overview_total_question}. Do you want to finish?`);
    });

    $(`[data-bs-target="#modal2"]`).on('click', function () {
        console.log('click OK in overview');
        $(`.overview .incorrect`).addClass('bg-wrong');
        $(`.overview .correct`).addClass('bg-correct');
        $(`.overview i.hidden`).removeClass('hidden');
        $(`.overview .action .btn.btn-info`).removeClass('hidden');
        $(`.overview .action .btn.btn-danger`).removeClass('disabled');
        $(`.overview .action .btn.btn-success`).addClass('disabled');
        $(`.overview li`).addClass('disable');
        $('#close1').click();
        let cor_ans = countCorrectAnswers('.overview');
        let percentage = (cor_ans / overview_total_question * 100).toFixed(2); // Lấy 2 chữ số sau dấu thập phân
        $('#modal2 .modal-body p').text(`Total score: ${cor_ans} out of ${overview_total_question} (${percentage}%)`);
    });

    clickTryAgain('.overview');
    clickShowAnswer('.overview');

    // end::Overview scripts
    // begin:Task scripts
    // begin: Task 1
    let question_index_current = 0;
    const total_ques_0 = $('.task1 .question').length;
    let task_selectedData = null;
    let remain_ques_0 = 0;
    changeRemaingAndDisplayFinish('.task1');

    $('.task1 #btn-next').on('click', function () {
        question_index_current++;
        $(`#question-${question_index_current - 1}.question`).addClass('hidden');
        $(`#question-${question_index_current}.question`).removeClass('hidden');
        ableButton('.task1', question_index_current, total_ques_0);
        task_selectedData = null;
        $('.selecting').removeClass('selecting');
    });

    $('.task1 #btn-prev').on('click', function () {
        question_index_current--;
        $(`#question-${question_index_current + 1}.question`).addClass('hidden');
        $(`#question-${question_index_current}.question`).removeClass('hidden');
        ableButton('.task1', question_index_current, total_ques_0);
        task_selectedData = null;
        $('.selecting').removeClass('selecting');
    });

    $(`.task1 .task-panel li`).on('click', function () {
        // Lấy giá trị của data-question-index và nội dung của thẻ li khi được click
        if ($(this).hasClass('selecting')) {
            task_selectedData = null;
            $(this).removeClass('selecting');
            $('.answer-panel li.list-group-item.btn.btn-light').css('background-color', '#fff');
        } else {
            task_selectedData = $(this);
            $('.selecting').removeClass('selecting');
            $(this).addClass('selecting');
            $('.answer-panel li.list-group-item.btn.btn-light').css('background-color', '#DEDEDE');
        }
    });

    // click gapfield in task
    $('.gapfield-list-0 li').on('click', function () {
        let prevQuestionIndex = $(this).attr('data-question-index');
        iconEle = $(this).next('i');
        // Kiểm tra nếu đã có thông tin được chọn từ main_list
        if (task_selectedData) {
            const [questionIndex, listItemText] = [task_selectedData.data('question-index'), task_selectedData.text()];
            if (prevQuestionIndex != '-1') {
                $(`#question-${question_index_current} li[data-question-index="${prevQuestionIndex}"]`).removeClass('hidden');
            }

            // Gán nội dung của thẻ li đã chọn vào phần tử trong gapfield-list
            $(this).text(listItemText).attr('data-question-index', questionIndex);

            // Giảm số lượng phần tử còn lại
            task_selectedData.addClass('hidden');
            $('.answer-panel li.list-group-item.btn.btn-light').css('background-color', '#fff');
            $('.selecting').removeClass('selecting');
            if (listItemText.trim() === $(this).attr('data-answer-index')) {
                // Nếu data-question-index của thẻ li trong main_list và gapfield-list giống nhau thì thêm class correct
                $(this).addClass('correct').removeClass('incorrect not-filled');
                iconEle.removeClass('fa-xmark').addClass('fa-solid fa-check');
            } else {
                // Nếu data-question-index của thẻ li trong main_list và gapfield-list khác nhau thì thêm class incorrect
                $(this).addClass('incorrect').removeClass('correct not-filled');
                iconEle.removeClass('fa-check').addClass('fa-solid fa-xmark');
            }

            // Reset overview_selectedData sau khi đã sử dụng
            task_selectedData = null;
        } else {
            if (prevQuestionIndex != '-1') {
                $(`#question-${question_index_current} li[data-question-index="${prevQuestionIndex}"]`).removeClass('hidden');
                $(this).text('').attr('data-question-index', '-1').removeClass('correct incorrect');
            }
        }
        filledAllAndCorrect(question_index_current);
        changeRemaingAndDisplayFinish('.task1');
    });

    $(`.task1 [data-bs-target="#modal1-task1"]`).on('click', function () {
        console.log('click finish in .task1');
        cor_ans = countCorrectAnswers('.task1');
        // changeTextModalOK('.task1', cor_ans, total_ques_0);
        $('#modal1-task1 .modal-body p').text(`Answered questions: ${total_ques_0 - remain_ques_0} out of ${total_ques_0}. Do you want to finish?`);
    });

    $(`[data-bs-target="#modal2-task1"]`).on('click', function () {
        console.log('click OK in overview');
        $(`.task1 .incorrect`).addClass('bg-wrong');
        $(`.task1 .correct`).addClass('bg-correct');
        $(`.task1 i.hidden`).removeClass('hidden');
        $(`.task1 .action .btn.btn-info`).removeClass('hidden');
        $(`.task1 .action .btn.btn-danger`).removeClass('disabled');
        $(`.task1 .action .btn.btn-success`).addClass('disabled');
        $(`.task1 li`).addClass('disable');
        $('#close1-task1').click();
        let cor_ans = countCorrectAnswers('.task1');
        let percentage = (cor_ans / total_ques_0 * 100).toFixed(2); // Lấy 2 chữ số sau dấu thập phân
        $('#modal2-task1 .modal-body p').text(`Total score: ${cor_ans} out of ${total_ques_0} (${percentage}%)`);
    });
    clickTryAgain('.task1');
    clickShowAnswer('.task1');

    // begin:: Task 2
    let question_current = 0;
    const total_ques_1 = $('.task2 .question').length;
    let remain_ques_1 = total_ques_1;
    changeRemaingAndDisplayFinish('.task2');
    $('.task2 #btn-prev').addClass('disable');
    $('.task2 #btn-prev').on('click', function () {
        question_current--;
        $(`.task2 .question-${question_current + 1}`).addClass('hidden');
        $(`.task2 .question-${question_current}`).removeClass('hidden');
        ableButton('.task2', question_current, total_ques_1);
    });
    $('.task2 #btn-next').on('click', function () {
        question_current++;
        $(`.task2 .question-${question_current - 1}`).addClass('hidden');
        $(`.task2 .question-${question_current}`).removeClass('hidden');
        ableButton('.task2', question_current, total_ques_1);
    });

    $('.task2 input[type="radio"]').on('click', function () {
        $(`.task2 .question-${question_current} .checked`).removeClass('checked');
        $(this).addClass('checked');
        changeRemaingAndDisplayFinish('.task2');
    });
    // end:: Task 2

    // begin:: Task 3
    let question_current_2 = 0;
    const total_ques_2 = $('.task3 .question3').length;
    let remain_ques_2 = total_ques_2;
    changeRemaingAndDisplayFinish('.task3');
    $('.task3 #btn-prev').addClass('disable');
    $('.task3 #btn-prev').on('click', function () {
        question_current_2--;
        $(`.task3 .question-${question_current_2 + 1}`).addClass('hidden');
        $(`.task3 .question-${question_current_2}`).removeClass('hidden');
        ableButton('.task3', question_current_2, total_ques_2);
    });
    $('.task3 #btn-next').on('click', function () {
        question_current_2++;
        $(`.task3 .question-${question_current_2 - 1}`).addClass('hidden');
        $(`.task3 .question-${question_current_2}`).removeClass('hidden');
        ableButton('.task3', question_current_2, total_ques_2);
    });

    $('.task3 input[type="checkbox"]').on('click', function () {
        if ($(this).hasClass('checked')) {
            $(this).removeClass('checked');
        } else {
            $(this).addClass('checked');
        }
        if ($(`.task3 .question-${question_current_2} .checked`).length > 0) {
            $(`.task3 .question-${question_current_2}`).addClass('check');
        } else {
            $(`.task3 .question-${question_current_2}`).removeClass('check');
        }
        changeRemaingAndDisplayFinish('.task3');
    });
    // end:: Task 3

    // begin:: Task 4
    let question_current_3 = 0;
    const total_ques_3 = $('.task4 .question4').length;
    let remain_ques_3 = total_ques_3;
    changeRemaingAndDisplayFinish('.task4');
    $('.task4 #btn-prev').addClass('disable');
    $('.task4 #btn-prev').on('click', function () {
        question_current_3--;
        $(`.task4 .question-${question_current_3 + 1}`).addClass('hidden');
        $(`.task4 .question-${question_current_3}`).removeClass('hidden');
        ableButton('.task4', question_current_3, total_ques_3);
    });
    $('.task4 #btn-next').on('click', function () {
        question_current_3++;
        $(`.task4 .question-${question_current_3 - 1}`).addClass('hidden');
        $(`.task4 .question-${question_current_3}`).removeClass('hidden');
        ableButton('.task4', question_current_3, total_ques_3);
    });

    $(`.task4 input[type="text"]`).on('change', function () {
        console.log('change task4');
        console.log($(this).val());
        if ($(this).val() === '') {
            $(this).removeClass('texted');
        } else {
            $(this).addClass('texted');
        }
        if ($(this).val().trim().toLowerCase() === $(this).attr('data-answer')) {
            $(this).addClass('correct').removeClass('incorrect');
        } else {
            $(this).removeClass('correct').addClass('incorrect');
        }
        changeRemaingAndDisplayFinish('.task4');
    });

    $(`.task4 [data-bs-target="#modal1-task4"]`).on('click', function () {
        console.log('click finish in task 4');
        cor_ans = countCorrectAnswers('.task4');
        // changeTextModalOK('.task4', cor_ans, total_ques_4);
        $('#modal1-task4 .modal-body p').text(`Answered questions: ${total_ques_3 - remain_ques_3} out of ${total_ques_3}. Do you want to finish?`);
    });


    $(`[data-bs-target="#modal2-task4"]`).on('click', function () {
        console.log('click OK in overview');
        $(`.task4 .incorrect`).addClass('bg-wrong');
        $(`.task4 .correct`).addClass('bg-correct');
        $(`.task4 .action .btn.btn-info`).removeClass('hidden');
        $(`.task4 .action .btn.btn-danger`).removeClass('disabled');
        $(`.task4 .action .btn.btn-success`).addClass('disabled');
        $('.task4 input[type="text"]').prop("disabled", true);
        $('#close1-task4').click();
        let cor_ans = countCorrectAnswers('.task4');
        let percentage = (cor_ans / total_ques_3 * 100).toFixed(2); // Lấy 2 chữ số sau dấu thập phân
        $('#modal2-task4 .modal-body p').text(`Total score: ${cor_ans} out of ${total_ques_3} (${percentage}%)`);
    });

    clickTryAgain('.task4');
    $(`.task4 .action .btn.btn-info`).on('click', function () {
        if ($(this).hasClass('clicked')) {
            $(this).removeClass('clicked');
            $('.task4 .answer').addClass('hidden');
            $(`.task4 .gapfield-wrapper`).removeClass('hidden');
        } else {
            $(this).addClass('clicked');
            $('.task4 .answer').removeClass('hidden');
            $(`.task4 .gapfield-wrapper`).addClass('hidden');
        }
    });

    function changeRemaingAndDisplayFinish(namePart) {
        if (namePart === '.task2') {
            remain_ques_1 = total_ques_1 - $('.task2 .question .checked').length;
            $('#remainingText_1').text(remain_ques_1 + ' items remaining');
            if (remain_ques_1 < total_ques_1) {
                $('.task2 .btn.btn-success').removeClass('disabled');
            } else {
                $('.task2 .btn.btn-success').addClass('disabled');
            }
        } else if (namePart === '.task3') {
            let count_check = $('.task3 .checked').length;
            remain_ques_2 = total_ques_2 - $('.task3 .question3.check').length;
            $('#remainingText_2').text(remain_ques_2 + ' items remaining');
            if (remain_ques_2 < total_ques_2) {
                $('.task3 .btn.btn-success').removeClass('disabled');
            } else {
                $('.task3 .btn.btn-success').addClass('disabled');
            }
        } else if (namePart === '.task4') {
            remain_ques_3 = total_ques_3 - $('.task4 .question4 .texted').length;
            $('#remainingText_3').text(remain_ques_3 + ' items remaining');
            if (remain_ques_3 < total_ques_3) {
                $('.task4 .btn.btn-success').removeClass('disabled');
            } else {
                $('.task4 .btn.btn-success').addClass('disabled');
            }
        }
    }
    // end:: Task 4

    // begin:: Task 5
    let total_ques_4 = $('.task5 .subquestion').length;
    let remain_ques_4 = total_ques_4;
    let task_selectedData_4 = null;

    changeRemaingAndDisplayFinish('.task5');

    $('.task5 .task-panel li').on('click', function () {
        // Lấy giá trị của data-question-index và nội dung của thẻ li khi được click
        if ($(this).hasClass('selecting')) {
            task_selectedData_4 = null;
            $(this).removeClass('selecting');
            $('.subquestion li.list-group-item.btn.btn-light').css('background-color', '#fff');
        } else {
            task_selectedData_4 = $(this);
            $('.selecting').removeClass('selecting');
            $(this).addClass('selecting');
            $('.subquestion li.list-group-item.btn.btn-light').css('background-color', '#DEDEDE');
        }
    });

    // click gapfield in task
    $('.gapfield-list-5 li').on('click', function () {
        let prevQuestionIndex = $(this).attr('data-question-index');
        iconEle = $(this).next('i');
        // Kiểm tra nếu đã có thông tin được chọn từ main_list
        if (task_selectedData_4) {
            const [questionIndex, listItemText] = [task_selectedData_4.data('question-index'), task_selectedData_4.text()];
            if (prevQuestionIndex != '-1') {
                $(`.task-question li[data-question-index="${prevQuestionIndex}"]`).removeClass('hidden');
            }

            // Gán nội dung của thẻ li đã chọn vào phần tử trong gapfield-list
            $(this).text(listItemText).attr('data-question-index', questionIndex);

            // Giảm số lượng phần tử còn lại
            task_selectedData_4.addClass('hidden');
            $('.subquestion li.list-group-item.btn.btn-light').css('background-color', '#fff');
            $('.selecting').removeClass('selecting');
            if (listItemText.trim() === $(this).attr('data-answer-index')) {
                // Nếu data-question-index của thẻ li trong main_list và gapfield-list giống nhau thì thêm class correct
                $(this).addClass('correct').removeClass('incorrect not-filled');
                iconEle.removeClass('fa-xmark').addClass('fa-solid fa-check');
            } else {
                // Nếu data-question-index của thẻ li trong main_list và gapfield-list khác nhau thì thêm class incorrect
                $(this).addClass('incorrect').removeClass('correct not-filled');
                iconEle.removeClass('fa-check').addClass('fa-solid fa-xmark');
            }

            // Reset overview_selectedData sau khi đã sử dụng
            task_selectedData_4 = null;
        } else {
            if (prevQuestionIndex != '-1') {
                $(`.task-question li[data-question-index="${prevQuestionIndex}"]`).removeClass('hidden');
                $(this).text('').attr('data-question-index', '-1').removeClass('correct incorrect');
            }
        }
        changeRemaingAndDisplayFinish('.task5');
    });

    $(`.task5 [data-bs-target="#modal1-task5"]`).on('click', function () {
        console.log('click finish in overview');
        cor_ans = countCorrectAnswers('.task5');
        // changeTextModalOK('.task5', cor_ans, total_ques_4);
        $('#modal1-task5 .modal-body p').text(`Answered questions: ${total_ques_4 - remain_ques_4} out of ${total_ques_4}. Do you want to finish?`);
    });


    $(`[data-bs-target="#modal2-task5"]`).on('click', function () {
        console.log('click OK in overview');
        $(`.task5 .incorrect`).addClass('bg-wrong');
        $(`.task5 .correct`).addClass('bg-correct');
        $(`.task5 i.hidden`).removeClass('hidden');
        $(`.task5 .action .btn.btn-info`).removeClass('hidden');
        $(`.task5 .action .btn.btn-danger`).removeClass('disabled');
        $(`.task5 .action .btn.btn-success`).addClass('disabled');
        $(`.task5 li`).addClass('disable');
        $('#close1-task5').click();
        let cor_ans = countCorrectAnswers('.task5');
        let percentage = (cor_ans / total_ques_4 * 100).toFixed(2); // Lấy 2 chữ số sau dấu thập phân
        $('#modal2-task5 .modal-body p').text(`Total score: ${cor_ans} out of ${total_ques_4} (${percentage}%)`);
    });

    clickTryAgain('.task5');
    clickShowAnswer('.task5');

    function changeRemaingAndDisplayFinish(namePart) {
        if (namePart === '.overview') {
            overview_remaining_question = overview_total_question - $('#main_list li.list-group-item.btn.hidden').length;
            $('#remainingText').text(`${overview_remaining_question} items remaining`);
            if (overview_remaining_question < overview_total_question) {
                $('.overview .action .btn.btn-success').removeClass('disabled');
            } else {
                $('.overview .action .btn.btn-success').addClass('disabled');
            }
            if (overview_remaining_question === 0) {
                $('#remainingText').text('All items have been filled');
            }
        } else if (namePart === '.task1') {
            remain_ques_0 = total_ques_0 - $(`.question.filled-all`).length;
            $('#remainingText_0').text(`${remain_ques_0} items remaining`);
            if (remain_ques_0 < total_ques_0) {
                $('.task1 button.btn.btn-success').removeClass('disabled');
            } else {
                $('.task1 button.btn.btn-success').addClass('disabled');
            }
        } else if (namePart === '.task2') {
            remain_ques_1 = total_ques_1 - $('.task2 .question .checked').length;
            $('#remainingText_1').text(remain_ques_1 + ' items remaining');
            if (remain_ques_1 < total_ques_1) {
                $('.task2 .btn.btn-success').removeClass('disabled');
            } else {
                $('.task2 .btn.btn-success').addClass('disabled');
            }
        } else if (namePart === '.task3') {
            let count_check = $('.task3 .checked').length;
            remain_ques_2 = total_ques_2 - $('.task3 .question3.check').length;
            $('#remainingText_2').text(remain_ques_2 + ' items remaining');
            if (remain_ques_2 < total_ques_2) {
                $('.task3 .btn.btn-success').removeClass('disabled');
            } else {
                $('.task3 .btn.btn-success').addClass('disabled');
            }
        } else if (namePart === '.task4') {
            remain_ques_3 = total_ques_3 - $('.task4 .question4 .texted').length;
            $('#remainingText_3').text(remain_ques_3 + ' items remaining');
            if (remain_ques_3 < total_ques_3) {
                $('.task4 .btn.btn-success').removeClass('disabled');
            } else {
                $('.task4 .btn.btn-success').addClass('disabled');
            }
        } else if (namePart === '.task5') {
            remain_ques_4 = $('.task5 .subquestion li[data-question-index="-1"]').length;
            $('#remainingText_4').text(remain_ques_4 + ' items remaining');
            if (remain_ques_4 < total_ques_4) {
                $('.task5 .btn.btn-success').removeClass('disabled');
            } else {
                $('.task5 .btn.btn-success').addClass('disabled');
            }
        }
    }

    function ableButton(namePart, index, total_ques_1) {
        if (index === 0) {
            $(`${namePart} #btn-prev`).addClass('disable');
            $(`${namePart} #btn-next`).removeClass('disable');
        } else if (index === total_ques_1 - 1) {
            $(`${namePart} #btn-prev`).removeClass('disable');
            $(`${namePart} #btn-next`).addClass('disable');
        } else {
            $(`${namePart} #btn-prev`).removeClass('disable');
            $(`${namePart} #btn-next`).removeClass('disable');
        }
    }

    function filledAllAndCorrect(question_index_current) {
        let l = $(`#question-${question_index_current} .task-panel li`).length;
        // kiem tra so luong cau hoi con lai trong tung question
        let h = $(`#question-${question_index_current} .task-panel li.hidden`).length;
        let c = $(`#question-${question_index_current} .answer-panel li.correct`).length;
        if (l === h) {
            $(`#question-${question_index_current}`).addClass('filled-all');
        } else {
            $(`#question-${question_index_current}`).removeClass('filled-all');
        }
        if (l === c) {
            $(`#question-${question_index_current}`).addClass('correct-all');
        } else {
            $(`#question-${question_index_current}`).removeClass('correct-all');
        }
    }

    function countCorrectAnswers(namePart) {
        if (namePart === '.task1') {
            return $(`.task1 .question.correct-all`).length;
        } else {
            return $(`${namePart} .correct`).length;
        }
    }

    function clickTryAgain(namePart) {
        $(`${namePart} .action .btn.btn-danger`).on('click', function () {
            console.log('click try again in ' + namePart);
            reset(namePart);
            $(`${namePart} span.answer`).addClass('hidden');
            $(`${namePart} li`).removeClass('bg-info bg-correct bg-wrong disable hidden');
            $(`${namePart} .action .btn.btn-danger`).addClass('disabled');
            $(`${namePart} .action .btn.btn-info`).addClass('hidden');
            $(`${namePart} .check-icon`).removeClass('fa-check fa-xmark');
            if (namePart === '.overview') {
                $(`${namePart} .gapfield-list li`).text('').data('question-index', '-1').removeClass('correct incorrect');
            } else if (namePart === '.task1') {
                $(`${namePart} .gapfield-list-0 li`).text('').attr('data-question-index', '-1').removeClass('correct incorrect');
            } else if (namePart === '.task4') {
                $('.task4 input[type="text"]').prop("disabled", false);
                $(`${namePart} input[type="text"]`).val('').removeClass('correct incorrect texted bg-correct bg-wrong');
            } else if (namePart === '.task5') {
                $(`${namePart} .subquestion li`).text('').attr('data-question-index', '-1').removeClass('correct incorrect');
            }
        });
    }

    function clickShowAnswer(namePart) {
        $(`${namePart} .action .btn.btn-info`).on('click', function () {
            reset(namePart);
            if ($(`${namePart} span.answer`).hasClass('hidden')) {
                $(`${namePart} span.answer`).removeClass('hidden');
                if (namePart === '.overview') {
                    $(`#questions li.list-group-item.btn.btn-light`).addClass('bg-info');
                } else if (namePart === '.task1') {
                    $(`${namePart} .answer-panel li.list-group-item.btn.btn-light`).addClass('bg-info');
                } else if (namePart === '.task5') {
                    $(`${namePart} .question5 li.list-group-item.btn.btn-light`).addClass('bg-info');
                }
            } else {
                $(`${namePart} span.answer`).addClass('hidden').removeClass('bg-info');
                if (namePart === '.overview') {
                    $(`#questions li.list-group-item.btn.btn-light`).removeClass('bg-info');
                } else if (namePart === '.task1') {
                    $(`${namePart} .answer-panel li.list-group-item.btn.btn-light`).removeClass('bg-info');
                } else if (namePart === '.task5') {
                    $(`${namePart} .question5 li.list-group-item.btn.btn-light`).removeClass('bg-info');
                }
                $(`${namePart} .check-icon`).removeClass('hidden');
            }
        });
    }

    function reset(namePart) {
        $(`${namePart} .check-icon`).addClass('hidden');
        // $(`${namePart} i.hidden`).removeClass('hidden');
        $(`${namePart} .action .btn.btn-success`).addClass('disabled');
        if (namePart === '.overview') {
            $('#main_list li').removeClass('hidden');
            $('#remainingText').text(`${overview_total_question} items remaining`);
        } else if (namePart === '.task1') {
            $('#main_list_0 li').removeClass('hidden');
            $('#remainingText_0').text(`${total_ques_0} items remaining`);
        } else if (namePart === '.task4') {
            $('#remainingText_3').text(`${total_ques_3} items remaining`);
        } else if (namePart === '.task5') {
            // $('#main_list_4 li').removeClass('hidden');
            $('#remainingText_4').text(`${total_ques_4} items remaining`);
        }
    };
    // end:Task scripts
});

