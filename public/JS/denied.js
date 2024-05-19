const login = document.querySelector('.button-login button')

login.addEventListener('click', () => {
    window.location = '/login'
})

window.addEventListener('load', setFullHeight)
window.addEventListener('orientationchange', setFullHeight)
window.addEventListener('resize', setFullHeight)

function setFullHeight() {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
}

setFullHeight()
