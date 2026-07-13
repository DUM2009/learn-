const nextButton = document.getElementById("nextButton");

if(nextButton){

nextButton.addEventListener("click",()=>{

alert("Na próxima versão este botão muda para o cartão seguinte.");

});

}

const backButton = document.getElementById("backButton");

if(backButton){

backButton.addEventListener("click",()=>{

history.back();

});

}
import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


window.criarConta = function(){

const email = document.querySelector("#email").value;
const password = document.querySelector("#password").value;


createUserWithEmailAndPassword(auth, email, password)

.then(() => {

alert("Conta criada com sucesso!");

window.location.href="login.html";

})

.catch((erro)=>{

alert(erro.message);

});

}