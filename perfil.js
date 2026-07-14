import { auth } from "./firebase.js";
import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const nomeAluno = document.getElementById("nomeAluno");
const emailAluno = document.getElementById("emailAluno");
const logoutBtn = document.getElementById("logoutBtn");

onAuthStateChanged(auth, (user) => {

    if (user) {

        nomeAluno.textContent = user.email.split("@")[0];
        emailAluno.textContent = user.email;

    } else {

        window.location.href = "login.html";

    }

});

logoutBtn.addEventListener("click", () => {

    signOut(auth)
        .then(() => {

            window.location.href = "login.html";

        })
        .catch((erro) => {

            alert("Erro ao terminar sessão: " + erro.message);

        });

});