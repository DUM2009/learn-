import { auth } from "./firebase.js";
import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Get DOM elements - with null checks to prevent errors on pages without these elements
const nomeAluno = document.getElementById("nomeAluno");
const emailAluno = document.getElementById("emailAluno");
const nivelAluno = document.getElementById("nivelAluno");
const xpAluno = document.getElementById("xpAluno");
const xpProgressBar = document.getElementById("xpProgressBar");
const logoutBtn = document.getElementById("logoutBtn");

function renderProfileXP(user) {
    if (!window.ProfileXP || !nivelAluno || !xpAluno || !xpProgressBar) {
        return;
    }

    const profile = window.ProfileXP.readProfile(localStorage, user);
    const stats = window.ProfileXP.getProfileStats(profile);

    nivelAluno.textContent = `Nível ${stats.level}`;
    xpAluno.textContent = `${stats.xp} XP totais • Próximo nível aos ${stats.nextLevelThreshold} XP`;
    xpProgressBar.style.width = `${stats.progressPercent}%`;
}

// Monitor authentication state changes
onAuthStateChanged(auth, (user) => {

    if (user) {
        // User is logged in - display their information
        if (nomeAluno) {
            nomeAluno.textContent = user.email.split("@")[0];
        }
        if (emailAluno) {
            emailAluno.textContent = user.email;
        }

        renderProfileXP(user);

    } else {
        // User is not logged in - redirect to login page
        window.location.href = "login.html";

    }

});

// Add logout functionality - only if the button exists on this page
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {

        signOut(auth)
            .then(() => {
                // Logout successful - redirect to index
                window.location.href = "index.html";
            })
            .catch((erro) => {
                alert("Erro ao terminar sessão: " + erro.message);
            });

    });
}

window.addEventListener('storage', () => {
    if (auth.currentUser) {
        renderProfileXP(auth.currentUser);
    }
});

window.addEventListener(window.ProfileXP.PROFILE_UPDATE_EVENT, () => {
    if (auth.currentUser) {
        renderProfileXP(auth.currentUser);
    }
});
