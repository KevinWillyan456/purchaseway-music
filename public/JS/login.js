const form = document.querySelector('.container form');
const inputNameUser = document.querySelector('.input-nome');
const inputPasswordUser = document.querySelector('.input-senha');
const inputConectedUser = document.querySelector('#checkbox-conect');
const btnSubmit = document.querySelector('.btn-submit');
const warning = document.querySelector('.warning');

form.addEventListener("submit", (e) => {
    e.preventDefault()
})

document.querySelector('.service-logo').addEventListener("click", () => {
    window.location = '/'
})

btnSubmit.addEventListener("click", validationForm)

async function validationForm(){
    let nameValue = inputNameUser.value
    let passwordValue = inputPasswordUser.value

    if(nameValue == ""){
        warning.classList.remove("hidden")
        warning.innerHTML = "Nome ou Senha incorretos!"
        return setTimeout(() => warning.classList.add('hidden'), 3000)
    }
    if(passwordValue == ""){
        warning.classList.remove("hidden")
        warning.innerHTML = "Nome ou Senha incorretos!"
        return setTimeout(() => warning.classList.add('hidden'), 3000)
    }
    if(passwordValue.length < 6){
        warning.classList.remove("hidden")
        warning.innerHTML = "Senha muito curta!"
        return setTimeout(() => warning.classList.add('hidden'), 3000)
    }

    const user = {
        name: nameValue,
        password: passwordValue,
        hasConnect: inputConectedUserVerify()
    }

    function inputConectedUserVerify() {
        if(inputConectedUser.checked){
            return true
        }
        else {
            return false
        }
    }

    const resposta = await fetch("/login", {
        method: "POST",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });
    if(resposta.status == 200){
        inputNameUser.disabled = true;
        inputPasswordUser.disabled = true;
        btnSubmit.disabled = true;
        warning.innerHTML = "Login realizado com sucesso!"
        warning.classList.add("success")
        warning.classList.remove("hidden")
        return setTimeout(() => window.location = '/home', 2000); 
    }
    if(resposta.status != 200){
        warning.innerHTML = "Nome ou Senha incorretos!"
        warning.classList.remove("hidden")
        return setTimeout(() => warning.classList.add('hidden'), 3000)
    }
}