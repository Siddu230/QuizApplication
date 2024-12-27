import { questions } from './questions.js';
import { Quiz } from './quiz.js';

class QuizApp {
    constructor() {
        this.quiz = new Quiz(questions);
        this.initElements();
        this.bindEvents();
        this.displayQuestion();
    }

    initElements() {
        this.questionContainer = document.getElementById('question-container');
        this.questionText = document.getElementById('question-text');
        this.optionsContainer = document.getElementById('options-container');
        this.scoreDisplay = document.getElementById('score');
        this.nextButton = document.getElementById('next-btn');
        this.resultsContainer = document.getElementById('results-container');
        this.finalScore = document.getElementById('final-score');
        this.restartButton = document.getElementById('restart-btn');
    }

    bindEvents() {
        this.nextButton.addEventListener('click', () => this.handleNextQuestion());
        this.restartButton.addEventListener('click', () => this.restartQuiz());
    }

    displayQuestion() {
        const question = this.quiz.getCurrentQuestion();
        this.questionText.textContent = question.question;
        this.optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => this.handleOptionClick(index));
            this.optionsContainer.appendChild(optionElement);
        });

        this.scoreDisplay.textContent = this.quiz.score;
        this.nextButton.style.display = 'none';
    }

    handleOptionClick(selectedOption) {
        const options = this.optionsContainer.children;
        const isCorrect = this.quiz.checkAnswer(selectedOption);
        
        for (let option of options) {
            option.style.pointerEvents = 'none';
        }

        options[selectedOption].classList.add(isCorrect ? 'correct' : 'incorrect');
        options[this.quiz.getCurrentQuestion().correctAnswer].classList.add('correct');
        
        this.nextButton.style.display = 'block';
        this.scoreDisplay.textContent = this.quiz.score;
    }

    handleNextQuestion() {
        if (this.quiz.hasNextQuestion()) {
            this.quiz.nextQuestion();
            this.displayQuestion();
        } else {
            this.showResults();
        }
    }

    showResults() {
        this.questionContainer.style.display = 'none';
        this.nextButton.style.display = 'none';
        this.resultsContainer.classList.remove('hidden');
        this.finalScore.textContent = `${this.quiz.score} out of ${this.quiz.questions.length}`;
    }

    restartQuiz() {
        this.quiz.reset();
        this.questionContainer.style.display = 'block';
        this.resultsContainer.classList.add('hidden');
        this.displayQuestion();
    }
}

// Initialize the app
new QuizApp();