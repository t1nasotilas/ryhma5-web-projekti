const questions = [
    {
        question: "Montako eri valtiota Etelä-Amerikassa on?",
        image: "../etela-amerikka/images/map.jpg",
        answers: [
            {text: "10", correct: false},
            {text: "12", correct: true},
            {text: "15", correct: false},
            {text: "13", correct: false}
        ],
        fact: "Oikein! Etelä-Amerikassa on yhteensä 12 itsenäistä maata, mukaan lukien Brasilia, Argentiina ja Chile.",
    },
    {
        question: "Mikä on Etelä-Amerikan pisin joki?",
        image: "../etela-amerikka/images/amazonia.jpg",
        answers: [
            {text: "Amazonjoki", correct: true},
            {text: "Orinoco", correct: false},
            {text: "Niili", correct: false},
            {text: "Tocantins", correct: false}
        ],
        fact: "Oikein! Amazonjoki on maailman pisin joki, ja se virtaa läpi useiden Etelä-Amerikan maiden, mukaan lukien Brasilian ja Perun.",
    },
    {
        question: "Missä kaupungissa kuvan nähtävyys sijaitsee?",
        image: "../etela-amerikka/images/kristus.jpg",
        answers: [
            {text: "Buenos Aires", correct: false},
            {text: "Santiago", correct: false},
            {text: "Rio de Janeiro", correct: true},
            {text: "Lima", correct: false}
        ],
        fact: "Oikein! Kuvan nähtävyys on Kristus Vapahtaja, joka sijaitsee Rio de Janeirossa, Brasiliassa. Se on yksi maailman tunnetuimmista maamerkeistä.",
    },
    {
        question: "Mikä on Etelä-Amerikan korkein vuori?",
        image: "../etela-amerikka/images/aconcagua.jpg",
        answers: [
            {text: "Aconcagua", correct: true},
            {text: "Ojos del Salado", correct: false},
            {text: "Cotopaxi", correct: false},
            {text: "Chimborazo", correct: false}
        ],
        fact: "Oikein! Aconcagua on Etelä-Amerikan korkein vuori, ja se sijaitsee Argentiinassa. Sen korkeus on 6 961 metriä merenpinnasta.",
    },
    {
        question: "Missä kyseiset patsaat sijaitsevat?",
        image: "../etela-amerikka/images/moaipatsaat.jpg",
        answers: [
            {text: "Pääsiäis-saarella", correct: true},
            {text: "Galápagos-saarella", correct: false},
            {text: "Falklandin-saarella", correct: false},
            {text: "Tierra del Fuegossa", correct: false}
        ],
        fact: "Oikein! Moai-patsaat sijaitsevat Easter Islandilla (Rapa Nui), joka on kuuluisa suurista kivipatsaistaan. Ne ovat osa Rapa Nuin kulttuuriperintöä.",
    },
    {
        question: "Mitkä kaksi maata Patagonia yhdistää?",
        image: "../etela-amerikka/images/patagonia1.jpg",
        answers: [
            {text: "Chile ja Argentiina", correct: true},
            {text: "Brasilia ja Peru", correct: false},
            {text: "Kolumbia ja Venezuela", correct: false},
            {text: "Ecuador ja Bolivia", correct: false}
        ],
        fact: "Oikein! Patagonia on alue, joka kattaa osia Chilestä ja Argentiinasta. Se tunnetaan upeista maisemistaan, vuoristaan ja jäätiköistään.",
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

// Creating function, that randomly scrambles the questions
function shuffleQuestions(){
    for(let i = questions.length - 1; i > 0; i--){
        let j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]]; // Switches places
    }
};

// Creating function, that randomly scrambles answers
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

startButton.addEventListener('click', () => {
    startScreen.style.display = 'none'; // Hides startscreen
    quizScreen.style.display = 'block'; // Shows game
    startQuiz(); // Starts game
});

// Game starts, questions are shuffled and score is set to 0
function startQuiz() {
    shuffleQuestions();
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Seuraava';
    showQuestion();
};

// Shows question number and current question
function showQuestion(){
    resetState(); 
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;

    if(currentQuestion.image){
        const imgElement = document.createElement('img');
        imgElement.src = currentQuestion.image; // Adds image to the question
        imgElement.alt = "Kysymykseen liittyvä kuva";
        imgElement.classList.add('question-image'); 
        questionElement.appendChild(imgElement);
    };

    shuffleArray(currentQuestion.answers); // Shuffle answers

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

// Clears last question and answer
function resetState(){
    nextButton.style.display = 'none';
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
};

function selectAnswer(e){
    const selectButton = e.target;
    const correct = selectButton.dataset.correct;
    const messageElement = document.createElement('p'); // Element for the message
    messageElement.classList.add('answer-message'); // CSS-styling
    let currentQuestion = questions[currentQuestionIndex];
    if(correct){
        selectButton.classList.add('correct');
        score++; // Shows correct answer and adds points
        messageElement.innerHTML = currentQuestion.fact; // Shows the fact about the question
    }else{
        // Shows wrong answer with red text
        selectButton.classList.add('incorrect');
        messageElement.innerHTML = '<span style="color: red;">Väärin! Yritä uudelleen seuraavalla kerralla.</span>'; 
    };

    answerButtons.appendChild(messageElement);

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === 'true'){
            button.classList.add('correct');
        }
        button.disabled = true; // Prevents clicking other buttons
    });
    nextButton.style.display = 'block';
};

// Shows the score and a message based on the score
function showScore(){
    resetState();
    questionElement.innerHTML = `Sinun pisteesi ${score} / ${questions.length}`;
    if (score <= 2){
        questionElement.innerHTML += '<br><span style=" color: red;"> Nyt on aika harjoitella lisää!</span>';
    }else if(score <= 4){
        questionElement.innerHTML += '<br><span style=" color: blue;"> Pystyt varmasti vielä parempaan!</span>';
    }else if(score <= 6){
        questionElement.innerHTML += '<br><span style=" color: green;"> Wau! Olet selkeästi Maanosamestari!</span>';
    };
    
questionElement.id = 'score-text'; // CSS-styling for the score text

// Create a button to go back to the home page
const homeButton = document.createElement('button');
homeButton.innerHTML = 'Palaa etusivulle';
homeButton.style.display = 'block';
homeButton.id = 'home-btn';
homeButton.addEventListener('click', () => {
    window.location.href = '../index.html';
});
answerButtons.appendChild(homeButton);

// Create a button to restart the quiz
const restartButton = document.createElement('button');
restartButton.innerHTML = 'Pelaa uudelleen';
restartButton.style.display = 'block';
restartButton.id = 'home-btn'; // Same CSS ID as home button for styling
restartButton.addEventListener('click',() => {
    window.location.href = '../etela-amerikka/ea.html';
});
answerButtons.appendChild(restartButton);

const scorePageImage = document.createElement('img');
scorePageImage.src = "../etela-amerikka/images/worldmap.avif";

questionElement.appendChild(scorePageImage); // Adds the image to the score page

};

// Shows the next question or the score page
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        setTimeout(() => {
            showQuestion();
        }, 500);
    }else{
        setTimeout(() => {
            showScore();
        }, 500);
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