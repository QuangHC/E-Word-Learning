$(function () {
    // begin::Overview scripts
    let overview_selectedData = null;
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
        // Lấy giá trị của data-question-index và nội dung của thẻ li khi được click
        // overview_selectedData = getQuestionIndexAndText(this);
        if ($(this).hasClass('selecting')) {
            overview_selectedData = null;
            $(this).removeClass('selecting');
            $('.answer-panel .card').css('background-color', '#fff');
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

        $('#remainingText').text(`${countRemainingItems()} items remaining`);
        if (countRemainingItems() < remainingItems) {
            $('.overview .action .btn.btn-success').removeClass('disabled');
        } else {
            $('.overview .action .btn.btn-success').addClass('disabled');
        }
        if (countRemainingItems() === 0) {
            $('#remainingText').text('All items have been filled');
        }
    });

    changeTextModalFinish('.overview');
    clickTryAgain('.overview');
    clickShowAnswer('.overview');

    // Dem so luong item con lai trong main_list khong co thuoc tinh hidden
    function countRemainingItems() {
        const hiddenItem = $('#main_list li.list-group-item.btn.hidden').length;
        console.log(hiddenItem);
        return remainingItems - hiddenItem;
    }

    // Count number of correct answers
    function countCorrectAnswers(part) {
        const correctAnswers = $('.gapfield-list li.correct').length;
        return correctAnswers;
    }

   
    // end::Overview scripts
    // begin:Task scripts
    // begin: Task 1
    let question_index_current = 0;
    const total_questions = $('.question').length;
    let task_selectedData = null;
    let count_filled_all = 0;
    let correct_answers = 0;
    changeRemainingQuestions();
    $('#btn-next').on('click', function () {
        question_index_current++;
        console.log("qic: " + question_index_current);
        $(`#question-${question_index_current - 1}.question`).addClass('hidden');
        $(`#question-${question_index_current}.question`).removeClass('hidden');
        ableButton(question_index_current);
        task_selectedData = null;
        $('.selecting').removeClass('selecting');
    });


    $('#btn-prev').addClass('disable');

    $('#btn-prev').on('click', function () {
        question_index_current--;
        $(`#question-${question_index_current + 1}.question`).addClass('hidden');
        $(`#question-${question_index_current}.question`).removeClass('hidden');
        ableButton(question_index_current);
        task_selectedData = null;
        $('.selecting').removeClass('selecting');
    });

    $(`.task-panel li`).on('click', function () {
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
        console.log(`prevQuestionIndex: ${prevQuestionIndex}`);
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
        countfilledAllAndCorrect();
        changeRemainingQuestions();
        changeDisabledFinishButton();
    });

    changeTextModalFinish('.task1');
    clickTryAgain('.task1');
    clickShowAnswer('.task1');

    function ableButton(index) {
        if (index === 0) {
            $('#btn-prev').addClass('disable');
        } else if (index === total_questions - 1) {
            $('#btn-next').addClass('disable');
        } else {
            $('#btn-prev').removeClass('disable');
            $('#btn-next').removeClass('disable');
        }
    }

    function filledAllAndCorrect(question_index_current) {
        let l = $(`#question-${question_index_current} .task-panel li`).length;
        // kiem tra so luong cau hoi con lai trong tung question
        let h = $(`#question-${question_index_current} .task-panel li.hidden`).length;
        let c = $(`#question-${question_index_current} .answer-panel li.correct`).length;
        console.log(`l: ${l}`);
        console.log(`h: ${h}`);
        console.log(`c: ${c}`);
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

    function countfilledAllAndCorrect() {
        count_filled_all = $(`.question.filled-all`).length;
        correct_answers = $(`.question.correct-all`).length;
    }

    function changeRemainingQuestions() {
        let l = $(`.question.filled-all`).length;
        $('#remainingText_0').text(`${total_questions - l} items remaining`);
    }

    function changeDisabledFinishButton() {
        if (count_filled_all > 0) {
            $('.task1 button.btn.btn-success').removeClass('disabled');
        } else {
            $('.task1 button.btn.btn-success').addClass('disabled');
        }
    }

    function changeTextModalFinish(namePart) {
        $(`${namePart} [data-bs-target="#modal1"]`).on('click', function () {
            changeTextModalOK(namePart);
            if (namePart === '.overview') {
                $('#modal1 .modal-body p').text(`Answered questions: ${remainingItems - countRemainingItems()} out of ${remainingItems}. Do you want to finish?`);
            } else if (namePart === '.task1') {
                $('#modal1 .modal-body p').text(`Answered questions: ${count_filled_all} out of ${total_questions}. Do you want to finish?`);
            }
        });
    }

    function changeTextModalOK(namePart) {
        $(`[data-bs-target="#modal2"]`).on('click', function () {
            $(`${namePart} .incorrect`).addClass('bg-wrong');
            $(`${namePart} .correct`).addClass('bg-correct');
            $(`${namePart} i.hidden`).removeClass('hidden');
            $(`${namePart} .action .btn.btn-info`).removeClass('hidden');
            $(`${namePart} .action .btn.btn-danger`).removeClass('disabled');
            $(`${namePart} .action .btn.btn-success`).addClass('disabled');
            $(`${namePart} li`).addClass('disable');

            $('#close1').click();
            if (namePart === '.overview') {
                const totalCorrectAnswers = countCorrectAnswers();
                const percentage = (totalCorrectAnswers / remainingItems * 100).toFixed(2); // Lấy 2 chữ số sau dấu thập phân
                $('#modal2 .modal-body p').text(`Total score: ${totalCorrectAnswers} out of ${remainingItems} (${percentage}%)`);
            } else if (namePart === '.task1') {
                const percentage = (correct_answers / total_questions * 100).toFixed(2); // Lấy 2 chữ số sau dấu thập phân
                $('#modal2 .modal-body p').text(`Total score: ${correct_answers} out of ${total_questions} (${percentage}%)`);
            }
        });
    }

    function clickTryAgain(namePart) {
        $(`${namePart} .action .btn.btn-danger`).on('click', function () {
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
                }
            } else {
                $(`${namePart} span.answer`).addClass('hidden').removeClass('bg-info');
                if (namePart === '.overview') {
                    $(`#questions li.list-group-item.btn.btn-light`).removeClass('bg-info');
                } else if (namePart === '.task1') {
                    $(`${namePart} .answer-panel li.list-group-item.btn.btn-light`).removeClass('bg-info');
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
            $('#remainingText').text(`${remainingItems} items remaining`);
        } else if (namePart === '.task1') {
            $('#main_list_0 li').removeClass('hidden');
            $('#remainingText_0').text(`${total_questions} items remaining`);
        }
    };
    // end:Task scripts
});

