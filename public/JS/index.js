const signup = document.querySelector('#signup')
const login = document.querySelector('#login')
const termsOfUse = document.querySelector('.terms-of-use')
const containertermsOfUse = document.querySelector('.container-terms-of-use')
const termsOfUseClose = document.querySelector('#terms-of-use-close')

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
    containertermsOfUse.classList.remove('hidden')
})
termsOfUseClose.addEventListener('click', () => {
    containertermsOfUse.classList.add('hidden')
})

containertermsOfUse.addEventListener('click', (e) => {
    if (e.target === containertermsOfUse) {
        containertermsOfUse.classList.add('hidden')
    }
})
