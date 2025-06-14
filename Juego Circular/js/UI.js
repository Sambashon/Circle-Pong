const playBtn = document.querySelector("main button");
if (playBtn){
    playBtn.addEventListener("click", () =>{
        window.location.href = "main.html";
    });
}

const backBtn = document.querySelector(".backBtn");
if (backBtn){
    backBtn.addEventListener("click", () =>{
        window.location.href = "landing.html"
    });
}