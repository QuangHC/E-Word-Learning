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

  //   $(".rq-Question-answerList li").click(function() {
  //       if ($(this).hasClass('selecting')) {
  //           $(this).removeClass('selecting');
  //           $(this).css('background-color', '#fff');
  //       } else {
  //           $('.selecting').removeClass('selecting');
  //           $(this).addClass('selecting');
  //           $(this).css('background-color', '#DEDEDE');
  //       }
  // });

  //   $(".Quiz-confidence-buttons button").click(function() {
  //       if ($(this).hasClass('selecting')) {
  //           $(this).removeClass('selecting');
  //           $(this).css('background-color', '#fff');
  //       } else {
  //           $('.selecting').removeClass('selecting');
  //           $(this).addClass('selecting');
  //           $(this).css('background-color', '#DEDEDE');
  //       }
  // });
});
