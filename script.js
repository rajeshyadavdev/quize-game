// -------------------------
// DOM ELEMENTS
// -------------------------
// Grab all the HTML elements we need to manipulate in JS
const startButton = document.getElementById("start-btn"); // Start Quiz button
const username = document.getElementById("name"); // user name
const startScreen = document.getElementById("start-screen"); // Initial screen
const quizScreen = document.getElementById("quiz-screen"); // Quiz question screen
const resultScreen = document.getElementById("result-screen"); // Final result screen
const questionText = document.getElementById("question-text"); // Question display
const answerContainer = document.getElementById("answer-container"); // Container for answer buttons
const currentQuestionSpan = document.getElementById("current-question"); // Current question number
const totalQuestionSpan = document.getElementById("total-question"); // Total number of questions
const scoreSpan = document.getElementById("score"); // Current score
const finalScoreSpan = document.getElementById("final-score"); // Score on result screen
const maxScoreSpan = document.getElementById("max-score"); // Max score display on result screen
const resultMessage = document.getElementById("result-message"); // Message on result screen
const restartButton = document.getElementById("restart-btn"); // Restart quiz button
const progressBar = document.getElementById("progress"); // Progress bar element

// -------------------------
// QUIZ QUESTIONS
// -------------------------
// Array of question objects
const quizQuestions = [
  // 🌿 SIMPLE PRESENT (Positive, Negative, Interrogative)
  {
    question: "Which sentence is in the Simple Present tense?",
    answers: [
      { text: "She plays the piano every day.", correct: true },
      { text: "She is playing the piano.", correct: false },
      { text: "She played the piano.", correct: false },
      { text: "She has played the piano.", correct: false },
    ],
  },
  {
    question: "Which is the correct negative form in Simple Present tense?",
    answers: [
      { text: "He not eats breakfast.", correct: false },
      { text: "He doesn’t eat breakfast.", correct: true },
      { text: "He didn’t eats breakfast.", correct: false },
      { text: "He isn’t eating breakfast.", correct: false },
    ],
  },
  {
    question: "Which is the correct interrogative form in Simple Present tense?",
    answers: [
      { text: "Does she like coffee?", correct: true },
      { text: "Is she liking coffee?", correct: false },
      { text: "Has she liked coffee?", correct: false },
      { text: "Did she like coffee?", correct: false },
    ],
  },
  {
    question: "Choose the correct form: He ___ to school every day.",
    answers: [
      { text: "go", correct: false },
      { text: "goes", correct: true },
      { text: "is going", correct: false },
      { text: "going", correct: false },
    ],
  },
];


// -------------------------
// STATE VARIABLES
// -------------------------
let currentQuestionIndex = 0; // Tracks which question is currently displayed
let score = 0; // Tracks number of correct answers
let answersDisabled = false; // Prevents multiple clicks on answers

// Display total number of questions in UI
totalQuestionSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// -------------------------
// EVENT LISTENERS
// -------------------------



// Start quiz when Start button is clicked
startButton.addEventListener("click", startQuiz);
// Restart quiz when Restart button is clicked
restartButton.addEventListener("click", restartQuiz);

// -------------------------
// FUNCTIONS
// -------------------------

// Function to start the quiz
function startQuiz() {
  if(username.value != ""){
    localStorage.setItem("username",username.value)
  currentQuestionIndex = 0; // Reset to first question
  score = 0; // Reset score
  scoreSpan.textContent = 0; // Update UI
  startScreen.classList.remove("active"); // Hide start screen
  quizScreen.classList.add("active"); // Show quiz screen

  username.value = ""
  showQuestion(); // Show the first question
  }else{
    document.querySelector(".emptyName").style.display="block"
  }
}


// Function to display a question and its answers
function showQuestion() {
  answersDisabled = false; // Enable answer buttons
  const currentQuestion = quizQuestions[currentQuestionIndex]; // Get current question object

  // Update current question number and progress bar
  currentQuestionSpan.textContent = currentQuestionIndex + 1;
  const progressPercent = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question; // Show question text
  answerContainer.innerHTML = ""; // Clear previous answers

  // Create buttons for each answer dynamically
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button"); // Create button element
    button.textContent = answer.text; // Set answer text
    button.classList.add("answer-btn"); // Add styling class
    button.dataset.correct = answer.correct; // Store if answer is correct
    button.addEventListener("click", selectAnswer); // Add click listener
    answerContainer.appendChild(button); // Add button to container
  });
}

// Function to handle answer selection
function selectAnswer(event) {
  if (answersDisabled) return; // Prevent multiple clicks
  answersDisabled = true; // Disable further clicks

  const selectedButton = event.target; // Button clicked
  const isCorrect = selectedButton.dataset.correct === "true"; // Check if correct

  // Show correct/incorrect answers
  Array.from(answerContainer.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct"); // Green for correct
    } else if (button === selectedButton) {
      button.classList.add("incorrect"); // Red for wrong selection
    }
  });

  // Update score if correct
  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  // Move to next question after 1 second
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion(); // Show next question
    } else {
      showResult(); // Show results if quiz is over
    }
  }, 1000);
}

// Function to display quiz results
function showResult() {
  quizScreen.classList.remove("active"); // Hide quiz screen
  resultScreen.classList.add("active"); // Show result screen

  finalScoreSpan.textContent = score; // Show final score
  const percentage = (score / quizQuestions.length) * 100; // Calculate percentage

  // Show message based on score percentage
  if (percentage === 100) {
    resultMessage.textContent = `Perfect! ${localStorage.getItem("username")}  You're a genius!`;
  } else if (percentage >= 80) {
    resultMessage.textContent = `Great job! ${localStorage.getItem("username")} You know your stuff!`;
  } else if (percentage >= 60) {
    resultMessage.textContent = `Good effort, ${localStorage.getItem("username")} keep learning!`;
  } else if (percentage >= 40) {
    resultMessage.textContent = `Not bad, ${localStorage.getItem("username")} try to improve!`;
  } else {
    resultMessage.textContent = `Keep studying, ${localStorage.getItem("username")} you'll get better!`;
  }
}

// Function to restart the quiz
function restartQuiz() {
  resultScreen.classList.remove("active"); // Hide result screen
  startScreen.classList.add("active");

  // startQuiz(); // Start quiz from beginning
}
