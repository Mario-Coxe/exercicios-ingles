let currentQuestion = 0
let correctAnswers = 0
showQuestion()

//Events
document.querySelector('.scoreArea button').addEventListener('click', resetEvent)

function showQuestion() {
    //trazendo as questões
    if(questions[currentQuestion]){
        let q = questions[currentQuestion]

        //progress-bar
        let pct = Math.floor((currentQuestion / questions.length) * 100) //  (questão_actual / quantidade_de_questão)*100 
        document.querySelector('.progress--bar').style.width = `${pct}% `

        document.querySelector('.scoreArea').style.display = 'none'
        document.querySelector('.questionArea').style.display = 'block'

        document.querySelector('.question').innerHTML = q.question

        let optionHTML = ''
        for (let i in q.options){
            optionHTML += `<div data-op="${i}" class="option"><span>${parseInt(i)+1}</span>${q.options[i]}</div>`
        }
        document.querySelector('.options').innerHTML = optionHTML

        document.querySelectorAll('.options .option').forEach(item =>{
           item.addEventListener('click', optionClickEvent)
        })
    }else{
        //acabaram as questões
        finishQuiz()
    }
}

function optionClickEvent(e) {
    
    clickedOption = parseInt(e.target.getAttribute('data-op'))
    
    if (questions[currentQuestion].answer === clickedOption) {
        //ACERTOU
        console.log("Acertou!")
        correctAnswers++

    } else {
        //ERROU
        console.log("Errou!")
        
    }

    currentQuestion++
    showQuestion()
}

function finishQuiz() {
    let points = Math.floor((correctAnswers / questions.length) * 100) // (respostas_correctas / tamanho_questões) * 100

    if (points < 30) {
        document.querySelector('.scoreText1').innerHTML = 'Estude mais!!'
        document.querySelector('.scorePct').style.color = '#FF0000' //vermelho
    }else if(points >= 30 && points < 70){
        document.querySelector('.scoreText1').innerHTML = 'Parabéns!'
        document.querySelector('.scorePct').style.color = '#FFFF00' //laranja_descarregado
    }else if(points >= 90){
        document.querySelector('.scoreText1').innerHTML = 'Muito bom!'
        document.querySelector('.scorePct').style.color = '#0D630D' //verde_escuro
    }

    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`

    if (correctAnswers == 0) {
        document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} e  não acertou nenhuma`
    }

    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} e acertou ${correctAnswers}`

    document.querySelector('.progress--bar').style.width = '100%'
    document.querySelector('.scoreArea').style.display = 'block'
    document.querySelector('.questionArea').style.display = 'none'

}

function resetEvent(params) {
    currentQuestion = 0
    correctAnswers = 0
    points = 0

    showQuestion()
}