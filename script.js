$(document).ready(function() {
  // variables
  var questionCounter = 0;
  var score = 0;
  var sec = 70;
  var startButtonElement = document.getElementById("start");
  //start timer with 1 second delay
  var questionsCount = questionsArray.length;
  // console.log(questionsArray[questionCounter].optionone);
  var time;

  function startButton() {
    time = setInterval(myTimer, 1000);
    // $(".end-section").hide();
    $(".progress-section").hide();
    $(".quiz-box").hide();
    $(".feedback-section").hide();
    handleStartClick();
    handleStartOver();
  }

  function handleStartClick() {
    // $(".start-button").on("click", function(event) {
    // console.log("handleStartClick() ran");
    $(".progress-section").show();
    $(".start-section").hide();
    $(".end-section").hide();
    // $(".quiz-box").fadeIn("slow");
    renderQuizBox();
    // });
  }

  // This function displays the quiz box with the question, options, score and question count.
  function renderQuizBox() {
    // renderQuestionCount();
    renderQuestion();
    renderScore();
  }
  function renderScore() {
    $(".progress-section .score-card").text(`${score}/${questionsCount}`);
  }

  // This function renders a new question.
  function renderQuestion() {
    $(".questions-form p").text(questionsArray[questionCounter].question);
    $("#option-one").text(questionsArray[questionCounter].optionone);
    $("#option-two").text(questionsArray[questionCounter].optiontwo);
    $("#option-three").text(questionsArray[questionCounter].optionthree);
    $("#option-four").text(questionsArray[questionCounter].optionfour);
  }

  function clickButton() {
    var userChoice = $(this).text();
    checkAnswer(userChoice);
    renderQuestion();
    questionCounter++;
    if (questionCounter === questionsCount.length + 1) {
      endGame();
    }
  }

  function endGame() {}

  // Checks whether the answer selected by the user is correct or not.
  function checkAnswer(selected) {
    let rightAnswer = questionsArray[questionCounter].correctAnswer;
    if (selected === rightAnswer) {
      score++;
      //displayPopup(true, rightAnswer);
      console.log("rightAnswer");
      var toast = document.getElementsByClassName("toast")[0];
      toast.classList.remove("hidden");
      $(document).ready(function(correctAnswer) {
        $(".toast").toast("show");
      });
    } else {
      //displayPopup(false, rightAnswer);
      console.log("incorrectAnswer");
      sec -= 10;
      document.getElementById("timer").innerHTML = sec + "sec left";
    }
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

  if (startButtonElement) {
    startButtonElement.onclick = init;
  } else {
    // local storage of highscores
    var highscoreForm = document.querySelector("#highscores-form");
    var highscoreText = document.querySelector("#highscore-count");
    var highscoreList = document.querySelector("#highscore-list");

    highscoreForm.addEventListener("submit", function(event) {
      event.preventDefault();

      if (highscoreText.textContent.length < 1) return;

      highscoreList.innerHTML += "<ol>" + highscoreText.textContent + "</ol>";

      highscoreText.textContent = "";

      localStorage.setItem("highscoreText", highscoreList.innerHTML);

      var saved = localStorage.getItem("highscoreText");

      if (saved) {
        highscoreList.innerHTML = saved;
      }
    });
  }

  $(".options").on("click", clickButton);
});
