$(document).ready(function() {
  // variables
  //   var questionsArray = [];
  //   console.log(questionsArray);
  var questionCounter = 0;
  var score = 0;
  var sec = 75;
  var startButtonElement = document.getElementById("start");
  var correctAnswerIcon =
    "https://clipartstation.com/wp-content/uploads/2018/09/correct-answer-clipart-1.png";
  var wrongAnswerIcon =
    "http://thebaseisunderasalt.weebly.com/uploads/5/0/1/4/50143205/____________2846732.png";
  var warningIcon =
    "https://www.puntosud.org/wp-content/uploads/2018/06/warning-icon-300x275.png";

  //start timer with 1 second delay
  let questionsCount = questionsArray.length;
  console.log(questionsArray[questionCounter].optionone);
  var time;
  function startButton() {
    time = setInterval(myTimer, 1000);
    // $(".end-section").hide();
    $(".progress-section").hide();
    $(".quiz-box").hide();
    $(".feedback-section").hide();
    handleStartClick();
    handleSubmitAnswer();
    handleStartOver();
  }

  function handleStartClick() {
    // $(".start-button").on("click", function(event) {
    console.log("handleStartClick() ran");
    $(".progress-section").show();
    $(".start-section").hide();
    $(".end-section").hide();
    // $(".quiz-box").fadeIn("slow");
    renderQuizBox();
    // });
  }

  // This function displays the quiz box with the question, options, score and question count.
  function renderQuizBox() {
    renderQuestionCount();
    renderQuestion();
    renderScore();
  }
  function renderScore() {
    $(".progress-section .score-card").text(`${score}/${questionsCount}`);
  }
  function renderQuestionCount() {
    $(".progress-section .question-count").text(
      `Question ${questionCounter + 1} of ${questionsCount}`
    );
  }

  // This function renders a new question.
  function renderQuestion() {
    $(".questions-form p").text(questionsArray[questionCounter].question);
    $("#option-one").text(questionsArray[questionCounter].optionone);
    $("#option-two").text(questionsArray[questionCounter].optiontwo);
    $("#option-three").text(questionsArray[questionCounter].optionthree);
    $("#option-four").text(questionsArray[questionCounter].optionfour);
    questionCounter++;
    $(".questions-form #option-one")
      .next()
      .text(questionsArray[questionCounter].optionone);
    $(".questions-form #option-two")
      .next()
      .text(questionsArray[questionCounter].optiontwo);
    $(".questions-form #option-three")
      .next()
      .text(questionsArray[questionCounter].optionthree);
    $(".questions-form #option-four")
      .next()
      .text(questionsArray[questionCounter].optionfour);
  }

  function handleSubmitAnswer() {
    $(".js-submit-button").on("click", function(event) {
      console.log("handleSubmitAnswer() ran");
      let selectedOption = $("input[type=radio]:checked").val();
      if (selectedOption === undefined) {
        displayPopup(false, selectedOption);
      } else {
        //reset radio button
        $("input[type=radio]:checked").attr("checked", false);
        checkAnswer(selectedOption);
      }
    });
  }

  // Checks whether the answer selected by the user is correct or not.
  function checkAnswer(selected) {
    let rightAnswer = questionsArray[questionCounter].correctAnswer;
    if (selected === rightAnswer) {
      score++;
      displayPopup(true, rightAnswer);
    } else {
      displayPopup(false, rightAnswer);
    }
  }

  //This function gives feedback to the user whether the option selected is correct or wrong. It also alerts the user if no option is selected.
  // function displayPopup(statusFlag, answer) {
  //   $(".feedback-section").show();
  //   if (statusFlag) {
  //     $(".popup-box img").attr("src", correctAnswerIcon);
  //     $(".popup-box #popup-text").text("You are right!");
  //     $(".popup-box").show();
  //   } else {
  //     if (answer === undefined) {
  //       questionCounter--;
  //       $(".popup-box img").attr("src", warningIcon);
  //       $(".popup-box #popup-text").text("Please select an option");
  //     } else {
  //       $(".popup-box img").attr("src", wrongAnswerIcon);
  //       $(".popup-box #popup-text").text(
  //         `Sorry, the correct answer was: ${answer}`
  //       );
  //     }
  //   }
  //   $(".popup-box").show();
  // }

  //This function will proceed to the next question or display the final score based on the question count.
  // function handlePopupClose() {
  //   $(".js-close-button").on("click", function(event) {
  //     console.log("handlePopupClose() ran");
  //     $(".popup-box").hide();
  //     $(".feedback-section").hide();
  //     $(".quiz-box")
  //       .hide()
  //       .fadeIn();
  //     questionCounter++;
  //     if (questionCounter < questionsArray.length) {
  //       $(".quiz-box").fadeIn();
  //       renderQuizBox();
  //     } else {
  //       $(".quiz-box").hide();
  //       displayFinalScore();
  //     }
  //   });
  // }

  //This function displays the final score once the quiz is completed.
  function displayFinalScore() {
    $(".end-section").fadeIn(1000);
    $(".end-section h4").text(`Your Score is: ${score}/${questionsCount}`);
    $(".correct .count").text(score);
    $(".wrong .count").text(questionsCount - score);
    resetQuiz();
  }

  //This function resets the questions and score.
  function resetQuiz() {
    questionCounter = 0;
    score = 0;
  }

  //This function will start quiz over.
  function handleStartOver() {
    $(".js-startover-button").on("click", function(event) {
      console.log("handleStartOver() ran");
      $(".end-section").hide();
      $(".quiz-box").fadeIn();
      renderQuizBox();
    });
  }

  function init() {
    $(".end-section").hide();
    $(".progress-section").hide();
    $(".quiz-box").hide();
    $(".feedback-section").hide();
    startButton();
  }

  //timer

  function myTimer() {
    document.getElementById("timer").innerHTML = sec + "sec left";
    sec--;

    if (sec === 0) {
      clearInterval(time);
      alert("Time out!!!");
    }
  }

  startButtonElement.onclick = init;
});
