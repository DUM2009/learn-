// Botão principal

const startButton = document.querySelector("button");

if (startButton) {

    startButton.addEventListener("click", () => {

        window.location.href = "missions.html";

    });

}

// Animação ao fazer scroll

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0px)";

        }

    });

});

const elements = document.querySelectorAll(".card, .steps div");

elements.forEach((element) => {

    element.style.opacity = "0";
    element.style.transform = "translateY(40px)";
    element.style.transition = "0.7s";

    observer.observe(element);

});

// Navbar transparente ao topo

window.addEventListener("scroll", () => {

    const header = document.querySelector("header");

    if (window.scrollY > 50) {

        header.style.background = "rgba(255,255,255,0.95)";
        header.style.backdropFilter = "blur(12px)";

    } else {

        header.style.background = "white";

    }

});