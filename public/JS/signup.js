const form = document.querySelector('.container form');

form.addEventListener("submit", (e) => {
    e.preventDefault()
})

document.querySelector('.service-logo').addEventListener("click", () => {
    window.location = '/'
})