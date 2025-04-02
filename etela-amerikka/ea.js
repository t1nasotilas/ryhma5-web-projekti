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
    },
    {
        question: "Missä kaupungissa kuvan nähtävyys sijaitsee?",
        image: "../etela-amerikka/images/kristus.jpg",
        answers: [
            {text: "Buenos Aires", correct: false},
            {text: "Santiago", correct: false},
            {text: "Rio de Janeiro", correct: true},
            {text: "Lima", correct: false}
        ]
    },
    {
        question: "Mikä on Etelä-Amerikan korkein vuori?",
        answers: [
            {text: "Aconcagua", correct: true},
            {text: "Ojos del Salado", correct: false},
            {text: "Cotopaxi", correct: false},
            {text: "Chimborazo", correct: false}
        ]
    },
    {
        question: "Mikä on puhutuin äidinkieli Etelä-Amerikassa?",
        answers: [
            {text: "Espanja", correct: false},
            {text: "Portugali", correct: true},
            {text: "Ranska", correct: false},
            {text: "Englanti", correct: false}
        ]
    },
    {
        question: "Mitkä kaksi maata Patagonia yhdistää?",
        image: "../etela-amerikka/images/patagonia1.jpg",
        answers: [
            {text: "Chile ja Argentiina", correct: true},
            {text: "Brasilia ja Peru", correct: false},
            {text: "Kolumbia ja Venezuela", correct: false},
            {text: "Ecuador ja Bolivia", correct: false}
        ]
    },
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

const startScreen = document.getElementById('start-screen');
const startButton = document.getElementById('start-btn');
const quizScreen = document.getElementById('quiz-container');

// Luodaan funktio, joka sekoittaa kysymykset satunnaisesti
function shuffleQuestions(){
    for(let i = questions.length - 1; i > 0; i--){
        let j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]]; // Vaihdetaan paikkoja
    }
};

// Luodaan funktio, joka sekoittaa vastaukset satunnaisesti
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

startButton.addEventListener('click', () => {
    startScreen.style.display = 'none'; // Piilotetaan aloitusnäyttö
    quizScreen.style.display = 'block'; // Näytetään peli
    startQuiz(); // Aloitetaan peli
});

// Aloitetaan peli, sekoitetaan kysymykset ja vastaukset
// ja asetetaan nykyinen kysymysindeksi ja pisteet nollaksi
function startQuiz() {
    shuffleQuestions();
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Seuraava';
    showQuestion();
};

// Näyttää kysymyksen numeron ja kysymyksen tekstin
function showQuestion(){
    resetState(); // Tyhjentää edelliset kysymykset ja vastaukset
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;

    if(currentQuestion.image){
        const imgElement = document.createElement('img');
        imgElement.src = currentQuestion.image; // Lisää kuva kysymykseen
        imgElement.alt = "Kysymykseen liittyvä kuva";
        imgElement.classList.add('question-image'); // CSS-muotoilu
        questionElement.appendChild(imgElement);
    };

    shuffleArray(currentQuestion.answers); // Sekoitamme vastaukset satunnaisesti

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
};

function resetState(){
    nextButton.style.display = 'none';
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
};

function selectAnswer(e){
    const selectButton = e.target;
    const correct = selectButton.dataset.correct;
    const messageElement = document.createElement('p'); // Luo elementti viestin näyttämistä varten
    if(correct){
        selectButton.classList.add('correct');
        score++;
        // Näytetään käyttäjälle oikea vastaus ja lisätään pisteitä
    }else{
        selectButton.classList.add('incorrect');
        messageElement.innerHTML = "Väärin!"; // Näytetään viesti kun vastaus on väärin
    };

    answerButtons.appendChild(messageElement);

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === 'true'){
            button.classList.add('correct');
        }
        button.disabled = true; // Estetään muiden vastausten valinta
    });
    nextButton.style.display = 'block'; // Näytetään "Seuraava" -painike
};

function showScore(){
    resetState();
    questionElement.innerHTML = `Pisteesi ${score} / ${questions.length}`;
    nextButton.innerHTML = 'Pelaa uudelleen';
    nextButton.style.display = 'block'; // Näytetään "Pelaa uudelleen" -painike
};
// Näytetään käyttäjälle oikea vastaus ja lisätään pisteitä
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