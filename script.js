const startButton = document.querySelector("#start-btn");
const nextButton = document.querySelector("#next-btn");
const questionContainer = document.querySelector("#question-container");
const questionElement = document.querySelector("#question");
const answerButtons = document.querySelector("#answer-buttons");

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainer.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}
function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtons.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "What is 10 + 12?",
    answers: [
      { text: "22", correct: true },
      { text: "12", correct: false },
      { text: "15", correct: false },
      { text: "34", correct: false },
    ],
  },
  {
    question: "What team is Kobe Bryant?",
    answers: [
      { text: "miami", correct: false },
      { text: "Celtics", correct: false },
      { text: "Lakers", correct: true },
      { text: "Knicks", correct: false },
    ],
  },
  {
    question: "Is web development fun?",
    answers: [
      { text: "Kinda", correct: false },
      { text: "YES!!!", correct: true },
      { text: "Um no", correct: false },
      { text: "IDK", correct: false },
    ],
  },
  {
    question: "What is 14 * 2?",
    answers: [
      { text: "6", correct: false },
      { text: "28", correct: true },
      { text: "16", correct: false },
      { text: "26", correct: false },
    ],
  },
];
