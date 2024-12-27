export class Quiz {
    constructor(questions) {
        this.questions = questions;
        this.currentQuestionIndex = 0;
        this.score = 0;
    }

    getCurrentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }

    checkAnswer(selectedOption) {
        const currentQuestion = this.getCurrentQuestion();
        const isCorrect = selectedOption === currentQuestion.correctAnswer;
        
        if (isCorrect) {
            this.score++;
        }
        
        return isCorrect;
    }

    hasNextQuestion() {
        return this.currentQuestionIndex < this.questions.length - 1;
    }

    nextQuestion() {
        if (this.hasNextQuestion()) {
            this.currentQuestionIndex++;
            return true;
        }
        return false;
    }

    reset() {
        this.currentQuestionIndex = 0;
        this.score = 0;
    }
}