$(function () {
    var countDownDate = new Date().getTime() + 30 * 60 * 1000; // Thời gian kết thúc đếm ngược là 30 phút sau thời điểm hiện tại
    var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    $("#time").text("Time remaining: " + minutes + ":" + seconds);
    if (distance < 0) {
      clearInterval(x);
      $("#time").text("End Time");
    }
  }, 1000);

    // begin: Task 1
    let question_index_current = 1;
    const total_questions = $('.Quiz-inner').length;
    let task_selectedData = null;
    changeRemainingQuestions();

     $(".rq-Question-answerList li").click(function() {
        if ($(this).hasClass('selecting-answer')) {
            $(this).removeClass('selecting-answer');
            $(this).css('background-color', '#fff');
        } else {
            task_selectedData = $(this);
            $('.selecting-answer').removeClass('selecting-answer');
            $(this).addClass('selecting-answer');
            $(this).css('background-color', '#DEDEDE');
        }
        changeRemainingQuestions();

  });
    
   $(".Quiz-confidence-buttons a").click(function() {
        if ($(this).hasClass('selecting-btn')) {
            $(this).removeClass('selecting-btn');
            $(this).css('background-color', '#fff');
        } else {
            $('.selecting-btn').removeClass('selecting-btn');
            $(this).addClass('selecting-btn');
            $(this).css('background-color', '#DEDEDE');
        }
        changeRemainingQuestions();

  });


    $('#btn-next').on('click', function () {
        question_index_current++;
        console.log("qic: " + question_index_current);
        $(`#question-${question_index_current - 1}.Quiz-inner`).css("display", "none");
        $(`#question-${question_index_current}.Quiz-inner`).css("display", "block");
        ableButton(question_index_current);
        task_selectedData = null;
        $('.selecting-answer').removeClass('selecting-answer');
        $('.selecting-btn').removeClass('selecting-btn');
        changeRemainingQuestions();
    });


    $('#btn-prev').addClass('disabled');
    // $('#btn-prev').addClass('disable');

    $('#btn-prev').on('click', function () {
        
        question_index_current--;
        console.log("qic: " + question_index_current);
        $(`#question-${question_index_current + 1}.Quiz-inner`).css("display", "none");
        $(`#question-${question_index_current}.Quiz-inner`).css("display", "block");
        ableButton(question_index_current);
        task_selectedData = null;
        $('.selecting-answer').removeClass('selecting-answer');
        $('.selecting-btn').removeClass('selecting-btn');
        changeRemainingQuestions();
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

    function filledAll(question_index_current) {
        let l = $(`#question-${question_index_current} .rq-Question-answerList li.answer.selecting-answer`).length;
        let h = $(`#question-${question_index_current} .Quiz-confidence-buttons a.btn.btn-default.selecting-btn`).length;
        // kiem tra so luong cau hoi con lai trong tung question
        if (l === 1 && h === 1) {
            $(`#question-${question_index_current}`).addClass('filled-all');
        } else { 
            $(`#question-${question_index_current}`).removeClass('filled-all');
        }
    }

    function changeRemainingQuestions() {
        filledAll(question_index_current);
        let l = $(`.Quiz-inner.filled-all`).length;
        let prg = Math.floor((l * 100) / total_questions);;
        $('.progress-bar').css("width", `${prg}%`);
    }
    // end:Task scripts
});
