document.addEventListener('DOMContentLoaded', function () {
    const questionContainer = document.getElementById('questionContainer');
    const answerButtons = document.getElementById('answerButtons');
    const resultDisplay = document.getElementById('resultDisplay');
    const restartBtn = document.getElementById('restartBtn');

    const amsecData = [
        {
            question: 'Q1: What is the full form of HTML?',
            suggestions: ['Hypertext Markup Language', 'Hyperlink and Text Markup Language', 'High-Level Text Management Language'],
            correctAnswer: 'Hypertext Markup Language'
        },
        {
            question: 'Q2: What does CSS stand for?',
            suggestions: ['Counter Strike: Source', 'Corrective Style Sheet', 'Cascading Style Sheets'],
            correctAnswer: 'Cascading Style Sheets'
        },
        {
            question: 'Q3: What is the primary purpose of JavaScript?',
            suggestions: ['To style web pages', 'To enhance the user interface', 'To add interactivity and dynamic content'],
            correctAnswer: 'To add interactivity and dynamic content'
        },
        {
            question: 'Q4: What does DOM stand for?',
            suggestions: ['Document Object Model', 'Digital Output Module', 'Distributed Object Middleware'],
            correctAnswer: 'Document Object Model'
        }
        // Add more questions with suggestions and correct answers
    ];

    let currentQuestionIndex = 0;
    let currentScore = 0;
    let correctAnswers = 0;
    let wrongAnswers = 0;
    let timerInterval;

    function displayQuestion() {
        const currentAmsec = amsecData[currentQuestionIndex];

        questionContainer.textContent = currentAmsec.question;

        answerButtons.innerHTML = '';
        currentAmsec.suggestions.forEach(function (suggestion, index) {
            const answerButton = document.createElement('button');
            answerButton.className = 'answer-button';
            answerButton.textContent = suggestion;
            answerButton.addEventListener('click', function () {
                checkAnswer(suggestion, currentAmsec.correctAnswer);
            });
            answerButtons.appendChild(answerButton);
        });

        let timerDuration = 10;
        let timeLeft = timerDuration;
        updateTimerDisplay(timeLeft);

        timerInterval = setInterval(function () {
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                nextQuestion();
            }
            updateTimerDisplay(timeLeft);
            timeLeft--;
        }, 1000);
    }

    function updateTimerDisplay(timeLeft) {
        resultDisplay.textContent = `Time Left: ${timeLeft}s`;
    }

    function checkAnswer(selectedAnswer, correctAnswer) {
        clearInterval(timerInterval);

        if (selectedAnswer === correctAnswer) {
            currentScore++;
            correctAnswers++;
        } else {
            wrongAnswers++;
        }

        if (currentQuestionIndex < amsecData.length - 1) {
            nextQuestion();
        } else {
            endGame();
        }
    }

    function nextQuestion() {
        currentQuestionIndex++;
        displayQuestion();
    }

    function endGame() {
        resultDisplay.textContent = `Congratulations! You have played very well. Your Score: ${currentScore}/${amsecData.length}`;
        questionContainer.style.display = 'none';
        answerButtons.style.display = 'none';
        restartBtn.style.display = 'block';
    }

    restartBtn.addEventListener('click', function () {
        currentQuestionIndex = 0;
        currentScore = 0;
        correctAnswers = 0;
        wrongAnswers = 0;
        restartBtn.style.display = 'none';
        resultDisplay.textContent = '';
        questionContainer.style.display = 'block';
        answerButtons.style.display = 'block';
        displayQuestion();
    });

    // Initial display
    displayQuestion();
});
