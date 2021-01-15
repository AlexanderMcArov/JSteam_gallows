let btn_start = document.querySelector('#btn_start')
let btn_finish = document.querySelector('#btn_finish')
let game_detail = document.querySelector('.game_detail')
let detail_desc = game_detail.querySelector('.statics .discription')
let detail_word = game_detail.querySelector('.statics .word')
let game_status = {
    win() {
        document.querySelector('.game_table .status').innerHTML = 'Вы выиграли.'
    },
    lose(word) {
        document.querySelector('.game_table .status').innerHTML = '<span style="color:red;">Вы проиграли.</span><br>Слово было: ' + word + '</br>'
    },
    start() {
        document.querySelector('.game_table .status').innerHTML = ''
    }
}

let game_body = [
    document.querySelector('.rope'),
    document.querySelector('.head'),
    document.querySelector('.body'),
    document.querySelector('.left_hand'),
    document.querySelector('.right_hand'),
    document.querySelector('.left_foot'),
    document.querySelector('.right_foot')
]

let isGame = false
let errorCount = 0
let answer = 0
let list_words = [
    {
        desc: "Это что то плавающее",
        word: "лодка"
    }
]


btn_start.addEventListener('click', startGame)
btn_finish.addEventListener('click', finishGame)

function startGame() {
    game_status.start()
    isGame = true
    errorCount = 0
    answer = 0
    setWord()
    game_body.forEach((item, index) => {
        item.style.display = "none"
    })
    btn_start.style.display = "none"
    btn_finish.style.display = "block"
}

function finishGame() {
    isGame = false
    // game_body.forEach(item => {
    //     item.style.display = "block"
    // })
    clearWord()
    btn_start.style.display = "block"
    btn_finish.style.display = "none"
}

function setWord() {
    let gw = list_words[Math.floor(Math.random() * list_words.length)]
    detail_desc.innerHTML = gw.desc
    for (let i = 0; i < gw.word.length; i++) {
        let btn = document.createElement('button')
        btn.setAttribute('id', i)
        btn.addEventListener('click', (e) => {
            checkWord(e.target, gw.word)
        })
        btn.innerHTML = "X"
        detail_word.appendChild(btn)
    }
}

function clearWord() {
    detail_desc.innerHTML = ''
    detail_word.innerHTML = ''
}

function checkWord(btn, word) {
    let id = btn.id
    let getLet = prompt('Введите букву').toLocaleLowerCase()
    if (getLet == word[id]) {
        btn.innerHTML = word[id]
        answer++
    } else {
        game_body[errorCount].style.display = "block"
        errorCount++
    }

    if (errorCount == game_body.length) {
        finishGame()
        game_status.lose(word)
    }

    if (answer == word.length) {
        finishGame()
        game_status.win()
    }

    console.log("Длина слова: ", word.length,
        "\nКоличество ошибок:", errorCount, "из", game_body.length,
        "\nКоличество правильных:", answer, "из", word.length)
}