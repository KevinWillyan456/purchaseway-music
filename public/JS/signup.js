const form = document.querySelector('.container form')
const inputNameUser = document.querySelector('#inputNome')
const inputEmailUser = document.querySelector('#inputEmail')
const inputPasswordUser = document.querySelector('#inputSenha')
const inputConectedUser = document.querySelector('#checkbox-conect')
const btnSubmit = document.querySelector('.btn-submit')
const warning = document.querySelector('.warning')
const checkboxTermsPrivacy = document.querySelector('#checkbox-terms-privacy')

const MIN_PASSWORD_LENGTH = 6

let timerAlertMessage = null

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    return emailRegex.test(email)
}

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    let nameValue = inputNameUser.value.trim()
    let emailValue = inputEmailUser.value.trim()
    let passwordValue = inputPasswordUser.value.trim()

    if (timerAlertMessage != null) {
        clearTimeout(timerAlertMessage)
        timerAlertMessage = null
    }

    if (nameValue == '') {
        warning.classList.remove('hidden')
        warning.innerHTML = 'Nome está vazio!'
        inputNameUser.focus()
        return (timerAlertMessage = setTimeout(
            () => warning.classList.add('hidden'),
            3000,
        ))
    }
    if (emailValue == '') {
        warning.classList.remove('hidden')
        warning.innerHTML = 'E-mail está vazio!'
        inputEmailUser.focus()
        return (timerAlertMessage = setTimeout(
            () => warning.classList.add('hidden'),
            3000,
        ))
    }
    if (!isValidEmail(emailValue)) {
        warning.classList.remove('hidden')
        warning.innerHTML = 'E-mail inválido!'
        inputEmailUser.focus()
        return (timerAlertMessage = setTimeout(
            () => warning.classList.add('hidden'),
            3000,
        ))
    }
    if (passwordValue == '') {
        warning.classList.remove('hidden')
        warning.innerHTML = 'Senha está vazio!'
        inputPasswordUser.focus()
        return (timerAlertMessage = setTimeout(
            () => warning.classList.add('hidden'),
            3000,
        ))
    }
    if (passwordValue.includes(' ')) {
        warning.classList.remove('hidden')
        warning.innerHTML = 'Senha não pode ter espaços!'
        inputPasswordUser.focus()
        return (timerAlertMessage = setTimeout(
            () => warning.classList.add('hidden'),
            3000,
        ))
    }
    if (passwordValue.length < MIN_PASSWORD_LENGTH) {
        warning.classList.remove('hidden')
        warning.innerHTML = `Senha deve ter no mínimo ${MIN_PASSWORD_LENGTH} caracteres!`
        inputPasswordUser.focus()
        return (timerAlertMessage = setTimeout(
            () => warning.classList.add('hidden'),
            3000,
        ))
    }
    if (!checkboxTermsPrivacy.checked) {
        warning.classList.remove('hidden')
        warning.innerHTML = 'Você deve aceitar os termos de uso e privacidade!'
        checkboxTermsPrivacy.focus()
        return (timerAlertMessage = setTimeout(
            () => warning.classList.add('hidden'),
            3000,
        ))
    }

    const user = {
        name: nameValue,
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

    const resposta = await fetch('/users', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
    if (resposta.status == 201) {
        inputNameUser.disabled = true
        inputEmailUser.disabled = true
        inputPasswordUser.disabled = true
        btnSubmit.disabled = true
        warning.innerHTML = 'Usuário Criado com sucesso!'
        warning.classList.add('success')
        warning.classList.remove('hidden')
    }
    if (resposta.status != 201) {
        warning.innerHTML = 'E-mail já cadastrado!'
        warning.classList.remove('hidden')
        return (timerAlertMessage = setTimeout(
            () => warning.classList.add('hidden'),
            3000,
        ))
    }

    const resposta2 = await fetch('/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
    if (resposta2.status == 200) {
        return (timerAlertMessage = setTimeout(
            () => (window.location = '/home'),
            2000,
        ))
    }
})
