const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit");

const myQuestions = [
  {
    question: "1. Mikä on Etelä-Amerikan suurin valtio pinta-alaltaan?",
    answers: {
        a: "Argentiina",
        b: "Brasilia",
        c: "Chile",
        d: "Peru"
    },
    correnctAnswer: "b"
  },
  {
    question: "2. ..."
  }
];

function buildQuiz() {
    const output = [];

    myQuestions.forEach(
        (currentQuestion, questionNumber) => {
            // Muuttuja tallentaa listana vastausvaihtoehdot
            const answers = [];
            // ja jokaiselle saatavilla olevalle vastaukselle...
            for (letter in currentQuestion.answers) {
                // ...lisätään valintanappula HTML:ään
                answers.push(
                    `<label>
                        <input type="radio" name="question${questionNumber}" value="${letter}">
                        ${letter} : 
                        ${currentQuestion.answers[letter]}
                        </label>`
                    );
            }

            // Lisätään kysymys ja vastausvaihtoehdot HTML:ään
            output.push(
                `<div class0"question"> ${currentQuestion.question} </div>
                <div class="answers"> ${answers.join('')} <div>`
            );
        }
    );
    // Muodostetaan HTML ja lisätään se DOM:iin
    quizContainer.innerHTML = output.join('');
}