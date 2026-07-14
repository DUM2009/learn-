import { auth } from "./firebase.js";
import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Check authentication state on all pages
onAuthStateChanged(auth, (user) => {
    const header = document.querySelector('header');
    if (!header) return;
    
    const nav = header.querySelector('nav');
    if (!nav) return;

    // Remove existing login button if present
    const existingLogin = nav.querySelector('.login');
    if (existingLogin) {
        existingLogin.remove();
    }

    if (user) {
        // User is logged in - show profile and logout
        const profileLink = document.createElement('a');
        profileLink.href = 'perfil.html';
        profileLink.textContent = 'Perfil';
        profileLink.className = 'login';
        
        const logoutBtn = document.createElement('button');
        logoutBtn.id = 'headerLogout';
        logoutBtn.textContent = 'Sair';
        logoutBtn.style.background = '#dc3545';
        logoutBtn.style.color = 'white';
        logoutBtn.style.padding = '12px 22px';
        logoutBtn.style.borderRadius = '10px';
        logoutBtn.style.border = 'none';
        logoutBtn.style.cursor = 'pointer';
        logoutBtn.style.fontWeight = '600';
        logoutBtn.style.transition = '.3s';
        logoutBtn.style.marginLeft = '10px';
        
        logoutBtn.addEventListener('mouseover', () => {
            logoutBtn.style.background = '#c82333';
        });
        
        logoutBtn.addEventListener('mouseout', () => {
            logoutBtn.style.background = '#dc3545';
        });
        
        logoutBtn.addEventListener('click', () => {
            signOut(auth)
                .then(() => {
                    window.location.href = 'index.html';
                })
                .catch((erro) => {
                    alert('Erro ao sair: ' + erro.message);
                });
        });
        
        nav.appendChild(profileLink);
        nav.appendChild(logoutBtn);
    } else {
        // User is not logged in - show login button
        const loginBtn = document.createElement('a');
        loginBtn.href = 'login.html';
        loginBtn.textContent = 'Entrar';
        loginBtn.className = 'login';
        nav.appendChild(loginBtn);
    }
});

export { auth };