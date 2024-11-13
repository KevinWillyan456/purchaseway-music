const form = document.querySelector('.container form')
const inputEmailUser = document.querySelector('#inputEmail')
const inputPasswordUser = document.querySelector('#inputSenha')
const inputConectedUser = document.querySelector('#checkbox-conect')
const btnSubmit = document.querySelector('.btn-submit')
const warning = document.querySelector('.warning')
const btnForgot = document.querySelector('#btnForgot')
const layerForgot = document.querySelector('#layerForgot')
const forgotEmailInput = document.querySelector('#forgotEmail')
const sendButton = document.querySelector('.send')

const MIN_PASSWORD_LENGTH = 6
let isHappeningLoginRequest = false
let isHappeningForgotRequest = false

let timerAlertMessage = null

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    if (isHappeningLoginRequest) return

    let emailValue = inputEmailUser.value.trim()
    let passwordValue = inputPasswordUser.value

    if (timerAlertMessage != null) {
        clearTimeout(timerAlertMessage)
        timerAlertMessage = null
    }

    if (emailValue == '') {
        warning.classList.remove('hidden')
        warning.innerHTML = 'E-mail ou Senha incorretos!'
        return (timerAlertMessage = setTimeout(
            () => warning.classList.add('hidden'),
            3000
        ))
    }
    if (passwordValue == '') {
        warning.classList.remove('hidden')
        warning.innerHTML = 'E-mail ou Senha incorretos!'
        return (timerAlertMessage = setTimeout(
            () => warning.classList.add('hidden'),
            3000
        ))
    }
    if (passwordValue.length < MIN_PASSWORD_LENGTH) {
        warning.classList.remove('hidden')
        warning.innerHTML = 'E-mail ou Senha incorretos!'
        return (timerAlertMessage = setTimeout(
            () => warning.classList.add('hidden'),
            3000
        ))
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

    isHappeningLoginRequest = true
    const resposta = await fetch('/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
        .catch((error) => {
            console.error('Erro:', error)
        })
        .finally(() => {
            isHappeningLoginRequest = false
        })

    if (resposta.status == 200) {
        inputEmailUser.disabled = true
        inputPasswordUser.disabled = true
        btnSubmit.disabled = true
        warning.innerHTML = 'Login realizado com sucesso!'
        warning.classList.add('success')
        warning.classList.remove('hidden')
        return (timerAlertMessage = setTimeout(
            () => (window.location = '/home'),
            2000
        ))
    }
    if (resposta.status != 200) {
        warning.innerHTML = 'E-mail ou Senha incorretos!'
        warning.classList.remove('hidden')
        return (timerAlertMessage = setTimeout(
            () => warning.classList.add('hidden'),
            3000
        ))
    }
})

btnForgot.addEventListener('click', () => {
    layerForgot.classList.remove('hidden')
})

layerForgot.addEventListener('click', (e) => {
    if (e.target.id === 'layerForgot') {
        layerForgot.classList.add('hidden')
    }
})

layerForgot.addEventListener('submit', async (e) => {
    e.preventDefault()

    if (isHappeningForgotRequest) return

    const emailValue = forgotEmailInput.value.trim()

    if (timerAlertMessage != null) {
        clearTimeout(timerAlertMessage)
        timerAlertMessage = null
    }

    if (emailValue === '') {
        forgotEmailInput.focus()
        warning.classList.remove('hidden')
        warning.innerHTML = 'Por favor, insira um e-mail válido!'
        return (timerAlertMessage = setTimeout(
            () => warning.classList.add('hidden'),
            3000
        ))
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailPattern.test(emailValue.trim())) {
        forgotEmailInput.focus()
        warning.classList.remove('hidden')
        warning.innerHTML = 'Por favor, insira um e-mail válido!'
        return (timerAlertMessage = setTimeout(
            () => warning.classList.add('hidden'),
            3000
        ))
    }

    isHappeningForgotRequest = true
    const response = await fetch('/request-reset', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailValue }),
    })
        .catch((error) => {
            console.error('Erro:', error)
        })
        .finally(() => {
            isHappeningForgotRequest = false
        })

    if (response.ok) {
        forgotEmailInput.value = ''
        warning.innerHTML = 'Link de redefinição de senha enviado com sucesso!'
        warning.classList.add('success')
        warning.classList.remove('hidden')
        layerForgot.classList.add('hidden')
        return (timerAlertMessage = setTimeout(
            () => warning.classList.add('hidden'),
            3000
        ))
    } else {
        warning.innerHTML = 'Serviço indisponível no momento!'
        warning.classList.remove('hidden')
        return (timerAlertMessage = setTimeout(
            () => warning.classList.add('hidden'),
            3000
        ))
    }
})
