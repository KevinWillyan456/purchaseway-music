const signup = document.querySelector('#signup')
const login = document.querySelector('#login')
const serviceLogo = document.querySelector('.service-logo')
const termsOfUse = document.querySelector('.terms-and-privacy')
const termsText = document.querySelector('.terms-text')

const copyRight = document.querySelector('.copyright')
const year = new Date().getFullYear()
copyRight.innerHTML = `&copy; ${year} Todos os direitos reservados`

signup.addEventListener('click', () => {
    window.location = '/signup'
})
login.addEventListener('click', () => {
    window.location = '/login'
})
serviceLogo.addEventListener('click', () => {
    window.location = '/'
})
termsOfUse.addEventListener('click', () => {
    window.location = '/terms-and-privacy'
})
termsOfUse.addEventListener('mouseenter', () => {
    termsText.style.display = 'block'
})
termsOfUse.addEventListener('mouseleave', () => {
    termsText.style.display = 'none'
})
