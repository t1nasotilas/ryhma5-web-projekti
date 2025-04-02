const questions = [
    {
        question: "Mikä on Etelä-Amerikan suurin maa pinta-alaltaan?",
        answers: [
            {text: "Brasilia", correct: true},
            {text: "Argentiina", correct: false},
            {text: "Chile", correct: false},
            {text: "Peru", correct: false}
        ]
    },
    {
        question: "Mikä on Etelä-Amerikan pisin joki?",
        answers: [
            {text: "Amazonjoki", correct: true},
            {text: "Orinoco", correct: false},
            {text: "Paraná", correct: false},
            {text: "Tocantins", correct: false}
        ]
    }
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

// Kun käyttäjä painaa "Seuraava" -painiketta, siirrytään seuraavaan kysymykseen
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Seuraava';
    showQuestion();
}

// Näyttää kysymyksen numeron ja kysymyksen tekstin
function showQuestion(){
    resetState(); // Tyhjentää edelliset kysymykset ja vastaukset
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = 'none';
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectButton = e.target;
    const correct = selectButton.dataset.correct;
    if(correct){
        selectButton.classList.add('correct');
        score++;
        // Näytetään käyttäjälle oikea vastaus ja lisätään pisteitä
    }else{
        selectButton.classList.add('incorrect');
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === 'true'){
            button.classList.add('correct');
        }
        button.disabled = true; // Estetään muiden vastausten valinta
    });
    nextButton.style.display = 'block'; // Näytetään "Seuraava" -painike
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Pisteesi ${score} / ${questions.length}`;
    nextButton.innerHTML = 'Pelaa uudelleen';
    nextButton.style.display = 'block'; // Näytetään "Pelaa uudelleen" -painike
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
};

nextButton.addEventListener('click', () => {
    if(currentQuestionIndex < questions.length){  
        handleNextButton();  
    }else{
        startQuiz();
    }
});

startQuiz();