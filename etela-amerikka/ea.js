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
    /*{
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
        question: "Mikä on puhutuin äidinkieli Etelä-Amerikassa?",
        answers: [
            {text: "Espanja", correct: false},
            {text: "Portugali", correct: true},
            {text: "Ranska", correct: false},
            {text: "Englanti", correct: false}
        ],
        fact: "Oikein! Portugali on Etelä-Amerikan puhutuin äidinkieli, ja se on virallinen kieli Brasiliassa. Espanja on myös laajasti puhuttu useissa muissa maissa.",
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
    },*/
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
    quizScreen.style.display = 'block'; // Show game
    startQuiz(); // Starts game
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

/* Luodaan funktio, joka tyhjentää edelliset kysymykset ja vastaukset
ja piilottaa "Seuraava" -painikkeen.*/
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
    messageElement.classList.add('answer-message'); // CSS-muotoilu
    let currentQuestion = questions[currentQuestionIndex]; // Haetaan nykyinen kysymys
    if(correct){
        selectButton.classList.add('correct');
        score++; // Näytetään käyttäjälle oikea vastaus ja lisätään pisteitä
        messageElement.innerHTML = currentQuestion.fact; // Näytetään oikean vastauksen fakta
    }else{
        // Näytetään viesti punaisella kun vastaus on väärin.
        selectButton.classList.add('incorrect');
        messageElement.innerHTML = '<span style="color: red;">Väärin! Yritä uudelleen seuraavalla kerralla.</span>'; 
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
    questionElement.innerHTML = `Sinun pisteesi ${score} / ${questions.length}`;
    if (score <= 2){
        questionElement.innerHTML += '<br><span style=" color: red;"> Nyt on aika harjoitella lisää!</span>';
    }else if(score <= 4){
        questionElement.innerHTML += '<br><span style=" color: light yellow;"> Hienoa työtä! Pystyt varmasti vielä parempaan!</span>';
    }else if(score == 6){
        questionElement.innerHTML += '<br><span style=" color: green;"> Wau! Olet selkeästi Maanosamestari!</span>';
    }
    
questionElement.id = 'score-text';

const homeButton = document.createElement('button');
homeButton.innerHTML = 'Palaa etusivulle';
homeButton.style.display = 'block';
homeButton.id = 'home-btn'; // CSS-muotoilu
homeButton.addEventListener('click', () => {
    window.location.href = '../index.html';
});
answerButtons.appendChild(homeButton); // Lisää "Palaa etusivulle" -painike vastausnappeihin

const restartButton = document.createElement('button');
restartButton.innerHTML = 'Pelaa uudelleen';
restartButton.style.display = 'block';
restartButton.id = 'home-btn'; // Sama CSS-muotoilu kuin edellisessä painikkeessa
restartButton.addEventListener('click',() => {
    window.location.href = '../etela-amerikka/ea.html';
});
answerButtons.appendChild(restartButton); 
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