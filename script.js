alert("JavaScript carregou!");
import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// Botão criar conta

const criarContaBtn = document.getElementById("criarContaBtn");

if(criarContaBtn){

    criarContaBtn.addEventListener("click", () => {

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmarPassword = document.getElementById("confirmarPassword").value;


        if(password !== confirmarPassword){

            alert("As palavras-passe não coincidem.");
            return;

        }


        createUserWithEmailAndPassword(auth, email, password)

        .then(() => {

            alert("Conta criada com sucesso!");

            window.location.href = "login.html";

        })

        .catch((erro) => {

            alert(erro.message);

        });


    });

}


// Mostrar palavra-passe

const olhoPassword = document.getElementById("olhoPassword");

if(olhoPassword){

    olhoPassword.addEventListener("click", () => {

        const campo = document.getElementById("password");

        if(campo.type === "password"){

            campo.type = "text";

        } else {

            campo.type = "password";

        }

    });

}


// Mostrar confirmação da palavra-passe

const olhoConfirmar = document.getElementById("olhoConfirmar");

if(olhoConfirmar){

    olhoConfirmar.addEventListener("click", () => {

        const campo = document.getElementById("confirmarPassword");

        if(campo.type === "password"){

            campo.type = "text";

        } else {

            campo.type = "password";

        }

    });

}