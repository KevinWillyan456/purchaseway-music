const warning = document.querySelector('.warning')
const form = document.querySelector('#resetPasswordForm')
const newPassword = document.querySelector('#newPassword')
const confirmNewPassword = document.querySelector('#confirmNewPassword')
const checkboxShowPassword = document.querySelector('#showPassword')
let timerAlertMessage = null

let isHappeningResetRequest = false

const MIN_PASSWORD_LENGTH = 6

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    if (isHappeningResetRequest) return

    let newPasswordValue = newPassword.value
    let confirmNewPasswordValue = confirmNewPassword.value

    if (timerAlertMessage != null) {
        clearTimeout(timerAlertMessage)
        timerAlertMessage = null
    }

    if (newPasswordValue == '') {
        warning.classList.remove('hidden')
        warning.innerHTML = 'Preencha o campo de nova senha!'
        return (timerAlertMessage = setTimeout(
            () => warning.classList.add('hidden'),
            3000
        ))
    }
    if (confirmNewPasswordValue == '') {
        warning.classList.remove('hidden')
        warning.innerHTML = 'Preencha o campo de confirmação de senha!'
        return (timerAlertMessage = setTimeout(
            () => warning.classList.add('hidden'),
            3000
        ))
    }

    if (newPasswordValue.length < MIN_PASSWORD_LENGTH) {
        newPassword.focus()
        warning.classList.remove('hidden')
        warning.innerHTML = `A senha deve ter no mínimo ${MIN_PASSWORD_LENGTH} caracteres!`
        return (timerAlertMessage = setTimeout(
            () => warning.classList.add('hidden'),
            3000
        ))
    }

    if (newPasswordValue != confirmNewPasswordValue) {
        warning.classList.remove('hidden')
        warning.innerHTML = 'As senhas não coincidem!'
        return (timerAlertMessage = setTimeout(
            () => warning.classList.add('hidden'),
            3000
        ))
    }

    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')

    isHappeningResetRequest = true
    const response = await fetch('/reset-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            newPassword: newPasswordValue,
            token,
        }),
    })
        .catch((error) => {
            console.error('Error:', error)
        })
        .finally(() => {
            isHappeningResetRequest = false
        })

    if (response.ok) {
        warning.innerHTML = 'Senha resetada com sucesso!'
        warning.classList.add('success')
        warning.classList.remove('hidden')
        return (timerAlertMessage = setTimeout(
            () => (window.location = '/login'),
            3000
        ))
    } else {
        if (response.status == 400) {
            const error = await response.json()
            if (
                error.error ==
                'New password must be different from the current one'
            ) {
                warning.classList.remove('hidden')
                warning.innerHTML = 'A nova senha deve ser diferente da atual!'
                return (timerAlertMessage = setTimeout(
                    () => warning.classList.add('hidden'),
                    3000
                ))
            } else {
                warning.classList.remove('hidden')
                warning.innerHTML = 'Erro ao resetar a senha!'
                return (timerAlertMessage = setTimeout(
                    () => warning.classList.add('hidden'),
                    3000
                ))
            }
        }
    }
})

checkboxShowPassword.addEventListener('change', () => {
    if (checkboxShowPassword.checked) {
        newPassword.type = 'text'
        confirmNewPassword.type = 'text'
    } else {
        newPassword.type = 'password'
        confirmNewPassword.type = 'password'
    }
})
