const signup = document.querySelector("#signup");
const login = document.querySelector("#login");
const termsOfUse = document.querySelector(".terms-of-use");
const termsOfUseText = document.querySelector(".terms-of-use-text");
const termsOfUseClose = document.querySelector("#terms-of-use-close");

signup.addEventListener("click", () => {
    window.location = '/signup'
})
login.addEventListener("click", () => {
    window.location = '/login'
})
document.querySelector('.service-logo').addEventListener("click", () => {
    window.location = '/home'
})

termsOfUse.addEventListener("click", () => {
    termsOfUseText.classList.remove("hidden");
})
termsOfUseClose.addEventListener("click", () => {
    termsOfUseText.classList.add("hidden");
})