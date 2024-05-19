const signup = document.querySelector('#signup')
const login = document.querySelector('#login')
const termsOfUse = document.querySelector('.terms-of-use')
const termsOfUseText = document.querySelector('.terms-of-use-text')
const termsOfUseClose = document.querySelector('#terms-of-use-close')

window.addEventListener('load', setFullHeight)
window.addEventListener('orientationchange', setFullHeight)
window.addEventListener('resize', setFullHeight)

function setFullHeight() {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
}

setFullHeight()

signup.addEventListener('click', () => {
    window.location = '/signup'
})
login.addEventListener('click', () => {
    window.location = '/login'
})
document.querySelector('.service-logo').addEventListener('click', () => {
    window.location = '/'
})

termsOfUse.addEventListener('click', () => {
    termsOfUseText.classList.remove('hidden')
})
termsOfUseClose.addEventListener('click', () => {
    termsOfUseText.classList.add('hidden')
})
