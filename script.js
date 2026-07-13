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
function criarConta(){

const email = document.querySelector("#email").value;
const password = document.querySelector("#password").value;

firebase.auth().createUserWithEmailAndPassword(email, password)

.then(() => {

alert("Conta criada com sucesso!");

window.location.href="login.html";

})

.catch((erro)=>{

alert(erro.message);

});

}