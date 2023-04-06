const signup = document.querySelector("#signup");
const login = document.querySelector("#login");

signup.addEventListener("click", () => {
    window.location = '/signup'
})
login.addEventListener("click", () => {
    window.location = '/login'
})
document.querySelector('.service-logo').addEventListener("click", () => {
    window.location = '/home'
})