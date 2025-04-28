/* For the South America quiz game, I used the following resources:

Code and content development:
1. "How To Make Quiz App Using JavaScript | Build Quiz App With HTML CSS & JavaScript", YouTube, https://www.youtube.com/watch?v=PBcqGxrr9g8 (accessed April 2, 2025)
2. W3Schools, "JavaScript Tutorial", https://www.w3schools.com/js/default.asp (accessed April 2, 2025)
3. ChatGPT (OpenAI), https://chat.openai.com/chat (accessed April 2, 2025)

Images:
1. GISGeography, "South America Blank Map and Country Outlines", https://gisgeography.com/south-america-blank-map-country-outlines/ (accessed April 16, 2025)
2. Depositphotos, "Amazon river", https://depositphotos.com/fi/similar-images/573640086.html (accessed April 24, 2025)
3. MTV Uutiset, "Brazil's Symbol Christ the Redeemer Turns 80", https://www.mtvuutiset.fi/artikkeli/brasilian-symboli-kristus-patsas-tayttaa-80-vuotta/2223866 (accessed April 2, 2025)
4. Wikipedia, "Aconcagua", https://en.wikipedia.org/wiki/Aconcagua (accessed April 16, 2025)
5. Wikipedia, "Moai", https://en.wikipedia.org/wiki/Moai (accessed April 16, 2025)
6. Istock, "Pehoe Lake ja Cuernos Peaks in the Morning, Torres del Painen kansallispuisto, Chile", https://www.istockphoto.com/fi/valokuva/pehoe-lake-ja-cuernos-peaks-in-the-morning-torres-del-painen-kansallispuisto-chile-gm1882573770-553549092?utm_source=pixabay&utm_medium=affiliate&utm_campaign=sponsored_image&utm_content=srp_topbanner_media&utm_term=patagonia (accessed April 24, 2025)
7. Freepik, "South America countries or continent highlighted in red on the world map vector", https://www.freepik.com/premium-vector/south-america-countries-continent-highlighted-red-world-map-vector_33125774.htm (accessed April 17, 2025)
*/
const questions = [
    /*{
        question: "Montako eri valtiota Etelä-Amerikassa on?",
        image: "../images/ea-map.jpg",
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
        image: "../images/amazonia-river.jpg",
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
        image: "../images/kristus.jpg",
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
        image: "../images/aconcagua.jpg",
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
        image: "../images/moaipatsaat.jpg",
        answers: [
            {text: "Pääsiäis-saarella", correct: true},
            {text: "Galápagos-saarella", correct: false},
            {text: "Falklandin-saarella", correct: false},
            {text: "Tierra del Fuegossa", correct: false}
        ],
        fact: "Oikein! Moai-patsaat sijaitsevat Easter Islandilla (Rapa Nui), joka on kuuluisa suurista kivipatsaistaan. Ne ovat osa Rapa Nuin kulttuuriperintöä.",
    },*/
    {
        question: "Mitkä kaksi maata Patagonia yhdistää?",
        image: "../images/patagonia.jpg",
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
// Adding event listener to the start button, that starts the game and hides the start screen
startButton.addEventListener('click', () => {
    startScreen.style.display = 'none'; 
    quizScreen.style.display = 'block'; 
    startQuiz();
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

// adds correct image to the question
    if(currentQuestion.image){
        const imgElement = document.createElement('img');
        imgElement.src = currentQuestion.image; 
        imgElement.alt = "Kysymykseen liittyvä kuva";
        imgElement.classList.add('question-image'); 
        questionElement.appendChild(imgElement);
    };

    shuffleArray(currentQuestion.answers); 

// Creates buttons for each answer
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

// Shows the selected answer and gives feedback
function selectAnswer(e){
    const selectButton = e.target;
    const correct = selectButton.dataset.correct;
    const messageElement = document.createElement('p'); // Element for the message
    messageElement.classList.add('answer-message'); // CSS-styling
    let currentQuestion = questions[currentQuestionIndex];

// Shows correct answer
    if(correct){
        selectButton.classList.add('correct');
        score++; 
        messageElement.innerHTML = currentQuestion.fact;

// Shows incorrect answer with red text
    }else{
        selectButton.classList.add('incorrect');
        messageElement.innerHTML = '<span style="color: red;">Väärin! Yritä uudelleen seuraavalla kerralla.</span>';
    };
    answerButtons.appendChild(messageElement);

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct){
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    nextButton.style.display = 'block';
};

// Shows the score and a message based on the score
function showScore(){
    resetState();
    questionElement.innerHTML = `Sinun pisteesi ${score} / ${questions.length}`;

    // Saves score on localStorage
    localStorage.setItem("southAmericaGameScore", score);

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
homeButton.innerHTML = 'Palaa yhteenvetosivulle';
homeButton.style.display = 'block';
homeButton.id = 'home-btn';
homeButton.addEventListener('click', () => {
    window.location.href = '../pages/overview.html';
});
answerButtons.appendChild(homeButton);

// Create a button to restart the quiz
const restartButton = document.createElement('button');
restartButton.innerHTML = 'Pelaa uudelleen';
restartButton.style.display = 'block';
restartButton.id = 'home-btn';
restartButton.addEventListener('click',() => {
    window.location.href = '../pages/ea.html';
});
answerButtons.appendChild(restartButton);

const scorePageImage = document.createElement('img');
scorePageImage.src = "../images/worldmap.avif";

questionElement.appendChild(scorePageImage);
};

// Shows the next question or the score page with a delay
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

// Adding listener that shows the next question or the score page
nextButton.addEventListener('click', () => {
    if(currentQuestionIndex < questions.length){  
        handleNextButton();  
    }else{
        startQuiz();
    }
});

startQuiz();