let signs = ["+", "-", "*", "/"]
let question = document.querySelector('.question')
let answers = document.querySelectorAll('.answer')
let start_button = document.querySelector('.start-button')
let elements = document.querySelector('.elements')
let result_text = document.querySelector('.result')
let start_container = document.querySelector('.button-h3')

class Question {
    constructor() {
        let a = randit(1, 30)
        let b = randit(1, 30)
        let sign = random_signs()
        this.question = `${a} ${sign} ${b}`
        this.correct = make_correct(sign, a, b)
        if (sign == '/') {
            this.answers = [
                parseFloat((this.correct - 0.2).toFixed(1)),
                parseFloat((this.correct - 0.1).toFixed(1)),
                parseFloat((this.correct + 0.2).toFixed(1)),
                parseFloat((this.correct + 0.1).toFixed(1)),
                this.correct
            ]
        } else {
            this.answers = [
                randit(this.correct - 10, this.correct - 1),
                randit(this.correct - 10, this.correct - 1),
                this.correct,
                randit(this.correct + 1, this.correct + 10),
                randit(this.correct + 1, this.correct + 10)
            ]
        }
        shuffle(this.answers)
    }
    display() {
        question.innerHTML = this.question
        for (let i = 0; i < answers.length; i += 1) {
            answers[i].innerHTML = this.answers[i]
        }
    }

}

function make_correct(sign, a, b) {
    if (sign == '+') {
        return a + b
    }
    else if (sign == '-') {
        return a - b
    }
    else if (sign == '*') {
        return a * b
    }
    else if (sign == '/') {
        return parseFloat((a / b).toFixed(1))
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {  // Цикл проходиться по всіх елементах з кінця до початку
        let j = Math.floor(Math.random() * (i + 1));  // Вибираємо індекс рандомного елемента
        [array[i], array[j]] = [array[j], array[i]] // Міняємо місцями з поточним елементом.
    }
}

let current_question = new Question()

current_question.display()

var correct_answers = 0
var all_questions = 0

start_button.addEventListener('click', function () {
    start_button.style.display = 'none'
    start_container.style.display = 'none'
    elements.style.display = 'block'
    setTimeout(function () {
        result_text.innerHTML = `Ви дали ${correct_answers} правильних відповідей із
         ${all_questions}
         Точність: ${Math.round(correct_answers * 100 / all_questions)}%`
        correct_answers = 0
        all_questions = 0
        elements.style.display = 'none'
        start_button.style.display = 'block'
        start_container.style.display = 'flex'
    }, 10000)
})

for (let i = 0; i < answers.length; i += 1) {
    answers[i].addEventListener('click', function () {
        if (answers[i].innerHTML == current_question.correct) {
            answers[i].style.backgroundColor = '#00FF00'
            anime({
                targets: '.answer',
                loop: false,
                delay: 200,
                duration: 2000,
                backgroundColor: '#05386B'
            })
            console.log(correct_answers)
            correct_answers += 1
        } else {
            answers[i].style.backgroundColor = '#FF0000'
            anime({
                targets: '.answer',
                loop: false,
                delay: 200,
                duration: 2000,
                backgroundColor: '#05386B'
            })
        }
        current_question = new Question()
        current_question.display()
        all_questions += 1
    })
}

function randit(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function random_signs() {
    return signs[randit(0, 3)]
}











