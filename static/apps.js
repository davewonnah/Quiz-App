
// Function to shuffle an array using Fisher-Yates algorithm
function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

let time_left = document.querySelector(".timer-left");
let quiz_container = document.querySelector("#container");
let next_btn = document.querySelector("#next-button");
let display_box = document.querySelector("#display-container");
let questions_num = document.querySelector(".question-number");
let score_container = document.querySelector(".score-container");
let restart = document.querySelector("#restart");
let user_score = document.querySelector(".user-score");
let start_screen = document.querySelector(".start-screen");
let start_button = document.getElementById("start-btn");

let question_count;
let score_count = 0;
let count = 11;
let countdown;

const quizArray = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correct: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Venus", "Jupiter", "Saturn"],
        correct: "Mars"
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        correct: "Blue Whale"
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Charles Dickens", "Jane Austen", "William Shakespeare", "Mark Twain"],
        correct: "William Shakespeare"
    },
    {
        question: "What is the currency of Japan?",
        options: ["Yuan", "Euro", "Dollar", "Yen"],
        correct: "Yen"
    },
    {
        question: "Which country is known as the 'Land of the Rising Sun'?",
        options: ["China", "Japan", "South Korea", "Thailand"],
        correct: "Japan"
    },
    {
        question: "In which year did the Titanic sink?",
        options: ["1912", "1905", "1923", "1931"],
        correct: "1912"
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Au", "Ag", "Fe", "Hg"],
        correct: "Au"
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
        correct: "Leonardo da Vinci"
    },
    {
        question: "Which mountain is the tallest in the world?",
        options: ["Mount Everest", "K2", "Kangchenjunga", "Lhotse"],
        correct: "Mount Everest"
    }
    // Add more questions as needed
];


restart.addEventListener("click", () => {
    initial();
    display_box.classList.remove("hide");
    score_container.classList.add("hide");
});

next_btn.addEventListener("click", () => {
    if (question_count === quizArray.length) {
        display_box.classList.add("hide");
        score_container.classList.remove("hide");
        user_score.innerHTML = "Your Score is " + score_count + " out of " + quizArray.length;
    } else {
        questions_num.innerHTML = question_count + 1 + " of " + quizArray.length + " questions";
        displayQuiz(question_count);
        count = 11;
        clearInterval(countdown);
        timerDisplay();
    }
});

function timerDisplay() {
    countdown = setInterval(() => {
        count--;
        time_left.innerHTML = `${count}s`;
        if (count === 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
}

function displayQuiz(question_count) {
    let quiz_card = document.querySelectorAll(".container-mid");
    quiz_card.forEach((card) => {
        card.classList.add("hide");
    });

    let currentQuizCard = quiz_card[question_count];
    currentQuizCard.classList.remove("hide");

    let questionContainer = currentQuizCard.querySelector(".question-container");
    let optionsContainer = currentQuizCard.querySelector(".options-container");

    questionContainer.innerHTML = quizArray[question_count].question;

    optionsContainer.innerHTML = "";

    for (let option of quizArray[question_count].options) {
        let optionButton = document.createElement("button");
        optionButton.classList.add("options-div");
        optionButton.innerHTML = option;
        optionButton.addEventListener("click", () => check(optionButton));
        optionsContainer.appendChild(optionButton);
    }
}

function check(userOption) {
    let user_solution = userOption.innerHTML;
    let question = document.querySelectorAll(".container-mid")[question_count];
    let options = question.querySelectorAll(".options-div");

    if (user_solution === quizArray[question_count].correct) {
        userOption.classList.add("correct");
        score_count++;
    } else {
        userOption.classList.add("incorrect");

        options.forEach((element) => {
            if (element.innerHTML === quizArray[question_count].correct) {
                element.classList.add("correct");
            }
        });
    }

    options.forEach((element) => {
        element.disabled = true;
    });

    clearInterval(countdown);

    setTimeout(() => {
        displayNext();
    }, 1000);
}

function displayNext() {
    question_count++;

    if (question_count === quizArray.length) {
        display_box.classList.add("hide");
        score_container.classList.remove("hide");
        user_score.innerHTML = "Your Score is " + score_count + " out of " + quizArray.length;
    } else {
        questions_num.innerHTML = question_count + 1 + " of " + quizArray.length + " questions";
        displayQuiz(question_count);
        count = 11;
        timerDisplay();
    }
}

function initial() {
    quiz_container.innerHTML = "";
    question_count = 0;
    score_count = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quiz_creator();
    displayQuiz(question_count);
}

start_button.addEventListener("click", () => {
    start_screen.classList.add("hide");
    display_box.classList.remove("hide");
    initial();
});

window.onload = () => {
    start_screen.classList.remove("hide");
    display_box.classList.add("hide");
};

function quiz_creator() {
    for (let i = 0; i < quizArray.length; i++) {
        let quiz_card = document.createElement("div");
        quiz_card.classList.add("container-mid", "hide");
        let question_container = document.createElement("div");
        question_container.classList.add("question-container");
        let options_container = document.createElement("div");
        options_container.classList.add("options-container");
        quiz_container.appendChild(quiz_card);
        quiz_card.appendChild(question_container);
        quiz_card.appendChild(options_container);
    }
    shuffle(quizArray);
}
