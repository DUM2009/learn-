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