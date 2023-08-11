$(function () {
    var countDownDate = new Date().getTime() + 30 * 60 * 1000; // Thời gian kết thúc đếm ngược là 30 phút sau thời điểm hiện tại
    var x = setInterval(function () {
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        $("#time").text("Time remaining: " + minutes + ":" + seconds);
        if (distance < 0) {
            $('#submit-btn').click();
        }
    }, 1000);

    // begin: Task 1
    let question_index_current = 1;
    const total_questions = $('.Quiz-inner').length;
    let task_selectedData = null;
    changeRemainingQuestions();
    $(".Quiz-confidence-buttons .btn.btn-default").addClass('disabled');

    $('#btn-next').on('click', function () {
        question_index_current++;
        console.log("qic: " + question_index_current);
        $(`#question-${question_index_current - 1}.Quiz-inner`).css("display", "none");
        $(`#question-${question_index_current}.Quiz-inner`).css("display", "block");
        ableButton(question_index_current);
        task_selectedData = null;
        confirmSubmit();

    });


    $('#btn-prev').on('click', function () {
        question_index_current--;
        console.log("qic: " + question_index_current);
        $(`#question-${question_index_current + 1}.Quiz-inner`).css("display", "none");
        $(`#question-${question_index_current}.Quiz-inner`).css("display", "block");
        ableButton(question_index_current);
        task_selectedData = null;
        confirmSubmit();
    });

    $(".radio label").click(function () {
        task_selectedData = $(this);
        $('.selecting-answer').removeClass('selecting-answer');
        ($(this).prev()).addClass('selecting-answer');
        $(`#question-${question_index_current} .Quiz-confidence-buttons .btn`).removeClass('disabled');
        changeRemainingQuestions();
        confirmSubmit();
    });


    $(`.Quiz-confidence-buttons a`).click(function () {
        let data_topic = $(`#question-${question_index_current}`).attr('data-topic') + "_";
        let data_degree = "_" + $(this).attr('data-degree');
        let data_answer = $(`#question-${question_index_current} .selecting-answer`).val();
        $(`#question-${question_index_current} .Quiz-confidence-buttons .selecting-btn`).removeClass('selecting-btn');
        $(this).addClass('selecting-btn');
        $(this).css('background-color', '#DEDEDE');
        // }
        $(`#question-${question_index_current} .selecting-answer`).val(data_topic + data_answer[0] + data_degree);
        changeRemainingQuestions();
        confirmSubmit();
    });


    function ableButton(index) {
        if (index === 1) {
            $('#btn-prev').addClass('disabled');
        } else if (index === total_questions) {
            $('#btn-next').addClass('disabled');
        } else {
            $('#btn-prev').removeClass('disabled');
            $('#btn-next').removeClass('disabled');
        }
    }

    function confirmSubmit() {
        console.log("filled-all: " + $('.filled-all').length);
        if ($('.filled-all').length === total_questions) {
            setTimeout(function () {
                if (question_index_current == total_questions) {
                    var confirmSubmit = confirm('Bạn có muốn submit không?');
                    if (confirmSubmit) {
                        $('#submit-btn').click();
                    }
                }
            }, 1000);
        }
    }

    function filledAll(question_index_current) {
        let l = $(`#question-${question_index_current} .selecting-answer`).length;
        let h = $(`#question-${question_index_current} .Quiz-confidence-buttons a.btn.btn-default.selecting-btn`).length;
        // kiem tra so luong cau hoi con lai trong tung question
        console.log("l: " + l);
        console.log("h: " + h);
        if (l === 1 && h === 1) {
            $(`#question-${question_index_current}`).addClass('filled-all');
        } else {
            $(`#question-${question_index_current}`).removeClass('filled-all');
        }
        ableButton(question_index_current);
    }

    function changeRemainingQuestions() {
        filledAll(question_index_current);
        let l = $(`.Quiz-inner.filled-all`).length;
        let prg = Math.floor((l * 100) / total_questions);;
        $('.progress-bar').css("width", `${prg}%`);
    }


    $(".TigerQuiz .btn.btn-default").on('click', function () {
        $('.TigerQuiz .btn.btn-default').css('background-color', 'white');
        $('.TigerQuiz .btn.btn-default.selecting-btn').css('background-color', '#DEDEDE');
    });
    // end:Task scripts

});

