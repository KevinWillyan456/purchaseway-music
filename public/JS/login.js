const form = document.querySelector('.container form')
const inputEmailUser = document.querySelector('#inputEmail')
const inputPasswordUser = document.querySelector('#inputSenha')
const inputConectedUser = document.querySelector('#checkbox-conect')
const btnSubmit = document.querySelector('.btn-submit')
const warning = document.querySelector('.warning')

const MIN_PASSWORD_LENGTH = 6

let timer = null

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    let emailValue = inputEmailUser.value.trim()
    let passwordValue = inputPasswordUser.value

    if (timer != null) {
        clearTimeout(timer)
        timer = null
    }

    if (emailValue == '') {
        warning.classList.remove('hidden')
        warning.innerHTML = 'E-mail ou Senha incorretos!'
        return (timer = setTimeout(() => warning.classList.add('hidden'), 3000))
    }
    if (passwordValue == '') {
        warning.classList.remove('hidden')
        warning.innerHTML = 'E-mail ou Senha incorretos!'
        return (timer = setTimeout(() => warning.classList.add('hidden'), 3000))
    }
    if (passwordValue.length < MIN_PASSWORD_LENGTH) {
        warning.classList.remove('hidden')
        warning.innerHTML = 'E-mail ou Senha incorretos!'
        return (timer = setTimeout(() => warning.classList.add('hidden'), 3000))
    }

    const user = {
        email: emailValue,
        password: passwordValue,
        hasConnect: inputConectedUserVerify(),
    }

    function inputConectedUserVerify() {
        if (inputConectedUser.checked) {
            return true
        } else {
            return false
        }
    }

    const resposta = await fetch('/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
    if (resposta.status == 200) {
        inputEmailUser.disabled = true
        inputPasswordUser.disabled = true
        btnSubmit.disabled = true
        warning.innerHTML = 'Login realizado com sucesso!'
        warning.classList.add('success')
        warning.classList.remove('hidden')
        return (timer = setTimeout(() => (window.location = '/home'), 2000))
    }
    if (resposta.status != 200) {
        warning.innerHTML = 'E-mail ou Senha incorretos!'
        warning.classList.remove('hidden')
        return (timer = setTimeout(() => warning.classList.add('hidden'), 3000))
    }
})
